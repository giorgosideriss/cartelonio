/* Private-catalogue net-price provenance; no raw URLs or catalogue strings enter HTML. */
(function(global){
 'use strict';
 function unpack(value){if(typeof value==='string'){try{return JSON.parse(value);}catch(_){return {};}}return value&&typeof value==='object'?value:{};}
 function sourceOf(value){
  const v=unpack(value),p=unpack(v.input_provenance);
  return unpack(p.priceSource||v.priceSource||unpack(v.calculation_breakdown).provenance?.priceSource||v);
 }
 function isGerman(value){return sourceOf(value).market==='DE';}
 function isReference(value){return isGerman(value)||sourceOf(value).market==='GR'&&sourceOf(value).greekOfficialLtpf===false;}
 function label(value,fallback){return isGerman(value)?'ΛΤΠΦ Γερμανίας':isReference(value)?'Ελληνική καθαρή τιμή αναφοράς':fallback;}
 function note(value){
  if(!isReference(value))return '';
  const source=sourceOf(value);
  if(source.market==='GR')return 'Ελληνική δημοσιευμένη τιμή ηλεκτρικού πριν από επιδοτήσεις, με αφαίρεση ΦΠΑ 24%. Δεν αποτελεί πιστοποιημένο τελωνειακό τιμοκατάλογο ΛΤΠΦ.'+(source.deliveryFees==='unverified'?' Η συμπερίληψη εξόδων παράδοσης δεν έχει επιβεβαιωθεί· για πλήρη αξία χρησιμοποιήστε τα παραστατικά και τη χειροκίνητη εισαγωγή.':'');
  const origin=source.kind==='manufacturer_pricelist'?'γερμανικό τιμοκατάλογο':'δημοσιευμένες γερμανικές τιμές αναφοράς';
  return 'Χρησιμοποιείται καθαρή αξία από '+origin+', επειδή δεν βρέθηκε διαθέσιμος ελληνικός τιμοκατάλογος. Η τιμή είναι προ ΦΠΑ Γερμανίας. Δεν αποτελεί επίσημη ελληνική ΛΤΠΦ.';
 }
 function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function badge(value){
  if(!isReference(value))return '';
  const market=isGerman(value)?'DE':'GR';
  return '<span class="ltpf-source-chip"><button type="button" class="ltpf-source-toggle" aria-expanded="false" aria-label="Πληροφορίες για την προέλευση της καθαρής τιμής">'+market+' ⓘ</button><span class="ltpf-source-message" role="note" hidden>'+escapeHtml(note(value))+'</span></span>';
 }
 function preview(value){
  const el=document.getElementById('ltpfSourceIndicator');
  if(el){
   closeAll();
   // The theme uses display:contents and places direct label spans in one grid cell.
   // Keep the title and badge inside a single grid item instead of overlapping siblings.
   const label=el.closest('.summary-metric-label');
   const title=label&&Array.from(label.children).find(child=>child.tagName==='SPAN'&&child!==el);
   if(title&&!title.contains(el)){title.classList.add('ltpf-title-group');title.appendChild(el);}
   el.hidden=!isReference(value);el.innerHTML=badge(value);
  }
  const price=document.getElementById('price');
  if(price)price.setAttribute('aria-label',label(value,'ΛΤΠΦ οχήματος'));
 }
 let portal=null,activeButton=null,closeTimer=null;
 function cancelClose(){clearTimeout(closeTimer);closeTimer=null;}
 function closeAll(){
  cancelClose();
  document.querySelectorAll('.ltpf-source-toggle[aria-expanded="true"]').forEach(button=>button.setAttribute('aria-expanded','false'));
  if(portal)portal.hidden=true;activeButton=null;
 }
 function positionPortal(){
  if(!portal||portal.hidden||!activeButton)return;
  const v=window.visualViewport;
  const left=v?.offsetLeft||0,top=v?.offsetTop||0;
  const width=v?.width||window.innerWidth,height=v?.height||window.innerHeight;
  const margin=12,gap=8,rect=activeButton.getBoundingClientRect();
  portal.style.width=Math.min(320,width-margin*2)+'px';
  portal.style.maxHeight=Math.max(80,height-margin*2)+'px';
  const size=portal.getBoundingClientRect();
  const x=Math.max(left+margin,Math.min(rect.left,left+width-size.width-margin));
  let y=rect.bottom+gap;
  if(y+size.height>top+height-margin)y=rect.top-gap-size.height;
  y=Math.max(top+margin,Math.min(y,top+height-size.height-margin));
  portal.style.left=x+'px';portal.style.top=y+'px';
 }
 function showChip(chip){
  const button=chip?.querySelector('.ltpf-source-toggle');if(!button)return;
  cancelClose();
  if(!portal){
   portal=document.createElement('div');portal.id='ltpfSourcePopover';
   portal.className='ltpf-source-popover';portal.setAttribute('role','tooltip');
   document.body.appendChild(portal);
   portal.addEventListener('pointerenter',cancelClose);
   portal.addEventListener('pointerleave',event=>{if(!activeButton?.closest('.ltpf-source-chip')?.contains(event.relatedTarget))scheduleClose();});
  }
  closeAll();activeButton=button;
  portal.textContent=button.nextElementSibling?.textContent||'';
  portal.hidden=false;button.setAttribute('aria-expanded','true');
  button.setAttribute('aria-controls',portal.id);button.setAttribute('aria-describedby',portal.id);
  positionPortal();
 }
 function scheduleClose(){cancelClose();closeTimer=setTimeout(closeAll,160);}
 document.addEventListener('pointerover',event=>{
  if(event.pointerType==='touch')return;
  const chip=event.target.closest?.('.ltpf-source-chip');
  if(chip&&!chip.contains(event.relatedTarget))showChip(chip);
 });
 document.addEventListener('pointerout',event=>{
  if(event.pointerType==='touch')return;
  const chip=event.target.closest?.('.ltpf-source-chip');
  if(chip&&!chip.contains(event.relatedTarget)&&!portal?.contains(event.relatedTarget)&&!chip.contains(document.activeElement))scheduleClose();
 });
 document.addEventListener('focusin',event=>{const chip=event.target.closest?.('.ltpf-source-chip');if(chip)showChip(chip);});
 document.addEventListener('focusout',event=>{
  const chip=event.target.closest?.('.ltpf-source-chip');
  if(chip&&!chip.contains(event.relatedTarget)&&!chip.matches(':hover'))scheduleClose();
 });
 document.addEventListener('click',event=>{
  const chip=event.target.closest?.('.ltpf-source-chip');
  if(chip){showChip(chip);return;}
  if(!portal?.contains(event.target))closeAll();
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
 window.addEventListener('resize',positionPortal);
 window.addEventListener('scroll',positionPortal,true);
 window.visualViewport?.addEventListener('resize',positionPortal);
 window.visualViewport?.addEventListener('scroll',positionPortal);
 global.CartelonioPriceSource={sourceOf,isGerman,isReference,label,note,badge,preview};
})(window);
