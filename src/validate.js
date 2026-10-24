export function integer(n, lo, hi, name = 'value') {
  if (!Number.isInteger(n) || n < lo || n > hi)
    throw new RangeError(name + ' must be an integer in [' + lo + ', ' + hi + ']');
  return n;
}
export function finite(n, lo = -Infinity, hi = Infinity, name = 'value') {
  if (typeof n !== 'number' || !Number.isFinite(n) || n < lo || n > hi)
    throw new RangeError(name + ' is outside its finite range');
  return n;
}
export function text(s, max = 20000) {
  if (typeof s !== 'string' || s.length > max)
    throw new TypeError('Expected text with at most ' + max + ' characters');
  return s;
}
export function choice(value, options) {
  if (!options.includes(value)) throw new RangeError('Unsupported choice: ' + value);
  return value;
}
