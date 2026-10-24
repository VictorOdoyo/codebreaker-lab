import { letters } from './alphabet.js';
import { integer } from './validate.js';
export function autocorrelation(value, maxLag = 40) {
  integer(maxLag, 1, 128);
  const s = letters(value);
  return Array.from({ length: Math.min(maxLag, Math.max(0, s.length - 1)) }, (_, i) => {
    const lag = i + 1,
      n = s.length - lag;
    let matches = 0;
    for (let j = 0; j < n; j++) matches += s[j] === s[j + lag] ? 1 : 0;
    return { lag, matches, pairs: n, rate: matches / n };
  });
}
