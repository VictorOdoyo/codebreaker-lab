import { permutations, factorial } from './permutations.js';
import { columnar } from './columnar.js';
import { railFence } from './rail-fence.js';
import { languageScore } from './language-model.js';
import { integer, text } from './validate.js';
export function searchColumnar(value, { width = 4, budget = 10000, model } = {}) {
  text(value, 5000);
  integer(width, 2, 8);
  integer(budget, 1, 50000);
  const rows = [];
  let evaluated = 0;
  for (const key of permutations(width)) {
    if (evaluated === budget) break;
    const plaintext = columnar(value, key, true);
    rows.push({ key, plaintext, score: languageScore(plaintext, model) });
    evaluated++;
    if (rows.length > 40) rows.sort((a, b) => b.score - a.score).splice(20);
  }
  return {
    rows: rows.sort((a, b) => b.score - a.score).slice(0, 20),
    evaluated,
    total: factorial(width),
    complete: evaluated === factorial(width),
  };
}
export function searchRailFence(value, { maxRails = 12, model } = {}) {
  integer(maxRails, 2, 20);
  return Array.from({ length: maxRails - 1 }, (_, i) => {
    const rails = i + 2,
      plaintext = railFence(value, rails, true);
    return { rails, plaintext, score: languageScore(plaintext, model) };
  }).sort((a, b) => b.score - a.score || a.rails - b.rails);
}
