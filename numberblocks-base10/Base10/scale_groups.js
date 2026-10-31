(function(root){'use strict';
const C=root.Base10Core;
function info(n){C.check(n);if(n<10000)throw Error('Reference grouping supports10000 through1000000000000.');let unitValue=1000;while(n/unitValue>1000)unitValue*=1000;const groups=Math.floor(n/unitValue),remainder=n%unitValue;let width,height,depth;
 if(groups<=100){width=groups%10===0?groups/10:C.autoColumns(groups);height=groups/width;depth=1;}else{width=10;height=10;depth=Math.ceil(groups/100);}
 return{number:n,unitValue,groupSide:Math.round(Math.cbrt(unitValue)),groups,remainder,width,height,depth,capacity:width*height*depth,exact:groups*unitValue+remainder};
}
function model(n){const m=info(n),blocks=[];let cursor=0;
 function baseOf(g){return g.digit===7?C.rainbow[g.unit%7]:g.digit===9?C.grey[Math.floor(g.unit/3)]:C.colours[g.digit];}
 function emit(x,y,z,size,value,g,parity){blocks.push({x,y,z,size,value,start:cursor,place:g.place,digit:g.digit,base:baseOf(g),parity});cursor+=value;}
 let index=0;for(const g of C.groups(n)){if(g.value<m.unitValue)continue;for(let j=0;j<g.value/m.unitValue;j++){const z=Math.floor(index/(m.width*m.height)),r=index%(m.width*m.height),x=r%m.width,y=Math.floor(r/m.width);emit(x*m.groupSide,y*m.groupSide,z*m.groupSide,m.groupSide,m.unitValue,g,(x+y+z)%2);index++;}}
 function remainder(value,parentValue,ox,oy,oz){if(!value)return;const childValue=parentValue/1000,side=Math.round(Math.cbrt(childValue));let index=0;for(const g of C.groups(value)){if(g.value<childValue)continue;for(let j=0;j<g.value/childValue;j++){const x=index%10,y=Math.floor(index/10)%10,z=Math.floor(index/100);emit(ox+x*side,oy+y*side,oz+z*side,side,childValue,g,(x+y+z)%2);index++;}}if(childValue>1&&value%childValue){const x=index%10,y=Math.floor(index/10)%10,z=Math.floor(index/100);remainder(value%childValue,childValue,ox+x*side,oy+y*side,oz+z*side);}}
 remainder(m.remainder,m.unitValue,m.width*m.groupSide,(m.height-1)*m.groupSide,0);
 if(blocks.reduce((s,b)=>s+b.value,0)!==n)throw Error('Grouped count mismatch.');return{...m,blocks};
}
function render(n,count=-1){const m=model(n),active=count>=0,k=Math.min(n,Math.max(0,Math.floor(count))),project=(x,y,z)=>[x+z*.42,y-z*.24];
 const corners=[];for(const b of m.blocks)for(const x of[b.x,b.x+b.size])for(const y of[b.y,b.y+b.size])for(const z of[b.z,b.z+b.size])corners.push(project(x,y,z));const minX=Math.min(...corners.map(p=>p[0])),maxX=Math.max(...corners.map(p=>p[0])),minY=Math.min(...corners.map(p=>p[1])),maxY=Math.max(...corners.map(p=>p[1]));const scale=Math.min(365/(maxX-minX),248/(maxY-minY)),ox=(480-(maxX-minX)*scale)/2-minX*scale,oy=55-minY*scale;
 const point=(x,y,z)=>{const p=project(x,y,z);return[(ox+p[0]*scale),(oy+p[1]*scale)];},path=ps=>'M'+ps.map(p=>p.join(',')).join('L')+'Z';
 const tint=(c,f)=>'#'+[1,3,5].map(j=>{const v=parseInt(c.slice(j,j+2),16);return Math.round(f<0?v*(1+f):v+(255-v)*f).toString(16).padStart(2,'0');}).join('');
 const occupied=new Set(m.blocks.map(b=>b.size+':'+b.x+','+b.y+','+b.z));let art='';
 const blocks=m.blocks.slice().sort((a,b)=>b.z-a.z||a.y-b.y||a.x-b.x);
 for(const b of blocks){const s=b.size,glow=active?Math.min(1,Math.max(0,(k-b.start)/b.value)):0;const family=(b.place%3),front=family===1?(b.digit===1?'#f4f4ef':tint(b.base,.60)):family===2?tint(b.base,b.parity?.12:.36):b.base;
  const colours=[front,family===1?b.base:tint(front,-.13),tint(front,.08)].map(c=>glow?tint(c,glow*.36):c);
  const faces=[{name:'front',visible:!occupied.has(s+':'+b.x+','+b.y+','+(b.z-s)),at:(u,v)=>point(b.x+u*s,b.y+v*s,b.z)},
   {name:'right',visible:!occupied.has(s+':'+(b.x+s)+','+b.y+','+b.z),at:(u,v)=>point(b.x+s,b.y+v*s,b.z+u*s)},
   {name:'top',visible:!occupied.has(s+':'+b.x+','+(b.y-s)+','+b.z),at:(u,v)=>point(b.x+u*s,b.y,b.z+v*s)}];
  art+='<g data-group-value="'+b.value+'" data-group-start="'+b.start+'" data-group-place="'+b.place+'" data-grid-x="'+b.x+'" data-grid-y="'+b.y+'" data-grid-z="'+b.z+'" data-group-side="'+s+'" data-glow-fraction="'+glow+'">';
  for(let fi=2;fi>=0;fi--){const f=faces[fi];if(!f.visible)continue;const corners=[f.at(0,0),f.at(1,0),f.at(1,1),f.at(0,1)];art+='<path data-visible-face="'+f.name+'" d="'+path(corners)+'" fill="'+colours[fi]+'" stroke="'+(family===1?b.base:tint(b.base,-.55))+'" stroke-width="'+Math.max(.45,scale*s*.012)+'"/>';
   for(let step=1;step<s;step*=10){if(step*scale<.45)continue;for(let i=step;i<s;i+=step){const a=f.at(i/s,0),b2=f.at(i/s,1),c=f.at(0,i/s),d=f.at(1,i/s);art+='<path data-unit-surface-grid="true" data-grid-step="'+step+'" d="M'+a+'L'+b2+'M'+c+'L'+d+'" fill="none" stroke="#3f2323" stroke-opacity="'+(step===1?.25:.65)+'" stroke-width="'+(step===1?.1:.45)+'"/>';}}
  }art+='</g>';
 }
 const metadata={number:n,groupUnit:m.unitValue,groupCount:m.groups,remainder:m.remainder,groupDimensions:[m.width,m.height,m.depth],unitCubeDimensions:m.remainder?null:[m.width*m.groupSide,m.height*m.groupSide,m.depth*m.groupSide],exactCount:m.exact,representation:'Exposed faces of exact nested base1000cubes; hidden unit cubes included in exact count; generated body draft.'};
 return '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360" data-block-count="'+n+'" data-grouped-body="true" data-major-group-count="'+m.groups+'" data-group-unit="'+m.unitValue+'" data-remainder="'+m.remainder+'"'+(active?' data-counted-blocks="'+k+'"':'')+'><title>'+n+' grouped base10body</title><metadata>'+JSON.stringify(metadata)+'</metadata><text x="240" y="29" text-anchor="middle" font-family="sans-serif" font-size="23">'+String(n).replace(/\B(?=(\d{3})+(?!\d))/g,' ')+'</text>'+art+'<text x="240" y="326" text-anchor="middle" font-family="sans-serif" font-size="11">'+m.groups+' × '+String(m.unitValue).replace(/\B(?=(\d{3})+(?!\d))/g,',')+(m.remainder?' + '+m.remainder:'')+' = '+n+'</text><text x="240" y="344" text-anchor="middle" font-family="sans-serif" font-size="10">GENERATED GROUPED BODY · nested unit grid · hidden blocks included</text></svg>';
}
C.referenceGroupingInfo=info;C.referenceGroupingModel=model;C.referenceGroupingSVG=render;
})(typeof window==='object'?window:globalThis);
