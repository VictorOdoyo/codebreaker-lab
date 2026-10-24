import { validateCode, rules } from './rules.js';
import { integer } from './validate.js';
export function scoreRaw(a, b, colors = 10) {
  let exact = 0;
  const ca = new Uint8Array(colors),
    cb = new Uint8Array(colors);
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) exact++;
    ca[a[i]]++;
    cb[b[i]]++;
  }
  let shared = 0;
  for (let i = 0; i < colors; i++) shared += Math.min(ca[i], cb[i]);
  return { exact, misplaced: shared - exact };
}
export function feedback(secret, guess, input = {}) {
  const r = rules(input);
  validateCode(secret, r);
  validateCode(guess, r);
  return scoreRaw(secret, guess, r.colors);
}
export function feedbackKey(f, length) {
  integer(f?.exact, 0, length, 'exact');
  integer(f?.misplaced, 0, length - f.exact, 'misplaced');
  if (f.exact === length - 1 && f.misplaced === 1) throw new RangeError('Impossible feedback');
  return f.exact * (length + 1) + f.misplaced;
}
export function decodeFeedback(k, length) {
  integer(k, 0, length * (length + 1), 'feedback key');
  const f = { exact: Math.floor(k / (length + 1)), misplaced: k % (length + 1) };
  feedbackKey(f, length);
  return f;
}
