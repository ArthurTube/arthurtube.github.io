/* Offline peak check at player volume 1.0. Only the song output gain is adjusted. */
(function(root){'use strict';
async function checkAndAdjust(engine,json,options={}){const sampleRate=44100,targetPeak=.90,maxPeak=.95;let candidate=JSON.parse(JSON.stringify(json));const attempts=[];const seconds=candidate.loopBars*candidate.beatsPerBar*60/candidate.beatsPerMinute;if(!Number.isFinite(seconds)||seconds<=0||seconds>60)throw Error('This loop is too long for automatic peak verification; review its mix manually.');
for(let attempt=0;attempt<5;attempt++){
 const initial=new engine.Song();initial.fromJsonObject(candidate);const code=initial.toBase64String();const song=new engine.Song(code);candidate=song.toJsonObject();const synth=new engine.Synth(song);synth.samplesPerSecond=sampleRate;synth.volume=1;synth.renderingSong=true;synth.isPlayingSong=true;synth.loopRepeatCount=-1;synth.computeLatestModValues();let peak=0,invalid=0;const count=Math.ceil((seconds*3)*sampleRate),size=2048;let sum=0;
 for(let start=0;start<count;start+=size){const n=Math.min(size,count-start),l=new Float32Array(n),r=new Float32Array(n);synth.synthesize(l,r,n,true);for(let k=0;k<n;k++){for(const x of [l[k],r[k]]){if(!Number.isFinite(x))invalid++;else{peak=Math.max(peak,Math.abs(x));sum+=x*x;}}}if(start%(size*48)===0&&options.yieldUI)await new Promise(resolve=>setTimeout(resolve,0));}
 if(invalid)throw Error('The generated audio contains invalid samples.');if(peak<1e-8)throw Error('The generated audio is silent.');attempts.push({peak,masterGain:candidate.masterGain,rms:Math.sqrt(sum/(2*count)),renderedSeconds:count/sampleRate});
 if(peak<=maxPeak)return{json:candidate,url:'https://jukeebox.github.io/#'+code,headroom:{playerVolume:1,sampleRate,passes:attempts.length,attempts,peak,targetPeak,maxPeak,cycles:3}};
 candidate.masterGain=candidate.masterGain*targetPeak/peak;
}
throw Error('The mix could not pass the peak check. No unchecked link was generated.');
}
root.AperialSoundHeadroom={checkAndAdjust};if(typeof module!=='undefined')module.exports=root.AperialSoundHeadroom;
})(globalThis);
