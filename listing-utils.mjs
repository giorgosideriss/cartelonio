// Pure parsing helpers: no network, no price calculation, no inferred dates.
export function validateListingUrl(value) {
  const u = new URL(value);
  const hosts = ['mobile.de','www.mobile.de','suchen.mobile.de','autoscout24.de','www.autoscout24.de','autoscout24.com','www.autoscout24.com','autoscout24.ch','www.autoscout24.ch'];
  if (u.protocol !== 'https:' || u.username || u.password || u.port || !hosts.includes(u.hostname)) throw Error('invalid_listing_url');
  if (u.hostname.endsWith('mobile.de')) {
    if (!(/\/fahrzeuge\/details\.html$/.test(u.pathname) && /^\d+$/.test(u.searchParams.get('id') || '')) && !/\/auto-inserat\/[^/]+\/\d+\.html$/.test(u.pathname)) throw Error('invalid_listing_url');
  } else if (!/^\/(?:offers|angebote|offres|annunci)\/[^/]+\/?$/.test(u.pathname)) throw Error('invalid_listing_url');
  u.hash = ''; return u.href;
}
export const normalize = v => String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function decode(s) { return String(s).replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>'); }
function number(s) { return Number(String(s).replace(/[\s.,’']/g,'')); }
function quantity(v) { return typeof v === 'object' && v ? v.value : v; }
function registration(v) {
  const s = String(v ?? '').trim(); let y,m,d;
  let a = s.match(/^(\d{4})-(\d{2})(?:-(\d{2}))?(?:T.*)?$/);
  if(a) [,y,m,d] = a;
  else { a = s.match(/\b(?:(\d{1,2})[./])?(\d{1,2})[./](\d{4})\b/); if(a) [,d,m,y]=a; }
  if(!y || !m || +y<1900 || +y>new Date().getFullYear() || +m<1 || +m>12) return null;
  if(d && (+d<1 || +d>new Date(+y,+m,0).getDate())) return null;
  return {year:+y,month:+m,day:d?+d:null,precision:d?'day':'month'};
}
export function parseListing(input, html = false) {
  if(typeof input !== 'string' || input.length>2000000) throw Error('invalid_listing_input');
  const objects=[];
  if(html) for(const m of input.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const walk=(x,depth=0)=>{ if(depth>12||!x||typeof x!=='object')return; if(Array.isArray(x)){x.forEach(y=>walk(y,depth+1));return;} if([].concat(x['@type']||[]).some(t=>/^(Car|Vehicle|Product)$/.test(t))) objects.push(x); if(x['@graph'])walk(x['@graph'],depth+1); if(x.mainEntity)walk(x.mainEntity,depth+1); }; walk(JSON.parse(m[1])); } catch { /* malformed metadata falls back to visible text */ }
  }
  const car=objects.find(x=>[].concat(x['@type']||[]).some(t=>/^(Car|Vehicle)$/.test(t))) || objects[0] || {};
  const text=decode(html?input.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,'\n'):input).replace(/[\t\r ]+/g,' ').replace(/\n\s*\n/g,'\n');
  const title=String(car.name || (html?decode(input.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''):text.split('\n').find(x=>x.trim())||'')).slice(0,300);
  const labelled=(label,pattern)=>text.match(new RegExp('(?:'+label+')\\s*[:\\n]?\\s*('+pattern+')','i'))?.[1];
  const reg=registration(car.dateVehicleFirstRegistered || labelled('Erstzulassung|First registration|Première immatriculation|Πρώτη άδεια','(?:\\d{1,2}[./])?\\d{1,2}[./]\\d{4}|\\d{4}-\\d{2}(?:-\\d{2})?'));
  const kmObject=car.mileageFromOdometer;
  const rawKm=labelled('Kilometerstand|Mileage|Kilométrage|Χιλιόμετρα','[\\d.,\\s]+(?=\\s*km)');
  const kmUnit=String(kmObject?.unitCode||kmObject?.unitText||'').toLowerCase();
  const mileage=kmObject && ['km','kmt','kilometre','kilometer'].includes(kmUnit)?Number(quantity(kmObject)):rawKm?number(rawKm):null;
  const kw=text.match(/\b(\d{2,4})\s*kW\b/i), ps=text.match(/\b(\d{2,4})\s*(?:PS|hp)\b/i);
  const engine=car.vehicleEngine||{};
  const cc=labelled('Hubraum|Displacement|Engine capacity|Κυβισμός','[\\d. ,]+(?=\\s*(?:cm|cc))');
  const fuel=String(engine.fuelType||car.fuelType||labelled('Kraftstoff|Fuel type|Carburant','[^\\n]+')||'').slice(0,80);
  const transmission=String(car.vehicleTransmission||labelled('Getriebe|Transmission','[^\\n]+')||'').slice(0,80);
  const co2=labelled('CO[₂2](?:-Emissionen| emissions)?','[\\d.,]+(?=\\s*g)');
  return { title, brand:String(car.brand?.name||car.brand||car.manufacturer?.name||'').slice(0,80),model:String(car.model||'').slice(0,120),registration:reg,mileage:Number.isFinite(mileage)&&mileage>=0&&mileage<=3000000?mileage:null,powerKw:kw?+kw[1]:null,powerPs:ps?+ps[1]:null,displacement:cc?number(cc):null,fuel,transmission,co2:co2?Number(co2.replace(',','.')):null, searchText:(title+' '+text).slice(0,30000), warnings:[...(!reg?['Δεν αναγνωρίστηκε η πρώτη άδεια.']:[]),...(!Number.isFinite(mileage)?['Δεν αναγνωρίστηκαν τα χιλιόμετρα.']:[])] };
}
// Paths are supplemental naming evidence, never a source of dates or mileage.
export function listingSlug(url) {
  if (!url) return '';
  try {
    const path = new URL(validateListingUrl(url)).pathname;
    return decodeURIComponent(path.match(/^\/auto-inserat\/([^/]+)\//)?.[1]
      || path.match(/^\/(?:offers|angebote|offres|annunci)\/([^/]+)/)?.[1] || '');
  } catch {
    return '';
  }
}

const optionalModelWords = new Set(['gr', 'amg', 'facelift', 'coupe', 'sedan', 'cabrio', 'sportback', 'touring']);
function engineLitres(value) {
  const match = String(value ?? '').match(/\b([1-8])[.,](\d)(?:t|tsi|tfsi|tdi|d|l)?\b/i);
  return match ? match[1] + '.' + match[2] : undefined;
}

function gearbox(value) {
  const text = ' ' + normalize(value) + ' ';
  if (/\b(?:[4-9]\s*)?a t\b|\b(?:automatic|automatik|dsg|dct|steptronic|tiptronic|cvt|s tronic)\b/.test(text)) return 'auto';
  if (/\bm t\b|\b(?:manual|schaltgetriebe|handschaltung|manuell)\b/.test(text)) return 'manual';
  return '';
}

// Toyota Europe identifies the Jarama Racetrack Edition as a 3.0-litre automatic.
function jaramaSignature(query, brand) {
  return normalize(brand) === 'toyota' && /\bsupra\b/.test(query) && /\bjarama(?: racetrack)?\b/.test(query)
    ? { litres: '3.0', gearbox: 'auto' } : null;
}

// Scores measure similarity, not statistical confidence. Confirmation is mandatory.
export function rankCandidates(listing, datasets, brand) {
  // BMW advertisements separate the drivetrain, engine number and fuel suffix.
  const editionText = value => normalize(value).replace(/\b([xs]drive)\s*(\d{2})\s*(de|d|i|e)\b/g, '$1$2$3');
  const fullTitle = [listing.title, listing.model, listing.slug].filter(Boolean).join(' ');
  const query=' '+editionText(fullTitle)+' ';
  const signature = jaramaSignature(query, brand);
  const cc = Number(listing.displacement);
  const litres = cc >= 600 && cc <= 8500 ? (Math.round(cc / 100) / 10).toFixed(1) : engineLitres(listing.title) || signature?.litres;
  const transmission = gearbox(listing.transmission) || gearbox(listing.title) || signature?.gearbox;
  const tokens=s=>editionText(s).split(' ').filter(t=>t.length>1);
  const driveCode = value => editionText(value).match(/\b[xs]drive\d{2}(?:de|d|i|e)\b/)?.[0];
  const advertisedCode = driveCode(listing.title) || driveCode(listing.model) || driveCode(listing.slug);
  const out=[];
  for(const {year,data} of datasets) for(const [model,value] of Object.entries(data.models||{})) {
    const mt=tokens(model); let matched=mt.filter(t=>query.includes(' '+t+' ')).length;
    // Common catalogue family names differ from advertised engine names.
    const greekSeries=String(model).match(/σειρ[αά]\s*(\d)/i);
    if(!matched&&greekSeries&&new RegExp('\\b'+greekSeries[1]+'\\d{2}[a-z]*\\b','i').test(listing.title))matched=1;
    const family=normalize(model).match(/(?:series|serie) (\d)|^(\d) (?:series|serie)|^([a-z]) (?:class|klasse)/);
    if(!matched && family) {const f=family[1]||family[2]||family[3];if(new RegExp('\\b'+f+'\\s?\\d{2}[a-z]*\\b','i').test(listing.title))matched=mt.length;}
    if(!matched && /mercedes/i.test(brand)){const cls=normalize(model).match(/^([a-z])(?: class| klasse|$)/);if(cls&&new RegExp('\\b'+cls[1]+'\\s?\\d{2,3}\\b','i').test(listing.title))matched=mt.length;}
    if(!matched)continue;
    const distinctive = mt.filter(token => !optionalModelWords.has(token));
    const fullModel = query.includes(' ' + editionText(model) + ' ');
    const coreMatch = distinctive.length && distinctive.every(token => query.includes(' ' + token + ' '));
    const modelScore = fullModel ? 46 : coreMatch ? 40 : 40 * matched / Math.max(1, mt.length);
    if (!coreMatch && mt.some(token => optionalModelWords.has(token)) && mt.every(token => optionalModelWords.has(token) || !query.includes(' ' + token + ' '))) continue;
    for(const [editionIndex,ed] of (value.editions||[]).entries()) {
      const et=tokens(ed.name).filter(t=>!tokens(brand+' '+model).includes(t));
      const aliasMatch = (ed.nameAliases || []).some(alias => {
        const words = tokens(alias).filter(t => !tokens(brand+' '+model).includes(t));
        return words.length && query.includes(' ' + words.join(' ') + ' ');
      });
      let score=modelScore+35*et.filter(t=>query.includes(' '+t+' ')).length/Math.max(1,et.length);
      if (aliasMatch) score += 22;
      let evidence=matched; const conflicts=[];
      const candidateLitres = engineLitres(ed.name);
      const candidateGearbox = gearbox(ed.transmission) || gearbox(ed.name);
      const engineMatch = Boolean(litres && candidateLitres === litres);
      if (engineMatch) { score += 24; evidence++; }
      else if (litres && candidateLitres) { score -= 24; conflicts.push('displacement'); }
      if (transmission && candidateGearbox) {
        if (transmission === candidateGearbox) { score += 13; evidence++; }
        else { score -= 22; conflicts.push('transmission'); }
      }
      const power = Number(listing.powerPs) || (Number(listing.powerKw) ? Number(listing.powerKw) * 1.36 : 0);
      const cataloguePower = Number(String(ed.name).match(/\b(\d{2,4})\s*(?:ps|hp)\b/i)?.[1]);
      if (power && cataloguePower) {
        if (Math.abs(power - cataloguePower) <= 3) score += 9;
        else if (Math.abs(power - cataloguePower) >= 12) { score -= 12; conflicts.push('power'); }
      }
      if(listing.fuel && ed.fuel) { const fuel=s=>/diesel/i.test(s)?'diesel':/benzin|petrol|gasoline/i.test(s)?'petrol':/electric|elektro/i.test(s)?'electric':null; const a=fuel(listing.fuel),b=fuel(ed.fuel);if(a&&b&&a!==b){score-=35;conflicts.push('fuel');} }
      const candidateCode = driveCode(ed.name);
      const exactCode = Boolean(advertisedCode && advertisedCode === candidateCode);
      if (exactCode) { score += 20; evidence++; }
      else if (advertisedCode && candidateCode) {
        score -= 16;
        if (advertisedCode.slice(6) === candidateCode.slice(6)) score += 7;
        if (advertisedCode[0] === candidateCode[0]) score += 5;
        conflicts.push('engine');
      }
      const trimMatch = /\bm sport\b/.test(query) && /\bm sport\b/.test(editionText(ed.name));
      if (trimMatch) score += 8;
      const drive=/\b(?:xdrive(?:\d{2}[a-z]+)?|quattro|4matic|awd|4wd)\b/i;
      if(!advertisedCode && drive.test(editionText(listing.title)) && !drive.test(editionText(ed.name))) score-=15;
      out.push({brand,year,model,editionIndex,name:ed.name,score:Math.max(0,Math.min(100,Math.round(score * 100 / 80))),evidence,conflicts,exactCode,trimMatch,editionApproximation:Boolean(signature && /\bsupra\b/i.test(model) && !/\bjarama\b/i.test(ed.name)),rank:score});
    }
  }
  return out.filter(x=>x.score>=30).sort((a,b)=>b.rank-a.rank||a.model.localeCompare(b.model)||a.editionIndex-b.editionIndex).slice(0,5);
}
