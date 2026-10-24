import { $ } from './dom.js';
import { job, cancel } from './jobs.js';
import { setupDeduction } from './deduction.js';
import { setupCipher } from './cipher-desk.js';
import { setupAudit } from './audit.js';
let busy = false;
const status = (message) => ($('status').textContent = message);
async function compute(request, message) {
  if (busy) throw new Error('A search is already running');
  busy = true;
  status(message);
  const controls = [...document.querySelectorAll('button,input,select,textarea')].filter(
      (e) => e.id !== 'cancel',
    ),
    previous = controls.map((e) => e.disabled);
  controls.forEach((e) => (e.disabled = true));
  $('cancel').hidden = false;
  try {
    return await job(request);
  } finally {
    busy = false;
    controls.forEach((e, i) => (e.disabled = previous[i]));
    $('cancel').hidden = true;
  }
}
$('cancel').onclick = () => {
  cancel();
  status('Search cancelled. Existing evidence is preserved.');
};
const deduction = setupDeduction(compute, status),
  cipher = setupCipher(compute, status);
setupAudit(compute, status);
for (const button of document.querySelectorAll('[data-view]'))
  button.onclick = () => {
    for (const b of document.querySelectorAll('[data-view]')) {
      b.classList.toggle('active', b === button);
      if (b === button) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    }
    for (const panel of document.querySelectorAll('.view'))
      panel.hidden = panel.id !== 'view-' + button.dataset.view;
    if (button.dataset.view === 'cipher') cipher.open();
  };
deduction.refresh();
