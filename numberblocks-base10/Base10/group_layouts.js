(function(root){'use strict';const maps=new Map(),history=new Map();
 function groups(n){root.Base10Core.check(n);return root.Base10Core.groups(n);}
 function validate(entries){if(!Array.isArray(entries)||entries.length>1000)throw Error('Invalid group arrangements.');const p=new Map();for(const e of entries){const gs=groups(e.number),ids=new Set(gs.map(g=>g.id));if(e.number===0||p.has(e.number)||!Array.isArray(e.order)||e.order.length!==gs.length||new Set(e.order).size!==gs.length||!e.order.every(id=>Number.isInteger(id)&&ids.has(id)))throw Error('Invalid group order. No arrangements were imported.');p.set(e.number,e.order.slice());}return p;}
 function apply(n,gs){const a=maps.get(n);if(!a)return gs;const by=new Map(gs.map(g=>[g.id,g]));return a.map(id=>by.get(id));}
 function move(n,id,to){const gs=groups(n),order=gs.map(g=>g.id),from=order.indexOf(id);if(from<0||!Number.isInteger(to)||to<0||to>=gs.length)throw Error('Choose a valid group and destination.');if(from===to)return;const h=history.get(n)||[];h.push(maps.has(n)?maps.get(n).slice():null);if(h.length>50)h.shift();history.set(n,h);order.splice(to,0,order.splice(from,1)[0]);maps.set(n,order);root.Base10BlockLayouts?.resetNumber(n);}
 function undo(n){const h=history.get(n)||[];if(h.length){const a=h.pop();if(a)maps.set(n,a);else maps.delete(n);root.Base10BlockLayouts?.resetNumber(n);}}
 function reset(n){root.Base10Core.check(n);maps.delete(n);history.delete(n);}
 function dump(){return [...maps].map(([number,order])=>({number,order:order.slice()}));}
 function commit(p){for(const[n,a]of p){maps.set(n,a);history.delete(n);}}
 root.Base10GroupLayouts={apply,move,undo,reset,dump,validate,commit,has:n=>maps.has(n)};
})(typeof window==='object'?window:globalThis);
