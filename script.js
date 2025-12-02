/* === ΠΗΓΕΣ ΔΕΔΟΜΕΝΩΝ === */
const DATA_SOURCES = {
  "Toyota": {
    "2020": "data/toyota/2020/2020.json",
    "2021": "data/toyota/2021/2021.json"
  },
  "Audi": {
    "2017": "data/audi/2017/2017.json",
    "2018": "data/audi/2018/2018.json",
    "2019": "data/audi/2019/2019.json"
  },
  "Abarth": {
    "2017": "data/abarth/2017/2017.json"
  }
};

let currentDataset = null;

/* === CATEGORY TABLES === */
const categories = {
  "Επιλέξτε Κατηγορία Αμαξώματος": [[0,0]],
  "SUV": [[0.5,0.11],[1,0.22],[1.5,0.25],[2,0.29]],
  "Hatchback": [[0.5,0.09],[1,0.19],[1.5,0.24],[2,0.28]],
  "Sedan": [[0.5,0.15],[1,0.3],[1.5,0.33],[2,0.36]],
  "Cabrio": [[0.5,0.11],[1,0.22],[1.5,0.26],[2,0.3]],
  "Coupe/Roadster": [[0.5,0.12],[1,0.25],[1.5,0.25],[2,0.29]],
  "MPV": [[0.5,0.09],[1,0.19],[1.5,0.23],[2,0.27]]
};

/* === CO₂ TABLE === */
const coTable = {
  "<14000": [0.038,0.04,0.044,0.048],
  "14-17k": [0.076,0.08,0.088,0.096],
  "17-20k": [0.152,0.16,0.176,0.192],
  "20-25k": [0.228,0.24,0.264,0.288],
  ">25k":   [0.304,0.32,0.352,0.384]
};

function parseDate(v){ return v ? new Date(v) : null; }
function yearsBetween(d1,d2){ return Math.floor((d2-d1)/(1000*60*60*24*365)); }
function autoAvgKm(y){ return y*15000; }

function lookupDep(cat,years){
  const t = categories[cat];
  let r = 0;
  t.forEach(([y,val]) => { if(years>=y) r=val; });
  return r;
}

function lookupCO2(price,co2){
  let br="<14000";
  if(price>=14000 && price<17000) br="14-17k";
  else if(price>=17000 && price<20000) br="17-20k";
  else if(price>=20000 && price<25000) br="20-25k";
  else if(price>=25000) br=">25k";

  let c=0;
  if(co2<=100) c=0;
  else if(co2<=120) c=1;
  else if(co2<=140) c=2;
  else c=3;

  return coTable[br][c];
}

function mileageDep(avg,m){
  if(m<=avg) return 0;
  return ((m-avg)/500)*0.001;
}

/* === LOAD DATA === */

async function loadDataset(){
  const brand=document.getElementById("brandSelect").value;
  const year=document.getElementById("yearSelect").value;

  if(!brand||!year){ currentDataset=null; return; }

  const url = DATA_SOURCES[brand][year];
  const res = await fetch(url);
  currentDataset = await res.json();

  populateModels();
}

function populateBrandSelect(){
  const el=document.getElementById("brandSelect");
  el.innerHTML='<option value="">Επιλέξτε</option>';
  Object.keys(DATA_SOURCES).forEach(b=>{
    el.innerHTML+=`<option value="${b}">${b}</option>`;
  });
}

function populateYearSelect(){
  const brand=document.getElementById("brandSelect").value;
  const el=document.getElementById("yearSelect");
  el.innerHTML='<option value="">Επιλέξτε</option>';

  if(!brand) return;
  Object.keys(DATA_SOURCES[brand]).forEach(y=>{
    el.innerHTML+=`<option value="${y}">${y}</option>`;
  });
}

function populateModels(){
  const el=document.getElementById("modelSelect");
  el.innerHTML='<option value="">Επιλέξτε</option>';
  if(!currentDataset) return;

  Object.keys(currentDataset.models).forEach(m=>{
    el.innerHTML+=`<option>${m}</option>`;
  });
}

function populateVersions(){
  const model=document.getElementById("modelSelect").value;
  const el=document.getElementById("versionSelect");
  el.innerHTML='<option value="">Επιλέξτε</option>';

  if(!model||!currentDataset) return;

  const eds=currentDataset.models[model].editions;
  eds.forEach((e,i)=>{
    el.innerHTML+=`<option value="${i}">${e.name}</option>`;
  });
}

function loadExtras(){
  const model=document.getElementById("modelSelect").value;
  const idx=parseInt(document.getElementById("versionSelect").value,10);
  const extrasEl=document.getElementById("extras");

  extrasEl.innerHTML="";

  if(!currentDataset||!model||isNaN(idx)) return;

  const ed=currentDataset.models[model].editions[idx];
  if(!ed.extras){
    extrasEl.disabled=true;
    return;
  }

  extrasEl.disabled=false;

  ed.extras.forEach(ex=>{
    extrasEl.innerHTML+=`<option value="${ex.price}">${ex.name} (+${ex.price})</option>`;
  });
}

/* === AUTO-FILL === */
function autoFill(){
  const model=document.getElementById("modelSelect").value;
  const idx=parseInt(document.getElementById("versionSelect").value,10);
  if(!currentDataset||!model||isNaN(idx)) return;

  const ed=currentDataset.models[model].editions[idx];

  document.getElementById("price").value = ed.variants[0].priceNet;
  document.getElementById("co2").value   = ed.co2;
  document.getElementById("category").value = currentDataset.models[model].category;

  loadExtras();
}

/* === CALCULATE === */
function calculate(){
  let price = Number(document.getElementById("price").value);

  // ➕ Προσθέτουμε τα επιλεγμένα extras
  const extraSel=[...document.getElementById("extras").selectedOptions];
  extraSel.forEach(opt => price += Number(opt.value));

  const cat=document.getElementById("category").value;
  const fr=parseDate(document.getElementById("firstReg").value);
  const im=parseDate(document.getElementById("importDate").value);
  const km=Number(document.getElementById("mileage").value);
  const co2=Number(document.getElementById("co2").value);

  const yrs=yearsBetween(fr,im);
  const ydep=lookupDep(cat,yrs);
  const avg=autoAvgKm(yrs);
  const kdep=mileageDep(avg,km);
  const totalDep=ydep+kdep;

  const finalPrice = price*(1-totalDep);
  const coef=lookupCO2(price,co2);
  const tax=finalPrice*coef;

  document.getElementById("results").innerHTML=`
    <p>Ηλικία: ${yrs}</p>
    <p>Μέσος όρος: ${avg}</p>
    <p>Τελική αξία: €${finalPrice.toFixed(0)}</p>
    <p>Τέλος ταξινόμησης: €${tax.toFixed(2)}</p>
  `;
}

/* === INIT === */
document.addEventListener("DOMContentLoaded",()=>{
  populateBrandSelect();
  populateYearSelect();

  Object.keys(categories).forEach(c=>{
    document.getElementById("category").innerHTML+=`<option>${c}</option>`;
  });

  document.getElementById("brandSelect").addEventListener("change",()=>{
    populateYearSelect();
  });

  document.getElementById("yearSelect").addEventListener("change",loadDataset);
  document.getElementById("modelSelect").addEventListener("change",populateVersions);
  document.getElementById("versionSelect").addEventListener("change",autoFill);

  document.getElementById("calcBtn").addEventListener("click",calculate);
});
