/* Explicit costume count for generated drafts; sources retain native animation. */
(()=>{
const previousChoose=choose;
choose=function(i){previousChoose(i);$('exportFrameCount').value=i.exportFrameCount??4;};
$('setFrameCount').onclick=()=>{try{
 if(!current)throw Error('Select a character first.');
 const count=Number($('exportFrameCount').value);
 if(!Number.isInteger(count)||count<0||count>240)throw Error('Enter a whole frame count from 0 to 240.');
 if(supplied(current))throw Error('This is a complete supplied sprite. Create an animated draft first to change its export frame count.');
 current.exportFrameCount=count;current.animated=true;current.custom=true;lastRenderKey='';draw();
 status(count?current.n+': 1 number rest costume + '+count+' animation costumes = '+(count+1)+' total. Only animation costumes play across 6.4 seconds.':current.n+': number rest costume + automatic source animation poses.');
 }catch(e){status(e.message)}
};
window.AperialBuilder={...window.AperialBuilder,choose,get current(){return current},get items(){return items},get refs(){return refs}};
})();
