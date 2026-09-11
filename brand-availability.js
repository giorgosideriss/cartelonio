/* =========================================================
   Cartelonio — live brand data availability
   ---------------------------------------------------------
   Reads the existing DATA_SOURCES structure and checks the
   actual JSON files on the live site.

   A brand becomes selectable only when at least one valid
   year JSON exists and contains model data.
   ========================================================= */

(() => {
  "use strict";

  const CHECK_CONCURRENCY = 6;
  const STATUS = {
    CHECKING: "checking",
    AVAILABLE: "available",
    UNAVAILABLE: "unavailable"
  };

  function getBrandNames() {
    if (typeof DATA_SOURCES !== "undefined" && DATA_SOURCES) {
      return Object.keys(DATA_SOURCES);
    }
    if (typeof BRANDS !== "undefined" && Array.isArray(BRANDS)) {
      return BRANDS.slice();
    }
    return [];
  }

  function getBrandUrls(brand) {
    if (typeof DATA_SOURCES === "undefined" || !DATA_SOURCES?.[brand]) {
      return [];
    }

    return Object.entries(DATA_SOURCES[brand])
      .sort((a, b) => Number(b[0]) - Number(a[0]))
      .map(([year, url]) => ({ year, url }));
  }

  async function fetchJsonIfPresent(url) {
    try {
      // HEAD keeps missing-file checks lightweight on normal static hosting.
      const head = await fetch(url, {
        method: "HEAD",
        cache: "no-store"
      });

      if (head.ok) {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;

        const data = await response.json();
        const hasModels =
          data &&
          typeof data === "object" &&
          data.models &&
          typeof data.models === "object" &&
          Object.keys(data.models).length > 0;

        return hasModels ? data : null;
      }

      // Some hosts do not allow HEAD. In that case try GET.
      if (head.status === 405 || head.status === 501) {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) return null;

        const data = await response.json();
        const hasModels =
          data &&
          typeof data === "object" &&
          data.models &&
          typeof data.models === "object" &&
          Object.keys(data.models).length > 0;

        return hasModels ? data : null;
      }
    } catch (_) {
      return null;
    }

    return null;
  }

  async function brandHasLiveData(brand) {
    const candidates = getBrandUrls(brand);

    for (const { year, url } of candidates) {
      const data = await fetchJsonIfPresent(url);
      if (data) {
        return { available: true, year };
      }
    }

    return { available: false, year: null };
  }

  function getUiParts(brand) {
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

  function setBrandState(brand, state, availableYear = null) {
    const { option, item } = getUiParts(brand);

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
      item.title = availableYear
        ? `Διαθέσιμα δεδομένα (τουλάχιστον για ${availableYear})`
        : "Διαθέσιμα δεδομένα";
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

  function normalizeYearPlaceholder() {
    const yearSelect = document.getElementById("yearSelect");
    if (!yearSelect) return;

    const placeholder = Array.from(yearSelect.options)
      .find(opt => opt.value === "");

    if (placeholder) {
      placeholder.textContent = "Επιλέξτε Έτος";
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
      { length: Math.min(concurrency, items.length) },
      () => runner()
    );

    await Promise.all(runners);
  }

  async function initializeBrandAvailability() {
    const brands = getBrandNames();
    if (!brands.length) return;

    normalizeYearPlaceholder();

    // Until a live JSON is confirmed, the brand cannot be selected.
    brands.forEach(brand => setBrandState(brand, STATUS.CHECKING));

    await runWithConcurrency(
      brands,
      async brand => {
        const result = await brandHasLiveData(brand);
        setBrandState(
          brand,
          result.available ? STATUS.AVAILABLE : STATUS.UNAVAILABLE,
          result.year
        );
      },
      CHECK_CONCURRENCY
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Registered after script.js, so the normal Cartelonio brand menu
    // is already populated when this handler runs.
    initializeBrandAvailability();

    const brandSelect = document.getElementById("brandSelect");
    if (brandSelect) {
      brandSelect.addEventListener("change", normalizeYearPlaceholder);
    }
  });
})();
