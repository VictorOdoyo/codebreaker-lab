import { indices, ALPHABET } from './alphabet.js';
export const ENGLISH = [
  0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772,
  0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978,
  0.0236, 0.0015, 0.01974, 0.00074,
];
export function frequencies(value) {
  const xs = indices(value),
    counts = Array(26).fill(0);
  for (const x of xs) counts[x]++;
  return {
    length: xs.length,
    rows: Array.from(ALPHABET, (letter, i) => ({
      letter,
      count: counts[i],
      frequency: xs.length ? counts[i] / xs.length : 0,
      expected: ENGLISH[i],
    })),
    counts,
  };
}
export function frequencyKey(value) {
  const order = frequencies(value)
      .rows.sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter))
      .map((x) => x.letter),
    english = Array.from(ALPHABET).sort(
      (a, b) => ENGLISH[b.charCodeAt(0) - 65] - ENGLISH[a.charCodeAt(0) - 65],
    );
  return english
    .map((_, i) => order[i])
    .reduce((a, c, i) => {
      a[english[i].charCodeAt(0) - 65] = c;
      return a;
    }, Array(26))
    .join('');
}
