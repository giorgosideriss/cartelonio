/* Shared Euro policy. Generated into each Edge Function as well as the browser. */
const CartelonioEuroPolicy = (() => {
  const version = '20261027-euro-v1';
  const options = [
    ['Electric','Electric — Αμιγώς ηλεκτρικό',0,0,'Electric'],
    ['zero_emission','Μηδενικών εκπομπών — Υδρογόνο',0,0,'Zero emission'],
    ['euro6e_bis_fcm','Euro 6e-bis-FCM',0,0,'Euro 6e-bis-FCM'],
    ['euro6e_bis','Euro 6e-bis',0,0,'Euro 6e-bis'],
    ['euro6e','Euro 6e',0,0,'Euro 6e'],
    ['euro6d_isc_fcm','Euro 6d-ISC-FCM',0,0,'Euro 6d-ISC-FCM'],
    ['euro6d_isc','Euro 6d-ISC',0,0,'Euro 6d-ISC'],
    ['euro6d','Euro 6d — χωρίς προσαύξηση',0,0,'Euro 6d'],
    ['euro6d_50','Euro 6d (ZJ) — +50%',50,0,'Euro 6d'],
    ['euro6d_temp_evap_isc','Euro 6d-TEMP-EVAP-ISC',0,0,'Euro 6d-TEMP-EVAP-ISC'],
    ['euro6d_temp_isc','Euro 6d-TEMP-ISC',0,0,'Euro 6d-TEMP-ISC'],
    ['euro6d_temp_evap','Euro 6d-TEMP-EVAP',0,0,'Euro 6d-TEMP-EVAP'],
    ['euro6d_temp','Euro 6d-TEMP — χωρίς προσαύξηση',0,0,'Euro 6d-TEMP'],
    ['euro6d_temp_50','Euro 6d-TEMP (ZG) — +50%',50,0,'Euro 6d-TEMP'],
    ['euro6c','Euro 6c (AD) — χωρίς προσαύξηση',0,0,'Euro 6c'],
    ['euro6c_evap','Euro 6c-EVAP',0,0,'Euro 6c-EVAP'],
    ['euro6c_50','Euro 6c (AA / ZA / ZD) — +50%',50,0,'Euro 6c'],
    ['euro6b','Euro 6b (W / BA) — +50%',50,0,'Euro 6b'],
    ['euro6b_100','Euro 6b (Q / T) — +100%',100,0,'Euro 6b'],
    ['euro6a','Euro 6a — +200%',200,0,'Euro 6a'],
    ['euro5b','Euro 5b — +100%',100,1000,'Euro 5b'],
    ['euro5a','Euro 5a — +200%',200,1000,'Euro 5a'],
    ['euro4','Euro 4 — +200%',200,3000,'Euro 4'],
    ['euro3','Euro 3 — +200%',200,0,'Euro 3'],
    ['euro2','Euro 2 — +200%',200,0,'Euro 2'],
    ['euro1','Euro 1 — +200%',200,0,'Euro 1'],
    ['euro6','Euro 6 (γενική επιλογή)',0,0,'Euro 6'],
    ['euro6_unknown_50','Euro 6 (γενικό) — +50%',50,0,'Euro 6'],
    ['euro6_unknown_100','Euro 6 (γενικό) — +100%',100,0,'Euro 6'],
    ['modern','Σύγχρονο πρότυπο — χωρίς προσαύξηση',0,0,'Modern'],
    ['no_euro_no_co2','Χωρίς Euro / χωρίς τεκμηριωμένο CO₂',300,0,'No Euro / CO2'],
  ].map(([code,label,surchargePercent,environmentalFee,standard]) => ({code,label,surchargePercent,environmentalFee,standard}));
  const byCode = Object.fromEntries(options.map(x => [x.code,x]));
  const compact = v => String(v ?? '').toLowerCase().replace(/[^a-z0-9]/g,'');
  const byCompact = Object.fromEntries(options.map(x => [compact(x.code),x.code]));
  function normalize(value) { return byCompact[compact(value)] || ''; }
  function label(value,historical=false) { const entry=byCode[normalize(value)];return (historical?entry?.standard:entry?.label) || String(value || '—'); }
  function valid(value) { return !!normalize(value); }
  function fingerprint(e) {
    const s=JSON.stringify([e.euro,e.euroStandard,e.euroEstimate,e.euroAudit20261026,e.powertrain]);
    let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
    return (h>>>0).toString(16);
  }
  function approvalCharacter(value) {
    const m=String(value||'').toUpperCase().match(/\d{4}\/\d+([A-Z]{1,2})\*/);
    return m?.[1] || '';
  }
  const characterRates={Q:100,T:100,W:50,BA:50,ZA:50,ZD:50,ZG:50,ZJ:50,AA:50,AD:0,AG:0,BG:0,CG:0,DG:0,AJ:0,AM:0,AP:0,EA:0,EB:0,EC:0};
  function profile(code, detail={}) {
    code=normalize(code);if(!code)return null;
    return {...byCode[code],schemaVersion:1,policyVersion:version,...detail,code};
  }
  function fromInput(value) { const code=normalize(value);return profile(code,{status:'user_provided',isEstimate:['euro6','euro6_unknown_50','euro6_unknown_100','modern'].includes(code),basis:'user_selection'}); }
  function codeForStandard(standard,rate) {
    const c=normalize(standard);if(!c)return '';
    if(c==='euro6b')return rate===100?'euro6b_100':'euro6b';
    if(c==='euro6c')return rate===50?'euro6c_50':'euro6c';
    if(c==='euro6d_temp')return rate===50?'euro6d_temp_50':'euro6d_temp';
    if(c==='euro6d')return rate===50?'euro6d_50':'euro6d';
    return c;
  }
  function resolve(e={},context={}) {
    if(e.powertrain==='electric'||compact(e.euro)==='electric')return profile('Electric',{status:'catalog_reference',isEstimate:false,basis:'electric_powertrain',sourceFingerprint:fingerprint(e)});
    if(e.powertrain==='hydrogen')return profile('zero_emission',{status:'catalog_reference',isEstimate:false,basis:'hydrogen_powertrain',sourceFingerprint:fingerprint(e)});
    const cached=e.euroTaxProfile;
    if(!context.ignoreCache&&cached?.policyVersion===version&&cached.sourceFingerprint===fingerprint(e)&&Object.hasOwn(byCode,cached.code)&&
       (cached.basis!=='unresolved_catalogue_year_estimate'||cached.catalogueYear===Number(context.year))) {
      return profile(cached.code,{...cached,surchargePercent:byCode[cached.code].surchargePercent,environmentalFee:byCode[cached.code].environmentalFee});
    }
    const audit=e.euroAudit20261026||{},estimate=e.euroEstimate||{};
    const sourceStandard=normalize(e.euroStandard)&&compact(e.euroStandard)!=='euro6'?e.euroStandard:'';
    const standard=sourceStandard || (normalize(estimate.standard)?estimate.standard:'');
    const reference=!!sourceStandard&&audit.status==='source_matched';
    const existing=!!sourceStandard&&audit.status==='existing_catalogue_specific';
    const selected=normalize(standard);
    const numbers=[...(audit.registryEvidence?.emissionApprovalNumbers||[]),...(context.approvals||[])];
    const compatible={euro6b:['Q','T','W','BA'],euro6c:['ZA','ZD','AA','AD'],euro6d_temp:['ZG','AG','BG','CG','DG'],euro6d:['ZJ','AJ','AM','AP']};
    const chars=[...new Set(numbers.map(approvalCharacter).filter(x=>Object.hasOwn(characterRates,x)&&(!compatible[selected]||compatible[selected].includes(x))))];
    const rates=[...new Set(chars.map(x=>characterRates[x]))];
    let rate,code,basis,taxEstimate=false;
    if(selected&&selected!=='euro6') {
      if(['euro6b','euro6c','euro6d_temp','euro6d'].includes(selected)) {
        if(rates.length===1){rate=rates[0];basis='approval_character';}
        else if(rates.length>1){rate=Math.max(...rates);basis='ambiguous_approval_highest_candidate';taxEstimate=true;}
        else if(Number.isFinite(estimate.taxSurchargePercent)&&[0,50,100].includes(estimate.taxSurchargePercent)) {rate=estimate.taxSurchargePercent;basis='estimate_tax_group';taxEstimate=true;}
        else {rate=selected==='euro6b'?50:selected==='euro6c'?50:0;basis='subcategory_default_without_approval_character';taxEstimate=true;}
      } else {rate=byCode[selected].surchargePercent;basis='explicit_subcategory';}
      code=codeForStandard(standard,rate);
    } else {
      const base=normalize(e.euro);
      if(base&&base!=='euro6'&&base!=='modern')return profile(base,{status:'catalog_existing',isEstimate:true,basis:'existing_catalogue_value',sourceFingerprint:fingerprint(e)});
      if(rates.length){rate=Math.max(...rates);basis=rates.length===1?'candidate_approval_group':'ambiguous_approval_highest_candidate';}
      else {
        // Temporary catalogue estimate only. Never consult the customer's first-registration date.
        const y=Number(estimate.effectiveModelYear||audit.registryEvidence?.effectiveModelYear||context.year);
        rate=Number.isFinite(y)&&y<=2015?100:Number.isFinite(y)&&y<=2018?50:0;
        basis='unresolved_catalogue_year_estimate';
      }
      code=rate===100?'euro6_unknown_100':rate===50?'euro6_unknown_50':'euro6';taxEstimate=true;
    }
    if(!code)return null;
    return profile(code,{status:reference&&!taxEstimate?'catalog_reference':existing?'catalog_existing':'catalog_estimated',isEstimate:!reference||taxEstimate,basis,catalogueYear:Number(context.year)||null,sourceStandard:standard||String(e.euro||'Euro 6'),approvalCharacters:chars,candidateSurchargePercents:rates,taxGroupIsEstimate:taxEstimate,sourceFingerprint:fingerprint(e)});
  }
  return {version,options,normalize,label,valid,resolve,fromInput,fingerprint,approvalCharacter,characterRates};
})();
if(typeof window!=='undefined')window.CartelonioEuro=CartelonioEuroPolicy;
if(typeof module!=='undefined'&&module.exports)module.exports=CartelonioEuroPolicy;
