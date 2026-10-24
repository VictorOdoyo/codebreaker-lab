export const $=id=>document.getElementById(id);
export function el(tag,attrs={},...children){const e=document.createElement(tag);for(const [key,value] of Object.entries(attrs)){if(key==='class')e.className=value;else if(key.startsWith('on'))e.addEventListener(key.slice(2),value);else e.setAttribute(key,value);}for(const child of children.flat())if(child!==null&&child!==undefined)e.append(child instanceof Node?child:document.createTextNode(String(child)));return e;}
export function replace(target,...children){target.replaceChildren(...children.flat());}
export function download(name,value,type='application/json'){const url=URL.createObjectURL(new Blob([typeof value==='string'?value:JSON.stringify(value,null,2)],{type})),a=el('a',{href:url,download:name});a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export function pegs(code,small=false){return el('span',{class:'pegs'+(small?' small':'')},code.map(x=>el('span',{class:'peg color-'+x,'aria-label':'symbol '+x},x)));}
export function number(x,digits=2){return Number.isFinite(x)?x.toFixed(digits):'—';}
