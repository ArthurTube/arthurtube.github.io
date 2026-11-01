/* Supplied designs remain distinct from generated rectangle layouts. */
(function(){'use strict';
 const S=window.BASE10_SOURCE,E=window.Base10Editor;
 const panel=document.createElement('section');panel.innerHTML='<h2>Compare with supplied design</h2><p id="referenceNote"></p><div id="referenceImage" style="min-height:100px"></div><button id="useReference">Use supplied design for preview and export</button><h3>Browse reference numbers</h3><label for="referenceRange">Range</label><select id="referenceRange"><option value="51-99">51–99 · supplied designs</option><option value="101-243">101–243 · available supplied designs</option><option value="1-100">1–100 · available supplied designs</option></select><div id="referenceGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(96px,1fr));gap:8px;max-height:600px;overflow:auto"></div><p>These are supplied reference costumes, including possible fan-made designs. Presence here does not verify official status or exact block geometry. Generated drafts remain separate.</p>';
 document.querySelector('main section').after(panel);
 function img(svg,n){const i=document.createElement('img');i.alt=n+' supplied design';i.style.cssText='max-width:100%;max-height:260px;object-fit:contain';i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(E.clean(svg));return i;}
 let last='';function update(){const text=document.getElementById('number').value.trim();if(text===last)return;last=text;const n=Number(text),s=S.characters[n],view=document.getElementById('referenceImage');view.replaceChildren();document.getElementById('useReference').disabled=!s;
 document.getElementById('referenceNote').textContent=s?n+' · '+s.name+' · supplied artwork. Compare the internal colour positions, borders, face and limbs with the rectangle draft.':'No supplied complete design for '+text+'. The generated body remains a draft; internal placement is not verified.';
 if(s)view.append(img(s.svg,n));}
 function grid(){const [lo,hi]=document.getElementById('referenceRange').value.split('-').map(Number),g=document.getElementById('referenceGrid');g.replaceChildren();for(let n=lo;n<=hi;n++){const s=S.characters[n];const b=document.createElement('button');b.type='button';b.style.cssText='display:flex;flex-direction:column;align-items:center;min-height:120px';b.textContent=String(n)+(s?'':' · missing');b.disabled=!s;if(s){const i=img(s.svg,n);i.style.height='95px';b.append(i);b.onclick=()=>{document.getElementById('number').value=n;E.build();update();};}g.append(b);}}
 document.getElementById('referenceRange').onchange=grid;
 document.getElementById('useReference').onclick=()=>{document.getElementById('mode').value='source';E.build();};
 document.getElementById('number').addEventListener('change',update);document.getElementById('build').addEventListener('click',update);document.getElementById('examples').addEventListener('change',update);
 update();grid();
})();
