# ESM API guide

The package entry point is src/index.js. Browser-safe exports do not import Node modules. src/server.js is a separate Node-only HTTP utility.

## Deduction

```js
import { DeductionSession, rankGuesses, explainContradiction } from './src/index.js';
const game = new DeductionSession({ length: 3, colors: 4, repeats: false });
const reply = game.add([0, 1, 2], { exact: 1, misplaced: 1 });
if (!reply.accepted) console.log(reply.conflict.rows); // zero-based row indexes
const next = rankGuesses(game.scorer, game.state.ids, {
  strategy: 'entropy',
  pool: 'all',
  budget: 20000000,
  limit: 8,
});
console.log(next.rows[0], next.complete, next.exactGlobal);
game.undo();
```

Use rules / validateCode to validate a domain, codeSpace to enumerate it, parseCode to read digit strings, and feedback / feedbackKey / decodeFeedback for response encoding. createScorer owns immutable-in-practice lexical codes and a lazily filled row cache. Do not mutate its code/rule arrays. clear() drops cache rows and resets the physical evaluation counter.

replay(scorer, history) returns ids and a count trace including the initial count. filterCandidates applies one response. partition returns response, count, probability, and member IDs per branch. marginals returns per-position probabilities, symbol presence, and forced symbols (−1 if unknown). evidence returns an elimination certificate. Candidate ID arrays must be unique in-domain IDs; an empty array represents an inconsistent posterior where supported.

constrain(scorer, ids, {fixed, forbidden, minCounts, maxCounts}) uses zero-based object keys for positions/symbols. branchPreview computes a next ranking inside a bounded number of reply branches. symmetryClasses groups openings by symbol relabeling only; it does not collapse arbitrary later posteriors.

solveSecret validates a real secret and returns solved, budget, or turn-limit with its complete trace. auditPolicy traverses every branch up to node/ranking budgets. compareStrategies uses shared seeded secrets for all requested objectives. Sample reports contain their actual secret IDs and traces.

## Cipher transforms and analysis

```js
import { cipher, analyze, searchVigenere, searchSubstitution } from './src/index.js';
console.log(cipher('vigenere', 'ATTACK AT DAWN', { key: 'LEMON' }));
const evidence = analyze('LXFOPV EF RNHR');
const hypotheses = searchVigenere('LXFOPV EF RNHR', { periods: [5] });
// Short text has weak statistics: inspect evidence and multiple hypotheses.
```

CIPHERS lists dispatch names. cipher(kind, text, options) defaults to encryption; set decrypt:true for decryption. Individual transform exports follow (text, key..., decrypt=false), except reciprocal atbash. keywordKey constructs a 26-letter substitution alphabet; squareKey constructs a keyed 25-letter I/J square. randomKey(seed) is reproducible.

Analysis helpers include frequencies, coincidence, textEntropy, friedmanEstimate, ngrams, kasiski, splitColumns, periodScan, chiSquare, shiftAnalysis, autocorrelation. ngram positions and crib offsets count normalized ASCII letters, not source-string characters.

searchCaesar / searchAffine return sorted row arrays. searchVigenere / searchColumnar return rows with coverage metadata. searchRailFence returns rows. searchSubstitution returns the best key/plaintext plus trace, seed, proposal count, and heuristic scope. A substitution key maps plaintext letters to cipher letters. Crib mapping {T:'Q'} locks plaintext T to ciphertext Q. cribMappings checks a known plaintext at an offset; cribPlacements returns all bijective alignments. locked key construction rejects duplicate cipher assignments.

trainModel(text,{order,alpha}) creates a Map-based model for in-process use; languageScore returns an average log score, with zero for empty normalized text. It is not a calibrated probability of correctness. Models are not JSON session objects.

## Word puzzles

```js
import { filterWords, wordFeedback, rankWords } from './src/index.js';
const words = ['APPLE', 'AMPLE', 'MAPLE', 'ANGLE'];
const candidates = filterWords(words, [{ guess: 'ANGLE', marks: wordFeedback('APPLE', 'ANGLE') }]);
if (candidates.length) console.log(rankWords(candidates, words).rows[0]);
```

Feedback is 0 absent, 1 misplaced, 2 exact. Greens consume occurrences before yellows. Dictionaries are caller supplied, uppercase, equal length (2–12), and at most 5,000 entries. rankWords requires a nonempty candidate set; filterWords may return empty. wordPattern and matchingWords support monoalphabetic word-shape evidence without bundling an external dictionary.
