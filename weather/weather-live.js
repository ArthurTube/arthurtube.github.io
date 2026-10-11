"use strict";
const form=document.getElementById('Forecast'), input=document.getElementById('Name'), units=document.getElementById('temperature-unit'), content=document.getElementById('content');
let generation=0, selected=null;
const escapeHTML=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rounded=x=>Number.isFinite(x)?Math.round(x):'unavailable';
function temperature(c){if(!Number.isFinite(c))return 'unavailable';const f=rounded(c*9/5+32),v=rounded(c);return units.value==='celsius'?v+' C':units.value==='fahrenheit'?f+' F':f+' F ('+v+' C)';}
function weather(code,night=false){if(code===0)return ['Clear',night?'Moon':'Sun'];if(code===1||code===2)return ['Partly cloudy',night?'MoonCloudy':'PartlyCloudy'];if(code===3)return ['Overcast','Clouds'];if(code===45||code===48)return ['Fog','Foggy'];if([71,73,75,77,85,86].includes(code))return ['Snow','Snow'];if([95,96,99].includes(code))return ['Thunderstorms','Thunder'];if(Number.isFinite(code))return ['Rain or drizzle','Rain'];return ['Unavailable','Clouds'];}
async function json(url){const c=new AbortController(),t=setTimeout(()=>c.abort(),15000);try{const response=await fetch(url,{signal:c.signal});if(!response.ok)throw Error('Service returned HTTP '+response.status);const data=await response.json();if(data.error)throw Error(data.reason||'Service error');return data;}finally{clearTimeout(t);}}
function status(message){content.replaceChildren();const p=document.createElement('p');p.setAttribute('role','status');p.textContent=message;content.append(p);}
function clock(value){const t=String(value||'').split('T')[1];if(!t)return 'unavailable';const h=Number(t.slice(0,2));return (h%12||12)+t.slice(2,5)+' '+(h<12?'AM':'PM');}
function observationTime(c,data){const date=String(c.time||'').split('T')[0],parts=date.split('-'),month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][Number(parts[1])-1];return clock(c.time)+' '+parts[2]+' '+month+' '+String(parts[0]).slice(-2)+' '+(data.timezone_abbreviation||data.timezone||'');}
function proxyWeatherHTML(location,data){
 const c=data.current,d=data.daily;const wx=weather(c.weather_code,c.is_day===0),city=location.name;
 const suffix=location.postcode?' ('+location.postcode+')':'';
 const compass=['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
 const direction=Number.isFinite(c.wind_direction_10m)?compass[Math.round(c.wind_direction_10m/22.5)%16]:'unavailable';
 const skies=([0,1,2,3,45,48].includes(c.weather_code)?wx[0]:(c.cloud_cover<=10?'clear':c.cloud_cover<=30?'mostly clear':c.cloud_cover<=65?'partly cloudy':c.cloud_cover<=85?'mostly cloudy':'overcast')).toLowerCase();
 const field=(label,value)=>label+': <b>'+value+'</b><br>';
 let s='<div class="drop"><table align="center"><tr><td width="99%" valign="top"><br><font face="Arial, Helvetica, sans-serif"><big><b>Latest Observation for '+escapeHTML(city+suffix)+'</b></big></font><br><table width="99%"><tr><td width="100" valign="top"><p align="center"><img src="weather_assets/'+wx[1]+'.png" width="100" height="100" alt="Weather"><br><font face="Arial, Helvetica, sans-serif"><b>Temp: '+temperature(c.temperature_2m)+'</b></font></p></td><td valign="top"><font face="Arial, Helvetica, sans-serif">';
 s+=field('Site',escapeHTML(city)+' (Open-Meteo)')+field('Time',escapeHTML(observationTime(c,data)))+field('Temp',temperature(c.temperature_2m));
 if(Number.isFinite(c.dew_point_2m))s+=field('Dewpt',temperature(c.dew_point_2m));
 s+=field('Rel Hum',rounded(c.relative_humidity_2m)+'%')+field('Winds',direction+' at '+rounded(c.wind_speed_10m/1.852)+' knt');
 if(Number.isFinite(c.apparent_temperature)&&c.apparent_temperature<c.temperature_2m)s+=field('Feels like',temperature(c.apparent_temperature));
 if(Number.isFinite(c.pressure_msl))s+=field('Pressure (sea level)',c.pressure_msl.toFixed(1)+' mb');
 if(Number.isFinite(c.visibility))s+=field('Visibility',(c.visibility/1609.344).toFixed(1)+' mi');
 s+=field('Skies',escapeHTML(skies))+field('Weather',[0,1,2,3].includes(c.weather_code)?'':wx[0].toLowerCase())+'</font></td><td valign="top"><font face="Arial, Helvetica, sans-serif"><b>Almanac</b><br>'+field('Sunrise',clock(d.sunrise?.[0]))+field('Sunset',clock(d.sunset?.[0]))+'</font></td></tr></table><small>Temperature: <a href="#" data-unit="fahrenheit">Fahrenheit</a> | <a href="#" data-unit="celsius">Celsius</a> | <a href="#" data-unit="both">Both</a></small><br><table><tr><td><b>Regional Plots:</b></td><td>Live plots unavailable for this location.</td></tr></table><hr><b>Alerts'+(location.country_code==='BR'?' (INMET)':'')+'</b><br>Live alerts are unavailable in this public version.<hr><b>Forecast Summary</b><br><div style="overflow-x:auto"><table width="100%" border="1" cellpadding="3"><tr>';
 const offset=(c.is_day===0||Number(String(c.time).slice(11,13))>=12)&&d.time.length>=8?1:0;
 const value=v=>Number.isFinite(v)?rounded(units.value==='celsius'?v:v*9/5+32):'?';
 for(let i=offset;i<Math.min(offset+7,d.time.length);i++){const wx=weather(d.weather_code?.[i]);s+='<td align="center" valign="top"><font face="Arial, Helvetica, sans-serif">'+new Date(d.time[i]+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'long',timeZone:'UTC'}).toUpperCase()+'<br><img src="weather_assets/'+wx[1]+'-s.png" width="50" height="50" alt="Weather"><br>HI: '+value(d.temperature_2m_max?.[i])+'<br>LO: '+value(d.temperature_2m_min?.[i])+'</font></td>';}
 s+='</tr></table></div><hr><font face="Arial, Helvetica, sans-serif"><b>Detailed forecast from Open-Meteo:</b><br>'+escapeHTML(city.toUpperCase())+' AREA</font><table width="100%">';
 for(let i=offset;i<Math.min(offset+7,d.time.length);i++){const wx=weather(d.weather_code?.[i]);s+='<tr><td width="15%" align="center"><img src="weather_assets/'+wx[1]+'-s.png" width="50" height="50" alt="Weather"></td><td width="85%" valign="top"><font face="Arial, Helvetica, sans-serif"><b>'+escapeHTML(d.time[i])+'<br>High '+temperature(d.temperature_2m_max?.[i])+'. Low '+temperature(d.temperature_2m_min?.[i])+'.<br></b>'+wx[0]+'. Rain chance '+rounded(d.precipitation_probability_max?.[i])+'%. Maximum wind '+rounded(d.wind_speed_10m_max?.[i]/1.852)+' knt.</font></td></tr>';}
 return s+'</table><hr><small>Open-Meteo model weather · CEP: BrasilAPI / ViaCEP · Arthur Tube public continuation. Detailed narrative and live alert services differ from the Python proxy.</small></td></tr></table></div>';
}
async function forecast(location){selected=location;const token=++generation;status('Getting current weather…');try{const q=new URLSearchParams({latitude:location.latitude,longitude:location.longitude,current:'temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,is_day,cloud_cover,visibility,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m',daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max,sunrise,sunset',forecast_days:8,timezone:'auto'});const data=await json('https://api.open-meteo.com/v1/forecast?'+q);if(token!==generation)return;if(!data.current||!data.daily?.time?.length)throw Error('Incomplete forecast data');content.innerHTML=proxyWeatherHTML(location,data);content.querySelectorAll('[data-unit]').forEach(a=>a.addEventListener('click',event=>{event.preventDefault();units.value=a.dataset.unit;content.innerHTML=proxyWeatherHTML(location,data);forecast(location);}));}catch(e){if(token===generation)status('Unable to get current weather. '+e.message+' Please try again.');}}
const brazilStates={AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',DF:'Federal District',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins'};
const normalized=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
async function resolveLocations(name){
 const cep=/^\d{5}-?\d{3}$/.test(name)?name.replace('-',''):null;
 if(cep){
  let address;
  try{const data=await json('https://brasilapi.com.br/api/cep/v2/'+cep);if(!data.city||!data.state)throw Error('CEP unavailable');address={city:data.city,state:data.state};}
  catch(first){try{const data=await json('https://viacep.com.br/ws/'+cep+'/json/');if(data.erro||!data.localidade||!data.uf)throw Error('CEP not found');address={city:data.localidade,state:data.uf};}catch(second){throw Error('Could not resolve this Brazilian CEP. Check the CEP or search for your city and state.');}}
  const state=brazilStates[address.state];if(!state)throw Error('The CEP returned an unknown state.');
  // Resolve a city in its CEP state, never select a namesake in another state.
  const data=await json('https://geocoding-api.open-meteo.com/v1/search?'+new URLSearchParams({name:address.city,count:100,language:'en',format:'json',countryCode:'BR'}));
  const matches=(data.results||[]).filter(x=>x.country_code==='BR'&&normalized(x.name)===normalized(address.city)&&[state,address.state,address.state==='DF'?'Distrito Federal':state].some(s=>normalized(s)===normalized(x.admin1).replace(/^estado (de |do |da )?/,'')));
  if(!matches.length)throw Error('CEP found for '+address.city+', '+address.state+', but forecast coordinates are unavailable.');
  // The forecast is for the municipality, not a precise street observation.
  return [{...matches.sort((a,b)=>(b.population||0)-(a.population||0))[0],postcode:cep.slice(0,5)+'-'+cep.slice(5)}];
 }
 const params={name,count:30,language:'en',format:'json'};
 // Unqualified city searches default to Brazil; qualify another country explicitly.
 if(!name.includes(','))params.countryCode='BR';
 const data=await json('https://geocoding-api.open-meteo.com/v1/search?'+new URLSearchParams(params));
 let results=data.results||[];const exact=results.filter(x=>normalized(x.name)===normalized(name.split(',')[0]));if(exact.length)results=exact;const municipalities=results.filter(x=>normalized(x.admin2)===normalized(x.name));if(municipalities.length===1)results=municipalities;
 return results.sort((a,b)=>(Number(normalized(b.admin2)===normalized(b.name))-Number(normalized(a.admin2)===normalized(a.name)))||((b.population||0)-(a.population||0))).slice(0,1);
}
form.addEventListener('submit',async event=>{event.preventDefault();selected=null;const name=input.value.trim();if(name.length<2){status('Enter a city or Brazilian CEP, such as Formosa or 73813-101.');return;}const token=++generation;status('Searching for '+name+'…');try{const results=await resolveLocations(name);if(token!==generation)return;if(!results.length){status('Location not found. Try a city and state, or an eight-digit Brazilian CEP. For other countries, enter city, country.');return;}forecast(results[0]);}catch(e){if(token===generation)status('Location search failed. '+e.message);}});
units.addEventListener('change',()=>{if(selected)forecast(selected);});
const query=new URLSearchParams(location.search),name=query.get('Name')||query.get('place');if(name){input.value=name;form.requestSubmit();}
