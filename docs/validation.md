# Verification and evidence

## Node regressions

npm test discovers sorted test/*.test.js files with Node's built-in test runner. Tests cover known cipher vectors, all affine keys, ragged transposition round trips, duplicate feedback, candidate preservation, budget statuses, lock constraints, replay, conflict irreducibility, HTTP boundaries, and exhaustive small-domain invariants. The standard-policy regression traverses all 1,296 secrets and requires a complete audit with maximum five turns.

## Independent Python references

python validation/reference_oracles.py constructs **8,971 cases** and sends one JSON batch to validation/bridge.mjs. Python uses its own implementations and standard library; it does not import or translate JavaScript results into expected values.

| Family | Cases | Independent basis |
| --- | ---: | --- |
| Exact/misplaced feedback | 1,729 | Counter intersection on nonmatching residuals |
| Word feedback | 6,561 | Exhaustive pairs of 81 four-letter words; explicit available-position removal |
| Cipher transforms | 628 | Modular formulas and independent row/column construction |
| Statistics | 50 | Seeded samples, direct ordered-pair IC and empirical entropy |
| Ranking | 3 | Independent brute-force branching and deterministic tie ordering |

Floating comparisons use 1e−12 absolute tolerance; categorical/transform results use exact equality. NODE_BINARY optionally selects the Node executable. Python's random seed is fixed at 2026. These are cross-implementation correctness checks, not evidence of practical cryptanalytic success on arbitrary messages.

## Benchmarks

npm run benchmark requires: complete standard minimax coverage (1,296 secrets, max 5 turns), three strategies each solving the same 30 seeded secrets (90 runs), and 17 controlled recoveries across Caesar, affine, Vigenère with known period, columnar with known width, and rail fence. It writes results/benchmark.json with elapsed time, actual histograms, sample aggregates, and recovery settings. Timing is observational; CI does not assert a hardware-specific speed target. The challenge passage is distinct from the training corpus. No annealing plaintext-recovery rate is claimed.

## Real browser tests

npm run test:browser starts an owned ephemeral HTTP server and a headless Chromium-family browser. It checks 35 conditions across transcript editing, contradiction rejection, replay, seeded scope labeling, JSON/CSV exports, atomic imports, rule bounds, twelve modes, evidence charts, Vigenère/columnar search, crib locks, annealing traces, cancellation, full audit, paired experiments, and three narrow-view layouts. It asserts no uncaught page exceptions and saves results/workspace.png. Finally blocks close the browser and server.

## Packaging and CI

npm run package:check packs the package, inspects its file allowlist, installs it into a temporary directory with dev dependencies omitted, solves a small hidden code, runs a Vigenère vector, and serves six essential assets from the installed copy. Temporary files are removed only beneath a verified prefix in the operating system temp directory.

CI runs formatting, tests, benchmark, and package smoke checks on both Windows and Ubuntu. Separate Ubuntu jobs install Chromium for browser tests and execute the independent Python suite. Pinned action SHAs and a committed lockfile make tooling inputs reviewable. Source ZIP validation repeats the Node tests after extraction. The final GitHub release includes SHA-256 checksums for the ZIP and TGZ.
