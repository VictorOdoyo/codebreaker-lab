# Deduction algorithms

## Code space and feedback

Codes are arrays of zero-based symbols. Defaults are length 4, colors 6, repeats true. Lexical enumeration determines stable IDs. With repeats, the cardinality is colors^length; without repeats it is the falling factorial. A code space must contain 1–4,096 codes.

Exact matches count equal positions. Total shared symbols sum the minimum multiplicity for each symbol; misplaced matches are shared minus exact. This prevents duplicate guesses from receiving multiple credits for the same secret symbol. Responses are encoded as exact × (length + 1) + misplaced. The compact cache stores one byte per evaluated pair with 255 as the unevaluated sentinel. A full 4,096-code cache is approximately 16 MiB, plus code/count arrays and JavaScript overhead.

Replay starts with all code IDs and intersects each feedback constraint in order. Counts can only decrease. The evidence report records before, after, eliminated, and observed information gain log2(before/after). Posterior bits are log2(candidate count), under a uniform prior over consistent secrets. An identified secret still needs to be guessed to count as a win in strategy audits.

## Three one-step objectives

For reply branch sizes n_j and total N:

- Minimax minimizes max(n_j).
- Entropy maximizes −Σ(n_j/N) log2(n_j/N).
- Expected survivors minimizes Σ(n_j²)/N.

Ties prefer a consistent candidate, then the lexical code ID. These rules are deterministic. The all-code pool includes probes that cannot themselves be the secret. The candidates pool excludes such probes. The sample pool draws up to 256 all-code guesses without replacement using a seeded stream. Rank reports distinguish completed pool coverage from global all-code coverage.

A comparison budget counts guess/secret pairs, including cache hits, so it describes objective work consistently across cold and warm caches. No partially evaluated guess enters the result. If the next full guess would exceed the budget, ranking stops and marks completion false. The default limit returns only the best 12 rows while still searching the whole permitted pool.

## Conflict explanations and side constraints

Contradictions are explained by deleting transcript rows whose removal leaves the transcript inconsistent. The result is deletion-minimal: removing any remaining row restores at least one candidate. It is not guaranteed to have minimum cardinality, and another deletion order can return a different valid explanation. Invalid syntax or logically impossible feedback is rejected before conflict extraction.

The optional constrain API applies fixed positions, forbidden position symbols, and lower/upper symbol multiplicities. It returns another exact subset. These side constraints are explicit library operations; they are not silently stored in browser transcripts.

## Complete policy audit

The audit traverses the deterministic strategy tree once, branching by feedback. Winning replies contribute their secrets to the depth histogram; unresolved replies enter the queue. A no-progress branch is an error, and node/ranking budget exhaustion yields an explicit incomplete status. A completed standard minimax run covers 1,296 secrets with maximum depth 5. The mean for this implementation's tie policy is approximately 4.47608; different tie rules can produce different means.

The five-turn statement applies to this fully audited default policy. It is not promised for other objectives, custom spaces, restricted pools, or truncated searches. A greedy one-step minimax decision is not a proof of global optimality.

## References

Donald E. Knuth, “The Computer as Master Mind” (1976–77), [primary paper](https://www.cs.uni.edu/~wallingf/teaching/cs3530/resources/knuth-mastermind.pdf), motivates minimax information probes. The repository verifies its own actual policy exhaustively rather than borrowing a guarantee from a different implementation.
