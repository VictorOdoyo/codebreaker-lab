import test from 'node:test';
import assert from 'node:assert/strict';
import {kasiski} from '../src/kasiski.js';
test('Kasiski factors adjacent repeat distances with explicit weighting',()=>{const r=kasiski('ABCXYZABCXYZABC',{minGram:3,maxGram:3,maxPeriod:8});assert(r.repeats.some(x=>x.gram==='ABC'&&x.distances.every(d=>d===6)));assert(r.periods.find(x=>x.period===3).votes>0);assert.equal(kasiski('ABCDEFG').repeats.length,0);});