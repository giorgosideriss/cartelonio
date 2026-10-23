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
function open(b,title,text){cancel();if(active!==b){close();active=b;}heading.textContent=title;copy.textContent=text;tip.hidden=false;b.setAttribute('aria-describedby',tip.id);b.setAttribute('aria-expanded','true');position();}
function later(){cancel();if(!pinned)timer=setTimeout(()=>{if(!tip.matches(':hover')&&active!==document.activeElement)close();},160);}
const topics={co2:['Εκπομπές CO₂','Συμπλήρωσε τις εκπομπές σε g/km από τα έγγραφα του αυτοκινήτου, όπως το CoC. Για παράδειγμα, 129 σημαίνει 129 g/km. Έλεγξε τη μέθοδο NEDC/WLTP και μην χρησιμοποιείς στοιχεία άλλης έκδοσης.'],euroClass:['Κατηγορία Euro','Η αντιρρυπαντική προδιαγραφή του συγκεκριμένου οχήματος, όπως τεκμηριώνεται στα έγγραφά του. Δεν ταυτίζεται με το καύσιμο και δεν προκύπτει πάντα μόνο από το έτος. Για αμιγώς ηλεκτρικό επίλεξε Electric.']};

function attach(target,topic){
 if(!target)return;const [title,text]=topic,b=document.createElement('button');b.type='button';b.className='field-help-button';b.textContent='?';b.setAttribute('aria-label','Βοήθεια: '+title);b.setAttribute('aria-expanded','false');
 b.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){if(active!==b)pinned=false;open(b,title,text);}});
 b.addEventListener('pointerleave',later);
 b.addEventListener('focus',()=>open(b,title,text));
 b.addEventListener('blur',()=>{if(!pinned)close();});
 b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();if(active===b&&pinned){close();return;}open(b,title,text);pinned=true;});
 target.append(b);
}
for(const [id,topic] of Object.entries(topics))attach(document.querySelector(`label[for="${id}"]`),topic);
tip.addEventListener('pointerenter',cancel);tip.addEventListener('pointerleave',later);
document.addEventListener('pointerdown',e=>{if(active&&!active.contains(e.target)&&!tip.contains(e.target))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active){close();e.preventDefault();}});
window.addEventListener('resize',position,{passive:true});window.addEventListener('scroll',position,{passive:true,capture:true});
window.visualViewport?.addEventListener('resize',position,{passive:true});window.visualViewport?.addEventListener('scroll',position,{passive:true});
})();
