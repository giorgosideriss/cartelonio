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
  return { title, brand:String(car.brand?.name||car.brand||car.manufacturer?.name||'').slice(0,80),model:String(car.model||'').slice(0,120),registration:reg,mileage:Number.isFinite(mileage)&&mileage>=0&&mileage<=3000000?mileage:null,powerKw:kw?+kw[1]:null,powerPs:ps?+ps[1]:null,displacement:cc?number(cc):null,fuel,transmission,co2:co2?Number(co2.replace(',','.')):null, searchText:(title+' '+text).slice(0,30000), warnings:[...(!reg?['Δεν αναγνωρίστηκε η πρώτη άδεια.']:[]),...(reg&&!reg.day?['Η αγγελία δίνει μόνο μήνα/έτος. Συμπλήρωσε την ακριβή ημέρα.']:[]),...(!Number.isFinite(mileage)?['Δεν αναγνωρίστηκαν τα χιλιόμετρα.']:[])] };
}
// Scores measure similarity, not statistical confidence. Confirmation is mandatory.
export function rankCandidates(listing, datasets, brand) {
  const query=' '+normalize(listing.title+' '+listing.model)+' ';
  const tokens=s=>normalize(s).split(' ').filter(t=>t.length>1);
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
    for(const [editionIndex,ed] of (value.editions||[]).entries()) {
      const et=tokens(ed.name).filter(t=>!tokens(brand+' '+model).includes(t));
      let score=40*matched/Math.max(1,mt.length)+35*et.filter(t=>query.includes(' '+t+' ')).length/Math.max(1,et.length);
      let evidence=matched; const conflicts=[];
      // Only compare structured fields actually present in the catalogue.
      for(const [field,keys,tol,weight] of [['powerPs',['powerPs','horsepower','hp','ps'],5,10],['powerKw',['powerKw','kw'],4,10],['displacement',['displacement','cc','engineCapacity'],70,8]]) {
        const key=keys.find(k=>ed[k]!=null && Number.isFinite(Number(ed[k])));
        if(key && listing[field]!=null) { if(Math.abs(Number(ed[key])-listing[field])<=tol){score+=weight;evidence++;}else{score-=30;conflicts.push(field);} }
      }
      const automatic=/automatic|automatik|dsg|dct|steptronic|s tronic/i;
      if(listing.transmission && ed.transmission) {const a=automatic.test(listing.transmission),b=automatic.test(ed.transmission);if(a!==b){score-=25;conflicts.push('transmission');}else{score+=5;evidence++;}}
      if(listing.fuel && ed.fuel) { const fuel=s=>/diesel/i.test(s)?'diesel':/benzin|petrol|gasoline/i.test(s)?'petrol':/electric|elektro/i.test(s)?'electric':null; const a=fuel(listing.fuel),b=fuel(ed.fuel);if(a&&b&&a!==b){score-=35;conflicts.push('fuel');} }
      const drive=/\b(xdrive|quattro|4matic|awd|4wd)\b/i;
      if(drive.test(listing.title) && !drive.test(ed.name)) score-=15;
      out.push({brand,year,model,editionIndex,name:ed.name,score:Math.max(0,Math.min(100,Math.round(score))),evidence,conflicts});
    }
  }
  return out.filter(x=>x.score>=30).sort((a,b)=>b.score-a.score||a.model.localeCompare(b.model)||a.editionIndex-b.editionIndex).slice(0,5);
}
