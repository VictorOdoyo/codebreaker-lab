import test from 'node:test';
import assert from 'node:assert/strict';
import {csvCell,csv,transcriptCSV} from '../src/exports.js';
test('CSV exports quote delimiters and neutralize spreadsheet formulas',()=>{assert.equal(csvCell('a,"b"'),'"a,""b"""');assert.equal(csvCell('=cmd'),"'=cmd");assert.equal(csv([{a:'x',b:2}],['a','b']),'a,b\r\nx,2\r\n');assert(transcriptCSV([{guess:[0,1],response:{exact:1,misplaced:0}}]).includes('1,01,1,0'));});