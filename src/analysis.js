import { frequencies } from './frequency.js';
import { coincidence, textEntropy, friedmanEstimate } from './coincidence.js';
import { ngrams } from './ngrams.js';
import { kasiski } from './kasiski.js';
import { periodScan } from './periods.js';
import { autocorrelation } from './autocorrelation.js';
import { text } from './validate.js';
export function analyze(value) {
  text(value, 20000);
  return {
    frequency: frequencies(value),
    coincidence: coincidence(value),
    entropy: textEntropy(value),
    friedman: friedmanEstimate(value),
    bigrams: ngrams(value, 2),
    trigrams: ngrams(value, 3),
    kasiski: kasiski(value),
    periods: periodScan(value),
    autocorrelation: autocorrelation(value),
    assumptions: [
      'ASCII A-Z only',
      'English frequency baseline',
      'Heuristic period evidence; multiples may rank highly',
    ],
  };
}
