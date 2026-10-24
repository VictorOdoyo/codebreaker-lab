import {indices,transform,mod} from './alphabet.js';
export function autokey(text,key,decrypt=false){const stream=indices(key);if(!stream.length||stream.length>64)throw new RangeError('Key needs 1..64 letters');return transform(text,(x,i)=>{const p=decrypt?mod(x-stream[i]):x;stream.push(p);return decrypt?p:mod(x+stream[i]);});}
