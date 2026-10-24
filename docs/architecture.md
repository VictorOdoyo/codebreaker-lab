# Architecture

The runtime is plain ESM. src/index.js exposes browser-safe pure operations. Source modules separate code-space constraints, feedback scoring, posterior filtering, objective ranking, complete policy traversal, cipher transforms, statistics, and stochastic search. The language model is trained lazily once per realm from src/corpus.js.

## Computation boundaries

The browser uses one module worker. web/jobs.js assigns monotonically increasing IDs, ignores stale replies, and maintains one pending task. Cancellation terminates the worker, which also drops its cache; the next operation creates a fresh worker. A 30-second wall-time limit does the same. No partial ranking or report replaces a previously completed result. The UI disables computation inputs while a task is pending, then restores their prior enabled state.

src/protocol.js is also testable in Node. It dispatches deduction, audit, compare, analysis, and search requests. It reuses a feedback scorer only while the serialized rule definition matches, rebuilding it for a different code space. Cached scores never depend on a transcript; candidate filtering determines the actual current posterior.

The main thread renders local DOM nodes using textContent and createTextNode. Ciphertext, plaintext, imported values, and error messages never enter an HTML template string. SVG charts use the SVG namespace with numeric attributes. No third-party charting or framework runtime is needed.

## HTTP boundary

The local Node server permits only GET/HEAD and exposes .html, .css, .js, and .svg under web/ and src/. Canonical realpath checks prevent symlink escapes. package files, Git metadata, tests, and release artifacts are not served. The content policy restricts scripts, styles, workers, and images to the local origin (with data images allowed), blocks embedded objects, and disables framing. The server binds to 127.0.0.1 by default.

## Complexity

Candidate replay is O(history × space × length) before caching. A full rank is O(guesses × candidates), plus at most 49 branch counters and sorting the guess rows. Cache allocation is lazy by guess row; byte cells store responses. Exhaustive audits reuse branches and the same score cache, avoiding independent full re-solving for every secret.

Substitution search scales with proposals × text length × language-model order. Its explicit letter-proposal cap limits requested work, while browser wall-time cancellation bounds perceived latency. The synchronous library intentionally has no implicit timer or background threads; callers own cancellation/isolation when using it outside the workbench.
