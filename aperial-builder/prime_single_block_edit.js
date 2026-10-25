/* Open a separate counted prime body for one-square editing, preserving references. */
(()=>{
$('primeSingleBlockEdit').onclick=()=>{try{
 if(!bank)throw Error('Wait for the reference bank.');
 const n=Number($('primeColoursNumber').value),cells=window.PrimeShapeStudy.cells(n);
 window.PrimeFamilyBuilder.validateMask(n,cells);
 const i={n,a:1,b:n,custom:true,animated:false,primeShapeDraft:true,familyPrime:n,familyMultiplier:1,familyGroupWidth:1,familyMask:structuredClone(cells),blockShapeCells:structuredClone(cells),familyBounds:{columns:Math.max(...cells.map(c=>c[0]))+1,rows:Math.max(...cells.map(c=>c[1]))+1},sourceGlow:false,sourcePalette:true,familyFollowShape:false,faceRef:-1,armRef:-1,legRef:-1};
 initDraft(i);items=[i];choose(i);window.AperialBlockEditor.open();
 }catch(e){status(e.message)}
};
})();
