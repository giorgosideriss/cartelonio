/* Full calculator logic converted from your Excel workbook */

/* === CATEGORY DEPRECIATION TABLES (from your Excel) === */
const categories = {
  "SUV": [[0.5,0.11],[1,0.22],[1.5,0.25],[2,0.29],[2.5,0.35],[3,0.37],[3.5,0.44],[4,0.5],[4.5,0.56],[5,0.62],[5.5,0.66],[6,0.68],[6.5,0.71],[7,0.73],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "Hatchback": [[0.5,0.09],[1,0.19],[1.5,0.24],[2,0.28],[2.5,0.32],[3,0.37],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.81],[10,0.83]],

  "Sedan": [[0.5,0.15],[1,0.3],[1.5,0.33],[2,0.36],[2.5,0.4],[3,0.43],[3.5,0.5],[4,0.57],[4.5,0.64],[5,0.72],[5.5,0.74],[6,0.76],[6.5,0.78],[7,0.8],[7.5,0.81],[8,0.84],[8.5,0.85],[9,0.85],[9.5,0.86],[10,0.87]],

  "Cabrio": [[0.5,0.11],[1,0.22],[1.5,0.26],[2,0.3],[2.5,0.33],[3,0.36],[3.5,0.42],[4,0.48],[4.5,0.54],[5,0.6],[5.5,0.64],[6,0.67],[6.5,0.69],[7,0.72],[7.5,0.73],[8,0.78],[8.5,0.78],[9,0.79],[9.5,0.81],[10,0.82]],

  "Coupe/Roadster": [[0.5,0.12],[1,0.25],[1.5,0.25],[2,0.29],[2.5,0.32],[3,0.36],[3.5,0.41],[4,0.47],[4.5,0.53],[5,0.59],[5.5,0.63],[6,0.66],[6.5,0.68],[7,0.71],[7.5,0.73],[8,0.76],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]],

  "MPV": [[0.5,0.09],[1,0.19],[1.5,0.23],[2,0.27],[2.5,0.33],[3,0.36],[3.5,0.43],[4,0.49],[4.5,0.55],[5,0.61],[5.5,0.64],[6,0.67],[6.5,0.7],[7,0.72],[7.5,0.75],[8,0.77],[8.5,0.78],[9,0.8],[9.5,0.82],[10,0.83]]
};

/* === CO2 TABLE (from your Excel) === */
const coTable = {
  "<14000": [0.038,0.04,0.044,0.048,0.052,0.056,0.064,0.08],
  "14-17k": [0.076,0.08,0.088,0.096,0.104,0.112,0.128,0.16],
  "17-20k": [0.152,0.16,0.176,0.192,0.208,0.224,0.256,0.32],
  "20-25k": [0.228,0.24,0.264,0.288,0.312,0.336,0.384,0.48],
  ">25k":   [0.304,0.32,0.352,0.384,0.416,0.448,0.512,0.64]
};

/* === Populate category dropdown === */
const categorySelect = document.getElementById("category");
Object.keys(categories).forEach(cat => {
  const option = document.createElement("option");
  option.value = cat;
  option.textContent = cat;
  categorySelect.appendChild(option);
});

/* === Helpers === */
function parseDate(v){ return v ? new Date(v) : null; }

function yearsBetween(d1, d2){
  return Math.floor((d2 - d1) / (1000*60*60*24*365));
}

function lookupDepreciation(cat, years){
  const table = categories[cat];
  let result = table[0][1];
  for(let i=0;i<table.length;i++){
    if(years >= table[i][0]) result = table[i][1];
  }
  return result;
}

function avgkm = years*15000

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

/* === Main Calculation === */
function calculate(){
  const price = Number(document.getElementById("price").value);
  const cat = document.getElementById("category").value;
  const firstReg = parseDate(document.getElementById("firstReg").value);
  const importDate = parseDate(document.getElementById("importDate").value);
  const mileage = Number(document.getElementById("mileage").value);
  const co2 = Number(document.getElementById("co2").value);

  const years = yearsBetween(firstReg, importDate);
  const yearDep = lookupDepreciation(cat, years);
  const kmDep = mileageDep(avgKm, mileage);
  const totalDep = yearDep + kmDep;

  const finalPrice = price * (1 - totalDep);

  const co2coef = lookupCO2(price, co2);

  const tax = finalPrice * co2coef;

  document.getElementById("results").innerHTML = `
    <p><strong>Ηλικία:</strong> ${years} έτη</p>
    <p><strong>Απομείωση από έτη:</strong> ${(yearDep*100).toFixed(2)}%</p>
    <p><strong>Απομείωση από χλμ:</strong> ${(kmDep*100).toFixed(4)}%</p>
    <p><strong>Συνολική απομείωση:</strong> ${(totalDep*100).toFixed(2)}%</p>
    <p><strong>Τιμή μετά απομείωσης:</strong> €${finalPrice.toFixed(2)}</p>
    <p><strong>Συντελεστής CO₂:</strong> ${co2coef}</p>
    <h3>Τελικός Φόρος: €${tax.toFixed(2)}</h3>
  `;
}

/* === Binding === */
document.getElementById("calcBtn").addEventListener("click", calculate);

document.getElementById("resetBtn").addEventListener("click", () => {
  document.getElementById("calcForm").reset();
  document.getElementById("results").innerHTML = 
    "<p>Συμπληρώστε τα πεδία και πατήστε <strong>Υπολόγισε</strong>.</p>";
});
