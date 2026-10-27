/* Exact Project Aperials v3 examples from Secret//Sprite4.
   These are supplied costumes, not generated drafts. 262-1 is the default builder example. */
(()=>{
 const A='Project_Aperials_v3_Assets/';
 const examples=[
  {number:131,costume:'131',file:A+'b5ccb42c34ca4cb93e00acc0505dfd6d.svg'},
  {number:167,costume:'167',file:A+'291f3b3d4478ac7c5c52ee95cc8d91c1.svg'},
  {number:262,costume:'262-1',variant:1,file:A+'77346229f266ef78e551954beeba6ab6.svg',defaultExample:true},
  {number:262,costume:'262-2',variant:2,file:A+'019c43249cf174ace073c17fc51416a7.svg'},
  {number:968,costume:'968',file:A+'b944999978d90b3d788e1f9cd1aac840.svg'},
  {number:999,costume:'999',file:A+'f70bedd38c19b0ca9b005940221fd585.svg'},
  {number:1001,costume:'1001',file:A+'5931ae1346aa8ae72eb8e766ca548a5e.svg'},
  {number:1002,costume:'1002',file:A+'275158440c0288ac125ea824eccb3ec4.svg'}
 ];
 window.PROJECT_APERIALS_V3_EXAMPLES={sourceTarget:'Secret//Sprite4',range:'131–1002',blocks:0,sounds:1,examples,defaultCostume:'262-1',find(n,variant){return examples.find(e=>e.number===Number(n)&&(!variant||e.variant===Number(variant)))||null;}};
 function init(){
  const D=window.PROJECT_APERIALS_V3_EXAMPLES;if(!D)return;
  const root=document.querySelector('#projectAperialsV3'); if(!root)return;
  const box=document.createElement('section'); box.id='v3ExactExamples';
  box.style.cssText='margin-top:1rem;padding:1rem;border:1px solid #d9e0e7;border-radius:10px;background:#fff';
  box.innerHTML=`<h3>Aperial builder examples · Project Aperials v3</h3>
   <p><b>Secret//Sprite4</b> · 8 supplied costumes · range 131–1002. These exact costumes have priority over generated example artwork. <b>262-1</b> is the default example.</p>
   <label>Supplied example<br><select id="v3ExampleSelect"></select></label>
   <button id="v3ExampleOpen" type="button">Open exact blocks / costume</button>
   <button id="v3ExampleNumber" type="button">Open number in builder</button>
   <p id="v3ExampleInfo"></p><div id="v3ExamplePreview" style="min-height:220px;max-height:620px;overflow:auto;background:#111;border-radius:10px;padding:12px;text-align:center"></div>
   <hr style="margin:16px 0"><h4>Preview any Aperial example · 0–10079</h4>
   <p>Use this for <b>2001, 2002 and more</b>. Exact supplied v3 costumes stay first priority; other numbers use the same Aperial Builder block renderer and v3 source-rule classification.</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:end"><label style="flex:1;min-width:150px">Aperial number<br><input id="v3AnyNumber" type="number" min="0" max="10079" value="2001"></label><button id="v3AnyPrev" type="button">← Previous</button><button id="v3AnyBuild" type="button">Preview example</button><button id="v3AnyNext" type="button">Next →</button></div>
   <p id="v3AnyInfo"></p><div id="v3AnyPreview" style="min-height:220px;max-height:620px;overflow:auto;background:#111;border-radius:10px;padding:12px;text-align:center"></div>`;
  const details=root.querySelector('details'); root.insertBefore(box,details||null);
  const sel=box.querySelector('#v3ExampleSelect');
  D.examples.forEach((e,i)=>{const o=document.createElement('option');o.value=i;o.textContent=e.costume+(e.defaultExample?' · default example':'');sel.append(o)});
  sel.value=String(D.examples.findIndex(e=>e.defaultExample));
  const preview=()=>{const e=D.examples[+sel.value];box.querySelector('#v3ExampleInfo').innerHTML=`<b>${e.costume}</b> · Aperial ${e.number} · exact supplied SVG from ${D.sourceTarget}${e.number===262?' · variant '+e.variant:''}`;box.querySelector('#v3ExamplePreview').innerHTML=`<img src="${e.file}" alt="Aperial ${e.costume}" style="max-width:100%;max-height:570px"><p style="color:#aaa">Supplied v3 costume ${e.costume}; no generated block replacement.</p>`;};
  box.querySelector('#v3ExampleOpen').onclick=preview; sel.onchange=preview;
  box.querySelector('#v3ExampleNumber').onclick=()=>{const e=D.examples[+sel.value], n=document.querySelector('#number');if(n){n.value=e.number;document.querySelector('#single')?.click();} const vn=document.querySelector('#v3Number');if(vn){vn.value=e.number;document.querySelector('#v3Find')?.click();} preview();};
  const anyInput=box.querySelector('#v3AnyNumber'), anyInfo=box.querySelector('#v3AnyInfo'), anyPreview=box.querySelector('#v3AnyPreview');
  const buildAny=()=>{let n=Number(anyInput.value);if(!Number.isInteger(n)||n<0||n>10079){anyInfo.textContent='Enter an Aperial number from 0 to 10079.';return;}const exact=D.examples.find(e=>e.number===n);const rule=window.ProjectAperialsV3Rules?.ruleFor(n);if(exact){anyInfo.innerHTML=`<b>${n}</b> · exact supplied v3 example${n===262?' · default variant 262-1':''} · ${rule?.label||'source example'}`;anyPreview.innerHTML=`<img src="${exact.file}" alt="Aperial ${exact.costume}" style="max-width:100%;max-height:570px"><p style="color:#aaa">Exact supplied costume ${exact.costume}; generated blocks are not substituted.</p>`;return;}if(n>5100){const table=window.PROJECT_APERIALS_V3?.targets?.find(t=>t.name==='Aperial Table 0-10079');const page=Math.floor(n/100),c=table?.costumes?.[page],lo=page*100,hi=Math.min(10079,lo+99);anyInfo.innerHTML=`<b>${n}</b> · ${rule?.label||'Project Aperials v3 reference'} · ${rule?.authority||'v3 source/reference'} · table ${lo}–${hi}`;anyPreview.innerHTML=c&&c.format==='svg'?`<img src="${c.file}" alt="Project Aperials v3 ${lo}-${hi}" style="max-width:100%;max-height:570px"><p style="color:#aaa">Project Aperials v3 source page for ${n}. The Band Builder body renderer currently ends at 5100, so 5101–10079 are shown from the v3 source instead of inventing a block body.</p>`:`<p style="color:#aaa">Project Aperials v3 rule/reference found for ${n}, but this table page has no SVG preview.</p>`;return;}const mainNumber=document.querySelector('#number'), open=document.querySelector('#single');if(!mainNumber||!open){anyInfo.textContent='Main Aperial Builder controls are unavailable.';return;}mainNumber.value=n;open.click();setTimeout(()=>{const stage=document.querySelector('#stage');anyInfo.innerHTML=`<b>${n}</b> · ${rule?.label||'Aperial Builder generated review example'} · ${rule?.authority||'generated fallback'}`;anyPreview.innerHTML=stage?.innerHTML||'<p style="color:#aaa">Preview unavailable.</p>';const note=document.createElement('p');note.style.color='#aaa';note.textContent='Generated/reconstructed example. Supplied complete artwork keeps priority.';anyPreview.append(note);},0);};
  box.querySelector('#v3AnyBuild').onclick=buildAny;anyInput.onkeydown=e=>{if(e.key==='Enter')buildAny()};box.querySelector('#v3AnyPrev').onclick=()=>{anyInput.value=Math.max(0,Number(anyInput.value||0)-1);buildAny()};box.querySelector('#v3AnyNext').onclick=()=>{anyInput.value=Math.min(10079,Number(anyInput.value||0)+1);buildAny()};
  preview(); buildAny();
 }
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',init);else init();
})();
