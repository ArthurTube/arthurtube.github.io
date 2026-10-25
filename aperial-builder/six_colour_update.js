/* Numeric6 body identity and its numbered rainbow slots; source drawings stay intact. */
(()=>{
const purple='#723bc2',data=window.APERIAL_NUMERIC_PATTERNS,api=window.AperialFactorPatterns,originalProfile=api.profile,previous=sourceColour;
const alias={6:new Set(['#a5b9ff']),7:new Set(['#8021d9']),14:new Set(['#8220e3']),21:new Set(['#8220e3'])};
const sort=cells=>cells.map(c=>[...c]).sort((a,b)=>a[1]-b[1]||a[0]-b[0]);
function correct(n,fill){return alias[+n]?.has(String(fill).toLowerCase())?purple:fill}
function sixProfile(t){originalProfile(6,t);const r=refs[6],ci=r&&t>0?frame(r,t):0;return sort(data[6].frames[ci%data[6].frames.length].cells).map(([x,y,fill])=>[x,y,correct(6,fill)])}
api.profile=function(n,t=0){if(+n===6&&data[6])return sixProfile(t);const p=originalProfile(n,t);return p&&alias[+n]?p.map(([x,y,fill])=>[x,y,correct(n,fill)]):p};
sourceColour=function(n,x,y,t=0){if(+n===6&&data[6]){const p=sixProfile(t),cols=Math.max(...p.map(c=>c[0]))+1,rows=Math.max(...p.map(c=>c[1]))+1;return(p.find(c=>c[0]===((x%cols)+cols)%cols&&c[1]===((y%rows)+rows)%rows)||p[0])[2]}return correct(n,previous(n,x,y,t))};
const previousAt=api.colourAt;api.colourAt=function(n,index,t=0,depth=0){if(+n===6&&data[6]){const p=sixProfile(t);return p[((index%p.length)+p.length)%p.length][2]}return correct(n,previousAt(n,index,t,depth))};
function groupColour(i,q,t){const p=sixProfile(t),index=q.dy*i.familyGroupWidth+q.dx;return p[((index%6)+6)%6][2]}
const priorChecker=api.checkerColour;api.checkerColour=function(i,x,y,cols,rows,t){if(!i.blockShapeCells&&i.sourcePalette!==false&&(i.a===6||i.b===6)){const n=(x+rows-1-y)%2===0?i.a:i.b;if(n===6){const index=cols===6?x:rows===6?y:Math.floor((y*cols+x)/2);return api.colourAt(6,index,t)}}return priorChecker(i,x,y,cols,rows,t)};
const panel=document.createElement('section');panel.innerHTML='<h2>Times 6 · purple blocks</h2><p class="hint">Six’s own body colours and animation repeat within each six-block group. Prime-family ×6 uses the selected group width, normally 2 × 3. The other factor keeps its colours.</p><button id="correctTimesSix">Create corrected ×6 draft for this number</button>';
document.querySelector('aside').prepend(panel);
const priorChoose=choose;choose=function(i){if(i.custom&&(i.a===6||i.b===6||i.familyMultiplier===6)&&i.exportFrameCount===undefined)i.exportFrameCount=0;priorChoose(i)};
$('correctTimesSix').onclick=()=>{try{if(!bank||!current||current.n%6)throw Error('Select a multiple of 6 first.');if(current.blockShapeCells)throw Error('This body has individually edited blocks. Use its colour editor or start a new factor draft.');const old=current,i={...old,a:6,b:old.n/6,custom:true,animated:true,sourceGlow:true,sourcePalette:true,bodyRef:undefined,exportFrameCount:0};if(!i.familyMask)i.columns=6;if(!old.custom&&refs[old.n])Object.assign(i,{faceRef:old.n,armRef:old.n,legRef:old.n});initDraft(i);items=items.map(q=>q===old?i:q);choose(i);lastRenderKey='';draw();status('Corrected ×6 draft: 6 × '+i.b+'. Six’s colours and animation use automatic source timing. Original reference kept.');}catch(e){status(e.message)}};
window.AperialSixColour={purple,correct,originalProfile,sixProfile,groupColour};window.AperialBuilder={...window.AperialBuilder,sourceColour,choose,get current(){return current},get items(){return items},get refs(){return refs}};
})();
