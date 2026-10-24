import { splitColumns } from './periods.js';
import { shiftAnalysis } from './shift-analysis.js';
import { vigenere } from './vigenere.js';
import { languageScore } from './language-model.js';
import { integer } from './validate.js';
export function primitiveKey(key) {
  for (let n = 1; n <= key.length; n++)
    if (key.length % n === 0 && key.slice(0, n).repeat(key.length / n) === key)
      return key.slice(0, n);
  return key;
}
export function searchVigenere(
  value,
  { periods = [1, 2, 3, 4, 5, 6, 7, 8], perColumn = 3, beamWidth = 128, model } = {},
) {
  if (!Array.isArray(periods) || !periods.length || periods.length > 20)
    throw new RangeError('Specify 1..20 periods');
  periods.forEach((p) => integer(p, 1, 20, 'period'));
  integer(perColumn, 1, 8);
  integer(beamWidth, 1, 512);
  if (value.length > 5000) throw new RangeError('Search text exceeds 5000 characters');
  const seen = new Map();
  let evaluated = 0;
  for (const period of new Set(periods)) {
    const cols = splitColumns(value, period);
    if (cols.some((c) => !c.length)) continue;
    let beam = [{ key: '', cost: 0 }];
    for (const col of cols) {
      const options = shiftAnalysis(col).slice(0, perColumn);
      beam = beam
        .flatMap((b) => options.map((o) => ({ key: b.key + o.key, cost: b.cost + o.chiSquare })))
        .sort((a, b) => a.cost - b.cost || a.key.localeCompare(b.key))
        .slice(0, beamWidth);
    }
    for (const b of beam) {
      const key = primitiveKey(b.key);
      if (seen.has(key)) continue;
      const plaintext = vigenere(value, key, true),
        score = languageScore(plaintext, model);
      seen.set(key, { key, period: key.length, plaintext, score, columnCost: b.cost });
      evaluated++;
    }
  }
  return {
    rows: [...seen.values()]
      .sort((a, b) => b.score - a.score || a.period - b.period || a.key.localeCompare(b.key))
      .slice(0, 20),
    evaluated,
    complete: false,
    scope: 'chi-square column beam; Vigenere only',
  };
}
