import { wordFeedback, wordFeedbackKey } from './word-feedback.js';
import { integer, choice } from './validate.js';
import { information } from './information.js';
export function dictionary(words) {
  if (!Array.isArray(words) || !words.length || words.length > 5000)
    throw new RangeError('Dictionary needs 1..5000 words');
  const n = words[0]?.length;
  if (
    !Number.isInteger(n) ||
    n < 2 ||
    n > 12 ||
    words.some((w) => typeof w !== 'string' || w.length !== n || !/^[A-Z]+$/.test(w))
  )
    throw new RangeError('Dictionary must have equal-length uppercase words');
  return [...new Set(words)].sort();
}
export function filterWords(words, history = []) {
  const initial = dictionary(words);
  if (!Array.isArray(history) || history.length > 100)
    throw new RangeError('At most 100 feedback rows');
  for (const h of history) {
    wordFeedback(initial[0], h.guess);
    wordFeedbackKey(h.marks);
    if (h.marks.length !== initial[0].length) throw new RangeError('Feedback length mismatch');
  }
  return initial.filter((w) =>
    history.every((h) => wordFeedbackKey(wordFeedback(w, h.guess)) === wordFeedbackKey(h.marks)),
  );
}
export function rankWords(
  candidates,
  guesses = candidates,
  { strategy = 'entropy', budget = 1000000 } = {},
) {
  const cs = dictionary(candidates),
    gs = dictionary(guesses);
  if (cs[0].length !== gs[0].length) throw new RangeError('Word lengths differ');
  choice(strategy, ['entropy', 'minimax', 'expected']);
  integer(budget, 1, 5000000);
  const rows = [];
  let operations = 0;
  for (const guess of gs) {
    if (operations + cs.length > budget) break;
    const buckets = new Map();
    for (const c of cs) {
      const k = wordFeedbackKey(wordFeedback(c, guess));
      buckets.set(k, (buckets.get(k) ?? 0) + 1);
    }
    rows.push({ guess, candidate: cs.includes(guess), ...information([...buckets.values()]) });
    operations += cs.length;
  }
  const metric = (r) =>
    strategy === 'entropy'
      ? -r.entropy
      : strategy === 'expected'
        ? r.expectedRemaining
        : r.worstCase;
  rows.sort(
    (a, b) =>
      metric(a) - metric(b) ||
      Number(b.candidate) - Number(a.candidate) ||
      a.guess.localeCompare(b.guess),
  );
  return { rows: rows.slice(0, 20), complete: rows.length === gs.length, operations };
}
