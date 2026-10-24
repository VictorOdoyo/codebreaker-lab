import test from 'node:test';
import assert from 'node:assert/strict';
import {splitColumns,periodScan} from '../src/periods.js';
test('period scans weight coincidences by available ordered pairs',()=>{assert.deepEqual(splitColumns('ABCDEFG',3),['ADG','BE','CF']);const r=periodScan('ABABABAB',4);assert.equal(r.find(x=>x.period===2).ic,1);assert.equal(r[0].reliable,false);assert.equal(periodScan('',3)[0].ic,0);});