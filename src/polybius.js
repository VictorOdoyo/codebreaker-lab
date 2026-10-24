import { letters } from './alphabet.js';
import { text } from './validate.js';
export function squareKey(keyword = '') {
  return [...new Set((letters(keyword) + 'ABCDEFGHIKLMNOPQRSTUVWXYZ').replaceAll('J', 'I'))].join(
    '',
  );
}
export function polybius(value, keyword = '', decrypt = false) {
  const square = squareKey(keyword);
  if (!decrypt)
    return Array.from(letters(value).replaceAll('J', 'I'), (c) => {
      const i = square.indexOf(c);
      return String(Math.floor(i / 5) + 1) + ((i % 5) + 1);
    }).join(' ');
  text(value);
  const digits = value.replace(/\s/g, '');
  if (!/^(?:[1-5]{2})*$/.test(digits))
    throw new RangeError('Coordinates must be pairs of digits 1..5');
  return (
    digits
      .match(/../g)
      ?.map((p) => square[(Number(p[0]) - 1) * 5 + Number(p[1]) - 1])
      .join('') ?? ''
  );
}
