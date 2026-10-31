/* Source-pattern combination. Composition remains a draft, not an official arrangement. */
(function(root){'use strict';const clone=x=>JSON.parse(JSON.stringify(x));const keys={'C':0,'C♯':1,'D':2,'D♯':3,'E':4,'F':5,'F♯':6,'G':7,'G♯':8,'A':9,'A♯':10,'B':11};
function gcd(a,b){while(b)[a,b]=[b,a%b];return a;}
function combine(A,B,n,a,b){A=clone(A);B=clone(B);if(A.beatsPerMinute!==B.beatsPerMinute||A.beatsPerBar!==B.beatsPerBar||A.ticksPerBeat!==B.ticksPerBeat)throw Error('Factor timing differs. Review tempo and meter in the source editors before combining.');
const bars=A.loopBars*B.loopBars/gcd(A.loopBars,B.loopBars);if(bars>64)throw Error('Combined reference loop exceeds 64 bars.');
// Song-level automation cannot be safely merged by assigning it to a channel.
for(const song of [A,B])for(const c of song.channels)if(c.type==='mod'&&c.patterns.some(p=>(p.notes||[]).length))throw Error('Active modulation needs a manual source review; automatic combination is blocked.');
const result=clone(A);result.name=`${n} = ${a} x ${b} - source layer draft`;result.scale='Free';result.introBars=0;result.loopBars=bars;result.channels=[];const groups={pitch:[],drum:[],mod:[]};
for(const [index,song]of [A,B].entries()){
 const offset=(keys[song.key]+12*(song.keyOctave||0))-(keys[A.key]+12*(A.keyOctave||0));if(!Number.isFinite(offset))throw Error('Unrecognized source key.');
 for(const c of song.channels){c.name=`${index?b:a} · ${c.name||'source '+c.type}`;const seq=c.sequence.slice(song.introBars||0,(song.introBars||0)+song.loopBars);if(!seq.length)throw Error('Source loop has no sequence.');c.sequence=Array.from({length:bars},(_,i)=>seq[i%seq.length]);
 if(c.type==='pitch')for(const p of c.patterns)for(const note of p.notes||[]){note.pitches=note.pitches.map(v=>v+offset);if(note.pitches.some(v=>v<0||v>95))throw Error('Source transposition exceeds the supported pitch range.');}
 (groups[c.type]||groups.pitch).push(c);
 }
}
// Empty modulation channels carry no automation and can be omitted without changing notes.
result.channels=[...groups.pitch,...groups.drum];if(groups.pitch.length>60||groups.drum.length>60)throw Error('Too many source channels.');
return {json:result,seconds:bars*A.beatsPerBar*60/A.beatsPerMinute,notes:'Original factor notes, rhythms and instruments retained; factor B pitches rebased to preserve concert pitch. Global mixer settings follow factor A. Combined arrangement requires listening review.'};
}
root.AperialSourceSongCombiner={combine};if(typeof module!=='undefined')module.exports=root.AperialSourceSongCombiner;
})(globalThis);
