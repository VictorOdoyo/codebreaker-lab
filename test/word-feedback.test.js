import test from 'node:test';
import assert from 'node:assert/strict';
import {wordFeedback,wordFeedbackKey} from '../src/word-feedback.js';
test('word feedback assigns greens before consuming duplicate yellow matches',()=>{assert.deepEqual(wordFeedback('APPLE','ALLEY'),[2,1,0,1,0]);assert.deepEqual(wordFeedback('LEVEL','LEELE'),[2,2,1,1,0]);assert.equal(wordFeedbackKey([2,2,2,2,2]),242);assert.throws(()=>wordFeedback('ab','AB'));});