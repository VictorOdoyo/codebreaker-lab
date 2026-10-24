import test from 'node:test';
import assert from 'node:assert/strict';
import {createScorer} from '../src/scorer.js';
import {pattern,symmetryClasses} from '../src/symmetry.js';
test('symbol relabeling canonicalizes opening symmetry classes',()=>{assert.deepEqual(pattern([4,4,2,5]),[0,0,1,2]);const c=symmetryClasses(createScorer());assert.equal(c.length,15);assert.equal(c.reduce((a,b)=>a+b.count,0),1296);});