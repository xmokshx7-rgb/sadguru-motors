/**
 * Sadguru Motors - Certified Inventory Database & Modal Renderer
 * Sector 14, Gurgaon (HR-26)
 * Supports full bilingual rendering (English & Hindi)
 */

const CAR_INVENTORY_DATA = [
  {
    id: 'verna-hr26-sport',
    name: '2022 Hyundai Verna 1.5 CRDi AT SX (Sport Edition)',
    brand: 'Hyundai',
    year: 2022,
    price: 10.85, // in Lakhs
    emi: '₹16,900',
    type: 'sedan',
    fuel_hi: 'डीजल (1.5 CRDi Turbo)',
    fuel_en: 'Diesel (1.5 CRDi Turbo)',
    trans_hi: '6-स्पीड ऑटोमैटिक (AT)',
    trans_en: '6-Speed Automatic (AT)',
    km: '67,861 km',
    reg_hi: 'HR-26-EV-1479 (गुड़गांव नॉर्थ)',
    reg_en: 'HR-26-EV-1479 (Gurugram North)',
    owners_hi: '1st ओनर (राज्नी सरदाना)',
    owners_en: '1st Owner (Single Handed)',
    color_hi: 'पोलर व्हाइट (ब्लैक रूफ & जीटी किट)',
    color_en: 'Polar White (Black Roof & GT Kit)',
    inspectionGrade: 'A+ (99/100)',
    warranty_hi: '1 साल की सद्गुरु शील्ड वारंटी',
    warranty_en: '1 Year Sadguru Shield Warranty',
    image: 'assets/car-photos/verna-hero-34.jpg',
    allPhotos: [
      { url: 'assets/car-photos/verna-hero-34.jpg', label_hi: 'फ्रंट 3/4 हीरो व्यू', label_en: 'Front 3/4 Hero Stance' },
      { url: 'assets/car-photos/verna-side.jpg', label_hi: 'फुल साइड प्रोफाइल', label_en: 'Side Profile Stance' },
      { url: 'assets/car-photos/verna-rear-gt.jpg', label_hi: 'रियर जीटी विंग & क्वाड एग्जॉस्ट', label_en: 'Rear GT Wing & Quad Exhaust' },
      { url: 'assets/car-photos/verna-front-straight.jpg', label_hi: 'फ्रंट सीधा फेस', label_en: 'Front Direct Face' },
      { url: 'assets/car-photos/verna-interior-sunroof.jpg', label_hi: 'कॉकपिट, सनरूफ & नियॉन लाइट', label_en: 'Cockpit, Electric Sunroof & Ambient Light' },
      { url: 'assets/car-photos/verna-steering-dash.jpg', label_hi: 'स्टीयरिंग व्हील & डिजिटल क्लस्टर', label_en: 'Steering Wheel & Digital Cluster' },
      { url: 'assets/car-photos/verna-front-seats.jpg', label_hi: 'स्पार्को कुशन वाली बकेट सीट्स', label_en: 'Front Bucket Seats with Sparco Cushions' },
      { url: 'assets/car-photos/verna-rear-seats.jpg', label_hi: 'रियर लेदर सीट्स & सनशेड', label_en: 'Rear Leather Seats & Sunshade' },
      { url: 'assets/car-photos/verna-passenger-dash.jpg', label_hi: 'पैसेंजर साइड केबिन व्यू', label_en: 'Passenger Cabin & Ambient Lighting' },
      { url: 'assets/car-photos/verna-scuff-plate.jpg', label_hi: 'हुंडई इल्यूमिनेटेड स्कफ प्लेट', label_en: 'Hyundai Illuminated Scuff Plate' },
      { url: 'assets/car-photos/verna-speedometer.jpg', label_hi: 'सर्टिफाइड ओडोमीटर (67,861 KM)', label_en: 'Certified Odometer (67,861 KM)' },
      { url: 'assets/car-photos/verna-rc-card.jpg', label_hi: 'हरियाणा सरकारी आरसी कार्ड (HR26EV1479)', label_en: 'Govt RC Card (HR26EV1479 Gurugram)' },
      { url: 'assets/car-photos/verna-front-left-34.jpg', label_hi: 'फ्रंट-लेफ्ट एंगल 2', label_en: 'Front-Left 3/4 Stance' },
      { url: 'assets/car-photos/verna-rear-straight.jpg', label_hi: 'रियर सीधा एंगल', label_en: 'Rear Straight View' },
      { url: 'assets/car-photos/verna-hero-angle2.jpg', label_hi: 'फ्रंट डायनेमिक एंगल', label_en: 'Front Dynamic Angle' },
      { url: 'assets/car-photos/verna-front-angle2.jpg', label_hi: 'फ्रंट एलीवेशन व्यू', label_en: 'Front Elevation View' },
      { url: 'assets/car-photos/verna-rear-angle2.jpg', label_hi: 'जीटी विंग टॉप एंगल', label_en: 'GT Wing Top Angle' },
      { url: 'assets/car-photos/verna-seats-detail.jpg', label_hi: 'लेदर सीट्स व ब्राइड पैड', label_en: 'Leather Seats & Bride Pad' },
      { url: 'assets/car-photos/verna-front-angle3.jpg', label_hi: 'फ्रंट प्रोफाइल क्लोजअप', label_en: 'Front Profile Stance' }
    ],
    features_hi: [
      'इलेक्ट्रिक सनरूफ',
      'हाई-डाउनफ़ोर्स जीटी विंग स्पॉइलर',
      'क्वाड क्रोम एग्जॉस्ट डिफ्यूज़र',
      'पर्पल/मैजेंटा एम्बिएंट नियॉन इंटीरियर',
      '1.5L CRDi टर्बो डीजल इंजन (115 PS)',
      '6-स्पीड स्मूथ ऑटोमैटिक ट्रांसमिशन',
      'स्पार्को हेडरेस्ट & ब्राइड पैड्स',
      '10.25" एचडी टचस्क्रीन + एप्पल कारप्ले',
      'हुंडई इल्यूमिनेटेड डोर स्कफ प्लेट्स',
      'डिजिटल टीएफटी स्पीडोमीटर क्लस्टर',
      'क्रूज़ कंट्रोल & स्टीयरिंग कंट्रोल्स',
      'सर्टिफाइड 67,861 KM (नॉन-टैम्पर्ड)'
    ],
    features_en: [
      'Electric Sunroof',
      'High-Downforce GT Wing Spoiler',
      'Quad Chrome Exhaust Diffuser',
      'Purple/Magenta Ambient Neon Lighting',
      '1.5L CRDi Turbo Diesel Engine (115 PS)',
      '6-Speed Smooth Automatic Transmission',
      'Sparco Headrests & Bride Cushions',
      '10.25" HD Touchscreen with Apple CarPlay',
      'Hyundai Illuminated Door Scuff Plates',
      'Digital TFT Speedometer Instrument Cluster',
      'Cruise Control & Multi-function Steering',
      'Certified 67,861 KM (Non-tampered)'
    ],
    desc_hi: 'गुड़गांव (HR-26-EV-1479) में रजिस्टर्ड 2022 हुंडई वरना 1.5 CRDi डीजल ऑटोमैटिक SX स्पोर्ट्स एडिशन। 1st ओनर गाड़ी है, 67,861 किमी चली है। इसमें हाई-डाउनफ़ोर्स GT विंग, क्वाड क्रोम एग्जॉस्ट, सनरूफ, स्पार्को सीट कुशन, एम्बिएंट नियॉन लाइटिंग और नई कंडीशन टायर्स लगे हैं। ओरिजिनल सरकारी आरसी कार्ड वेरिफाइड है। 1 साल की वारंटी और फ्री आरसी ट्रांसफर शामिल है।',
    desc_en: 'Gurugram registered (HR-26-EV-1479) 2022 Hyundai Verna 1.5 CRDi Diesel Automatic SX Sport Edition. 1st single owner, genuine 67,861 km with verified service records. Customized with GT wing spoiler, quad exhaust diffuser, electric sunroof, Sparco headrests, custom ambient neon lighting and black alloy wheels. 100% verified non-accidental with 1-Year Warranty and free RC transfer.'
  },
  {
    id: 'car-1',
    name: 'Hyundai Creta SX (O) 1.5 Turbo',
    brand: 'Hyundai',
    year: 2022,
    price: 14.85, // in Lakhs
    emi: '₹22,950',
    type: 'suv',
    fuel_hi: 'पेट्रोल',
    fuel_en: 'Petrol',
    trans_hi: 'ऑटोमैटिक (DCT)',
    trans_en: 'Automatic (DCT)',
    km: '24,500 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'टाइटन ग्रे मैटेलिक',
    color_en: 'Titan Grey Metallic',
    inspectionGrade: 'A+ (98/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features_hi: ['पैनोरमिक सनरूफ', 'वेंटिलेटेड फ्रंट सीट्स', '10.25" टचस्क्रीन', 'बोस 8-स्पीकर साउंड', 'ब्लूलिंक कनेक्टेड कार', '6 एयरबैग्स'],
    features_en: ['Panoramic Sunroof', 'Ventilated Front Seats', '10.25" Touchscreen', 'Bose 8-Speaker Audio', 'BlueLink Connected Car', '6 Airbags'],
    desc_hi: 'गुड़गांव रजिस्टर्ड (HR-26) सिंगल ओनर हुंडई क्रेटा। कंपनी सर्विस रिकॉर्ड्स के साथ, कोई एक्सीडेंट नहीं। 1 साल की वारंटी और फ्री आरसी ट्रांसफर उपलब्ध।',
    desc_en: 'Gurugram registered (HR-26) single owner Hyundai Creta. Complete company service records, 100% non-accidental. Free RC transfer included.'
  },
  {
    id: 'car-2',
    name: 'Mahindra XUV700 AX7 Luxury Pack',
    brand: 'Mahindra',
    year: 2022,
    price: 19.40,
    emi: '₹29,800',
    type: 'suv',
    fuel_hi: 'डीजल',
    fuel_en: 'Diesel',
    trans_hi: 'ऑटोमैटिक',
    trans_en: 'Automatic',
    km: '31,000 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'मिडनाइट ब्लैक',
    color_en: 'Midnight Black',
    inspectionGrade: 'A+ (99/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features_hi: ['ADAS लेवल 2 ऑटोनॉमस सेफ्टी', 'सोनी 12-स्पीकर 3D ऑडियो', 'डुअल 10.25" स्क्रीन', 'स्काईरूफ (पैनोरमिक)', 'स्मार्ट डोर हैंडल्स', 'वायरलेस चार्जिंग'],
    features_en: ['ADAS Level 2 Autonomous Safety', 'Sony 12-Speaker 3D Audio', 'Dual 10.25" Screens', 'Panoramic Skyroof', 'Smart Flush Handles', 'Wireless Charger'],
    desc_hi: 'महिंद्रा XUV700 लक्ज़री पैक डीजल ऑटोमैटिक। ADAS सेफ्टी और पैनोरमिक सनरूफ के साथ बिल्कुल शोरूम कंडीशन में।',
    desc_en: 'Mahindra XUV700 Luxury Pack Diesel Automatic. Mint showroom condition with ADAS Level 2 safety and largest panoramic skyroof.'
  },
  {
    id: 'car-3',
    name: 'Honda City ZX 5th Gen',
    brand: 'Honda',
    year: 2021,
    price: 10.45,
    emi: '₹16,200',
    type: 'sedan',
    fuel_hi: 'पेट्रोल',
    fuel_en: 'Petrol',
    trans_hi: 'CVT ऑटोमैटिक',
    trans_en: 'CVT Automatic',
    km: '28,200 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'प्लैटिनम व्हाइट पर्ल',
    color_en: 'Platinum White Pearl',
    inspectionGrade: 'A+ (97/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    features_hi: ['फुल एलईडी हेडलाइट्स', 'लेन-वॉच कैमरा', 'इलेक्ट्रिक सनरूफ', 'लेदर अपहोल्स्ट्री', 'पैडल शिफ्टर्स', 'पुश बटन स्टार्ट'],
    features_en: ['Full LED Headlights', 'LaneWatch Blindspot Camera', 'Electric Sunroof', 'Perforated Leather Seats', 'Paddle Shifters', 'Push Button Start'],
    desc_hi: 'बेस्ट-इन-क्लास सेडान होंडा सिटी 5th जेन। स्मूथ सीवीटी गियरबॉक्स, आरामदायक लेदर सीट्स और शानदार माइलेज।',
    desc_en: 'Best-in-class executive sedan Honda City 5th Gen. Smooth CVT automatic, ultra comfortable cabin, and excellent fuel mileage.'
  },
  {
    id: 'car-4',
    name: 'Tata Safari XZA+ Dark Edition',
    brand: 'Tata',
    year: 2022,
    price: 18.25,
    emi: '₹28,100',
    type: 'suv',
    fuel_hi: 'डीजल',
    fuel_en: 'Diesel',
    trans_hi: 'ऑटोमैटिक',
    trans_en: 'Automatic',
    km: '26,000 km',
    reg_hi: 'DL-8C (दिल्ली एनसीआर)',
    reg_en: 'DL-8C (Delhi NCR)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'ओबेरॉन ब्लैक',
    color_en: 'Oberon Black',
    inspectionGrade: 'A+ (98/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    features_hi: ['स्टेल्थ ब्लैक एक्सटीरियर', 'कैप्टन सीट्स (6-सीटर)', 'JBL 9-स्पीकर साउंड', 'एकॉस्टिक ग्लास', 'डार्क बैजिंग', 'टेरेन रिस्पॉन्स मोड्स'],
    features_en: ['Stealth Black Exterior', 'Captain Seats (6-Seater)', 'JBL 9-Speaker Audio', 'Acoustic Glass', 'Signature Dark Badging', 'Terrain Modes'],
    desc_hi: 'टाटा सफारी डार्क एडिशन 6-सीटर लग्जरी एसयूवी। पावरफुल क्रायोटेक 170 डीजल इंजन और अल्टीमेट रोड प्रेजेंस।',
    desc_en: 'Tata Safari Dark Edition 6-seater luxury SUV. Powerful Kryotec 170 diesel engine with commanding road presence.'
  },
  {
    id: 'car-5',
    name: 'BMW 3 Series 320d Luxury Line',
    brand: 'BMW',
    year: 2019,
    price: 27.90,
    emi: '₹42,500',
    type: 'luxury',
    fuel_hi: 'डीजल',
    fuel_en: 'Diesel',
    trans_hi: 'स्टेपट्रॉनिक ऑटोमैटिक',
    trans_en: 'Steptronic Automatic',
    km: '42,000 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'मेडिटेरेनियन ब्लू',
    color_en: 'Mediterranean Blue',
    inspectionGrade: 'A+ (99/100)',
    warranty_hi: '1 साल की लक्ज़री शील्ड',
    warranty_en: '1 Year Luxury Shield Warranty',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
    features_hi: ['लाइव कॉकपिट प्रोफेशनल', 'कॉग्नेक वर्नास्का लेदर सीट्स', '6-कलर एम्बिएंट लाइटिंग', 'रिवर्स असिस्टेंट', 'हरमन कार्डन साउंड सिस्टम'],
    features_en: ['BMW Live Cockpit Professional', 'Cognac Vernasca Leather', 'Ambient Lighting with 6 Colors', 'Reverse Assistant', 'Harman Kardon Audio'],
    desc_hi: 'गुड़गांव की मशहूर लक्जरी सेडान BMW 320d। फुल बीएमडब्ल्यू डीलर सर्विस हिस्ट्री, 100% नॉन-एक्सीडेंटल सर्टिफिकेट।',
    desc_en: 'Gurugram VIP luxury sedan BMW 320d. Complete BMW dealership service history, certified 100% non-accidental.'
  },
  {
    id: 'car-6',
    name: 'Maruti Suzuki Swift ZXi+ AMT',
    brand: 'Maruti',
    year: 2021,
    price: 6.85,
    emi: '₹10,500',
    type: 'hatchback',
    fuel_hi: 'पेट्रोल',
    fuel_en: 'Petrol',
    trans_hi: 'ऑटोमैटिक (AMT)',
    trans_en: 'Automatic (AMT)',
    km: '22,400 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'सॉलिड फायर रेड',
    color_en: 'Solid Fire Red',
    inspectionGrade: 'A+ (96/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    features_hi: ['स्मार्टप्ले स्टूडियो टचस्क्रीन', 'एलईडी प्रोजेक्टर हेडलैंप्स', 'कीलेस एंट्री & स्टार्ट', 'क्रूज़ कंट्रोल', 'डुअल एयरबैग्स & ABS'],
    features_en: ['SmartPlay Studio Touchscreen', 'LED Projector Headlights', 'Keyless Entry & Push Start', 'Cruise Control', 'Dual Airbags & ABS'],
    desc_hi: 'शहर के ट्रैफिक और रोज़ाना इस्तेमाल के लिए सबसे किफायती मारुति स्विफ्ट टॉप मॉडल। 22+ Kmpl माइलेज।',
    desc_en: 'Highly economical Maruti Swift top model for city driving and daily commute. 22+ kmpl verified mileage.'
  },
  {
    id: 'car-7',
    name: 'Toyota Fortuner 4x2 AT',
    brand: 'Toyota',
    year: 2020,
    price: 29.50,
    emi: '₹45,900',
    type: 'suv',
    fuel_hi: 'डीजल',
    fuel_en: 'Diesel',
    trans_hi: 'ऑटोमैटिक',
    trans_en: 'Automatic',
    km: '54,000 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'सुपर व्हाइट',
    color_en: 'Super White',
    inspectionGrade: 'A+ (99/100)',
    warranty_hi: '1 साल की पूरी वारंटी',
    warranty_en: '1 Year Comprehensive Warranty',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features_hi: ['2.8L D-4D पावरफुल डीजल', 'चामोइस लेदर इंटीरियर', 'पावर टेलगेट', 'वेंटिलेटेड फ्रंट सीट्स', 'इको व स्पोर्ट मोड्स'],
    features_en: ['Indestructible 2.8L D-4D Diesel', 'Chamois Leather Interior', 'Power Tailgate', 'Ventilated Front Seats', 'Eco & Sport Driving Modes'],
    desc_hi: 'भारत की सबसे पॉपुलर फुल-साइज़ एसयूवी टोयोटा फॉर्च्यूनर। शानदार रीसेल वैल्यू और जीरो मेंटेनेंस प्रॉमिस।',
    desc_en: 'India\'s most sought-after full-size SUV Toyota Fortuner. Bulletproof reliability, zero maintenance hassle, high resale.'
  },
  {
    id: 'car-8',
    name: 'Maruti Grand Vitara Alpha Hybrid',
    brand: 'Maruti',
    year: 2023,
    price: 16.90,
    emi: '₹25,800',
    type: 'suv',
    fuel_hi: 'हाइब्रिड (Electric+Petrol)',
    fuel_en: 'Strong Hybrid (EV+Petrol)',
    trans_hi: 'e-CVT ऑटोमैटिक',
    trans_en: 'e-CVT Automatic',
    km: '14,200 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'रेड & ब्लैक डुअल टोन',
    color_en: 'Opulent Red / Black Dual Tone',
    inspectionGrade: 'A+ (100/100)',
    warranty_hi: 'कंपनी वारंटी एक्टिव',
    warranty_en: 'Active Factory Warranty + Sadguru Shield',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features_hi: ['27.97 km/l अल्ट्रा हाई माइलेज', 'EV प्योर इलेक्ट्रिक मोड', 'हेड-अप डिस्प्ले (HUD)', '360° व्यू कैमरा', 'वायरलेस कारप्ले'],
    features_en: ['27.97 km/l Ultra High Mileage', 'EV Pure Electric Mode', 'Head-Up Display (HUD)', '360 View Camera', 'Wireless Apple CarPlay'],
    desc_hi: 'लगभग नई कंडीशन 2023 ग्रैंड विटारा स्ट्रॉन्ग हाइब्रिड। 28 किमी/लीटर की माइलेज और कंपनी वारंटी एक्टिव।',
    desc_en: 'Like-new 2023 Grand Vitara Strong Hybrid. Delivers up to 28 kmpl in city traffic, active factory warranty.'
  },
  {
    id: 'car-9',
    name: 'Audi A4 40 TFSI Technology',
    brand: 'Audi',
    year: 2021,
    price: 33.50,
    emi: '₹51,200',
    type: 'luxury',
    fuel_hi: 'पेट्रोल',
    fuel_en: 'Petrol',
    trans_hi: 'एस-ट्रॉनिक 7-स्पीड ऑटोमैटिक',
    trans_en: 'S-Tronic 7-Speed Automatic',
    km: '29,000 km',
    reg_hi: 'HR-26 (गुड़गांव)',
    reg_en: 'HR-26 (Gurugram)',
    owners_hi: '1st ओनर',
    owners_en: '1st Owner',
    color_hi: 'इबिस व्हाइट',
    color_en: 'Ibis White',
    inspectionGrade: 'A+ (99/100)',
    warranty_hi: '1 साल की लक्ज़री शील्ड',
    warranty_en: '1 Year Luxury Shield Warranty',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
    features_hi: ['ऑडी वर्चुअल कॉकपिट प्लस', 'MMI नेविगेशन टच', 'B&O 3D साउंड सिस्टम', 'मैट्रिक्स एलईडी हेडलैंप्स', 'क्वाट्रो स्टाइलिंग'],
    features_en: ['Audi Virtual Cockpit Plus', 'MMI Navigation Plus with Touch', 'B&O 3D Sound System', 'Matrix LED Headlamps', 'Quattro Sport Styling'],
    desc_hi: 'ऑडी A4 40 टीएफएसआई टेक्नोलॉजी पैक। गुड़गांव वीआईपी नंबर प्लेट, शोरूम कंडीशन और जीरो क्लेम रिकॉर्ड।',
    desc_en: 'Audi A4 40 TFSI Technology Pack. Gurugram VIP registration, immaculate showroom condition, zero claim record.'
  }
];

class InventoryManager {
  constructor(showroomEngine) {
    this.showroom = showroomEngine;
    this.activeFilter = 'all';
    this.searchQuery = '';
    this.selectedFuel = 'all';
    this.selectedTransmission = 'all';
    this.currentLang = window.currentAppLang || 'hi';

    // Load from localStorage cache if available
    let cached = null;
    try {
      const stored = localStorage.getItem('sadguru_inventory');
      if (stored) cached = JSON.parse(stored);
    } catch (e) {}

    this.cars = (Array.isArray(cached) && cached.length > 0) ? cached : CAR_INVENTORY_DATA;
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
          localStorage.setItem('sadguru_inventory', JSON.stringify(cloudCars));
          this.applyFilters();
          this.populateTestDriveOptions();
          return;
        }
      } catch (err) {
        console.warn('Supabase sync skipped, trying API/local fallback:', err);
      }
    }

    // 2. Second priority: Local API /api/cars
    try {
      const res = await fetch('/api/cars');
      if (res.ok) {
        const liveCars = await res.json();
        if (Array.isArray(liveCars) && liveCars.length > 0) {
          this.cars = liveCars;
          window.SADGURU_CARS = liveCars;
          localStorage.setItem('sadguru_inventory', JSON.stringify(liveCars));
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
      const reg = (isEn ? c.reg_en : c.reg_hi) || c.reg_hi || 'HR-26';
      return `<option value="${c.id}">${c.name} - ${reg.split(' ')[0]} - ₹${priceLakhs} L</option>`;
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
            ${isEn ? 'Please try resetting your filters or search keyword. 50+ cars available at Sector 14 showroom.' : 'कृपया अन्य फ़िल्टर या सर्च कीवर्ड का उपयोग करें। सद्गुरु मोटर्स सेक्टर 14 में 50+ गाड़ियां उपलब्ध हैं।'}
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
      const reg = (isEn ? car.reg_en : car.reg_hi) || car.reg_hi || car.reg_en || 'HR-26';
      const fuel = (isEn ? car.fuel_en : car.fuel_hi) || car.fuel_hi || car.fuel_en || 'Petrol';
      const trans = (isEn ? car.trans_en : car.trans_hi) || car.trans_hi || car.trans_en || 'Manual';
      const owners = (isEn ? car.owners_en : car.owners_hi) || car.owners_hi || car.owners_en || '1st Owner';
      const inspectedBadge = isEn ? '210+ Inspected' : '210+ चेक्ड';
      const viewPhotosText = isEn ? 'View Photos' : 'फ़ोटो देखें';
      const priceLabel = isEn ? 'Cash Price' : 'नकद कीमत / Price';
      const emiLabel = isEn ? 'EMI Starts at' : 'आसान EMI शुरू';
      const perMonth = isEn ? '/mo' : '/माह';
      const btnReport = isEn ? 'Full Report' : 'पूरी रिपोर्ट';
      const btnTestDrive = isEn ? 'Test Drive' : 'टेस्ट ड्राइव';
      const isSold = (car.status === 'sold');
      const priceNum = parseFloat(car.price) || 0;

      return `
        <div class="car-card" data-id="${car.id}">
          <div class="car-image-box">
            <img src="${car.image}" alt="${car.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';" />
            <div class="car-badge-top-left">
              <span class="badge-certified"><i data-lucide="shield-check" style="width:13px;height:13px;"></i> ${inspectedBadge}</span>
              <span class="badge-location">${reg.split(' ')[0]}</span>
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
              <span class="car-reg">${reg.split(' ')[0]}</span>
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
              <div class="emi-block">
                <span class="emi-label">${emiLabel}</span>
                <div class="emi-val">${car.emi}${perMonth}</div>
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
  const reg = (isEn ? car.reg_en : car.reg_hi) || car.reg_hi || car.reg_en || 'HR-26 (Gurugram)';
  const owners = (isEn ? car.owners_en : car.owners_hi) || car.owners_hi || car.owners_en || '1st Owner';
  const desc = (isEn ? car.desc_en : car.desc_hi) || car.desc_hi || car.desc_en || '';
  const features = (isEn ? car.features_en : car.features_hi) || car.features_hi || car.features_en || [];
  const warranty = (isEn ? car.warranty_en : car.warranty_hi) || car.warranty_hi || car.warranty_en || '1 Year Sadguru Shield Warranty';
  const priceNum = parseFloat(car.price) || 0;

  body.innerHTML = `
    <div style="margin-bottom: 20px;">
      <!-- Top Image with verified overlay -->
      <div style="height: 300px; border-radius: 14px; overflow: hidden; margin-bottom: 12px; border: 1.5px solid var(--border-light); position: relative; background: #0b1528;">
        <img id="modal-active-img" src="${car.image}" alt="${car.name}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80';" />
        <div style="position: absolute; top: 12px; left: 12px; background: #059669; color: #fff; font-size: 0.8rem; font-weight: 700; padding: 4px 12px; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
          ✓ ${isEn ? 'Grade A+ Certified' : 'ग्रेड A+ सर्टिफाइड'}
        </div>
        ${car.allPhotos ? `
          <button type="button" onclick="window.openVernaGalleryModal()" style="position: absolute; bottom: 12px; right: 12px; background: rgba(15,23,42,0.85); color: #fff; border: 1px solid rgba(255,255,255,0.3); font-size: 0.78rem; font-weight: 600; padding: 6px 12px; border-radius: 999px; cursor: pointer; backdrop-filter: blur(8px);">
            📷 ${isEn ? 'Inspect 19 HD Photos & RC' : '19 HD फोटो व आरसी देखें'}
          </button>
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
            ${car.year} ${isEn ? 'Model' : 'मॉडल'} • ${owners} • ${reg}
          </p>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 1.8rem; font-weight: 800; color: var(--royal-blue-primary);">₹${priceNum.toFixed(2)} Lakh</div>
          <span style="font-size: 0.85rem; color: #0284c7; font-weight: 600;">${isEn ? 'EMI Starts at' : 'आसान EMI'} ${car.emi}${isEn ? '/mo' : '/माह'}</span>
        </div>
      </div>

      <!-- Description paragraph -->
      <p style="color: var(--text-body); font-size: 0.95rem; line-height: 1.65; margin-bottom: 22px; background: var(--surface-white); border: 1px solid var(--border-light); padding: 14px 16px; border-radius: 12px;">
        ${desc}
      </p>

      <!-- 210-Point Technical Checklist -->
      <h4 style="font-size: 1.08rem; color: var(--text-main); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
        <i data-lucide="check-circle-2" style="color: #059669; width: 20px; height: 20px;"></i> 
        ${isEn ? '210-Point Certified Technical Inspection Report (Sadguru Shield)' : '210-प्वाइंट सर्टिफाइड इन्स्पेक्शन रिपोर्ट (सद्गुरु शील्ड)'}
      </h4>
      
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 24px;">
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
            ${isEn ? 'Clean Gurugram RC, bank NOC verified, zero challans' : 'क्लीन एचआर-26 आरसी, बैंक एनओसी क्लियर, नो चालान'}
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
      <div style="display: flex; gap: 12px; flex-wrap: wrap;">
        <button class="btn btn-primary" onclick="window.openTestDriveModal('${car.id}'); window.closeAllModals();" style="flex: 1.2;">
          <i data-lucide="calendar"></i> ${isEn ? 'Book Test Drive (Sector 14 or Home)' : 'टेस्ट ड्राइव बुक करें (सेक्टर 14 या घर पर)'}
        </button>
        <a href="https://wa.me/919810123456?text=${encodeURIComponent(isEn ? `Hello Sadguru Motors, I am interested in ${car.name} (ID: ${car.id}). Please share more details.` : `नमस्ते सद्गुरु मोटर्स, मुझे ${car.name} (ID: ${car.id}) के बारे में जानकारी चाहिए।`)}" target="_blank" class="btn btn-whatsapp" style="flex: 1;">
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
    }
  } else {
    // For other cars, scroll to hero or open inspect
    const card = document.querySelector(`.car-card[data-id="${carId}"]`);
    if (card) {
      const reportBtn = card.querySelector('.btn-view-report');
      if (reportBtn) reportBtn.click();
    }
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
