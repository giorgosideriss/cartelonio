/* History comparison, print-to-PDF and field help. No calculation/token writes. */
(function(){
'use strict';
const byId=id=>document.getElementById(id);
const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text!=null)el.textContent=text;return el;};
const button=(text,cls,fn)=>{const el=node('button',cls,text);el.type='button';if(fn)el.addEventListener('click',fn);return el;};
const selected=new Map();
let owner=typeof cartelonioSession!=='undefined'?cartelonioSession?.user?.id||null:null;
const money=value=>value==null||value===''||!Number.isFinite(Number(value))?'—':Number(value).toLocaleString('el-GR',{style:'currency',currency:'EUR'});
const number=value=>value==null||value===''||!Number.isFinite(Number(value))?'—':Number(value).toLocaleString('el-GR');
const date=value=>value?String(value).slice(0,10).split('-').reverse().join('/'):'—';
const label=r=>[r.brand,r.model].filter(Boolean).join(' ')||'Χειροκίνητη εισαγωγή';
const unpack=v=>{if(typeof v==='string'){try{return JSON.parse(v)||{};}catch(_){return {};}}return v&&typeof v==='object'?v:{};};
function values(r){const stored=unpack(r.calculation_result||r.result_json||r.result);const saved=stored.result||stored;return {...r,total_tax:r.total_tax??saved.totalTax,registration_tax:r.registration_tax??saved.registrationTax,environmental_fee:r.environmental_fee??saved.environmentalFee,taxable_value:r.taxable_value??saved.finalPrice};}
function dialog(id,title){
 const d=node('dialog','tools-dialog');d.id=id;d.setAttribute('aria-labelledby',id+'Title');
 const head=node('header','tools-dialog-head');const h=node('h2','',title);h.id=id+'Title';const close=button('×','tools-close',()=>d.close());close.setAttribute('aria-label','Κλείσιμο');head.append(h,close);d.append(head);document.body.append(d);
 d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});return d;
}
const comparison=dialog('historyComparisonDialog','Σύγκριση υπολογισμών');
const compareContent=node('div','tools-comparison-content');comparison.append(compareContent);
let returnFocus=null;
comparison.addEventListener('close',()=>returnFocus?.focus?.({preventScroll:true}));
const bar=node('section','history-compare-bar');bar.hidden=true;bar.setAttribute('aria-label','Επιλογή σύγκρισης');
const selectionText=node('span','');const status=node('p','tools-status');status.setAttribute('role','status');
const openCompare=button('Σύγκρινε','tools-primary',()=>showComparison());const clear=button('Καθαρισμός','tools-secondary',()=>{selected.clear();sync();});bar.append(selectionText,openCompare,clear,status);
byId('historyList')?.before(bar);
function sync(){
 bar.hidden=selected.size===0;selectionText.textContent=`${selected.size}/2 επιλεγμένοι υπολογισμοί`;openCompare.disabled=selected.size!==2;status.textContent='';
 document.querySelectorAll('[data-comparison-id]').forEach(b=>{const on=selected.has(b.dataset.comparisonId);b.setAttribute('aria-pressed',String(on));b.textContent=on?'✓ Επιλέχθηκε για σύγκριση':'＋ Σύγκριση';});
}
function pick(record){
 if(selected.has(String(record.id)))selected.delete(String(record.id));
 else if(selected.size<2)selected.set(String(record.id),record);
 else {status.textContent='Έχεις επιλέξει δύο υπολογισμούς. Αφαίρεσε έναν για να επιλέξεις άλλον.';return;}
 sync();
}
window.cartelonioForgetComparison=id=>{selected.delete(String(id));sync();if(comparison.open)comparison.close();};
window.cartelonioOnAccountChange=id=>{if(id!==owner){owner=id;selected.clear();sync();compareContent.replaceChildren();if(comparison.open)comparison.close();}};
window.cartelonioEnhanceHistoryCard=(article,record)=>{
 const actions=node('div','tools-card-actions');
 if(!record.is_example){const pickBtn=button(selected.has(String(record.id))?'✓ Επιλέχθηκε για σύγκριση':'＋ Σύγκριση','tools-secondary',()=>pick(record));pickBtn.dataset.comparisonId=String(record.id);pickBtn.setAttribute('aria-pressed',String(selected.has(String(record.id))));actions.append(pickBtn);}
 actions.append(button('Αποθήκευση PDF','tools-secondary',()=>exportRecord(record)));article.append(actions);
};
function showComparison(){
 if(selected.size!==2)return;returnFocus=document.activeElement;compareContent.replaceChildren();const records=[...selected.values()].map(values);
 const note=node('p','tools-note','Σύγκριση των αποθηκευμένων αποτελεσμάτων, χωρίς νέο υπολογισμό ή χρήση tokens.');compareContent.append(note);
 const wrap=node('div','tools-table-wrap');const table=node('table','tools-comparison-table');const caption=node('caption','sr-only','Στοιχεία και ποσά δύο αποθηκευμένων υπολογισμών');table.append(caption);
 const thead=node('thead');const header=node('tr');const empty=node('th','','Στοιχείο');empty.scope='col';header.append(empty);records.forEach(r=>{const th=node('th','',label(r));th.scope='col';th.append(node('small','',[r.year,r.edition].filter(Boolean).join(' · ')));header.append(th);});thead.append(header);table.append(thead);
 const tbody=node('tbody');const rows=[['Ημερομηνία υπολογισμού',r=>date(r.created_at)],['Πρώτη άδεια',r=>date(r.first_registration)],['Ημερομηνία εισαγωγής',r=>date(r.import_date)],['Χιλιόμετρα',r=>number(r.mileage)],['ΛΤΠΦ',r=>money(r.ltpf)],['Αμάξωμα',r=>typeof r.body_type==='string'?r.body_type:'—'],['CO₂ (g/km)',r=>number(r.co2)],['Euro',r=>r.euro_class||'—'],['Τύπος κίνησης',r=>({electric:'Αμιγώς ηλεκτρικό',hybrid:'Υβριδικό',conventional:'Συμβατικό',ice:'Συμβατικό'})[r.powertrain]||r.powertrain||'—'],['Φορολογητέα αξία',r=>money(r.taxable_value)],['Τέλος ταξινόμησης',r=>money(r.registration_tax)],['Περιβαλλοντικό τέλος',r=>money(r.environmental_fee)],['Συνολικό Τέλος Ταξινόμησης',r=>money(r.total_tax)]];
 rows.forEach(([name,get])=>{const tr=node('tr');if(name.startsWith('Συνολικό'))tr.className='tools-total-row';const th=node('th','',name);th.scope='row';tr.append(th);records.forEach(r=>tr.append(node('td','',get(r))));tbody.append(tr);});table.append(tbody);wrap.append(table);compareContent.append(wrap);
 const totals=records.map(r=>r.total_tax);if(totals.every(v=>v!=null&&v!==''&&Number.isFinite(Number(v)))){const diff=Number(totals[1])-Number(totals[0]);compareContent.append(node('p','tools-difference',diff===0?'Ίδιο συνολικό τέλος.':`Το δεύτερο αυτοκίνητο έχει ${money(Math.abs(diff))} ${diff>0?'μεγαλύτερο':'μικρότερο'} συνολικό τέλος.`));}
 compareContent.append(button('Αποθήκευση σύγκρισης σε PDF','tools-primary',()=>openPrint(compareContent,'Σύγκριση υπολογισμών')));
 const details=node('div','tools-comparison-details');records.forEach(record=>{const column=node('section','history-result-view');column.setAttribute('aria-label',label(record));column.innerHTML=renderHistoryDashboard(record);initResultBreakdownTabs(column);const img=column.querySelector('.history-result-car-image');if(img){img.hidden=false;void historyImage(record,img);}details.append(column);});compareContent.append(details);
 if(!comparison.open)comparison.showModal();
}
function printShell(title){
 const w=window.open('','_blank');if(!w){alert('Επίτρεψε τα αναδυόμενα παράθυρα για να αποθηκεύσεις το PDF.');return null;}w.opener=null;
 w.document.open();w.document.write('<!doctype html><html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cartelonio — PDF</title><style>body{font:12px/1.6 Arial,sans-serif;color:#18251c;background:white;max-width:900px;margin:24px auto;padding:0 20px}h1{font-size:22px}h2,h3{font-size:16px}header{border-bottom:2px solid #557a43;padding-bottom:12px;margin-bottom:20px}button{padding:10px 16px;cursor:pointer}article,section{break-inside:avoid;margin:15px 0;padding:12px;border:1px solid #d7dfd2;border-radius:10px}img{max-width:100%;max-height:44px;object-fit:contain}.result-vehicle-image-wrap img{max-height:180px;display:block;margin:auto}.result-info-grid>div,.result-data-row,.result-detail-row{display:flex;justify-content:space-between;gap:20px;border-bottom:1px solid #e4e9e1;padding:5px}.result-info-grid strong,.result-detail-row strong{text-align:right}.result-total-card strong,.result-final-bar>strong{display:block;font-size:25px;color:#345728}small{display:block;color:#52644b}svg{width:16px;height:16px;fill:none;stroke:currentColor}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{text-align:left;vertical-align:top;border:1px solid #d7dfd2;padding:8px;overflow-wrap:anywhere}.tools-total-row{background:#edf3e6}.tools-comparison-details{display:block}.result-breakdown-head h3{margin-bottom:8px}.tools-note{color:#52644b}.sr-only{display:none}@page{size:A4;margin:14mm}@media print{body{margin:0;padding:0;max-width:none}.print-controls{display:none}.tools-comparison-content button{display:none}h1,h2,h3{break-after:avoid}a{color:inherit;text-decoration:none}}</style></head><body><div class="print-controls"><p>Στον διάλογο εκτύπωσης επίλεξε «Αποθήκευση ως PDF».</p><button id="printAgain" type="button">Αποθήκευση / Εκτύπωση</button></div><header><strong>Cartelonio · cartelonio.gr</strong><h1></h1><p id="printDate"></p></header><main></main><footer>Ενημερωτική εκτίμηση. Το οριστικό ποσό καθορίζεται από τις αρμόδιες τελωνειακές αρχές.</footer></body></html>');w.document.close();w.document.querySelector('h1').textContent=title;w.document.title='Cartelonio — '+title;w.document.getElementById('printDate').textContent='Εξαγωγή: '+new Date().toLocaleString('el-GR');w.document.getElementById('printAgain').addEventListener('click',()=>w.print());return w;
}
function printable(source){
 const clone=source.cloneNode(true);clone.querySelectorAll('script,iframe,object,embed,form,button,.result-breakdown-tabs,.tools-card-actions,.tools-primary').forEach(el=>el.remove());
 clone.querySelectorAll('[hidden]').forEach(el=>{el.hidden=false;});clone.querySelectorAll('*').forEach(el=>{for(const a of [...el.attributes])if(/^on/i.test(a.name))el.removeAttribute(a.name);});
 clone.querySelectorAll('img').forEach(img=>{img.removeAttribute('srcset');const src=img.getAttribute('src');if(!src){img.remove();return;}try{const url=new URL(src,document.baseURI);if(!['http:','https:'].includes(url.protocol)){img.remove();return;}img.src=url.href;img.loading='eager';}catch(_){img.remove();}});return clone;
}
async function fillPrint(w,source){
 if(!w||w.closed)return;const copy=w.document.importNode(printable(source),true);w.document.querySelector('main').append(copy);
 const images=[...w.document.images];await Promise.race([Promise.all(images.map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}))),new Promise(resolve=>setTimeout(resolve,7000))]);
 if(!w.closed){w.focus();w.print();}
}
function openPrint(source,title){const snapshot=source.cloneNode(true);const w=printShell(title);if(w)void fillPrint(w,snapshot);}
async function exportRecord(record){
 const w=printShell(label(record));if(!w)return;const content=node('div','history-result-view');content.append(node('p','',`Αποθηκευμένος υπολογισμός: ${date(record.created_at)}`));const dashboard=node('div');dashboard.innerHTML=renderHistoryDashboard(record);content.append(dashboard);
 const img=content.querySelector('.history-result-car-image');if(img){img.hidden=false;await historyImage(record,img).catch(()=>{});}await fillPrint(w,content);
}
const exportBtn=button('Αποθήκευση PDF','tools-secondary',()=>{const results=byId('results');if(results?.querySelector('.result-dashboard'))openPrint(results,'Αποτέλεσμα υπολογισμού');});exportBtn.id='resultExportPdf';exportBtn.disabled=true;byId('resultCard')?.querySelector('.result-heading-premium')?.append(exportBtn);
const results=byId('results');if(results){const update=()=>{exportBtn.disabled=!results.querySelector('.result-dashboard')||!!results.querySelector('.calculation-error-message');};new MutationObserver(update).observe(results,{childList:true,subtree:true});update();}
const help=dialog('fieldHelpDialog','Βοήθεια πεδίου');const helpText=node('p','tools-help-text');help.append(helpText);let helpReturn=null;help.addEventListener('close',()=>helpReturn?.focus?.({preventScroll:true}));
const topics={manualLtpf:['ΛΤΠΦ','Η Λιανική Τιμή Προ Φόρων της συγκεκριμένης έκδοσης. Δεν είναι η τιμή πώλησης της αγγελίας. Στη χειροκίνητη εισαγωγή έλεγξε ότι καταχωρίζεις την κατάλληλη τιμή προ φόρων.'],co2:['Εκπομπές CO₂','Συμπλήρωσε τις εκπομπές σε g/km από τα έγγραφα του αυτοκινήτου, όπως το CoC. Για παράδειγμα, 129 σημαίνει 129 g/km. Έλεγξε τη μέθοδο NEDC/WLTP και μην χρησιμοποιείς στοιχεία άλλης έκδοσης.'],euroClass:['Κατηγορία Euro','Η αντιρρυπαντική προδιαγραφή του συγκεκριμένου οχήματος, όπως τεκμηριώνεται στα έγγραφά του. Δεν ταυτίζεται με το καύσιμο και δεν προκύπτει πάντα μόνο από το έτος. Για αμιγώς ηλεκτρικό επίλεξε Electric.']};
for(const [id,[title,text]] of Object.entries(topics)){const labelEl=document.querySelector(`label[for="${id}"]`);if(!labelEl)continue;const b=button('ⓘ','field-help-button',e=>{e.preventDefault();e.stopPropagation();helpReturn=b;byId('fieldHelpDialogTitle').textContent=title;helpText.textContent=text;if(!help.open)help.showModal();});b.setAttribute('aria-label','Βοήθεια: '+title);b.setAttribute('aria-haspopup','dialog');b.setAttribute('aria-controls','fieldHelpDialog');labelEl.append(b);}
// The catalog LTPF is displayed in the vehicle summary rather than an editable label.
const ltpfLabel=document.querySelector('.summary-metric-label');if(ltpfLabel){const b=button('ⓘ','field-help-button',()=>{helpReturn=b;byId('fieldHelpDialogTitle').textContent=topics.manualLtpf[0];helpText.textContent=topics.manualLtpf[1];if(!help.open)help.showModal();});b.setAttribute('aria-label','Βοήθεια: ΛΤΠΦ');b.setAttribute('aria-haspopup','dialog');ltpfLabel.append(b);}
})();
