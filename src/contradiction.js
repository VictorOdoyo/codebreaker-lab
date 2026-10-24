import { replay } from './candidates.js';
export function explainContradiction(scorer, history) {
  if (replay(scorer, history).ids.length) return { contradictory: false, rows: [], minimal: false };
  let keep = history.map((_, i) => i);
  for (const i of [...keep]) {
    const trial = keep.filter((j) => j !== i);
    if (
      !replay(
        scorer,
        trial.map((j) => history[j]),
      ).ids.length
    )
      keep = trial;
  }
  return {
    contradictory: true,
    rows: keep,
    minimal: true,
    kind: 'deletion-minimal',
    checksBound: history.length + 1,
  };
}
