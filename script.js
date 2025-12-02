/* === ΡΥΘΜΙΣΗ ΠΗΓΩΝ ΔΕΔΟΜΕΝΩΝ === */
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

/* === CATEGORY DEPRECIATION TABLES === */
const categories = {
  "Επιλέξτε Κατηγορία Αμαξώματος": Array(20).fill([0,0]),

  "SUV": [[0.5,0.11],[1,0.22],[1.5,0.25],[2,0.29],[2.5,0.35],[3,0.37],[3.5,0.44],[4,0.5],[4.5,0.56],[5,0.62],[5.5,0.66],[6,0.68],[6.5,0.71],[7,0.73],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "Hatchback": [[0.5,0.09],[1,0.19],[1.5,0.24],[2,0.28],[2.5,0.32],[3,0.37],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.81],[10,0.83]],

  "Sedan": [[0.5,0.15],[1,0.3],[1.5,0.33],[2,0.36],[2.5,0.4],[3,0.43],[3.5,0.5],[4,0.57],[4.5,0.64],[5,0.72],[5.5,0.74],[6,0.76],[6.5,0.78],[7,0.8],[7.5,0.81],[8,0.84],[8.5,0.85],[9,0.85],[9.5,0.86],[10,0.87]],

  "Cabrio": [[0.5,0.11],[1,0.22],[1.5,0.26],[2,0.3],[2.5,0.33],[3,0.36],[3.5,0.42],[4,0.48],[4.5,0.54],[5,0.6],[5.5,0.64],[6,0.67],[6.5,0.69],[7,0.72],[7.5,0.73],[8,0.78],[8.5,0.78],[9,0.79],[9.5,0.81],[10,0.82]],

  "Coupe/Roadster": [[0.5,0.12],[1,0.25],[1.5,0.25],[2,0.29],[2.5,0.32],[3,0.36],[3.5,0.41],[4,0.47],[4.5,0.53],[5,0.59],[5.5,0.63],[6,0.66],[6.5,0.68],[7,0.71],[7.5,0.73],[8,0.76],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "MPV": [[0.5,0.09],[1,0.19],[1.5,0.23],[2,0.27],[2.5,0.33],[3,0.36],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]]
};

/* === CO2 TABLE === */
const coTable = {
  "<14000": [0.038,0.04,0.044,0.048,0.052,0.056,0.064,0.08],
  "14-17k": [0.076,0.08,0.088,0.096,0.104,0.112,0.128,0.16],
  "17-20k": [0.152,0.16,0.176,0.192,0.208,0.224,0.256,0.32],
  "20-25k": [0.228,0.24,0.264,0.288,0.312,0.336,0.384,0.48],
  ">25k":   [0.304,0.32,0.352,0.384,0.416,0.448,0.512,0.64]
};

/* === HELPERS === */
function parseDate(v){ return v ? new Date(v) : null; }

function yearsBetween(d1, d2){
  if (!d1 || !d2) return 0;
  return Math.floor((d2 - d1) / (365*24*60*60*1000));
}

function autoAvgKm(years){
  return years * 15000;
}

function lookupDepreciation(cat, years){
  const table = categories[cat];
  if (!table) return 0;
  let r = table[0][1];
  for (let i=0;i<table.length;i++){
    if(years >= table[i][0]) r = table[i][1];
  }
  return r;
}

function lookupCO2(price, co2){
  let bracket = "<14000";
  if(price>=14000 && price<17000) bracket="14-17k";
  else if(price>=17000 && price<20000) bracket="17-20k";
  else if(price>=20000 && price<25000) bracket="20-25k";
  else if(price>=25000) bracket=">25k";

  let col=0;
  if(co2<=100) col=0;
  else if(co2<=120) col=1;
  else if(co2<=140) col=2;
  else if(co2<=160) col=3;
  else if(co2<=180) col=4;
  else if(co2<=200) col=5;
  else if(co2<=250) col=6;
  else col=7;

  return coTable[bracket][col];
}

function mileageDep(avgKm, mileage){
  if(mileage <= avgKm) return 0;
  return ((mileage - avgKm) / 500) * 0.001;
}

/* === DROPDOWNS === */

async function loadDatasetForSelection() {
  const brand = document.getElementById("brandSelect").value;
  const year  = document.getElementById("yearSelect").value;

  currentDataset = null;

  if (!brand || !year) return;

  const url = DATA_SOURCES[brand]?.[year];
  if (!url) return;

  try {
    const res = await fetch(url);
    currentDataset = await res.json();
    populateModels();
  } catch (e) {
    console.error(e);
  }
}

function populateBrandSelect(){
  const el = document.getElementById("brandSelect");
  el.innerHTML = '<option value="">Επιλέξτε Μάρκα</option>';
  Object.keys(DATA_SOURCES).forEach(b=>{
    let o = document.createElement("option");
    o.value=b; o.textContent=b;
    el.appendChild(o);
  });
}

function populateYearSelect(){
  const b = document.getElementById("brandSelect").value;
  const el = document.getElementById("yearSelect");
  el.innerHTML = '<option value="">Επιλέξτε Χρονολογία</option>';
  if(!b) return;
  Object.keys(DATA_SOURCES[b]).forEach(y=>{
    let o = document.createElement("option");
    o.value=y; o.textContent=y;
    el.appendChild(o);
  });
}

function populateModels(){
  const el = document.getElementById("modelSelect");
  el.innerHTML = '<option value="">Επιλέξτε Μοντέλο</option>';
  if(!currentDataset) return;
  Object.keys(currentDataset.models).forEach(m=>{
    let o=document.createElement("option");
    o.value=m; o.textContent=m;
    el.appendChild(o);
  });
}

function populateVersions(){
  const model = document.getElementById("modelSelect").value;
  const el = document.getElementById("versionSelect");
  el.innerHTML='<option value="">Επιλέξτε Έκδοση</option>';
  if(!model || !currentDataset) return;

  const editions = currentDataset.models[model].editions;
  editions.forEach((e,i)=>{
    let o=document.createElement("option");
    o.value=i;
    o.textContent=e.name;
    el.appendChild(o);
  });
}

function populateColors(){
  const model = document.getElementById("modelSelect").value;
  const edIndex = parseInt(document.getElementById("versionSelect").value);

  const el = document.getElementById("colorSelect");
  el.innerHTML = '<option value="">Επιλέξτε Extra</option>';

  if(!model || isNaN(edIndex)) return;

  const edition = currentDataset.models[model].editions[edIndex];
  const variants = edition.variants;

  variants.forEach((v,i)=>{
    let o=document.createElement("option");
    o.value=i;
    o.textContent=v.color;
    el.appendChild(o);
  });

  if(variants.length>0){
    el.value="0";
    autoFillCarData();
  }

  /* === LOAD EXTRAS === */
  loadExtras(edition.extras || []);
}

/* === EXTRAS MULTISELECT === */
function loadExtras(extrasList){
  const el = document.getElementById("extras");
  el.innerHTML="";

  if(!extrasList || extrasList.length===0){
    el.disabled=true;
    return;
  }

  el.disabled=false;

  extrasList.forEach(ex=>{
    let o=document.createElement("option");
    o.value = ex.price;
    o.textContent = `${ex.name} (+${ex.price} €)`;
    el.appendChild(o);
  });
}

function autoFillCarData(){
  const model = document.getElementById("modelSelect").value;
  const edIndex = parseInt(document.getElementById("versionSelect").value);
  const colorIndex = parseInt(document.getElementById("colorSelect").value);

  if(!model || isNaN(edIndex) || isNaN(colorIndex)) return;

  const mod = currentDataset.models[model];
  const ed  = mod.editions[edIndex];
  const varr = ed.variants[colorIndex];

  document.getElementById("price").value = varr.priceNet;
  document.getElementById("co2").value = ed.co2;

  if(mod.category) document.getElementById("category").value = mod.category;
}

/* === MAIN CALC === */
function calculate(){
  const price      = Number(document.getElementById("price").value);
  const cat        = document.getElementById("category").value;
  const firstReg   = parseDate(document.getElementById("firstReg").value);
  const importDate = parseDate(document.getElementById("importDate").value);
  const mileage    = Number(document.getElementById("mileage").value);
  const co2        = Number(document.getElementById("co2").value);

  const years   = yearsBetween(firstReg, importDate);
  const avgKm   = autoAvgKm(years);
  const dep1    = lookupDepreciation(cat, years);
  const dep2    = mileageDep(avgKm, mileage);
  const total   = dep1 + dep2;

  const finalPrice = price * (1 - total);
  const coef = lookupCO2(price, co2);
  const tax = finalPrice * coef;

  document.getElementById("results").innerHTML = `
    <p><strong>Ηλικία:</strong> ${years}</p>
    <p><strong>Μέσος όρος χιλιομέτρων:</strong> ${avgKm}</p>
    <p><strong>Απομείωση:</strong> ${(total*100).toFixed(0)}%</p>
    <p><strong>Αξία μετά από απομείωση:</strong> €${finalPrice.toFixed(0)}</p>
    <p><strong>Συντελεστής CO₂:</strong> ${coef}</p>
    <h3>Τελός ταξινόμησης: €${tax.toFixed(2)}</h3>
  `;
}

/* === INIT === */
document.addEventListener("DOMContentLoaded",()=>{
  /* Category dropdown */
  const catSel = document.getElementById("category");
  Object.keys(categories).forEach(c=>{
    let o=document.createElement("option");
    o.value=c; o.textContent=c;
    catSel.appendChild(o);
  });

  populateBrandSelect();
  populateYearSelect();

  document.getElementById("brandSelect").addEventListener("change",()=>{
    populateYearSelect();
  });

  document.getElementById("yearSelect").addEventListener("change", loadDatasetForSelection);
  document.getElementById("modelSelect").addEventListener("change", populateVersions);
  document.getElementById("versionSelect").addEventListener("change", populateColors);
  document.getElementById("colorSelect").addEventListener("change", autoFillCarData);

  document.getElementById("calcBtn").addEventListener("click", calculate);

  document.getElementById("resetBtn").addEventListener("click",()=>{
    document.getElementById("calcForm").reset();
    document.getElementById("results").innerHTML =
      "<p>Συμπληρώστε τα πεδία και πατήστε <strong>Υπολόγισε</strong>.</p>";
  });
});
