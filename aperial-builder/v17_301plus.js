/* Explicit V17 reference reuse. Newly composed characters remain drafts. */
(()=>{
const panel=document.createElement('section');panel.innerHTML=`<h2>301+ from V17 references</h2><p class="hint">Load all 44 supplied V17 characters above 300. Their complete source costumes take priority over generated rectangles.</p><button id="v17LoadAll">Load V17 for 301+</button><button id="v17BuildBand">Build selected band with V17</button><label>Reference for a new draft</label><select id="v17Donor"><option value="">Load V17 first</option></select><label><input id="v17BorrowColours" type="checkbox" checked style="width:auto"> Borrow this reference's block colours and glow</label><button id="v17ApplyDonor">Apply reference to current draft</button><p id="v17Status" class="hint">Choose a donor explicitly; no universal face or shape rule is inferred.</p>`;document.querySelector('aside').prepend(panel);
const service=window.AperialReferenceWorkshop;
function donorOptions(){const selected=$('v17Donor').value;$('v17Donor').replaceChildren();for(const r of service.data.records.filter(r=>r.category==='V17')){let o=document.createElement('option');o.value=r.number;o.textContent=r.number+' · '+r.source_name;$('v17Donor').append(o)}if(selected)$('v17Donor').value=selected}
async function load301Plus(){if(!bank)throw Error('Wait for the main reference bank.');await service.loadWorkshop();let installed=[],preserved=[];for(const r of service.data.records.filter(r=>r.category==='V17'&&r.number>=301)){if(refs[r.number])preserved.push(r.number);else{service.registerReference(r);installed.push(r.number)}}service.clearWorkshopCaches();donorOptions();return{installed,preserved}}
async function loadAction(build){let buttons=[$('v17LoadAll'),$('v17BuildBand')];buttons.forEach(b=>b.disabled=true);try{$('v17Status').textContent='Loading V17 source references…';const r=await load301Plus();if(build)openBand();else if(current)choose(current);$('v17Status').textContent=r.installed.length+' complete V17 characters added; '+r.preserved.length+' existing references preserved. Original poses, limb changes and block glow are available.'}catch(e){$('v17Status').textContent=e.message}finally{buttons.forEach(b=>b.disabled=false)}}
$('v17LoadAll').onclick=()=>loadAction(false);$('v17BuildBand').onclick=()=>loadAction(true);
async function applyDonor(){if(!current||current.n<301)throw Error('Open a character numbered 301 or higher.');if(current.a===1)throw Error('Prime characters require their own face and shape artwork.');if(current.n===1728)throw Error('1728 is 12³. Import its cube artwork.');await service.loadWorkshop();const donor=+$('v17Donor').value,r=service.data.records.find(r=>r.category==='V17'&&r.number===donor);if(!r)throw Error('Select a V17 donor.');service.registerReference(r);service.clearWorkshopCaches();Object.assign(current,{custom:true,animated:true,faceRef:donor,armRef:donor,legRef:donor,bodyRef:$('v17BorrowColours').checked?donor:undefined,sourceGlow:true,sourcePalette:true,v17Reference:donor,referenceStatus:'Borrowed V17 animation draft; shape, face and colour placement need review'});delete current.faceSVG;delete current.faceFrames;delete current.faceSequence;initDraft(current);lastRenderKey='';choose(current);$('v17Status').textContent='Draft '+current.n+' borrows face, arms and legs from '+donor+(current.bodyRef?', including body colours/glow.':'.')+' Factor values are unchanged; square count follows the selected body grid. New music is not generated.';return current}
$('v17ApplyDonor').onclick=async()=>{try{await applyDonor()}catch(e){$('v17Status').textContent=e.message}};
let activeBodyRef=0;const earlierDraft=draft,earlierColour=sourceColour;
draft=function(i,t=0){const previous=activeBodyRef;activeBodyRef=i.bodyRef||0;try{return earlierDraft(i,t)}finally{activeBodyRef=previous}};
sourceColour=function(n,x,y,t){return earlierColour(activeBodyRef||n,x,y,t)};
const earlierEvents=eventTimes;eventTimes=function(i){const times=new Set(earlierEvents(i).map(t=>Math.round(t*1e6)));if(i.bodyRef&&i.sourceGlow&&refs[i.bodyRef]){const seq=refs[i.bodyRef].sequence||timeline(refs[i.bodyRef].target),sum=seq.reduce((s,e)=>s+e.duration,0);for(let base=0;sum>0&&base<6.4;base+=sum){let t=base;for(const e of seq){t+=e.duration;if(t<6.4)times.add(Math.round(t*1e6))}}}return[...times].sort((a,b)=>a-b).map(t=>t/1e6)};
const earlierSignature=poseSignature;poseSignature=function(i,t){return earlierSignature(i,t)+':V17body:'+i.bodyRef+':'+(i.bodyRef&&i.sourceGlow&&refs[i.bodyRef]?frame(refs[i.bodyRef],t):0)};
const earlierChoose=choose;choose=function(i){earlierChoose(i);if(i.v17Reference&&i.custom){$('badge').textContent='V17 COMBINATION DRAFT';$('warnings').textContent+=' V17 donor '+i.v17Reference+': borrowed motion/face, not a verified factor-family design.'}};
window.AperialV17Builder={load301Plus,applyDonor,get data(){return service.data}};
const restorePlan=$('restore').onchange;$('restore').onchange=async function(e){await restorePlan.call(this,e);try{const n=current?.v17Reference;if(n){await service.loadWorkshop();const r=service.data.records.find(r=>r.category==='V17'&&r.number===n);if(r){service.registerReference(r);service.clearWorkshopCaches();choose(current)}}}catch(err){$('v17Status').textContent='Saved V17 donor could not be restored: '+err.message}};
window.AperialBuilder={...window.AperialBuilder,draft,choose,eventTimes,asset,get refs(){return refs},get current(){return current},get items(){return items}};
})();

/* REAL_SOURCE_FACTOR_PAIR_301_PLUS — source-only; never generates missing assets. */
(function(){
"use strict";
const preferred=Object.freeze({360:[18,20]});
function pairs(n){n=Number(n);const r=[];for(let a=2;a*a<=n;a++)if(n%a===0)r.push([a,n/a]);return r;}
function choose(n){n=Number(n);if(preferred[n])return preferred[n].slice();const p=pairs(n);return p.length?p[p.length-1].slice():null;}
function source(n){
 const banks=[window.APERIAL_SOURCE_REFERENCES,window.APERIAL_SOURCE_BANK,window.APERIAL_ASSETS,
 window.ULTIMATE_ASSETS,window.SOURCE_REFERENCES,window.sourceReferences,window.sourceBank,window.aperialAssets];
 for(const b of banks){if(b && Object.prototype.hasOwnProperty.call(b,n))return b[n];
 if(b && Object.prototype.hasOwnProperty.call(b,String(n)))return b[String(n)];}
 return null;
}
function resolve(n,pair){
 n=Number(n); const p=Array.isArray(pair)?pair.map(Number):choose(n);
 if(n<301||!p||p.length!==2||p[0]*p[1]!==n)return {number:n,valid:false,pair:p||null,sources:[]};
 const A=source(p[0]),B=source(p[1]);
 return {number:n,valid:true,pair:p,sources:[
 {number:p[0],source:A,status:A?"supplied":"missing/unverified"},
 {number:p[1],source:B,status:B?"supplied":"missing/unverified"}],
 canUseBoth:!!(A&&B),policy:"real supplied sources only; never synthesize missing material"};
}
window.AperialRealSourceFactorPair=Object.freeze({pairs:pairs,choose:choose,source:source,resolve:resolve,preferred:preferred});
document.addEventListener("aperial-factor-pair-selected",e=>{
 const d=e.detail||{}; document.dispatchEvent(new CustomEvent("aperial-real-source-factor-references",{detail:resolve(d.number,d.pair)}));
});
})();

/* REAL_SOURCE_FACTOR_LIMB_REFERENCES_301_PLUS
   Reads limb references/motion only from supplied factor sources.
   Missing limbs remain missing/unverified. Nothing is synthesized.
*/
(function(){
"use strict";

function first(obj, keys){
  if(!obj) return null;
  for(const k of keys){
    if(obj[k] !== undefined && obj[k] !== null) return obj[k];
  }
  return null;
}

function limbBundle(source){
  if(!source) return null;
  const limbs = source.limbs || source.limbAssets || source.parts || source.costumeParts || source;
  const motion = source.limbMotion || source.motion || source.animation || source.animations || source.scripts || null;
  return {
    leftArm:first(limbs,["leftArm","left_arm","leftArmSVG","armLeft"]),
    rightArm:first(limbs,["rightArm","right_arm","rightArmSVG","armRight"]),
    leftLeg:first(limbs,["leftLeg","left_leg","leftLegSVG","legLeft"]),
    rightLeg:first(limbs,["rightLeg","right_leg","rightLegSVG","legRight"]),
    motion:motion
  };
}

function status(v){ return v === null || v === undefined ? "missing/unverified" : "supplied"; }

function resolveFactorLimbs(result){
  if(!result || !result.valid || !result.sources || result.sources.length!==2){
    return {valid:false, sources:[]};
  }
  return {
    valid:true,
    number:result.number,
    pair:result.pair.slice(),
    sources:result.sources.map(function(entry){
      const b=limbBundle(entry.source);
      return {
        number:entry.number,
        leftArm:b && b.leftArm,
        rightArm:b && b.rightArm,
        leftLeg:b && b.leftLeg,
        rightLeg:b && b.rightLeg,
        motion:b && b.motion,
        status:{
          leftArm:status(b && b.leftArm),
          rightArm:status(b && b.rightArm),
          leftLeg:status(b && b.leftLeg),
          rightLeg:status(b && b.rightLeg),
          motion:status(b && b.motion)
        }
      };
    }),
    policy:"real supplied factor limb assets and motion references only; never generate replacements"
  };
}

window.AperialRealSourceFactorLimbs=Object.freeze({
  limbBundle:limbBundle,
  resolve:resolveFactorLimbs
});

document.addEventListener("aperial-real-source-factor-references",function(e){
  const resolved=resolveFactorLimbs(e.detail);
  document.dispatchEvent(new CustomEvent("aperial-real-source-factor-limbs",{detail:resolved}));
});
})();
