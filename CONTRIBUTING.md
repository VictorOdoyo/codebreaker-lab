# Contributing

Use Node 24+ and npm ci --ignore-scripts. Run npm test for semantic regressions, npm run format:check for consistent sources, and the relevant browser/oracle/benchmark checks for changes to search, feedback, transforms, or UI. Python reference checks need no external packages.

Keep changes small enough to explain their behavior and validation. Add regression evidence for an observed defect instead of a test that merely mirrors a line of implementation. Preserve deterministic tie rules and RNG behavior unless intentionally versioning the report semantics. A seed alone is insufficient to replay after an algorithm changes, so record the release version alongside published experiments.

Changing feedback affects cache encoding, filtering, partition metrics, audits, and external reports. Validate duplicate-symbol cases and exhaustive small spaces. Changing a search objective requires independent branch-size checks, not just a snapshot of the current best guess. For heuristic algorithms, report both work budgets and failure/plateau behavior; do not turn a favorable fixture into a general recovery claim.

New cipher modes must document key direction, alphabet, case, punctuation, padding, and inverse behavior. Include independent vectors and ragged/empty cases. Do not add a corpus or dictionary without clear licensing and provenance. The current original prose is MIT licensed.

For UI edits, inspect desktop and 390-pixel layouts, keyboard focus, label association, cancellation, and export behavior. Keep user text in safe DOM nodes and computation inside the worker protocol. Leave the working tree clean after committing actual changes; release packaging should derive from the committed tree.
