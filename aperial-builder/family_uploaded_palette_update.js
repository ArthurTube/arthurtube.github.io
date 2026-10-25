/* Resolve family body colours through the current uploaded-number colour layer. */
(()=>{
const u=window.AperialUploadedColours,checker=window.AperialCheckerCorrections,api=window.AperialFactorPatterns,prior=checker.familyColour;
function enabled(i){return u.enabled()&&i.familyMask&&i.familyMultiplier>1&&i.sourcePalette!==false&&!i.bodyRef&&!i.blockShapeCells&&!u.protectedNumber(i.n)&&!!u.data.entries[i.n]}
function colour(i,q,rows,t){if(!enabled(i))return null;const cols=i.familyBounds?.columns||Math.max(...window.PrimeFamilyBuilder.drawingCells(i,t).map(c=>c.x))+1,base=api.checkerColour({...i,sourceGlow:false},q.x,q.y,cols,rows,0);if(!i.sourceGlow||!(t>0))return base;const rest=prior(i,q,rows,0),now=prior(i,q,rows,t);return now==='#000000'&&rest!==now?now:u.motionColour(base,rest,now)}
checker.familyColour=function(i,q,rows,t){return colour(i,q,rows,t)||prior(i,q,rows,t)};
const info=document.createElement('p');info.className='hint';info.textContent='Generated family blocks use Uploaded Aperial colours1–2447 for their product number. The colour layer preserves the counted mask and empty outline positions. Newer supplied checkerboard diagrams keep priority. Individually painted blocks and finished311–340 are preserved.';$('familyBuild').after(info);
window.AperialFamilyUploadedPalette={enabled,colour};
})();
