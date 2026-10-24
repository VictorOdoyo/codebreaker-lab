# Cipher conventions and search

| Mode | Key | Formatting and alphabet |
| --- | --- | --- |
| Caesar | integer shift | ASCII letters transformed; case/punctuation retained |
| Atbash | none | A↔Z; case/punctuation retained |
| Affine | invertible a mod 26 and offset b | y = ax+b mod 26; 312 keys |
| Vigenère | repeating letter key | y = x+k mod 26 |
| Beaufort | repeating letter key | y = k−x mod 26; reciprocal |
| Variant Beaufort | repeating letter key | y = x−k mod 26 |
| Plaintext autokey | initial letter key | key extends from original/recovered plaintext |
| Substitution | plaintext-to-cipher A–Z permutation | inverse mapping for decryption |
| Rail fence | 2–20 rails | whole Unicode code points, spaces included |
| Columnar | read-order permutation | whole code points; ragged columns, no padding |
| Polybius | keyword square | normalized uppercase; J folds to I; pairs 11–55 |
| Bifid | keyword square and period | normalized uppercase; J folds to I; ragged final period |

Repeating keys advance only on ASCII letters. Non-ASCII characters remain untouched by format-preserving substitutions. Analysis filters to ASCII letters before case conversion, so Unicode case expansions do not create extra analyzed symbols. Polybius/Bifid intentionally discard spaces and punctuation. Encryption of a J cannot later distinguish it from I. Column order [2,0,1] means read column 2, then 0, then 1; it is not a rank assigned to each physical column.

## Evidence

Letter frequencies use a fixed approximate English monogram baseline. Chi-square measures distribution mismatch; low values do not prove readable plaintext. Coincidence uses ordered equal-letter pairs divided by N(N−1), with zero for fewer than two letters. Text entropy is the empirical marginal entropy, not key uncertainty or a measure of security.

Period scans compute column coincidence weighted by available ordered pairs, so a tiny column has less influence. Multiples of a true period can also score highly. Kasiski uses repeated 3–5-letter groups, adjacent occurrence distances, and factor votes weighted by gram length minus one. Its repeat list and gram count are bounded. Shifted coincidence does not wrap the end of the message. Friedman estimates use approximate English/random coincidence constants; short samples return uncertainty rather than a fabricated precise period.

William F. Friedman's [Index of Coincidence](https://www.nsa.gov/Portals/75/documents/news-features/declassified-documents/friedman-documents/publications/FOLDER_233/41761039080018.pdf) is a primary historical reference for the statistical approach. The implementation's tests independently check its chosen formulas.

## Key recovery

- Caesar and affine searches enumerate all 26 / 312 keys and rank a character language score.
- Vigenère recovery tries caller-selected periods. Per-column chi-square keeps a few shifts, a cost-ordered beam combines them, and the full message model reranks complete keys. Repeating keys are reduced to primitive form. This is an incomplete beam search, even if its chosen beams are fully evaluated. Recovery currently targets Vigenère, not the two Beaufort variants or autokey.
- Substitution search starts from a frequency key, then seeded random restart keys. Pair swaps honor immutable plaintext-to-cipher crib mappings. Metropolis acceptance uses exp(score difference / temperature) with geometric cooling. Scores are normalized per letter. It records accepted proposals, best/current scores, temperature, restart, and seed. There is no global-optimality or guaranteed plaintext-recovery claim.
- Columnar search enumerates lexical permutations at a stated width, up to a budget, retaining the top 20. Rail-fence search covers the stated rail range. Width/range assumptions are part of the result.

The default language model is trained from original project prose. It interpolates smoothed conditional character probabilities for orders 1–4 using order-squared weights. Its limited corpus can favor familiar phrasing. It is an inspectable educational model, not a general-purpose English detector. Supply a separately trained model to study another corpus. Benchmark recoveries use a held-out challenge passage, but do not estimate population-wide accuracy.
