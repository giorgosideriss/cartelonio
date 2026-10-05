(function(){
  async function setup(){
    const panel=document.getElementById('listingPanel');if(!panel)return;
    const input=document.getElementById('listingUrl'),text=document.getElementById('listingText'),button=document.getElementById('listingReadBtn'),status=document.getElementById('listingStatus'),results=document.getElementById('listingResults');
    let generation=0;
    function clear(){generation++;results.replaceChildren();status.textContent='';}
    input.addEventListener('input',clear);text.addEventListener('input',clear);
    button.addEventListener('click',async()=>{
      const run=++generation;button.disabled=true;results.replaceChildren();status.textContent='Ανάγνωση αγγελίας… Μπορεί να χρειαστούν έως 60–75 δευτερόλεπτα.';
      try {
        const {rankCandidates,normalize}=await import('./listing-utils.mjs?v=20261002-1');
        await Promise.all([catalogReady,cartelonioAuthReady]);
        if(!cartelonioSession?.access_token)throw Error('Χρειάζεται ενεργή σύνδεση για την εισαγωγή.');
        const res=await fetch(`${CARTELONIO_API_BASE}/listing-import`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${cartelonioSession.access_token}`},body:JSON.stringify({url:input.value.trim()||undefined,text:text.value.trim()||undefined}),signal:AbortSignal.timeout(90000)});
        const payload=await res.json();
        const errors={apify_token_missing:'Δεν έχει δηλωθεί το APIFY_API_TOKEN στο Supabase.',apify_auth_error:'Το Apify απέρριψε το API token ή την πρόσβαση στον scraper.',apify_credit_error:'Δεν υπάρχει διαθέσιμη πίστωση στο Apify.',apify_timeout:'Η ανάγνωση ξεπέρασε το χρονικό όριο. Δοκίμασε επικόλληση κειμένου.',apify_no_results:'Το Apify δεν επέστρεψε αγγελία. Έλεγξε αν είναι ακόμη ενεργή.',apify_listing_mismatch:'Το Apify επέστρεψε διαφορετική αγγελία. Η εισαγωγή ακυρώθηκε.',apify_request_failed:'Απέτυχε το αίτημα Apify. Έλεγξε τα Logs στο Supabase.',apify_invalid_output:'Το Apify επέστρεψε μη αναμενόμενη μορφή δεδομένων.',autoscout_provider_not_configured:'Η σύνδεση URL με Apify είναι προς το παρόν διαθέσιμη για mobile.de. Για AutoScout24 χρησιμοποίησε επικόλληση κειμένου.',quota_unavailable:'Δεν είναι διαθέσιμος ο έλεγχος ορίου εισαγωγών. Έλεγξε το SQL στο Supabase.',invalid_listing_url:'Βάλε σύνδεσμο συγκεκριμένης αγγελίας από mobile.de ή AutoScout24 (.de/.com/.ch).',rate_limited:'Έφτασες το όριο των 20 εισαγωγών ανά ώρα. Δοκίμασε αργότερα.',invalid_listing_input:'Βάλε URL ή επικόλλησε το κείμενο με τα τεχνικά στοιχεία.',unauthorized:'Ανανέωσε τη σελίδα και συνδέσου ξανά.'};
        if(!res.ok)throw Error(errors[payload.error]||`Δεν ήταν δυνατή η εισαγωγή (${payload.error||res.status}). Δοκίμασε επικόλληση κειμένου.`);
        if(run!==generation)return;
        const listing=payload.listing;
        const query=' '+normalize(listing.brand+' '+listing.title)+' ';
        const aliases={'VW':'Volkswagen','Mercedes':'Mercedes-Benz'};
        let brands=Object.keys(DATA_SOURCES).filter(b=>query.includes(' '+normalize(b)+' '));
        if(!brands.length)brands=Object.entries(aliases).filter(([a])=>query.includes(' '+normalize(a)+' ')).map(([,b])=>b).filter(b=>DATA_SOURCES[b]);
        if(brands.length!==1)throw Error('Δεν αναγνωρίστηκε μοναδική μάρκα στον κατάλογο. Επίλεξε το όχημα από τον κατάλογο.');
        if(!listing.registration)throw Error('Δεν αναγνωρίστηκε η πρώτη άδεια. Πρόσθεσε το σχετικό πεδίο στο κείμενο της αγγελίας.');
        const brand=brands[0],year=String(listing.registration.year),source=DATA_SOURCES[brand][year];
        if(!source)throw Error(`Δεν υπάρχει κατάλογος ${brand} για το ${year}. Επίλεξε χειροκίνητα το κατάλληλο έτος καταλόγου.`);
        status.textContent='Αναζήτηση πιθανών εκδόσεων…';
        const response=await fetch(`${CARTELONIO_API_BASE}/catalog?brand=${encodeURIComponent(source.slug)}&year=${encodeURIComponent(source.year)}`,{signal:AbortSignal.timeout(15000)});
        if(!response.ok)throw Error('Ο κατάλογος δεν είναι διαθέσιμος αυτή τη στιγμή.');
        const data=await response.json();if(run!==generation)return;
        const candidates=rankCandidates(listing,[{year,data}],brand);
        const summary=document.createElement('p');summary.textContent=`${listing.title} · ${listing.registration.month}/${year} · ${listing.mileage==null?'Χιλιόμετρα άγνωστα':listing.mileage.toLocaleString('el-GR')+' km'}`;results.append(summary);
        for(const warning of listing.warnings){const p=document.createElement('p');p.className='listing-warning';p.textContent=warning;results.append(p);}
        if(!candidates.length){status.textContent='Δεν βρέθηκε αξιόπιστη αντιστοίχιση. Χρησιμοποίησε την επιλογή από κατάλογο.';return;}
        status.textContent='Επίλεξε την ακριβή έκδοση. Η ομοιότητα είναι ένδειξη αναζήτησης, όχι επιβεβαίωση ταύτισης.';
        candidates.forEach(candidate=>{
          const pick=document.createElement('button');pick.type='button';pick.className='listing-candidate';
          pick.textContent=`${candidate.brand} → ${candidate.year} → ${candidate.model} → ${candidate.name} · Ομοιότητα ${candidate.score}/100${candidate.conflicts.length?' · Διαφορά στα τεχνικά στοιχεία':''}`;
          pick.addEventListener('click',()=>{
            if(run!==generation)return;
            document.querySelector('[data-input-mode="catalog"]').click();
            const brandEl=document.getElementById('brandSelect');brandEl.value=brand;brandEl.dispatchEvent(new Event('change',{bubbles:true}));
            // The native select has a separate custom brand label.
            const brandOption=[...document.querySelectorAll('.brand-option')].find(x=>x.dataset.value===brand);brandOption?.click();
            document.getElementById('yearSelect').value=year;
            currentDataset=data;populateModels();document.getElementById('modelSelect').value=candidate.model;
            populateVersions();document.getElementById('versionSelect').value=String(candidate.editionIndex);populateColors();
            document.getElementById('mileage').value=listing.mileage==null?'':String(listing.mileage);
            const reg=listing.registration,yearEl=document.getElementById('firstRegYear');yearEl.value=String(reg.year);yearEl.readOnly=false;
            document.getElementById('firstRegMonth').value=String(reg.month);document.getElementById('firstRegDay').value=reg.day?String(reg.day):'';syncFirstRegistrationDate();updateCarSummary();
            // Registration tax fields remain sourced from the selected catalogue.
            // Listing price, advertised Euro/CO2 and equipment are never guessed.
            results.replaceChildren();status.textContent='Η επιλογή συμπληρώθηκε. Έλεγξε έκδοση, παραλλαγή ΛΤΠΦ, ημερομηνία και χιλιόμετρα πριν υπολογίσεις.';
            const note=document.getElementById('listingAppliedNote');note.hidden=false;note.textContent=status.textContent+(reg.day?'':' Απαιτείται η ακριβής ημέρα πρώτης άδειας.');
          });results.append(pick);
        });
      }catch(e){if(run===generation)status.textContent=e.name==='TimeoutError'?'Η ανάγνωση καθυστέρησε. Δοκίμασε επικόλληση κειμένου.':e.message||'Δεν ήταν δυνατή η εισαγωγή.';}
      finally{button.disabled=false;}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
