import { transform, mod, indices } from './alphabet.js';
import { choice } from './validate.js';
export function vigenere(text, key = 'LEMON', decrypt = false, variant = 'vigenere') {
  choice(variant, ['vigenere', 'beaufort', 'variant-beaufort']);
  const ks = indices(key);
  if (!ks.length || ks.length > 64) throw new RangeError('Key needs 1..64 ASCII letters');
  return transform(text, (x, i) => {
    const k = ks[i % ks.length];
    if (variant === 'beaufort') return mod(k - x);
    if (variant === 'variant-beaufort') return mod(x + (decrypt ? k : -k));
    return mod(x + (decrypt ? -k : k));
  });
}
