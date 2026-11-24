(function(root){
const rational=[
{label:'½x²',f:x=>.5*x*x,d:x=>x,xs:[-2,-1,1,2]},
{label:'½x² − x + 1',f:x=>.5*x*x-x+1,d:x=>x-1,xs:[-1,0,1,2]},
{label:'¼x³ − x',f:x=>.25*x**3-x,d:x=>.75*x*x-1,xs:[-2,-1,0,1,2]},
{label:'⅛x⁴ − ½x² − 1',f:x=>.125*x**4-.5*x*x-1,d:x=>.5*x**3-x,xs:[-2,-1,0,1,2]},
{label:'1,5x + 1',f:x=>1.5*x+1,d:x=>1.5,xs:[-2,-1,0,1]},
{label:'2 / x',f:x=>Math.abs(x)<1e-8?NaN:2/x,d:x=>-2/(x*x),xs:[-2,-1,1,2]},
{label:'−2 / (x − 1) + 1',f:x=>Math.abs(x-1)<1e-8?NaN:-2/(x-1)+1,d:x=>2/(x-1)**2,xs:[-1,0,2,3]}];
const exponential=[
{label:'e^(0,5x) − 1',f:x=>Math.exp(.5*x)-1,d:x=>.5*Math.exp(.5*x),xs:[-2,-1,0,1,2]},
{label:'2e^(−0,5x) − 2',f:x=>2*Math.exp(-.5*x)-2,d:x=>-Math.exp(-.5*x),xs:[-1,0,1,2]},
{label:'−e^(0,5x) + 2',f:x=>-Math.exp(.5*x)+2,d:x=>-.5*Math.exp(.5*x),xs:[-2,-1,0,1,2]}];
function generate(kind,previous){let pool=kind==='rational'?rational:kind==='exponential'?exponential:[...rational,...exponential];pool=pool.filter(e=>e.label!==previous);const e=pool[Math.floor(Math.random()*pool.length)],x0=e.xs[Math.floor(Math.random()*e.xs.length)];return {...e,x0,y0:e.f(x0)};}
function fit(points){if(points.length<2||points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)))return null;const n=points.length,mx=points.reduce((s,p)=>s+p.x,0)/n,my=points.reduce((s,p)=>s+p.y,0)/n;let xx=0,yy=0,xy=0;for(const p of points){xx+=(p.x-mx)**2;yy+=(p.y-my)**2;xy+=(p.x-mx)*(p.y-my);}if(xx+yy<.0001)return null;const a=.5*Math.atan2(2*xy,xx-yy);if(Math.abs(Math.cos(a))<.015)return null;const m=Math.tan(a);return {m,b:my-m*mx};}
function evaluate(line,e){let a=Math.abs(Math.atan(line.m)-Math.atan(e.d(e.x0)));a=Math.min(a,Math.PI-a);const distance=Math.abs(line.m*e.x0+line.b-e.y0)/Math.hypot(1,line.m);const score=Math.max(0,Math.min(100,100*Math.exp(-((a/.35)**2)-((distance/.65)**2))));return {score,passed:score>95,angle:a*180/Math.PI,distance};}
const api={rational,exponential,generate,fit,evaluate};if(typeof module!=='undefined')module.exports=api;else root.TangentMath=api;
})(globalThis);
