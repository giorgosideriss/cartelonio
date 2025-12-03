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

// Τρέχον σετ δεδομένων
let currentDataset = null;

// Extras
let currentBasePrice = 0;
let currentExtras = [];
let selectedExtras = new Set();

/* ===== ΑΠΟΜΕΙΩΣΕΙΣ κλπ ===== */
const categories = {
  "Επιλέξτε Κατηγορία Αμαξώματος": [[0,0]],
  "SUV": [[0.5,0.11],[1,0.22],[1.5,0.25],[2,0.29],[2.5,0.35],[3,0.37],[3.5,0.44],[4,0.5],[4.5,0.56],[5,0.62]],
  "Hatchback": [[0.5,0.09],[1,0.19],[1.5,0.24],[2,0.28],[2.5,0.32],[3,0.37],[3.5,0.43],[4,0.49]],
  "Sedan": [[0.5,0.15],[1,0.3],[1.5,0.33],[2,0.36],[2.5,0.4],[3,0.43],[3.5,0.5],[4,0.57]],
  "Cabrio": [[0.5,0.11],[1,0.22],[1.5,0.26],[2,0.3],[2.5,0.33],[3,0.36],[3.5,0.42],[4,0.48]],
  "Coupe/Roadster": [[0.5,0.12],[1,0.25],[1.5,0.25],[2,0.29],[2.5,0.32],[3,0.36],[3.5,0.41],[4,0.47]],
  "MPV": [[0.5,0.09],[1,0.19],[1.5,0.23],[2,0.27],[2.5,0.33],[3,0.36],[3.5,0.43],[4,0.49]]
};

const coTable = {
  "<14000":[0.038,0.04,0.044,0.048,0.052,0.056,0.064,0.08],
  "14-17k":[0.076,0.08,0.088,0.096,0.104,0.112,0.128,0.16],
  "17-20k":[0.152,0.16,0.176,0.192,0.208,0.224,0.256,0.32],
  "20-25k":[0.228,0.24,0.264,0.288,0.312,0.336,0.384,0.48],
  ">25k":[0.304,0.32,0.352,0.384,0.416,0.448,0.512,0.64]
};

/* ===== ΒΟΗΘΕΙΕΣ ===== */
const parseDate = v => v ? new Date(v) : null;
const yearsBetween = (a,b) => (!a||!b)?0:Math.floor((b-a)/31557600000);
const autoAvgKm = y => y*15000;

function lookupDepreciation(cat, years){
  const t = categories[cat];
  if(!t) return 0;
  let res = 0;
  for(const row of t){
    if(years >= row[0]) res=row[1];
  }
  return res;
}

function lookupCO2(price, co2){
  let bracket="<14000";
  if(price>=14000 && price<17000) bracket="14-17k";
  else if(price>=17000 && price<20000) bracket="17-20k";
  else if(price>=20000 && price<25000) bracket="20-25k";
  else if(price>=25000) bracket=">25k";

  const bins=[100,120,140,160,180,200,250,9999];
  let i=bins.findIndex(x=>co2<=x);
  return coTable[bracket][i];
}

function mileageDep(avg,m){
  return m <= avg ? 0 : ((m-avg)/500)*0.001;
}

/* ===== EXTRAS ===== */
function getExtrasTotal(){
  let t=0;
  selectedExtras.forEach(i=>{
    const ex=currentExtras[i];
    if(ex) t+=Number(ex.price||0);
  });
  return t;
}

function recalcPriceWithExtras(){
  const price=document.getElementById("price");
  const label=document.querySelector(".extras-toggle-label");
  const total=getExtrasTotal();
  const final=currentBasePrice+total;
  price.value=final.toFixed(2);

  if(currentExtras.length===0){
    label.textContent="Δεν υπάρχουν extras";
  } else if(selectedExtras.size===0){
    label.textContent="Χωρίς επιπλέον extras";
  } else {
    label.textContent=`${selectedExtras.size} επιλεγμένα (+${total.toFixed(2)} €)`;
  }
}

function handleExtraTick(ev){
  const i=Number(ev.target.dataset.index);
  if(ev.target.checked) selectedExtras.add(i);
  else selectedExtras.delete(i);
  recalcPriceWithExtras();
}

function loadExtras(list){
  const panel=document.getElementById("extrasPanel");
  const toggle=document.getElementById("extrasToggle");
  const label=document.querySelector(".extras-toggle-label");

  panel.innerHTML="";
  currentExtras=list||[];
  selectedExtras.clear();

  if(!currentExtras.length){
    toggle.disabled=true;
    label.textContent="Δεν υπάρχουν extras";
    return;
  }

  toggle.disabled=false;
  label.textContent="Επιλέξτε extras";

  currentExtras.forEach((ex,i)=>{
    if(!ex.price) return;
    const row=document.createElement("label");
    row.className="extras-option";

    const cb=document.createElement("input");
    cb.type="checkbox";
    cb.dataset.index=i;
    cb.addEventListener("change",handleExtraTick);

    const txt=document.createElement("span");
    txt.className="extras-option-text";
    txt.innerHTML=`${ex.name} <br><strong>(+${Number(ex.price).toFixed(2)} €)</strong>`;

    row.appendChild(cb);
    row.appendChild(txt);
    panel.appendChild(row);
  });
}

/* ===== DROPDOWNS ===== */
async function loadDatasetForSelection(){
  const brand=document.getElementById("brandSelect").value;
  const year=document.getElementById("yearSelect").value;

  currentDataset=null;
  document.getElementById("modelSelect").innerHTML='<option>Επιλέξτε Μοντέλο</option>';
  document.getElementById("versionSelect").innerHTML='<option>Επιλέξτε Έκδοση</option>';
  document.getElementById("colorSelect").innerHTML='<option>Επιλέξτε ΛΤΠΦ</option>';
  loadExtras([]);

  if(!brand||!year) return;

  const url=DATA_SOURCES[brand][year];
  const res=await fetch(url);
  currentDataset=await res.json();

  const models=document.getElementById("modelSelect");
  models.innerHTML='<option value="">Επιλέξτε Μοντέλο</option>';
  Object.keys(currentDataset.models).forEach(m=>{
    const o=document.createElement("option");
    o.value=m; o.textContent=m;
    models.appendChild(o);
  });
}

function populateVersions(){
  const model=document.getElementById("modelSelect").value;
  const ver=document.getElementById("versionSelect");
  ver.innerHTML='<option>Επιλέξτε Έκδοση</option>';
  document.getElementById("colorSelect").innerHTML='<option>Επιλέξτε ΛΤΠΦ</option>';
  loadExtras([]);

  if(!model||!currentDataset) return;

  currentDataset.models[model].editions.forEach((ed,i)=>{
    const o=document.createElement("option");
    o.value=i; o.textContent=ed.name;
    ver.appendChild(o);
  });
}

function populateColors(){
  const model=document.getElementById("modelSelect").value;
  const idx=parseInt(document.getElementById("versionSelect").value);
  const col=document.getElementById("colorSelect");
  col.innerHTML='<option>Επιλέξτε ΛΤΠΦ</option>';
  loadExtras([]);

  if(isNaN(idx)) return;

  const ed=currentDataset.models[model].editions[idx];

  ed.variants.forEach((v,i)=>{
    const o=document.createElement("option");
    o.value=i; o.textContent=v.color||"Standard";
    col.appendChild(o);
  });

  loadExtras(ed.extras||[]);
}

function autoFillCarData(){
  const model=document.getElementById("modelSelect").value;
  const edIndex=parseInt(document.getElementById("versionSelect").value);
  const colIndex=parseInt(document.getElementById("colorSelect").value);

  if(isNaN(edIndex)||isNaN(colIndex)) return;

  const edition=currentDataset.models[model].editions[edIndex];
  const variant=edition.variants[colIndex];

  currentBasePrice=Number(variant.priceNet)||0;
  loadExtras(edition.extras||[]);
  recalcPriceWithExtras();

  if(edition.co2) document.getElementById("co2").value=edition.co2;

  if(currentDataset.models[model].category){
    document.getElementById("category").value=currentDataset.models[model].category;
  }
}

/* ===== ΥΠΟΛΟΓΙΣΜΟΣ ===== */
function calculate(){
  const price=Number(document.getElementById("price").value);
  const cat=document.getElementById("category").value;
  const first=parseDate(document.getElementById("firstReg").value);
  const imp=parseDate(document.getElementById("importDate").value);
  const km=Number(document.getElementById("mileage").value);
  const co2=Number(document.getElementById("co2").value);

  const years=yearsBetween(first,imp);
  const dep1=lookupDepreciation(cat,years);
  const avg=autoAvgKm(years);
  const dep2=mileageDep(avg,km);
  const total=dep1+dep2;
  const taxable=price*(1-total);
  const coef=lookupCO2(price,co2);
  const tax=taxable*coef;

  document.getElementById("results").innerHTML=`
    <p><strong>Ηλικία:</strong> ${years}</p>
    <p><strong>Μέσος όρος χιλιομέτρων:</strong> ${avg.toLocaleString()} km</p>
    <p><strong>Απομείωση:</strong> ${(total*100).toFixed(0)}%</p>
    <p><strong>Φορολογητέα αξία:</strong> €${taxable.toFixed(0)}</p>
    <p><strong>Συντελεστής CO₂:</strong> ${coef}</p>
    <h3>Τέλος Ταξινόμησης: €${tax.toFixed(2)}</h3>
  `;
}

/* ===== INITIALIZE ===== */
document.addEventListener("DOMContentLoaded",()=>{

  /* Κατηγορίες */
  const catSel=document.getElementById("category");
  Object.keys(categories).forEach(c=>{
    const o=document.createElement("option");
    o.value=c; o.textContent=c;
    catSel.appendChild(o);
  });

  /* Μάρκα */
  const brand=document.getElementById("brandSelect");
  Object.keys(DATA_SOURCES).forEach(b=>{
    const o=document.createElement("option");
    o.value=b; o.textContent=b;
    brand.appendChild(o);
  });

  brand.addEventListener("change",()=>{
    const year=document.getElementById("yearSelect");
    year.innerHTML='<option value="">Επιλέξτε Χρονολογία</option>';
    if(DATA_SOURCES[brand.value]){
      Object.keys(DATA_SOURCES[brand.value]).forEach(y=>{
        const o=document.createElement("option");
        o.value=y; o.textContent=y;
        year.appendChild(o);
      });
    }
    loadExtras([]);
  });

  document.getElementById("yearSelect").addEventListener("change",loadDatasetForSelection);
  document.getElementById("modelSelect").addEventListener("change",populateVersions);
  document.getElementById("versionSelect").addEventListener("change",populateColors);
  document.getElementById("colorSelect").addEventListener("change",autoFillCarData);

  /* Extras dropdown */
  const dropdown=document.querySelector(".extras-dropdown");
  const toggle=document.getElementById("extrasToggle");

  toggle.addEventListener("click",()=>{
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click",(e)=>{
    if(!dropdown.contains(e.target)) dropdown.classList.remove("open");
  });

  document.getElementById("calcBtn").addEventListener("click",calculate);

  document.getElementById("resetBtn").addEventListener("click",()=>{
    document.getElementById("calcForm").reset();
    selectedExtras.clear();
    currentBasePrice=0;
    loadExtras([]);
    document.getElementById("results").innerHTML="<p>Συμπληρώστε και πατήστε Υπολόγισε.</p>";
  });

});
