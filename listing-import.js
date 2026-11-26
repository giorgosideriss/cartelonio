(function(){
  function listingRequestInput(urlValue, textValue) {
    const rawUrl = urlValue.trim();
    const rawText = textValue.trim();
    const extract = value => {
      const links = [...new Set((value.match(/https:\/\/[^\s<>"`]+/gi) || []).map(link => link.replace(/[).,;!]+$/, '')))];
      if (links.length !== 1) throw Error('Βάλε έναν σύνδεσμο συγκεκριμένης αγγελίας.');
      return links[0].replace(/[).,;!]+$/, '');
    };
    let url = rawUrl ? extract(rawUrl) : undefined;
    let text = rawText || undefined;
    // App sharing is a URL request, not technical listing text.
    if (!url && rawText && (/\]\(https:\/\//i.test(rawText) || /^https:\/\/\S+$/i.test(rawText) || /^I found an interesting offer!\s*Take a look:/i.test(rawText))) {
      url = extract(rawText);
      text = undefined;
    }
    if (url) {
      const u = new URL(url);
      if (['mobile.de','www.mobile.de','suchen.mobile.de','m.mobile.de'].includes(u.hostname) &&
          u.protocol === 'https:' && !u.username && !u.password && !u.port) {
        u.hostname = 'suchen.mobile.de';
        const id = u.searchParams.get('id');
        u.search = '';
        if (id) u.searchParams.set('id', id);
        u.hash = '';
        url = u.href;
      }
    }
    return { url, text };
  }

  function renderMatches(results, candidates, data, listing, confirm) {
    const make = (tag, className, value) => {
      const node = document.createElement(tag);
      node.className = className;
      if (value) node.textContent = value;
      return node;
    };
    const split = make('div', 'listing-match-split');
    const list = make('div', 'listing-match-list');
    const preview = make('div', 'listing-match-detail');
    const entries = candidates.map(candidate => {
      const model = data.models[candidate.model];
      const edition = model.editions[candidate.editionIndex];
      const path = edition.image || model.image;
      const image = path && cartelonioPublicAssetUrl(path.includes('/') ? path : `images/cars/${slugifyBrand(candidate.brand)}/${path}`);
      return {candidate, edition, image};
    });
    const first = candidates[0];
    const recommended = first.exactCode && !first.conflicts.length &&
      (!candidates[1]?.exactCode || (first.trimMatch && !candidates[1].trimMatch));
    function photo(source, className, alt = '') {
      const img = make('img', className);
      img.alt = alt;
      img.decoding = 'async';
      img.hidden = !source;
      if (source) {
        img.addEventListener('error', () => { img.hidden = true; }, {once:true});
        img.src = source;
      }
      return img;
    }
    const buttons = entries.map(({candidate,image}, index) => {
      const btn = make('button', 'listing-match-option');
      btn.type = 'button';
      const label = make('span', 'listing-match-option-text');
      label.append(make('strong', '', candidate.name), make('small', '', index === 0 && recommended ? 'Καλύτερη αντιστοίχιση' : `${candidate.model} · ${candidate.year}`));
      btn.append(photo(image, 'listing-match-thumb'), label);
      btn.addEventListener('click', () => select(index));
      return btn;
    });
    function select(index) {
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const {candidate, edition, image} = entries[index];
      const heading = make('h3', '', `${candidate.brand} ${candidate.model} · ${candidate.name}`);
      const meta = make('div', 'listing-match-specs');
      const fuel = {diesel:'Diesel', petrol:'Βενζίνη', electric:'Ηλεκτρικό', hybrid:'Υβριδικό', lpg:'LPG'}[edition.fuel];
      const code = candidate.name.match(/\b([xs])drive/i);
      const co2 = edition.co2 != null && edition.co2 !== '' && Number.isFinite(Number(edition.co2)) ? `${Number(edition.co2).toLocaleString('el-GR')} g/km CO₂` : '';
      const specs = [fuel, code ? (code[1].toLowerCase() === 'x' ? 'AWD' : 'sDrive') : '', co2, edition.transmission];
      for (const value of specs.filter(Boolean)) meta.append(make('span', '', value));
      const pick = make('button', 'listing-read-btn listing-match-apply', 'Επιλογή έκδοσης →');
      pick.type = 'button';
      pick.addEventListener('click', () => confirm(candidate));
      preview.replaceChildren(photo(image, 'listing-match-photo', `${candidate.brand} ${candidate.model}`), heading, meta);
      if (/\bm[\s-]*sport\b/i.test(listing.title) && !candidate.trimMatch) {
        preview.append(make('p', 'listing-match-note', 'Η αγγελία αναφέρει M Sport. Έλεγξε την παραλλαγή και τον εξοπλισμό στον κατάλογο.'));
      }
      if (candidate.conflicts.length) preview.append(make('p', 'listing-match-note', 'Υπάρχει διαφορά στα στοιχεία της αγγελίας και της έκδοσης.'));
      preview.append(pick);
    }
    list.append(...buttons);
    split.append(list, preview);
    results.append(split);
    select(0);
  }

  async function setup(){
    const panel=document.getElementById('listingPanel');if(!panel)return;
    const input=document.getElementById('listingUrl'),text=document.getElementById('listingText'),button=document.getElementById('listingReadBtn'),status=document.getElementById('listingStatus'),results=document.getElementById('listingResults');
    const empty = document.getElementById('listingEmpty');
    const resetPreview = () => { results.replaceChildren(); empty.hidden = false; };
    let generation=0;
    function clear(){generation++;resetPreview();status.textContent='';}
    input.addEventListener('input',clear);text.addEventListener('input',clear);
    button.addEventListener('click',async()=>{
      const run=++generation;button.disabled=true;resetPreview();status.textContent='Ανάγνωση αγγελίας… Μπορεί να χρειαστούν έως 60–75 δευτερόλεπτα.';
      try {
        const {rankCandidates,normalize}=await import('./listing-utils.mjs?v=20261126-match');
        await Promise.all([catalogReady,cartelonioAuthReady]);
        if(!cartelonioSession?.access_token)throw Error('Χρειάζεται ενεργή σύνδεση για την εισαγωγή.');
        const res=await fetch(`${CARTELONIO_API_BASE}/listing-import`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${cartelonioSession.access_token}`},body:JSON.stringify(listingRequestInput(input.value,text.value)),signal:AbortSignal.timeout(90000)});
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
        empty.hidden=true;
        const summary=document.createElement('p');summary.className='listing-match-source';summary.textContent=`${listing.title} · ${listing.registration.month}/${year} · ${listing.mileage==null?'Χιλιόμετρα άγνωστα':listing.mileage.toLocaleString('el-GR')+' km'}`;results.append(summary);
        for(const warning of (listing.warnings || [])){if(warning === 'Η αγγελία δίνει μόνο μήνα/έτος. Συμπλήρωσε την ακριβή ημέρα.')continue;const p=document.createElement('p');p.className='listing-warning';p.textContent=warning;results.append(p);}
        if(!candidates.length){status.textContent='Δεν βρέθηκε αξιόπιστη αντιστοίχιση. Χρησιμοποίησε την επιλογή από κατάλογο.';return;}
        status.textContent='Έλεγξε τα στοιχεία και επιβεβαίωσε την έκδοση.';
        renderMatches(results, candidates, data, listing, candidate => {
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
            document.getElementById('firstRegMonth').value=String(reg.month);document.getElementById('firstRegDay').value='1';syncFirstRegistrationDate();updateCarSummary();
            // Registration tax fields remain sourced from the selected catalogue.
            // Listing price, advertised Euro/CO2 and equipment are never guessed.
            resetPreview();status.textContent='Η επιλογή συμπληρώθηκε. Έλεγξε έκδοση, παραλλαγή ΛΤΠΦ, ημερομηνία και χιλιόμετρα πριν υπολογίσεις.';
            const note=document.getElementById('listingAppliedNote');note.hidden=false;note.textContent=status.textContent+' Η ημέρα πρώτης άδειας ορίστηκε αυτόματα στην 1η του μήνα.';
        });
      }catch(e){if(run===generation)status.textContent=e.name==='TimeoutError'?'Η ανάγνωση καθυστέρησε. Δοκίμασε επικόλληση κειμένου.':e.message||'Δεν ήταν δυνατή η εισαγωγή.';}
      finally{button.disabled=false;}
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
