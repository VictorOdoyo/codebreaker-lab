import {
  feedback,
  cipher,
  wordFeedback,
  analyze,
  createScorer,
  rankGuesses,
} from '../src/index.js';
let data = '';
for await (const chunk of process.stdin) data += chunk;
const requests = JSON.parse(data),
  results = requests.map((r) => {
    switch (r.op) {
      case 'feedback':
        return feedback(r.secret, r.guess, r.rules);
      case 'cipher':
        return cipher(r.kind, r.value, r.options);
      case 'word':
        return wordFeedback(r.secret, r.guess);
      case 'analysis': {
        const a = analyze(r.value);
        return { ic: a.coincidence, entropy: a.entropy, counts: a.frequency.counts };
      }
      case 'rank': {
        const s = createScorer(r.rules);
        return rankGuesses(s, r.ids, r.options);
      }
      default:
        throw new Error('Unknown oracle operation');
    }
  });
process.stdout.write(JSON.stringify(results));
