/**
 * Sadguru Motors - Main Application Logic & Language Controller
 * Sector 14, Gurgaon (HR-26)
 * Bulletproof Bilingual Switching & Modal Control
 */

// Initialize default language from localStorage or default to Hindi
window.currentAppLang = localStorage.getItem('sadguru_lang') || 'hi';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Showroom & Sound Engine
  if (typeof THREE !== 'undefined' && document.getElementById('canvas-container') && typeof CarShowroom3D !== 'undefined') {
    try {
      window.showroomInstance = new CarShowroom3D();
      window.soundEngine = window.showroomInstance.soundEngine;
      window.isEngineRunning = window.showroomInstance.isEngineRunning;
    } catch (err) {
      console.warn('Three.js showroom initialization fallback:', err);
      window.soundEngine = new AutomotiveSoundEngine();
      window.isEngineRunning = false;
      window.showroomInstance = {
        soundEngine: window.soundEngine,
        isEngineRunning: false,
        updateHotspotsLanguage: () => {},
        onWindowResize: () => {}
      };
    }
  } else {
    window.soundEngine = new AutomotiveSoundEngine();
    window.isEngineRunning = false;
    window.showroomInstance = {
      soundEngine: window.soundEngine,
      isEngineRunning: false,
      updateHotspotsLanguage: () => {},
      onWindowResize: () => {}
    };
  }

  // 2. Initialize Inventory
  window.inventoryInstance = new InventoryManager(window.showroomInstance);

  // 3. Initialize Language Switcher & Apply Initial Lang
  initLanguageSwitcher();
  applyLanguage(window.currentAppLang);

  // 4. Initialize EMI Calculator
  initEMICalculator();

  // 5. Initialize Car Valuation (Sell Car)
  initSellCarCalculator();

  // 6. Initialize Test Drive Booking
  initTestDriveBooking();

  // 7. Initialize Audio & UI Controls (Modals, Cross buttons, Mobile Menu)
  initUIControls();

  // 8. Initialize Hero 3D Showroom & Real Car Showcase Toggle
  initHeroModeToggle();
  initHeroRealCarShowcase();

  // 9. Initialize Verna 19-Photo Lightbox Gallery
  initVernaGalleryModal();

  // 10. Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
});

/**
 * 100% Comprehensive Language Switcher
 */
function initLanguageSwitcher() {
  const btnHi = document.getElementById('lang-hi');
  const btnEn = document.getElementById('lang-en');

  if (btnHi) {
    btnHi.addEventListener('click', () => {
      applyLanguage('hi');
    });
  }

  if (btnEn) {
    btnEn.addEventListener('click', () => {
      applyLanguage('en');
    });
  }
}

function applyLanguage(lang) {
  window.currentAppLang = lang;
  localStorage.setItem('sadguru_lang', lang);

  const btnHi = document.getElementById('lang-hi');
  const btnEn = document.getElementById('lang-en');
  if (btnHi) btnHi.classList.toggle('active', lang === 'hi');
  if (btnEn) btnEn.classList.toggle('active', lang === 'en');

  const dict = APP_TRANSLATIONS[lang] || APP_TRANSLATIONS['hi'];
  const isEn = lang === 'en';

  // 1. Update text content for [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.innerText = dict[key];
    }
  });

  // 2. Update placeholders for [data-i18n-placeholder]
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) {
      el.placeholder = dict[key];
    }
  });

  // 3. Update Dropdown Options
  updateDropdownsLanguage(isEn);

  // 4. Update Engine Start/Stop Button
  const engineBtn = document.getElementById('btn-engine-start');
  if (engineBtn && window.showroomInstance) {
    const isRunning = window.showroomInstance.isEngineRunning;
    const text = isRunning ? (isEn ? 'ENGINE ON / STOP' : 'इंजन ऑन / STOP') : (isEn ? 'START ENGINE' : 'स्टार्ट इंजन / START');
    engineBtn.innerHTML = `<i data-lucide="power"></i> <span>${text}</span>`;
  }

  // 5. Update Inventory Cars
  if (window.inventoryInstance) {
    window.inventoryInstance.setLanguage(lang);
  }

  // 6. Update 3D Hotspots
  if (window.showroomInstance && window.showroomInstance.updateHotspotsLanguage) {
    window.showroomInstance.updateHotspotsLanguage();
  }

  // 7. Update Hero Angle Label
  const angleLabel = document.getElementById('hero-angle-text');
  if (angleLabel && typeof HERO_ANGLES !== 'undefined' && HERO_ANGLES[currentHeroAngleIndex]) {
    angleLabel.innerText = isEn ? HERO_ANGLES[currentHeroAngleIndex].label_en : HERO_ANGLES[currentHeroAngleIndex].label_hi;
  }

  // Refresh icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

function updateDropdownsLanguage(isEn) {
  // Category buttons
  const catMap = {
    'all': isEn ? 'All Cars' : 'सभी गाड़ियां (All)',
    'suv': isEn ? 'SUV' : 'एसयूवी (SUV)',
    'sedan': isEn ? 'Sedan' : 'सेडान (Sedan)',
    'luxury': isEn ? 'Luxury' : 'लक्ज़री (Luxury)',
    'hatchback': isEn ? 'Hatchback' : 'हैचबैक (Hatchback)'
  };
  document.querySelectorAll('.category-btn').forEach(btn => {
    const filter = btn.dataset.filter;
    if (catMap[filter]) btn.innerText = catMap[filter];
  });

  // Fuel select options
  const fuelSelect = document.getElementById('filter-fuel');
  if (fuelSelect && fuelSelect.options.length >= 4) {
    fuelSelect.options[0].text = isEn ? 'Fuel: All' : 'ईंधन: सभी (Fuel)';
    fuelSelect.options[1].text = isEn ? 'Petrol' : 'पेट्रोल (Petrol)';
    fuelSelect.options[2].text = isEn ? 'Diesel' : 'डीजल (Diesel)';
    fuelSelect.options[3].text = isEn ? 'Hybrid' : 'हाइब्रिड (Hybrid)';
  }

  // Transmission select options
  const transSelect = document.getElementById('filter-trans');
  if (transSelect && transSelect.options.length >= 3) {
    transSelect.options[0].text = isEn ? 'Gearbox: All' : 'गियरबॉक्स: सभी';
    transSelect.options[1].text = isEn ? 'Automatic' : 'ऑटोमैटिक (Automatic)';
    transSelect.options[2].text = isEn ? 'Manual' : 'मैन्युअल (Manual)';
  }

  // Test drive location options
  const tdLocSelect = document.getElementById('td-location');
  if (tdLocSelect && tdLocSelect.options.length >= 2) {
    tdLocSelect.options[0].text = isEn ? 'Sadguru Showroom (Sector 14, Gurugram)' : 'सद्गुरु शोरूम (सेक्टर 14, गुड़गांव)';
    tdLocSelect.options[1].text = isEn ? 'Doorstep Test Drive (Home Delivery in Gurgaon)' : 'घर पर टेस्ट ड्राइव (Doorstep Delivery)';
  }
}

/**
 * Real-time Automotive Loan EMI Calculator
 */
function initEMICalculator() {
  const priceInput = document.getElementById('emi-price-range');
  const downPaymentInput = document.getElementById('emi-down-range');
  const tenureInput = document.getElementById('emi-tenure-range');
  const interestInput = document.getElementById('emi-rate-range');

  const priceDisp = document.getElementById('emi-price-val');
  const downDisp = document.getElementById('emi-down-val');
  const tenureDisp = document.getElementById('emi-tenure-val');
  const interestDisp = document.getElementById('emi-rate-val');

  const monthlyEmiDisp = document.getElementById('calculated-monthly-emi');
  const principalDisp = document.getElementById('calculated-principal');
  const interestTotalDisp = document.getElementById('calculated-interest');
  const totalPayableDisp = document.getElementById('calculated-total');

  function calculate() {
    const totalCost = parseFloat(priceInput.value) * 100000;
    const downPercent = parseFloat(downPaymentInput.value);
    const downAmount = (totalCost * downPercent) / 100;
    const loanPrincipal = totalCost - downAmount;
    
    const tenureYears = parseFloat(tenureInput.value);
    const tenureMonths = tenureYears * 12;
    
    const annualRate = parseFloat(interestInput.value);
    const monthlyRate = annualRate / (12 * 100);

    const isEn = window.currentAppLang === 'en';

    if (priceDisp) priceDisp.innerText = `₹${parseFloat(priceInput.value).toFixed(1)} Lakh`;
    if (downDisp) downDisp.innerText = `${downPercent}% (₹${(downAmount / 100000).toFixed(2)} L)`;
    if (tenureDisp) tenureDisp.innerText = isEn ? `${tenureYears} Years (${tenureMonths} Mo)` : `${tenureYears} वर्ष (${tenureMonths} माह)`;
    if (interestDisp) interestDisp.innerText = `${annualRate.toFixed(1)}% p.a.`;

    const emi = (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayable = emi * tenureMonths;
    const totalInterest = totalPayable - loanPrincipal;

    if (monthlyEmiDisp) monthlyEmiDisp.innerText = `₹${Math.round(emi).toLocaleString('en-IN')}`;
    if (principalDisp) principalDisp.innerText = `₹${Math.round(loanPrincipal).toLocaleString('en-IN')}`;
    if (interestTotalDisp) interestTotalDisp.innerText = `₹${Math.round(totalInterest).toLocaleString('en-IN')}`;
    if (totalPayableDisp) totalPayableDisp.innerText = `₹${Math.round(totalPayable).toLocaleString('en-IN')}`;
  }

  [priceInput, downPaymentInput, tenureInput, interestInput].forEach(input => {
    if (input) {
      input.addEventListener('input', calculate);
    }
  });

  calculate();
}

/**
 * Sell Your Car - Instant Valuation Algorithm
 */
function initSellCarCalculator() {
  const form = document.getElementById('sell-car-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const brand = document.getElementById('sell-brand').value;
    const model = document.getElementById('sell-model').value;
    const year = parseInt(document.getElementById('sell-year').value) || 2020;
    const km = parseInt(document.getElementById('sell-km').value) || 30000;
    const phone = document.getElementById('sell-phone').value;

    const isEn = window.currentAppLang === 'en';

    if (!model || !phone) {
      alert(isEn ? 'Please enter your car model and contact phone number.' : 'कृपया अपनी गाड़ी का मॉडल और फोन नंबर दर्ज करें।');
      return;
    }

    if (window.showroomInstance && window.showroomInstance.soundEngine) {
      window.showroomInstance.soundEngine.playLockChirp();
    }

    // Base valuation calculation
    let basePrice = 8.5;
    if (['BMW', 'Audi', 'Mercedes'].includes(brand)) basePrice = 24.0;
    else if (['Toyota', 'Mahindra'].includes(brand)) basePrice = 14.0;
    else if (['Hyundai', 'Tata', 'Kia'].includes(brand)) basePrice = 9.5;
    else if (['Maruti'].includes(brand)) basePrice = 6.2;

    const currentYear = 2026;
    const age = Math.max(1, currentYear - year);
    const depreciation = Math.pow(0.91, age);
    const kmFactor = Math.max(0.82, 1 - ((km / 100000) * 0.12));

    const estimated = Math.max(2.0, basePrice * depreciation * kmFactor);
    const minVal = (estimated * 0.94).toFixed(2);
    const maxVal = (estimated * 1.06).toFixed(2);

    const valuationModal = document.getElementById('valuation-result-modal');
    const resultBox = document.getElementById('valuation-result-content');
    
    if (valuationModal && resultBox) {
      resultBox.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #ecfdf5; border: 2px solid #059669; color: #059669; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 15px;">✓</div>
          <h3 style="font-size: 1.55rem; color: var(--text-main); font-weight: 800; margin-bottom: 6px;">
            ${isEn ? 'Estimated Market Value' : 'अनुमानित मूल्य (Estimated Market Value)'}
          </h3>
          <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 20px;">
            ${brand} ${model} (${year} ${isEn ? 'Model' : 'मॉडल'}, ${km.toLocaleString()} km)
          </p>
          
          <div style="background: var(--royal-blue-subtle); border: 1.5px solid var(--royal-blue-primary); padding: 22px; border-radius: 14px; margin-bottom: 22px;">
            <span style="font-size: 0.85rem; color: var(--royal-blue-primary); text-transform: uppercase; font-weight: 700;">
              ${isEn ? 'Sadguru Motors Instant Deal Offer' : 'सद्गुरु मोटर्स इंस्टेंट डील ऑफर'}
            </span>
            <div style="font-size: 2.3rem; font-weight: 800; color: var(--royal-blue-primary); margin-top: 4px;">
              ₹${minVal} - ₹${maxVal} Lakh
            </div>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-top: 6px;">
              ${isEn ? '*Instant bank transfer in 45 minutes after doorstep verification in Gurgaon' : '*डोरस्टेप इंस्पेक्शन के बाद 45 मिनट में डायरेक्ट बैंक ट्रांसफर'}
            </p>
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/919810123456?text=${encodeURIComponent(isEn ? `Hello Sadguru Motors, I want to sell my ${brand} ${model} (${year}). Estimated offer: ₹${minVal}-₹${maxVal} L. Phone: ${phone}` : `नमस्ते सद्गुरु मोटर्स, मुझे अपनी ${brand} ${model} (${year}) बेचनी है। अनुमानित ऑफर: ₹${minVal}-₹${maxVal} L। मेरा फोन: ${phone}।`)}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
              <i data-lucide="message-circle"></i> ${isEn ? 'Schedule Inspection in Sector 14' : 'सेक्टर 14 इंस्पेक्शन शेड्यूल करें'}
            </a>
            <button class="btn btn-secondary" onclick="window.closeAllModals(event)" style="padding: 10px 18px;" data-close-modal="true">
              ${isEn ? 'Close' : 'बंद करें'}
            </button>
          </div>
        </div>
      `;
      valuationModal.classList.add('active');
      if (window.lucide) lucide.createIcons();
    }
  });
}

/**
 * Test Drive Booking Handler
 */
function initTestDriveBooking() {
  const form = document.getElementById('test-drive-form');
  if (!form) return;

  // Set default date for test drive (tomorrow)
  const dateInput = document.getElementById('td-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const carId = document.getElementById('td-car-select').value;
    const name = document.getElementById('td-name').value;
    const phone = document.getElementById('td-phone').value;
    const date = document.getElementById('td-date').value;
    const location = document.getElementById('td-location').value;
    const isEn = window.currentAppLang === 'en';

    if (!name || !phone) {
      alert(isEn ? 'Please enter your name and contact phone number.' : 'कृपया अपना नाम और फोन नंबर दर्ज करें।');
      return;
    }

    if (window.showroomInstance && window.showroomInstance.soundEngine) {
      window.showroomInstance.soundEngine.playHorn();
    }

    const selectedCar = CAR_INVENTORY_DATA.find(c => c.id === carId) || CAR_INVENTORY_DATA[0];

    const message = isEn 
      ? `Hello Sadguru Motors!\n\nI have submitted a Test Drive Request:\n- Customer: ${name}\n- Phone: ${phone}\n- Car: ${selectedCar.name}\n- Preferred Date: ${date}\n- Location: ${location === 'showroom' ? 'Sadguru Motors Showroom, Sector 14 Gurugram' : 'Doorstep Test Drive (Home Delivery in Gurgaon)'}`
      : `नमस्ते सद्गुरु मोटर्स!\n\nमैंने टेस्ट ड्राइव की रिक्वेस्ट भेजी है:\n- ग्राहक: ${name}\n- फोन: ${phone}\n- गाड़ी: ${selectedCar.name}\n- तारीख: ${date}\n- लोकेशन: ${location === 'showroom' ? 'सद्गुरु मोटर्स शोरूम, सेक्टर 14 गुड़गांव' : 'डोरस्टेप टेस्ट ड्राइव (गुड़गांव होम डिलीवरी)'}`;

    // Persist test drive lead to Supabase & local CRM database
    if (window.SadguruDB && typeof window.SadguruDB.recordCustomerLead === 'function') {
      try {
        window.SadguruDB.recordCustomerLead({
          id: 'td_' + Date.now(),
          name: name,
          email: phone + '@customer.sadgurumotors.in',
          phone: phone,
          car_interest: selectedCar.name,
          provider: 'test_drive'
        });
      } catch (e) {}
    }

    window.open(`https://wa.me/919810123456?text=${encodeURIComponent(message)}`, '_blank');
    window.closeAllModals();

    const confirmMsg = isEn 
      ? `Thank you ${name}! Your test drive request has been recorded. Our Sector 14 team will contact you shortly.`
      : `धन्यवाद ${name}! आपकी टेस्ट ड्राइव रिक्वेस्ट रजिस्टर हो गई है। हमारी सेक्टर 14 टीम आपको जल्द संपर्क करेगी।`;
    alert(confirmMsg);
  });
}

/**
 * Bulletproof Modal, Cross Button & Audio Controls
 */
function initUIControls() {
  // Sound Mute/Unmute Toggle
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (window.showroomInstance && window.showroomInstance.soundEngine) {
        const isMuted = window.showroomInstance.soundEngine.toggleMute();
        soundBtn.classList.toggle('sound-on', !isMuted);
        soundBtn.innerHTML = isMuted ? '<i data-lucide="volume-x"></i>' : '<i data-lucide="volume-2"></i>';
        if (window.lucide) lucide.createIcons();
      }
    });
  }

  // Cross ('×') buttons and close buttons delegation
  document.addEventListener('click', (e) => {
    // Check if clicked element is close button or has data-close-modal attribute
    if (e.target.closest('.modal-close-btn') || e.target.closest('[data-close-modal]')) {
      e.preventDefault();
      e.stopPropagation();
      window.closeAllModals();
      return;
    }

    // Check if clicked on overlay background directly (outside modal card)
    if (e.target.classList && e.target.classList.contains('modal-overlay')) {
      e.preventDefault();
      e.stopPropagation();
      window.closeAllModals();
    }
  });

  // ESC key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      window.closeAllModals();
    }
  });

  // Mobile menu drawer toggle with liquid glass animation
  const mobileBtn = document.getElementById('btn-mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = navLinks.classList.contains('mobile-active');
      navLinks.classList.toggle('mobile-active', !isActive);
      mobileBtn.innerHTML = !isActive 
        ? '<i data-lucide="x" style="width: 24px; height: 24px;"></i>' 
        : '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
      if (window.lucide) lucide.createIcons();
    });

    // Close mobile menu on clicking any link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        if (mobileBtn) {
          mobileBtn.innerHTML = '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
          if (window.lucide) lucide.createIcons();
        }
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target) && navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        if (mobileBtn) {
          mobileBtn.innerHTML = '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
          if (window.lucide) lucide.createIcons();
        }
      }
    });
  }
}

/**
 * Hero Dual-Mode Controller (3D WebGL vs Real HD Photos)
 */
function initHeroModeToggle() {
  const btn3D = document.getElementById('btn-mode-3d');
  const btnReal = document.getElementById('btn-mode-real');
  const canvasContainer = document.getElementById('canvas-container');
  const realShowcase = document.getElementById('real-car-showcase');
  const hud3dConfig = document.getElementById('hud-3d-config-box');
  const realAnglesBox = document.getElementById('hero-real-angles-box');

  if (!btn3D || !btnReal) return;

  function switchMode(mode) {
    if (mode === '3d') {
      btn3D.classList.add('active');
      btnReal.classList.remove('active');
      if (canvasContainer) {
        canvasContainer.style.display = 'block';
        canvasContainer.classList.add('active');
      }
      if (realShowcase) {
        realShowcase.style.display = 'none';
        realShowcase.classList.remove('active');
      }
      if (hud3dConfig) hud3dConfig.style.display = 'flex';
      if (realAnglesBox) realAnglesBox.style.display = 'none';

      if (window.showroomInstance && window.showroomInstance.onWindowResize) {
        setTimeout(() => window.showroomInstance.onWindowResize(), 50);
      }
    } else {
      btnReal.classList.add('active');
      btn3D.classList.remove('active');
      if (canvasContainer) {
        canvasContainer.style.display = 'none';
        canvasContainer.classList.remove('active');
      }
      if (realShowcase) {
        realShowcase.style.display = 'flex';
        realShowcase.classList.add('active');
      }
      if (hud3dConfig) hud3dConfig.style.display = 'none';
      if (realAnglesBox) realAnglesBox.style.display = 'block';
    }
    if (window.lucide) lucide.createIcons();
  }

  btn3D.addEventListener('click', () => switchMode('3d'));
  btnReal.addEventListener('click', () => switchMode('real'));

  // Default to 3D mode
  switchMode('3d');
}

/**
 * Hero Real Car Studio Showcase
 */
const HERO_ANGLES = [
  {
    src: 'assets/car-photos/verna-hero-34.jpg',
    label_hi: '1. फ्रंट 3/4 (Hero Stance) • 1 / 9',
    label_en: '1. Front 3/4 (Hero Stance) • 1 / 9'
  },
  {
    src: 'assets/car-photos/verna-side.jpg',
    label_hi: '2. साइड प्रोफाइल (Full Side Stance) • 2 / 9',
    label_en: '2. Side Profile (Full Side Stance) • 2 / 9'
  },
  {
    src: 'assets/car-photos/verna-rear-gt.jpg',
    label_hi: '3. रियर GT विंग & क्वाड एग्जॉस्ट • 3 / 9',
    label_en: '3. Rear GT Wing & Quad Exhaust • 3 / 9'
  },
  {
    src: 'assets/car-photos/verna-front-straight.jpg',
    label_hi: '4. फ्रंट सीधा फेस (Aggressive Stance) • 4 / 9',
    label_en: '4. Front Straight Face (Aggressive Stance) • 4 / 9'
  },
  {
    src: 'assets/car-photos/verna-interior-sunroof.jpg',
    label_hi: '5. कॉकपिट, सनरूफ & नियॉन एम्बिएंट • 5 / 9',
    label_en: '5. Cockpit, Sunroof & Neon Ambient • 5 / 9'
  },
  {
    src: 'assets/car-photos/verna-steering-dash.jpg',
    label_hi: '6. स्टीयरिंग व्हील & डिजिटल क्लस्टर • 6 / 9',
    label_en: '6. Steering Wheel & Digital Cluster • 6 / 9'
  },
  {
    src: 'assets/car-photos/verna-front-seats.jpg',
    label_hi: '7. डुअल-टोन बकेट सीट्स & स्पार्को कुशन • 7 / 9',
    label_en: '7. Dual-Tone Bucket Seats & Sparco • 7 / 9'
  },
  {
    src: 'assets/car-photos/verna-rc-card.jpg',
    label_hi: '8. सरकारी RC कार्ड (HR26EV1479) • 8 / 9',
    label_en: '8. Govt RC Card (HR26EV1479) • 8 / 9'
  },
  {
    src: 'assets/car-photos/verna-speedometer.jpg',
    label_hi: '9. स्पीडोमीटर क्लस्टर (67,861 KM) • 9 / 9',
    label_en: '9. Speedometer Cluster (67,861 KM) • 9 / 9'
  }
];

let currentHeroAngleIndex = 0;

function initHeroRealCarShowcase() {
  const mainImg = document.getElementById('hero-main-car-img');
  const angleLabel = document.getElementById('hero-angle-text');
  const angleBtns = document.querySelectorAll('.hero-angle-btn');
  const prevBtn = document.getElementById('btn-hero-prev');
  const nextBtn = document.getElementById('btn-hero-next');

  function updateAngle(index) {
    if (index < 0) index = HERO_ANGLES.length - 1;
    if (index >= HERO_ANGLES.length) index = 0;
    currentHeroAngleIndex = index;

    const angle = HERO_ANGLES[index];
    const isEn = (window.currentAppLang === 'en');

    if (mainImg) {
      mainImg.style.opacity = '0.3';
      mainImg.style.transform = 'scale(0.97)';
      setTimeout(() => {
        mainImg.src = angle.src;
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 120);
    }

    if (angleLabel) {
      angleLabel.innerText = isEn ? angle.label_en : angle.label_hi;
    }

    angleBtns.forEach((btn, idx) => {
      btn.classList.toggle('active', idx === index);
      if (idx === index) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    if (window.showroomInstance && window.showroomInstance.soundEngine) {
      window.showroomInstance.soundEngine.playSwitchClick();
    }
  }

  // Bind angle buttons
  angleBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => updateAngle(idx));
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => updateAngle(currentHeroAngleIndex - 1));
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => updateAngle(currentHeroAngleIndex + 1));
  }

  // Engine Start & Rev Audio Controls (Interactive Web Audio)
  const engineBtn = document.getElementById('btn-engine-start');
  const revBtn = document.getElementById('btn-rev-engine');
  const revFill = document.querySelector('.rev-bar-fill');

  if (engineBtn) {
    engineBtn.addEventListener('click', () => {
      window.isEngineRunning = !window.isEngineRunning;
      if (window.showroomInstance) window.showroomInstance.isEngineRunning = window.isEngineRunning;
      const isEn = (window.currentAppLang === 'en');

      if (window.isEngineRunning) {
        window.soundEngine.startEngine();
        engineBtn.classList.add('running');
        engineBtn.innerHTML = `<i data-lucide="power"></i> <span>${isEn ? 'ENGINE ON / STOP' : 'इंजन ऑन / STOP'}</span>`;
        if (revFill) revFill.style.width = '35%';
      } else {
        window.soundEngine.stopEngine();
        engineBtn.classList.remove('running');
        engineBtn.innerHTML = `<i data-lucide="power"></i> <span>${isEn ? 'START ENGINE' : 'स्टार्ट इंजन / START'}</span>`;
        if (revFill) revFill.style.width = '0%';
      }
      if (window.lucide) lucide.createIcons();
    });
  }

  if (revBtn) {
    revBtn.addEventListener('click', () => {
      if (!window.isEngineRunning && engineBtn) {
        engineBtn.click();
      }
      window.soundEngine.revEngine();
      if (revFill) {
        revFill.style.width = '95%';
        setTimeout(() => {
          if (window.isEngineRunning) revFill.style.width = '35%';
        }, 900);
      }
    });
  }

  // 360° Drag-to-Rotate & Touch Swipe on the Real Car
  const stageWrapper = document.querySelector('.hero-car-stage-wrapper');
  if (stageWrapper) {
    let isDragging = false;
    let startX = 0;
    const dragThreshold = 28; // pixels of drag per angle step

    stageWrapper.addEventListener('mousedown', (e) => {
      if (e.target.closest('button') || e.target.closest('.hero-car-hotspot') || e.target.closest('a')) return;
      isDragging = true;
      startX = e.clientX;
      stageWrapper.style.cursor = 'grabbing';
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
          updateAngle(currentHeroAngleIndex - 1);
        } else {
          updateAngle(currentHeroAngleIndex + 1);
        }
        startX = e.clientX;
      }
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        if (stageWrapper) stageWrapper.style.cursor = 'grab';
      }
    });

    // Touch events for mobile/tablet
    stageWrapper.addEventListener('touchstart', (e) => {
      if (e.target.closest('button') || e.target.closest('.hero-car-hotspot') || e.target.closest('a')) return;
      if (e.touches && e.touches.length === 1) {
        isDragging = true;
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    stageWrapper.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startX;
      if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
          updateAngle(currentHeroAngleIndex - 1);
        } else {
          updateAngle(currentHeroAngleIndex + 1);
        }
        startX = e.touches[0].clientX;
      }
    }, { passive: true });

    stageWrapper.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // Auto 360° spin for real car
  let realCarAutoSpinTimer = null;
  const rotateBtn = document.getElementById('btn-toggle-rotate');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      const isRealActive = realPanel && realPanel.classList.contains('active');
      if (isRealActive) {
        if (realCarAutoSpinTimer) {
          clearInterval(realCarAutoSpinTimer);
          realCarAutoSpinTimer = null;
          rotateBtn.classList.remove('active');
        } else {
          rotateBtn.classList.add('active');
          realCarAutoSpinTimer = setInterval(() => {
            const nextIdx = (currentHeroAngleIndex >= 8) ? 0 : currentHeroAngleIndex + 1;
            updateAngle(nextIdx);
          }, 2400);
        }
      }
    });
  }

  // Hotspot click feedbacks
  document.querySelectorAll('.hero-car-hotspot').forEach(spot => {
    spot.addEventListener('click', () => {
      if (window.showroomInstance && window.showroomInstance.soundEngine) {
        window.showroomInstance.soundEngine.playSwitchClick();
      }
      window.openVernaGalleryModal();
    });
  });
}

/**
 * 19-Photo Studio Lightbox & Govt RC Modal Manager
 */
const VERNA_19_PHOTOS = [
  { id: 1, url: 'assets/car-photos/verna-hero-34.jpg', cat: 'exterior', label_hi: '1. फ्रंट 3/4 हीरो व्यू (पोलर व्हाइट + ब्लैक ग्रिल)', label_en: '1. Front 3/4 Hero View (Polar White + Black Grille)' },
  { id: 2, url: 'assets/car-photos/verna-side.jpg', cat: 'exterior', label_hi: '2. फुल साइड प्रोफाइल (स्पोर्ट्स अलॉय + जीटी किट)', label_en: '2. Side Profile (Black Alloys + GT Kit)' },
  { id: 3, url: 'assets/car-photos/verna-rear-gt.jpg', cat: 'exterior', label_hi: '3. रियर जीटी विंग & क्वाड एग्जॉस्ट डिफ्यूज़र', label_en: '3. Rear GT Wing & Quad Exhaust Diffuser' },
  { id: 4, url: 'assets/car-photos/verna-front-straight.jpg', cat: 'exterior', label_hi: '4. फ्रंट सीधा स्टांस व हेडलाइट्स', label_en: '4. Front Direct Stance & Headlamps' },
  { id: 5, url: 'assets/car-photos/verna-interior-sunroof.jpg', cat: 'interior', label_hi: '5. फुल कॉकपिट, इलेक्ट्रिक सनरूफ & नियॉन एम्बिएंट', label_en: '5. Full Cockpit, Electric Sunroof & Neon Ambient' },
  { id: 6, url: 'assets/car-photos/verna-steering-dash.jpg', cat: 'interior', label_hi: '6. स्टीयरing व्हील, टीएफटी क्लस्टर व पैडल्स', label_en: '6. Steering Wheel, TFT Cluster & Sport Pedals' },
  { id: 7, url: 'assets/car-photos/verna-front-seats.jpg', cat: 'interior', label_hi: '7. स्पार्को नेक कुशन वाली फ्रंट बकेट सीट्स', label_en: '7. Front Bucket Seats with Sparco Cushions' },
  { id: 8, url: 'assets/car-photos/verna-rear-seats.jpg', cat: 'interior', label_hi: '8. रियर लेदर सीट्स व रियर सनशेड कर्टेन', label_en: '8. Rear Leather Seats & Sunshade Curtain' },
  { id: 9, url: 'assets/car-photos/verna-passenger-dash.jpg', cat: 'interior', label_hi: '9. पैसेंजर डैशबोर्ड व मैजेंटा एम्बिएंट लाइटिंग', label_en: '9. Passenger Dashboard & Magenta Ambient Light' },
  { id: 10, url: 'assets/car-photos/verna-scuff-plate.jpg', cat: 'interior', label_hi: '10. हुंडई इल्यूमिनेटेड डोर स्कफ प्लेट्स', label_en: '10. Hyundai Illuminated Door Scuff Plates' },
  { id: 11, url: 'assets/car-photos/verna-seats-detail.jpg', cat: 'interior', label_hi: '11. डुअल-टोन लेदरेट सीट्स व ब्राइड पैड्स', label_en: '11. Dual-tone Leather Seats & Bride Pads' },
  { id: 12, url: 'assets/car-photos/verna-speedometer.jpg', cat: 'legal', label_hi: '12. डिजिटल स्पीडोमीटर क्लस्टर (67,861 KM ओरिजिनल)', label_en: '12. Digital Speedometer Cluster (67,861 KM Genuine)' },
  { id: 13, url: 'assets/car-photos/verna-rc-card.jpg', cat: 'legal', label_hi: '13. हरियाणा सरकारी आरसी कार्ड (HR-26-EV-1479)', label_en: '13. Haryana Govt RC Certificate (HR-26-EV-1479)' },
  { id: 14, url: 'assets/car-photos/verna-front-left-34.jpg', cat: 'exterior', label_hi: '14. फ्रंट-लेफ्ट एंगल 2 (ब्लैक रूफ & हुड स्कूप्स)', label_en: '14. Front-Left View (Black Roof & Hood Scoops)' },
  { id: 15, url: 'assets/car-photos/verna-rear-straight.jpg', cat: 'exterior', label_hi: '15. रियर सीधा एंगल व एलईडी टेललाइट्स', label_en: '15. Rear Direct Stance & LED Taillamps' },
  { id: 16, url: 'assets/car-photos/verna-hero-angle2.jpg', cat: 'exterior', label_hi: '16. फ्रंट डायनेमिक 3/4 एंगल', label_en: '16. Front Dynamic 3/4 Stance' },
  { id: 17, url: 'assets/car-photos/verna-front-angle2.jpg', cat: 'exterior', label_hi: '17. फ्रंट एलीवेशन स्टांस', label_en: '17. Front Elevation Stance' },
  { id: 18, url: 'assets/car-photos/verna-rear-angle2.jpg', cat: 'exterior', label_hi: '18. रियर जीटी विंग हाई-एंगल व्यू', label_en: '18. Rear GT Wing High-Angle View' },
  { id: 19, url: 'assets/car-photos/verna-front-angle3.jpg', cat: 'exterior', label_hi: '19. साइड-फ्रंट प्रोफाइल क्लोजअप', label_en: '19. Side-Front Profile Close-up' }
];

let activeGalleryCategory = 'all';

function initVernaGalleryModal() {
  const tabs = document.querySelectorAll('.gallery-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeGalleryCategory = tab.dataset.filter;
      renderGalleryThumbs();
    });
  });
}

function renderGalleryThumbs() {
  const container = document.getElementById('verna-thumbs-container');
  if (!container) return;

  const isEn = (window.currentAppLang === 'en');
  const filtered = activeGalleryCategory === 'all' 
    ? VERNA_19_PHOTOS 
    : VERNA_19_PHOTOS.filter(p => p.cat === activeGalleryCategory);

  container.innerHTML = filtered.map((photo, idx) => {
    const label = isEn ? photo.label_en : photo.label_hi;
    return `
      <button type="button" class="gallery-thumb-item ${idx === 0 ? 'active' : ''}" onclick="window.selectVernaLightbox('${photo.url}', '${label.replace(/'/g, "\\'")}')" title="${label}">
        <img src="${photo.url}" alt="${label}" />
      </button>
    `;
  }).join('');
}

window.selectVernaLightbox = function(url, caption) {
  const img = document.getElementById('verna-lightbox-img');
  const cap = document.getElementById('verna-lightbox-caption');

  if (img) {
    img.style.opacity = '0.3';
    setTimeout(() => {
      img.src = url;
      img.style.opacity = '1';
    }, 100);
  }

  if (cap) {
    cap.innerText = caption;
  }

  // Update active thumbnail
  document.querySelectorAll('.gallery-thumb-item').forEach(btn => {
    const thumbImg = btn.querySelector('img');
    if (thumbImg && thumbImg.getAttribute('src') === url) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (window.showroomInstance && window.showroomInstance.soundEngine) {
    window.showroomInstance.soundEngine.playSwitchClick();
  }
};

window.openVernaGalleryModal = function() {
  const modal = document.getElementById('verna-gallery-modal');
  if (!modal) return;

  renderGalleryThumbs();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Set initial lightbox image
  const firstPhoto = VERNA_19_PHOTOS[0];
  const isEn = (window.currentAppLang === 'en');
  window.selectVernaLightbox(firstPhoto.url, isEn ? firstPhoto.label_en : firstPhoto.label_hi);

  if (window.lucide) {
    lucide.createIcons();
  }
};

/**
 * Procedural Web Audio Engine (Standalone Automotive Synthesizer)
 */
if (typeof window.AutomotiveSoundEngine === 'undefined') {
  window.AutomotiveSoundEngine = class AutomotiveSoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.idleOsc1 = null;
    this.idleOsc2 = null;
    this.idleGain = null;
    this.isRunning = false;
  }

  initAudio() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startEngine() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx || this.isRunning) return;

    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const crankOsc = this.ctx.createOscillator();
      const crankGain = this.ctx.createGain();
      crankOsc.type = 'sawtooth';
      crankOsc.frequency.setValueAtTime(45 + i * 5, now + i * 0.14);
      crankGain.gain.setValueAtTime(0.2, now + i * 0.14);
      crankGain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.14);
      
      crankOsc.connect(crankGain);
      crankGain.connect(this.ctx.destination);
      crankOsc.start(now + i * 0.14);
      crankOsc.stop(now + (i + 1) * 0.14);
    }

    setTimeout(() => {
      if (!this.ctx) return;
      this.isRunning = true;
      const engineTime = this.ctx.currentTime;

      this.idleOsc1 = this.ctx.createOscillator();
      this.idleOsc2 = this.ctx.createOscillator();
      this.idleGain = this.ctx.createGain();

      this.idleOsc1.type = 'sawtooth';
      this.idleOsc1.frequency.setValueAtTime(55, engineTime);

      this.idleOsc2.type = 'triangle';
      this.idleOsc2.frequency.setValueAtTime(110, engineTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, engineTime);

      this.idleGain.gain.setValueAtTime(0.01, engineTime);
      this.idleGain.gain.linearRampToValueAtTime(0.18, engineTime + 0.3);

      this.idleOsc1.connect(filter);
      this.idleOsc2.connect(filter);
      filter.connect(this.idleGain);
      this.idleGain.connect(this.ctx.destination);

      this.idleOsc1.start(engineTime);
      this.idleOsc2.start(engineTime);
    }, 600);
  }

  stopEngine() {
    if (!this.isRunning || !this.idleGain || !this.ctx) return;
    const now = this.ctx.currentTime;
    this.idleGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
    setTimeout(() => {
      try {
        if (this.idleOsc1) this.idleOsc1.stop();
        if (this.idleOsc2) this.idleOsc2.stop();
      } catch (e) {}
      this.isRunning = false;
    }, 450);
  }

  revEngine() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const revOsc = this.ctx.createOscillator();
    const revGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(350, now);
    filter.frequency.linearRampToValueAtTime(800, now + 0.4);
    filter.frequency.linearRampToValueAtTime(320, now + 0.9);

    revOsc.type = 'sawtooth';
    revOsc.frequency.setValueAtTime(70, now);
    revOsc.frequency.exponentialRampToValueAtTime(260, now + 0.4);
    revOsc.frequency.exponentialRampToValueAtTime(65, now + 0.9);

    revGain.gain.setValueAtTime(0.25, now);
    revGain.gain.linearRampToValueAtTime(0.4, now + 0.4);
    revGain.gain.linearRampToValueAtTime(0.001, now + 0.95);

    revOsc.connect(filter);
    filter.connect(revGain);
    revGain.connect(this.ctx.destination);

    revOsc.start(now);
    revOsc.stop(now + 1.0);
  }

  playHorn() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.frequency.setValueAtTime(440, now);
    osc2.frequency.setValueAtTime(554, now);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.linearRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  playLockChirp() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.12].forEach(offset => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2200, now + offset);
      osc.frequency.exponentialRampToValueAtTime(1400, now + offset + 0.06);

      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.linearRampToValueAtTime(0.001, now + offset + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.07);
    });
  }

  playSwitchClick() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(800, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playCameraClick() {
    if (this.isMuted) return;
    this.initAudio();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted && this.idleGain && this.ctx) {
      this.idleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isMuted;
  }
};
}
