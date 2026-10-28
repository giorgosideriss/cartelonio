/* German net-price provenance; no raw URLs or catalogue strings enter HTML. */
(function(global){
 'use strict';
 function unpack(value){if(typeof value==='string'){try{return JSON.parse(value);}catch(_){return {};}}return value&&typeof value==='object'?value:{};}
 function sourceOf(value){
  const v=unpack(value),p=unpack(v.input_provenance);
  return unpack(p.priceSource||v.priceSource||unpack(v.calculation_breakdown).provenance?.priceSource||v);
 }
 function isGerman(value){return sourceOf(value).market==='DE';}
 function note(value){
  if(!isGerman(value))return '';
  const source=sourceOf(value);
  const origin=source.kind==='manufacturer_pricelist'?'γερμανικό τιμοκατάλογο':'δημοσιευμένες γερμανικές τιμές αναφοράς';
  return 'Χρησιμοποιείται καθαρή αξία από '+origin+', επειδή δεν βρέθηκε διαθέσιμος ελληνικός τιμοκατάλογος. Η τιμή είναι προ ΦΠΑ Γερμανίας. Δεν αποτελεί επίσημη ελληνική ΛΤΠΦ.';
 }
 function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
 function badge(value){
  if(!isGerman(value))return '';
  return '<span class="ltpf-source-chip"><button type="button" class="ltpf-source-toggle" aria-expanded="false" aria-label="Πληροφορίες για τη ΛΤΠΦ Γερμανίας">DE ⓘ</button><span class="ltpf-source-message" role="note" hidden>'+escapeHtml(note(value))+'</span></span>';
 }
 function preview(value){
  const el=document.getElementById('ltpfSourceIndicator');
  if(el){el.hidden=!isGerman(value);el.innerHTML=badge(value);}
  const price=document.getElementById('price');
  if(price)price.setAttribute('aria-label',isGerman(value)?'ΛΤΠΦ Γερμανίας — ενδεικτική καθαρή αξία':'ΛΤΠΦ οχήματος');
 }
 function closeAll(){document.querySelectorAll('.ltpf-source-toggle[aria-expanded="true"]').forEach(button=>{button.setAttribute('aria-expanded','false');const message=button.nextElementSibling;if(message)message.hidden=true;});}
 document.addEventListener('click',event=>{
  const button=event.target.closest?.('.ltpf-source-toggle');
  if(!button){if(!event.target.closest?.('.ltpf-source-chip'))closeAll();return;}
  const opening=button.getAttribute('aria-expanded')!=='true';closeAll();button.setAttribute('aria-expanded',String(opening));
  if(button.nextElementSibling)button.nextElementSibling.hidden=!opening;
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){const focused=document.activeElement;closeAll();focused?.focus?.();}});
 global.CartelonioPriceSource={sourceOf,isGerman,note,badge,preview};
})(window);
