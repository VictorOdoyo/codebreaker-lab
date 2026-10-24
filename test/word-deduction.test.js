import test from 'node:test';
import assert from 'node:assert/strict';
import {dictionary,filterWords,rankWords} from '../src/word-deduction.js';
import {wordFeedback} from '../src/word-feedback.js';
test('dictionary deduction and information ranking work without a bundled word list',()=>{const words=['APPLE','AMPLE','MAPLE','ALIEN','ANGLE'];const cs=filterWords(words,[{guess:'ALIEN',marks:wordFeedback('APPLE','ALIEN')}]);assert(cs.includes('APPLE'));assert(cs.length<words.length);assert.equal(rankWords(cs,words).complete,true);assert.equal(rankWords(words,words,{budget:1}).complete,false);assert.throws(()=>dictionary(['AB','ABC']));assert.throws(()=>filterWords(words,[{guess:'APPLE',marks:[0,1]}]));});