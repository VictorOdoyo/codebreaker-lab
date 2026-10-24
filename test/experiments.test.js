import test from 'node:test';
import assert from 'node:assert/strict';
import {compareStrategies} from '../src/experiments.js';
test('paired strategy experiments reuse identical seeded secret samples',()=>{const options={secrets:6,seed:7},r=compareStrategies({length:2,colors:3},options);assert.deepEqual(r,compareStrategies({length:2,colors:3},options));for(const row of r.rows){assert.equal(row.solved,6);assert.deepEqual(row.runs.map(x=>x.secret),r.rows[0].runs.map(x=>x.secret));}assert.equal(new Set(r.secretIds).size,6);});