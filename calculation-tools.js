/* Floating field help: hover, keyboard focus and touch. */
(function(){
'use strict';
const tip=document.createElement('div');tip.id='fieldHelpTooltip';tip.className='field-help-tooltip';tip.setAttribute('role','tooltip');tip.hidden=true;
const heading=document.createElement('strong'),copy=document.createElement('p');tip.append(heading,copy);document.body.append(tip);
let active=null,pinned=false,timer=null;
const cancel=()=>{clearTimeout(timer);timer=null;};
function close(){cancel();if(active){active.removeAttribute('aria-describedby');active.setAttribute('aria-expanded','false');}active=null;pinned=false;tip.hidden=true;}
function position(){
 if(!active||tip.hidden)return;
 const r=active.getBoundingClientRect(),v=window.visualViewport;
 const left=v?.offsetLeft||0,top=v?.offsetTop||0,width=v?.width||window.innerWidth,height=v?.height||window.innerHeight;
 if(r.bottom<top||r.top>top+height||r.right<left||r.left>left+width){close();return;}
 tip.style.maxWidth=Math.max(0,Math.min(310,width-24))+'px';tip.style.maxHeight=Math.max(80,height-24)+'px';
 const box=tip.getBoundingClientRect();let y=r.bottom+10;
 if(y+box.height>top+height-12&&r.top-box.height-10>=top+12)y=r.top-box.height-10;
 tip.style.left=Math.max(left+12,Math.min(r.left,left+width-box.width-12))+'px';
 tip.style.top=Math.max(top+12,Math.min(y,top+height-box.height-12))+'px';
}
function open(b,title,text){cancel();if(active!==b){close();active=b;}heading.textContent=title;copy.textContent=text;copy.style.whiteSpace='pre-line';tip.hidden=false;b.setAttribute('aria-describedby',tip.id);b.setAttribute('aria-expanded','true');position();}
function later(){cancel();if(!pinned)timer=setTimeout(()=>{if(!tip.matches(':hover')&&active!==document.activeElement)close();},160);}
const topics={co2:()=>['Στοιχεία CO₂ της έκδοσης',window.CartelonioCo2Help||''],euroClass:['Κατηγορία Euro','Η αντιρρυπαντική προδιαγραφή του συγκεκριμένου οχήματος, όπως τεκμηριώνεται στα έγγραφά του. Δεν ταυτίζεται με το καύσιμο και δεν προκύπτει πάντα μόνο από το έτος. Για αμιγώς ηλεκτρικό επίλεξε Electric.']};

function attach(target,topic,id){
 if(!target)return;
 const content=()=>typeof topic==='function'?topic():topic;
 const [title]=content(),b=document.createElement('button');b.type='button';b.className='field-help-button';b.textContent='?';b.setAttribute('aria-label','Βοήθεια: '+title);b.setAttribute('aria-expanded','false');
 const reveal=()=>{const [heading,text]=content();if(!text){close();return;}open(b,heading,text);};
 const refresh=()=>{const [,text]=content();b.hidden=!text;if(!text)b.style.setProperty('display','none','important');else b.style.removeProperty('display');if(!text&&active===b)close();else if(active===b)reveal();};
 b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){if(active!==b)pinned=false;reveal();}});
 b.addEventListener('pointerleave',later);
 b.addEventListener('focus',reveal);
 b.addEventListener('blur',()=>{if(!pinned)close();});
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(active===b&&pinned){close();return;}reveal();if(active===b)pinned=true;});
 target.append(b);refresh();
 if(id==='co2')document.addEventListener('cartelonio:co2-help-updated',refresh);
}
for(const [id,topic] of Object.entries(topics))attach(document.querySelector(`label[for="${id}"]`),topic,id);
window.updateCatalogueCo2Note?.();
tip.addEventListener('pointerenter',cancel);tip.addEventListener('pointerleave',later);
document.addEventListener('pointerdown',e=>{if(active&&!active.contains(e.target)&&!tip.contains(e.target))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){close();e.preventDefault();}});
window.addEventListener('resize',position,{passive:true});window.addEventListener('scroll',position,{passive:true,capture:true});
window.visualViewport?.addEventListener('resize',position,{passive:true});window.visualViewport?.addEventListener('scroll',position,{passive:true});
})();
