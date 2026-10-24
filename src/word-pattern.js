import { letters } from './alphabet.js';
export function wordPattern(word) {
  const s = letters(word),
    map = new Map();
  return Array.from(s, (c) => {
    if (!map.has(c)) map.set(c, map.size);
    return map.get(c);
  }).join('.');
}
export function matchingWords(word, dictionary) {
  if (!Array.isArray(dictionary) || dictionary.length > 100000)
    throw new RangeError('Dictionary needs at most 100000 entries');
  const p = wordPattern(word);
  return [...new Set(dictionary.map(letters))]
    .filter((w) => w.length === letters(word).length && wordPattern(w) === p)
    .sort();
}
