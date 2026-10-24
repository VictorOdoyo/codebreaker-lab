import { integer } from './validate.js';
export function rules(input = {}) {
  const length = integer(input.length ?? 4, 2, 6, 'length'),
    colors = integer(input.colors ?? 6, 2, 10, 'colors'),
    repeats = input.repeats ?? true;
  if (typeof repeats !== 'boolean') throw new TypeError('repeats must be boolean');
  let size = 1;
  for (let i = 0; i < length; i++) size *= repeats ? colors : Math.max(0, colors - i);
  if (!size || size > 4096) throw new RangeError('Code space must contain 1..4096 codes');
  return { length, colors, repeats, size };
}
export function validateCode(code, input = {}) {
  const r = rules(input);
  if (!Array.isArray(code) || code.length !== r.length) throw new TypeError('Code length mismatch');
  code.forEach((x) => integer(x, 0, r.colors - 1, 'symbol'));
  if (!r.repeats && new Set(code).size !== code.length)
    throw new RangeError('Repeated symbols are disabled');
  return code;
}
