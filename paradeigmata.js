'use strict';

const valueBrackets = [[14000, 4], [17000, 26], [20000, 53], [25000, 62], [30000, 71], [Infinity, 30]];
const wltpBrackets = [[130, -5], [156, 0], [182, 10], [208, 20], [234, 30], [260, 40], [325, 60], [Infinity, 100]];

function registrationDuty(model, edition, extrasPrice, mileage) {
  const price = edition.price + extrasPrice;
  const mileageReduction = Math.min(.10, Math.max(0, mileage - model.km) / 500 * .001);
  const remaining = Math.max(.05, (1 - model.depreciation) * (1 - mileageReduction));
  const [, co2Adjustment] = wltpBrackets.find(([limit]) => edition.co2 <= limit);
  let baseDuty = 0;
  let lower = 0;
  for (const [upper, rate] of valueBrackets) {
    const end = Math.min(upper * 100, price);
    baseDuty += (end - lower) * rate / 100;
    if (end === price) break;
    lower = end;
  }
  const hybridFactor = edition.hybrid ? .5 : 1;
  return {
    cents: Math.round(baseDuty * remaining * (1 + co2Adjustment / 100) * hybridFactor),
    taxable: Math.round(price * remaining),
    co2Adjustment,
    mileageReduction,
  };
}

const byId = id => document.getElementById(id);
const display = (id, value) => { byId(id).textContent = value; };
const formatter = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' });
const signedFormatter = new Intl.NumberFormat('el-GR', {
  style: 'currency', currency: 'EUR', signDisplay: 'exceptZero',
});
const percentage = new Intl.NumberFormat('el-GR', { style: 'percent', maximumFractionDigits: 2 });
const integer = new Intl.NumberFormat('el-GR');
const euro = cents => formatter.format(cents / 100);
const difference = cents => signedFormatter.format(cents / 100);
const modelLinks = document.querySelectorAll('[data-model]');
const mileageInput = byId('mileage');
const selections = new Map();
let model;
let selection;
let edition;
let extraRows = [];

function element(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

function selectModel() {
  const requested = location.hash.slice(1);
  const key = Object.hasOwn(exampleCars, requested) ? requested : 'clio';
  model = exampleCars[key];
  if (!selections.has(key)) selections.set(key, { edition: 0, mileage: String(model.km), extras: new Set() });
  selection = selections.get(key);
  mileageInput.value = selection.mileage;
  for (const link of modelLinks) {
    if (link.dataset.model === key) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  byId('editions').replaceChildren(...model.editions.map((entry, index) => {
    const label = element('label', 'edition-option');
    const radio = element('input', 'edition-radio');
    radio.type = 'radio';
    radio.name = 'edition';
    radio.value = String(index);
    radio.checked = index === selection.edition;
    radio.addEventListener('change', () => {
      selection.edition = index;
      selection.extras.clear();
      showEdition();
    });
    const copy = element('span', 'edition-copy');
    copy.append(
      element('strong', '', entry.name),
      element('small', '', entry.fuel),
      element('small', 'edition-metrics', `${entry.co2} g/km · ${euro(entry.price)}`),
    );
    label.append(radio, copy);
    return label;
  }));
  display('reference', `Ηλικία ${model.age} ετών · αναφορά ${integer.format(model.km)} km`);
  showEdition();
}

function showEdition() {
  edition = model.editions[selection.edition];
  display('vehicle-title', model.name);
  display('vehicle-edition', edition.name);
  display('vehicle-fuel', edition.fuel);
  display('vehicle-co2', `${edition.co2} g/km`);
  display('vehicle-price', euro(edition.price));
  const image = byId('vehicle-image');
  image.src = `images/examples/${edition.image}.webp`;
  image.alt = `${model.name} ${edition.name}`;
  extraRows = edition.extras.map(extra => {
    const label = element('label', 'extra-option');
    const input = element('input', 'extra-check');
    input.type = 'checkbox';
    const copy = element('span', 'extra-copy');
    const impact = element('small', 'extra-impact');
    copy.append(element('strong', '', extra.label), element('small', '', euro(extra.price)), impact);
    label.append(input, copy);
    input.addEventListener('change', () => {
      if (input.checked) {
        for (const other of edition.extras) {
          if (extra.group && other.group === extra.group) selection.extras.delete(other.key);
        }
        selection.extras.add(extra.key);
      } else {
        selection.extras.delete(extra.key);
      }
      updateResults();
    });
    return { extra, label, input, impact };
  });
  byId('extras').replaceChildren(...extraRows.map(row => row.label));
  updateResults();
}

function updateResults() {
  const valid = mileageInput.validity.valid;
  const mileage = valid ? mileageInput.valueAsNumber : model.km;
  const activeExtras = edition.extras.filter(extra => selection.extras.has(extra.key));
  const extrasPrice = activeExtras.reduce((sum, extra) => sum + extra.price, 0);
  const baseline = registrationDuty(model, model.editions[0], 0, model.km).cents;
  const editionOnly = registrationDuty(model, edition, 0, model.km).cents;
  const withExtras = registrationDuty(model, edition, extrasPrice, model.km).cents;
  const current = registrationDuty(model, edition, extrasPrice, mileage);

  display('baseline-label', `Βάση · ${model.editions[0].name}`);
  display('baseline', euro(baseline));
  display('edition-effect', difference(editionOnly - baseline));
  display('extras-effect', difference(withExtras - editionOnly));
  display('mileage-effect', valid ? difference(current.cents - withExtras) : '—');
  const total = valid ? euro(current.cents) : '—';
  display('total', total);
  display('mobile-amount', total);
  const delta = current.cents - baseline;
  const message = valid
    ? (delta === 0 ? 'Ίδιο τέλος με τη βασική έκδοση' : `${difference(delta)} σε σχέση με τη βασική έκδοση`)
    : 'Συμπλήρωσε έγκυρα χιλιόμετρα.';
  display('comparison', message);
  display('announcement', valid ? `Τέλος ταξινόμησης ${euro(current.cents)}. ${message}.` : message);
  display('extras-price', euro(extrasPrice));
  display('combined-price', euro(edition.price + extrasPrice));
  display('body-factor', percentage.format(model.depreciation));
  display('km-factor', valid ? percentage.format(current.mileageReduction) : '—');
  display('taxable-price', valid ? euro(current.taxable) : '—');
  display('co2-factor', `${current.co2Adjustment > 0 ? '+' : ''}${percentage.format(current.co2Adjustment / 100)}`);
  byId('hybrid-row').hidden = !edition.hybrid;

  for (const { extra, input, impact } of extraRows) {
    const selected = selection.extras.has(extra.key);
    input.checked = selected;
    const replaced = extra.group && activeExtras.find(other => other.group === extra.group);
    const withoutOption = extrasPrice - (selected ? extra.price : 0);
    const withOption = selected ? extrasPrice : extrasPrice - (replaced ? replaced.price : 0) + extra.price;
    const effect = registrationDuty(model, edition, withOption, mileage).cents
      - registrationDuty(model, edition, withoutOption, mileage).cents;
    impact.textContent = valid ? `${difference(effect)} στο τέλος${!selected && replaced ? ' με αντικατάσταση' : ''}` : '';
  }
}

function setMileage(value) {
  mileageInput.value = value;
  selection.mileage = mileageInput.value;
  updateResults();
}

for (const link of modelLinks) {
  link.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    selectModel();
  });
}
window.addEventListener('hashchange', selectModel);
mileageInput.addEventListener('input', () => {
  selection.mileage = mileageInput.value;
  updateResults();
});
byId('jump-to-results').addEventListener('click', () => byId('results-title').focus());
byId('more-mileage').addEventListener('click', () => setMileage(model.km + 20000));
byId('reset').addEventListener('click', () => {
  selection.edition = 0;
  selection.extras.clear();
  selection.mileage = String(model.km);
  selectModel();
});

selectModel();
byId('configurator').hidden = false;
