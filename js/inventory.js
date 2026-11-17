/**
 * Sadguru Motors - Certified Inventory Database & Modal Renderer
 * Sector 14, Gurgaon (Certified)
 * Supports full bilingual rendering (English & Hindi)
 */

const CAR_INVENTORY_DATA = [
  {
    "id": "verna-hr26-sport",
    "name": "2022 Hyundai Verna 1.5 CRDi AT SX (Sport Edition)",
    "brand": "Hyundai",
    "year": 2022,
    "price": 10.85,
    "type": "sedan",
    "fuel_hi": "डीजल (1.5 CRDi Turbo)",
    "fuel_en": "Diesel (1.5 CRDi Turbo)",
    "trans_hi": "6-स्पीड ऑटोमैटिक (AT)",
    "trans_en": "6-Speed Automatic (AT)",
    "km": "67,861 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव नॉर्थ)",
    "reg_en": "Certified Pre-Owned (Gurugram North)",
    "owners_hi": "1st ओनर (सिंगल हैंडेड)",
    "owners_en": "1st Owner (Single Handed)",
    "color_hi": "पोलर व्हाइट (ब्लैक रूफ & जीटी किट)",
    "color_en": "Polar White (Black Roof & GT Kit)",
    "inspectionGrade": "A+ (99/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/verna-hero-34.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/verna-hero-34.jpg",
        "label_hi": "फ्रंट 3/4 हीरो व्यू",
        "label_en": "Front 3/4 Hero Stance"
      },
      {
        "url": "assets/car-photos/verna-side.jpg",
        "label_hi": "फुल साइड प्रोफाइल",
        "label_en": "Side Profile Stance"
      },
      {
        "url": "assets/car-photos/verna-rear-gt.jpg",
        "label_hi": "रियर जीटी विंग & क्वाड एग्जॉस्ट",
        "label_en": "Rear GT Wing & Quad Exhaust"
      },
      {
        "url": "assets/car-photos/verna-front-straight.jpg",
        "label_hi": "फ्रंट सीधा फेस",
        "label_en": "Front Direct Face"
      },
      {
        "url": "assets/car-photos/verna-interior-sunroof.jpg",
        "label_hi": "कॉकपिट, सनरूफ & नियॉन लाइट",
        "label_en": "Cockpit, Electric Sunroof & Ambient Light"
      },
      {
        "url": "assets/car-photos/verna-steering-dash.jpg",
        "label_hi": "स्टीयरिंग व्हील & डिजिटल क्लस्टर",
        "label_en": "Steering Wheel & Digital Cluster"
      },
      {
        "url": "assets/car-photos/verna-front-seats.jpg",
        "label_hi": "स्पार्को कुशन वाली बकेट सीट्स",
        "label_en": "Front Bucket Seats with Sparco Cushions"
      },
      {
        "url": "assets/car-photos/verna-rear-seats.jpg",
        "label_hi": "रियर लेदर सीट्स & सनशेड",
        "label_en": "Rear Leather Seats & Sunshade"
      },
      {
        "url": "assets/car-photos/verna-passenger-dash.jpg",
        "label_hi": "पैसेंजर साइड केबिन व्यू",
        "label_en": "Passenger Cabin & Ambient Lighting"
      },
      {
        "url": "assets/car-photos/verna-scuff-plate.jpg",
        "label_hi": "हुंडई इल्यूमिनेटेड स्कफ प्लेट",
        "label_en": "Hyundai Illuminated Scuff Plate"
      },
      {
        "url": "assets/car-photos/verna-speedometer.jpg",
        "label_hi": "सर्टिफाइड ओडोमीटर (67,861 KM)",
        "label_en": "Certified Odometer (67,861 KM)"
      },
      {
        "url": "assets/car-photos/verna-rc-card.jpg",
        "label_hi": "हरियाणा सरकारी आरसी कार्ड (वेरिफाइड)",
        "label_en": "Govt RC Card (Verified Gurugram)"
      },
      {
        "url": "assets/car-photos/verna-front-left-34.jpg",
        "label_hi": "फ्रंट-लेफ्ट एंगल 2",
        "label_en": "Front-Left 3/4 Stance"
      },
      {
        "url": "assets/car-photos/verna-rear-straight.jpg",
        "label_hi": "रियर सीधा एंगल",
        "label_en": "Rear Straight View"
      },
      {
        "url": "assets/car-photos/verna-hero-angle2.jpg",
        "label_hi": "फ्रंट डायनेमिक एंगल",
        "label_en": "Front Dynamic Angle"
      },
      {
        "url": "assets/car-photos/verna-front-angle2.jpg",
        "label_hi": "फ्रंट एलीवेशन व्यू",
        "label_en": "Front Elevation View"
      },
      {
        "url": "assets/car-photos/verna-rear-angle2.jpg",
        "label_hi": "जीटी विंग टॉप एंगल",
        "label_en": "GT Wing Top Angle"
      },
      {
        "url": "assets/car-photos/verna-seats-detail.jpg",
        "label_hi": "लेदर सीट्स व ब्राइड पैड",
        "label_en": "Leather Seats & Bride Pad"
      },
      {
        "url": "assets/car-photos/verna-front-angle3.jpg",
        "label_hi": "फ्रंट प्रोफाइल क्लोजअप",
        "label_en": "Front Profile Stance"
      }
    ],
    "features_hi": [
      "इलेक्ट्रिक सनरूफ",
      "हाई-डाउनफ़ोर्स जीटी विंग स्पॉइलर",
      "क्वाड क्रोम एग्जॉस्ट डिफ्यूज़र",
      "पर्पल/मैजेंटा एम्बिएंट नियॉन इंटीरियर",
      "1.5L CRDi टर्बो डीजल इंजन (115 PS)",
      "6-स्पीड स्मूथ ऑटोमैटिक ट्रांसमिशन",
      "स्पार्को हेडरेस्ट & ब्राइड पैड्स",
      "10.25\" एचडी टचस्क्रीन + एप्पल कारप्ले",
      "हुंडई इल्यूमिनेटेड डोर स्कफ प्लेट्स",
      "डिजिटल टीएफटी स्पीडोमीटर क्लस्टर",
      "क्रूज़ कंट्रोल & स्टीयरिंग कंट्रोल्स",
      "सर्टिफाइड 67,861 KM (नॉन-टैम्पर्ड)"
    ],
    "features_en": [
      "Electric Sunroof",
      "High-Downforce GT Wing Spoiler",
      "Quad Chrome Exhaust Diffuser",
      "Purple/Magenta Ambient Neon Lighting",
      "1.5L CRDi Turbo Diesel Engine (115 PS)",
      "6-Speed Smooth Automatic Transmission",
      "Sparco Headrests & Bride Cushions",
      "10.25\" HD Touchscreen with Apple CarPlay",
      "Hyundai Illuminated Door Scuff Plates",
      "Digital TFT Speedometer Instrument Cluster",
      "Cruise Control & Multi-function Steering",
      "Certified 67,861 KM (Non-tampered)"
    ],
    "desc_hi": "गुड़गांव (Certified) में रजिस्टर्ड 2022 हुंडई वरना 1.5 CRDi डीजल ऑटोमैटिक SX स्पोर्ट्स एडिशन। 1st ओनर गाड़ी है, 67,861 किमी चली है। इसमें हाई-डाउनफ़ोर्स GT विंग, क्वाड क्रोम एग्जॉस्ट, सनरूफ, स्पार्को सीट कुशन, एम्बिएंट नियॉन लाइटिंग और नई कंडीशन टायर्स लगे हैं। ओरिजिनल सरकारी आरसी कार्ड वेरिफाइड है। 1 साल की वारंटी और फ्री आरसी ट्रांसफर शामिल है।",
    "desc_en": "Gurugram registered (Certified) 2022 Hyundai Verna 1.5 CRDi Diesel Automatic SX Sport Edition. 1st single owner, genuine 67,861 km with verified service records. Customized with GT wing spoiler, quad exhaust diffuser, electric sunroof, Sparco headrests, custom ambient neon lighting and black alloy wheels. 100% verified non-accidental with 1-Year Warranty and free RC transfer."
  },
  {
    "id": "sonet-2022-htx-at",
    "name": "2022 Kia Sonet HTX 1.5 CRDi Automatic",
    "brand": "Kia",
    "year": 2022,
    "price": 9.9,
    "type": "suv",
    "fuel_hi": "डीजल (1.5L CRDi Turbo)",
    "fuel_en": "Diesel (1.5L CRDi Turbo)",
    "trans_hi": "6-स्पीड टॉर्क कन्वर्टर ऑटोमैटिक (AT)",
    "trans_en": "6-Speed Torque Converter Automatic (AT)",
    "km": "85,000 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव HR-98)",
    "reg_en": "Certified Pre-Owned (Gurugram)",
    "owners_hi": "1st सिंगल ओनर",
    "owners_en": "1st Single Owner",
    "color_hi": "ग्लेशियर व्हाइट पर्ल",
    "color_en": "Glacier White Pearl",
    "inspectionGrade": "A+ (99/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/sonet-2022/sonet-2022-hero.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-hero.jpg",
        "label_hi": "फ्रंट 3/4 हीरो स्टांस (टाइगर नोज)",
        "label_en": "Front 3/4 Hero Stance (Tiger Nose)"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-side-profile.jpg",
        "label_hi": "फुल साइड प्रोफाइल & रूफ रेल्स",
        "label_en": "Full Side Profile & Roof Rails"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-rear-34.jpg",
        "label_hi": "रियर 3/4 स्टांस & कनेक्टेड टेललैंप्स",
        "label_en": "Rear 3/4 Stance & Connected LED Lights"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-rear-straight.jpg",
        "label_hi": "रियर सीधा व्यू & डिफ्यूज़र",
        "label_en": "Rear Profile & Sport Diffuser"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-cockpit.jpg",
        "label_hi": "कॉकपिट, 10.25\" स्क्रीन & पैडल शिफ्टर्स",
        "label_en": "Cockpit, 10.25\" Display & Paddle Shifters"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-front-seats.jpg",
        "label_hi": "प्रीमियम डुअल-टोन लेदरेट सीट्स",
        "label_en": "Premium Dual-Tone Leatherette Seats"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-rear-seats.jpg",
        "label_hi": "रियर केबिन स्पेस & एसी वेंट्स",
        "label_en": "Rear Cabin Comfort & AC Vents"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-sunroof-cabin.jpg",
        "label_hi": "इलेक्ट्रिक सनरूफ & पैनोरमिक केबिन",
        "label_en": "Electric Sunroof & Panoramic Cabin View"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-gear-console.jpg",
        "label_hi": "ऑटोमैटिक गियरबॉक्स & ड्राइव मोड्स",
        "label_en": "Automatic Shifter & Traction Modes"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-engine.jpg",
        "label_hi": "1.5L CRDi टर्बो डीजल इंजन (ओरिजिनल)",
        "label_en": "1.5L CRDi Turbo Diesel Engine"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-push-start.jpg",
        "label_hi": "इंजन स्टार्ट/स्टॉप & ट्रैक्शन कंट्रोल",
        "label_en": "Engine Push Start & Traction Control"
      },
      {
        "url": "assets/car-photos/sonet-2022/sonet-2022-door-console.jpg",
        "label_hi": "ड्राइवर डोर पावर विंडो कंट्रोल्स",
        "label_en": "Driver Door Power Window Controls"
      }
    ],
    "features_hi": [
      "1.5L CRDi टर्बो डीजल पावरफुल इंजन (115 PS)",
      "6-स्पीड टॉर्क कन्वर्टर ऑटोमैटिक गियरबॉक्स",
      "स्पोर्टी पैडल शिफ्टर्स (Paddle Shifters)",
      "इलेक्ट्रिक सनरूफ (Electric Sunroof)",
      "10.25\" एचडी टचस्क्रीन + एप्पल कारप्ले & एंड्रॉइड ऑटो",
      "ड्राइव मोड्स (Eco, Normal, Sport) & ट्रैक्शन मोड्स",
      "पुश बटन स्टार्ट/स्टॉप & स्मार्ट कीलेस एंट्री",
      "16\" क्रिस्टल कट डायमंड अलॉय व्हील्स",
      "स्मार्ट प्योर एयर प्यूरीफायर",
      "रियर एसी वेंट्स & रियर सनशेड्स",
      "वैलिड कॉम्प्रिहेंसिव इंश्योरेंस",
      "1 साल की वारंटी & फ्री RC ट्रांसफर"
    ],
    "features_en": [
      "1.5L CRDi Turbo Diesel Engine (115 PS / 250 Nm)",
      "6-Speed Torque Converter Automatic Transmission",
      "Sport Steering Paddle Shifters",
      "Electric One-Touch Sunroof",
      "10.25\" HD Touchscreen with Apple CarPlay & Android Auto",
      "Multi-Drive Modes (Eco, Normal, Sport) & Traction Modes",
      "Push Button Start/Stop & Smart Keyless Entry",
      "16\" Crystal-Cut Diamond Alloy Wheels",
      "Smart Pure Air Purifier with Virus Protection",
      "Rear AC Vents & Integrated Sunshade Blinds",
      "Valid Comprehensive Insurance",
      "1-Year Sadguru Shield Warranty & Free RC Transfer"
    ],
    "desc_hi": "2022 किआ सोनेट HTX 1.5 CRDi डीजल ऑटोमैटिक। 1st ओनर गाड़ी है, 85,000 किमी चली है और वैलिड इंश्योरेंस के साथ उपलब्ध है। इसमें इलेक्ट्रिक सनरूफ, 10.25\" टचस्क्रीन, स्टीयरिंग पैडल शिफ्टर्स, ड्राइव & ट्रैक्शन मोड्स, डायमंड कट अलॉय व्हील्स, पुश बटन स्टार्ट और रियर एसी वेंट्स शामिल हैं। 100% नॉन-एक्सीडेंटल गारंटी, फ्री आरसी ट्रांसफर और 1 साल की वारंटी उपलब्ध है।",
    "desc_en": "2022 Kia Sonet HTX 1.5 CRDi Diesel Automatic. 1st single owner, genuine 85,000 km with valid comprehensive insurance. Top-tier equipment including electric sunroof, 10.25\" HD touchscreen with smartphone connectivity, steering-mounted paddle shifters, multi-drive and traction modes, crystal-cut alloy wheels, push button start, and rear AC vents. Certified 100% non-accidental with 1-Year Warranty and free RC transfer."
  },
  {
    "id": "verna-2015-sx-at",
    "name": "2015 Hyundai Verna 1.6 VTVT SX Automatic",
    "brand": "Hyundai",
    "year": 2015,
    "price": 4.75,
    "type": "sedan",
    "fuel_hi": "पेट्रोल (1.6L VTVT)",
    "fuel_en": "Petrol (1.6L VTVT)",
    "trans_hi": "स्मूथ ऑटोमैटिक (AT)",
    "trans_en": "Smooth Automatic (AT)",
    "km": "80,000 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव HR-26)",
    "reg_en": "Certified Pre-Owned (Gurugram)",
    "owners_hi": "1st सिंगल ओनर",
    "owners_en": "1st Single Owner",
    "color_hi": "स्लीक सिल्वर मैटेलिक",
    "color_en": "Sleek Silver Metallic",
    "inspectionGrade": "A+ (98/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/verna-2015/verna-2015-hero.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/verna-2015/verna-2015-hero.jpg",
        "label_hi": "फ्रंट 3/4 हीरो व्यू",
        "label_en": "Front 3/4 Hero View"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-side.jpg",
        "label_hi": "फुल साइड प्रोफाइल व्यू",
        "label_en": "Full Side Profile"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-rear-34.jpg",
        "label_hi": "रियर 3/4 प्रोफाइल",
        "label_en": "Rear 3/4 Profile"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-rear-left.jpg",
        "label_hi": "रियर लेफ्ट एंगल",
        "label_en": "Rear Left Angle"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-interior-dash.jpg",
        "label_hi": "फुल डैशबोर्ड & कॉकपिट",
        "label_en": "Full Dashboard & Cockpit"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-front-seats.jpg",
        "label_hi": "फ्रंट सीट्स & केबिन",
        "label_en": "Front Seats & Clean Cabin"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-speedometer.jpg",
        "label_hi": "ओडोमीटर (80,463 KM) & स्टार्ट बटन",
        "label_en": "Odometer (80,463 KM) & Push Start"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-audio-system.jpg",
        "label_hi": "ओरिजिनल म्यूजिक सिस्टम & क्लाइमेट AC",
        "label_en": "Original Audio System & Climate Control"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-gear-console.jpg",
        "label_hi": "ऑटोमैटिक गियरबॉक्स & स्मार्ट की",
        "label_en": "Automatic Gear Shifter & Smart Key"
      },
      {
        "url": "assets/car-photos/verna-2015/verna-2015-wheels.jpg",
        "label_hi": "डायमंड कट अलॉय व्हील्स & टायर्स",
        "label_en": "Diamond Cut Alloys & Tyres"
      }
    ],
    "features_hi": [
      "1.6L VTVT 4-सिलेंडर पावरफुल पेट्रोल इंजन",
      "स्मूथ ऑटोमैटिक ट्रांसमिशन (Gated AT)",
      "पुश बटन स्टार्ट/स्टॉप & कीलेस स्मार्ट एंट्री",
      "100% ऑल ओरिजिनल - नो रीपेंट, नो पार्ट चेंज",
      "1st सिंगल ओनर कार (वेल-मेंटेंड)",
      "ऑटोमैटिक क्लाइमेट कंट्रोल AC + क्लीन एयर",
      "डायमंड कट ओरिजिनल अलॉय व्हील्स",
      "स्टीयरिंग माउंटेड ऑडियो & कॉलिंग कंट्रोल्स",
      "इलेक्ट्रिकली एडजस्टेबल & फोल्डेबल ORVMs",
      "रिवर्स पार्किंग सेंसर्स & असिस्टेंस",
      "वैलिड कॉम्प्रिहेंसिव इंश्योरेंस",
      "1 साल की वारंटी & फ्री RC ट्रांसफर"
    ],
    "features_en": [
      "1.6L VTVT 4-Cylinder Petrol Engine",
      "Smooth Automatic Transmission (Gated AT)",
      "Push Button Start/Stop & Keyless Smart Entry",
      "100% All Original - Zero Repaint, No Part Change",
      "1st Single Owner Vehicle (Immaculate Condition)",
      "Automatic Climate Control AC with Clean Air Ionizer",
      "OEM Diamond Cut Alloy Wheels",
      "Steering-Mounted Audio & Call Controls",
      "Electrically Adjustable & Folding Outside Mirrors",
      "Reverse Parking Sensors",
      "Valid Comprehensive Insurance",
      "1-Year Sadguru Shield Warranty & Free RC Transfer"
    ],
    "desc_hi": "2015 हुंडई वरना 1.6 VTVT SX पेट्रोल ऑटोमैटिक। फर्स्ट ओनर, 80,000 किमी चली हुई, ऑल ओरिजिनल कंडीशन में (नो पेंट, नो पार्ट चेंज)। पुश बटन स्टार्ट, स्मार्ट की, ऑटोमैटिक क्लाइमेट कंट्रोल, अलॉय व्हील्स और वैलिड इंश्योरेंस के साथ उपलब्ध है। 100% नॉन-एक्सीडेंटल गारंटी, फ्री आरसी ट्रांसफर और 1 साल की वारंटी शामिल है।",
    "desc_en": "2015 Hyundai Verna 1.6 VTVT SX Petrol Automatic. 1st single owner, genuine 80,000 km, 100% all original vehicle (zero repaint, no part changed). Features push button start, smart keyless entry, automatic transmission, automatic climate control with Clean Air, diamond cut alloy wheels, and valid comprehensive insurance. Includes 1-Year Warranty and free RC transfer."
  },
  {
    "id": "dzire-2018-zdi-at",
    "name": "2018 Maruti Suzuki Dzire ZDi Automatic",
    "brand": "Maruti Suzuki",
    "year": 2018,
    "price": 5.65,
    "type": "sedan",
    "fuel_hi": "डीजल (1.3L DDiS Turbo)",
    "fuel_en": "Diesel (1.3L DDiS Turbo)",
    "trans_hi": "5-स्पीड एजीएस ऑटोमैटिक (AT)",
    "trans_en": "5-Speed AGS Automatic (AT)",
    "km": "93,000 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव HR-51)",
    "reg_en": "Certified Pre-Owned (Gurugram)",
    "owners_hi": "1st सिंगल ओनर",
    "owners_en": "1st Single Owner",
    "color_hi": "ऑक्सफोर्ड ब्लू मैटेलिक",
    "color_en": "Oxford Blue Metallic",
    "inspectionGrade": "A+ (99/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/dzire-2018/dzire-2018-hero.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-hero.jpg",
        "label_hi": "फ्रंट 3/4 हीरो स्टांस",
        "label_en": "Front 3/4 Hero Stance"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-front-straight.jpg",
        "label_hi": "फ्रंट सीधा फेस & क्रोम ग्रिल",
        "label_en": "Front Profile & Chrome Grille"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-rear-profile.jpg",
        "label_hi": "रियर प्रोफाइल & एलईडी टेललैंप्स",
        "label_en": "Rear Profile & LED Taillamps"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-side-profile.jpg",
        "label_hi": "फुल साइड सेडान प्रोफाइल",
        "label_en": "Full Side Sedan Stance"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-rear-34.jpg",
        "label_hi": "रियर 3/4 एंगल",
        "label_en": "Rear 3/4 Angle"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-front-left-34.jpg",
        "label_hi": "फ्रंट लेफ्ट 3/4 स्टांस",
        "label_en": "Front Left 3/4 Stance"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-front-angle.jpg",
        "label_hi": "फ्रंट डायनेमिक एंगल",
        "label_en": "Front Dynamic Angle"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-cockpit.jpg",
        "label_hi": "प्रीमियम डुअल-टोन कॉकपिट व वुडन ट्रिम",
        "label_en": "Dual-Tone Cockpit & Wooden Trim"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-gear-console.jpg",
        "label_hi": "स्मूथ एजीएस ऑटोमैटिक गियरबॉक्स",
        "label_en": "Smooth AGS Automatic Shifter"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-steering-pushstart.jpg",
        "label_hi": "फ्लैट बॉटम स्टीयरिंग & पुश बटन स्टार्ट",
        "label_en": "Flat-Bottom Steering & Push Start"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-odometer.jpg",
        "label_hi": "सर्टिफाइड ओडोमीटर (93,000 KM)",
        "label_en": "Certified Odometer (93,000 KM)"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-audio-system.jpg",
        "label_hi": "स्मार्ट ऑडियो सिस्टम & ऑटोमैटिक एसी",
        "label_en": "Smart Audio & Auto Climate Control"
      },
      {
        "url": "assets/car-photos/dzire-2018/dzire-2018-engine.jpg",
        "label_hi": "1.3L DDiS डीजल इंजन (28.4 km/l माइलेज)",
        "label_en": "1.3L DDiS Diesel Engine (28.4 km/l)"
      }
    ],
    "features_hi": [
      "1.3L DDiS टर्बो डीजल इंजन (28.4 kmpl माइलेज)",
      "स्मूथ 5-स्पीड एजीएस ऑटोमैटिक (AT) गियरबॉक्स",
      "इंजन पुश बटन स्टार्ट/स्टॉप & स्मार्ट की",
      "ऑटोमैटिक क्लाइमेट कंट्रोल एसी",
      "15\" प्रिसिजन कट अलॉय व्हील्स",
      "प्रीमियम डुअल-टोन बेज व वुडन इंटीरियर",
      "डुअल एयरबैग्स & ABS विथ EBD",
      "स्टीयरिंग माउंटेड ऑडियो व कॉलिंग कंट्रोल्स",
      "इलेक्ट्रिकली फोल्डेबल ORVMs टर्न इंडिकेटर्स के साथ",
      "रिवर्स पार्किंग सेंसर्स",
      "1st सिंगल ओनर, ओरिजिनल पेंट कंडीशन",
      "1 साल की सद्गुरु शील्ड वारंटी & फ्री RC ट्रांसफर"
    ],
    "features_en": [
      "1.3L DDiS Turbo Diesel Engine (28.4 kmpl Mileage)",
      "Smooth 5-Speed AGS Automatic Transmission",
      "Engine Push Button Start/Stop & Smart Keyless Entry",
      "Automatic Climate Control AC",
      "15\" Precision-Cut Alloy Wheels",
      "Premium Dual-Tone Beige & Burl Wood Cabin",
      "Dual Front Airbags & ABS with EBD",
      "Steering Mounted Audio & Phone Controls",
      "Electrically Foldable ORVMs with Turn Indicators",
      "Rear Parking Sensors",
      "1st Single Handed Owner, All-Original Paint",
      "1-Year Sadguru Shield Warranty & Free RC Transfer"
    ],
    "desc_hi": "2018 मारुति सुजुकी डिजायर ZDi ऑटोमैटिक डीजल। 1st सिंगल ओनर गाड़ी, सर्टिफाइड 93,000 किमी रनिंग। यह टॉप-एंड ZDi ऑटोमैटिक वैरिएंट है जिसमें पुश-बटन स्टार्ट, कीलेस एंट्री, ऑटोमैटिक क्लाइमेट कंट्रोल, फ्लैट-बॉटम स्टीयरिंग, अलॉय व्हील्स और 28 किमी/लीटर की बेहतरीन माइलेज मिलती है। 100% नॉन-एक्सीडेंटल, ऑल-ओरिजिनल पेंट, 1 साल की वारंटी और फ्री आरसी ट्रांसफर शामिल है।",
    "desc_en": "2018 Maruti Suzuki Dzire ZDi Automatic Diesel. 1st single owner, genuine 93,000 km with full verification. Top-of-the-line ZDi variant equipped with Push-Button Start, Smart Keyless Entry, Automatic Climate Control, flat-bottom leatherette steering, factory alloys, and segment-best 28 km/l fuel economy. Certified 100% non-accidental with 1-Year Warranty and free RC transfer."
  },
  {
    "id": "crysta-2021-g-mt",
    "name": "2021 Toyota Innova Crysta 2.4 G Manual",
    "brand": "Toyota",
    "year": 2021,
    "price": 14.25,
    "type": "suv",
    "fuel_hi": "डीजल (2.4L GD Turbo Diesel)",
    "fuel_en": "Diesel (2.4L GD Turbo Diesel)",
    "trans_hi": "5-स्पीड मैनुअल ट्रांसमिशन (MT)",
    "trans_en": "5-Speed Manual Transmission (MT)",
    "km": "2,06,000 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव HR-51)",
    "reg_en": "Certified Pre-Owned (Gurugram)",
    "owners_hi": "2nd ओनर (वेल-मेंटेंड)",
    "owners_en": "2nd Owner (Well Maintained)",
    "color_hi": "सुपर व्हाइट",
    "color_en": "Super White",
    "inspectionGrade": "A+ (98/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/crysta-2021/crysta-2021-hero.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-hero.jpg",
        "label_hi": "फ्रंट 3/4 हीरो स्टांस (क्रिस्टा बोल्ड)",
        "label_en": "Front 3/4 Hero Stance (Crysta Bold)"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-side-profile.jpg",
        "label_hi": "फुल साइड व्यू & टूरिंग प्रोफाइल",
        "label_en": "Full Side Stance & Touring Profile"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-rear-34.jpg",
        "label_hi": "रियर 3/4 प्रोफाइल & बम्पर गार्ड",
        "label_en": "Rear 3/4 Profile & Bumper Protector"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-rear-angle2.jpg",
        "label_hi": "रियर एंगल 2 & क्रिस्टा क्रोम बैजिंग",
        "label_en": "Rear Elevation & Crysta Chrome Badge"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-front-grille.jpg",
        "label_hi": "पियानो ब्लैक फ्रंट ग्रिल & क्रोम फिनिश",
        "label_en": "Piano Black Grille & Chrome Inserts"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-hero-angle2.jpg",
        "label_hi": "फ्रंट 3/4 अल्टरनेट एंगल",
        "label_en": "Front 3/4 Alternate Stance"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-cockpit.jpg",
        "label_hi": "कॉकपिट, डैशबोर्ड & स्टीयरिंग कंट्रोल्स",
        "label_en": "Ergonomic Cockpit & Steering Controls"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-front-seats.jpg",
        "label_hi": "आलीशान फैब्रिक फ्रंट सीट्स व आर्मरेस्ट",
        "label_en": "Plush Front Bucket Seats & Armrest"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-rear-seats.jpg",
        "label_hi": "7/8 सीटर स्पेशियस रियर लाउंज",
        "label_en": "7/8 Seater Spacious Rear Cabin"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-boot-open.jpg",
        "label_hi": "बड़ा बूट स्पेस (ओपन टेलगेट)",
        "label_en": "Massive Luggage Space (Tailgate Open)"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-spacious-boot.jpg",
        "label_hi": "फ्लेक्सिबल फोल्डिंग सीट्स बूट स्पेस",
        "label_en": "Flexible Folding 3rd Row Luggage Bay"
      },
      {
        "url": "assets/car-photos/crysta-2021/crysta-2021-engine.jpg",
        "label_hi": "टोयोटा 2.4L GD बुलेटप्रूफ डीजल इंजन",
        "label_en": "Toyota 2.4L GD Bulletproof Diesel Engine"
      }
    ],
    "features_hi": [
      "टोयोटा का लीजेंडरी 2.4L GD 4-सिलेंडर डीजल इंजन (150 PS / 343 Nm)",
      "स्मूथ 5-स्पीड मैनुअल गियरबॉक्स",
      "इको (ECO) & पावर (POWER) ड्यूल ड्राइविंग मोड्स",
      "7/8 सीटर अल्ट्रा कम्फर्टेबल सीटिंग अरेंजमेंट",
      "3-रो रियर एयर कंडीशनिंग इंडिविजुअल रूफ वेंट्स के साथ",
      "3 एयरबैग्स (ड्राइवर, पैसेंजर + ड्राइवर नी एयरबैग)",
      "ABS विथ EBD & ब्रेक असिस्ट (BA)",
      "वेहिकल स्टेबिलिटी कंट्रोल & हिल-स्टार्ट असिस्ट",
      "टिल्ट & टेलीस्कोपिक एडजस्टेबल स्टीयरिंग व्हील",
      "लॉन्ग टूरिंग हैवी-ड्यूटी कम्फर्टेबल सस्पेंशन",
      "100% नॉन-एक्सीडेंटल, टोयोटा सर्विस रिकॉर्ड्स",
      "1 साल की सद्गुरु शील्ड वारंटी & फ्री RC ट्रांसफर"
    ],
    "features_en": [
      "Legendary Toyota 2.4L GD Turbo Diesel Engine (150 PS / 343 Nm)",
      "Smooth 5-Speed Manual Transmission",
      "Dual Drive Modes: ECO Mode & POWER Mode",
      "7/8 Seater Ultra-Comfortable Touring Lounge",
      "Triple-Row AC with Individual Ceiling Air Vents",
      "3 Airbags (Front Dual + Driver Knee Airbag)",
      "ABS with EBD & Emergency Brake Assist (BA)",
      "Vehicle Stability Control (VSC) & Hill-Start Assist (HAC)",
      "Tilt & Telescopic Adjustable Multi-function Steering",
      "Heavy-Duty Long Distance Touring Suspension",
      "100% Non-Accidental Verified, Full Toyota Service History",
      "1-Year Sadguru Shield Warranty & Free RC Transfer"
    ],
    "desc_hi": "2021 टोयोटा इनोवा क्रिस्टा 2.4 G डीजल मैनुअल। 2nd ओनर गाड़ी, 2,06,000 किमी रनिंग। टोयोटा का प्रसिद्ध 2.4L GD बुलेटप्रूफ इंजन जो 5 लाख किमी बिना किसी परेशानी के चलने के लिए विश्वप्रसिद्ध है। इको और पावर मोड्स, रूफ माउंटेड रियर एसी वेंट्स, ड्राइवर नी-एयरबैग, और विशाल बूट स्पेस। फैमिली टूरिंग और हाईवे ड्राइविंग के लिए नंबर 1 विकल्प। 1 साल की वारंटी और फ्री आरसी ट्रांसफर शामिल।",
    "desc_en": "2021 Toyota Innova Crysta 2.4 G Diesel Manual. 2nd owner, genuine 2,06,000 highway km with immaculate Toyota maintenance. Renowned worldwide for its indestructible 2.4L GD diesel engine that easily lasts 500,000+ km. Equipped with ECO/POWER drive modes, 3-row ceiling AC vents, knee airbag protection, and massive luggage capacity. Certified 100% non-accidental with 1-Year Warranty and free RC transfer."
  },
  {
    "id": "creta-2020-sx-diesel",
    "name": "2020 Hyundai Creta 1.5 CRDi SX Manual",
    "brand": "Hyundai",
    "year": 2020,
    "price": 10.75,
    "type": "suv",
    "fuel_hi": "डीजल (1.5L CRDi U2 VGT)",
    "fuel_en": "Diesel (1.5L CRDi U2 VGT)",
    "trans_hi": "6-स्पीड मैनुअल ट्रांसमिशन (MT)",
    "trans_en": "6-Speed Manual Transmission (MT)",
    "km": "1,18,282 km",
    "reg_hi": "सर्टिफाइड (गुड़गांव HR-51)",
    "reg_en": "Certified Pre-Owned (Gurugram)",
    "owners_hi": "1st सिंगल ओनर",
    "owners_en": "1st Single Owner",
    "color_hi": "फैंटम ब्लैक",
    "color_en": "Phantom Black",
    "inspectionGrade": "A+ (99/100)",
    "warranty_hi": "1 साल की सद्गुरु शील्ड वारंटी",
    "warranty_en": "1 Year Sadguru Shield Warranty",
    "image": "assets/car-photos/creta-2020/creta-2020-hero.jpg",
    "allPhotos": [
      {
        "url": "assets/car-photos/creta-2020/creta-2020-hero.jpg",
        "label_hi": "फ्रंट 3/4 हीरो स्टांस (फैंटम ब्लैक)",
        "label_en": "Front 3/4 Hero Stance (Phantom Black)"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-side-profile.jpg",
        "label_hi": "फुल साइड एसयूवी प्रोफाइल",
        "label_en": "Full Side SUV Stance"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-rear-34.jpg",
        "label_hi": "रियर 3/4 प्रोफाइल & बूमरैंग टेललैंप्स",
        "label_en": "Rear 3/4 Profile & Boomerang LED Tail Lamps"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-side-rear.jpg",
        "label_hi": "रियर साइड क्वार्टर एंगल",
        "label_en": "Rear Quarter Stance"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-front-straight.jpg",
        "label_hi": "फ्रंट कैस्केडिंग ग्रिल & ट्रायो-बीम एलईडी",
        "label_en": "Front Cascading Grille & Trio-Beam LED"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-rear-straight.jpg",
        "label_hi": "रियर सीधा व्यू & क्रेटा सिग्नेचर बैज",
        "label_en": "Rear Profile & Creta Signature Badge"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-cockpit.jpg",
        "label_hi": "पैनोरमिक कॉकपिट & 10.25\" एचडी टचस्क्रीन",
        "label_en": "Panoramic Cockpit & 10.25\" HD Touchscreen"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-driver-cockpit.jpg",
        "label_hi": "ड्राइवर सीट व्यू & डी-कट लेदर स्टीयरिंग",
        "label_en": "Driver Cockpit & D-Cut Leather Steering"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-odometer.jpg",
        "label_hi": "सर्टिफाइड ओडोमीटर (1,18,282 KM)",
        "label_en": "Certified Odometer (1,18,282 KM)"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-push-start.jpg",
        "label_hi": "इंजन स्टार्ट/स्टॉप & ट्रैक्शन टॉगल",
        "label_en": "Push Button Start & Traction Toggle"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-gear-console.jpg",
        "label_hi": "6-स्पीड मैनुअल गियरबॉक्स & ऑटो होल्ड",
        "label_en": "6-Speed Manual Shifter & Auto Hold"
      },
      {
        "url": "assets/car-photos/creta-2020/creta-2020-interior-front.jpg",
        "label_hi": "लक्ज़री डुअल-टोन प्रीमियम लेदरेट केबिन",
        "label_en": "Luxury Dual-Tone Leatherette Cabin"
      }
    ],
    "features_hi": [
      "1.5L CRDi U2 VGT डीजल इंजन (115 PS / 250 Nm)",
      "6-स्पीड स्मूथ मैनुअल ट्रांसमिशन (MT)",
      "वॉइस-इनेबल्ड स्मार्ट पैनोरमिक सनरूफ",
      "10.25\" एडवांस्ड एचडी इंफोटेनमेंट टचस्क्रीन विथ एप्पल कारप्ले",
      "ट्रायो-बीम एलईडी हेडलैंप्स विथ क्रिसेंट एलईडी DRLs",
      "इलेक्ट्रॉनिक पार्किंग ब्रेक (EPB) विथ ऑटो होल्ड",
      "पुश बटन इंजन स्टार्ट/स्टॉप & स्मार्ट कीलेस एंट्री",
      "17\" क्लीन कट डायमंड अलॉय व्हील्स",
      "रियर एसी वेंट्स & रियर विंडो प्राइवेसी सनशेड्स",
      "सर्टिफाइड 1,18,282 KM (ओरिजिनल सर्विस रिकॉर्ड्स)",
      "1st सिंगल ओनर, 100% नॉन-एक्सीडेंटल गारंटी",
      "1 साल की सद्गुरु शील्ड वारंटी & फ्री RC ट्रांसफर"
    ],
    "features_en": [
      "1.5L CRDi U2 VGT Diesel Engine (115 PS / 250 Nm)",
      "6-Speed Smooth Manual Transmission (MT)",
      "Voice-Enabled Smart Panoramic Sunroof",
      "10.25\" Advanced HD Touchscreen with Apple CarPlay & Android Auto",
      "Trio-Beam LED Headlamps with Crescent LED DRLs",
      "Electronic Parking Brake (EPB) with Auto Hold",
      "Push Button Engine Start/Stop & Smart Keyless Entry",
      "17\" Clean-Cut Diamond Alloy Wheels",
      "Rear AC Vents & Rear Door Window Privacy Sunshades",
      "Certified 1,18,282 KM with Full Service History",
      "1st Single Owner, 100% Non-Accidental Guarantee",
      "1-Year Sadguru Shield Warranty & Free RC Transfer"
    ],
    "desc_hi": "2020 हुंडई क्रेटा 1.5 CRDi डीजल SX मैनुअल। 1st सिंगल ओनर गाड़ी, सर्टिफाइड 1,18,282 किमी रनिंग। न्यू-जेन क्रेटा का सबसे पसंदीदा SX वैरिएंट जिसमें पैनोरमिक सनरूफ, 10.25\" एचडी टचस्क्रीन, ट्रायो-बीम एलईडी हेडलैंप्स, इलेक्ट्रॉनिक पार्किंग ब्रेक विथ ऑटो होल्ड, पुश बटन स्टार्ट और डायमंड-कट अलॉय व्हील्स मिलते हैं। 100% नॉन-एक्सीडेंटल गारंटी, 1 साल की वारंटी और फ्री आरसी ट्रांसफर उपलब्ध।",
    "desc_en": "2020 Hyundai Creta 1.5 CRDi Diesel SX Manual. 1st single owner, genuine 1,18,282 km with complete verified service records. 2nd Generation Creta SX featuring Panoramic Sunroof, 10.25\" HD Touchscreen infotainment, Trio-Beam LED headlights with signature crescent DRLs, Electronic Parking Brake with Auto Hold, push-button start and diamond-cut alloys. Certified 100% non-accidental with 1-Year Warranty and free RC transfer."
  }
];

class InventoryManager {
  constructor(showroomEngine) {
    this.showroom = showroomEngine;
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.selectedFuel = 'all';
    this.selectedTransmission = 'all';
    this.currentLang = window.currentAppLang || 'en';

    // Load from localStorage cache if available
    let cached = null;
    try {
      const stored = localStorage.getItem('sadguru_inventory_v3');
      if (stored) cached = JSON.parse(stored);
    } catch (e) {}

    // Ensure all bundled cars from CAR_INVENTORY_DATA are included even if user has older cached data
    if (Array.isArray(cached) && cached.length > 0) {
      // Remove any legacy dummy/sample cars (car-1 to car-9)
      cached = cached.filter(c => c && c.id && !c.id.startsWith('car-'));
      const cachedIds = new Set(cached.map(c => c.id));
      const missingCars = CAR_INVENTORY_DATA.filter(c => !cachedIds.has(c.id));
      if (missingCars.length > 0) {
        cached = [...missingCars, ...cached];
        try { localStorage.setItem('sadguru_inventory_v3', JSON.stringify(cached)); } catch (e) {}
      }
      this.cars = cached;
    } else {
      this.cars = CAR_INVENTORY_DATA;
    }
    window.SADGURU_CARS = this.cars;

    this.init();
    this.syncBackendCars();
  }

  async syncBackendCars() {
    // 1. First priority: Supabase Cloud Database
    if (window.SadguruDB) {
      try {
        const cloudCars = await window.SadguruDB.getAllCars();
        if (Array.isArray(cloudCars) && cloudCars.length > 0) {
          this.cars = cloudCars;
          window.SADGURU_CARS = cloudCars;
          localStorage.setItem('sadguru_inventory_v3', JSON.stringify(cloudCars));
          this.applyFilters();
          this.populateTestDriveOptions();
          return;
        }
      } catch (err) {
        console.warn('Supabase sync skipped, trying API/local fallback:', err);
      }
    }

    // 2. Second priority: Local API /api/cars or /data/cars.json
    try {
      let res = await fetch('/data/cars.json');
      if (!res.ok) res = await fetch('/api/cars');
      if (res.ok) {
        const liveCars = await res.json();
        if (Array.isArray(liveCars) && liveCars.length > 0) {
          this.cars = liveCars;
          window.SADGURU_CARS = liveCars;
          localStorage.setItem('sadguru_inventory_v3', JSON.stringify(liveCars));
          this.applyFilters();
          this.populateTestDriveOptions();
        }
      }
    } catch (e) {
      // Backend not running (e.g. static file view), localStorage/fallback is active
    }
  }

  init() {
    this.renderCars(this.cars, this.currentLang);
    this.setupFilterEvents();
    this.populateTestDriveOptions();
  }

  populateTestDriveOptions() {
    const select = document.getElementById('td-car-select');
    if (!select || !this.cars) return;
    const currentVal = select.value;
    const isEn = (this.currentLang === 'en');
    select.innerHTML = this.cars.map(c => {
      const priceLakhs = (parseFloat(c.price) || 0).toFixed(2);
      return `<option value="${c.id}">${c.name} (${c.year}) - ₹${priceLakhs} L</option>`;
    }).join('');
    if (currentVal && select.querySelector(`option[value="${currentVal}"]`)) {
      select.value = currentVal;
    }
  }

  setLanguage(lang) {
    this.currentLang = lang;
    this.populateTestDriveOptions();
    this.applyFilters();
  }

  renderCars(cars, lang = this.currentLang) {
    const container = document.getElementById('cars-container');
    if (!container) return;

    const isEn = lang === 'en';

    if (cars.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; background: var(--pure-white); border-radius: 16px; border: 1.5px dashed var(--royal-blue-border); box-shadow: var(--shadow-sm);">
          <i data-lucide="car" style="width: 48px; height: 48px; color: var(--royal-blue-primary); margin-bottom: 12px;"></i>
          <h3 style="font-size: 1.35rem; color: var(--text-main); margin-bottom: 6px;">
            ${isEn ? 'No Matching Cars Found' : 'कोई कार नहीं मिली'}
          </h3>
          <p style="color: var(--text-muted); font-size: 0.95rem;">
            ${isEn ? 'Please try resetting your filters or search keyword. Explore our certified showroom collection.' : 'कृपया अन्य फ़िल्टर या सर्च कीवर्ड का उपयोग करें। सद्गुरु मोटर्स शोरूम में सभी सर्टिफाइड गाड़ियां उपलब्ध हैं।'}
          </p>
          <button class="btn btn-secondary" style="margin-top: 16px;" onclick="window.resetInventoryFilters()">
            ${isEn ? 'Reset All Filters' : 'सारे फ़िल्टर हटाएं'}
          </button>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = cars.map(car => {
      const reg = (isEn ? car.reg_en : car.reg_hi) || car.reg_hi || car.reg_en || 'Certified';
      const fuel = (isEn ? car.fuel_en : car.fuel_hi) || car.fuel_hi || car.fuel_en || 'Petrol';
      const trans = (isEn ? car.trans_en : car.trans_hi) || car.trans_hi || car.trans_en || 'Manual';
      const owners = (isEn ? car.owners_en : car.owners_hi) || car.owners_hi || car.owners_en || '1st Owner';
      const inspectedBadge = 'Certified Pre-Owned';
      const viewPhotosText = isEn ? 'View Photos' : 'फ़ोटो देखें';
      const priceLabel = isEn ? 'Cash Price' : 'नकद कीमत / Price';
      const btnReport = isEn ? 'Full Report' : 'पूरी रिपोर्ट';
      const btnTestDrive = isEn ? 'Test Drive' : 'टेस्ट ड्राइव';
      const isSold = (car.status === 'sold');
      const priceNum = parseFloat(car.price) || 0;

      return `
        <div class="car-card" data-id="${car.id}">
          <div class="car-image-box">
            <img src="${car.image}" alt="${car.name}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';" />
            <div class="car-badge-top-left">
              <span class="badge-certified"><i data-lucide="shield-check" style="width:13px;height:13px;"></i> ${inspectedBadge}</span>
              ${isSold ? `<span style="background: #dc2626; color: #fff; font-size: 0.72rem; font-weight: 700; padding: 2px 8px; border-radius: 999px;">${isEn ? 'SOLD' : 'बिक चुकी'}</span>` : ''}
            </div>
            <button class="car-3d-quick-btn" onclick="window.inspectCarPhotos('${car.id}')" title="${viewPhotosText}">
              <i data-lucide="camera" style="width:14px;height:14px;"></i> ${viewPhotosText}
            </button>
          </div>

          <div class="car-content">
            <div class="car-title-row">
              <div>
                <h3 class="car-title">${car.name}</h3>
                <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500;">${car.year} • ${owners}</span>
              </div>
            </div>

            <div class="car-spec-pills">
              <span class="spec-pill"><i data-lucide="gauge"></i> ${car.km}</span>
              <span class="spec-pill"><i data-lucide="fuel"></i> ${fuel}</span>
              <span class="spec-pill"><i data-lucide="zap"></i> ${trans.split(' ')[0]}</span>
            </div>

            <div class="car-price-row">
              <div class="price-block">
                <span class="price-label">${priceLabel}</span>
                <div class="price-val">₹${priceNum.toFixed(2)} Lakh</div>
              </div>
              <div class="benefit-block" style="text-align: right;">
                <span class="price-label" style="color: #4ade80; font-weight: 700;">✓ Free RC Transfer</span>
                <div style="font-size: 0.85rem; font-weight: 700; color: #C5A46D;">1-Yr Warranty</div>
              </div>
            </div>

            <div class="car-card-actions">
              <button class="btn btn-secondary" onclick="window.openCarModal('${car.id}')" style="padding: 10px 14px; font-size: 0.88rem;">
                <i data-lucide="file-text" style="width: 15px; height: 15px;"></i> ${btnReport}
              </button>
              <button class="btn btn-primary" onclick="window.openTestDriveModal('${car.id}')" style="padding: 10px 14px; font-size: 0.88rem;">
                <i data-lucide="calendar" style="width: 15px; height: 15px;"></i> ${btnTestDrive}
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) lucide.createIcons();
    if (window.reobserveScrollReveal) window.reobserveScrollReveal();
  }

  setupFilterEvents() {
    // Category pill buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.activeFilter = btn.dataset.filter;
        this.applyFilters();
      });
    });

    // Search input
    const searchInput = document.getElementById('inventory-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.applyFilters();
      });
    }

    // Fuel select
    const fuelSelect = document.getElementById('filter-fuel');
    if (fuelSelect) {
      fuelSelect.addEventListener('change', (e) => {
        this.selectedFuel = e.target.value;
        this.applyFilters();
      });
    }

    // Transmission select
    const transSelect = document.getElementById('filter-trans');
    if (transSelect) {
      transSelect.addEventListener('change', (e) => {
        this.selectedTransmission = e.target.value;
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    const list = this.cars || window.SADGURU_CARS || CAR_INVENTORY_DATA;
    let filtered = list.filter(car => {
      // Category match
      const categoryMatch = this.activeFilter === 'all' || car.type === this.activeFilter;

      // Fuel match
      const fuelMatch = this.selectedFuel === 'all' || 
        (car.fuel_en && car.fuel_en.toLowerCase() === this.selectedFuel.toLowerCase()) ||
        (car.fuel_hi && car.fuel_hi.toLowerCase() === this.selectedFuel.toLowerCase());

      // Transmission match
      const transMatch = this.selectedTransmission === 'all' || 
        (car.trans_en && car.trans_en.toLowerCase().includes(this.selectedTransmission.toLowerCase())) ||
        (car.trans_hi && car.trans_hi.toLowerCase().includes(this.selectedTransmission.toLowerCase()));

      // Search match
      const searchMatch = !this.searchQuery || 
        (car.name && car.name.toLowerCase().includes(this.searchQuery)) ||
        (car.brand && car.brand.toLowerCase().includes(this.searchQuery)) ||
        (car.reg_en && car.reg_en.toLowerCase().includes(this.searchQuery)) ||
        (car.reg_hi && car.reg_hi.toLowerCase().includes(this.searchQuery));

      return categoryMatch && fuelMatch && transMatch && searchMatch;
    });

    this.renderCars(filtered, this.currentLang);
  }
}

// Global function to open car detail modal
window.openCarModal = function(carId) {
  const cars = (window.inventoryInstance && window.inventoryInstance.cars) || window.SADGURU_CARS || CAR_INVENTORY_DATA;
  const car = cars.find(c => c.id === carId);
  if (!car) return;

  const modal = document.getElementById('car-detail-modal');
  const body = document.getElementById('modal-car-body');
  if (!modal || !body) return;

  const isEn = (window.currentAppLang === 'en');
  const reg = (isEn ? car.reg_en : car.reg_hi) || car.reg_hi || car.reg_en || 'Certified (Gurugram)';
  const owners = (isEn ? car.owners_en : car.owners_hi) || car.owners_hi || car.owners_en || '1st Owner';
  const desc = (isEn ? car.desc_en : car.desc_hi) || car.desc_hi || car.desc_en || '';
  const features = (isEn ? car.features_en : car.features_hi) || car.features_hi || car.features_en || [];
  const warranty = (isEn ? car.warranty_en : car.warranty_hi) || car.warranty_hi || car.warranty_en || '1 Year Sadguru Shield Warranty';
  const priceNum = parseFloat(car.price) || 0;

  body.innerHTML = `
    <div style="margin-bottom: 20px;">
      <!-- Top Image with verified overlay -->
      <div style="height: 300px; border-radius: 14px; overflow: hidden; margin-bottom: 12px; border: 1.5px solid var(--border-light); position: relative; background: #FAF8F5;">
        <img id="modal-active-img" src="${car.image}" alt="${car.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';" />
        <div style="position: absolute; top: 12px; left: 12px; background: #059669; color: #fff; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          ✓ ${isEn ? 'Grade A+ Certified' : 'ग्रेड A+ सर्टिफाइड'}
        </div>
        ${car.id === 'verna-hr26-sport' ? `
          <button type="button" onclick="window.openVernaGalleryModal()" style="position: absolute; bottom: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-size: 0.78rem; font-weight: 600; padding: 6px 12px; border-radius: 999px; cursor: pointer; backdrop-filter: blur(8px);">
            📷 ${isEn ? 'Inspect 19 HD Studio Photos' : '19 HD स्टूडियो फोटो देखें'}
          </button>
        ` : (car.allPhotos && car.allPhotos.length > 0) ? `
          <div style="position: absolute; bottom: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-size: 0.78rem; font-weight: 600; padding: 6px 12px; border-radius: 999px; backdrop-filter: blur(8px);">
            📷 ${car.allPhotos.length} ${isEn ? 'Certified Photos' : 'सर्टिफाइड फोटो'}
          </div>
        ` : ''}
      </div>

      ${(car.allPhotos && car.allPhotos.length > 0) ? `
        <div style="display: flex; gap: 8px; overflow-x: auto; padding-bottom: 6px; margin-bottom: 16px;">
          ${car.allPhotos.map((p, idx) => `
            <button type="button" onclick="document.getElementById('modal-active-img').src='${p.url}'" title="${isEn ? p.label_en : p.label_hi}" style="border: 2px solid ${idx===0 ? 'var(--royal-blue-primary)' : 'var(--border-light)'}; border-radius: 8px; overflow: hidden; width: 72px; height: 50px; flex-shrink: 0; padding: 0; cursor: pointer; background: #0b1528;">
              <img src="${p.url}" alt="${isEn ? p.label_en : p.label_hi}" style="width: 100%; height: 100%; object-fit: cover;" />
            </button>
          `).join('')}
        </div>
      ` : ''}
      
      <!-- Title & Price Bar -->
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 14px;">
        <div>
          <h2 style="font-size: 1.65rem; color: var(--text-main); font-weight: 800; line-height: 1.2;">${car.name}</h2>
          <p style="color: var(--text-muted); font-size: 0.92rem; font-weight: 500; margin-top: 2px;">
            ${car.year} Model • ${owners} • Certified Pre-Owned
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--royal-blue-primary);">₹${priceNum.toFixed(2)} Lakh</div>
          <span style="font-size: 0.85rem; color: #10b981; font-weight: 700;">✓ Free RC Transfer & 1-Yr Comprehensive Warranty</span>
        </div>
      </div>

      <!-- Description paragraph -->
      <p style="color: var(--text-body); font-size: 0.95rem; line-height: 1.65; margin-bottom: 22px; background: var(--surface-white); border: 1px solid var(--border-light); padding: 14px 16px; border-radius: 12px;">
        ${desc}
      </p>

      <!-- Technical Checklist -->
      <h4 style="font-size: 1.08rem; color: var(--text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
        <i data-lucide="check-circle-2" style="color: #059669; width: 20px; height: 20px;"></i> 
        ${isEn ? 'Certified Multi-Point Technical Inspection Report (Sadguru Shield)' : 'सर्टिफाइड इन्स्पेक्शन रिपोर्ट (सद्गुरु शील्ड)'}
      </h4>
      
      <div class="modal-checklist-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
        <div style="background: var(--royal-blue-subtle); border: 1px solid var(--royal-blue-border); padding: 14px; border-radius: 10px;">
          <strong style="display: block; font-size: 0.88rem; color: var(--royal-blue-primary); margin-bottom: 2px;">
            ${isEn ? 'Engine & Transmission' : 'इंजन और ट्रांसमिशन'}
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-body);">
            ${isEn ? 'Compression pass, zero fluid leaks, smooth shifting' : 'कंप्रेशन पास, नो लीकेज, स्मूथ गियर शिफ्ट'}
          </span>
        </div>

        <div style="background: var(--royal-blue-subtle); border: 1px solid var(--royal-blue-border); padding: 14px; border-radius: 10px;">
          <strong style="display: block; font-size: 0.88rem; color: var(--royal-blue-primary); margin-bottom: 2px;">
            ${isEn ? 'Chassis & Structural Frame' : 'चेसिस और बॉडी फ्रेम'}
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-body);">
            ${isEn ? '100% Non-accidental, factory sealant intact' : '100% नॉन-एक्सीडेंटल, ओरिजिनल सीलेंट इंटैक्ट'}
          </span>
        </div>

        <div style="background: var(--royal-blue-subtle); border: 1px solid var(--royal-blue-border); padding: 14px; border-radius: 10px;">
          <strong style="display: block; font-size: 0.88rem; color: var(--royal-blue-primary); margin-bottom: 2px;">
            ${isEn ? 'RC & Legal Documentation' : 'आरसी और सरकारी पेपर्स'}
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-body);">
            ${isEn ? 'Clean Gurugram RC, bank NOC verified, zero challans' : 'क्लीन आरसी, बैंक एनओसी क्लियर, नो चालान'}
          </span>
        </div>

        <div style="background: var(--royal-blue-subtle); border: 1px solid var(--royal-blue-border); padding: 14px; border-radius: 10px;">
          <strong style="display: block; font-size: 0.88rem; color: var(--royal-blue-primary); margin-bottom: 2px;">
            ${isEn ? 'Warranty Protection' : 'वारंटी सुरक्षा'}
          </strong>
          <span style="font-size: 0.82rem; color: var(--text-body);">
            ${warranty}
          </span>
        </div>
      </div>

      <!-- Key Features -->
      <h4 style="font-size: 1.05rem; color: var(--text-main); margin-bottom: 12px; font-weight: 700;">
        ${isEn ? 'Key Features & Equipment' : 'गाड़ी की मुख्य विशेषताएं (Key Features)'}
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 25px;">
        ${features.map(f => `
          <span style="background: var(--royal-blue-subtle); border: 1px solid var(--royal-blue-border); color: var(--royal-blue-primary); padding: 6px 14px; border-radius: 999px; font-size: 0.82rem; font-weight: 600;">
            ✓ ${f}
          </span>
        `).join('')}
      </div>

      <!-- Action Buttons -->
      <div class="modal-btn-row" style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="window.openTestDriveModal('${car.id}'); window.closeAllModals();" style="flex: 1.2;">
          <i data-lucide="calendar"></i> ${isEn ? 'Book Test Drive (Sector 14 or Home)' : 'टेस्ट ड्राइव बुक करें (सेक्टर 14 या घर पर)'}
        </button>
        <a href="https://wa.me/919911922050?text=${encodeURIComponent(isEn ? `Hello Sadguru Motors, I am interested in ${car.name} (ID: ${car.id}). Please share more details.` : `नमस्ते सद्गुरु मोटर्स, मुझे ${car.name} (ID: ${car.id}) के बारे में जानकारी चाहिए।`)}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
          <i data-lucide="message-circle"></i> ${isEn ? 'WhatsApp Inquiry' : 'व्हाट्सएप पर बात करें'}
        </a>
        <button class="btn btn-secondary" onclick="window.closeAllModals(event)" style="padding: 10px 18px;" data-close-modal="true">
          ${isEn ? 'Close' : 'बंद करें'}
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  if (window.lucide) lucide.createIcons();
};

window.openTestDriveModal = function(carId) {
  const modal = document.getElementById('test-drive-modal');
  const select = document.getElementById('td-car-select');
  if (select && carId) {
    select.value = carId;
  }
  if (modal) modal.classList.add('active');
  if (window.lucide) lucide.createIcons();
};

window.inspectCarPhotos = function(carId) {
  if (carId === 'verna-hr26-sport') {
    if (window.openVernaGalleryModal) {
      window.openVernaGalleryModal();
      return;
    }
  }
  // For all cars, open the comprehensive HD modal directly
  if (window.openCarModal) {
    window.openCarModal(carId);
  }
};

window.inspectCar3D = function(carType) {
  const heroSection = document.getElementById('virtual-showroom');
  if (heroSection) {
    heroSection.scrollIntoView({ behavior: 'smooth' });
  }
};

window.resetInventoryFilters = function() {
  const search = document.getElementById('inventory-search');
  if (search) search.value = '';
  const fuel = document.getElementById('filter-fuel');
  if (fuel) fuel.value = 'all';
  const trans = document.getElementById('filter-trans');
  if (trans) trans.value = 'all';

  document.querySelectorAll('.category-btn').forEach((b, i) => {
    b.classList.toggle('active', i === 0);
  });

  if (window.inventoryInstance) {
    window.inventoryInstance.activeFilter = 'all';
    window.inventoryInstance.searchQuery = '';
    window.inventoryInstance.selectedFuel = 'all';
    window.inventoryInstance.selectedTransmission = 'all';
    window.inventoryInstance.applyFilters();
  }
};

/**
 * Universal Modal Closer - Handles Cross Buttons ('×'), Outside Clicks, and ESC key
 */
window.closeAllModals = function(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.classList.remove('active');
  });
  document.body.style.overflow = '';
};
