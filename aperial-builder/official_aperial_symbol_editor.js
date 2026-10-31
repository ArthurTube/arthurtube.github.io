/* Exact supplied numerals take priority. Generated compositions are drafts. */
(()=>{'use strict';
const bank=window.APERIAL_OFFICIAL_SYMBOLS.entries;
for(const [n,e] of Object.entries(bank)){if(Number(n)>0&&typeof MASTER!=='undefined'&&MASTER[n])MASTER[n].name=e.name;}
const xml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
function nest(svg,x,y,w,h){return svg.replace(/<svg\b[^>]*>/,m=>m.replace(/\s(?:width|height|x|y)="[^"]*"/g,'').replace(/>$/,` x="${x}" y="${y}" width="${w}" height="${h}">`));}
function get(n){return bank[n]||null;}
function generated(n,a,b){
 if(get(n))return get(n);
 if(!a&&!b&&typeof PRIME_GLYPHS!=='undefined'&&PRIME_GLYPHS[n])return {number:n,name:(typeof MASTER!=='undefined'&&MASTER[n]?.name)||'',status:'draft',svg:PRIME_GLYPHS[n],rule:'Generated prime composition using uploaded template letter paths; pair follows existing builder data, not a supplied canonical glyph.'};
 if(!a&&!b){a=Math.floor(Math.sqrt(n));while(a>1&&n%a)a--;b=n/a;}
 if(!get(a)||!get(b))return null;
 return {number:n,name:'',status:'draft',rule:`Draft composition of supplied ${a} and ${b} symbols. No canonical derivation is asserted.`,svg:`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="180" viewBox="0 0 240 180"><title>${n} — draft composition ${a} × ${b}</title>${nest(get(a).svg,10,15,100,150)}${nest(get(b).svg,130,15,100,150)}</svg>`};
}
window.AperialSymbolBank={get,generate:generated,entries:bank};
const panel=document.createElement('section');panel.id='aperial-symbol-workshop';panel.style.cssText='margin:20px auto;padding:20px;max-width:1372px;background:white;border:1px solid #ccd7e5;border-radius:12px';
panel.innerHTML=`<h2 style="margin-top:0">Aperial symbols · supplied bank + draft generator</h2><p>540 source symbols (0–539), with 539 supplied names. Original ink colours are preserved. Lighter symbols may be unconfirmed in the original project. Complete character artwork is preserved.</p><div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center"><label>Number <input id="as-number" type="number" min="0" max="5100" step="1" value="307" style="width:110px"></label><button id="as-show">Show / generate</button><label>Optional composition <input id="as-a" type="number" min="0" max="539" placeholder="first symbol" style="width:110px"> × <input id="as-b" type="number" min="0" max="539" placeholder="second symbol" style="width:110px"></label><button id="as-svg">Download SVG</button><button id="as-json">Download symbol data</button><button id="as-apply">Use for current generated numberling</button></div><p id="as-status" role="status"></p><div id="as-preview" style="height:210px;background:#f4f6fa;display:flex;align-items:center;justify-content:center"></div><p><small>Source: “Official aperial numbers” by Aperial10080; inspired by Argam and credited to RodolfoYT12345. Source symbols are imported unchanged. New compositions are editable drafts, not official designs. This update does not generate new sounds or character animation.</small></p>`;
const main=document.querySelector('main');if(main)main.before(panel);else document.body.append(panel);
const $=id=>document.getElementById(id);let selected=null;
function show(){const n=Number($('as-number').value),av=$('as-a').value,bv=$('as-b').value,a=Number(av),b=Number(bv);
 if(!Number.isSafeInteger(n)||n<0||n>5100){selected=null;$('as-status').textContent='Enter a whole number from 0 to 5100.';return;}
 if(!get(n)&&(av!==''||bv!=='')&&(!av||!bv||a*b!==n)){selected=null;$('as-status').textContent='Both source symbols are required and their product must equal the number.';return;}
 selected=generated(n,av===''?null:a,bv===''?null:b);$('as-preview').replaceChildren();
 if(!selected){$('as-status').textContent=`${n}: no source symbol or supported draft composition. Choose two supplied factors, or import an approved SVG in the existing asset editor.`;return;}
 const doc=new DOMParser().parseFromString(selected.svg,'image/svg+xml');const svg=document.importNode(doc.documentElement,true);svg.setAttribute('width','180');svg.setAttribute('height','190');$('as-preview').append(svg);
 $('as-status').textContent=`${n}${selected.name?' · '+selected.name:''} · ${selected.status==='source'?'SUPPLIED SYMBOL · original colour preserved; confirmation follows source':'GENERATED DRAFT · '+selected.rule}`;
}
function download(name,data,type){const u=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);}
$('as-show').onclick=show;$('as-number').onchange=show;
$('as-svg').onclick=()=>{show();if(selected)download(`Aperial_${selected.number}_${selected.status}.svg`,selected.svg,'image/svg+xml');};
$('as-json').onclick=()=>{show();if(selected)download(`Aperial_${selected.number}_${selected.status}.json`,JSON.stringify(selected,null,2),'application/json');};
// Only opt-in generated costumes are changed; supplied complete characters stay untouched.
const previousDraft=typeof draft==='function'?draft:null;
if(previousDraft)draft=function(i,t=0){const s=previousDraft(i,t);if(!i.aperialSymbolSVG)return s;const d=new DOMParser().parseFromString(s,'image/svg+xml'),r=d.documentElement;if(r.localName!=='svg')return s;
 for(const e of [...r.querySelectorAll('text')])if(e.textContent.trim()===String(i.n)&&Number(e.getAttribute('y'))<=50)e.remove();
 const symbol=new DOMParser().parseFromString(i.aperialSymbolSVG,'image/svg+xml').documentElement;symbol.setAttribute('x','220');symbol.setAttribute('y','2');symbol.setAttribute('width','40');symbol.setAttribute('height','36');r.append(d.importNode(symbol,true));return new XMLSerializer().serializeToString(r);};
$('as-apply').onclick=()=>{show();if(!selected)return;if(typeof current==='undefined'||!current){$('as-status').textContent='Open a number or band first.';return;}if(current.n!==selected.number){$('as-status').textContent='Select the same number in the band and symbol panel first.';return;}if(typeof supplied==='function'&&supplied(current)){$('as-status').textContent='This complete supplied character is preserved. Download the symbol separately.';return;}current.aperialSymbolSVG=selected.svg;if(typeof draw==='function')draw(0);$('as-status').textContent='Applied to the current generated numberling; source costumes are preserved.';};
show();
})();
