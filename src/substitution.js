import {ALPHABET,letters,transform} from './alphabet.js';
import {shuffle,random} from './rng.js';
export function substitutionKey(key){const k=letters(key);if(k.length!==26||new Set(k).size!==26)throw new RangeError('Substitution key must be a permutation of A..Z');return k;}
export function substitution(text,key,decrypt=false){const k=substitutionKey(key);return transform(text,x=>decrypt?k.indexOf(ALPHABET[x]):k.charCodeAt(x)-65);}
export function keywordKey(word){return [...new Set(letters(word)+ALPHABET)].join('');}
export function randomKey(seed=42){return shuffle(ALPHABET,random(seed)).join('');}
