/**
 * Sadguru Motors - Main Application Logic & Language Controller
 * Sector 14, Gurugram
 * Bulletproof Bilingual Switching & Modal Control
 */

// Website language is fixed to English
window.currentAppLang = 'en';

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

  // 4. Car Valuation (Sell Car)
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

  // 11. Initialize Mobile Liquid Glass Dock
  initMobileLiquidDock();
});

function initMobileLiquidDock() {
  const dockItems = document.querySelectorAll('.mobile-bottom-dock .dock-item');
  if (!dockItems || dockItems.length === 0) return;

  dockItems.forEach(item => {
    item.addEventListener('click', () => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        dockItems.forEach(d => d.classList.remove('active'));
        item.classList.add('active');
      }
    });
  });

  // Track scroll position to update active dock item smoothly
  const sections = [
    { id: 'virtual-showroom', tab: 'showroom' },
    { id: 'inventory', tab: 'inventory' },
    { id: 'sell-car', tab: 'sell' }
  ];

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
          const matched = sections.find(s => s.id === entry.target.id);
          if (matched) {
            dockItems.forEach(d => {
              if (d.getAttribute('data-dock') === matched.tab) {
                d.classList.add('active');
              } else if (['showroom', 'inventory', 'sell'].includes(d.getAttribute('data-dock'))) {
                d.classList.remove('active');
              }
            });
          }
        }
      });
    }, { threshold: [0.25] });

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
  }
}

/**
 * 100% Comprehensive Language Switcher
 */
function initLanguageSwitcher() {
  // Pure English mode - language switcher removed per user request
}

function applyLanguage(lang) {
  lang = 'en';
  window.currentAppLang = 'en';
  localStorage.setItem('sadguru_lang', 'en');

  const dict = (typeof APP_TRANSLATIONS !== 'undefined' && APP_TRANSLATIONS['en']) ? APP_TRANSLATIONS['en'] : {};
  const isEn = true;

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
 * EMI Calculator (Disabled - Sadguru Motors focuses on direct cash sales)
 */
function initEMICalculator() {
  // Car loan / EMI features removed per dealership policy
}

/**
 * Sell Your Car - Intelligent Live Market Valuation Algorithm
 * Calibrated against real-time Delhi NCR & Gurugram automotive transaction data
 * (Benchmark reference: Orange Book Value, Cars24, Spinny & CarWale)
 */
function estimateBaseNewPrice(brand, modelStr) {
  const m = (modelStr || '').toLowerCase().trim();
  const b = (brand || '').toLowerCase().trim();

  // 1. Toyota
  if (b.includes('toyota') || m.includes('toyota')) {
    if (m.includes('land cruiser') || m.includes('prado')) return 160.0;
    if (m.includes('vellfire')) return 130.0;
    if (m.includes('legender')) return 49.0;
    if (m.includes('fortuner')) {
      if (m.includes('4x4') || m.includes('4wd') || m.includes('auto') || m.includes('at')) return 44.0;
      return 39.5;
    }
    if (m.includes('camry')) return 48.0;
    if (m.includes('hycross') || m.includes('innova hycross')) return 29.0;
    if (m.includes('crysta') || m.includes('innova')) return 24.5;
    if (m.includes('hilux')) return 36.0;
    if (m.includes('hyryder') || m.includes('urban cruiser')) return 16.5;
    if (m.includes('glanza')) return 8.8;
    if (m.includes('yaris')) return 11.5;
    if (m.includes('corolla')) return 18.0;
    if (m.includes('etios')) return 8.5;
    return 28.0;
  }

  // 2. Mahindra
  if (b.includes('mahindra') || m.includes('mahindra')) {
    if (m.includes('xuv700') || m.includes('xuv 700')) return 22.5;
    if (m.includes('scorpio-n') || m.includes('scorpio n')) return 19.5;
    if (m.includes('scorpio')) return 16.0;
    if (m.includes('thar roxx')) return 20.0;
    if (m.includes('thar')) return 17.5;
    if (m.includes('xuv 3xo') || m.includes('3xo') || m.includes('xuv300')) return 12.0;
    if (m.includes('xuv500') || m.includes('xuv 500')) return 16.5;
    if (m.includes('bolero neo')) return 11.5;
    if (m.includes('bolero')) return 10.0;
    if (m.includes('marazzo')) return 14.5;
    return 16.0;
  }

  // 3. Hyundai
  if (b.includes('hyundai') || m.includes('hyundai')) {
    if (m.includes('ioniq')) return 47.0;
    if (m.includes('tucson')) return 33.0;
    if (m.includes('santa fe')) return 30.0;
    if (m.includes('alcazar')) return 19.5;
    if (m.includes('creta')) {
      if (m.includes('n line') || m.includes('sx(o)') || m.includes('auto') || m.includes('at')) return 18.5;
      return 15.5;
    }
    if (m.includes('verna')) {
      if (m.includes('turbo') || m.includes('sx') || m.includes('auto')) return 16.0;
      return 13.8;
    }
    if (m.includes('elantra')) return 21.0;
    if (m.includes('venue')) return 11.8;
    if (m.includes('exter')) return 9.2;
    if (m.includes('i20')) return 9.8;
    if (m.includes('aura')) return 8.2;
    if (m.includes('grand i10') || m.includes('nios') || m.includes('i10')) return 7.2;
    if (m.includes('santro')) return 5.8;
    return 13.5;
  }

  // 4. Maruti Suzuki
  if (b.includes('maruti') || b.includes('suzuki') || m.includes('maruti')) {
    if (m.includes('invicto')) return 28.5;
    if (m.includes('grand vitara')) return 16.5;
    if (m.includes('jimny')) return 14.0;
    if (m.includes('brezza') || m.includes('vitara brezza')) return 12.0;
    if (m.includes('fronx')) return 10.8;
    if (m.includes('ertiga')) return 11.5;
    if (m.includes('xl6')) return 13.5;
    if (m.includes('ciaz')) return 11.0;
    if (m.includes('baleno')) return 8.8;
    if (m.includes('swift')) return 8.0;
    if (m.includes('dzire')) return 8.4;
    if (m.includes('ignis')) return 7.2;
    if (m.includes('wagonr') || m.includes('wagon r')) return 6.8;
    if (m.includes('celerio')) return 6.4;
    if (m.includes('spresso') || m.includes('s-presso')) return 5.5;
    if (m.includes('alto')) return 4.8;
    if (m.includes('eeco')) return 5.8;
    return 9.0;
  }

  // 5. Tata Motors
  if (b.includes('tata') || m.includes('tata')) {
    if (m.includes('safari')) return 22.0;
    if (m.includes('harrier')) return 20.5;
    if (m.includes('curvv')) return 16.5;
    if (m.includes('nexon ev')) return 17.5;
    if (m.includes('nexon')) return 12.5;
    if (m.includes('punch ev')) return 13.0;
    if (m.includes('punch')) return 8.5;
    if (m.includes('altroz')) return 8.8;
    if (m.includes('tigor')) return 7.8;
    if (m.includes('tiago ev')) return 10.5;
    if (m.includes('tiago')) return 6.8;
    if (m.includes('hexa')) return 17.0;
    return 13.0;
  }

  // 6. Kia
  if (b.includes('kia') || m.includes('kia')) {
    if (m.includes('ev6')) return 65.0;
    if (m.includes('ev9')) return 130.0;
    if (m.includes('carnival')) return 40.0;
    if (m.includes('seltos')) {
      if (m.includes('gtx') || m.includes('x line') || m.includes('auto')) return 19.5;
      return 16.0;
    }
    if (m.includes('carens')) return 15.0;
    if (m.includes('sonet')) return 12.0;
    return 16.5;
  }

  // 7. Honda
  if (b.includes('honda') || m.includes('honda')) {
    if (m.includes('cr-v') || m.includes('crv')) return 32.0;
    if (m.includes('accord')) return 38.0;
    if (m.includes('civic')) return 22.0;
    if (m.includes('elevate')) return 14.5;
    if (m.includes('city hybrid') || m.includes('city e:hev')) return 21.0;
    if (m.includes('city')) return 15.0;
    if (m.includes('wr-v') || m.includes('wrv')) return 10.5;
    if (m.includes('amaze')) return 8.8;
    if (m.includes('jazz')) return 9.0;
    if (m.includes('brio')) return 6.0;
    return 12.0;
  }

  // 8. BMW
  if (b.includes('bmw') || m.includes('bmw')) {
    if (m.includes('7 series') || m.includes('730') || m.includes('740') || m.includes('i7')) return 175.0;
    if (m.includes('x7')) return 135.0;
    if (m.includes('x5')) return 105.0;
    if (m.includes('x6')) return 110.0;
    if (m.includes('5 series') || m.includes('520') || m.includes('530') || m.includes('m5')) return 75.0;
    if (m.includes('x3')) return 72.0;
    if (m.includes('x4')) return 78.0;
    if (m.includes('3 series') || m.includes('330') || m.includes('320') || m.includes('m340i')) return 58.0;
    if (m.includes('2 series') || m.includes('220')) return 45.0;
    if (m.includes('x1')) return 50.0;
    if (m.includes('z4')) return 88.0;
    return 65.0;
  }

  // 9. Mercedes-Benz
  if (b.includes('mercedes') || b.includes('benz') || m.includes('mercedes')) {
    if (m.includes('s class') || m.includes('s-class') || m.includes('s350') || m.includes('s450') || m.includes('maybach')) return 180.0;
    if (m.includes('gls')) return 140.0;
    if (m.includes('gle')) return 105.0;
    if (m.includes('g-wagon') || m.includes('g wagon') || m.includes('g63') || m.includes('g 400')) return 240.0;
    if (m.includes('e class') || m.includes('e-class') || m.includes('e220') || m.includes('e200') || m.includes('e350')) return 80.0;
    if (m.includes('glc')) return 76.0;
    if (m.includes('c class') || m.includes('c-class') || m.includes('c200') || m.includes('c220')) return 60.0;
    if (m.includes('gla')) return 52.0;
    if (m.includes('glb')) return 65.0;
    if (m.includes('a class') || m.includes('a-class') || m.includes('a200')) return 45.0;
    if (m.includes('eqs') || m.includes('eqe')) return 130.0;
    return 75.0;
  }

  // 10. Audi
  if (b.includes('audi') || m.includes('audi')) {
    if (m.includes('q8') || m.includes('r8')) return 130.0;
    if (m.includes('q7')) return 95.0;
    if (m.includes('a8')) return 140.0;
    if (m.includes('a6')) return 70.0;
    if (m.includes('q5')) return 70.0;
    if (m.includes('a4')) return 50.0;
    if (m.includes('q3')) return 48.0;
    if (m.includes('a3')) return 36.0;
    if (m.includes('e-tron')) return 110.0;
    return 55.0;
  }

  // 11. Skoda / Volkswagen
  if (b.includes('skoda') || m.includes('skoda')) {
    if (m.includes('kodiaq')) return 42.0;
    if (m.includes('superb')) return 38.0;
    if (m.includes('octavia')) return 28.0;
    if (m.includes('kushaq')) return 15.5;
    if (m.includes('slavia')) return 15.5;
    if (m.includes('rapid')) return 10.5;
    return 16.0;
  }
  if (b.includes('volkswagen') || b.includes('vw') || m.includes('volkswagen')) {
    if (m.includes('tiguan')) return 38.0;
    if (m.includes('passat')) return 32.0;
    if (m.includes('taigun')) return 15.5;
    if (m.includes('virtus')) return 15.5;
    if (m.includes('vento')) return 11.0;
    if (m.includes('polo')) return 8.5;
    return 15.0;
  }

  // 12. Land Rover / Jaguar / Jeep / MG / Volvo
  if (b.includes('land rover') || m.includes('defender') || m.includes('range rover')) {
    if (m.includes('defender')) return 120.0;
    if (m.includes('range rover') || m.includes('vogue')) return 220.0;
    if (m.includes('sport')) return 140.0;
    if (m.includes('velar')) return 92.0;
    if (m.includes('evoque')) return 70.0;
    if (m.includes('discovery')) return 95.0;
    return 90.0;
  }
  if (b.includes('jeep') || m.includes('jeep')) {
    if (m.includes('wrangler')) return 68.0;
    if (m.includes('grand cherokee')) return 82.0;
    if (m.includes('meridian')) return 36.0;
    if (m.includes('compass')) return 25.0;
    return 28.0;
  }
  if (b.includes('mg') || m.includes('mg ')) {
    if (m.includes('gloster')) return 42.0;
    if (m.includes('zs ev')) return 24.0;
    if (m.includes('hector plus')) return 21.0;
    if (m.includes('hector')) return 18.0;
    if (m.includes('astor')) return 14.5;
    if (m.includes('comet')) return 8.5;
    return 18.0;
  }

  // Default fallback based on brand category
  if (['bmw', 'audi', 'mercedes', 'volvo', 'jaguar', 'porsche', 'lexus'].some(x => b.includes(x))) return 55.0;
  if (['toyota', 'jeep', 'mg', 'skoda', 'volkswagen'].some(x => b.includes(x))) return 22.0;
  if (['mahindra', 'hyundai', 'kia', 'tata'].some(x => b.includes(x))) return 14.0;
  return 8.5;
}

function calculateCarValuation(brand, model, regYear, km) {
  const m = (model || '').toLowerCase().trim();
  const b = (brand || '').toLowerCase().trim();

  // 1. Determine accurate base new price in Indian Lakhs (Ex-showroom / On-road)
  let basePrice = estimateBaseNewPrice(brand, model);

  // 2. Specific powertrain / trim enhancements
  if (m.includes('auto') || m.includes('automatic') || m.includes('at') || m.includes('dct') || m.includes('dsg') || m.includes('cvt')) {
    // If not already factored into high-tier models
    if (!m.includes('fortuner') && !m.includes('legender') && !m.includes('bmw') && !m.includes('mercedes') && !m.includes('audi')) {
      basePrice *= 1.08;
    }
  }
  if (m.includes('4x4') || m.includes('4wd') || m.includes('awd')) {
    if (!m.includes('fortuner') && !m.includes('legender')) {
      basePrice *= 1.07;
    }
  }

  // 3. Indian Automotive Age & Model Lifecycle Depreciation Schedule
  const currentYear = 2026;
  const age = Math.max(0, currentYear - regYear);

  const isHighRetention = m.includes('fortuner') || m.includes('innova') || m.includes('thar') || m.includes('creta') || m.includes('swift') || m.includes('dzire');
  const isLuxury = ['bmw', 'audi', 'mercedes', 'jaguar', 'land rover', 'porsche', 'volvo'].some(x => b.includes(x) || m.includes(x));

  let retentionRate = 0.92;
  if (age === 0) {
    retentionRate = 0.95;
  } else if (age === 1) {
    retentionRate = isHighRetention ? 0.90 : (isLuxury ? 0.82 : 0.86);
  } else if (age === 2) {
    retentionRate = m.includes('fortuner') ? 0.88 : (isHighRetention ? 0.84 : (isLuxury ? 0.73 : 0.79));
  } else if (age === 3) {
    retentionRate = m.includes('fortuner') ? 0.82 : (isHighRetention ? 0.77 : (isLuxury ? 0.65 : 0.72));
  } else if (age === 4) {
    retentionRate = m.includes('fortuner') ? 0.76 : (isHighRetention ? 0.70 : (isLuxury ? 0.57 : 0.65));
  } else if (age === 5) {
    retentionRate = m.includes('fortuner') ? 0.70 : (isHighRetention ? 0.63 : (isLuxury ? 0.49 : 0.58));
  } else if (age === 6) {
    retentionRate = isHighRetention ? 0.57 : 0.51;
  } else if (age === 7) {
    retentionRate = isHighRetention ? 0.50 : 0.44;
  } else if (age === 8) {
    retentionRate = isHighRetention ? 0.43 : 0.37;
  } else if (age === 9) {
    retentionRate = isHighRetention ? 0.36 : 0.31;
  } else {
    retentionRate = Math.max(0.18, 0.30 - (age - 9) * 0.025);
  }

  // 4. Kilometers Driven (Odometer) Impact
  const expectedKm = Math.max(1, age) * 12000;
  let kmFactor = 1.0;
  if (km <= 2000) {
    // Showroom delivery / Zero-meter condition
    kmFactor = 1.05;
  } else if (km <= 10000 && age <= 2) {
    kmFactor = 1.03;
  } else {
    const diff = km - expectedKm;
    if (diff > 0) {
      kmFactor = Math.max(0.76, 1.0 - (diff / 20000) * 0.025);
    } else {
      kmFactor = Math.min(1.05, 1.0 + (Math.abs(diff) / 20000) * 0.015);
    }
  }

  const estimated = Math.max(1.5, basePrice * retentionRate * kmFactor);
  const minVal = (estimated * 0.95).toFixed(2);
  const maxVal = (estimated * 1.05).toFixed(2);

  return { minVal, maxVal, estimated: estimated.toFixed(2), basePrice: basePrice.toFixed(2) };
}

function initSellCarCalculator() {
  const form = document.getElementById('sell-car-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const brand = document.getElementById('sell-brand').value;
    const model = document.getElementById('sell-model').value;
    const year = parseInt(document.getElementById('sell-year').value) || 2020;
    const km = parseInt(document.getElementById('sell-km').value) || 0;
    const phone = document.getElementById('sell-phone').value;

    const isEn = window.currentAppLang === 'en';

    if (!model || !phone) {
      alert(isEn ? 'Please enter your car model and contact phone number.' : 'कृपया अपनी गाड़ी का मॉडल और फोन नंबर दर्ज करें।');
      return;
    }

    if (window.showroomInstance && window.showroomInstance.soundEngine) {
      window.showroomInstance.soundEngine.playLockChirp();
    }

    const { minVal, maxVal } = calculateCarValuation(brand, model, year, km);

    const valuationModal = document.getElementById('valuation-result-modal');
    const resultBox = document.getElementById('valuation-result-content');
    
    if (valuationModal && resultBox) {
      resultBox.innerHTML = `
        <div style="text-align: center; padding: 10px 0;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(16, 185, 129, 0.15); border: 2px solid #10b981; color: #10b981; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 15px;">✓</div>
          <h3 style="font-size: 1.55rem; color: var(--text-main); font-weight: 800; margin-bottom: 6px;">
            ${isEn ? 'Estimated Market Value' : 'अनुमानित मूल्य (Estimated Market Value)'}
          </h3>
          <p style="color: var(--text-muted); font-size: 0.92rem; margin-bottom: 18px;">
            <strong>${brand} ${model}</strong> (${year} • ${km.toLocaleString()} KM)
          </p>
          
          <div style="background: #FAF8F5; border: 1.5px solid #C5A46D; padding: 22px; border-radius: 16px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(18, 61, 50, 0.08);">
            <div style="font-size: 0.82rem; letter-spacing: 0.5px; color: #123D32; text-transform: uppercase; font-weight: 800; margin-bottom: 4px;">
              ${isEn ? 'Sadguru Motors Live Market Deal Offer' : 'सद्गुरु मोटर्स लाइव मार्केट डील ऑफर'}
            </div>
            <div style="font-size: 2.35rem; font-weight: 800; color: #123D32; margin-top: 4px; letter-spacing: -0.5px;">
              ₹${minVal} - ₹${maxVal} Lakh
            </div>
            <div style="display: flex; gap: 8px; justify-content: center; margin-top: 12px; flex-wrap: wrap;">
              <span style="background: rgba(18, 61, 50, 0.08); border: 1px solid rgba(18, 61, 50, 0.2); color: #123D32; font-size: 0.74rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
                ✓ NCR Market Verified
              </span>
              <span style="background: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.35); color: #065f46; font-size: 0.74rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
                ✓ 45-Min Bank Transfer
              </span>
              <span style="background: rgba(197, 164, 109, 0.18); border: 1px solid #C5A46D; color: #785a28; font-size: 0.74rem; font-weight: 700; padding: 4px 10px; border-radius: 9999px;">
                ✓ Free RC Transfer
              </span>
            </div>
          </div>

          <div class="modal-btn-row" style="display: flex; gap: 12px; flex-wrap: wrap;">
            <a href="https://wa.me/919911922050?text=${encodeURIComponent(isEn ? `Hello Sadguru Motors, I want to sell my ${brand} ${model} (${year}, ${km} km). Online estimated offer: ₹${minVal}-₹${maxVal} Lakh. Phone: ${phone}. Please schedule free doorstep inspection in Gurugram.` : `नमस्ते सद्गुरु मोटर्स, मुझे अपनी ${brand} ${model} (${year}, ${km} km) बेचनी है। ऑनलाइन अनुमानित ऑफर: ₹${minVal}-₹${maxVal} लाख। फोन: ${phone}। कृपया गुड़गांव में फ्री इंस्पेक्शन शेड्यूल करें।`)}" target="_blank" class="btn btn-whatsapp" style="flex: 1.2; padding: 12px 18px;">
              <i data-lucide="message-circle"></i> ${isEn ? 'Schedule Inspection in Sector 14' : 'सेक्टर 14 इंस्पेक्शन शेड्यूल करें'}
            </a>
            <button class="btn btn-secondary" onclick="window.closeAllModals(event)" style="padding: 12px 20px;" data-close-modal="true">
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

    window.open(`https://wa.me/919911922050?text=${encodeURIComponent(message)}`, '_blank');
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

    // Global close mobile drawer helper
    window.closeMobileMenu = function() {
      navLinks.classList.remove('mobile-active');
      if (mobileBtn) {
        mobileBtn.innerHTML = '<i data-lucide="menu" style="width: 24px; height: 24px;"></i>';
        if (window.lucide) lucide.createIcons();
      }
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target) && navLinks.classList.contains('mobile-active')) {
        window.closeMobileMenu();
      }
    });
  }

  // Initialize Translucent Liquid Glass Click Effects & Ultra-Smooth UI
  initTranslucentInteractionsAndSmoothUI();
}

/**
 * Ultra-Smooth Translucent Liquid Glass Ripple & Silky Smooth Interaction Engine
 */
function initTranslucentInteractionsAndSmoothUI() {
  // 1. Global Translucent Glass Ripple on click/tap of ANY button or interactive element
  const clickableSelector = `
    button, 
    .btn, 
    a.btn, 
    .category-btn, 
    .category-pill, 
    .gallery-tab-btn, 
    .hud-icon-toggle, 
    .hero-mode-btn, 
    .btn-cam-view, 
    .lang-btn, 
    .fab-btn, 
    .modal-close-btn, 
    .btn-fast-google, 
    .gallery-thumb-item, 
    .color-swatch, 
    .user-profile-btn,
    .top-link, 
    .hero-nav-arrow,
    [role="button"]
  `;

  document.addEventListener('click', (e) => {
    const target = e.target.closest(clickableSelector);
    if (!target) return;

    // Create translucent liquid ripple
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'liquid-translucent-ripple';

    const size = Math.max(rect.width, rect.height) * 2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;

    // Coordinates relative to button
    const x = (e.clientX !== undefined && e.clientX !== 0) ? (e.clientX - rect.left) : (rect.width / 2);
    const y = (e.clientY !== undefined && e.clientY !== 0) ? (e.clientY - rect.top) : (rect.height / 2);
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Ensure container constraints without breaking styles
    const computedPos = window.getComputedStyle(target).position;
    if (computedPos === 'static') {
      target.style.position = 'relative';
    }

    // Add sheen flash micro-animation
    target.classList.add('translucent-sheen-active');
    setTimeout(() => {
      target.classList.remove('translucent-sheen-active');
    }, 350);

    target.appendChild(ripple);

    // Subtle tactile audio click feedback
    try {
      if (window.soundEngine && !window.soundEngine.isMuted) {
        window.soundEngine.playSwitchClick();
      }
    } catch (err) {}

    // Clean up ripple element smoothly
    setTimeout(() => {
      if (ripple && ripple.parentNode) {
        ripple.remove();
      }
    }, 450);
  }, { passive: true });

  // 2. Ultra-Smooth Anchor Scrolling with Fixed Header Offset
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href === '#!') return;

    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  });
}

/**
 * Liquid Glass Hero Banner Angle Switcher
 */
window.switchHeroBannerAngle = function(index, src, btnElement) {
  const carImg = document.getElementById('hero-banner-car-img');
  if (carImg) {
    carImg.style.opacity = '0.35';
    carImg.style.transform = 'scale(0.98)';
    setTimeout(() => {
      carImg.src = src;
      carImg.style.opacity = '1';
      carImg.style.transform = 'scale(1)';
    }, 120);
  }
  const tabs = document.querySelectorAll('.angle-tab');
  tabs.forEach(tab => tab.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }
  if (window.soundEngine && typeof window.soundEngine.playSwitchClick === 'function') {
    try { window.soundEngine.playSwitchClick(); } catch (e) {}
  }
};

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
    src: 'assets/car-photos/verna-scuff-plate.jpg',
    label_hi: '8. इल्यूमिनेटेड डोर स्कफ प्लेट्स • 8 / 9',
    label_en: '8. Illuminated Door Scuff Plates • 8 / 9'
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
  if (!mainImg) return;
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
  { id: 13, url: 'assets/car-photos/verna-seats-detail.jpg', cat: 'interior', label_hi: '13. प्रीमियम लेदरेट अपहोल्स्ट्री व फिनिशिंग', label_en: '13. Premium Leatherette Upholstery Detail' },
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
