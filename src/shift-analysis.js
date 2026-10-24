import { caesar } from './caesar.js';
import { chiSquare } from './chi-square.js';
export function shiftAnalysis(value) {
  return Array.from({ length: 26 }, (_, shift) => {
    const plaintext = caesar(value, shift, true);
    return {
      shift,
      key: String.fromCharCode(65 + shift),
      plaintext,
      chiSquare: chiSquare(plaintext),
    };
  }).sort((a, b) => a.chiSquare - b.chiSquare || a.shift - b.shift);
}
