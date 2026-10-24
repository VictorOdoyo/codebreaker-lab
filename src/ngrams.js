import { letters } from './alphabet.js';
import { integer } from './validate.js';
export function ngrams(value, n = 2, limit = 20) {
  integer(n, 1, 8, 'gram size');
  integer(limit, 1, 1000, 'limit');
  const s = letters(value),
    map = new Map();
  for (let i = 0; i <= s.length - n; i++) {
    const g = s.slice(i, i + n);
    if (!map.has(g)) map.set(g, []);
    map.get(g).push(i);
  }
  return [...map]
    .map(([gram, positions]) => ({ gram, count: positions.length, positions }))
    .sort((a, b) => b.count - a.count || (a.gram < b.gram ? -1 : 1))
    .slice(0, limit);
}
