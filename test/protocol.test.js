import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandler } from '../src/protocol.js';
test('worker protocol isolates requests and reuses only compatible rule scorers', () => {
  const h = createHandler();
  const r = h({
    action: 'deduction',
    input: { rules: { length: 2, colors: 2 } },
    options: { strategy: 'entropy' },
  });
  assert.equal(r.state.ids.length, 4);
  assert.equal(r.candidates.length, 4);
  assert.equal(
    h({ action: 'deduction', input: { rules: { length: 2, colors: 3 } } }).candidates.length,
    9,
  );
  assert.throws(() => h({ action: 'bad' }));
  assert.equal(h({ action: 'search', input: { kind: 'caesar', text: 'DEF' } }).evaluated, 26);
});
