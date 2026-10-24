import { transform, mod } from './alphabet.js';
import { integer } from './validate.js';
export function caesar(text, shift = 3, decrypt = false) {
  integer(shift, -100000, 100000, 'shift');
  return transform(text, (x) => mod(x + (decrypt ? -shift : shift)));
}
export function atbash(text) {
  return transform(text, (x) => 25 - x);
}
