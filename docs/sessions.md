# Session and report formats

A browser deduction case is portable JSON. Save case exports the active rules, accepted transcript, strategy, and pool. Import replays and validates it before replacing the current case. The file is at most 100 KB and the transcript at most 100 rows. Unsupported versions, invalid codes, impossible replies, and contradictory histories are rejected atomically.

```json
{
  "version": 1,
  "kind": "deduction",
  "rules": {"length": 4, "colors": 6, "repeats": true},
  "history": [
    {"guess": [0,0,1,1], "response": {"exact": 0, "misplaced": 1}}
  ],
  "strategy": "minimax",
  "pool": "all"
}
```

The derived rules.size field may be included by the exporter; import recomputes it instead of trusting it. Unknown extra properties are discarded. Missing strategy/pool use minimax/all. No hidden secret is stored. The default sample-pool seed is 42. Library callers can choose another ranking seed, but the current UI session format intentionally stores only its fixed sample settings.

CSV transcripts contain turn, guess, exact, misplaced. Codes are digit strings; leading zeroes matter. Spreadsheet users should import the guess column as text. CSV values are delimiter-quoted and dangerous leading formula characters are prefixed with an apostrophe.

Cipher analysis downloads contain the input, selected kind, actual options, and computed output or search result. Search reports include their statistical analysis, ranking scope, keys, score, and annealing trace where applicable. They are inspection reports, not importable deduction sessions. Applying a new key replaces the exportable report with that latest transform.

Audit downloads contain either the exhaustive policy result or the most recently completed paired comparison. Pair samples include the seed, actual selected secret IDs, rule set, per-method runs, guesses and replies. Cancelled or failed tasks do not replace the last completed report. Save reports if you need to preserve work; the application does not persist messages in localStorage or a server database.
