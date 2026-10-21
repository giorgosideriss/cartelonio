/* Field help only. No calculation/token writes. */
(function(){
'use strict';
const byId=id=>document.getElementById(id);
const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!=null)el.textContent=text;return el;};
const button=(text,cls,fn)=>{const el=node('button',cls,text);el.type='button';if(fn)el.addEventListener('click',fn);return el;};
function dialog(id,title){
 const d=node('dialog','tools-dialog');d.id=id;d.setAttribute('aria-labelledby',id+'Title');
 const head=node('header','tools-dialog-head');const h=node('h2','',title);h.id=id+'Title';const close=button('×','tools-close',()=>d.close());close.setAttribute('aria-label','Κλείσιμο');head.append(h,close);d.append(head);document.body.append(d);
 d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});return d;
}
const help=dialog('fieldHelpDialog','Βοήθεια πεδίου');const helpText=node('p','tools-help-text');help.append(helpText);let helpReturn=null;help.addEventListener('close',()=>helpReturn?.focus?.({preventScroll:true}));
const topics={manualLtpf:['ΛΤΠΦ','Η Λιανική Τιμή Προ Φόρων της συγκεκριμένης έκδοσης. Δεν είναι η τιμή πώλησης της αγγελίας. Στη χειροκίνητη εισαγωγή έλεγξε ότι καταχωρίζεις την κατάλληλη τιμή προ φόρων.'],co2:['Εκπομπές CO₂','Συμπλήρωσε τις εκπομπές σε g/km από τα έγγραφα του αυτοκινήτου, όπως το CoC. Για παράδειγμα, 129 σημαίνει 129 g/km. Έλεγξε τη μέθοδο NEDC/WLTP και μην χρησιμοποιείς στοιχεία άλλης έκδοσης.'],euroClass:['Κατηγορία Euro','Η αντιρρυπαντική προδιαγραφή του συγκεκριμένου οχήματος, όπως τεκμηριώνεται στα έγγραφά του. Δεν ταυτίζεται με το καύσιμο και δεν προκύπτει πάντα μόνο από το έτος. Για αμιγώς ηλεκτρικό επίλεξε Electric.']};
for(const [id,[title,text]] of Object.entries(topics)){const labelEl=document.querySelector(`label[for="${id}"]`);if(!labelEl)continue;const b=button('ⓘ','field-help-button',e=>{e.preventDefault();e.stopPropagation();helpReturn=b;byId('fieldHelpDialogTitle').textContent=title;helpText.textContent=text;if(!help.open)help.showModal();});b.setAttribute('aria-label','Βοήθεια: '+title);b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls','fieldHelpDialog');labelEl.append(b);}
// The catalog LTPF is displayed in the vehicle summary rather than an editable label.
const ltpfLabel=document.querySelector('.summary-metric-label');if(ltpfLabel){const b=button('ⓘ','field-help-button',()=>{helpReturn=b;byId('fieldHelpDialogTitle').textContent=topics.manualLtpf[0];helpText.textContent=topics.manualLtpf[1];if(!help.open)help.showModal();});b.setAttribute('aria-label','Βοήθεια: ΛΤΠΦ');b.setAttribute('aria-haspopup','dialog');ltpfLabel.append(b);}
})();
