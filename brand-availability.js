/* =========================================================
   Cartelonio — live brand + year data availability
   ---------------------------------------------------------
   Reads the existing DATA_SOURCES structure and checks the
   actual JSON files on the live site.

   Brand rule:
   - selectable if at least one valid year JSON exists

   Year rule:
   - selectable only if that specific year has a valid JSON
   - unavailable years remain visible, greyed out and disabled
   ========================================================= */

(() => {
  "use strict";

  const CHECK_CONCURRENCY = 8;

  const STATUS = {
    CHECKING: "checking",
    AVAILABLE: "available",
    UNAVAILABLE: "unavailable"
  };

  // brand -> { year -> boolean }
  const liveAvailability = new Map();

  function getBrandNames() {
    if (typeof DATA_SOURCES !== "undefined" && DATA_SOURCES) {
      return Object.keys(DATA_SOURCES);
    }

    if (typeof BRANDS !== "undefined" && Array.isArray(BRANDS)) {
      return BRANDS.slice();
    }

    return [];
  }

  function getBrandYearEntries(brand) {
    if (
      typeof DATA_SOURCES === "undefined" ||
      !DATA_SOURCES ||
      !DATA_SOURCES[brand]
    ) {
      return [];
    }

    return Object.entries(DATA_SOURCES[brand])
      .map(([year, url]) => ({ year: String(year), url }))
      .sort((a, b) => Number(b.year) - Number(a.year));
  }

  function datasetHasModels(data) {
    return !!(
      data &&
      typeof data === "object" &&
      data.models &&
      typeof data.models === "object" &&
      Object.keys(data.models).length > 0
    );
  }

  async function fetchJsonIfPresent(url) {
    try {
      // Use GET directly. Besides working on static hosts that do not
      // support HEAD, this also verifies that the file contains valid JSON.
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) return false;

      const data = await response.json();
      return datasetHasModels(data);
    } catch (_) {
      return false;
    }
  }

  async function runWithConcurrency(items, worker, concurrency) {
    let nextIndex = 0;

    async function runner() {
      while (true) {
        const index = nextIndex++;
        if (index >= items.length) return;
        await worker(items[index]);
      }
    }

    const runners = Array.from(
      { length: Math.min(concurrency, Math.max(items.length, 1)) },
      () => runner()
    );

    await Promise.all(runners);
  }

  function getBrandUiParts(brand) {
    const select = document.getElementById("brandSelect");
    const menu = document.getElementById("brandMenu");

    const option = select
      ? Array.from(select.options).find(opt => opt.value === brand)
      : null;

    const item = menu
      ? Array.from(menu.querySelectorAll(".brand-option"))
          .find(btn => btn.dataset.value === brand)
      : null;

    return { option, item };
  }

  function ensureSoonBadge(item) {
    if (!item) return null;

    let badge = item.querySelector(".brand-availability-badge");

    if (!badge) {
      badge = document.createElement("span");
      badge.className = "brand-availability-badge";
      badge.textContent = "Σύντομα";
      item.appendChild(badge);
    }

    return badge;
  }

  function setBrandState(brand, state) {
    const { option, item } = getBrandUiParts(brand);

    if (option) {
      option.disabled = state !== STATUS.AVAILABLE;
      option.dataset.availability = state;
    }

    if (!item) return;

    item.classList.remove(
      "brand-option-checking",
      "brand-option-available",
      "brand-option-unavailable"
    );

    item.dataset.availability = state;

    if (state === STATUS.CHECKING) {
      item.classList.add("brand-option-checking");
      item.disabled = true;
      item.setAttribute("aria-disabled", "true");
      item.title = "Έλεγχος διαθεσιμότητας δεδομένων";

      const badge = item.querySelector(".brand-availability-badge");
      if (badge) badge.remove();

      return;
    }

    if (state === STATUS.AVAILABLE) {
      item.classList.add("brand-option-available");
      item.disabled = false;
      item.removeAttribute("aria-disabled");
      item.title = "Υπάρχουν διαθέσιμα δεδομένα";

      const badge = item.querySelector(".brand-availability-badge");
      if (badge) badge.remove();

      return;
    }

    item.classList.add("brand-option-unavailable");
    item.disabled = true;
    item.setAttribute("aria-disabled", "true");
    item.title = "Δεν υπάρχουν ακόμη διαθέσιμα δεδομένα";
    ensureSoonBadge(item);
  }

  function getSelectedBrand() {
    return document.getElementById("brandSelect")?.value || "";
  }

  function normalizeYearPlaceholder() {
    const yearSelect = document.getElementById("yearSelect");
    if (!yearSelect) return;

    const placeholder = Array.from(yearSelect.options)
      .find(opt => opt.value === "");

    if (placeholder) {
      placeholder.textContent = "Επιλέξτε Έτος";
    }
  }

  function stripAvailabilitySuffix(text) {
    return String(text || "")
      .replace(/\s*[—-]\s*Σύντομα\s*$/i, "")
      .trim();
  }

  function applyYearAvailability(brand) {
    const yearSelect = document.getElementById("yearSelect");
    if (!yearSelect) return;

    normalizeYearPlaceholder();

    const map = liveAvailability.get(brand);

    Array.from(yearSelect.options).forEach(option => {
      if (!option.value) return;

      const year = String(option.value);
      const baseText = stripAvailabilitySuffix(option.textContent || year);
      option.dataset.baseLabel = baseText;

      // If the brand has not finished checking yet, keep the visible years
      // temporarily disabled until their live status is known.
      if (!map) {
        option.disabled = true;
        option.dataset.availability = STATUS.CHECKING;
        option.textContent = baseText;
        return;
      }

      const available = map.get(year) === true;

      option.disabled = !available;
      option.dataset.availability = available
        ? STATUS.AVAILABLE
        : STATUS.UNAVAILABLE;

      option.textContent = available
        ? baseText
        : `${baseText} — Σύντομα`;
    });

    // If the currently selected year became unavailable, reset it.
    const selectedOption = yearSelect.options[yearSelect.selectedIndex];
    if (
      selectedOption &&
      selectedOption.value &&
      selectedOption.disabled
    ) {
      yearSelect.value = "";
      yearSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }

  async function checkBrand(brand) {
    const entries = getBrandYearEntries(brand);
    const yearMap = new Map();

    liveAvailability.set(brand, yearMap);

    await runWithConcurrency(
      entries,
      async ({ year, url }) => {
        const available = await fetchJsonIfPresent(url);
        yearMap.set(String(year), available);

        // Update the year dropdown live if this is the brand currently open.
        if (getSelectedBrand() === brand) {
          applyYearAvailability(brand);
        }
      },
      CHECK_CONCURRENCY
    );

    const hasAnyData = Array.from(yearMap.values()).some(Boolean);

    setBrandState(
      brand,
      hasAnyData ? STATUS.AVAILABLE : STATUS.UNAVAILABLE
    );

    if (getSelectedBrand() === brand) {
      applyYearAvailability(brand);
    }
  }

  async function initializeAvailability() {
    const brands = getBrandNames();
    if (!brands.length) return;

    normalizeYearPlaceholder();

    brands.forEach(brand => setBrandState(brand, STATUS.CHECKING));

    await runWithConcurrency(
      brands,
      checkBrand,
      CHECK_CONCURRENCY
    );
  }

  function attachBrandYearSync() {
    const brandSelect = document.getElementById("brandSelect");
    const yearSelect = document.getElementById("yearSelect");

    if (brandSelect) {
      brandSelect.addEventListener("change", () => {
        // Let the main Cartelonio handler first rebuild yearSelect.
        setTimeout(() => {
          normalizeYearPlaceholder();
          applyYearAvailability(getSelectedBrand());
        }, 0);
      });
    }

    // If script.js rebuilds the year options without a brand change,
    // re-apply live availability automatically.
    if (yearSelect && typeof MutationObserver !== "undefined") {
      const observer = new MutationObserver(() => {
        applyYearAvailability(getSelectedBrand());
      });

      observer.observe(yearSelect, {
        childList: true,
        subtree: false
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    attachBrandYearSync();
    initializeAvailability();
  });
})();
