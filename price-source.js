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
  if(el){el.hidden=!isReference(value);el.innerHTML=badge(value);}
  const price=document.getElementById('price');
  if(price)price.setAttribute('aria-label',label(value,'ΛΤΠΦ οχήματος'));
 }
 function closeAll(){document.querySelectorAll('.ltpf-source-toggle[aria-expanded="true"]').forEach(button=>{button.setAttribute('aria-expanded','false');const message=button.nextElementSibling;if(message)message.hidden=true;});}
 document.addEventListener('click',event=>{
  const button=event.target.closest?.('.ltpf-source-toggle');
  if(!button){if(!event.target.closest?.('.ltpf-source-chip'))closeAll();return;}
  const opening=button.getAttribute('aria-expanded')!=='true';closeAll();button.setAttribute('aria-expanded',String(opening));
  if(button.nextElementSibling)button.nextElementSibling.hidden=!opening;
 });
 document.addEventListener('keydown',event=>{if(event.key==='Escape'){const focused=document.activeElement;closeAll();focused?.focus?.();}});
 global.CartelonioPriceSource={sourceOf,isGerman,isReference,label,note,badge,preview};
})(window);
