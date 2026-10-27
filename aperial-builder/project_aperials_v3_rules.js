/* Project Aperials v3 source-rule hierarchy transcribed from the supplied v3 screenshots.
   These are source/reference classifications. They do not turn predictions/unknowns into canon. */
(()=>{
 const isPrime=n=>{n=Number(n);if(!Number.isInteger(n)||n<2)return false;if(n%2===0)return n===2;for(let d=3;d*d<=n;d+=2)if(n%d===0)return false;return true};
 const factors=n=>{let x=n,out=[];for(let p=2;p*p<=x;p+=(p===2?1:2))while(x%p===0){out.push(p);x/=p}if(x>1)out.push(x);return out};
 function numberClass(n){n=Number(n);if(!Number.isInteger(n)||n<0)return {id:'invalid',label:'Invalid'};
  if(n<=35)return {id:'base36',label:'0–35 · Base-36 Transdecimal · Independent Colors',authority:'v3 source rule'};
  if(isPrime(n)&&n>=37&&n<=127)return {id:'independent-prime',label:'37–127 primes · Independent Primes · Saturated and Dark Colors',authority:'v3 source rule'};
  if(isPrime(n)&&n>=131&&n<=5099)return {id:'twin1',label:'131–5099 primes · 1st Twin Color Primes · Minor Planets',authority:'v3 source rule'};
  if(isPrime(n)&&n>=5103&&n<=9901)return {id:'twin2',label:'5103–9901 primes · 2nd Twin Color Primes · Unknown',authority:'v3 source rule',status:'unknown'};
  if(isPrime(n)&&n>=9907&&n<=10079)return {id:'unknown-prime',label:'9907–10079 primes · Unknown',authority:'v3 source rule',status:'unknown'};
  return {id:'compound',label:'Compound · apply v3 Compound Functions before generated fallback',authority:'v3 source rule'};
 }
 function compoundRule(n){n=Number(n);const fs=factors(n),count=fs.length;
  if(!Number.isInteger(n)||n<2)return null;
  if(isPrime(n))return numberClass(n);
  if(count===2)return {id:'checker2',label:'2 Color Checker · x*y',formula:'x*y',factors:fs.slice(),authority:'v3 Compound Functions'};
  if(count===3)return {id:'stripes3',label:'3 Color Stripes · (x*y)*z / x*y*z',formula:'(x*y)*z',factors:fs.slice(),authority:'v3 Compound Functions'};
  if(count===4){const s=fs.slice().sort((a,b)=>a-b),r=Math.sqrt(n);const square=Number.isInteger(r);if(square||n>36*36*36)return {id:'superchecker4',label:'4 Color Superchecker · (a*b)*(c*d)',formula:'(a*b)*(c*d)',factors:s,authority:'v3 Compound Functions'};return {id:'stripes4',label:'4 Color Stripes · (a*b*c*d)',formula:'(a*b*c*d)',factors:s,authority:'v3 Compound Functions'};}
  const largePrime=fs.find(p=>p>127);
  if(largePrime)return {id:'large-prime-product',label:'n × >127 Prime · combines Twin Color Primes and Colors',formula:'n × >127 prime',factors:fs.slice(),prime:largePrime,authority:'v3 Compound Functions'};
  if(n>=10080)return {id:'base10080',label:'x(10080)+n · probably base-10080 centric',formula:'x(10080)+n',factors:fs.slice(),authority:'v3 Compound Functions',status:'probable / unconfirmed'};
  return {id:'compound-other',label:'Compound outside the explicitly shown v3 functions · keep as draft',factors:fs.slice(),authority:'generated fallback'};
 }
 function ruleFor(n){const c=numberClass(n);return c.id==='compound'?compoundRule(n):c}
 window.ProjectAperialsV3Rules={isPrime,factors,numberClass,compoundRule,ruleFor,statusLegend:{vacant:'red',confirmed:'green',prediction:'blue'}};
})();
