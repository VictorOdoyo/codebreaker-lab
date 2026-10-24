import test from 'node:test';
import assert from 'node:assert/strict';
import {wordPattern,matchingWords} from '../src/word-pattern.js';
test('isomorphic word patterns preserve repeated-letter structure',()=>{assert.equal(wordPattern('MEET'),'0.1.1.2');assert.deepEqual(matchingWords('XYYZ',['MEET','FEEL','MELT','meet','TOOT']),['FEEL','MEET']);assert.notEqual(wordPattern('ABCA'),wordPattern('ABCD'));});