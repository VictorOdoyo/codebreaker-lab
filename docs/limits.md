# Limits and interpretation

| Resource                      | Bound                                             |
| ----------------------------- | ------------------------------------------------- |
| Code length                   | 2–6 positions                                     |
| Symbols                       | 2–10, zero-based digits                           |
| Code space                    | 1–4,096 valid codes                               |
| Transcript                    | 100 rows                                          |
| Rank comparison budget        | 1–20,000,000 guess/secret pairs                   |
| Ranked rows returned          | 1–100; default 12                                 |
| Policy node budget            | default 20,000; maximum 100,000                   |
| General text normalization    | 20,000 UTF-16 units                               |
| Browser analysis/search text  | 5,000 UTF-16 units                                |
| Substitution proposals        | ≤100,000 total; ≤20,000 per restart; ≤20 restarts |
| Substitution letter-proposals | ≤20,000,000                                       |
| Columnar search               | width 2–8, ≤50,000 permutations requested         |
| Vigenère search               | ≤20 periods of 1–20; beam ≤512; shifts/column ≤8  |
| Word dictionary               | ≤5,000 equal-length uppercase words, length 2–12  |
| Paired sample                 | 1–50 secrets; up to 3 strategies                  |
| Browser worker                | one task; 30-second wall-time limit               |

Only code spaces satisfying the cardinality cap are accepted. For example, six positions and ten repeated symbols are rejected even though the individual controls permit those values. Rule control edits are drafts until New case is selected. An invalid new rule set preserves the active case.

All exact posterior statements assume correct replies and the declared rule set. There is no noisy-feedback or weighted-prior model. A contradiction core is deletion-minimal, not minimum size. Side constraints and word-dictionary operations are library-only features.

A complete all-code one-step ranking is exact for its objective. Restricted pools and sampled pools are labeled accordingly. A comparison budget may stop ranking before any guess is fully evaluated; callers must handle an empty rows array. Full standard minimax audits are regression checked, while custom-policy results must be assessed by their own status and coverage.

English frequency and ngram evidence degrade on short samples, unusual prose, other languages, or structured non-language text. A high-ranked period can be a multiple of the real period. Substitution annealing can plateau, miss the intended key, and vary across seeds. Fixed cribs can be wrong yet internally bijective. Complete cipher enumeration does not make a statistical language ranking a proof.

The project implements historical educational ciphers rather than modern secure encryption. It has no remote-account access, password recovery, network scanning, or credential workflow. Data is ephemeral unless exported. The browser worker cap does not impose a library API timer; synchronous library callers should supply their own process/worker isolation for large workloads.
