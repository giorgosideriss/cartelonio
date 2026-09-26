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

// Sanitized catalogue API. Prices never enter the browser.
let DATA_SOURCES = {};
const CARTELONIO_API_BASE = "https://szgsqorrcktrcfmfmqaa.supabase.co/functions/v1";
const catalogReady = fetch(`${CARTELONIO_API_BASE}/catalog`, {cache:"no-store"}).then(r=>{if(!r.ok)throw Error("catalog_unavailable");return r.json()}).then(m=>{DATA_SOURCES=Object.fromEntries(Object.entries(m.brands||{}).map(([slug,x])=>[x.name,Object.fromEntries(x.years.map(y=>[String(y),{slug,year:String(y)}]))]))});

/* Λογότυπα μαρκών */
const BRAND_LOGOS = {
  "Abarth": "https://logos-world.net/wp-content/uploads/2021/08/Abarth-Logo-2007-present.png",
  "Alfa Romeo": "https://logos-world.net/wp-content/uploads/2021/09/Alfa-Romeo-Logo-500x281.png",
  "Alpina": "https://logos-world.net/wp-content/uploads/2021/03/Alpina-Logo.png",
  "Alpine": "https://logos-world.net/wp-content/uploads/2021/08/Alpine-Logo-700x394.png",
  "Aston Martin": "https://logos-world.net/wp-content/uploads/2022/08/Aston-Martin-New-Logo-500x281.png",
  "Audi": "https://cdn.simpleicons.org/audi/B8BCB9",
  "BMW": "https://logos-world.net/wp-content/uploads/2020/04/BMW-Logo-1997-2020.png",
  "BYD": "https://logos-world.net/wp-content/uploads/2021/09/BYD-Logo.png",
  "Bentley": "https://1000logos.net/wp-content/uploads/2025/09/Emblem-Bentley.png",
  "Chery": "https://logos-world.net/wp-content/uploads/2021/09/Chery-Logo-500x281.png",
  "Chrysler": "https://logos-world.net/wp-content/uploads/2021/09/Chrysler-Logo-500x281.png",
  "Citroen": "https://logos-world.net/wp-content/uploads/2021/03/Citroen-Logo.png",
  "Cupra": "https://brandlogos.net/wp-content/uploads/2022/10/Cupra-logo.png",
  "DS": "https://logos-world.net/wp-content/uploads/2021/08/DS-Automobiles-Logo-700x394.png",
  "Dacia": "https://logos-world.net/wp-content/uploads/2021/06/Dacia-Logo.png",
  "Ferrari": "https://logos-world.net/wp-content/uploads/2020/07/Ferrari-Scuderia-Logo-700x394.png",
  "Fiat": "https://listcarbrands.com/wp-content/uploads/2016/02/Fiat-Logo-2003.png",
  "Ford": "https://logos-world.net/wp-content/uploads/2021/03/Ford-Logo-1965-present.png",
  "Geely": "https://logos-world.net/wp-content/uploads/2021/08/Geely-Logo.png",
  "Genesis": "https://logos-world.net/wp-content/uploads/2020/05/Genesis-Logo.png",
  "Honda": "https://logos-world.net/wp-content/uploads/2021/03/Honda-Logo-700x394.png",
  "Hyundai": "https://logos-world.net/wp-content/uploads/2021/03/Hyundai-Logo-700x394.png",
  "INEOS": "https://brandlogos.net/wp-content/uploads/2022/04/ineos-logo-brandlogos.net_.png",
  "Infiniti": "https://logos-world.net/wp-content/uploads/2021/11/Infiniti-Logo-500x281.png",
  "Jaecoo": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Jaecoo_wordmark.svg",
  "Jaguar": "https://crystalpng.com/wp-content/uploads/2025/07/Jaguar-Logo.png",
  "Jeep": "https://logos-world.net/wp-content/uploads/2021/09/Jeep-Logo-700x394.png",
  "Kia": "https://logos-world.net/wp-content/uploads/2021/03/Kia-Logo.png",
  "Lamborghini": "https://api.freelogodesign.org/assets/blog/img/lamborghini-logo-1998%20(1).png",
  "Land Rover": "https://logos-world.net/wp-content/uploads/2021/10/Land-Rover-Logo-500x281.png",
  "Lexus": "https://1000logos.net/wp-content/uploads/2020/02/Lexus-Logo-1989.png",
  "Lotus": "https://logos-world.net/wp-content/uploads/2021/09/Lotus-Logo-700x394.png",
  "MG": "https://logos-world.net/wp-content/uploads/2021/09/MG-Logo-700x394.png",
  "MINI": "https://cdn.simpleicons.org/mini/B8BCB9",
  "Maserati": "https://logos-world.net/wp-content/uploads/2021/04/Maserati-Logo-2006-2020.png",
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
  "Tesla": "https://logos-world.net/wp-content/uploads/2020/10/Tesla-Logo.png",
  "Toyota": "https://1000logos.net/wp-content/uploads/2018/02/Toyota-logo.png",
  "Volkswagen": "https://logos-world.net/wp-content/uploads/2021/04/Volkswagen-Logo-1978-1989.png",
  "Volvo": "https://logos-world.net/wp-content/uploads/2021/04/Volvo-Logo-1999-2013.png",
};
/* Welcome statistics: decorative brand logos; independent of calculation logic. */
(function initOnboardingBrandAmbient(){
  const ambient = document.getElementById('onboardingBrandAmbient');
  if (!ambient || typeof BRAND_LOGOS === 'undefined') return;
  const names = ['Abarth','Alfa Romeo','Audi','Bentley','BMW','Citroen','Dacia','Fiat','Ford','Honda','Hyundai','Jaguar','Jeep','Kia','Land Rover','Mercedes','MINI','Porsche','Toyota'];
  names.forEach((name,index) => {
    const source = BRAND_LOGOS[name];
    if (!source) return;
    const logo = document.createElement('img');
    logo.src = source;
    logo.alt = '';
    logo.loading = 'lazy';
    logo.decoding = 'async';
    logo.style.setProperty('--brand-delay', `${-((index * 1.37) % 10).toFixed(2)}s`);
    ambient.appendChild(logo);
  });
})();



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

// Fit long manufacturer names inside the existing identity rail without changing its layout.
function fitVehicleBrandName() {
  const name = document.getElementById("vehicleImageBrand");
  const rail = document.getElementById("vehicleImageIdentity");
  if (!name || !rail || !name.textContent.trim()) return;
  const mobile = window.matchMedia("(max-width: 820px)").matches && !rail.classList.contains("no-image");
  // Mobile identity is a horizontal flex row: reserve room for its other items.
  let available = name.clientWidth;
  if (mobile) {
    const style = getComputedStyle(rail);
    const gap = parseFloat(style.columnGap) || 0;
    const padding = (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
    const others = Array.from(rail.children).filter(el => el !== name);
    available = rail.clientWidth - padding - gap * Math.max(0, rail.children.length - 1)
      - others.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
  }
  if (available <= 0) return;
  const baseSize = rail.classList.contains("no-image") ? (mobile ? 34 : 54) : (mobile ? 20 : 36);
  const minSize = mobile ? 10 : 12;
  name.style.setProperty("font-size", `${baseSize}px`, "important");
  const computed = getComputedStyle(name);
  const canvas = fitVehicleBrandName.canvas || (fitVehicleBrandName.canvas = document.createElement("canvas"));
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const fontFamily = computed.fontFamily;
  const weight = computed.fontWeight;
  const spacing = parseFloat(computed.letterSpacing) || 0;
  const characters = Array.from(name.textContent);
  let size = baseSize;
  while (size > minSize) {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    const width = ctx.measureText(name.textContent).width + spacing * (characters.length - 1) * size / baseSize;
    if (width <= available - 2) break;
    size -= 0.5;
  }
  name.style.setProperty("font-size", `${size}px`, "important");
}
window.addEventListener("resize", () => requestAnimationFrame(fitVehicleBrandName));

function updateVehicleImageIdentity(hasImage = null) {
  const overlay = document.getElementById("vehicleImageIdentity");
  if (!overlay) return;

  const { brand, year, model, editionName } = getSelectedVehicleIdentity();
  const complete = Boolean(brand && year && editionName);

  document.getElementById("vehicleImageBrand").textContent = brand;
  const brandLogo = document.getElementById("vehicleImageBrandLogo");
  if (brandLogo) {
    const logoUrl = BRAND_LOGOS[brand] || "";
    brandLogo.src = cartelonioPublicAssetUrl(logoUrl);
    brandLogo.alt = brand ? `${brand} logo` : "";
    brandLogo.style.display = logoUrl ? "block" : "none";
    brandLogo.onerror = () => { brandLogo.style.display = "none"; };
  }
  const modelEl = document.getElementById("vehicleImageModel");
  if (modelEl) modelEl.textContent = model;
  document.getElementById("vehicleImageYear").textContent = year;
  document.getElementById("vehicleImageEdition").textContent = editionName;

  overlay.classList.toggle("is-visible", complete);
  if (hasImage !== null) overlay.classList.toggle("no-image", !hasImage);
  requestAnimationFrame(fitVehicleBrandName);
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

// Avoid duplicating the large public image tree in the staging repository.
// Production keeps using its normal relative asset paths.
function cartelonioPublicAssetUrl(value) {
  const path = String(value || "").trim();
  if (!path || /^(?:https?:)?\/\//i.test(path) || /^(?:data:|blob:)/i.test(path)) return path;
  const isGithubStaging = window.location.hostname === "giorgosideriss.github.io" &&
    window.location.pathname.startsWith("/cartelonio-staging/");
  if (!isGithubStaging) return path;
  const normalized = path.replace(/^\.\//, "").replace(/^\//, "");
  return normalized.startsWith("images/")
    ? `https://raw.githubusercontent.com/giorgosideriss/cartelonio/main/${normalized}`
    : path;
}

const cartelonioSiteLogo = document.querySelector(".site-logo");
if (cartelonioSiteLogo) cartelonioSiteLogo.src = cartelonioPublicAssetUrl(cartelonioSiteLogo.getAttribute("src"));

// Bring the completed result into view without obscuring it behind the sticky header.
let cartelonioResultHighlightTimer = null;
let cartelonioRevealSequence = 0;
function revealCalculatedVehicleResult() {
  const image = document.getElementById("carImage");
  const imagePanel = image?.closest(".vehicle-image-panel") || image?.parentElement;
  const valueCards = document.querySelector(".vehicle-configurator-v2 .vehicle-value-cards");
  const taxCard = document.getElementById("registrationTaxMiniCard");
  const taxValue = document.getElementById("registrationTaxMiniValue");
  if (!imagePanel || !taxCard || !taxValue) return;

  // A new calculation supersedes any unfinished reveal from the previous one.
  const sequence = ++cartelonioRevealSequence;
  clearTimeout(cartelonioResultHighlightTimer);
  taxCard.classList.remove("tax-result-highlight");
  taxValue.classList.remove("tax-amount-highlight");

  const startHighlight = () => {
    if (sequence !== cartelonioRevealSequence) return;
    taxCard.classList.remove("tax-result-highlight");
    taxValue.classList.remove("tax-amount-highlight");
    void taxValue.offsetWidth; // Restart even on consecutive calculations.
    taxValue.classList.add("tax-amount-highlight");
    cartelonioResultHighlightTimer = setTimeout(() => {
      if (sequence === cartelonioRevealSequence) taxValue.classList.remove("tax-amount-highlight");
    }, 2700);
  };

  // Measure after the new result is rendered; animate only once the scroll has settled.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (sequence !== cartelonioRevealSequence) return;
    const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height || 0;
    const top = imagePanel.getBoundingClientRect().top + window.scrollY;
    const bottom = (valueCards || taxCard).getBoundingClientRect().bottom + window.scrollY;
    const availableHeight = Math.max(1, window.innerHeight - headerHeight - 20);
    const groupHeight = bottom - top;
    const target = Math.max(0, top - headerHeight - 10 - Math.max(0, (availableHeight - groupHeight) / 2));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || Math.abs(window.scrollY - target) < 3) {
      window.scrollTo({ top: target, behavior: "instant" });
      startHighlight();
      return;
    }
    let settleTimer;
    let safetyTimer;
    const finish = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", finish);
      clearTimeout(settleTimer);
      clearTimeout(safetyTimer);
      startHighlight();
    };
    const onScroll = () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(finish, 180);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", finish, { once: true });
    // Fallback for browsers without scrollend or interrupted smooth scrolling.
    safetyTimer = setTimeout(finish, 1500);
    window.scrollTo({ top: target, behavior: "smooth" });
  }));
}

function updateVehicleSummaryCo2() {
  const out = document.getElementById("vehicleSummaryCo2");
  const input = document.getElementById("co2");
  if (!out || !input) return;
  const raw = String(input.value || "").trim();
  const value = Number(raw.replace(",", "."));
  out.textContent = raw && Number.isFinite(value) ? `${value.toLocaleString("el-GR")} g/km` : "—";
}

function setRegistrationTaxMiniResult(value) {
  updateVehicleSummaryCo2();
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
    carImage.src = cartelonioPublicAssetUrl(resolvedImage);
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

/* Tax coefficients and calculation logic are server-side only. */
const categories={"Επιλέξτε Κατηγορία Αμαξώματος":null,"SUV":true,"Hatchback":true,"Sedan":true,"Cabrio":true,"Coupe/Roadster":true,"MPV":true};
/* ========== EXTRAS HELPERS ========== */

function getExtrasTotal() {
  return 0; // prices are deliberately unavailable to the browser
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
    labelSpan.textContent = `${count} επιλεγμένα extras`;
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
  const priceInput=document.getElementById("price");priceInput.value="";priceInput.placeholder="Επαληθεύεται στον server";priceInput.readOnly=true;
  // Refresh the extras counter immediately after every selection or deselection.
  const extrasLabel = document.querySelector(".extras-toggle-label");
  if (extrasLabel) {
    const count = selectedExtras.size;
    extrasLabel.textContent = count === 0
      ? "Χωρίς επιπλέον extras"
      : `${count} επιλεγμένα extras`;
  }
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
    const row = document.createElement("label");
    row.className = "extras-option";

    const cb = document.createElement("input");
    cb.type  = "checkbox";
    cb.value = String(idx);
    cb.addEventListener("change", handleExtraCheckboxChange);

    const text = document.createElement("span");
    text.className = "extras-option-text";
    text.textContent = extra.name;

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

  const source = DATA_SOURCES[brand] && DATA_SOURCES[brand][year];
  if (!source) {
    console.warn("Δεν βρέθηκαν δεδομένα για", brand, year);
    return;
  }

  try {
    const res = await fetch(`${CARTELONIO_API_BASE}/catalog?brand=${encodeURIComponent(source.slug)}&year=${encodeURIComponent(source.year)}`,{cache:"no-store"});
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

sortAlpha(BRANDS).forEach(brand => {
    const available = Boolean(DATA_SOURCES[brand] && Object.keys(DATA_SOURCES[brand]).length);
    // option στο select (state)
    const opt = document.createElement("option");
    opt.value = brand;
    opt.textContent = brand;
    opt.disabled = !available;
    selectEl.appendChild(opt);

    // custom επιλογή στο menu
    if (menuEl) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "brand-option";
      item.dataset.value = brand;
      item.disabled = !available;
      item.classList.toggle("brand-option-unavailable", !available);

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

      if (!available) {
        const badge = document.createElement("span");
        badge.className = "brand-availability-badge";
        badge.textContent = "Σύντομα";
        item.appendChild(badge);
      }

      if (available) item.addEventListener("click", () => {
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
    opt.textContent = ed.missingFields?.length ? `${ed.name} — απαιτεί συμπλήρωση στοιχείων` : ed.name;
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

  currentBasePrice = 0;

  if (Array.isArray(edition.extras)) {
    loadExtras(edition.extras);
  } else {
    loadExtras([]);
  }

  recalcPriceWithExtras();

  document.getElementById("co2").value = edition.co2 != null ? edition.co2 : "";

  // Auto-fill tax metadata when it is available in the selected edition.
  // The controls remain editable so the user can override them from the vehicle CoC.
  const euroEl = document.getElementById("euroClass");
  euroEl.value = "";
  if (edition.euro) {
    if (euroEl && [...euroEl.options].some(o => o.value === edition.euro)) euroEl.value = edition.euro;
  }
  const powertrainEl = document.getElementById("powertrain");
  if (powertrainEl) {
    // The existing form/backend uses "hybrid" for hybrid vehicles, including PHEVs.
    // Normalize catalogue aliases without adding an unsupported API value.
    const rawPowertrain = String(edition.powertrain ?? "").trim();
    const normalizedPowertrain = /^(?:phev|plug[ -]?in(?:[ -]?hybrid)?|plugin[ -]?hybrid|plug[ -]?in[ -]?υβριδικό)$/i.test(rawPowertrain)
      ? "hybrid"
      : rawPowertrain;
    powertrainEl.value = [...powertrainEl.options].some(o => o.value === normalizedPowertrain)
      ? normalizedPowertrain : "";
  }

  const autoBodyType = edition.bodyType || modelObj.category;
  document.getElementById("category").value = autoBodyType && categories[autoBodyType] ? autoBodyType : "Επιλέξτε Κατηγορία Αμαξώματος";

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

function clearCalculationWarnings() {
  document.querySelectorAll(".required-field-wrap.has-warning,.category-field-wrap.has-warning")
    .forEach(element => element.classList.remove("has-warning"));
  document.querySelectorAll(".calculation-field-invalid")
    .forEach(element => element.classList.remove("calculation-field-invalid"));
  document.getElementById("resultCard")?.classList.remove("has-calculation-error");
}

function markCalculationWarning(field) {
  const wrapper = document.querySelector(`[data-field="${field}"]`);
  if (wrapper) wrapper.classList.add("has-warning");
  const direct = document.getElementById(field);
  if (direct && !wrapper) direct.classList.add("calculation-field-invalid");
}

function showCalculationError(message, fields = []) {
  clearCalculationWarnings();
  fields.forEach(markCalculationWarning);
  document.getElementById("resultCard")?.classList.add("has-calculation-error");
  document.getElementById("results").innerHTML = `
    <div class="calculation-error-message" role="alert">
      <span class="calculation-error-icon" aria-hidden="true">!</span>
      <div><strong>Ο υπολογισμός δεν μπορεί να πραγματοποιηθεί.</strong><p>${message}</p></div>
    </div>`;
}

function calculationErrorDetails(code) {
  const errors = {
    insufficient_tokens: ["Δεν υπάρχουν διαθέσιμα tokens για νέο υπολογισμό.", []],
    invalid_co2: ["Δεν υπάρχουν πιστοποιημένα στοιχεία εκπομπών CO₂ για τη συγκεκριμένη έκδοση.", ["co2"]],
    invalid_euro_class: ["Δεν υπάρχει πιστοποιημένη κατηγορία Euro για τη συγκεκριμένη έκδοση.", ["euroClass"]],
    invalid_powertrain: ["Δεν υπάρχει πιστοποιημένος τύπος κίνησης για τη συγκεκριμένη έκδοση.", ["powertrain"]],
    invalid_category: ["Δεν έχει προσδιοριστεί η κατηγορία αμαξώματος του οχήματος.", ["category"]],
    invalid_catalog_selection: ["Η επιλεγμένη έκδοση οχήματος δεν βρέθηκε στα επαληθευμένα δεδομένα.", []],
    invalid_extra: ["Κάποιο επιλεγμένο extra δεν υπάρχει πλέον στα επαληθευμένα δεδομένα.", []],
  };
  return errors[code] || ["Παρουσιάστηκε τεχνικό πρόβλημα. Δεν αφαιρέθηκε token. Δοκίμασε ξανά.", []];
}

document.addEventListener("input", event => {
  const wrapper = event.target.closest?.(".required-field-wrap,.category-field-wrap");
  wrapper?.classList.remove("has-warning");
  event.target.classList?.remove("calculation-field-invalid");
});
document.addEventListener("change", event => {
  const wrapper = event.target.closest?.(".required-field-wrap,.category-field-wrap");
  wrapper?.classList.remove("has-warning");
  event.target.classList?.remove("calculation-field-invalid");
});

async function calculate(){
 clearCalculationWarnings();
 const firstRegistration=document.getElementById("firstReg").value,importDate=document.getElementById("importDate").value,mileageRaw=document.getElementById("mileage").value.trim(),selection=historySelection();
 const missing=[];
 if(!selection.brand||!selection.year||!selection.model||selection.edition_index===""||selection.variant_index==="") missing.push("vehicle");
 if(!firstRegistration) missing.push("firstReg");
 if(!importDate||importDate<firstRegistration) missing.push("importDate");
 if(mileageRaw===""||!Number.isFinite(Number(mileageRaw))||Number(mileageRaw)<0) missing.push("mileage");
 if(document.getElementById("co2").value==="") missing.push("co2");
 if(!document.getElementById("euroClass").value) missing.push("euroClass");
 if(!document.getElementById("powertrain").value) missing.push("powertrain");
 if(!categories[document.getElementById("category").value]) missing.push("category");
 if(missing.length){
   setRegistrationTaxMiniResult(null);
   const technical=missing.filter(field=>["co2","euroClass","powertrain","category"].includes(field));
   const message=technical.length
     ? "Η επιλεγμένη έκδοση δεν διαθέτει όλα τα απαραίτητα πιστοποιημένα στοιχεία (CO₂, κατηγορία Euro, τύπος κίνησης ή αμάξωμα). Δοκίμασε άλλη έκδοση."
     : "Έλεγξε την επιλογή οχήματος, τις ημερομηνίες και τα διανυθέντα χιλιόμετρα.";
   showCalculationError(message,missing.filter(field=>field!=="vehicle"));
   return;
 }
 await cartelonioAuthReady;if(!cartelonioSession?.access_token)return;const source=DATA_SOURCES[selection.brand]?.[selection.year],requestId=crypto.randomUUID(),button=document.getElementById("calcBtn");button.disabled=true;
 try{const response=await fetch(`${CARTELONIO_API_BASE}/calculate`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${cartelonioSession.access_token}`,"Idempotency-Key":requestId},body:JSON.stringify({vehicle:{brandSlug:source.slug,year:selection.year,model:selection.model,editionId:selection.edition_index,variantId:selection.variant_index,extraIds:selection.extras_indices},firstRegistration,importDate,mileage:Number(mileageRaw),technicalInputs:{co2:Number(document.getElementById("co2").value),euroClass:document.getElementById("euroClass").value,powertrain:document.getElementById("powertrain").value,category:document.getElementById("category").value}})});const payload=await response.json();if(!response.ok)throw Error(payload.error||"calculation_failed");const r=payload.result,v=payload.vehicle;if(!cartelonioProfile)cartelonioProfile={};cartelonioProfile.token_balance=Number(payload.remainingTokens);renderAccountState();document.getElementById("price").value=formatGreekNumber(v.ltpf,0,2);document.getElementById("category").value=v.body_type;document.getElementById("co2").value=v.co2;document.getElementById("euroClass").value=v.euro_class;document.getElementById("powertrain").value=v.powertrain;setRegistrationTaxMiniResult(r.totalTax);revealCalculatedVehicleResult();const pct=x=>`${(x*100).toFixed(1).replace(".0","")}%`,eur=x=>Number(x).toLocaleString("el-GR",{minimumFractionDigits:2,maximumFractionDigits:2});document.getElementById("results").innerHTML=`<p><strong>Ηλικία κατά την εισαγωγή:</strong> ${r.exactMonths} πλήρεις μήνες (${r.exactYears.toFixed(2)} έτη)</p><p><strong>Απομείωση ηλικίας / αμαξώματος:</strong> ${pct(r.yearDep)}</p><p><strong>Συνολική απομείωση:</strong> ${pct(r.totalDep)}</p><p><strong>Επαληθευμένη ΛΤΠΦ:</strong> €${eur(v.ltpf)}</p><p><strong>Φορολογητέα αξία:</strong> €${eur(r.finalPrice)}</p><p><strong>Τέλος ταξινόμησης:</strong> €${eur(r.registrationTax)}</p>${r.environmentalFee?`<p><strong>Περιβαλλοντικό τέλος:</strong> €${eur(r.environmentalFee)}</p>`:""}<p><small>${Object.values(v.input_provenance||{}).includes("user_provided")?"Τα ελλιπή τεχνικά στοιχεία δηλώθηκαν από τον χρήστη. Η ΛΤΠΦ και τα extras επαληθεύτηκαν από τον server.":"Όλα τα στοιχεία επαληθεύτηκαν από τον κατάλογο."}</small></p><h3>ΣΥΝΟΛΟ Τ.Τ. + ΠΕΡΙΒΑΛΛΟΝΤΙΚΟ ΤΕΛΟΣ: €${eur(r.totalTax)}</h3>`;}catch(error){const [message,fields]=calculationErrorDetails(error.message);showCalculationError(message,fields);await loadCartelonioProfile().catch(()=>{});}finally{button.disabled=false;}
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
  ["Audi","2015"],["Audi","2016"],["Audi","2017"],["Audi","2018"],["Audi","2019"],["Audi","2020"],["Audi","2021"],["Audi","2022"],["Audi","2023"],["Audi","2024"],["Audi","2025"],
  ["Bentley","2017"],["Bentley","2020"],["Bentley","2022"],
  ["Ford","2015"],["Ford","2016"],["Ford","2017"],["Ford","2018"],["Ford","2019"],["Ford","2020"],["Ford","2021"],["Ford","2022"],["Ford","2023"],
  ["Fiat","2017"],["Fiat","2018"],["Fiat","2019"],["Fiat","2020"],["Fiat","2021"],["Fiat","2022"],
  ["Mercedes-Benz","2015"],["Mercedes-Benz","2016"],["Mercedes-Benz","2017"],["Mercedes-Benz","2018"],["Mercedes-Benz","2019"],["Mercedes-Benz","2020"],["Mercedes-Benz","2021"],["Mercedes-Benz","2022"],["Mercedes-Benz","2023"],["Mercedes-Benz","2024"],["Mercedes-Benz","2025"],
  ["MINI","2015"],["MINI","2016"],["MINI","2017"],["MINI","2018"],["MINI","2019"],["MINI","2020"],["MINI","2021"],["MINI","2022"],["MINI","2023"],["MINI","2024"],["MINI","2025"],
  ["Toyota","2020"],["Toyota","2021"],
  ["Jeep","2015"],["Jeep","2016"],["Jeep","2017"],["Jeep","2018"],["Jeep","2019"],["Jeep","2020"],["Jeep","2021"],["Jeep","2022"],["Jeep","2023"],
  ["Jaguar","2015"],["Jaguar","2016"],["Jaguar","2017"],["Jaguar","2018"],["Jaguar","2019"],["Jaguar","2020"],["Jaguar","2021"],["Jaguar","2022"],
  ["Land Rover","2015"],["Land Rover","2016"],["Land Rover","2017"],["Land Rover","2018"],["Land Rover","2019"],["Land Rover","2020"],["Land Rover","2021"],["Land Rover","2022"],["Land Rover","2023"],["Land Rover","2024"],["Land Rover","2025"],
  ["Citroen","2015"],["Citroen","2016"],["Citroen","2017"],["Citroen","2018"],["Citroen","2019"],["Citroen","2020"],["Citroen","2021"],["Citroen","2022"],["Citroen","2023"],["Citroen","2024"],["Citroen","2025"],
  ["Honda","2015"],["Honda","2016"],["Honda","2017"],["Honda","2018"],["Honda","2019"],["Honda","2020"],["Honda","2021"],["Honda","2022"],["Honda","2023"],["Honda","2024"],["Honda","2025"],
  ["Hyundai","2015"],["Hyundai","2016"],["Hyundai","2017"],["Hyundai","2018"],["Hyundai","2019"],["Hyundai","2020"],["Hyundai","2021"],["Hyundai","2022"],
  ["Dacia","2017"],["Dacia","2018"],["Dacia","2019"],["Dacia","2020"],["Dacia","2021"],["Dacia","2022"]
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
      const source=DATA_SOURCES[brand]?.[year];
      if(!source) continue;
      try{
        const res=await fetch(`${CARTELONIO_API_BASE}/catalog?brand=${encodeURIComponent(source.slug)}&year=${encodeURIComponent(source.year)}`);
        if(!res.ok) continue;
        const data=await res.json();
        const models=Object.entries(data?.models||{}).filter(([,obj])=>Array.isArray(obj?.editions) && obj.editions.some(ed=>Array.isArray(ed?.variants) && ed.variants.length));
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
      .filter(x=>Array.isArray(x.ed?.variants) && x.ed.variants.length);
    const chosenEdition=randomItem(eligibleEditions);
    document.getElementById("versionSelect").value=String(chosenEdition.index);
    populateColors();

    const validVariants=chosenEdition.ed.variants.map((v,index)=>({v,index}));
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
    const firstReg=new Date(document.getElementById("firstReg").value+"T12:00:00");
    const today=new Date(importEl.value+"T12:00:00");
    let months=(today.getFullYear()-firstReg.getFullYear())*12+today.getMonth()-firstReg.getMonth();
    if(today.getDate()<firstReg.getDate())months--;
    months=Math.max(1,months);
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

document.addEventListener("DOMContentLoaded", async () => {
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
  try{await catalogReady}catch(e){console.error(e)}
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



/* Pick an existing car image from the public Cartelonio images/cars tree.
   The GitHub tree is used because static hosting cannot list folder contents. */
let aboutCarImagePathsPromise;
function getAboutCarImagePaths(){
  if (!aboutCarImagePathsPromise) {
    aboutCarImagePathsPromise = fetch('https://api.github.com/repos/giorgosideriss/cartelonio/git/trees/main?recursive=1', {cache:'force-cache'})
      .then(r => { if (!r.ok) throw new Error('image_list_unavailable'); return r.json(); })
      .then(data => {
        if (data.truncated || !Array.isArray(data.tree)) throw new Error('image_list_incomplete');
        return data.tree.filter(item => item.type === 'blob' && /^images\/cars\/.+\.(png|webp|jpe?g)$/i.test(item.path))
          .map(item => item.path);
      }).catch(() => []);
  }
  return aboutCarImagePathsPromise;
}
async function showRandomAboutCar(){
  const image = document.getElementById('aboutRandomCar');
  if (!image) return;
  const paths = await getAboutCarImagePaths();
  if (!paths.length) return; // Do not show a broken or invented car image.
  const candidates = paths.slice();
  const tryNext = () => {
    if (!candidates.length) { image.hidden = true; return; }
    const index = Math.floor(Math.random() * candidates.length);
    const path = candidates.splice(index, 1)[0];
    image.onload = () => { image.hidden = false; };
    image.onerror = tryNext;
    image.src = cartelonioPublicAssetUrl(path);
  };
  tryNext();
}

/* =========================================================
   CARTELONIO — Three-view onboarding controller
   ========================================================= */
(function initCartelonioOnboarding(){
  const modal = document.getElementById("cartelonioOnboarding");
  if(!modal) return;

  // Password-recovery links must never compete with the introductory modal.
  // The recovery form is the only dialog that should be visible on this URL.
  const authUrl = new URL(window.location.href);
  const authHash = new URLSearchParams(authUrl.hash.replace(/^#/, ""));
  const isPasswordRecovery =
    authUrl.searchParams.get("account") === "recovery" ||
    authUrl.searchParams.get("type") === "recovery" ||
    authUrl.searchParams.has("token_hash") ||
    authHash.get("type") === "recovery";
  if (isPasswordRecovery) {
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("is-open");
    document.body.classList.remove("cartelonio-onboarding-open");
    return;
  }

  const views = [...modal.querySelectorAll("[data-onboarding-view]")];

  function showView(name){
    const current = modal.querySelector(".onboarding-view.is-active");
    const next = modal.querySelector(`[data-onboarding-view="${name}"]`);
    if(!next || current === next) return;
    if(name === "about") void showRandomAboutCar();

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
      // Show the gift only after an explicit start, never while onboarding is open.
      window.dispatchEvent(new Event("cartelonio:onboarding-finished"));
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
const CARTELONIO_SUPABASE_URL = "https://szgsqorrcktrcfmfmqaa.supabase.co";
const CARTELONIO_SUPABASE_KEY = "sb_publishable_lUXWzIqEGRJmaxWhCeVvqg_xq9zWcby";
// Capture recovery markers before createClient processes and cleans the URL.
const cartelonioInitialAuthUrl = new URL(window.location.href);
const cartelonioInitialAuthHash = new URLSearchParams(cartelonioInitialAuthUrl.hash.replace(/^#/, ""));
const cartelonioInitialRecoveryTokenHash = cartelonioInitialAuthUrl.searchParams.get("token_hash");
const cartelonioInitialRecoveryReturn =
  cartelonioInitialAuthUrl.searchParams.get("account") === "recovery" ||
  cartelonioInitialAuthUrl.searchParams.get("type") === "recovery" ||
  cartelonioInitialAuthHash.get("type") === "recovery";
const cartelonioDb = window.supabase?.createClient(
  CARTELONIO_SUPABASE_URL,
  CARTELONIO_SUPABASE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);

let cartelonioSession = null;
let cartelonioProfile = null;
let cartelonioSignupBusy = false;
let cartelonioRecoveryReturn = cartelonioInitialRecoveryReturn;
const CARTELONIO_SIGNUP_PENDING_KEY = "cartelonio_signup_pending_email";
function showSignupPending(email) {
  const panel = authElement("signupPendingPanel");
  const form = authElement("signupForm");
  if (form) { form.hidden = true; form.classList.remove("is-active"); }
  if (panel) {
    panel.hidden = false;
    authElement("signupPendingEmail").textContent = email;
  }
  if (authElement("authTabs")) authElement("authTabs").hidden = true;
  setAuthStatus("");
}
function clearSignupPending() {
  localStorage.removeItem(CARTELONIO_SIGNUP_PENDING_KEY);
  if (authElement("signupPendingPanel")) authElement("signupPendingPanel").hidden = true;
  if (authElement("signupForm")) authElement("signupForm").hidden = false;
}

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
  const pendingEmail = localStorage.getItem(CARTELONIO_SIGNUP_PENDING_KEY);
  const pendingView = view === "signup" && Boolean(pendingEmail) && !signedIn;
  if (authElement("signupPendingPanel")) authElement("signupPendingPanel").hidden = !pendingView;
  if (pendingView && authElement("signupPendingEmail")) authElement("signupPendingEmail").textContent = pendingEmail;
  if (authElement("signupForm")) authElement("signupForm").hidden = pendingView;
  document.querySelectorAll("[data-auth-view]").forEach(button => {
    button.classList.toggle("is-active", button.dataset.authView === view);
  });
  // Never expose guest tabs/forms to an authenticated user.
  document.querySelectorAll("[data-auth-panel]").forEach(panel => {
    panel.classList.toggle("is-active", (panel.dataset.authPanel === view && !signedIn && !pendingView) || (panel.dataset.authPanel === "password" && view === "password"));
  });
  if (tabs) tabs.hidden = signedIn || pendingView || view === "password" || view === "user";
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
  const permanentUser = Boolean(cartelonioSession?.user && !cartelonioSession.user.is_anonymous);
  showAuthView(view || (permanentUser ? "user" : "signup"));
  positionAccountDropdown();
  closeTokensMenu();
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
  if (badgeText) badgeText.textContent = `Tokens (${balance.toLocaleString("el-GR")})`;
  if (authElement("tokensAvailable")) authElement("tokensAvailable").textContent = balance.toLocaleString("el-GR");
  badge?.classList.toggle("is-empty", balance < 1);
  if (authElement("accountButtonText")) {
    authElement("accountButtonText").textContent = isPermanent ? "Ο λογαριασμός μου" : "Εγγραφή / Σύνδεση";
  }
  if (authElement("authUserEmail")) authElement("authUserEmail").textContent = user?.email || "";
  if (authElement("accountProfileEmail")) authElement("accountProfileEmail").textContent = user?.email || "";
  if (authElement("authTokenBalance")) authElement("authTokenBalance").textContent = String(balance);
  // Reflect the real Supabase session immediately when it changes.
  const modal = authElement("authModal");
  if (modal && !modal.hidden && !cartelonioRecoveryReturn && !authElement("setPasswordForm")?.classList.contains("is-active")) {
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
  // Supabase may still be exchanging the recovery URL when this function
  // starts. Never replace that pending recovery session with an anonymous one.
  if ((!session || session.user?.is_anonymous) && cartelonioRecoveryReturn) {
    for (let attempt = 0; attempt < 30 && (!session || session.user?.is_anonymous); attempt += 1) {
      await new Promise(resolve => window.setTimeout(resolve, 100));
      const recoverySession = await cartelonioDb.auth.getSession();
      if (recoverySession.error) throw recoverySession.error;
      session = recoverySession.data.session;
    }
    if (!session || session.user?.is_anonymous) throw new Error("recovery_session_missing");
  }
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

async function initializeCartelonioAuth() {
  try {
    const recoverySubmit = authElement("setPasswordForm")?.querySelector('button[type="submit"]');
    if (cartelonioRecoveryReturn) {
      openAuthModal("password");
      if (recoverySubmit) recoverySubmit.disabled = true;
      setAuthStatus("Επαληθεύουμε τον σύνδεσμο επαναφοράς…", "success");
    }
    if (cartelonioInitialRecoveryTokenHash &&
        cartelonioInitialAuthUrl.searchParams.get("type") === "recovery") {
      const recoveryVerification = await cartelonioDb.auth.verifyOtp({
        token_hash: cartelonioInitialRecoveryTokenHash,
        type: "recovery",
      });
      if (recoveryVerification.error || !recoveryVerification.data.session) {
        throw recoveryVerification.error || new Error("recovery_session_missing");
      }
      cartelonioSession = recoveryVerification.data.session;
      window.history.replaceState({}, document.title, "/?account=recovery");
    }
    cartelonioDb.auth.onAuthStateChange((event, session) => {
      cartelonioSession = session;
      if (session?.user && !session.user.is_anonymous && session.user.email_confirmed_at) clearSignupPending();
      window.setTimeout(async () => {
        if (session) await loadCartelonioProfile();
        if ((event === "PASSWORD_RECOVERY") || cartelonioRecoveryReturn ||
            (session?.user && !session.user.is_anonymous && localStorage.getItem("cartelonio_pending_password_setup") === "1")) {
          if (session?.user && !session.user.is_anonymous) {
            openAuthModal("password");
            if (recoverySubmit) recoverySubmit.disabled = false;
            setAuthStatus(
              event === "PASSWORD_RECOVERY" || cartelonioRecoveryReturn
                ? "Όρισε τώρα τον νέο κωδικό του λογαριασμού σου."
                : "Το email επιβεβαιώθηκε. Όρισε τώρα τον κωδικό του λογαριασμού σου.",
              "success"
            );
          }
        }
      }, 0);
    });

    await ensureCartelonioSession();
    if (cartelonioRecoveryReturn && cartelonioSession?.user && !cartelonioSession.user.is_anonymous) {
      openAuthModal("password");
      if (recoverySubmit) recoverySubmit.disabled = false;
      setAuthStatus("Όρισε τώρα τον νέο κωδικό του λογαριασμού σου.", "success");
    }
  } catch (error) {
    console.error("Cartelonio auth initialization failed:", error);
    setAuthStatus("Η υπηρεσία λογαριασμού δεν είναι προσωρινά διαθέσιμη.", "error");
    const recoverySubmit = authElement("setPasswordForm")?.querySelector('button[type="submit"]');
    if (recoverySubmit) recoverySubmit.disabled = true;
  } finally {
    resolveAuthReady();
  }
}

async function loadUsedTokens() {
  const used = authElement("tokensUsed");
  if (!used) return;
  used.textContent = "—";
  if (!cartelonioDb || !cartelonioSession?.user) return;
  const userId = cartelonioSession.user.id;
  const { data, error } = await cartelonioDb.rpc("get_used_tokens");
  if (cartelonioSession?.user?.id !== userId) return;
  if (error) {
    console.warn("Unable to load token usage:", error);
    authElement("tokensUsedNote").textContent = "Δεν ήταν δυνατή η φόρτωση χρήσης. Δοκίμασε ξανά.";
    return;
  }
  used.textContent = Number(data || 0).toLocaleString("el-GR");
  authElement("tokensUsedNote").textContent = "Χρεώσεις υπολογισμών από το ιστορικό tokens.";
}

async function redeemCartelonioVoucher() {
  const button = authElement("tokensRedeem");
  const input = authElement("tokensVoucherCode");
  const notice = authElement("tokensVoucherNotice");
  if (!button || !input || !notice) return;
  if (!cartelonioSession?.user || cartelonioSession.user.is_anonymous) {
    notice.textContent = "Συνδέσου σε λογαριασμό για να εξαργυρώσεις κωδικό.";
    return;
  }
  const code = input.value.trim().toUpperCase();
  if (!/^[A-Z0-9_-]{3,64}$/.test(code)) {
    notice.textContent = "Πληκτρολόγησε έναν έγκυρο κωδικό.";
    return;
  }
  button.disabled = true;
  notice.textContent = "Γίνεται εξαργύρωση…";
  try {
    const { data, error } = await cartelonioDb.rpc("redeem_voucher", { p_code: code });
    if (error) throw error;
    const result = Array.isArray(data) ? data[0] : data;
    input.value = "";
    notice.textContent = `Προστέθηκαν ${Number(result.awarded_tokens).toLocaleString("el-GR")} tokens!`;
    await loadCartelonioProfile();
    await loadUsedTokens();
  } catch (error) {
    const msg = String(error?.message || "");
    const messages = {
      invalid_voucher: "Ο κωδικός δεν είναι έγκυρος ή έχει λήξει.",
      voucher_already_redeemed: "Έχεις ήδη εξαργυρώσει αυτόν τον κωδικό.",
      voucher_exhausted: "Ο κωδικός έχει εξαντληθεί.",
      discount_checkout_not_available: "Ο εκπτωτικός κωδικός θα είναι διαθέσιμος όταν ενεργοποιηθούν οι αγορές.",
      verified_account_required: "Απαιτείται επιβεβαιωμένος λογαριασμός."
    };
    notice.textContent = Object.entries(messages).find(([key]) => msg.includes(key))?.[1] || "Η εξαργύρωση απέτυχε. Δοκίμασε ξανά.";
    console.warn("Voucher redemption failed:", error);
  } finally { button.disabled = false; }
}
authElement("tokensVoucherToggle")?.addEventListener("click", () => {
  const toggle = authElement("tokensVoucherToggle");
  const form = authElement("tokensVoucherForm");
  if (!toggle || !form) return;
  form.hidden = !form.hidden;
  toggle.setAttribute("aria-expanded", String(!form.hidden));
  if (!form.hidden) authElement("tokensVoucherCode")?.focus();
});
authElement("tokensRedeem")?.addEventListener("click", redeemCartelonioVoucher);
authElement("tokensVoucherCode")?.addEventListener("keydown", event => {
  if (event.key === "Enter") { event.preventDefault(); redeemCartelonioVoucher(); }
});

function closeTokensMenu() {
  const menu = authElement("tokensMenu");
  if (menu) menu.hidden = true;
  authElement("tokenBadge")?.setAttribute("aria-expanded", "false");
}
function openTokensMenu() {
  closeAuthModal();
  const menu = authElement("tokensMenu");
  if (!menu) return;
  menu.hidden = false;
  authElement("tokenBadge")?.setAttribute("aria-expanded", "true");
  loadUsedTokens();
}
authElement("tokenBadge")?.addEventListener("click", () => {
  if (authElement("tokensMenu")?.hidden) openTokensMenu();
  else closeTokensMenu();
});
authElement("tokensClose")?.addEventListener("click", closeTokensMenu);
authElement("accountButton")?.addEventListener("click", () => {
  if (!authElement("authModal")?.hidden) closeAuthModal();
  else openAuthModal();
});
document.addEventListener("pointerdown", event => {
  const controls = authElement("accountControls");
  if (controls && !controls.contains(event.target)) { closeAuthModal(); closeTokensMenu(); }
});
authElement("authClose")?.addEventListener("click", closeAuthModal);
authElement("authModal")?.addEventListener("click", event => {
  if (event.target === authElement("authModal")) closeAuthModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") { if (!authElement("authModal")?.hidden) closeAuthModal(); closeTokensMenu(); }
});

document.querySelectorAll("[data-auth-view]").forEach(button => {
  button.addEventListener("click", () => {
    setAuthStatus();
    showAuthView(button.dataset.authView);
  });
});

authElement("signupForm")?.addEventListener("submit", async event => {
  event.preventDefault();
  if (cartelonioSignupBusy || localStorage.getItem(CARTELONIO_SIGNUP_PENDING_KEY)) return;
  const email = authElement("signupEmail").value.trim();
  const password = authElement("signupPassword").value;
  const confirmation = authElement("signupPasswordConfirm").value;
  const submit = authElement("signupForm").querySelector('button[type="submit"]');
  if (password.length < 8) {
    setAuthStatus("Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.", "error");
    return;
  }
  if (password !== confirmation) {
    setAuthStatus("Οι δύο κωδικοί δεν ταιριάζουν.", "error");
    return;
  }
  cartelonioSignupBusy = true;
  const originalLabel = submit?.textContent;
  try {
    if (submit) { submit.disabled = true; submit.textContent = "Γίνεται εγγραφή…"; }
    setAuthStatus("Γίνεται εγγραφή και αποστολή email…");
    await cartelonioAuthReady;
    if (!cartelonioSession?.user?.is_anonymous) {
      throw new Error("Έχεις ήδη λογαριασμό. Συνδέσου ή χρησιμοποίησε την επαναφορά κωδικού.");
    }
    // Preserve the anonymous user's ID and tokens. Never retry the password
    // update after a successful response: Supabase may treat it as a password change.
    const { error } = await cartelonioDb.auth.updateUser(
      { email, password },
      { emailRedirectTo: `${location.origin}/?account=verified` }
    );
    if (error) throw error;
    localStorage.setItem(CARTELONIO_SIGNUP_PENDING_KEY, email);
    localStorage.removeItem("cartelonio_pending_password_setup");
    authElement("signupPassword").value = "";
    authElement("signupPasswordConfirm").value = "";
    showSignupPending(email);
  } catch (error) {
    console.error("Cartelonio signup failed:", error);
    setAuthStatus(error.message || "Η εγγραφή δεν ολοκληρώθηκε. Δοκίμασε ξανά.", "error");
  } finally {
    cartelonioSignupBusy = false;
    if (submit) { submit.disabled = false; submit.textContent = originalLabel; }
  }
});

authElement("signupPendingLogin")?.addEventListener("click", () => {
  clearSignupPending();
  showAuthView("login");
  setAuthStatus("Αφού επιβεβαιώσεις το email σου, συνδέσου με τον κωδικό σου.");
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
    const { data: { session: activeSession } } = await cartelonioDb.auth.getSession();
    if (!activeSession?.user || activeSession.user.is_anonymous) {
      throw new Error("Ο σύνδεσμος επαναφοράς δεν είναι πλέον έγκυρος. Ζήτησε νέο email επαναφοράς.");
    }
    const { error } = await cartelonioDb.auth.updateUser({ password });
    if (error) throw error;
    cartelonioRecoveryReturn = false;
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
let historyRecords = [];
let historyVisible = HISTORY_PAGE_SIZE;
let historyFilter = 'all';
let historySearchTerm = '';
let historySortMode = 'newest';
const historyNormalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase('el-GR');
function historyFilteredRecords(){
 const items = historyRecords.filter(r => (historyFilter !== 'favorites' || r.is_favorite) && (!historySearchTerm || historyNormalize([r.brand,r.model,r.edition,r.year,r.variant_name,r.body_type,r.powertrain].join(' ')).includes(historySearchTerm)));
 const modes={newest:(a,b)=>Date.parse(b.created_at)-Date.parse(a.created_at),oldest:(a,b)=>Date.parse(a.created_at)-Date.parse(b.created_at),year_desc:(a,b)=>Number(b.year||0)-Number(a.year||0),year_asc:(a,b)=>Number(a.year||0)-Number(b.year||0),tax_desc:(a,b)=>Number(b.total_tax||0)-Number(a.total_tax||0),tax_asc:(a,b)=>Number(a.total_tax||0)-Number(b.total_tax||0)};
 return items.sort(modes[historySortMode]||modes.newest);
}
function historyRenderList(){
 const list=historyEl('historyList');if(!list)return;
 const items=historyFilteredRecords();list.replaceChildren();
 items.slice(0,historyVisible).forEach(record=>{const card=renderHistoryRecord(record);list.append(card);const img=card.querySelector('.history-car-image');if(img)void historyImage(record,img);});
 historyEl('historyMore').hidden=items.length<=historyVisible;
 historyEl('historyAllCount').textContent=`(${historyRecords.length})`;
 historyEl('historyFavoriteCount').textContent=`(${historyRecords.filter(r=>r.is_favorite).length})`;
 historyStatus(items.length?'':historyRecords.length?'Δεν βρέθηκαν υπολογισμοί για τα επιλεγμένα φίλτρα.':'Δεν υπάρχουν ακόμη αποθηκευμένοι υπολογισμοί.');
}

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
// Store the exact selected image URL/path, not a reconstructed brand/model guess.
// Only store images which have actually loaded in the configurator.
function historyCurrentImagePath(){
 // Resolve the image from the exact currently selected edition/model. This
 // does not depend on whether the browser has finished downloading the PNG.
 const selection=historySelection();
 const model=currentDataset?.models?.[selection.model];
 const edition=selection.edition_index !== '' ? model?.editions?.[Number(selection.edition_index)] : null;
 const raw=edition?.image || model?.image;
 if(raw && selection.brand){
  const value=String(raw).trim();
  if(value && !/^(?:data:|blob:|javascript:)/i.test(value)){
   return /^(https?:)?\/\//i.test(value)||value.startsWith('/')||value.startsWith('./')||value.startsWith('../')||value.includes('/')
    ? value : `images/cars/${slugifyBrand(selection.brand)}/${value}`;
  }
 }
 // Fallback for images supplied by the external search, but never capture
 // an old car's image while a new selection is still loading.
 const img=historyEl('carImage');
 if(!img || !img.complete || !img.naturalWidth || img.classList.contains('image-unavailable') || img.classList.contains('is-changing')) return null;
 const src=img.getAttribute('src')?.trim();
 return src && !/^(?:data:|blob:|javascript:)/i.test(src) ? src : null;
}
// Calculation history is written atomically by the secure backend.
// Always resolve saved image paths against the site root, not the current
// page URL (which may change with routes, refreshes or browser navigation).
function historyImageUrl(path){
 if(typeof path !== 'string' || !path.trim()) return null;
 const value=cartelonioPublicAssetUrl(path.trim().replace(/\\/g,'/'));
 if(/^(?:data:|blob:|javascript:)/i.test(value)) return null;
 try {
  const url=/^https?:\/\//i.test(value) ? new URL(value) :
   new URL(value.replace(/^(?:\.\/)+/, '').replace(/^\/+/, ''), window.location.origin + '/');
  return ['http:','https:'].includes(url.protocol) ? url.href : null;
 }catch{return null;}
}
function historySetImage(img,path,onFailure){
 const url=historyImageUrl(path);
 if(!url){if(onFailure)onFailure();return;}
 const fallback=img.nextElementSibling;
 img.loading='eager';
 img.decoding='async';
 img.onload=()=>{
  if(img.naturalWidth>0){img.classList.add('is-loaded');if(fallback)fallback.hidden=true;}
 };
 img.onerror=()=>{
  img.classList.remove('is-loaded');img.removeAttribute('src');
  if(fallback)fallback.hidden=false;
  console.warn('History image failed:',url);
  if(onFailure)onFailure();
 };
 img.src=url;
 if(img.complete && img.naturalWidth>0)img.onload();
}
async function historyCatalogImage(record,img){
 // Recover legacy/broken image paths from the exact catalogue edition.
 const source=DATA_SOURCES[record.brand]?.[String(record.year)];
 if(!source || !record.model)return;
 const catalogUrl=`${CARTELONIO_API_BASE}/catalog?brand=${encodeURIComponent(source.slug)}&year=${encodeURIComponent(source.year)}`;
 try{
  if(!historyImageCache.has(catalogUrl)){
   const response=await fetch(catalogUrl,{cache:'no-store'});
   if(!response.ok)throw new Error('catalogue unavailable');
   historyImageCache.set(catalogUrl,await response.json());
  }
  const models=historyImageCache.get(catalogUrl)?.models;
  const model=models?.[record.model] || Object.entries(models||{}).find(([name])=>historyNormalize(name)===historyNormalize(record.model))?.[1];
  if(!model)return;
  const editions=model.editions||[];
  const index=record.edition_index === null || record.edition_index === undefined || record.edition_index === '' ? NaN : Number(record.edition_index);
  const edition=editions.find(ed=>ed.name===record.edition) || (Number.isInteger(index)?editions[index]:null);
  const raw=edition?.image || model.image;
  if(!raw)return;
  const value=String(raw).trim();
  const path=/^(https?:)?\/\//i.test(value)||value.startsWith('/')||value.startsWith('./')||value.startsWith('../')||value.includes('/')?value:`images/cars/${slugifyBrand(record.brand)}/${value}`;
  historySetImage(img,path);
 }catch(err){console.warn('History image unavailable:',err);}
}
async function historyImage(record,img){
 if(record.image_path){
  // A saved path may be stale or point to a missing file; do not stop there.
  historySetImage(img,record.image_path,()=>{void historyCatalogImage(record,img);});
  return;
 }
 await historyCatalogImage(record,img);
}
function renderHistoryRecord(record){
 const article=historyNode('article','history-entry');
 const head=historyNode('div','history-entry-head');
 const visual=historyNode('div','history-visual');
 const img=historyNode('img','history-car-image');img.alt='';img.loading='eager';
 visual.append(img,historyNode('span','history-car-fallback',(record.brand||'')+' '+(record.model||'')));
 const main=historyNode('div','history-entry-main');
 const titleRow=historyNode('div','history-title-row');
 const logoPath=BRAND_LOGOS[record.brand];
 if(logoPath){const logo=historyNode('img','history-brand-logo');logo.src=cartelonioPublicAssetUrl(logoPath);logo.alt='';logo.loading='lazy';logo.onerror=()=>logo.remove();titleRow.append(logo);}
 titleRow.append(historyNode('strong','history-car-name',[record.brand,record.model].filter(Boolean).join(' ') || 'Χειροκίνητη εισαγωγή'));
 main.append(titleRow,
  historyNode('span','history-car-version',[record.year,record.edition].filter(Boolean).join(' · ')),
  historyNode('span','history-entry-date',new Date(record.created_at).toLocaleString('el-GR',{dateStyle:'medium',timeStyle:'short'})));
 const money=historyNode('div','history-entry-money');
 money.append(historyNode('small','', 'Τέλος ταξινόμησης'),historyNode('strong','', '€'+historyEuro(record.total_tax)),
  historyNode('small','history-ltpf','ΛΤΠΦ €'+historyEuro(record.ltpf)));
 head.append(visual,main,money);article.append(head);
 const favorite=historyNode('button','history-favorite',record.is_favorite?'★':'☆');favorite.type='button';favorite.title=record.is_favorite?'Αφαίρεση από αγαπημένα':'Προσθήκη στα αγαπημένα';favorite.setAttribute('aria-label',favorite.title);favorite.setAttribute('aria-pressed',String(Boolean(record.is_favorite)));
 favorite.addEventListener('click',async()=>{if(favorite.disabled)return;favorite.disabled=true;const next=!Boolean(record.is_favorite);try{const {data,error}=await cartelonioDb.from('calculation_history').update({is_favorite:next}).eq('id',record.id).eq('user_id',cartelonioSession.user.id).select('id,is_favorite').maybeSingle();if(error)throw error;if(!data)throw new Error('Η ενημέρωση δεν αποθηκεύτηκε. Έλεγξε τα δικαιώματα RLS.');record.is_favorite=data.is_favorite;historyRenderList();}catch(error){console.warn('Favorite update failed',error);historyStatus('Δεν αποθηκεύτηκε το αγαπημένο. Έλεγξε ότι εκτέλεσες το νέο SQL.');favorite.disabled=false;}});
 main.append(favorite);
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
 const actions=historyNode('div','history-entry-actions');actions.append(restore,remove);
 expanded.append(fields,actions);article.append(expanded);
 const chevron=historyNode('span','history-entry-chevron','›');chevron.setAttribute('aria-hidden','true');head.append(chevron);
 head.classList.add('history-entry-trigger');head.setAttribute('role','button');head.tabIndex=0;
 head.setAttribute('aria-expanded','false');head.setAttribute('aria-label','Λεπτομέρειες υπολογισμού: '+[record.brand,record.model].filter(Boolean).join(' '));
 const toggleDetails=()=>{expanded.hidden=!expanded.hidden;head.setAttribute('aria-expanded',String(!expanded.hidden));article.classList.toggle('is-expanded',!expanded.hidden);};
 head.addEventListener('click',event=>{if(event.target.closest('button'))return;toggleDetails();});
 head.addEventListener('keydown',event=>{if(event.target!==head)return;if(event.key==='Enter'||event.key===' '){event.preventDefault();toggleDetails();}});
 restore.addEventListener('click',async()=>{restore.disabled=true;try{await restoreHistoryRecord(record);closeHistory();}catch(err){historyStatus('Δεν ήταν δυνατή η επαναφορά των στοιχείων.');console.warn(err);}finally{restore.disabled=false;}});
 remove.addEventListener('click',async()=>{if(!confirm('Να διαγραφεί οριστικά αυτός ο υπολογισμός;'))return;remove.disabled=true;
  const {error}=await cartelonioDb.from('calculation_history').delete().eq('id',record.id).eq('user_id',cartelonioSession.user.id);
  if(error){historyStatus('Η διαγραφή απέτυχε.');remove.disabled=false;}else{historyRecords=historyRecords.filter(item=>item.id!==record.id);historyRenderList();}});
 return article;
}
async function loadHistory(reset=false){
 if(historyBusy || !historySignedIn())return;
 historyBusy=true;const more=historyEl('historyMore');more.disabled=true;
 if(reset){historyVisible=HISTORY_PAGE_SIZE;historyRecords=[];historyEl('historyList').replaceChildren();}
 historyStatus('Φόρτωση ιστορικού…');
 try{
  // Fetch every page so searching, sorting and favorites apply to the entire history.
  const batchSize=500;let offset=0;const rows=[];
  while(true){
   const {data,error}=await cartelonioDb.from('calculation_history').select('*').eq('user_id',cartelonioSession.user.id).order('created_at',{ascending:false}).range(offset,offset+batchSize-1);
   if(error)throw error;
   rows.push(...data);offset+=data.length;
   if(data.length<batchSize)break;
  }
  historyRecords=rows;historyRenderList();
 }catch(error){console.warn('History loading failed:',error);historyStatus('Δεν ήταν δυνατή η φόρτωση του ιστορικού.');}
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
historyEl('historyMore')?.addEventListener('click',()=>{historyVisible+=HISTORY_PAGE_SIZE;historyRenderList();});
document.querySelectorAll('[data-history-filter]').forEach(button=>button.addEventListener('click',()=>{historyFilter=button.dataset.historyFilter;historyVisible=HISTORY_PAGE_SIZE;document.querySelectorAll('[data-history-filter]').forEach(b=>{b.classList.toggle('is-active',b===button);b.setAttribute('aria-pressed',String(b===button));});historyRenderList();}));
historyEl('historySort')?.addEventListener('change',event=>{historySortMode=event.target.value;historyVisible=HISTORY_PAGE_SIZE;historyRenderList();});
// Finder-inspired compact controls: preserve existing search/sort logic.
function historyToggleTool(name){const panel=historyEl(name+'Panel'),button=historyEl(name+'Toggle');if(!panel||!button)return;const opening=panel.hidden;['historySort','historySearch'].forEach(id=>{const p=historyEl(id+'Panel'),b=historyEl(id+'Toggle');if(p)p.hidden=true;if(b)b.setAttribute('aria-expanded','false');});panel.hidden=!opening;button.setAttribute('aria-expanded',String(opening));if(opening&&name==='historySearch')historyEl('historySearch')?.focus();}
['historySort','historySearch'].forEach(name=>historyEl(name+'Toggle')?.addEventListener('click',()=>historyToggleTool(name)));
document.addEventListener('click',event=>{if(!event.target.closest('.history-tools'))['historySort','historySearch'].forEach(name=>{const p=historyEl(name+'Panel'),b=historyEl(name+'Toggle');if(p)p.hidden=true;if(b)b.setAttribute('aria-expanded','false');});});

historyEl('historySearch')?.addEventListener('input',event=>{historySearchTerm=historyNormalize(event.target.value.trim());historyVisible=HISTORY_PAGE_SIZE;historyRenderList();});
document.addEventListener('keydown',event=>{if(event.key==='Escape' && !historyEl('historyOverlay')?.hidden)closeHistory();});

/* WELCOME10 — one display per browser profile, after onboarding. */
(function initWelcome10(){
  const modal = document.getElementById('welcome10Overlay');
  if (!modal) return;
  const key = 'cartelonio:welcome10:shown:v1';
  let shown = false;
  let pending = null;
  function previouslyShown(){ try { return localStorage.getItem(key) === '1'; } catch (_) { return shown; } }
  function markShown(){ shown = true; try { localStorage.setItem(key, '1'); } catch (_) {} }
  function close(){
    if (pending !== null) { clearTimeout(pending); pending = null; }
    modal.hidden = true;
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('welcome10-open');
  }
  window.addEventListener('cartelonio:onboarding-finished', () => {
    if (shown || previouslyShown() || pending !== null) return;
    pending = setTimeout(() => {
      pending = null;
      if (shown || previouslyShown()) return;
      if (document.getElementById('cartelonioOnboarding')?.classList.contains('is-open')) return;
      markShown();
      modal.hidden = false;
      modal.setAttribute('aria-hidden','false');
      document.body.classList.add('welcome10-open');
      document.getElementById('welcome10Close')?.focus();
    }, 1000);
  });
  document.getElementById('welcome10Close')?.addEventListener('click',close);
  document.getElementById('welcome10Later')?.addEventListener('click',close);
  modal.addEventListener('click',e => { if(e.target === modal) close(); });
  document.addEventListener('keydown',e => { if(e.key === 'Escape' && !modal.hidden) close(); });
  document.getElementById('welcome10Copy')?.addEventListener('click',async e => {
    try { await navigator.clipboard.writeText('WELCOME10'); e.currentTarget.textContent='Αντιγράφηκε ✓'; }
    catch (_) { e.currentTarget.textContent='WELCOME10'; }
  });
  document.getElementById('welcome10Signup')?.addEventListener('click',() => {
    close();
    if(typeof openAuthModal === 'function') openAuthModal('signup');
    else document.getElementById('accountButton')?.click();
  });
})();

/* Finder account: profile is local, help reserved for a future release. */
document.getElementById('accountProfileBtn')?.addEventListener('click', () => {
  const panel = document.getElementById('accountProfilePanel');
  if (!panel) return;
  panel.hidden = !panel.hidden;
  document.getElementById('accountProfileBtn')?.setAttribute('aria-expanded', String(!panel.hidden));
});
document.getElementById('accountHelpBtn')?.addEventListener('click', () => {
  const status = document.getElementById('authStatus');
  if (status) status.textContent = 'Η βοήθεια θα είναι διαθέσιμη σύντομα.';
});


/* =========================================================
   Vehicle input modes — manual entry UI
   ========================================================= */
(function initVehicleInputModes(){
  function setup(){
    const stage = document.querySelector('.vehicle-configurator-v2');
    const modeButtons = Array.from(document.querySelectorAll('.vehicle-input-mode'));
    if (!stage || !modeButtons.length) return;

    function setMode(mode){
      if (mode !== 'catalog' && mode !== 'manual') return;
      stage.classList.toggle('manual-input-mode', mode === 'manual');
      stage.dataset.inputMode = mode;
      modeButtons.forEach(button => {
        const active = button.dataset.inputMode === mode;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      if (mode === 'manual') {
        document.querySelector('.brand-menu')?.classList.remove('open');
        document.querySelector('.extras-dropdown')?.classList.remove('open');
      }
    }

    modeButtons.forEach(button => {
      button.addEventListener('click', () => {
        const mode = button.dataset.inputMode;
        if (mode === 'catalog' || mode === 'manual') setMode(mode);
      });
    });

    setMode('catalog');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();


// Keep the compact catalog summary in sync with the CO2 field.
document.addEventListener("input", (event) => { if (event.target?.id === "co2") updateVehicleSummaryCo2(); });
document.addEventListener("change", (event) => { if (event.target?.id === "co2") updateVehicleSummaryCo2(); });
window.addEventListener("DOMContentLoaded", updateVehicleSummaryCo2);
