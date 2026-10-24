import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {explainContradiction} from '../src/contradiction.js';
import {replay} from '../src/candidates.js';
test('contradictions return an irreducible conflicting row set',()=>{const s=createScorer({length:2,colors:3}),h=[{guess:[0,0],response:{exact:2,misplaced:0}},{guess:[0,0],response:{exact:0,misplaced:0}},{guess:[1,1],response:{exact:0,misplaced:0}}],e=explainContradiction(s,h);assert(e.contradictory);assert(e.rows.length>=2);for(const i of e.rows)assert(replay(s,e.rows.filter(j=>j!==i).map(j=>h[j])).ids.length);assert.equal(explainContradiction(s,[]).contradictory,false);});