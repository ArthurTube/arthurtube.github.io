/* Numeric 3 keeps its supplied yellow identity in automatic factor palettes. */
(()=>{
const yellow='#fffe2f';
function yellowShade(fill){if(typeof fill!=='string')return false;let rgb;if(/^#[0-9a-f]{6}$/i.test(fill))rgb=[1,3,5].map(p=>parseInt(fill.slice(p,p+2),16));else if(/^#[0-9a-f]{3}$/i.test(fill))rgb=[1,2,3].map(p=>parseInt(fill[p]+fill[p],16));else{const match=fill.match(/^rgba?\(\s*([\d.]+)[, ]+([\d.]+)[, ]+([\d.]+)/i);if(match)rgb=match.slice(1,4).map(Number)}if(!rgb)return false;const[r,g,b]=rgb;return r>=140&&g>=130&&Math.abs(r-g)<=65&&b<=Math.min(r,g)*.85}
function threeColour(x,y,t){const part=component(3,t);if(part?.cells?.length===3){const fill=part.grid[((x%part.cols)+part.cols)%part.cols+','+((y%part.rows)+part.rows)%part.rows];if(yellowShade(fill))return fill}return yellow}
const prior=sourceColour;sourceColour=function(n,x,y,t){return +n===3?threeColour(x,y,t):prior(n,x,y,t)};
window.AperialNumberColours={three:yellow,yellowShade,threeColour};
if(window.AperialBuilder)window.AperialBuilder.sourceColour=sourceColour;
})();

/* Numeric5 base is taken from the supplied WIP palette, not its pale costume. */
(()=>{
const cyan='#1af7ff',oldRest='#85faff',oldGlow='#e8feff',glow='#d4fdff';
function fiveColour(x,y,t){const part=component(5,t);if(part?.cells?.length===5){const key=((x%part.cols)+part.cols)%part.cols+','+((y%part.rows)+part.rows)%part.rows,fill=part.grid[key];if(typeof fill==='string'){const c=fill.toLowerCase();if(c===oldRest)return cyan;if(c===oldGlow)return glow;if(/^#[0-9a-f]{6}$/.test(c)){const[r,g,b]=[1,3,5].map(p=>parseInt(c.slice(p,p+2),16));if(g>=150&&b>=180&&r<Math.min(g,b))return fill}}}return cyan}
const previous=sourceColour;sourceColour=function(n,x,y,t){return +n===5?fiveColour(x,y,t):previous(n,x,y,t)};Object.assign(window.AperialNumberColours,{five:cyan,fiveColour,fiveDerivedGlow:glow});if(window.AperialBuilder)window.AperialBuilder.sourceColour=sourceColour;
})();
