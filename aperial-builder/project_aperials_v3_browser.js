(()=>{
 const D=window.PROJECT_APERIALS_V3;if(!D)return;
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const table=D.targets.find(t=>t.name==='Aperial Table 0-10079');
 function init(){
  const host=document.querySelector('main')||document.body;
  const sec=document.createElement('section'); sec.id='projectAperialsV3';
  sec.innerHTML=`<h2>Project Aperials v3 · functional reference</h2>
  <p>This follows the v3 table navigation instead of treating the project as only an asset gallery. The original Scratch project remains the authority; generated builder drafts stay separate.</p>
  <div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:end">
   <label>Aperial number (0–10079)<br><input id="v3Number" type="number" min="0" max="10079" step="1" value="0" style="width:11rem"></label>
   <button id="v3Find" type="button">Find in v3 table</button><button id="v3Prev" type="button">◀ Previous 100</button><button id="v3Next" type="button">Next 100 ▶</button>
  </div>
  <p id="v3PageInfo"></p><div id="v3RuleInfo" style="padding:.7rem 1rem;margin:.5rem 0 1rem;background:#f7f1df;border-radius:8px"></div><div id="v3TablePreview" style="min-height:180px;max-height:600px;overflow:auto;background:#111;border-radius:10px;padding:12px;text-align:center"></div>
  <details style="margin-top:1rem"><summary><b>Browse all Project Aperials v3 targets / costumes</b></summary><div style="display:flex;gap:.6rem;flex-wrap:wrap;align-items:end;margin-top:.7rem"><label>Target<br><select id="v3Target"></select></label><label>Costume / reference<br><select id="v3Costume"></select></label><button id="v3Open" type="button">Open v3 reference</button></div><p id="v3Info"></p><div id="v3Preview" style="min-height:160px;max-height:520px;overflow:auto;background:#111;border-radius:10px;padding:12px;text-align:center"></div></details>`;
  const marker=document.querySelector('main section'); if(marker&&marker.parentNode)marker.parentNode.insertBefore(sec,marker); else host.prepend(sec);
  const num=sec.querySelector('#v3Number'), pinfo=sec.querySelector('#v3PageInfo'), rinfo=sec.querySelector('#v3RuleInfo'), tprev=sec.querySelector('#v3TablePreview');
  let currentPage=0;
  function showNumber(raw){
   let n=Number(raw); if(!Number.isFinite(n))n=0; n=Math.max(0,Math.min(10079,Math.trunc(n))); num.value=n;
   // Reproduces v3 Scratch Find logic: costume = floor(pa'Copy / 100) + 1.
   currentPage=Math.floor(n/100);
   const costumeIndex=currentPage; const c=table&&table.costumes[costumeIndex];
   const lo=currentPage*100, hi=Math.min(10079,lo+99), within=n-lo;
   pinfo.innerHTML=`<b>${n}</b> → v3 table page <b>${currentPage+1}</b> · range <b>${lo}–${hi}</b> · position in page <b>${within}</b>${currentPage===100?' · final partial page':''}`;
   const vr=window.ProjectAperialsV3Rules?.ruleFor(n); if(vr) rinfo.innerHTML=`<b>v3 source rule:</b> ${esc(vr.label)}${vr.formula?` · <code>${esc(vr.formula)}</code>`:''}${vr.factors?.length?` · factors ${esc(vr.factors.join(' × '))}`:''}${vr.status?` · <b>${esc(vr.status)}</b>`:''}<br><small>Double Color Prime map: red = Vacant · green = Confirmed · blue = Prediction. Source status is preserved; predictions/unknowns are not promoted to canon.</small>`;
   if(c&&c.format==='svg') tprev.innerHTML=`<img alt="Project Aperials v3 table ${lo}-${hi}" src="${esc(c.file)}" style="max-width:100%;max-height:560px;image-rendering:auto"><p style="color:#aaa">Original v3 costume ${esc(c.name)}. Page selected with the same floor(number ÷ 100)+1 rule used by the Scratch project.</p>`;
   else tprev.innerHTML='<p>That v3 table page is not available as an SVG costume.</p>';
  }
  sec.querySelector('#v3Find').onclick=()=>showNumber(num.value); num.onkeydown=e=>{if(e.key==='Enter')showNumber(num.value)};
  sec.querySelector('#v3Prev').onclick=()=>showNumber(Math.max(0,(currentPage-1)*100));
  sec.querySelector('#v3Next').onclick=()=>showNumber(Math.min(10079,(currentPage+1)*100));
  const ts=sec.querySelector('#v3Target'),cs=sec.querySelector('#v3Costume'),info=sec.querySelector('#v3Info'),prev=sec.querySelector('#v3Preview');
  D.targets.forEach((t,i)=>{let o=document.createElement('option');o.value=i;o.textContent=`${t.name} · ${t.costumes.length} costumes`;ts.append(o)});
  function fill(){let t=D.targets[+ts.value||0];cs.innerHTML='';t.costumes.forEach((c,i)=>{let o=document.createElement('option');o.value=i;o.textContent=c.name||`costume ${i+1}`;cs.append(o)});info.textContent=`${t.name}: ${t.costumes.length} costumes · ${t.blocks} Scratch blocks · ${t.sounds} sounds`;prev.innerHTML='<span style="color:#aaa">Choose a costume and open the v3 reference.</span>';}
  function open(){let t=D.targets[+ts.value||0],c=t.costumes[+cs.value||0];if(!c){prev.textContent='No costume in this target.';return}if(c.format==='svg'||c.format==='png')prev.innerHTML=`<img alt="${esc(c.name)}" src="${esc(c.file)}" style="max-width:100%;max-height:480px;image-rendering:auto"><p style="color:#aaa">${esc(t.name)} · ${esc(c.name)}</p>`;else prev.innerHTML=`<p>Reference asset: ${esc(c.name)} (${esc(c.format)}).</p>`;}
  ts.onchange=fill;sec.querySelector('#v3Open').onclick=open;cs.ondblclick=open;fill();showNumber(0);
 }
 if(document.readyState==='loading')addEventListener('DOMContentLoaded',init);else init();
})();
