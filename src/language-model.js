import {letters} from './alphabet.js';
import {integer,finite} from './validate.js';
import {CORPUS} from './corpus.js';
export function trainModel(value,{order=4,alpha=.1}={}){integer(order,1,4,'order');finite(alpha,.0001,10,'smoothing');const s=letters(value);if(s.length<order)throw new RangeError('Training corpus is too short');const maps=Array.from({length:order},()=>new Map()),contexts=Array.from({length:order},()=>new Map());for(let n=1;n<=order;n++)for(let i=0;i<=s.length-n;i++){const g=s.slice(i,i+n),ctx=g.slice(0,-1);maps[n-1].set(g,(maps[n-1].get(g)??0)+1);contexts[n-1].set(ctx,(contexts[n-1].get(ctx)??0)+1);}return {order,alpha,characters:s.length,maps,contexts};}
let defaultModel;
export function englishModel(){return defaultModel??=trainModel(CORPUS);}
export function languageScore(value,model=englishModel()){const s=letters(value);if(!s.length)return 0;let total=0;for(let i=0;i<s.length;i++){let weighted=0,weight=0;for(let n=1;n<=Math.min(model.order,i+1);n++){const gram=s.slice(i-n+1,i+1),ctx=gram.slice(0,-1),count=model.maps[n-1].get(gram)??0,den=model.contexts[n-1].get(ctx)??0,w=n*n;weighted+=w*Math.log((count+model.alpha)/(den+26*model.alpha));weight+=w;}total+=weighted/weight;}return total/s.length;}
