import { integer } from './validate.js';
export function candidateDomain(scorer, ids) {
  if (!Array.isArray(ids) || ids.length > scorer.codes.length)
    throw new RangeError('Candidate ids must be a bounded array');
  const seen = new Set();
  for (const id of ids) {
    integer(id, 0, scorer.codes.length - 1, 'candidate id');
    if (seen.has(id)) throw new RangeError('Duplicate candidate id');
    seen.add(id);
  }
  return ids;
}
