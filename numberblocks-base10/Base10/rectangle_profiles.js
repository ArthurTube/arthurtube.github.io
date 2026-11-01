/* Count-checked rectangle preferences transcribed from supplied screenshot references. */
(function(root){'use strict';const C=root.Base10Core;const closest=C.autoColumns;const widths={1:1,2:1,3:1,4:2,5:1,6:2,7:1,8:2,9:3,10:2,12:3,14:2,16:4,18:3,20:2,21:3,24:3,25:5,28:2,30:3,32:4,33:3,35:5,36:6,39:3,40:4,44:4,48:8,49:7,50:5,54:9,56:7,63:7,64:8,70:7,72:6,80:8,81:9,90:9,100:10};let policy='reference';
const specials={13:'Source character has an incomplete upper row.',15:'Source character uses a staircase.',17:'Source character has a special upper arrangement.',19:'Source character has an incomplete column arrangement.',22:'Source character has an incomplete upper row.',23:'Source character has an incomplete upper row.',26:'Source character has a special upper arrangement.',27:'Source character is shown as a 3 × 3 × 3 cube.',29:'Source character has an incomplete column arrangement.',31:'Source character has a special top arrangement.',34:'Source character has an incomplete upper arrangement.',37:'Source character has a special upper arrangement.',38:'Source character has a special upper arrangement.',41:'Source character has an incomplete upper arrangement.',43:'Source character uses a frame arrangement.',45:'Source character uses a staircase.',46:'Source character has a special upper arrangement.',47:'Source character has a special upper arrangement.',55:'Source character uses a staircase.'};
// Measured cell masks from the supplied screenshots, using top-left origin.
const row=(w,y)=>Array.from({length:w},(_,x)=>[x,y]);
const profiles={
12:{width:3,units:[[1,1],[1,2]],note:'Centered vertical orange pair inside ten.'},
16:{width:4,units:[[1,2],[2,2],...row(4,3)],note:'Purple six: centered pair above four bottom blocks.'},
18:{width:3,units:[...Array.from({length:6},(_,y)=>[2,y]),[0,5],[1,5]],note:'Pink eight: right column and bottom row.'},
25:{width:5,units:row(5,4),note:'Cyan five along the bottom row.'},
32:{width:4,units:[[1,1],[2,1]],note:'Orange horizontal pair centered in the second row.'},
35:{width:5,units:row(5,0),note:'Cyan five along the top row.'},
36:{width:6,units:row(6,5),note:'Purple six along the bottom row.'},
48:{width:8,units:row(8,0),note:'Pink eight along the top row; eight columns, six rows.'},
49:{width:7,units:Array.from({length:9},(_,i)=>[2+i%3,2+Math.floor(i/3)]),note:'Centered three-by-three grey nine inside forty.'},
64:{width:8,units:[[3,3],[4,3],[3,4],[4,4]],note:'Centered green two-by-two four inside sixty.'},
70:{width:7,stripes:true,note:'Seven vertical rainbow columns, red on the left through violet on the right.'},
81:{width:9,units:[[4,4]],note:'One red block at the center of eighty.'},
90:{width:9,stripes:true,note:'Three vertical grey bands, three columns per shade.'}
};
function placement(n,w){const p=profiles[n];return p&&(w===p.width||w===n/p.width)?p:null;}
function arrangeCells(n,w,cells){
 const p=placement(n,w);if(!p||root.Base10GroupLayouts?.has(n))return cells;
 const rotated=w!==p.width;
 const transform=([x,y])=>rotated?[n/p.width-1-y,x]:[x,y];
 const pos=([x,y])=>y*w+x;
 const output=Array(n);
 if(p.stripes){
  for(const q of cells){const sourceColumn=n===70?6-q.group:8-q.group;const ordinal=cells.filter(v=>v.group===q.group).findIndex(v=>v.index===q.index);const xy=transform([sourceColumn,ordinal]);output[pos(xy)]={...q,x:xy[0],y:xy[1]};}
 }else{
  const units=cells.filter(q=>q.place===0),body=cells.filter(q=>q.place!==0);
  p.units.map(transform).forEach((xy,i)=>output[pos(xy)]={...units[i],x:xy[0],y:xy[1]});
  let k=0;for(let i=0;i<n;i++)if(!output[i])output[i]={...body[k++],x:i%w,y:Math.floor(i/w)};
 }
 if(output.some(q=>!q)||output.filter(Boolean).length!==n)throw Error('Invalid reference block arrangement.');
 return output.map((q,index)=>({...q,index}));
}
function classify(n){
 C.check(n);const f=C.features(n);
 if(n===0)return 'zero';if(n===1)return 'one';
 if(f.prime)return 'prime';
 if(f.semiprime)return f.square?'semiprime · prime square':'semiprime · two distinct primes';
 return f.square?'composite · perfect square':'composite';
}
function describe(n){
 const type=classify(n);if(!n)return 'Zero has no body blocks.';
 const choices=C.pairs(n).map(([a,b])=>a+' × '+b).join(', ');
 return type+'; exact rectangles: '+choices+'.';
}
function info(n){C.check(n);if(n===0)return{number:0,columns:0,rows:0,kind:'zero',hint:'Zero has no blocks and no filled rectangle.'};const columns=policy==='reference'&&widths[n]?widths[n]:closest(n);return{number:n,columns,rows:n/columns,kind:policy==='reference'&&widths[n]?'reference-aligned':'closest-factors',hint:specials[n]||((C.features(n).prime&&n>3)?'A prime has only a 1 × '+n+' exact rectangle. Its source character may use an irregular compact shape.':'')};}
C.autoColumns=n=>n===0?1:info(n).columns;
root.Base10RectProfiles={widths,specials,profiles,placement,arrangeCells,info,classify,describe,setPolicy(value){if(!['reference','closest'].includes(value))throw Error('Unknown rectangle layout policy.');policy=value;},getPolicy:()=>policy};
})(typeof window==='object'?window:globalThis);
