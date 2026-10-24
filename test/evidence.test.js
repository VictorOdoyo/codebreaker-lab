import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {evidence} from '../src/evidence.js';
test('evidence certificates explain eliminations and avoid infinite conflict bits',()=>{const s=createScorer({length:2,colors:2}),r=evidence(s,[{guess:[0,0],response:{exact:2,misplaced:0}}]);assert.equal(r.status,'identified');assert.equal(r.steps[0].eliminated,3);assert.equal(r.steps[0].bits,2);assert.equal(evidence(s,[]).status,'ambiguous');});