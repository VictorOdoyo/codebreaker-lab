import {text,integer} from './validate.js';
export const ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export function letters(s){return text(s).toUpperCase().replace(/[^A-Z]/g,'');}
export function indices(s){return Array.from(letters(s),c=>c.charCodeAt(0)-65);}
export function mod(n,m=26){return((n%m)+m)%m;}
export function transform(s,fn){text(s);let i=0;return s.replace(/[a-z]/gi,c=>{const v=fn(c.toUpperCase().charCodeAt(0)-65,i++);integer(v,0,25,'mapped letter');const out=ALPHABET[v];return c===c.toLowerCase()?out.toLowerCase():out;});}
