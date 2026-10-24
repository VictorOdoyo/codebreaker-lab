import { letters } from './alphabet.js';
import { integer } from './validate.js';
import { squareKey } from './polybius.js';
export function bifid(value, keyword = '', period = 5, decrypt = false) {
  integer(period, 1, 100, 'period');
  const square = squareKey(keyword),
    s = letters(value).replaceAll('J', 'I');
  let out = '';
  for (let at = 0; at < s.length; at += period) {
    const block = s.slice(at, at + period),
      pairs = Array.from(block, (c) => {
        const i = square.indexOf(c);
        return [Math.floor(i / 5), i % 5];
      });
    if (!decrypt) {
      const stream = [...pairs.map((p) => p[0]), ...pairs.map((p) => p[1])];
      for (let i = 0; i < stream.length; i += 2) out += square[stream[i] * 5 + stream[i + 1]];
    } else {
      const stream = pairs.flat(),
        n = block.length;
      for (let i = 0; i < n; i++) out += square[stream[i] * 5 + stream[n + i]];
    }
  }
  return out;
}
