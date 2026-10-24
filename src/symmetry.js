import { validateCode, rules } from './rules.js';
export function pattern(code, input = {}) {
  validateCode(code, input);
  const map = new Map();
  return code.map((x) => {
    if (!map.has(x)) map.set(x, map.size);
    return map.get(x);
  });
}
export function symmetryClasses(scorer) {
  const classes = new Map();
  for (let id = 0; id < scorer.codes.length; id++) {
    const p = pattern(scorer.codes[id], scorer.rules).join('');
    if (!classes.has(p)) classes.set(p, { representative: scorer.codes[id], ids: [] });
    classes.get(p).ids.push(id);
  }
  return [...classes.values()].map((c) => ({ ...c, count: c.ids.length }));
}
