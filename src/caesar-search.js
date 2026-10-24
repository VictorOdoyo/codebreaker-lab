import { caesar } from './caesar.js';
import { affine, affineKeys } from './affine.js';
import { languageScore } from './language-model.js';
import { chiSquare } from './chi-square.js';
export function searchCaesar(value, model) {
  return Array.from({ length: 26 }, (_, shift) => {
    const plaintext = caesar(value, shift, true);
    return {
      key: shift,
      plaintext,
      score: languageScore(plaintext, model),
      chiSquare: chiSquare(plaintext),
    };
  }).sort((a, b) => b.score - a.score || a.key - b.key);
}
export function searchAffine(value, model) {
  return affineKeys()
    .map((key) => {
      const plaintext = affine(value, key.a, key.b, true);
      return { key, plaintext, score: languageScore(plaintext, model) };
    })
    .sort((a, b) => b.score - a.score || a.key.a - b.key.a || a.key.b - b.key.b);
}
