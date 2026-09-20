/* === ΡΥΘΜΙΣΗ ΠΗΓΩΝ ΔΕΔΟΜΕΝΩΝ === */
/* === ΡΥΘΜΙΣΗ ΠΗΓΩΝ ΔΕΔΟΜΕΝΩΝ (AUTO-GENERATED 2015–2025) === */

// 1) Λίστα μαρκών (όπως ακριβώς θέλεις να εμφανίζονται στο UI)
const BRANDS = [
  "Abarth",
  "Alfa Romeo",
  "Alpina",
  "Alpine",
  "Aston Martin",
  "Audi",
  "BMW",
  "BYD",
  "Bentley",
  "Chrysler",
  "Citroen",
  "Cupra",
  "DS",
  "Dacia",
  "Ferrari",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "INEOS",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lotus",
  "MG",
  "MINI",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mitsubishi",
  "Morgan",
  "Nissan",
  "Opel",
  "Peugeot",
  "Polestar",
  "Porsche",
  "Renault",
  "Rolls-Royce",
  "SEAT",
  "Skoda",
  "Smart",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo"
];

// 2) Έτη 2015–2025
const YEARS = Array.from({ length: 11 }, (_, i) => 2015 + i);

// 3) Μετατροπή μάρκας -> folder name (π.χ. "Alfa Romeo" -> "alfa-romeo")
function slugifyBrand(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")                    // σπάει τόνους
    .replace(/[\u0300-\u036f]/g, "")     // αφαιρεί τόνους
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")         // spaces/σύμβολα -> "-"
    .replace(/^-+|-+$/g, "");            // trim "-” στα άκρα
}

// 4) Χτίσιμο DATA_SOURCES
const DATA_SOURCES = Object.fromEntries(
  BRANDS.map(brand => [
    brand,
    Object.fromEntries(
      YEARS.map(year => [
        String(year),
        `data/${slugifyBrand(brand)}/${year}/${year}.json`
      ])
    )
  ])
);


/* Λογότυπα μαρκών */
const BRAND_LOGOS = {
  "Abarth": "https://logos-world.net/wp-content/uploads/2021/08/Abarth-Logo-2007-present.png",
  "Alfa Romeo": "https://logos-world.net/wp-content/uploads/2021/09/Alfa-Romeo-Logo-500x281.png",
  "Alpina": "https://logos-world.net/wp-content/uploads/2021/03/Alpina-Logo.png",
  "Alpine": "https://logos-world.net/wp-content/uploads/2021/08/Alpine-Logo-700x394.png",
  "Aston Martin": "https://logos-world.net/wp-content/uploads/2022/08/Aston-Martin-New-Logo-500x281.png",
  "Audi": "https://cdn.simpleicons.org/audi/B8BCB9",
  "BMW": "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo.png",
  "BYD": "https://logos-world.net/wp-content/uploads/2021/09/BYD-Logo-500x281.png",
  "Bentley": "https://logos-world.net/wp-content/uploads/2021/09/Bentley-Logo-500x281.png",
  "Chery": "https://logos-world.net/wp-content/uploads/2021/09/Chery-Logo-500x281.png",
  "Chrysler": "https://logos-world.net/wp-content/uploads/2021/09/Chrysler-Logo-500x281.png",
  "Citroen": "https://logos-world.net/wp-content/uploads/2021/03/Citroen-Logo.png",
  "Cupra": "https://logos-world.net/wp-content/uploads/2021/03/Cupra-Logo.png",
  "DS": "https://logos-world.net/wp-content/uploads/2021/08/DS-Automobiles-Logo-700x394.png",
  "Dacia": "https://logos-world.net/wp-content/uploads/2021/10/Dacia-Logo.png",
  "Ferrari": "https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo-700x394.png",
  "Fiat": "https://logos-world.net/wp-content/uploads/2021/03/Fiat-Logo-700x394.png",
  "Ford": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/2560px-Ford_logo_flat.svg.png",
  "Geely": "https://logos-world.net/wp-content/uploads/2021/08/Geely-Logo.png",
  "Genesis": "https://logos-world.net/wp-content/uploads/2020/05/Genesis-Logo.png",
  "Honda": "https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo-700x394.png",
  "Hyundai": "https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo-700x394.png",
  "INEOS": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/INEOS_logo.svg/2560px-INEOS_logo.svg.png",
  "Infiniti": "https://logos-world.net/wp-content/uploads/2021/11/Infiniti-Logo-500x281.png",
  "Jaecoo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jaecoo_wordmark.svg",
  "Jaguar": "https://logos-world.net/wp-content/uploads/2021/07/Jaguar-Logo-500x281.png",
  "Jeep": "https://logos-world.net/wp-content/uploads/2021/09/Jeep-Logo-700x394.png",
  "Kia": "https://logos-world.net/wp-content/uploads/2021/03/Kia-Logo.png",
  "Lamborghini": "https://api.freelogodesign.org/assets/blog/img/lamborghini-logo-1998%20(1).png",
  "Land Rover": "https://logos-world.net/wp-content/uploads/2021/10/Land-Rover-Logo-500x281.png",
  "Lexus": "https://1000logos.net/wp-content/uploads/2020/02/Lexus-Logo-1989.png",
  "Lotus": "https://logos-world.net/wp-content/uploads/2021/09/Lotus-Logo-700x394.png",
  "MG": "https://logos-world.net/wp-content/uploads/2021/09/MG-Logo-700x394.png",
  "MINI": "https://cdn.simpleicons.org/mini/B8BCB9",
  "Maserati": "https://logos-world.net/wp-content/uploads/2021/04/Maserati-Logo-700x394.png",
  "Mazda": "https://logos-world.net/wp-content/uploads/2020/05/Mazda-Logo-700x394.png",
  "McLaren": "https://listcarbrands.com/wp-content/uploads/2016/12/McLaren-Logo-1998.png",
  "Mercedes-Benz": "https://logos-world.net/wp-content/uploads/2020/05/Mercedes-Benz-Logo-700x394.png",
  "Mitsubishi": "https://logos-world.net/wp-content/uploads/2021/09/Mitsubishi-Logo-700x394.png",
  "Morgan": "https://logos-world.net/wp-content/uploads/2022/12/Morgan-Motor-Company-Logo-500x281.png",
  "Nissan": "https://cdn.simpleicons.org/nissan/B8BCB9",
  "Opel": "https://cdn.simpleicons.org/opel/B8BCB9",
  "Peugeot": "https://logos-world.net/wp-content/uploads/2021/10/Peugeot-Logo.png",
  "Polestar": "https://logos-world.net/wp-content/uploads/2022/12/Polestar-Logo-500x281.png",
  "Porsche": "https://logos-world.net/wp-content/uploads/2023/06/Porsche-New-Logo-500x281.png",
  "Renault": "https://logos-world.net/wp-content/uploads/2021/02/New-Renault-Logo-700x394.png",
  "Rolls-Royce": "https://logos-world.net/wp-content/uploads/2021/04/Rolls-Royce-Logo-700x394.png",
  "SEAT": "https://logos-world.net/wp-content/uploads/2021/03/SEAT-Logo.png",
  "Skoda": "https://logos-world.net/wp-content/uploads/2021/06/Skoda-logo-500x281.png",
  "Smart": "https://logos-world.net/wp-content/uploads/2021/06/Smart-Logo-500x281.png",
  "Subaru": "https://logos-world.net/wp-content/uploads/2021/06/Subaru-Logo-500x281.png",
  "Suzuki": "https://logos-world.net/wp-content/uploads/2021/10/Suzuki-Logo-700x394.png",
  "Tesla": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/500px-Tesla_logo.png",
  "Toyota": "https://1000logos.net/wp-content/uploads/2018/02/Toyota-logo.png",
  "Volkswagen": "https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo-700x394.png",
  "Volvo": "https://logos-world.net/wp-content/uploads/2021/06/Volvo-Logo-500x281.png",
};


/* =========================================================
   (ΠΡΟΑΙΡΕΤΙΚΟ) BING IMAGE SEARCH API — AUTO IMAGE FETCHER
   ========================================================= */
const BING_API_KEY = "ΒΑΛΕ_ΤΟ_ΚΛΕΙΔΙ_ΣΟΥ_ΕΔΩ";
const BING_ENDPOINT = "https://api.bing.microsoft.com/v7.0/images/search";

/**
 * Online αναζήτηση εικόνας για το επιλεγμένο αυτοκίνητο
 * και ενημέρωση του <img id="carImage">
 */

function getSelectedVehicleIdentity() {
  const brand = document.getElementById("brandSelect")?.value || "";
  const year = document.getElementById("yearSelect")?.value || "";
  const model = document.getElementById("modelSelect")?.value || "";
  const verValue = document.getElementById("versionSelect")?.value || "";
  let editionName = "";

  const edIndex = parseInt(verValue, 10);
  if (currentDataset && model && !isNaN(edIndex)) {
    editionName = currentDataset.models?.[model]?.editions?.[edIndex]?.name || "";
  }
  return { brand, year, model, editionName };
}

function updateVehicleImageIdentity(hasImage = null) {
  const overlay = document.getElementById("vehicleImageIdentity");
  if (!overlay) return;

  const { brand, year, editionName } = getSelectedVehicleIdentity();
  const complete = Boolean(brand && year && editionName);

  document.getElementById("vehicleImageBrand").textContent = brand;
  const brandLogo = document.getElementById("vehicleImageBrandLogo");
  if (brandLogo) {
    const logoUrl = BRAND_LOGOS[brand] || "";
    brandLogo.src = logoUrl;
    brandLogo.alt = brand ? `${brand} logo` : "";
    brandLogo.style.display = logoUrl ? "block" : "none";
    brandLogo.onerror = () => { brandLogo.style.display = "none"; };
  }
  document.getElementById("vehicleImageYear").textContent = year;
  document.getElementById("vehicleImageEdition").textContent = editionName;

  overlay.classList.toggle("is-visible", complete);
  if (hasImage !== null) overlay.classList.toggle("no-image", !hasImage);
}

function parseLocalizedNumber(value) {
  // Keep source JSON numbers as numbers. The input field, however, is
  // displayed with Greek thousands separators and must be parsed accordingly.
  if (typeof value === "number") return value;
  const raw = String(value ?? "").trim().replace(/[\s\u00a0\u202f€]/g, "");
  if (!raw) return NaN;
  if (!/^[+-]?[\d.,]+$/.test(raw)) return NaN;

  if (raw.includes(",")) {
    // 184.787,35 or 48600,35; also accept 48,600.35 if pasted.
    if (/^[+-]?\d{1,3}(?:,\d{3})+\.\d{1,2}$/.test(raw)) {
      return Number(raw.replace(/,/g, ""));
    }
    if (!/^[+-]?(?:\d{1,3}(?:\.\d{3})+|\d+)(?:,\d+)?$/.test(raw)) return NaN;
    return Number(raw.replace(/\./g, "").replace(",", "."));
  }
  // A dot followed by exactly three digits is a Greek thousands separator:
  // 184.787 -> 184787; 1.234.567 -> 1234567.
  if (/^[+-]?\d{1,3}(?:\.\d{3})+$/.test(raw)) {
    return Number(raw.replace(/\./g, ""));
  }
  // Unformatted decimal input (e.g. 48600.35) remains supported.
  if (/^[+-]?\d+(?:\.\d+)?$/.test(raw)) return Number(raw);
  return NaN;
}

function formatGreekNumber(value, minDigits = 0, maxDigits = 2) {
  const n = parseLocalizedNumber(value);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("el-GR", { minimumFractionDigits:minDigits, maximumFractionDigits:maxDigits });
}

function formatPriceField() {
  const input = document.getElementById("price");
  if (!input || !input.value.trim()) return;
  const formatted = formatGreekNumber(input.value, 0, 2);
  if (formatted) input.value = formatted;
}

function setRegistrationTaxMiniResult(value) {
  const el = document.getElementById("registrationTaxMiniValue");
  if (!el) return;
  if (typeof value === "number" && Number.isFinite(value)) {
    el.classList.remove("is-empty");
    el.innerHTML = `<strong>€${value.toLocaleString("el-GR",{minimumFractionDigits:2,maximumFractionDigits:2})}</strong>`;
  } else {
    el.classList.add("is-empty");
    el.innerHTML = `<span class="registration-tax-mini-placeholder">Προσθέστε τα στοιχεία και κάντε υπολογισμό</span>`;
  }
}

async function updateCarImage() {
  const brand    = document.getElementById("brandSelect").value;
  const model    = document.getElementById("modelSelect").value;
  const year     = document.getElementById("yearSelect").value;
  const verValue = document.getElementById("versionSelect").value;
  const carImage = document.getElementById("carImage");

  if (!carImage) return;

  const edIndex = parseInt(verValue, 10);
  const modelObj = brand && model && currentDataset && currentDataset.models
    ? currentDataset.models[model]
    : null;
  const edition = modelObj && Array.isArray(modelObj.editions) && !isNaN(edIndex)
    ? modelObj.editions[edIndex]
    : null;

  let resolvedImage = "";

  if (edition && edition.image) {
    const imageValue = String(edition.image).trim();
    const isExplicitPath = /^(https?:)?\/\//i.test(imageValue) ||
      imageValue.startsWith("/") || imageValue.startsWith("./") ||
      imageValue.startsWith("../") || imageValue.includes("/");
    resolvedImage = isExplicitPath ? imageValue : `images/cars/${slugifyBrand(brand)}/${imageValue}`;
  } else if (modelObj && modelObj.image) {
    const imageValue = String(modelObj.image).trim();
    const isExplicitPath = /^(https?:)?\/\//i.test(imageValue) ||
      imageValue.startsWith("/") || imageValue.startsWith("./") ||
      imageValue.startsWith("../") || imageValue.includes("/");
    resolvedImage = isExplicitPath ? imageValue : `images/cars/${slugifyBrand(brand)}/${imageValue}`;
  }

  if (resolvedImage) {
    carImage.onload = () => {
      carImage.classList.remove("image-unavailable");
      updateVehicleImageIdentity(true);
    };
    carImage.onerror = () => {
      carImage.removeAttribute("src");
      carImage.classList.add("image-unavailable");
      updateVehicleImageIdentity(false);
    };
    carImage.src = resolvedImage;
    carImage.alt = `${brand} ${model}${edition?.name ? " - " + edition.name : ""}`;
    updateVehicleImageIdentity(true);
    return;
  }

  if (brand && model && year && BING_API_KEY && BING_API_KEY !== "ΒΑΛΕ_ΤΟ_ΚΛΕΙΔΙ_ΣΟΥ_ΕΔΩ") {
    const query = `${brand} ${model} ${year} PNG`;
    try {
      const res = await fetch(`${BING_ENDPOINT}?q=${encodeURIComponent(query)}&count=1`, {
        headers: { "Ocp-Apim-Subscription-Key": BING_API_KEY }
      });
      if (!res.ok) throw new Error("Image API error");
      const data = await res.json();
      const imgUrl = data.value && data.value[0] ? data.value[0].contentUrl : null;
      if (imgUrl) {
        carImage.onload = () => {
          carImage.classList.remove("image-unavailable");
          updateVehicleImageIdentity(true);
        };
        carImage.onerror = () => {
          carImage.removeAttribute("src");
          carImage.classList.add("image-unavailable");
          updateVehicleImageIdentity(false);
        };
        carImage.src = imgUrl;
        carImage.alt = `${brand} ${model}`;
        updateVehicleImageIdentity(true);
        return;
      }
    } catch (err) {
      console.warn("Image search failed:", err);
    }
  }

  carImage.removeAttribute("src");
  carImage.classList.add("image-unavailable");
  updateVehicleImageIdentity(false);
}

// Τρέχον σετ δεδομένων
let currentDataset = null;

// Extras
let currentBasePrice = 0;        // ΛΤΠΦ χωρίς extras
let currentExtras    = [];       // λίστα extras της έκδοσης
let selectedExtras   = new Set();// indexes επιλεγμένων extras

/* === ΕΠΙΣΗΜΟΣ ΠΙΝΑΚΑΣ ΑΑΔΕ: ΑΠΟΜΕΙΩΣΗ ΑΝΑ ΠΛΗΡΗ ΜΗΝΑ (1–192) ===
 * ΔΕΦΚΦΔ 1192035 ΕΞ 2017/22-12-2017 — ισχύς από 07/01/2018.
 * Οι τιμές είναι οι δημοσιευμένες τιμές των ενδιαμέσων μηνών, όχι interpolation runtime.
 */
const monthlyDepreciation = {
  'SUV': [0.02,0.04,0.05,0.07,0.09,0.11,0.13,0.14,0.16,0.18,0.2,0.22,0.22,0.22,0.22,0.22,0.24,0.25,0.25,0.25,0.25,0.26,0.28,0.29,0.29,0.3,0.31,0.33,0.34,0.35,0.35,0.35,0.35,0.35,0.36,0.37,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.61,0.62,0.62,0.62,0.63,0.64,0.65,0.66,0.66,0.66,0.66,0.66,0.67,0.68,0.68,0.68,0.68,0.69,0.7,0.71,0.71,0.71,0.71,0.71,0.72,0.73,0.73,0.73,0.73,0.74,0.74,0.75,0.75,0.75,0.75,0.76,0.76,0.77,0.77,0.77,0.77,0.77,0.78,0.79,0.79,0.79,0.79,0.79,0.8,0.8,0.8,0.8,0.8,0.8,0.81,0.82,0.82,0.82,0.82,0.82,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.93,0.93,0.94,0.94,0.95,0.95],
  'Hatchback': [0.02,0.03,0.05,0.06,0.08,0.09,0.11,0.13,0.14,0.16,0.17,0.19,0.19,0.19,0.2,0.22,0.23,0.24,0.24,0.24,0.24,0.25,0.26,0.28,0.28,0.28,0.29,0.3,0.31,0.32,0.32,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.61,0.61,0.61,0.61,0.62,0.63,0.64,0.64,0.64,0.64,0.65,0.66,0.67,0.67,0.67,0.67,0.68,0.69,0.7,0.7,0.7,0.7,0.71,0.71,0.72,0.72,0.72,0.72,0.73,0.74,0.74,0.74,0.74,0.74,0.75,0.76,0.76,0.76,0.76,0.76,0.77,0.77,0.78,0.78,0.78,0.78,0.78,0.79,0.8,0.8,0.8,0.8,0.8,0.8,0.81,0.81,0.81,0.81,0.81,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.93,0.93,0.94,0.94,0.95,0.95],
  'Sedan': [0.03,0.05,0.08,0.1,0.13,0.15,0.17,0.2,0.22,0.25,0.27,0.3,0.3,0.3,0.3,0.3,0.31,0.33,0.33,0.33,0.33,0.33,0.35,0.36,0.36,0.36,0.36,0.37,0.38,0.4,0.4,0.4,0.4,0.41,0.42,0.43,0.44,0.45,0.47,0.48,0.49,0.5,0.51,0.53,0.54,0.55,0.56,0.57,0.58,0.6,0.61,0.62,0.63,0.64,0.66,0.67,0.68,0.69,0.7,0.72,0.72,0.72,0.72,0.72,0.73,0.74,0.74,0.74,0.74,0.74,0.75,0.76,0.76,0.76,0.76,0.76,0.77,0.78,0.78,0.78,0.78,0.78,0.79,0.8,0.8,0.8,0.8,0.8,0.8,0.81,0.81,0.81,0.81,0.81,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.93,0.93,0.94,0.94,0.95,0.95],
  'Cabrio': [0.02,0.04,0.06,0.07,0.09,0.11,0.13,0.15,0.17,0.18,0.2,0.22,0.22,0.22,0.22,0.23,0.25,0.26,0.26,0.26,0.26,0.28,0.29,0.3,0.3,0.3,0.3,0.31,0.32,0.33,0.33,0.33,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.6,0.6,0.61,0.62,0.63,0.64,0.64,0.64,0.64,0.65,0.66,0.67,0.67,0.67,0.67,0.67,0.68,0.69,0.69,0.69,0.69,0.7,0.71,0.72,0.72,0.72,0.72,0.72,0.73,0.74,0.74,0.74,0.74,0.74,0.75,0.76,0.76,0.76,0.76,0.76,0.77,0.78,0.78,0.78,0.78,0.78,0.79,0.79,0.79,0.79,0.79,0.79,0.8,0.81,0.81,0.81,0.81,0.81,0.81,0.82,0.82,0.82,0.82,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.9,0.9,0.9,0.9,0.9,0.9,0.9,0.93,0.93,0.94,0.94,0.95,0.95],
  'Coupe/Roadster': [0.02,0.04,0.06,0.08,0.1,0.12,0.14,0.16,0.18,0.2,0.22,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.25,0.26,0.27,0.29,0.29,0.29,0.29,0.3,0.31,0.32,0.32,0.32,0.33,0.34,0.35,0.36,0.36,0.37,0.38,0.39,0.4,0.41,0.42,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.59,0.59,0.6,0.61,0.62,0.63,0.63,0.63,0.63,0.64,0.65,0.66,0.66,0.66,0.66,0.67,0.67,0.68,0.68,0.68,0.68,0.69,0.7,0.71,0.71,0.71,0.71,0.71,0.72,0.73,0.73,0.73,0.73,0.74,0.74,0.75,0.75,0.75,0.75,0.75,0.76,0.77,0.77,0.77,0.77,0.77,0.78,0.79,0.79,0.79,0.79,0.79,0.79,0.8,0.8,0.8,0.8,0.8,0.81,0.82,0.82,0.82,0.82,0.82,0.82,0.83,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.93,0.93,0.94,0.94,0.95,0.95],
  'MPV': [0.02,0.03,0.05,0.06,0.08,0.09,0.11,0.12,0.14,0.16,0.17,0.19,0.19,0.19,0.19,0.21,0.22,0.23,0.23,0.23,0.24,0.25,0.26,0.27,0.28,0.29,0.3,0.31,0.32,0.33,0.33,0.33,0.33,0.34,0.35,0.36,0.37,0.38,0.39,0.4,0.41,0.43,0.44,0.45,0.46,0.47,0.48,0.49,0.5,0.51,0.52,0.53,0.54,0.55,0.56,0.57,0.58,0.59,0.6,0.61,0.61,0.61,0.61,0.62,0.63,0.64,0.64,0.64,0.64,0.65,0.66,0.67,0.67,0.67,0.67,0.68,0.69,0.7,0.7,0.7,0.7,0.71,0.71,0.72,0.72,0.72,0.72,0.73,0.74,0.75,0.75,0.75,0.75,0.75,0.76,0.77,0.77,0.77,0.77,0.77,0.78,0.78,0.78,0.78,0.78,0.79,0.79,0.8,0.8,0.8,0.8,0.8,0.81,0.82,0.82,0.82,0.82,0.82,0.82,0.83,0.83,0.83,0.83,0.83,0.84,0.84,0.84,0.84,0.84,0.84,0.85,0.85,0.85,0.85,0.85,0.85,0.86,0.86,0.86,0.86,0.86,0.86,0.87,0.87,0.87,0.87,0.87,0.87,0.87,0.88,0.88,0.88,0.88,0.88,0.88,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.89,0.9,0.9,0.9,0.9,0.9,0.9,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.91,0.93,0.93,0.94,0.94,0.95,0.95],
};

/* === ΚΑΤΗΓΟΡΙΕΣ ΑΜΑΞΩΜΑΤΟΣ ===
 * Χρησιμοποιούνται για το UI/validation. Η πραγματική απομείωση
 * υπολογίζεται από τον επίσημο monthlyDepreciation πίνακα παρακάτω.
 */
const categories = {
  "Επιλέξτε Κατηγορία Αμαξώματος": null,
  "SUV": true,
  "Hatchback": true,
  "Sedan": true,
  "Cabrio": true,
  "Coupe/Roadster": true,
  "MPV": true
};

/* === ΤΕΛΟΣ ΤΑΞΙΝΟΜΗΣΗΣ — ν. 5222/2025, άρθρα 136 & 142 === */
const registrationTaxBrackets = [
  [0,     14000, 0.04],
  [14000, 17000, 0.26],
  [17000, 20000, 0.53],
  [20000, 25000, 0.62],
  [25000, 30000, 0.71],
  [30000, Infinity, 0.30]
];

/* ========== ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ ========== */
function parseDate(v){ return v ? new Date(v + (v.length === 10 ? "T12:00:00" : "")) : null; }

function ageInYears(d1, d2){
  if (!d1 || !d2 || d2 < d1) return 0;
  return (d2 - d1) / (1000*60*60*24*365.2425);
}

function completedMonths(d1, d2){
  if (!d1 || !d2 || d2 < d1) return 0;
  let months = (d2.getFullYear()-d1.getFullYear())*12 + (d2.getMonth()-d1.getMonth());
  if (d2.getDate() < d1.getDate()) months--;
  return Math.max(0, months);
}

function ageInHalfYears(d1, d2){
  return Math.floor(completedMonths(d1,d2)/6)/2;
}

function autoAvgKmFromMonths(months){ return (months * 15000) / 12; }

function lookupDepreciationByMonth(cat, months){
  const table = monthlyDepreciation[cat];
  if (!table || months < 1) return 0;
  // Από τον 192ο μήνα και μετά εφαρμόζεται το ανώτατο 95%.
  const idx = Math.min(Math.floor(months), 192) - 1;
  return table[idx];
}

function mileageDepRate(avgKm, mileage){
  if (!Number.isFinite(mileage) || mileage <= avgKm) return 0;
  const extraKm = mileage - avgKm;
  // 0,10% ανά 500 επιπλέον km (αναλογικά), με ανώτατο 10%, όπως στο παράδειγμα ΑΑΔΕ.
  return Math.min(0.10, (extraKm / 500) * 0.001);
}

function co2Adjustment(firstReg, co2){
  if (!Number.isFinite(co2)) return { adjustment: 0, cycle: "—", band: "—" };
  const wltp = firstReg >= new Date("2021-01-01T00:00:00");
  if (wltp) {
    if (co2 <= 130) return {adjustment:-0.05, cycle:"WLTP", band:"≤130 g/km"};
    if (co2 <= 156) return {adjustment:0, cycle:"WLTP", band:"131–156 g/km"};
    if (co2 <= 182) return {adjustment:0.10, cycle:"WLTP", band:"157–182 g/km"};
    if (co2 <= 208) return {adjustment:0.20, cycle:"WLTP", band:"183–208 g/km"};
    if (co2 <= 234) return {adjustment:0.30, cycle:"WLTP", band:"209–234 g/km"};
    if (co2 <= 260) return {adjustment:0.40, cycle:"WLTP", band:"235–260 g/km"};
    if (co2 <= 325) return {adjustment:0.60, cycle:"WLTP", band:"261–325 g/km"};
    return {adjustment:1.00, cycle:"WLTP", band:">325 g/km"};
  }
  if (co2 <= 100) return {adjustment:-0.05, cycle:"NEDC", band:"≤100 g/km"};
  if (co2 <= 120) return {adjustment:0, cycle:"NEDC", band:"101–120 g/km"};
  if (co2 <= 140) return {adjustment:0.10, cycle:"NEDC", band:"121–140 g/km"};
  if (co2 <= 160) return {adjustment:0.20, cycle:"NEDC", band:"141–160 g/km"};
  if (co2 <= 180) return {adjustment:0.30, cycle:"NEDC", band:"161–180 g/km"};
  if (co2 <= 200) return {adjustment:0.40, cycle:"NEDC", band:"181–200 g/km"};
  if (co2 <= 250) return {adjustment:0.60, cycle:"NEDC", band:"201–250 g/km"};
  return {adjustment:1.00, cycle:"NEDC", band:">250 g/km"};
}

function euroAdjustment(code, firstReg){
  const d2012 = new Date("2012-12-31T23:59:59");
  const d2015 = new Date("2015-08-31T23:59:59");
  const d2018 = new Date("2018-08-31T23:59:59");
  if (code === "euro6") {
    if (firstReg <= d2015) return 1.00;
    if (firstReg <= d2018) return 0.50;
    return 0;
  }
  if (code === "euro5b") return firstReg <= d2015 ? 1.00 : 0;
  if (code === "euro6a" || code === "euro5a" || code === "euro4") return firstReg <= d2012 ? 2.00 : 0;
  if (["euro3","euro2","euro1"].includes(code)) return 2.00;
  if (code === "no_euro_no_co2") return 3.00; // +200% Euro και επιπλέον +100% λόγω μη αποδεδειγμένου CO2
  return 0;
}

function environmentalFee(code){
  if (code === "euro4") return 3000;
  if (code === "euro5a" || code === "euro5b") return 1000;
  return 0;
}

function progressiveTaxBeforeDepreciation(originalPrice, rateMultiplier){
  let tax = 0;
  const parts = [];
  for (const [low, high, baseRate] of registrationTaxBrackets) {
    if (originalPrice <= low) break;
    const amount = Math.min(originalPrice, high) - low;
    if (amount <= 0) continue;
    const adjustedRate = Math.max(0, baseRate * rateMultiplier);
    const partTax = amount * adjustedRate;
    tax += partTax;
    parts.push({low, high, amount, baseRate, adjustedRate, partTax});
  }
  return {tax, parts};
}

function hybridExemption(powertrain, co2, importDate){
  if (powertrain === "electric" || powertrain === "hydrogen") return 1;
  if (powertrain !== "hybrid") return 0;

  // Έως 31/12/2026: 75% έως 50 g/km, 50% από 51 g/km.
  // Ειδική μεταβατική ρύθμιση: εισαγωγή 1/11/2025–31/5/2026 και CO2 έως 75 => 75%.
  // Από 1/1/2027: 50% για όλα τα υβριδικά, ανεξαρτήτως CO2.
  const changeDate = new Date("2027-01-01T00:00:00");
  if (importDate >= changeDate) return 0.50;
  const specialStart = new Date("2025-11-01T00:00:00");
  const specialEnd   = new Date("2026-05-31T23:59:59");
  if (importDate >= specialStart && importDate <= specialEnd && co2 <= 75) return 0.75;
  return co2 <= 50 ? 0.75 : 0.50;
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
  const labelSpan  = document.querySelector(".extras-toggle-label");

  const extrasTotal = getExtrasTotal();
  const finalPrice  = currentBasePrice + extrasTotal;

  if (!isNaN(finalPrice)) {
    priceInput.value = formatGreekNumber(finalPrice, 0, 2);
  }

  if (!labelSpan) {
    updateCarSummary();
    return;
  }

  const count = selectedExtras.size;
  if (currentExtras.length === 0) {
    labelSpan.textContent = "Δεν υπάρχουν extras";
  } else if (count === 0) {
    labelSpan.textContent = "Χωρίς επιπλέον extras";
  } else {
    const formatted = extrasTotal.toLocaleString("el-GR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    labelSpan.textContent = `${count} επιλεγμένα (+${formatted} €)`;
  }

  updateCarSummary();
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
  const panel     = document.getElementById("extrasPanel");
  const toggleBtn = document.getElementById("extrasToggle");
  const labelSpan = document.querySelector(".extras-toggle-label");

  currentExtras = extrasList || [];
  selectedExtras.clear();

  if (!panel) return;
  panel.innerHTML = "";

  if (!currentExtras || currentExtras.length === 0) {
    if (toggleBtn) toggleBtn.disabled = true;
    if (labelSpan) labelSpan.textContent = "Δεν υπάρχουν extras";
    recalcPriceWithExtras();
    return;
  }

  if (toggleBtn) toggleBtn.disabled = false;
  if (labelSpan) labelSpan.textContent = "Επιλέξτε extras";

  currentExtras.forEach((extra, idx) => {
    const price = Number(extra.price);
    if (!price) return; // αγνόησε STD (=0)

    const row = document.createElement("label");
    row.className = "extras-option";

    const cb = document.createElement("input");
    cb.type  = "checkbox";
    cb.value = String(idx);
    cb.addEventListener("change", handleExtraCheckboxChange);

    const text = document.createElement("span");
    text.className = "extras-option-text";
    text.textContent = `${extra.name} (+${price.toFixed(2)} €)`;

    row.appendChild(cb);
    row.appendChild(text);
    panel.appendChild(row);
  });

  recalcPriceWithExtras();
}

/* ========== DROPDOWNS ΜΑΡΚΑ / ΕΤΟΣ / ΜΟΝΤΕΛΟ / ΕΚΔΟΣΗ / ΛΤΠΦ ========== */

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

/* === Αλφαβητικα === */

function sortAlpha(arr) {
  return arr.slice().sort((a, b) => a.localeCompare(b, "el", { sensitivity: "base" }));
}

function sortYears(arr) {
  return arr.slice().sort((a, b) => Number(a) - Number(b));
}


/* === BRAND POPULATION (κρυφό select + custom menu) === */



function populateBrandSelect() {
  const selectEl     = document.getElementById("brandSelect");
  const menuEl       = document.getElementById("brandMenu");
  const buttonLabel  = document.getElementById("brandButtonLabel");
  const buttonLogo   = document.getElementById("brandButtonLogo");

  if (!selectEl) return;

  // native select (hidden)
  selectEl.innerHTML = '<option value=""></option>';

  // custom menu
  if (menuEl) menuEl.innerHTML = "";

sortAlpha(Object.keys(DATA_SOURCES)).forEach(brand => {
    // option στο select (state)
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    selectEl.appendChild(opt);

    // custom επιλογή στο menu
    if (menuEl) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "brand-option";
      item.dataset.value = brand;

      const logoSpan = document.createElement("span");
      logoSpan.className = "brand-option-logo";
      if (BRAND_LOGOS[brand]) {
        logoSpan.style.backgroundImage = `url('${BRAND_LOGOS[brand]}')`;
      }

      const textSpan = document.createElement("span");
      textSpan.className = "brand-option-label";
      textSpan.textContent = brand;

      item.appendChild(logoSpan);
      item.appendChild(textSpan);

      item.addEventListener("click", () => {
        selectEl.value = brand;

        if (buttonLabel) buttonLabel.textContent = brand;
        if (buttonLogo) {
          if (BRAND_LOGOS[brand]) {
            buttonLogo.style.backgroundImage = `url('${BRAND_LOGOS[brand]}')`;
            buttonLogo.classList.add("has-logo");
          } else {
            buttonLogo.style.backgroundImage = "none";
            buttonLogo.classList.remove("has-logo");
          }
        }

        menuEl.classList.remove("open");

        // ενεργοποίηση του κλασικού change listener
        selectEl.dispatchEvent(new Event("change"));
      });

      menuEl.appendChild(item);
    }
  });

  if (buttonLabel) buttonLabel.textContent = "Επιλέξτε μάρκα";
  if (buttonLogo) {
    buttonLogo.style.backgroundImage = "none";
    buttonLogo.classList.remove("has-logo");
  }
}

function populateYearSelect() {
  const brandEl = document.getElementById("brandSelect");
  const yearEl  = document.getElementById("yearSelect");
  const brand   = brandEl.value;

  yearEl.innerHTML = '<option value="">Επιλέξτε Χρονολογία</option>';

  if (!brand || !DATA_SOURCES[brand]) return;

sortYears(Object.keys(DATA_SOURCES[brand])).forEach(year => {
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

sortAlpha(Object.keys(currentDataset.models)).forEach(modelName => {
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
    opt.value = String(index);
    opt.textContent = ed.name;
    verEl.appendChild(opt);
  });

  updateCarSummary();
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

  // extras για την έκδοση
  loadExtras(edition.extras || []);

  if (edition.variants.length > 0) {
    colorEl.value = "0";
    autoFillCarData();
  }

  updateCarSummary();
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

  currentBasePrice = Number(variant.priceNet) || 0;

  if (Array.isArray(edition.extras)) {
    loadExtras(edition.extras);
  } else {
    loadExtras([]);
  }

  recalcPriceWithExtras();

  if (edition.co2 != null) {
    document.getElementById("co2").value = edition.co2;
  }

  // Auto-fill tax metadata when it is available in the selected edition.
  // The controls remain editable so the user can override them from the vehicle CoC.
  if (edition.euro) {
    const euroEl = document.getElementById("euroClass");
    if (euroEl && [...euroEl.options].some(o => o.value === edition.euro)) euroEl.value = edition.euro;
  }
  if (edition.powertrain) {
    const powertrainEl = document.getElementById("powertrain");
    if (powertrainEl && [...powertrainEl.options].some(o => o.value === edition.powertrain)) powertrainEl.value = edition.powertrain;
  }

  const autoBodyType = edition.bodyType || modelObj.category;
  if (autoBodyType && categories[autoBodyType]) {
    document.getElementById("category").value = autoBodyType;
  }

  updateCarSummary();
}

/* ========== ΣΥΝΟΨΗ ΟΧΗΜΑΤΟΣ ========== */

function updateCarSummary() {
  const summaryEl = document.getElementById("carSummary");
  if (!summaryEl) return;

  const brand    = document.getElementById("brandSelect").value || "—";
  const year     = document.getElementById("yearSelect").value  || "—";
  const model    = document.getElementById("modelSelect").value || "—";
  const verIdx   = document.getElementById("versionSelect").value;
  const colorIdx = document.getElementById("colorSelect").value;

  let editionName = "—";
  let variantName = "—";

  if (currentDataset && model && !isNaN(parseInt(verIdx,10))) {
    const ed = currentDataset.models[model]?.editions[parseInt(verIdx,10)];
    if (ed) {
      editionName = ed.name || "—";
      if (Array.isArray(ed.variants) && !isNaN(parseInt(colorIdx,10))) {
        const v = ed.variants[parseInt(colorIdx,10)];
        if (v) variantName = v.color || "Standard";
      }
    }
  }

  const priceVal  = document.getElementById("price").value;
  const parsedPriceVal = parseLocalizedNumber(priceVal);
  const priceText = priceVal && Number.isFinite(parsedPriceVal)
    ? parsedPriceVal.toLocaleString("el-GR",{minimumFractionDigits:0,maximumFractionDigits:2})+" €"
    : "—";

  summaryEl.innerHTML = `
    <p><strong>Μάρκα:</strong> ${brand}</p>
    <p><strong>Έτος:</strong> ${year}</p>
    <p><strong>Μοντέλο:</strong> ${model}</p>
    <p><strong>Έκδοση:</strong> ${editionName}</p>
    <p><strong>ΛΤΠΦ (με extras):</strong> ${priceText}</p>
  `;

  // Προαιρετικά, προσπάθησε να ενημερώσεις και την εικόνα
  updateCarImage();
}

/* ========== ΚΥΡΙΑ ΣΥΝΑΡΤΗΣΗ ΥΠΟΛΟΓΙΣΜΟΥ ========== */

async function calculate(){
  const price      = parseLocalizedNumber(document.getElementById("price").value);
  const cat        = document.getElementById("category").value;
  const firstReg   = parseDate(document.getElementById("firstReg").value);
  const importDate = parseDate(document.getElementById("importDate").value);
  const mileage    = Number(document.getElementById("mileage").value);
  const co2        = Number(document.getElementById("co2").value);
  const euroClass  = document.getElementById("euroClass")?.value || "modern";
  const powertrain = document.getElementById("powertrain")?.value || "ice";

  // Επαναφορά της οπτικής επισήμανσης των υποχρεωτικών πεδίων.
  // Τα wrappers και τα κόκκινα ! υπάρχουν ήδη στο HTML/CSS — εδώ απλώς
  // ενεργοποιούμε ξανά την κλάση has-warning όταν ο χρήστης πατήσει Υπολογισμό.
  const priceRaw = document.getElementById("price").value.trim();
  const mileageRaw = document.getElementById("mileage").value.trim();
  const co2Raw = document.getElementById("co2").value.trim();
  const firstRegDay = document.getElementById("firstRegDay")?.value || "";
  const firstRegMonth = document.getElementById("firstRegMonth")?.value || "";
  const firstRegYear = document.getElementById("firstRegYear")?.value || "";

  const validation = {
    price: priceRaw === "" || !(price > 0),
    category: !cat || categories[cat] == null,
    firstReg: !firstRegDay || !firstRegMonth || !firstRegYear || !firstReg,
    importDate: !document.getElementById("importDate").value || !importDate || (!!firstReg && !!importDate && importDate < firstReg),
    mileage: mileageRaw === "" || !Number.isFinite(mileage) || mileage < 0,
    co2: co2Raw === "" || !Number.isFinite(co2) || co2 < 0
  };

  document.querySelector('.required-field-wrap[data-field="price"]')?.classList.toggle("has-warning", validation.price);
  document.querySelector('.category-field-wrap')?.classList.toggle("has-warning", validation.category);
  document.querySelector('.required-field-wrap[data-field="firstReg"]')?.classList.toggle("has-warning", validation.firstReg);
  document.querySelector('.required-field-wrap[data-field="importDate"]')?.classList.toggle("has-warning", validation.importDate);
  document.querySelector('.required-field-wrap[data-field="mileage"]')?.classList.toggle("has-warning", validation.mileage);
  document.querySelector('.required-field-wrap[data-field="co2"]')?.classList.toggle("has-warning", validation.co2);

  if (Object.values(validation).some(Boolean)) {
    setRegistrationTaxMiniResult(null);
    document.getElementById("results").innerHTML = `<p><strong>Έλεγχος στοιχείων:</strong> Συμπλήρωσε τα πεδία που επισημαίνονται με κόκκινο.</p>`;
    return;
  }

  // Charge exactly one server-side token only after all required fields pass
  // validation. If authorization fails, no result is revealed.
  if (!(await cartelonioAuthorizeCalculation())) return;

  const exactMonths = completedMonths(firstReg, importDate);
  const exactYears = exactMonths / 12;
  const ageStep = ageInHalfYears(firstReg, importDate);
  const yearDep = lookupDepreciationByMonth(cat, exactMonths);
  const afterAgeValue = price * (1 - yearDep);

  const avgKm = autoAvgKmFromMonths(exactMonths);
  const kmDepRate = mileageDepRate(avgKm, mileage);
  // ΑΑΔΕ: Γ = Α + Β - (Α×Β). Το επίσημο παράδειγμα παρουσιάζει/χρησιμοποιεί
  // το συνολικό ποσοστό με ακρίβεια 0,1 ποσοστιαίας μονάδας (66,595% -> 66,6%).
  let totalDep = yearDep + kmDepRate - (yearDep * kmDepRate);
  totalDep = Math.min(0.95, Math.round(totalDep * 1000) / 1000);
  const finalPrice = price * (1 - totalDep);
  const residualFactor = 1 - totalDep;

  const coInfo = co2Adjustment(firstReg, co2);
  const euroAdj = euroAdjustment(euroClass, firstReg);
  // CO₂ και Euro εφαρμόζονται διαδοχικά/πολλαπλασιαστικά στους βασικούς συντελεστές (όπως στο επίσημο παράδειγμα ΑΑΔΕ).
  const rateMultiplier = Math.max(0, (1 + coInfo.adjustment) * (1 + euroAdj));

  // Για μεταχειρισμένο, η επιλογή των κλιμακίων γίνεται με την προ απομείωσης ΛΤΠΦ.
  // Το ποσό που αναλογεί στα επιλεγμένα κλιμάκια απομειώνεται με τον ίδιο residual factor.
  const progressive = progressiveTaxBeforeDepreciation(price, rateMultiplier);
  const taxAfterDepreciation = progressive.tax * residualFactor;

  const exemption = hybridExemption(powertrain, co2, importDate);
  const registrationTax = taxAfterDepreciation * (1 - exemption);
  const envFee = environmentalFee(euroClass);
  const tax = registrationTax + envFee;

  const fmtPct = x => `${(x*100).toFixed(1).replace(".0","")}%`;
  const fmtEur = x => x.toLocaleString("el-GR", {minimumFractionDigits:2, maximumFractionDigits:2});
  const powerLabel = ({ice:"Συμβατικό / μη υβριδικό", hybrid:"Υβριδικό", electric:"Αμιγώς ηλεκτρικό", hydrogen:"Κυψέλες υδρογόνου"})[powertrain] || powertrain;

  setRegistrationTaxMiniResult(tax);
  // Αποθήκευση του επιτυχούς αποτελέσματος χωρίς νέα χρέωση token.
  void saveCalculationHistory({price, cat, mileage, co2, euroClass, powertrain, registrationTax, envFee, tax, totalDep, finalPrice});

  document.getElementById("results").innerHTML = `
    <p><strong>Ηλικία κατά την εισαγωγή:</strong> ${exactMonths} πλήρεις μήνες (${exactYears.toFixed(2)} έτη — επίσημος πίνακας ${Math.min(exactMonths,192)} μηνών)</p>
    <p><strong>Απομείωση ηλικίας / αμαξώματος:</strong> ${fmtPct(yearDep)}</p>
    <p><strong>Αξία μετά την απομείωση ηλικίας:</strong> €${fmtEur(afterAgeValue)}</p>
    <p><strong>Μέσος όρος χιλιομέτρων:</strong> ${Math.round(avgKm).toLocaleString("el-GR")} km</p>
    <p><strong>Πρόσθετη απομείωση χιλιομέτρων:</strong> ${fmtPct(kmDepRate)}</p>
    <p><strong>Συνολική απομείωση:</strong> ${fmtPct(totalDep)}</p>
    <p><strong>Φορολογητέα αξία μετά τις απομειώσεις:</strong> €${fmtEur(finalPrice)}</p>
    <p><strong>CO₂:</strong> ${co2} g/km — ${coInfo.cycle}, ${coInfo.band} (${coInfo.adjustment >= 0 ? "+" : ""}${fmtPct(coInfo.adjustment)})</p>
    <p><strong>Προσαύξηση Euro:</strong> ${euroAdj ? "+"+fmtPct(euroAdj) : "0%"}</p>
    <p><strong>Τύπος κίνησης:</strong> ${powerLabel}${exemption ? ` — απαλλαγή ${fmtPct(exemption)}` : ""}</p>
    <p><strong>Τέλος πριν από τυχόν απαλλαγή υβριδικού:</strong> €${fmtEur(taxAfterDepreciation)}</p>
    <p><strong>Τέλος ταξινόμησης μετά την απαλλαγή:</strong> €${fmtEur(registrationTax)}</p>
    ${envFee ? `<p><strong>Περιβαλλοντικό τέλος:</strong> €${fmtEur(envFee)}</p>` : ""}
    <h3>ΣΥΝΟΛΟ Τ.Τ. + ΠΕΡΙΒΑΛΛΟΝΤΙΚΟ ΤΕΛΟΣ: €${fmtEur(tax)}</h3>
    <p class="calculation-note"><small>Εκτίμηση βάσει ν. 5222/2025 (άρθρα 136, 142) και των μεταβολών του ν. 5313/2026. Η τελική βεβαίωση γίνεται από την αρμόδια Τελωνειακή Αρχή.</small></p>
  `;
}

/* ========== ΠΡΩΤΗ ΑΔΕΙΑ (safe sync) ========== */
function syncFirstRegistrationDate() {
  const day = document.getElementById("firstRegDay");
  const month = document.getElementById("firstRegMonth");
  const year = document.getElementById("firstRegYear");
  const hidden = document.getElementById("firstReg");
  if (!day || !month || !year || !hidden) return;
  if (day.value && month.value && year.value) {
    hidden.value = `${year.value}-${String(month.value).padStart(2, "0")}-${String(day.value).padStart(2, "0")}`;
  } else { hidden.value = ""; }
}


/* ========== ΤΥΧΑΙΑ ΕΠΙΛΟΓΗ ========== */
// Μόνο datasets που υπάρχουν πραγματικά στο project. Έτσι το κουμπί δεν
// προσπαθεί να φορτώσει κενά brand/year combinations από το γενικό DATA_SOURCES.
const RANDOM_AVAILABLE_DATASETS = [
  ["Abarth","2017"],["Abarth","2018"],["Abarth","2019"],["Abarth","2020"],["Abarth","2021"],["Abarth","2022"],
  ["Alfa Romeo","2015"],["Alfa Romeo","2016"],["Alfa Romeo","2017"],["Alfa Romeo","2018"],["Alfa Romeo","2019"],["Alfa Romeo","2020"],["Alfa Romeo","2022"],
  ["Aston Martin","2018"],
  ["Audi","2015"],["Audi","2016"],["Audi","2017"],["Audi","2018"],["Audi","2019"],["Audi","2020"],["Audi","2021"],["Audi","2022"],
  ["Ford","2016"],
  ["Mazda","2021"],["Mazda","2022"],
  ["Mercedes-Benz","2015"],["Mercedes-Benz","2016"],["Mercedes-Benz","2017"],["Mercedes-Benz","2018"],["Mercedes-Benz","2019"],["Mercedes-Benz","2020"],["Mercedes-Benz","2021"],["Mercedes-Benz","2022"],["Mercedes-Benz","2023"],["Mercedes-Benz","2024"],["Mercedes-Benz","2025"],
  ["Toyota","2020"],["Toyota","2021"]
];

function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function localISODate(date=new Date()){
  const y=date.getFullYear(), m=String(date.getMonth()+1).padStart(2,"0"), d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function setBrandUI(brand){
  const label=document.getElementById("brandButtonLabel");
  const logo=document.getElementById("brandButtonLogo");
  if(label) label.textContent=brand;
  if(logo){
    if(BRAND_LOGOS[brand]){ logo.style.backgroundImage=`url('${BRAND_LOGOS[brand]}')`; logo.classList.add("has-logo"); }
    else { logo.style.backgroundImage="none"; logo.classList.remove("has-logo"); }
  }
}
function randomValidDay(year,month){
  const maxDay=new Date(Number(year),Number(month),0).getDate();
  return 1+Math.floor(Math.random()*maxDay);
}

async function randomSelectAndCalculate(){
  const btn=document.getElementById("randomSelectBtn");
  if(btn){ btn.disabled=true; btn.textContent="Επιλογή…"; }
  try{
    // Δοκιμάζουμε διαθέσιμα datasets μέχρι να βρούμε ένα με πραγματικές εκδόσεις/τιμή.
    const candidates=RANDOM_AVAILABLE_DATASETS.slice().sort(()=>Math.random()-.5);
    let picked=null;
    for(const [brand,year] of candidates){
      const url=DATA_SOURCES[brand]?.[year];
      if(!url) continue;
      try{
        const res=await fetch(url);
        if(!res.ok) continue;
        const data=await res.json();
        const models=Object.entries(data?.models||{}).filter(([,obj])=>Array.isArray(obj?.editions) && obj.editions.some(ed=>Array.isArray(ed?.variants) && ed.variants.some(v=>Number(v?.priceNet)>0)));
        if(models.length){ picked={brand,year,data,models}; break; }
      }catch(_){ /* δοκίμασε άλλο dataset */ }
    }
    if(!picked) throw new Error("Δεν βρέθηκε διαθέσιμο dataset με τιμές.");

    const brandEl=document.getElementById("brandSelect");
    const yearEl=document.getElementById("yearSelect");
    brandEl.value=picked.brand;
    setBrandUI(picked.brand);
    populateYearSelect();
    yearEl.value=picked.year;
    currentDataset=picked.data;
    populateModels();

    const eligibleModels=picked.models.map(([name,obj])=>({name,obj}));
    const chosenModel=randomItem(eligibleModels);
    document.getElementById("modelSelect").value=chosenModel.name;
    populateVersions();

    const eligibleEditions=chosenModel.obj.editions
      .map((ed,index)=>({ed,index}))
      .filter(x=>Array.isArray(x.ed?.variants) && x.ed.variants.some(v=>Number(v?.priceNet)>0));
    const chosenEdition=randomItem(eligibleEditions);
    document.getElementById("versionSelect").value=String(chosenEdition.index);
    populateColors();

    const validVariants=chosenEdition.ed.variants.map((v,index)=>({v,index})).filter(x=>Number(x.v?.priceNet)>0);
    const chosenVariant=randomItem(validVariants);
    document.getElementById("colorSelect").value=String(chosenVariant.index);
    autoFillCarData();

    // Πρώτη άδεια: ίδιο έτος με το dataset, τυχαίος έγκυρος μήνας/ημέρα.
    const month=1+Math.floor(Math.random()*12);
    const day=randomValidDay(picked.year,month);
    document.getElementById("firstRegYear").value=picked.year;
    document.getElementById("firstRegMonth").value=String(month);
    document.getElementById("firstRegDay").value=String(day);
    syncFirstRegistrationDate();

    // Εισαγωγή: πάντα σήμερα.
    const importEl=document.getElementById("importDate");
    importEl.value=localISODate();

    // Ρεαλιστικά τυχαία χιλιόμετρα με βάση την ηλικία (~8k–22k km/έτος).
    const firstReg=parseDate(document.getElementById("firstReg").value);
    const today=parseDate(importEl.value);
    const months=Math.max(1,completedMonths(firstReg,today));
    const annualKm=8000+Math.floor(Math.random()*14001);
    const mileage=Math.max(500,Math.round((annualKm*months/12)/500)*500);
    document.getElementById("mileage").value=String(mileage);

    // Αν κάποιο παλιότερο JSON δεν έχει tax metadata, συμπλήρωσε έγκυρες
    // τυχαίες τιμές ώστε η demo επιλογή να μπορεί πάντα να υπολογιστεί.
    const categoryEl=document.getElementById("category");
    if(!categoryEl.value || categories[categoryEl.value]==null){
      categoryEl.value=randomItem(Object.keys(categories).filter(k=>categories[k]!=null));
    }
    const co2El=document.getElementById("co2");
    if(co2El.value.trim()==="" || !Number.isFinite(Number(co2El.value))){
      co2El.value=String(85+Math.floor(Math.random()*176));
    }
    const euroEl=document.getElementById("euroClass");
    if(!euroEl.value || euroEl.value==="modern"){
      const preferred=Number(picked.year)>=2016 ? "euro6" : randomItem(["euro5b","euro6"]);
      if([...euroEl.options].some(o=>o.value===preferred)) euroEl.value=preferred;
    }
    const powerEl=document.getElementById("powertrain");
    if(!powerEl.value && powerEl.options.length>0) powerEl.selectedIndex=0;

    // Καμία τυχαία επιλογή extra: χρησιμοποιείται η βασική ΛΤΠΦ της έκδοσης.
    selectedExtras.clear();
    document.querySelectorAll('#extrasPanel input[type="checkbox"]').forEach(cb=>cb.checked=false);
    recalcPriceWithExtras();
    updateCarSummary();

    // Αυτόματος υπολογισμός — δεν χρειάζεται πάτημα στο «Υπολόγισε».
    await calculate();
  }catch(err){
    console.error("Σφάλμα τυχαίας επιλογής:",err);
    document.getElementById("results").innerHTML='<p><strong>Δεν ήταν δυνατή η τυχαία επιλογή.</strong> Δοκιμάστε ξανά.</p>';
  }finally{
    if(btn){ btn.disabled=false; btn.textContent="Τυχαία Επιλογή"; }
  }
}

/* ========== ΑΡΧΙΚΟΠΟΙΗΣΗ ========== */

document.addEventListener("DOMContentLoaded", () => {
  // dropdown κατηγορίας
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
  populateYearSelect();

  const brandSelect = document.getElementById("brandSelect");

  // Όταν αλλάζει μάρκα (μέσω του κρυφού select)
  brandSelect.addEventListener("change", () => {
    populateYearSelect();
    currentDataset = null;
    document.getElementById("modelSelect").innerHTML   = '<option value="">Επιλέξτε Μοντέλο</option>';
    document.getElementById("versionSelect").innerHTML = '<option value="">Επιλέξτε Έκδοση</option>';
    document.getElementById("colorSelect").innerHTML   = '<option value="">Επιλέξτε ΛΤΠΦ</option>';
    loadExtras([]);
    updateCarSummary();
  });

  document.getElementById("yearSelect").addEventListener("change", () => {
    const selectedYear = document.getElementById("yearSelect").value || "";
    const firstRegYear = document.getElementById("firstRegYear");
    if (firstRegYear) firstRegYear.value = selectedYear;
    syncFirstRegistrationDate();
    loadDatasetForSelection();
    updateCarSummary();
  });

  const firstRegDayEl = document.getElementById("firstRegDay");
  const firstRegMonthEl = document.getElementById("firstRegMonth");
  if (firstRegDayEl) firstRegDayEl.addEventListener("change", syncFirstRegistrationDate);
  if (firstRegMonthEl) firstRegMonthEl.addEventListener("change", syncFirstRegistrationDate);

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
  const extrasToggle   = document.getElementById("extrasToggle");

  if (extrasDropdown && extrasToggle) {
    extrasToggle.addEventListener("click", () => {
      extrasDropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!extrasDropdown.contains(e.target) && e.target !== extrasToggle) {
        extrasDropdown.classList.remove("open");
      }
    });
  }

  // Brand dropdown toggle
  const brandButton = document.getElementById("brandButton");
  const brandMenu   = document.getElementById("brandMenu");

  if (brandButton && brandMenu) {
    brandButton.addEventListener("click", (e) => {
      e.stopPropagation();
      brandMenu.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!brandMenu.contains(e.target) && e.target !== brandButton) {
        brandMenu.classList.remove("open");
      }
    });
  }

  const registrationTaxDetailsBtn = document.getElementById("registrationTaxDetailsBtn");
  if (registrationTaxDetailsBtn) {
    registrationTaxDetailsBtn.addEventListener("click", () => {
      document.getElementById("resultCard")?.scrollIntoView({ behavior:"smooth", block:"start" });
    });
  }

  // Κουμπιά υπολογισμού / reset
  document.getElementById("calcBtn").addEventListener("click", () => {
    calculate();
  });

  const randomSelectBtn = document.getElementById("randomSelectBtn");
  if (randomSelectBtn) randomSelectBtn.addEventListener("click", randomSelectAndCalculate);

  document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("calcForm").reset();
    currentBasePrice = 0;
    currentExtras = [];
    selectedExtras.clear();
    loadExtras([]);
    document.getElementById("results").innerHTML = 
      "<p>Συμπληρώστε τα πεδία και πατήστε <strong>Υπολόγισε</strong>.</p>";
    setRegistrationTaxMiniResult(null);
    updateCarSummary();
  });

  // Αρχική σύνοψη
  updateCarSummary();
});

(function () {
  const brandSelect = document.getElementById("brandSelect");
  const colorRow = document.getElementById("colorRow");
  const colorSelect = document.getElementById("colorSelect");

  if (!brandSelect || !colorRow || !colorSelect) return;

  function syncToyotaColorVisibility() {
    const isToyota = (brandSelect.value || "").trim().toLowerCase() === "toyota";

    // Κρύψε/εμφάνισε το row
    colorRow.style.display = isToyota ? "" : "none";

    // Μπλόκαρε επιλογή όταν δεν είναι Toyota
    colorSelect.disabled = !isToyota;

    // Αν αλλάξει από Toyota σε άλλη μάρκα, καθάρισε τυχόν επιλογή
    if (!isToyota) {
      colorSelect.value = "";
    }
  }

  // 1) Σε κάθε αλλαγή μάρκας
  brandSelect.addEventListener("change", syncToyotaColorVisibility);

  // 2) Αν η μάρκα αλλάζει μέσω custom UI (brandButton/menu),
  // πολλές φορές γίνεται set programmatically και μετά dispatch change.
  // Αν ΔΕΝ το κάνεις ήδη, βάλε αυτό όπου κάνεις brandSelect.value = ...
  // brandSelect.dispatchEvent(new Event("change", { bubbles: true }));

  // 3) Αρχικοποίηση στην πρώτη φόρτωση
  syncToyotaColorVisibility();
})();


// Welcome / information modal — shown on every fresh page load.
(() => {
  const modal = document.getElementById("cartelonioWelcome");
  if (!modal) return;
  const closeButtons = [
    document.getElementById("cartelonioWelcomeClose"),
    document.getElementById("cartelonioWelcomeEnter")
  ].filter(Boolean);
  const close = () => { modal.hidden = true; document.body.style.overflow = ""; };
  document.body.style.overflow = "hidden";
  closeButtons.forEach(btn => btn.addEventListener("click", close));
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) close(); });
})();


/* CARTELONIO — How to use modal */
(function(){
  const modal=document.getElementById("howToUseModal");
  const btn=document.getElementById("howToUseBtn");
  if(!modal||!btn)return;
  const close=()=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");document.body.classList.remove("how-to-modal-open");};
  const open=()=>{modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");document.body.classList.add("how-to-modal-open");};
  btn.addEventListener("click",open);
  modal.querySelectorAll("[data-how-to-close]").forEach(el=>el.addEventListener("click",close));
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal.classList.contains("is-open"))close();});
})();


/* =========================================================
   CARTELONIO — Three-view onboarding controller
   ========================================================= */
(function initCartelonioOnboarding(){
  const modal = document.getElementById("cartelonioOnboarding");
  if(!modal) return;

  const views = [...modal.querySelectorAll("[data-onboarding-view]")];

  function showView(name){
    const current = modal.querySelector(".onboarding-view.is-active");
    const next = modal.querySelector(`[data-onboarding-view="${name}"]`);
    if(!next || current === next) return;

    if(current){
      current.style.opacity = "0";
      current.style.transform = "translateY(-5px)";
      setTimeout(() => {
        current.classList.remove("is-active");
        current.removeAttribute("style");
        next.classList.add("is-active");
      }, 160);
    } else {
      next.classList.add("is-active");
    }
  }

  function closeOnboarding(){
    modal.style.opacity = "0";
    modal.style.transition = "opacity .22s ease";
    setTimeout(() => {
      modal.setAttribute("aria-hidden","true");
      modal.classList.remove("is-open");
      modal.removeAttribute("style");
      document.body.classList.remove("cartelonio-onboarding-open");
    }, 220);
  }

  modal.querySelectorAll("[data-onboarding-go]").forEach(btn => {
    btn.addEventListener("click", () => showView(btn.dataset.onboardingGo));
  });
  modal.querySelectorAll("[data-onboarding-start]").forEach(btn => {
    btn.addEventListener("click", closeOnboarding);
  });

  document.body.classList.add("cartelonio-onboarding-open");
})();


/* =========================================================
   CARTELONIO — Header How to use reopen repair
   ========================================================= */
(function repairHeaderHowToUse(){
  const btn = document.getElementById("howToUseBtn");
  const modal = document.getElementById("cartelonioOnboarding");
  if(!btn || !modal) return;

  /* Clone removes stale listeners that were attached to the now-removed
     standalone How-to modal. */
  const cleanBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(cleanBtn, btn);

  cleanBtn.addEventListener("click", function(){
    const views = modal.querySelectorAll("[data-onboarding-view]");
    views.forEach(view => {
      view.classList.remove("is-active");
      view.removeAttribute("style");
    });

    const howTo = modal.querySelector('[data-onboarding-view="howto"]');
    if(howTo) howTo.classList.add("is-active");

    modal.setAttribute("aria-hidden","false");
    modal.classList.add("is-open");
    document.body.classList.add("cartelonio-onboarding-open");
  });
})();


/* 2026-09-18 — Greek thousands/decimal formatting for LTPF */
(function initGreekPriceFormatting(){
  const priceInput = document.getElementById("price");
  if (!priceInput) return;
  priceInput.addEventListener("blur", formatPriceField);
  priceInput.addEventListener("change", formatPriceField);
})();

/* ================= SUPABASE AUTH + CALCULATION TOKENS ================= */
const CARTELONIO_SUPABASE_URL = "https://ypntvpasjxsckdhffwaf.supabase.co";
const CARTELONIO_SUPABASE_KEY = "sb_publishable_H3ehVDWPkwHN7wYg908y5Q_28zDi9dZ";
const cartelonioDb = window.supabase?.createClient(
  CARTELONIO_SUPABASE_URL,
  CARTELONIO_SUPABASE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

let cartelonioSession = null;
let cartelonioProfile = null;
let resolveAuthReady;
const cartelonioAuthReady = new Promise(resolve => { resolveAuthReady = resolve; });

function authElement(id) { return document.getElementById(id); }

function setAuthStatus(message = "", type = "") {
  const element = authElement("authStatus");
  if (!element) return;
  element.textContent = message;
  element.className = `auth-status${type ? ` is-${type}` : ""}`;
}

function showAuthView(view) {
  const tabs = authElement("authTabs");
  const userPanel = authElement("authUserPanel");
  const signedIn = Boolean(cartelonioSession?.user && !cartelonioSession.user.is_anonymous);
  if (signedIn && view !== "password") view = "user";
  document.querySelectorAll("[data-auth-view]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.authView === view);
  });
  // Never expose guest tabs/forms to an authenticated user.
  document.querySelectorAll("[data-auth-panel]").forEach(panel => {
    panel.classList.toggle("is-active", (panel.dataset.authPanel === view && !signedIn) || (panel.dataset.authPanel === "password" && view === "password"));
  });
  if (tabs) tabs.hidden = signedIn || view === "password" || view === "user";
  if (userPanel) userPanel.hidden = view !== "user";
}

function positionAccountDropdown() {
  const button = authElement("accountButton");
  const modal = authElement("authModal");
  if (!button || !modal) return;
  const bottom = button.getBoundingClientRect().bottom;
  modal.style.setProperty("--account-menu-top", `${Math.ceil(bottom + 9)}px`);
}
window.addEventListener("resize", () => {
  if (!authElement("authModal")?.hidden) positionAccountDropdown();
});

function openAuthModal(view) {
  const modal = authElement("authModal");
  if (!modal) return;
  setAuthStatus();
  showAuthView(view || (cartelonioSession?.user?.is_anonymous ? "signup" : "user"));
  positionAccountDropdown();
  modal.hidden = false;
  authElement("accountButton")?.setAttribute("aria-expanded", "true");
}

function closeAuthModal() {
  const modal = authElement("authModal");
  if (!modal) return;
  modal.hidden = true;
  authElement("accountButton")?.setAttribute("aria-expanded", "false");
}

function renderAccountState() {
  const user = cartelonioSession?.user;
  const balance = Number(cartelonioProfile?.token_balance || 0);
  const isPermanent = Boolean(user && !user.is_anonymous);
  const badge = authElement("tokenBadge");
  const badgeText = authElement("tokenBadgeText");
  if (badgeText) badgeText.textContent = `${balance} ${balance === 1 ? "token" : "tokens"}`;
  badge?.classList.toggle("is-empty", balance < 1);
  if (authElement("accountButtonText")) {
    authElement("accountButtonText").textContent = isPermanent ? "Ο λογαριασμός μου" : "Εγγραφή / Σύνδεση";
  }
  if (authElement("authUserEmail")) authElement("authUserEmail").textContent = user?.email || "";
  if (authElement("authTokenBalance")) authElement("authTokenBalance").textContent = String(balance);
  // Reflect the real Supabase session immediately when it changes.
  const modal = authElement("authModal");
  if (modal && !modal.hidden && !authElement("setPasswordForm")?.classList.contains("is-active")) {
    showAuthView(isPermanent ? "user" : "signup");
  }
}

async function loadCartelonioProfile() {
  if (!cartelonioDb || !cartelonioSession?.user) return null;
  const { data, error } = await cartelonioDb
    .from("profiles")
    .select("email,is_anonymous,token_balance,subscription_status,subscription_plan")
    .eq("user_id", cartelonioSession.user.id)
    .single();
  if (!error) cartelonioProfile = data;
  renderAccountState();
  return cartelonioProfile;
}

async function claimVisitorTrial() {
  if (!cartelonioDb || !cartelonioSession?.user?.is_anonymous) return;
  const { error } = await cartelonioDb.functions.invoke("claim-trial", { body: {} });
  if (error) console.warn("Visitor trial could not be checked:", error.message);
  await loadCartelonioProfile();
}

async function ensureCartelonioSession() {
  if (!cartelonioDb) throw new Error("Η υπηρεσία λογαριασμού δεν φορτώθηκε.");
  let { data: { session }, error } = await cartelonioDb.auth.getSession();
  if (error) throw error;
  if (!session) {
    const anonymousResult = await cartelonioDb.auth.signInAnonymously();
    if (anonymousResult.error) throw anonymousResult.error;
    session = anonymousResult.data.session;
  }
  cartelonioSession = session;
  await loadCartelonioProfile();
  await claimVisitorTrial();
  return session;
}

async function cartelonioAuthorizeCalculation() {
  const button = authElement("calcBtn");
  try {
    if (button) button.disabled = true;
    await cartelonioAuthReady;
    if (!cartelonioDb || !cartelonioSession) throw new Error("Δεν υπάρχει ενεργή σύνδεση.");

    const requestId = crypto.randomUUID();
    const { data, error } = await cartelonioDb.rpc("consume_calculation_token", {
      p_request_id: requestId,
    });
    if (error) {
      if (/insufficient_tokens/i.test(error.message || "")) {
        await loadCartelonioProfile();
        if (cartelonioSession.user.is_anonymous) {
          openAuthModal("signup");
          setAuthStatus("Ο δωρεάν υπολογισμός χρησιμοποιήθηκε. Δημιούργησε λογαριασμό για έναν ακόμη δωρεάν υπολογισμό.", "error");
        } else {
          openAuthModal("user");
          setAuthStatus("Δεν υπάρχουν διαθέσιμοι υπολογισμοί. Τα πακέτα συνδρομής θα προστεθούν σύντομα.", "error");
        }
        return false;
      }
      throw error;
    }
    const result = Array.isArray(data) ? data[0] : data;
    if (!cartelonioProfile) cartelonioProfile = {};
    cartelonioProfile.token_balance = Number(result?.remaining_tokens || 0);
    renderAccountState();
    return true;
  } catch (error) {
    console.error("Calculation authorization failed:", error);
    openAuthModal(cartelonioSession?.user?.is_anonymous ? "signup" : "user");
    setAuthStatus("Δεν μπορέσαμε να επιβεβαιώσουμε το token. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.", "error");
    return false;
  } finally {
    if (button) button.disabled = false;
  }
}

async function initializeCartelonioAuth() {
  try {
    await ensureCartelonioSession();

    cartelonioDb.auth.onAuthStateChange((event, session) => {
      cartelonioSession = session;
      window.setTimeout(async () => {
        if (session) await loadCartelonioProfile();
        if ((event === "PASSWORD_RECOVERY") ||
            (session?.user && !session.user.is_anonymous && localStorage.getItem("cartelonio_pending_password_setup") === "1")) {
          openAuthModal("password");
          setAuthStatus("Το email επιβεβαιώθηκε. Όρισε τώρα τον κωδικό του λογαριασμού σου.", "success");
        }
      }, 0);
    });
  } catch (error) {
    console.error("Cartelonio auth initialization failed:", error);
    setAuthStatus("Η υπηρεσία λογαριασμού δεν είναι προσωρινά διαθέσιμη.", "error");
  } finally {
    resolveAuthReady();
  }
}

authElement("accountButton")?.addEventListener("click", () => {
  if (!authElement("authModal")?.hidden) closeAuthModal();
  else openAuthModal();
});
document.addEventListener("pointerdown", event => {
  const controls = authElement("accountControls");
  if (controls && !controls.contains(event.target)) closeAuthModal();
});
authElement("authClose")?.addEventListener("click", closeAuthModal);
authElement("authModal")?.addEventListener("click", event => {
  if (event.target === authElement("authModal")) closeAuthModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !authElement("authModal")?.hidden) closeAuthModal();
});

document.querySelectorAll("[data-auth-view]").forEach(button => {
  button.addEventListener("click", () => {
    setAuthStatus();
    showAuthView(button.dataset.authView);
  });
});

authElement("signupForm")?.addEventListener("submit", async event => {
  event.preventDefault();
  const email = authElement("signupEmail").value.trim();
  const submit = event.submitter;
  try {
    submit.disabled = true;
    setAuthStatus("Αποστολή email επιβεβαίωσης…");
    await cartelonioAuthReady;
    const { error } = await cartelonioDb.auth.updateUser(
      { email },
      { emailRedirectTo: `${location.origin}/?account=verified` }
    );
    if (error) throw error;
    localStorage.setItem("cartelonio_pending_password_setup", "1");
    setAuthStatus("Σου στείλαμε email επιβεβαίωσης. Άνοιξε τον σύνδεσμο στο ίδιο πρόγραμμα περιήγησης.", "success");
  } catch (error) {
    setAuthStatus(error.message || "Η εγγραφή δεν ολοκληρώθηκε.", "error");
  } finally {
    submit.disabled = false;
  }
});

authElement("loginForm")?.addEventListener("submit", async event => {
  event.preventDefault();
  const email = authElement("loginEmail").value.trim();
  const password = authElement("loginPassword").value;
  const submit = event.submitter;
  try {
    submit.disabled = true;
    setAuthStatus("Σύνδεση…");
    if (cartelonioSession?.user?.is_anonymous) await cartelonioDb.auth.signOut();
    const { data, error } = await cartelonioDb.auth.signInWithPassword({ email, password });
    if (error) throw error;
    cartelonioSession = data.session;
    await loadCartelonioProfile();
    showAuthView("user");
    setAuthStatus("Συνδέθηκες επιτυχώς.", "success");
  } catch (error) {
    setAuthStatus("Λανθασμένο email ή κωδικός.", "error");
    if (!cartelonioSession) await ensureCartelonioSession().catch(() => {});
  } finally {
    submit.disabled = false;
  }
});

authElement("setPasswordForm")?.addEventListener("submit", async event => {
  event.preventDefault();
  const password = authElement("newPassword").value;
  const confirmation = authElement("confirmPassword").value;
  const submit = event.submitter;
  if (password !== confirmation) {
    setAuthStatus("Οι δύο κωδικοί δεν ταιριάζουν.", "error");
    return;
  }
  try {
    submit.disabled = true;
    const { error } = await cartelonioDb.auth.updateUser({ password });
    if (error) throw error;
    localStorage.removeItem("cartelonio_pending_password_setup");
    await loadCartelonioProfile();
    showAuthView("user");
    setAuthStatus("Ο λογαριασμός σου είναι έτοιμος.", "success");
    history.replaceState({}, document.title, location.pathname);
  } catch (error) {
    setAuthStatus(error.message || "Ο κωδικός δεν αποθηκεύτηκε.", "error");
  } finally {
    submit.disabled = false;
  }
});

authElement("forgotPasswordBtn")?.addEventListener("click", async () => {
  const email = authElement("loginEmail").value.trim();
  if (!email) {
    setAuthStatus("Γράψε πρώτα το email σου.", "error");
    return;
  }
  const { error } = await cartelonioDb.auth.resetPasswordForEmail(email, {
    redirectTo: `${location.origin}/?account=recovery`,
  });
  setAuthStatus(
    error ? (error.message || "Δεν στάλθηκε το email.") : "Σου στείλαμε email επαναφοράς κωδικού.",
    error ? "error" : "success"
  );
});

authElement("logoutBtn")?.addEventListener("click", async event => {
  event.currentTarget.disabled = true;
  await cartelonioDb.auth.signOut();
  cartelonioSession = null;
  cartelonioProfile = null;
  await ensureCartelonioSession().catch(() => {});
  closeAuthModal();
  event.currentTarget.disabled = false;
});

initializeCartelonioAuth();


/* ================= PERSONAL CALCULATION HISTORY ================= */
const HISTORY_PAGE_SIZE = 20;
let historyPage = 0;
let historyBusy = false;
let historyImageCache = new Map();
const historyEl = id => document.getElementById(id);
const historyEuro = value => Number(value).toLocaleString('el-GR',{minimumFractionDigits:2,maximumFractionDigits:2});
const historyNumber = value => Number(value).toLocaleString('el-GR');
function historyStatus(message) { const el=historyEl('historyMessage'); if(el) el.textContent=message || ''; }
function historyNode(tag, cls, value) { const el=document.createElement(tag); if(cls) el.className=cls; if(value != null) el.textContent=String(value); return el; }
function historyField(parent,label,value){const el=historyNode('div','history-field');el.append(historyNode('span','',label),historyNode('strong','',value == null || value === '' ? '—' : value));parent.append(el);}
function historySignedIn(){return Boolean(cartelonioSession?.user && !cartelonioSession.user.is_anonymous);}
function historySelection(){
 const get=id=>historyEl(id)?.value || '';
 const brand=get('brandSelect'),year=get('yearSelect'),model=get('modelSelect');
 const editionIndex=get('versionSelect'),variantIndex=get('colorSelect');
 const ed=currentDataset?.models?.[model]?.editions?.[Number(editionIndex)];
 return {brand,year,model,edition:editionIndex !== '' ? ed?.name || '' : '',edition_index:editionIndex,variant_index:variantIndex,
  variant_name:variantIndex !== '' ? ed?.variants?.[Number(variantIndex)]?.color || '' : '',
  extras_indices:[...document.querySelectorAll('.extras-option input:checked')].map(input=>Number(input.value))};
}
async function saveCalculationHistory(result){
 if(!historySignedIn() || !cartelonioDb) return;
 const selection=historySelection();
 const entry={user_id:cartelonioSession.user.id,...selection,body_type:result.cat,first_registration:historyEl('firstReg')?.value || null,
  import_date:historyEl('importDate')?.value || null,mileage:result.mileage,co2:result.co2,euro_class:result.euroClass,
  powertrain:result.powertrain,ltpf:result.price,registration_tax:result.registrationTax,environmental_fee:result.envFee,
  total_tax:result.tax,depreciation_rate:result.totalDep,taxable_value:result.finalPrice};
 try {const {error}=await cartelonioDb.from('calculation_history').insert(entry);if(error)throw error;}
 catch(error){console.warn('History save failed:',error);historyStatus('Ο υπολογισμός ολοκληρώθηκε, αλλά δεν αποθηκεύτηκε στο ιστορικό.');}
}
async function historyImage(record,img){
 const source=DATA_SOURCES[record.brand]?.[String(record.year)];
 if(!source || !record.model || !record.edition) return;
 const cacheKey=source+'|'+record.model+'|'+record.edition;
 try {
  if(!historyImageCache.has(source)){
   const response=await fetch(source);if(!response.ok)throw new Error('dataset');
   historyImageCache.set(source,await response.json());
  }
  const model=historyImageCache.get(source)?.models?.[record.model];
  const edition=model?.editions?.find(ed=>ed.name===record.edition);
  const raw=edition?.image || model?.image;
  if(!raw)return;
  const path=/^(https?:)?\/\//i.test(raw)||raw.startsWith('/')||raw.startsWith('./')||raw.startsWith('../')||raw.includes('/')?raw:`images/cars/${slugifyBrand(record.brand)}/${raw}`;
  if(!img.isConnected)return;
  img.onload=()=>img.classList.add('is-loaded');
  img.onerror=()=>{img.removeAttribute('src');img.classList.remove('is-loaded');};
  img.src=path;
 }catch(err){console.warn('History image unavailable:',err);}
}
function renderHistoryRecord(record){
 const article=historyNode('article','history-entry');
 const head=historyNode('div','history-entry-head');
 const visual=historyNode('div','history-visual');
 const img=historyNode('img','history-car-image');img.alt='';img.loading='lazy';
 visual.append(img,historyNode('span','history-car-fallback',(record.brand||'')+' '+(record.model||'')));
 const main=historyNode('div','history-entry-main');
 main.append(historyNode('strong','history-car-name',[record.brand,record.model].filter(Boolean).join(' ') || 'Χειροκίνητη εισαγωγή'),
  historyNode('span','history-car-version',[record.year,record.edition].filter(Boolean).join(' · ')),
  historyNode('span','history-entry-date',new Date(record.created_at).toLocaleString('el-GR',{dateStyle:'medium',timeStyle:'short'})));
 const money=historyNode('div','history-entry-money');
 money.append(historyNode('small','', 'Τέλος ταξινόμησης'),historyNode('strong','', '€'+historyEuro(record.total_tax)),
  historyNode('small','history-ltpf','ΛΤΠΦ €'+historyEuro(record.ltpf)));
 head.append(visual,main,money);article.append(head);
 const actions=historyNode('div','history-entry-actions');
 const details=historyNode('button','history-action','Λεπτομέρειες ↓');details.type='button';details.setAttribute('aria-expanded','false');
 const restore=historyNode('button','history-action history-restore','↻ Επαναφορά στοιχείων');restore.type='button';
 const remove=historyNode('button','history-action history-delete','Διαγραφή');remove.type='button';
 const expanded=historyNode('div','history-expanded');expanded.hidden=true;
 const fields=historyNode('div','history-fields');
 [['Μάρκα',record.brand],['Έτος',record.year],['Μοντέλο',record.model],['Έκδοση',record.edition],
 ['Είδος αμαξώματος',record.body_type],['Πρώτη άδεια',record.first_registration],['Ημερομηνία εισαγωγής',record.import_date],
 ['Χιλιόμετρα',historyNumber(record.mileage)+' km'],['CO₂',record.co2+' g/km'],['Προδιαγραφή Euro',record.euro_class],
 ['Τύπος κίνησης',record.powertrain],['ΛΤΠΦ','€'+historyEuro(record.ltpf)],
 ['Φορολογητέα αξία','€'+historyEuro(record.taxable_value)],['Τέλος ταξινόμησης','€'+historyEuro(record.registration_tax)],
 ['Περιβαλλοντικό τέλος','€'+historyEuro(record.environmental_fee)],['Συνολικό τέλος','€'+historyEuro(record.total_tax)]].forEach(([k,v])=>historyField(fields,k,v));
 expanded.append(fields);actions.append(details,restore,remove);article.append(actions,expanded);
 details.addEventListener('click',()=>{expanded.hidden=!expanded.hidden;details.setAttribute('aria-expanded',String(!expanded.hidden));details.textContent=expanded.hidden?'Λεπτομέρειες ↓':'Λιγότερα ↑';});
 restore.addEventListener('click',async()=>{restore.disabled=true;try{await restoreHistoryRecord(record);closeHistory();}catch(err){historyStatus('Δεν ήταν δυνατή η επαναφορά των στοιχείων.');console.warn(err);}finally{restore.disabled=false;}});
 remove.addEventListener('click',async()=>{if(!confirm('Να διαγραφεί οριστικά αυτός ο υπολογισμός;'))return;remove.disabled=true;
  const {error}=await cartelonioDb.from('calculation_history').delete().eq('id',record.id).eq('user_id',cartelonioSession.user.id);
  if(error){historyStatus('Η διαγραφή απέτυχε.');remove.disabled=false;}else{article.remove();historyStatus('Ο υπολογισμός διαγράφηκε.');}});
 void historyImage(record,img);return article;
}
async function loadHistory(reset=false){
 if(historyBusy || !historySignedIn())return;
 historyBusy=true;const more=historyEl('historyMore');more.disabled=true;
 if(reset){historyPage=0;historyEl('historyList').replaceChildren();}
 historyStatus('Φόρτωση ιστορικού…');
 try{const {data,error}=await cartelonioDb.from('calculation_history').select('*').order('created_at',{ascending:false})
  .range(historyPage*HISTORY_PAGE_SIZE,(historyPage+1)*HISTORY_PAGE_SIZE-1);
  if(error)throw error;
  data.forEach(item=>historyEl('historyList').append(renderHistoryRecord(item)));
  historyPage++;
  more.hidden=data.length<HISTORY_PAGE_SIZE;
  historyStatus(historyPage===1 && !data.length?'Δεν υπάρχουν ακόμη αποθηκευμένοι υπολογισμοί.':'');
 }catch(error){console.warn('History loading failed:',error);historyStatus('Δεν ήταν δυνατή η φόρτωση. Έλεγξε ότι έχεις εκτελέσει το SQL του ιστορικού.');}
 finally{historyBusy=false;more.disabled=false;}
}
function closeHistory(){historyEl('historyOverlay').hidden=true;document.body.classList.remove('history-open');}
function openHistory(){if(!historySignedIn())return;closeAuthModal();historyEl('historyOverlay').hidden=false;document.body.classList.add('history-open');void loadHistory(true);}
function setHistoryInput(id,value){const el=historyEl(id);if(el && value != null){el.value=String(value);el.dispatchEvent(new Event('change',{bubbles:true}));}}
async function restoreHistoryRecord(record){
 const brand=historyEl('brandSelect');
 if(record.brand && DATA_SOURCES[record.brand]?.[String(record.year)]){
  brand.value=record.brand;brand.dispatchEvent(new Event('change',{bubbles:true}));
  setBrandUI(record.brand);
  setHistoryInput('yearSelect',record.year);
  await loadDatasetForSelection();
  if([...historyEl('modelSelect').options].some(opt=>opt.value===record.model)){
   setHistoryInput('modelSelect',record.model);populateVersions();
   const editionOptions=[...historyEl('versionSelect').options];
   const matching=editionOptions.find(opt=>opt.textContent.trim()===record.edition);
   const editionValue=matching?.value ?? record.edition_index;
   if(editionOptions.some(opt=>opt.value===String(editionValue))){
    setHistoryInput('versionSelect',editionValue);populateColors();
    const variantOptions=[...historyEl('colorSelect').options];
    const matchVariant=variantOptions.find(opt=>opt.textContent.trim()===record.variant_name);
    const variantValue=matchVariant?.value ?? record.variant_index;
    if(variantOptions.some(opt=>opt.value===String(variantValue))){setHistoryInput('colorSelect',variantValue);autoFillCarData();}
    (record.extras_indices||[]).forEach(index=>{const checkbox=document.querySelector(`.extras-option input[value="${index}"]`);if(checkbox && !checkbox.checked){checkbox.checked=true;checkbox.dispatchEvent(new Event('change',{bubbles:true}));}});
   }
  }
 }
 // Preserve the historical price, even if current catalogues or extras have changed.
 setHistoryInput('price',historyEuro(record.ltpf));formatPriceField();
 setHistoryInput('category',record.body_type);setHistoryInput('co2',record.co2);setHistoryInput('mileage',record.mileage);
 setHistoryInput('euroClass',record.euro_class);setHistoryInput('powertrain',record.powertrain);
 if(record.first_registration){const [year,month,day]=record.first_registration.split('-');setHistoryInput('firstRegYear',year);setHistoryInput('firstRegMonth',String(Number(month)));setHistoryInput('firstRegDay',String(Number(day)));syncFirstRegistrationDate();}
 setHistoryInput('importDate',record.import_date);
 setRegistrationTaxMiniResult(null);historyEl('results').innerHTML='<p>Τα στοιχεία επαναφέρθηκαν. Πάτησε «Υπολόγισε» για νέο υπολογισμό (χρησιμοποιεί token).</p>';
 updateCarSummary();historyEl('calcForm')?.scrollIntoView({behavior:'smooth',block:'start'});
}
historyEl('openHistoryBtn')?.addEventListener('click',openHistory);
historyEl('historyClose')?.addEventListener('click',closeHistory);
historyEl('historyOverlay')?.addEventListener('click',event=>{if(event.target===historyEl('historyOverlay'))closeHistory();});
historyEl('historyMore')?.addEventListener('click',()=>void loadHistory());
document.addEventListener('keydown',event=>{if(event.key==='Escape' && !historyEl('historyOverlay')?.hidden)closeHistory();});
