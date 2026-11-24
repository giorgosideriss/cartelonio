'use strict';

const examples = {
  'new-car': { baseDuty: 14000 * 0.04 + 2000 * 0.26 },
  'used-car': { baseDuty: 13000 * 0.60 * 0.04, referenceKm: 45000 },
};

const co2Brackets = [
  [130, -5], [156, 0], [182, 10], [208, 20],
  [234, 30], [260, 40], [325, 50], [Infinity, 100],
];
const currency = new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' });
const signedCurrency = new Intl.NumberFormat('el-GR', {
  style: 'currency', currency: 'EUR', signDisplay: 'exceptZero',
});
const percentages = new Intl.NumberFormat('el-GR', { maximumFractionDigits: 1 });
const choices = document.querySelectorAll('[data-example]');

function calculate(example, co2, mileage) {
  const [, co2Adjustment] = co2Brackets.find(([limit]) => co2 <= limit);
  const extraKm = Math.max(0, mileage - (example.referenceKm ?? 0));
  const mileageReduction = Math.min(100, Math.floor(extraKm / 500)) / 10;
  const amount = example.baseDuty * (1 + co2Adjustment / 100) * (1 - mileageReduction / 100);
  return { cents: Math.round(amount * 100), co2Adjustment, mileageReduction };
}

for (const [id, example] of Object.entries(examples)) {
  const panel = document.getElementById(id);
  const form = panel.querySelector('form');
  const co2 = form.elements.co2;
  const mileage = form.elements.mileage;
  const results = Object.fromEntries(
    Array.from(form.querySelectorAll('[data-result]'), node => [node.dataset.result, node])
  );
  const error = form.querySelector('.input-error');
  const base = calculate(example, Number(co2.defaultValue), Number(mileage?.defaultValue ?? 0));
  results.base.textContent = currency.format(base.cents / 100);

  function update() {
    const valid = co2.validity.valid && (!mileage || mileage.validity.valid);
    error.hidden = valid;
    if (!valid) {
      results.total.textContent = '—';
      results.change.textContent = '—';
      results.factors.textContent = '';
      results.announcement.textContent = error.textContent;
      return;
    }

    const current = calculate(example, co2.valueAsNumber, mileage?.valueAsNumber ?? 0);
    results.total.textContent = currency.format(current.cents / 100);
    results.change.textContent = signedCurrency.format((current.cents - base.cents) / 100);

    const sign = current.co2Adjustment > 0 ? '+' : '';
    const factors = [`Προσαρμογή CO₂ ${sign}${current.co2Adjustment}%`];
    if (mileage) factors.push(`Απομείωση χιλιομέτρων ${percentages.format(current.mileageReduction)}%`);
    results.factors.textContent = factors.join(' · ');
    results.announcement.textContent = `Νέο τέλος ${results.total.textContent}. Διαφορά ${results.change.textContent}.`;
  }

  form.addEventListener('input', update);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => queueMicrotask(update));
  for (const button of form.querySelectorAll('[data-field]')) {
    button.addEventListener('click', () => {
      form.elements[button.dataset.field].value = button.dataset.value;
      update();
    });
  }
  panel.querySelector('details').open = false;
  form.hidden = false;
  update();
}

function selectExample(id) {
  const selected = Object.hasOwn(examples, id) ? id : 'new-car';
  for (const choice of choices) {
    const active = choice.dataset.example === selected;
    if (active) choice.setAttribute('aria-current', 'true');
    else choice.removeAttribute('aria-current');
    document.getElementById(choice.dataset.example).hidden = !active;
  }
}

for (const choice of choices) {
  choice.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== choice.hash) history.pushState(null, '', choice.hash);
    selectExample(choice.dataset.example);
  });
}
window.addEventListener('hashchange', () => selectExample(location.hash.slice(1)));
selectExample(location.hash.slice(1));
