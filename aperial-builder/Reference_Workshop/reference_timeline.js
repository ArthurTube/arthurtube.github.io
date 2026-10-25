/* Sample explicit costume/wait scripts. This is not a full Scratch VM. */
function referenceTimeline(target) {
  const blocks=target.blocks||{}, costumes=target.costumes||[], candidates=[];
  for(const hat of Object.values(blocks)) {
    if(!['event_whenbroadcastreceived','event_whenflagclicked','event_whenthisspriteclicked'].includes(hat.opcode))continue;
    let pose=0,steps=0,events=[],warnings=[],loopStart=null;
    function val(input,depth=0) {
      if(depth>20)throw Error('Expression depth exceeded');
      const v=input?.[1]; if(Array.isArray(v))return v[1];
      const b=blocks[v]; if(!b)throw Error('Missing expression');
      const i=b.inputs||{};
      if(b.opcode==='looks_costume')return b.fields.COSTUME[0];
      if(b.opcode==='looks_costumenumbername')return b.fields.NUMBER_NAME?.[0]==='name'?costumes[pose].name:pose+1;
      if(b.opcode==='operator_add')return +val(i.NUM1,depth+1)+ +val(i.NUM2,depth+1);
      if(b.opcode==='operator_subtract')return +val(i.NUM1,depth+1)- +val(i.NUM2,depth+1);
      if(b.opcode==='operator_multiply')return +val(i.NUM1,depth+1)* +val(i.NUM2,depth+1);
      if(b.opcode==='operator_divide')return +val(i.NUM1,depth+1)/ +val(i.NUM2,depth+1);
      throw Error('Unsupported expression: '+b.opcode);
    }
    function run(id,depth=0) {
      while(id) {
        if(depth>16||steps++>12000)throw Error('Script limit exceeded');
        const b=blocks[id];if(!b)throw Error('Missing script block');const i=b.inputs||{};
        if(b.opcode==='looks_switchcostumeto') {
          const v=val(i.COSTUME), named=costumes.findIndex(c=>c.name===v);
          if(named>=0)pose=named;
          else if(Number.isFinite(+v))pose=((Math.round(+v)-1)%costumes.length+costumes.length)%costumes.length;
          else throw Error('Unresolved costume '+v);
        } else if(b.opcode==='looks_nextcostume')pose=(pose+1)%costumes.length;
        else if(b.opcode==='control_wait') {
          let duration=+val(i.DURATION);if(!Number.isFinite(duration)||duration<=0)throw Error('Invalid wait');
          events.push({costume:pose,duration});
        } else if(b.opcode==='control_repeat') {
          const n=+val(i.TIMES);if(!Number.isInteger(n)||n<0||n>200)throw Error('Unsupported repeat');
          for(let k=0;k<n;k++)run(i.SUBSTACK?.[1],depth+1);
        } else if(b.opcode==='control_forever') {loopStart=events.length;run(i.SUBSTACK?.[1],depth+1);return;}
        else if(b.opcode==='control_stop')return;
        else if(!/^(event_|sound_|looks_(show|hide)$)/.test(b.opcode)) warnings.push('Native block not simulated: '+b.opcode);
        id=b.next;
      }
    }
    try{run(hat.next)}catch(e){warnings.push(e.message)}
    candidates.push({events,warnings:[...new Set(warnings)],loop_start:loopStart});
  }
  candidates.sort((a,b)=>b.events.length-a.events.length);
  return candidates[0]||{events:[],warnings:['No costume/wait sequence found'],loop_start:null};
}
if(typeof module!=='undefined')module.exports={referenceTimeline};
