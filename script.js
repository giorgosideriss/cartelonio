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

// Τρέχον σετ δεδομένων (π.χ. Toyota 2021)
let currentDataset = null;

// Για extras
let currentBasePrice = 0;        // τιμή ΛΤΠΦ χωρίς extras
let currentExtras = [];          // λίστα extras για την τρέχουσα έκδοση
let selectedExtras = new Set();  // indexes των επιλεγμένων extras

/* === CATEGORY DEPRECIATION TABLES (από Excel) === */
const categories = {
  "Επιλέξτε Κατηγορία Αμαξώματος": [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
  
  "SUV": [[0.5,0.11],[1,0.22],[1.5,0.25],[2,0.29],[2.5,0.35],[3,0.37],[3.5,0.44],[4,0.5],[4.5,0.56],[5,0.62],[5.5,0.66],[6,0.68],[6.5,0.71],[7,0.73],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "Hatchback": [[0.5,0.09],[1,0.19],[1.5,0.24],[2,0.28],[2.5,0.32],[3,0.37],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.81],[10,0.83]],

  "Sedan": [[0.5,0.15],[1,0.3],[1.5,0.33],[2,0.36],[2.5,0.4],[3,0.43],[3.5,0.5],[4,0.57],[4.5,0.64],[5,0.72],[5.5,0.74],[6,0.76],[6.5,0.78],[7,0.8],[7.5,0.81],[8,0.84],[8.5,0.85],[9,0.85],[9.5,0.86],[10,0.87]],

  "Cabrio": [[0.5,0.11],[1,0.22],[1.5,0.26],[2,0.3],[2.5,0.33],[3,0.36],[3.5,0.42],[4,0.48],[4.5,0.54],[5,0.6],[5.5,0.64],[6,0.67],[6.5,0.69],[7,0.72],[7.5,0.73],[8,0.78],[8.5,0.78],[9,0.79],[9.5,0.81],[10,0.82]],

  "Coupe/Roadster": [[0.5,0.12],[1,0.25],[1.5,0.25],[2,0.29],[2.5,0.32],[3,0.36],[3.5,0.41],[4,0.47],[4.5,0.53],[5,0.59],[5.5,0.63],[6,0.66],[6.5,0.68],[7,0.71],[7.5,0.73],[8,0.76],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "MPV": [[0.5,0.09],[1,0.19],[1.5,0.23],[2,0.27],[2.5,0.33],[3,0.36],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]]
};

/* === CO2 TABLE (από Excel) === */
const coTable = {
  "<14000": [0.038,0.04,0.044,0.048,0.052,0.056,0.064,0.08],
  "14-17k": [0.076,0.08,0.088,0.096,0.104,0.112,0.128,0.16],
  "17-20k": [0.152,0.16,0.176,0.192,0.208,0.224,0.256,0.32],
  "20-25k": [0.228,0.24,0.264,0.288,0.312,0.336,0.384,0.48],
  ">25k":   [0.304,0.32,0.352,0.384,0.416,0.448,0.512,0.64]
};

/* ========== ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ ========== */

function parseDate(v){ return v ? new Date(v) : null; }

function yearsBetween(d1, d2){
  if (!d1 || !d2) return 0;
  return Math.floor((d2 - d1) / (1000*60*60*24*365));
}

function autoAvgKm(years){
  return years * 15000;
}

function lookupDepreciation(cat, years){
  const table = categories[cat];
  if (!table) return 0;
  let result = table[0][1];
  for(let i=0;i<table.length;i++){
    if(years >= table[i][0]) result = table[i][1];
  }
  return result;
}

function lookupCO2(price, co2){
  let bracket = "<14000";
  if(price >=14000 && price<17000) bracket = "14-17k";
  else if(price>=17000 && price<20000) bracket="17-20k";
  else if(price>=20000 && price<25000) bracket="20-25k";
  else if(price>=25000) bracket=">25k";

  let col = 0;
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
  return ((mileage - avgKm)/500) * 0.001;
}

/* ========== EXTRAS HELPERS ========== */

function getExtrasTotal() {
  let total = 0;
  selectedExtras.forEach(idx => {
    const extra = currentExtras[idx];
    if (extra && Number(extra.price)) {
      total += Number(extra.price);
    }
  });
  return total;
}

function recalcPriceWithExtras() {
  const priceInput = document.getElementById("price");
  const extrasLabel = document.querySelector(".extras-toggle-label");

  const extrasTotal = getExtrasTotal();
  const finalPrice = currentBasePrice + extrasTotal;

  if (!isNaN(finalPrice)) {
    priceInput.value = finalPrice.toFixed(2);
  }

  const count = selectedExtras.size;
  if (count === 0) {
    extrasLabel.textContent = "Επιλέξτε extras";
  } else {
    extrasLabel.textContent = `Επιλεγμένα extras: ${count}`;
  }
}

function handleExtraCheckboxChange(e) {
  const idx = Number(e.target.value);
  if (e.target.checked) {
    selectedExtras.add(idx);
  } else {
    selectedExtras.delete(idx);
  }
  recalcPriceWithExtras();
}

function loadExtras(extrasList) {
  const extrasSelect = document.getElementById("extras");
  extrasSelect.innerHTML = "";

  if (!extrasList || extrasList.length === 0) {
    extrasSelect.disabled = true;
    return;
  }

  extrasSelect.disabled = false;

  extrasList.forEach((extra, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "extra-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.dataset.price = extra.price;
    checkbox.id = "extra_" + index;

    const label = document.createElement("label");
    label.setAttribute("for", "extra_" + index);
    label.textContent = `${extra.name} (+${extra.price} €)`;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    extrasSelect.appendChild(wrapper);
  });
}


  toggleBtn.disabled = false;
  labelSpan.textContent = "Επιλέξτε extras";

  currentExtras.forEach((extra, idx) => {
    // αγνόησε όσα έχουν price 0 ή null
    const price = Number(extra.price);
    if (!price) return;

    const row = document.createElement("label");
    row.className = "extras-option";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = idx;
    cb.addEventListener("change", handleExtraCheckboxChange);

    const text = document.createElement("span");
    text.textContent = `${extra.name} (+${price.toFixed(2)} €)`;

    row.appendChild(cb);
    row.appendChild(text);
    panel.appendChild(row);
  });

  recalcPriceWithExtras();
}

/* ========== DROPDOWNS ΜΑΡΚΑ / ΕΤΟΣ / ΜΟΝΤΕΛΟ / ΕΚΔΟΣΗ / ΧΡΩΜΑ ========== */

async function loadDatasetForSelection() {
  const brandEl  = document.getElementById("brandSelect");
  const yearEl   = document.getElementById("yearSelect");
  const modelEl  = document.getElementById("modelSelect");
  const verEl    = document.getElementById("versionSelect");
  const colorEl  = document.getElementById("colorSelect");

  const brand = brandEl.value;
  const year  = yearEl.value;

  currentDataset = null;
  modelEl.innerHTML  = '<option value="">Επιλέξτε Μοντέλο</option>';
  verEl.innerHTML    = '<option value="">Επιλέξτε Έκδοση</option>';
  colorEl.innerHTML  = '<option value="">Επιλέξτε ΛΤΠΦ</option>';

  // reset extras
  loadExtras([]);

  if (!brand || !year) return;

  const url = DATA_SOURCES[brand] && DATA_SOURCES[brand][year];
  if (!url) {
    console.warn("Δεν βρέθηκαν δεδομένα για", brand, year);
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("HTTP " + res.status);
    currentDataset = await res.json();
    populateModels();
  } catch (err) {
    console.error("Σφάλμα φόρτωσης δεδομένων:", err);
  }
}

function populateBrandSelect() {
  const brandEl = document.getElementById("brandSelect");
  brandEl.innerHTML = '<option value="">Επιλέξτε Μάρκα</option>';

  Object.keys(DATA_SOURCES).forEach(brand => {
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    brandEl.appendChild(opt);
  });
}

function populateYearSelect() {
  const brandEl = document.getElementById("brandSelect");
  const yearEl  = document.getElementById("yearSelect");
  const brand   = brandEl.value;

  yearEl.innerHTML = '<option value="">Επιλέξτε Χρονολογία</option>';

  if (!brand || !DATA_SOURCES[brand]) return;

  Object.keys(DATA_SOURCES[brand]).forEach(year => {
    const opt = document.createElement("option");
    opt.value = year;
    opt.textContent = year;
    yearEl.appendChild(opt);
  });
}

function populateModels() {
  const modelEl = document.getElementById("modelSelect");
  const verEl   = document.getElementById("versionSelect");
  const colorEl = document.getElementById("colorSelect");

  modelEl.innerHTML = '<option value="">Επιλέξτε Μοντέλο</option>';
  verEl.innerHTML   = '<option value="">Επιλέξτε Έκδοση</option>';
  colorEl.innerHTML = '<option value="">Επιλέξτε ΛΤΠΦ</option>';

  loadExtras([]);

  if (!currentDataset || !currentDataset.models) return;

  Object.keys(currentDataset.models).forEach(modelName => {
    const opt = document.createElement("option");
    opt.value = modelName;
    opt.textContent = modelName;
    modelEl.appendChild(opt);
  });
}

function populateVersions() {
  const modelEl  = document.getElementById("modelSelect");
  const verEl    = document.getElementById("versionSelect");
  const colorEl  = document.getElementById("colorSelect");
  const model    = modelEl.value;

  verEl.innerHTML   = '<option value="">Επιλέξτε Έκδοση</option>';
  colorEl.innerHTML = '<option value="">Επιλέξτε ΛΤΠΦ</option>';

  loadExtras([]);

  if (!currentDataset || !currentDataset.models || !model) return;

  const modelObj = currentDataset.models[model];
  if (!modelObj || !Array.isArray(modelObj.editions)) return;

  modelObj.editions.forEach((ed, index) => {
    const opt = document.createElement("option");
    opt.value = String(index); // index της έκδοσης
    opt.textContent = ed.name;
    verEl.appendChild(opt);
  });
}

function populateColors() {
  const modelEl  = document.getElementById("modelSelect");
  const verEl    = document.getElementById("versionSelect");
  const colorEl  = document.getElementById("colorSelect");

  const model    = modelEl.value;
  const edIndex  = parseInt(verEl.value, 10);

  colorEl.innerHTML = '<option value="">Επιλέξτε ΛΤΠΦ</option>';

  loadExtras([]);

  if (!currentDataset || !currentDataset.models || !model) return;
  if (isNaN(edIndex)) return;

  const modelObj = currentDataset.models[model];
  const edition  = modelObj && modelObj.editions && modelObj.editions[edIndex];
  if (!edition || !Array.isArray(edition.variants)) return;

  edition.variants.forEach((variant, idx) => {
    const opt = document.createElement("option");
    opt.value = String(idx);
    opt.textContent = variant.color || "Standard";
    colorEl.appendChild(opt);
  });

  // Φορτώνουμε και τα extras της συγκεκριμένης έκδοσης
  loadExtras(edition.extras || []);

  // Αν έχει τουλάχιστον μία variant, διάλεξε την πρώτη
  if (edition.variants.length > 0) {
    colorEl.value = "0";
    autoFillCarData();
  }
}

function autoFillCarData() {
  const modelEl  = document.getElementById("modelSelect");
  const verEl    = document.getElementById("versionSelect");
  const colorEl  = document.getElementById("colorSelect");

  const model    = modelEl.value;
  const edIndex  = parseInt(verEl.value, 10);
  const colorIdx = parseInt(colorEl.value, 10);

  if (!currentDataset || !currentDataset.models || !model) return;
  if (isNaN(edIndex) || isNaN(colorIdx)) return;

  const modelObj = currentDataset.models[model];
  const edition  = modelObj && modelObj.editions && modelObj.editions[edIndex];
  if (!edition) return;

  const variant  = edition.variants && edition.variants[colorIdx];
  if (!variant) return;

  // Τιμή ΛΤΠΦ (βάση, χωρίς extras)
  currentBasePrice = Number(variant.priceNet) || 0;

  // Φόρτωση extras για την έκδοση (αν δεν το έχουμε κάνει ήδη)
  if (Array.isArray(edition.extras)) {
    loadExtras(edition.extras);
  } else {
    loadExtras([]);
  }

  // Τιμή στο input με βάση βάση + extras
  recalcPriceWithExtras();

  // Εκπομπές CO2
  if (edition.co2 != null) {
    document.getElementById("co2").value = edition.co2;
  }

  // Κατηγορία αμαξώματος από το JSON
  if (modelObj.category && categories[modelObj.category]) {
    document.getElementById("category").value = modelObj.category;
  }
}

/* ========== ΚΥΡΙΑ ΣΥΝΑΡΤΗΣΗ ΥΠΟΛΟΓΙΣΜΟΥ ========== */

function calculate(){
  const price      = Number(document.getElementById("price").value);
  const cat        = document.getElementById("category").value;
  const firstReg   = parseDate(document.getElementById("firstReg").value);
  const importDate = parseDate(document.getElementById("importDate").value);
  const mileage    = Number(document.getElementById("mileage").value);
  const co2        = Number(document.getElementById("co2").value);

  const years   = yearsBetween(firstReg, importDate);
  const yearDep = lookupDepreciation(cat, years);
  const avgKm   = autoAvgKm(years);  
  const kmDep   = mileageDep(avgKm, mileage);
  const totalDep = yearDep + kmDep;
  const finalPrice = price * (1 - totalDep);

  const co2coef = lookupCO2(price, co2);
  const tax     = finalPrice * co2coef;
  
  document.getElementById("results").innerHTML = `
    <p><strong>Ηλικία:</strong> ${years} έτη</p>
    <p><strong>Μέσος όρος χιλιομέτρων για ηλικία:</strong> ${avgKm.toLocaleString("el-GR")} km</p>
    <p><strong>Απομείωση λόγω ηλικίας & κατηγορίας αμαξώματος:</strong> ${(yearDep*100).toFixed(0)}%</p>
    <p><strong>Απομείωση λόγω διανυθέντων χιλιομέτρων πλέον του μέσου όρου:</strong> ${(kmDep*100).toFixed(0)}%</p>
    <p><strong>Συνολική απομείωση:</strong> ${(totalDep*100).toFixed(0)}%</p>
    <p><strong>Φορολογητέα αξία (μετά την απομείωση):</strong> €${finalPrice.toFixed(0)}</p>
    <p><strong>Συντελεστής τέλους ταξινόμησης (CO₂):</strong> ${co2coef}</p>
    <h3>ΤΕΛΟΣ ΤΑΞΙΝΟΜΗΣΗΣ: €${tax.toFixed(2)}</h3>
  `;
}

/* ========== ΑΡΧΙΚΟΠΟΙΗΣΗ ΜΟΛΙΣ ΦΟΡΤΩΣΕΙ Η ΣΕΛΙΔΑ ========== */

document.addEventListener("DOMContentLoaded", () => {
  // Γέμισμα dropdown κατηγορίας
  const categorySelect = document.getElementById("category");
  categorySelect.innerHTML = "";
  Object.keys(categories).forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });

  // Μάρκα / Έτος
  populateBrandSelect();
  populateYearSelect(); // κενό στην αρχή

  // Event listeners για επιλογές αυτοκινήτου
  document.getElementById("brandSelect").addEventListener("change", () => {
    populateYearSelect();
    currentDataset = null;
    document.getElementById("modelSelect").innerHTML   = '<option value="">Επιλέξτε Μοντέλο</option>';
    document.getElementById("versionSelect").innerHTML = '<option value="">Επιλέξτε Έκδοση</option>';
    document.getElementById("colorSelect").innerHTML   = '<option value="">Επιλέξτε ΛΤΠΦ</option>';
    loadExtras([]);
  });

  document.getElementById("yearSelect").addEventListener("change", () => {
    loadDatasetForSelection();
  });

  document.getElementById("modelSelect").addEventListener("change", () => {
    populateVersions();
  });

  document.getElementById("versionSelect").addEventListener("change", () => {
    populateColors();
  });

  document.getElementById("colorSelect").addEventListener("change", () => {
    autoFillCarData();
  });

  // Extras dropdown toggle
  const extrasDropdown = document.querySelector(".extras-dropdown");
  const extrasToggle = document.getElementById("extrasToggle");

  extrasToggle.addEventListener("click", () => {
    extrasDropdown.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!extrasDropdown.contains(e.target)) {
      extrasDropdown.classList.remove("open");
    }
  });

  // Κουμπιά υπολογισμού / reset
  document.getElementById("calcBtn").addEventListener("click", calculate);

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("calcForm").reset();
    currentBasePrice = 0;
    currentExtras = [];
    selectedExtras.clear();
    loadExtras([]);
    document.getElementById("results").innerHTML = 
      "<p>Συμπληρώστε τα πεδία και πατήστε <strong>Υπολόγισε</strong>.</p>";
  });
});
