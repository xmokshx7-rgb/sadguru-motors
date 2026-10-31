/**
 * Sadguru Motors - 3D Virtual Showroom Engine
 * Sector 14, Gurgaon (HR-26)
 * Built with Three.js, GSAP & Web Audio API
 * 
 * Sleek Aerodynamic 3D Sports Sedan Model:
 * 2022 Hyundai Verna 1.5 CRDi AT SX (Sport Edition)
 * Registration: HR 26 EV 1479 | Polar White + Gloss Black Roof
 * Features: Sculpted Aerodynamic Body, Fender Wheel Arches, Raked Windshield,
 * Twin Hood Scoops, GT Wing Spoiler, Quad Chrome Exhaust,
 * Matte Black Alloys with Red Rim Stripe, Red Calipers, Dual-Tone Tan/Black Seats
 * with Sparco Cushions, 67,861 KM Digital Cluster, and Vibrant Magenta Ambient Lighting.
 */

class CarShowroom3D {
  constructor() {
    this.container = document.getElementById('canvas-container');
    if (!this.container) return;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    
    // Car parts and meshes
    this.carGroup = null;
    this.carType = 'sedan'; // Default: Hyundai Verna SX Sport Edition
    this.bodyMaterials = [];
    this.headlightObjects = [];
    this.taillightObjects = [];
    this.underglowObjects = [];
    this.volumetricCones = [];
    this.wheels = [];
    this.ambientLightStrips = [];
    
    // States
    this.isEngineRunning = false;
    this.isHeadlightsOn = true;
    this.isUnderglowOn = false;
    this.isAutoRotating = true;
    this.currentPaintColor = 0xffffff; // Brilliant Polar White (Gleaming Pearl Finish)
    
    // Audio engine
    this.soundEngine = new AutomotiveSoundEngine();
    
    // Hotspots in 3D (Bilingual definitions strictly matching HR26EV1479 Verna specs)
    this.hotspots = [
      {
        id: 'engine',
        title_hi: '1.5L CRDi VGT डीज़ल इंजन',
        title_en: '1.5L CRDi VGT Diesel Engine',
        desc_hi: '115 PS पॉवर, 250 Nm टॉर्क, 210-प्वाइंट सर्टिफाइड, 1 साल की वारंटी और 21+ km/l माइलेज।',
        desc_en: '115 PS Power, 250 Nm Torque, 210-point certified with 1-Year Warranty & 21+ km/l mileage.',
        pos: new THREE.Vector3(0, 0.75, 1.6),
        camPos: new THREE.Vector3(0.5, 1.3, 3.2),
        lookAt: new THREE.Vector3(0, 0.65, 1.4)
      },
      {
        id: 'spoiler',
        title_hi: 'ब्लैक GT विंग स्पॉइलर & क्वाड एग्जॉस्ट',
        title_en: 'Black GT Wing Spoiler & Quad Exhaust',
        desc_hi: 'हाई-डाउनफोर्स एरोडायनामिक GT विंग, रियर डिफ्यूज़र और डुअल ट्विन क्रोम एग्जॉस्ट टिप्स।',
        desc_en: 'High-downforce aerodynamic GT wing, rear diffuser, and dual twin chrome sport exhaust tips.',
        pos: new THREE.Vector3(0, 1.05, -2.05),
        camPos: new THREE.Vector3(-1.6, 1.3, -3.5),
        lookAt: new THREE.Vector3(0, 0.8, -1.8)
      },
      {
        id: 'wheel',
        title_hi: 'मैट ब्लैक स्पोर्ट्स अलॉय + रेड रिम स्ट्रिप',
        title_en: 'Matte Black Sport Alloys + Red Rim Stripe',
        desc_hi: '16" मैट ब्लैक 10-स्पोक अलॉय व्हील्स, सिग्नेचर रेड पेरीमीटर रिम स्ट्रिप और रेड ब्रेक कैलिपर्स।',
        desc_en: '16" Matte Black multi-spoke rims with signature Red perimeter stripe and Red brake calipers.',
        pos: new THREE.Vector3(0.98, 0.34, 1.35),
        camPos: new THREE.Vector3(2.1, 0.55, 1.8),
        lookAt: new THREE.Vector3(0.95, 0.34, 1.35)
      },
      {
        id: 'interior',
        title_hi: 'कॉकपिट, पर्पल एम्बिएंट & स्पार्को कुशन',
        title_en: 'Cockpit, Purple Ambient & Sparco Cushions',
        desc_hi: '67,861 KM डिजिटल क्लस्टर, 10.25" स्क्रीन, स्पार्को नेक कुशन और वाइब्रेंट पर्पल नियॉन एम्बिएंट लाइट।',
        desc_en: '67,861 KM Digital Cluster, 10.25" Screen, Sparco neck cushions, and Vibrant Purple LED Ambient Lighting.',
        pos: new THREE.Vector3(0.35, 0.95, 0.1),
        camPos: new THREE.Vector3(0.75, 1.2, 0.25),
        lookAt: new THREE.Vector3(0.1, 0.88, 0.5)
      },
      {
        id: 'sunroof',
        title_hi: 'इलेक्ट्रिक सनरूफ & ग्लॉस ब्लैक रूफ',
        title_en: 'Electric Sunroof & Gloss Black Roof',
        desc_hi: 'वन-टच इलेक्ट्रिक एंटी-पिंच सनरूफ और स्पोर्टी डुअल-टोन ग्लॉस ब्लैक रूफ + शार्क फिन एंटेना।',
        desc_en: 'One-touch electric sunroof with anti-pinch and sporty dual-tone High-Gloss Black Roof + Shark Fin antenna.',
        pos: new THREE.Vector3(0, 1.35, -0.15),
        camPos: new THREE.Vector3(0, 2.6, 0.9),
        lookAt: new THREE.Vector3(0, 1.2, 0)
      },
      {
        id: 'plate',
        title_hi: 'सरकारी रजिस्ट्रेशन HR-26-EV-1479',
        title_en: 'Govt Registration HR-26-EV-1479',
        desc_hi: 'SDM गुरुग्राम नॉर्थ रजिस्टर्ड, 1st ओनर (रजनी सरदाना), वैलिडिटी अगस्त 2037 तक, 100% वेरिफाइड RC।',
        desc_en: 'SDM Gurugram North registered, 1st Owner (Rajni Sardana), Valid till August 2037, 100% verified RC.',
        pos: new THREE.Vector3(0, 0.38, 2.22),
        camPos: new THREE.Vector3(0, 0.65, 3.2),
        lookAt: new THREE.Vector3(0, 0.38, 2.1)
      }
    ];

    this.init();
    this.setupEvents();
    this.animate();
  }

  /* =========================================================================
   * PROCEDURAL TEXTURE GENERATORS (HSRP Plate, Cluster, Infotainment, etc.)
   * ========================================================================= */
  
  createNumberPlateTexture(plateNumber = 'HR 26 EV 1479', isFront = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = isFront ? 110 : 130;
    const ctx = canvas.getContext('2d');

    // Reflective white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Black outer border
    ctx.strokeStyle = '#111827';
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

    // Left Blue IND strip
    const blueStripWidth = 56;
    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(4, 4, blueStripWidth, canvas.height - 8);

    // Ashok Chakra circle simulation
    ctx.strokeStyle = '#93c5fd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(32, 34, 14, 0, Math.PI * 2);
    ctx.stroke();

    // "IND" text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IND', 32, canvas.height - 32);

    // Hologram square
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(68, 12, 18, 18);
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1;
    ctx.strokeRect(68, 12, 18, 18);

    // Plate number
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 64px "Arial Black", Impact, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const textCenterX = blueStripWidth + (canvas.width - blueStripWidth) / 2;
    ctx.fillText(plateNumber, textCenterX, canvas.height / 2 + 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  createSpeedometerTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const bgGrad = ctx.createLinearGradient(0, 0, 512, 256);
    bgGrad.addColorStop(0, '#050b14');
    bgGrad.addColorStop(0.5, '#0b162c');
    bgGrad.addColorStop(1, '#050b14');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 512, 256);

    // Left: Tachometer
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(120, 130, 80, Math.PI * 0.75, Math.PI * 1.85);
    ctx.stroke();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(120, 130, 80, Math.PI * 0.75, Math.PI * 1.0);
    ctx.stroke();

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(120, 130, 80, Math.PI * 1.6, Math.PI * 1.85);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('RPM x1000', 120, 150);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 24px Arial';
    ctx.fillText('0.9', 120, 125);

    // Right: Speedometer
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(392, 130, 80, Math.PI * 1.15, Math.PI * 2.25);
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 15px Arial';
    ctx.fillText('km/h', 392, 150);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px Arial';
    ctx.fillText('0', 392, 125);

    // Center: Gear P
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(236, 50, 40, 40, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 26px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('P', 256, 78);

    // ODOMETER: EXACT VERIFIED 67,861 KM
    ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(176, 120, 160, 42, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
    ctx.fillText('67,861 km', 256, 148);

    ctx.fillStyle = '#64748b';
    ctx.font = '12px Arial';
    ctx.fillText('HYUNDAI VERNA SX • CRDi DIESEL', 256, 195);
    ctx.fillText('SADGURU MOTORS GURGAON', 256, 215);

    return new THREE.CanvasTexture(canvas);
  }

  createInfotainmentTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a101d';
    ctx.fillRect(0, 0, 512, 256);

    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, 512, 32);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('16:25', 18, 22);

    ctx.textAlign = 'center';
    ctx.fillText('Sadguru Motors • Sector 14, Gurugram', 256, 22);

    ctx.textAlign = 'right';
    ctx.fillText('4G LTE  |  24°C', 494, 22);

    // GPS Map
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(10, 42, 290, 204);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(20, 140);
    ctx.lineTo(290, 140);
    ctx.moveTo(140, 50);
    ctx.lineTo(140, 240);
    ctx.moveTo(40, 70);
    ctx.lineTo(260, 220);
    ctx.stroke();

    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(40, 70);
    ctx.lineTo(140, 140);
    ctx.lineTo(250, 140);
    ctx.stroke();

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(250, 140, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Sector 14, Old Railway Rd', 20, 230);

    // Media
    ctx.fillStyle = '#111c33';
    ctx.fillRect(310, 42, 192, 204);

    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(325, 55, 60, 60);
    ctx.fillStyle = '#93c5fd';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('♫', 355, 92);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Sadguru Audio', 395, 75);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial';
    ctx.fillText('Hi-Fi 1.5 CRDi', 395, 95);

    ctx.fillStyle = '#1e293b';
    ctx.fillRect(325, 130, 162, 6);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(325, 130, 95, 6);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('⏮', 355, 175);
    ctx.fillText('⏸', 406, 175);
    ctx.fillText('⏭', 455, 175);

    return new THREE.CanvasTexture(canvas);
  }

  createGrilleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    const diamondW = 28;
    const diamondH = 18;

    for (let y = 0; y < 256; y += diamondH) {
      const offsetX = (Math.floor(y / diamondH) % 2) * (diamondW / 2);
      for (let x = -diamondW; x < 512 + diamondW; x += diamondW) {
        ctx.beginPath();
        ctx.moveTo(x + offsetX + diamondW / 2, y);
        ctx.lineTo(x + offsetX + diamondW, y + diamondH / 2);
        ctx.lineTo(x + offsetX + diamondW / 2, y + diamondH);
        ctx.lineTo(x + offsetX, y + diamondH / 2);
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#141416';
        ctx.fill();
      }
    }

    ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
    for (let y = 0; y < 256; y += diamondH * 2) {
      for (let x = 0; x < 512; x += diamondW * 2) {
        ctx.fillRect(x + 12, y + 7, 4, 3);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  createSparcoTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 256, 128);

    ctx.fillStyle = '#1d4ed8';
    ctx.fillRect(20, 16, 216, 8);
    ctx.fillRect(20, 104, 216, 8);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'italic 900 42px "Arial Black", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('sparco', 128, 64);

    return new THREE.CanvasTexture(canvas);
  }

  /* =========================================================================
   * THREE.JS STUDIO ENVIRONMENT & HIGH-LUSTER LIGHTING
   * ========================================================================= */

  init() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a1931);
    this.scene.fog = new THREE.FogExp2(0x0a1931, 0.030);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 100);
    this.camera.position.set(4.6, 1.8, 5.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35; // Rich glossy showroom exposure
    this.container.appendChild(this.renderer.domElement);

    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.minDistance = 2.0;
    this.controls.maxDistance = 11.0;
    this.controls.target.set(0, 0.62, 0);

    this.buildShowroomLighting();
    this.buildShowroomFloor();
    this.buildCar(this.carType);
    this.initHotspotsDOM();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  buildShowroomLighting() {
    // Pure white showroom ambient light to eliminate dull grey shadows
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.35);
    this.scene.add(ambientLight);

    // Overhead Key Studio Softbox
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.bias = -0.0005;
    const d = 5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    this.scene.add(keyLight);

    // Left Studio Softbox (pure white for brilliant paint reflections)
    const leftFill = new THREE.DirectionalLight(0xffffff, 1.6);
    leftFill.position.set(-6, 5, 2);
    this.scene.add(leftFill);

    // Right Studio Softbox
    const rightFill = new THREE.DirectionalLight(0xffffff, 1.6);
    rightFill.position.set(6, 5, 2);
    this.scene.add(rightFill);

    // Front Beauty Light highlighting the cascading grille and headlights
    const frontSpot = new THREE.DirectionalLight(0xffffff, 2.0);
    frontSpot.position.set(0, 3.5, 6);
    this.scene.add(frontSpot);

    // Rear Silhouette Rim Light highlighting the GT Wing
    const rimLight = new THREE.DirectionalLight(0x60a5fa, 1.8);
    rimLight.position.set(0, 4.5, -6);
    this.scene.add(rimLight);

    // Floor Reflection Uplight
    const floorUplight = new THREE.PointLight(0x3b82f6, 1.5, 8);
    floorUplight.position.set(0, 0.1, 0);
    this.scene.add(floorUplight);

    // Overhead Circular Neon Showroom Rig
    const ringGeo = new THREE.TorusGeometry(3.6, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.set(0, 4.2, 0);
    this.scene.add(ringMesh);

    const ringLight = new THREE.PointLight(0xffffff, 1.6, 12);
    ringLight.position.set(0, 4.0, 0);
    this.scene.add(ringLight);
  }

  buildShowroomFloor() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = '#0f2347';
    ctx.fillRect(0, 0, 1024, 1024);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.24)';
    ctx.lineWidth = 3;
    for (let r = 80; r < 500; r += 70) {
      ctx.beginPath();
      ctx.arc(512, 512, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.20)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, x);
      ctx.lineTo(1024, x);
      ctx.stroke();
    }

    const floorTexture = new THREE.CanvasTexture(canvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;

    this.turntable = new THREE.Group();
    
    const floorGeo = new THREE.CylinderGeometry(5.4, 5.4, 0.15, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x142e5c,
      roughness: 0.20,
      metalness: 0.80,
      map: floorTexture
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.y = -0.075;
    floorMesh.receiveShadow = true;
    this.turntable.add(floorMesh);

    const borderRingGeo = new THREE.TorusGeometry(5.4, 0.035, 16, 64);
    const borderRingMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6 });
    const borderRingMesh = new THREE.Mesh(borderRingGeo, borderRingMat);
    borderRingMesh.rotation.x = Math.PI / 2;
    borderRingMesh.position.y = 0.005;
    this.turntable.add(borderRingMesh);

    this.scene.add(this.turntable);

    const outerFloorGeo = new THREE.PlaneGeometry(60, 60);
    const outerFloorMat = new THREE.MeshStandardMaterial({
      color: 0x071224,
      roughness: 0.8,
      metalness: 0.2
    });
    const outerFloor = new THREE.Mesh(outerFloorGeo, outerFloorMat);
    outerFloor.rotation.x = -Math.PI / 2;
    outerFloor.position.y = -0.08;
    outerFloor.receiveShadow = true;
    this.scene.add(outerFloor);
  }

  createCarPaintMaterial() {
    return new THREE.MeshPhysicalMaterial({
      color: this.currentPaintColor,
      metalness: 0.82,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0
    });
  }

  /* =========================================================================
   * STREAMLINED, SCULPTED 3D SPORTS SEDAN BUILDER
   * (Zero ugly boxes: Aerodynamic curves, curved fenders & raked fastback)
   * ========================================================================= */

  buildCar(type = 'sedan') {
    if (this.carGroup) {
      this.turntable.remove(this.carGroup);
      this.bodyMaterials = [];
      this.headlightObjects = [];
      this.taillightObjects = [];
      this.underglowObjects = [];
      this.volumetricCones = [];
      this.wheels = [];
      this.ambientLightStrips = [];
    }

    this.carType = type;
    this.carGroup = new THREE.Group();
    this.carGroup.position.y = 0.32; // Sport lowered suspension stance

    // Master Materials
    const carPaintMat = this.createCarPaintMaterial();
    this.bodyMaterials.push(carPaintMat);

    // High-Gloss Jet Black Roof (Dual-Tone Sport Edition)
    const glossBlackMat = new THREE.MeshPhysicalMaterial({
      color: 0x070707,
      roughness: 0.08,
      metalness: 0.90,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03
    });

    // Dark Carbon / Aerodynamic Splitter Trim
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x121214,
      roughness: 0.35,
      metalness: 0.55
    });

    // Polished Mirror Chrome
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.98,
      roughness: 0.06
    });

    // Dark Tinted Automotive Glass with real specular sheen
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050a14,
      metalness: 0.4,
      roughness: 0.04,
      transmission: 0.86,
      transparent: true,
      opacity: 0.74,
      ior: 1.54
    });

    // Vibrant Magenta/Purple LED Ambient Interior Light Material (Night Glow)
    const ambientMagentaMat = new THREE.MeshBasicMaterial({ color: 0xd946ef });

    // Saddle Tan Leather Material for Seat Centers
    const leatherTanMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.65,
      metalness: 0.15
    });

    // Dark Leatherette for Seat Bolsters
    const leatherBlackMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.7,
      metalness: 0.2
    });

    // Sport Red Caliper Material
    const redCaliperMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.25,
      metalness: 0.7
    });

    const bodyWidth = 1.86;
    const bodyLength = 4.45;
    const bodyHeight = 0.58;

    /* -------------------------------------------------------------------------
     * 1. AERODYNAMIC MAIN CHASSIS & SCULPTED CONTOURS
     * ------------------------------------------------------------------------- */
    // Main lower hull with rounded nose and tapered tail
    const lowerBodyGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight * 0.75, bodyLength);
    const lowerBody = new THREE.Mesh(lowerBodyGeo, carPaintMat);
    lowerBody.position.set(0, bodyHeight * 0.45, 0);
    lowerBody.castShadow = true;
    lowerBody.receiveShadow = true;
    this.carGroup.add(lowerBody);

    // Front Bumper Wedge Nose (Slanted forward aerodynamic nose)
    const frontNoseGeo = new THREE.CylinderGeometry(bodyWidth * 0.48, bodyWidth * 0.50, 0.45, 32, 1, false, 0, Math.PI);
    frontNoseGeo.rotateY(Math.PI / 2);
    frontNoseGeo.rotateZ(Math.PI / 2);
    const frontNose = new THREE.Mesh(frontNoseGeo, carPaintMat);
    frontNose.position.set(0, bodyHeight * 0.42, bodyLength / 2);
    this.carGroup.add(frontNose);

    // Front Bumper Lower Chin Splitter (Gloss Black Sport Kit)
    const splitterGeo = new THREE.BoxGeometry(bodyWidth * 1.02, 0.05, 0.32);
    const splitter = new THREE.Mesh(splitterGeo, carbonMat);
    splitter.position.set(0, 0.04, bodyLength / 2 + 0.08);
    this.carGroup.add(splitter);

    // Aerodynamic Side Skirts
    const sideSkirtGeo = new THREE.BoxGeometry(0.06, 0.06, bodyLength * 0.68);
    const leftSkirt = new THREE.Mesh(sideSkirtGeo, carbonMat);
    leftSkirt.position.set(-bodyWidth / 2 - 0.02, 0.06, 0);
    this.carGroup.add(leftSkirt);

    const rightSkirt = new THREE.Mesh(sideSkirtGeo, carbonMat);
    rightSkirt.position.set(bodyWidth / 2 + 0.02, 0.06, 0);
    this.carGroup.add(rightSkirt);

    /* -------------------------------------------------------------------------
     * 2. CURVED WHEEL ARCHES & FENDERS (Muscular Stance)
     * ------------------------------------------------------------------------- */
    const archRadius = 0.38;
    const archGeo = new THREE.TorusGeometry(archRadius, 0.035, 12, 24, Math.PI);
    
    // 4 Flared Wheel Arch Lips
    const wheelArchConfigs = [
      { x: -bodyWidth / 2 - 0.015, z: 1.35, rotY: Math.PI / 2 },
      { x: bodyWidth / 2 + 0.015, z: 1.35, rotY: -Math.PI / 2 },
      { x: -bodyWidth / 2 - 0.015, z: -1.35, rotY: Math.PI / 2 },
      { x: bodyWidth / 2 + 0.015, z: -1.35, rotY: -Math.PI / 2 }
    ];

    wheelArchConfigs.forEach(cfg => {
      const arch = new THREE.Mesh(archGeo, carPaintMat);
      arch.position.set(cfg.x, 0.34, cfg.z);
      arch.rotation.y = cfg.rotY;
      this.carGroup.add(arch);

      // Dark Wheel Well Liner
      const linerGeo = new THREE.CylinderGeometry(archRadius * 0.95, archRadius * 0.95, 0.12, 16, 1, false, 0, Math.PI);
      linerGeo.rotateZ(Math.PI / 2);
      const liner = new THREE.Mesh(linerGeo, carbonMat);
      liner.position.set(cfg.x > 0 ? cfg.x - 0.05 : cfg.x + 0.05, 0.34, cfg.z);
      this.carGroup.add(liner);
    });

    /* -------------------------------------------------------------------------
     * 3. SCULPTED HOOD & DUAL AERODYNAMIC BLACK AIR SCOOPS
     * ------------------------------------------------------------------------- */
    const hoodGeo = new THREE.BoxGeometry(bodyWidth * 0.90, 0.12, bodyLength * 0.35);
    const hood = new THREE.Mesh(hoodGeo, carPaintMat);
    hood.position.set(0, bodyHeight * 0.82, bodyLength * 0.28);
    hood.rotation.x = -0.095; // Slanted sleek hood
    hood.castShadow = true;
    this.carGroup.add(hood);

    // Dual Aerodynamic Black Hood Air Scoops (Distinctive Verna Customization)
    const scoopBaseGeo = new THREE.BoxGeometry(bodyWidth * 0.14, 0.035, bodyLength * 0.08);
    const scoopVentGeo = new THREE.BoxGeometry(bodyWidth * 0.11, 0.02, 0.02);

    // Left Hood Scoop
    const leftScoop = new THREE.Mesh(scoopBaseGeo, glossBlackMat);
    leftScoop.position.set(-bodyWidth * 0.24, bodyHeight * 0.92, bodyLength * 0.26);
    leftScoop.rotation.x = -0.095;
    this.carGroup.add(leftScoop);

    const leftVent = new THREE.Mesh(scoopVentGeo, carbonMat);
    leftVent.position.set(-bodyWidth * 0.24, bodyHeight * 0.93, bodyLength * 0.26 + 0.035);
    leftVent.rotation.x = -0.095;
    this.carGroup.add(leftVent);

    // Right Hood Scoop
    const rightScoop = new THREE.Mesh(scoopBaseGeo, glossBlackMat);
    rightScoop.position.set(bodyWidth * 0.24, bodyHeight * 0.92, bodyLength * 0.26);
    rightScoop.rotation.x = -0.095;
    this.carGroup.add(rightScoop);

    const rightVent = new THREE.Mesh(scoopVentGeo, carbonMat);
    rightVent.position.set(bodyWidth * 0.24, bodyHeight * 0.93, bodyLength * 0.26 + 0.035);
    rightVent.rotation.x = -0.095;
    this.carGroup.add(rightVent);

    /* -------------------------------------------------------------------------
     * 4. GREENHOUSE: RAKED WINDSHIELD, CONTRAST JET BLACK ROOF & SUNROOF
     * ------------------------------------------------------------------------- */
    const cabinWidth = bodyWidth * 0.80; // Tapered inward at shoulder
    const cabinZ = -0.22;

    // Raked Front Windshield (Sloping steeply back)
    const windshieldGeo = new THREE.PlaneGeometry(cabinWidth * 0.96, 0.72);
    windshieldGeo.rotateX(-Math.PI / 3.4);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(0, bodyHeight + 0.28, 0.65);
    this.carGroup.add(windshield);

    // Side Windows (Left & Right)
    const sideWindowGeo = new THREE.BoxGeometry(0.02, 0.42, bodyLength * 0.46);
    const leftWindow = new THREE.Mesh(sideWindowGeo, glassMat);
    leftWindow.position.set(-cabinWidth / 2, bodyHeight + 0.30, cabinZ);
    this.carGroup.add(leftWindow);

    const rightWindow = new THREE.Mesh(sideWindowGeo, glassMat);
    rightWindow.position.set(cabinWidth / 2, bodyHeight + 0.30, cabinZ);
    this.carGroup.add(rightWindow);

    // Fastback Rear Windshield (Sloping smoothly into trunk)
    const rearGlassGeo = new THREE.PlaneGeometry(cabinWidth * 0.92, 0.70);
    rearGlassGeo.rotateX(Math.PI / 3.4);
    const rearGlass = new THREE.Mesh(rearGlassGeo, glassMat);
    rearGlass.position.set(0, bodyHeight + 0.28, -1.05);
    this.carGroup.add(rearGlass);

    // High-Gloss Jet Black Roof Top (Contrast Two-Tone Sport Styling)
    const roofGeo = new THREE.BoxGeometry(cabinWidth * 0.88, 0.05, bodyLength * 0.38);
    const roof = new THREE.Mesh(roofGeo, glossBlackMat);
    roof.position.set(0, bodyHeight + 0.52, cabinZ + 0.05);
    roof.castShadow = true;
    this.carGroup.add(roof);

    // Electric Sunroof Glass Panel
    const sunroofGeo = new THREE.BoxGeometry(cabinWidth * 0.62, 0.02, 0.52);
    const sunroofMat = new THREE.MeshPhysicalMaterial({
      color: 0x030303,
      metalness: 0.92,
      roughness: 0.06,
      transparent: true,
      opacity: 0.90
    });
    const sunroof = new THREE.Mesh(sunroofGeo, sunroofMat);
    sunroof.position.set(0, bodyHeight + 0.55, cabinZ + 0.12);
    this.carGroup.add(sunroof);

    // Shark Fin Antenna
    const finGeo = new THREE.ConeGeometry(0.035, 0.10, 4);
    finGeo.rotateX(Math.PI / 4);
    const fin = new THREE.Mesh(finGeo, glossBlackMat);
    fin.position.set(0, bodyHeight + 0.58, cabinZ - 0.22);
    this.carGroup.add(fin);

    // Dual Aerodynamic Side Mirrors
    [-1, 1].forEach(side => {
      const mArm = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.025, 0.04), glossBlackMat);
      mArm.position.set(side * (bodyWidth / 2 + 0.04), bodyHeight + 0.10, 0.68);
      this.carGroup.add(mArm);

      const mHead = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.09, 0.10), glossBlackMat);
      mHead.position.set(side * (bodyWidth / 2 + 0.11), bodyHeight + 0.12, 0.68);
      this.carGroup.add(mHead);
    });

    /* -------------------------------------------------------------------------
     * 5. FRONT FASCIA: CASCADING DIAMOND GRILLE & HR-26-EV-1479 HSRP PLATE
     * ------------------------------------------------------------------------- */
    const grilleWidth = bodyWidth * 0.68;
    const grilleGeo = new THREE.BoxGeometry(grilleWidth, 0.32, 0.06);
    const grilleTex = this.createGrilleTexture();
    const grilleMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      map: grilleTex,
      metalness: 0.85,
      roughness: 0.35
    });
    const grille = new THREE.Mesh(grilleGeo, grilleMat);
    grille.position.set(0, bodyHeight * 0.44, bodyLength / 2 + 0.05);
    this.carGroup.add(grille);

    // Hyundai Chrome Oval Emblem
    const emblemRingGeo = new THREE.TorusGeometry(0.08, 0.018, 12, 32);
    const emblemRing = new THREE.Mesh(emblemRingGeo, chromeMat);
    emblemRing.position.set(0, bodyHeight * 0.52, bodyLength / 2 + 0.09);
    this.carGroup.add(emblemRing);

    // Front HSRP Number Plate: "HR 26 EV 1479"
    const frontPlateTex = this.createNumberPlateTexture('HR 26 EV 1479', true);
    const frontPlateGeo = new THREE.PlaneGeometry(0.55, 0.12);
    const frontPlateMat = new THREE.MeshStandardMaterial({
      map: frontPlateTex,
      roughness: 0.4,
      metalness: 0.2
    });
    const frontPlate = new THREE.Mesh(frontPlateGeo, frontPlateMat);
    frontPlate.position.set(0, bodyHeight * 0.26, bodyLength / 2 + 0.09);
    this.carGroup.add(frontPlate);

    /* -------------------------------------------------------------------------
     * 6. SMOKED PROJECTOR HEADLIGHTS & BOOMERANG LED DRLs
     * ------------------------------------------------------------------------- */
    const headlightWidth = 0.40;
    const headlightHeight = 0.13;
    const headlightGeo = new THREE.BoxGeometry(headlightWidth, headlightHeight, 0.14);
    
    this.headlightMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0xdbeafe,
      emissiveIntensity: 3.5,
      roughness: 0.1
    });

    [-1, 1].forEach(side => {
      const hl = new THREE.Mesh(headlightGeo, this.headlightMat);
      hl.position.set(side * bodyWidth * 0.36, bodyHeight * 0.60, bodyLength / 2 + 0.02);
      hl.rotation.y = side * 0.18;
      this.carGroup.add(hl);
      this.headlightObjects.push(hl);

      // Glowing Boomerang LED DRL strip
      const drl = new THREE.Mesh(new THREE.BoxGeometry(headlightWidth * 0.95, 0.02, 0.03), new THREE.MeshBasicMaterial({ color: 0x67e8f9 }));
      drl.position.set(side * bodyWidth * 0.36, bodyHeight * 0.66, bodyLength / 2 + 0.08);
      drl.rotation.y = side * 0.18;
      this.carGroup.add(drl);

      // Volumetric beam
      const beamGeo = new THREE.ConeGeometry(0.70, 4.5, 24, 1, true);
      beamGeo.translate(0, -2.25, 0);
      beamGeo.rotateX(-Math.PI / 2);
      const beam = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({
        color: 0xa5f3fc,
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        side: THREE.DoubleSide
      }));
      beam.position.set(side * bodyWidth * 0.36, bodyHeight * 0.60, bodyLength / 2 + 0.1);
      this.carGroup.add(beam);
      this.volumetricCones.push(beam);
    });

    /* -------------------------------------------------------------------------
     * 7. REAR END: GT WING SPOILER, CONNECTED TAILLIGHT & QUAD CHROME EXHAUST
     * ------------------------------------------------------------------------- */
    // Connected Modern LED Taillight Bar
    const taillightWidth = bodyWidth * 0.86;
    const taillightGeo = new THREE.BoxGeometry(taillightWidth, 0.08, 0.08);
    this.taillightMat = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      emissive: 0xff1100,
      emissiveIntensity: 2.8,
      roughness: 0.15
    });
    const taillight = new THREE.Mesh(taillightGeo, this.taillightMat);
    taillight.position.set(0, bodyHeight * 0.65, -bodyLength / 2 - 0.02);
    this.carGroup.add(taillight);
    this.taillightObjects.push(taillight);

    // Chrome "VERNA" Lettering Bar
    const vernaBar = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.40, 0.025, 0.02), chromeMat);
    vernaBar.position.set(0, bodyHeight * 0.58, -bodyLength / 2 - 0.025);
    this.carGroup.add(vernaBar);

    // Rear Gurgaon Number Plate "HR 26 EV 1479"
    const rearPlateTex = this.createNumberPlateTexture('HR 26 EV 1479', false);
    const rearPlateGeo = new THREE.PlaneGeometry(0.55, 0.14);
    rearPlateGeo.rotateY(Math.PI);
    const rearPlate = new THREE.Mesh(rearPlateGeo, new THREE.MeshStandardMaterial({
      map: rearPlateTex,
      roughness: 0.4,
      metalness: 0.2
    }));
    rearPlate.position.set(0, bodyHeight * 0.34, -bodyLength / 2 - 0.03);
    this.carGroup.add(rearPlate);

    /* HIGH-DOWNFORCE BLACK GT WING SPOILER (CUSTOM RACE KIT) */
    // Main Curved Airfoil Blade
    const wingDeck = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.96, 0.04, 0.34), glossBlackMat);
    wingDeck.position.set(0, bodyHeight * 0.82 + 0.26, -bodyLength / 2 + 0.16);
    wingDeck.castShadow = true;
    this.carGroup.add(wingDeck);

    // Vertical GT Wing Endplates
    [-1, 1].forEach(side => {
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.16, 0.38), glossBlackMat);
      endplate.position.set(side * bodyWidth * 0.48, bodyHeight * 0.82 + 0.26, -bodyLength / 2 + 0.16);
      this.carGroup.add(endplate);

      // Aerodynamic Upright Struts
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.26, 0.05), glossBlackMat);
      strut.position.set(side * 0.35, bodyHeight * 0.82 + 0.13, -bodyLength / 2 + 0.16);
      this.carGroup.add(strut);
    });

    /* REAR AERODYNAMIC DIFFUSER & QUAD CHROME EXHAUST TIPS */
    const diffuser = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.80, 0.14, 0.20), glossBlackMat);
    diffuser.position.set(0, 0.09, -bodyLength / 2 - 0.03);
    this.carGroup.add(diffuser);

    // Quad Chrome Exhaust Tips (Dual Twin-Pipes with dark hollow centers)
    const exhaustOuterGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.18, 20);
    exhaustOuterGeo.rotateX(Math.PI / 2);
    const exhaustInnerGeo = new THREE.CylinderGeometry(0.036, 0.036, 0.19, 20);
    exhaustInnerGeo.rotateX(Math.PI / 2);
    const exhaustInnerMat = new THREE.MeshBasicMaterial({ color: 0x050505 });

    const exhaustPositions = [
      { x: -bodyWidth * 0.32, y: 0.10, z: -bodyLength / 2 - 0.08 },
      { x: -bodyWidth * 0.23, y: 0.10, z: -bodyLength / 2 - 0.08 },
      { x: bodyWidth * 0.23, y: 0.10, z: -bodyLength / 2 - 0.08 },
      { x: bodyWidth * 0.32, y: 0.10, z: -bodyLength / 2 - 0.08 }
    ];

    exhaustPositions.forEach(p => {
      const outerPipe = new THREE.Mesh(exhaustOuterGeo, chromeMat);
      outerPipe.position.set(p.x, p.y, p.z);
      this.carGroup.add(outerPipe);

      const innerBore = new THREE.Mesh(exhaustInnerGeo, exhaustInnerMat);
      innerBore.position.set(p.x, p.y, p.z);
      this.carGroup.add(innerBore);
    });

    /* -------------------------------------------------------------------------
     * 8. DETAILED COCKPIT: DUAL-TONE SEATS, SPARCO CUSHIONS & PURPLE AMBIENT
     * ------------------------------------------------------------------------- */
    const dash = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.78, 0.24, 0.44), carbonMat);
    dash.position.set(0, bodyHeight + 0.12, 0.40);
    this.carGroup.add(dash);

    // VIBRANT MAGENTA/PURPLE AMBIENT INTERIOR LIGHT STRIP
    const ambientStrip = new THREE.Mesh(new THREE.BoxGeometry(bodyWidth * 0.76, 0.018, 0.018), ambientMagentaMat);
    ambientStrip.position.set(0, bodyHeight + 0.16, 0.20);
    this.carGroup.add(ambientStrip);
    this.ambientLightStrips.push(ambientStrip);

    const cabinPurpleLight = new THREE.PointLight(0xd946ef, 1.8, 2.5);
    cabinPurpleLight.position.set(0, bodyHeight + 0.25, 0.1);
    this.carGroup.add(cabinPurpleLight);
    this.ambientLightStrips.push(cabinPurpleLight);

    // 10.25" Central HD Infotainment Screen
    const screenTex = this.createInfotainmentTexture();
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.17), new THREE.MeshBasicMaterial({ map: screenTex }));
    screen.position.set(0, bodyHeight + 0.22, 0.26);
    screen.rotation.x = -0.15;
    this.carGroup.add(screen);

    // Digital TFT Speedometer Cluster (Displaying verified 67,861 KM)
    const clusterTex = this.createSpeedometerTexture();
    const cluster = new THREE.Mesh(new THREE.PlaneGeometry(0.30, 0.15), new THREE.MeshBasicMaterial({ map: clusterTex }));
    cluster.position.set(0.40, bodyHeight + 0.22, 0.30);
    cluster.rotation.x = -0.15;
    this.carGroup.add(cluster);

    // Sport Flat-Bottom Steering Wheel
    const steering = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.022, 12, 32), carbonMat);
    steering.position.set(0.40, bodyHeight + 0.22, 0.16);
    steering.rotation.x = -Math.PI / 4;
    this.carGroup.add(steering);

    /* DUAL-TONE SPORT BUCKET SEATS & SPARCO CUSHIONS */
    const sparcoTex = this.createSparcoTexture();
    const sparcoMat = new THREE.MeshBasicMaterial({ map: sparcoTex });

    const createSportSeat = (xPos) => {
      const seatGroup = new THREE.Group();
      seatGroup.position.set(xPos, bodyHeight, -0.06);

      const seatBase = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.12, 0.46), leatherBlackMat);
      seatGroup.add(seatBase);

      const seatTanCenter = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.13, 0.42), leatherTanMat);
      seatTanCenter.position.set(0, 0.01, 0);
      seatGroup.add(seatTanCenter);

      const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.44, 0.10), leatherBlackMat);
      backrest.position.set(0, 0.26, -0.18);
      backrest.rotation.x = -0.12;
      seatGroup.add(backrest);

      const backTanCenter = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.40, 0.11), leatherTanMat);
      backTanCenter.position.set(0, 0.26, -0.175);
      backTanCenter.rotation.x = -0.12;
      seatGroup.add(backTanCenter);

      const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.12, 0.08), leatherBlackMat);
      headrest.position.set(0, 0.54, -0.23);
      seatGroup.add(headrest);

      // SPARCO Racing Cushion
      const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.06), sparcoMat);
      cushion.position.set(0, 0.44, -0.18);
      seatGroup.add(cushion);

      return seatGroup;
    };

    this.carGroup.add(createSportSeat(0.40));
    this.carGroup.add(createSportSeat(-0.40));

    /* -------------------------------------------------------------------------
     * 9. SPORT WHEELS: MATTE BLACK ALLOY + DISTINCT RED PERIMETER RIM STRIPE
     * ------------------------------------------------------------------------- */
    const wheelRadius = 0.34;
    const wheelThickness = 0.22;
    const wheelOffsetX = bodyWidth / 2 - 0.03;
    const wheelOffsetZ = 1.35;

    const wheelPositions = [
      { x: -wheelOffsetX, z: wheelOffsetZ },
      { x: wheelOffsetX, z: wheelOffsetZ },
      { x: -wheelOffsetX, z: -wheelOffsetZ },
      { x: wheelOffsetX, z: -wheelOffsetZ }
    ];

    const redLipMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });

    wheelPositions.forEach((pos) => {
      const wheelGroup = new THREE.Group();
      wheelGroup.position.set(pos.x, 0, pos.z);

      // High-grip rubber tire
      const tireGeo = new THREE.CylinderGeometry(wheelRadius, wheelRadius, wheelThickness, 32);
      tireGeo.rotateZ(Math.PI / 2);
      const tireMat = new THREE.MeshStandardMaterial({
        color: 0x141414,
        roughness: 0.88,
        metalness: 0.12
      });
      const tire = new THREE.Mesh(tireGeo, tireMat);
      tire.castShadow = true;
      wheelGroup.add(tire);

      // Matte Black Multi-Spoke Rim Barrel
      const rimGeo = new THREE.CylinderGeometry(wheelRadius * 0.74, wheelRadius * 0.74, wheelThickness * 1.02, 24);
      rimGeo.rotateZ(Math.PI / 2);
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.82,
        roughness: 0.32
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      wheelGroup.add(rim);

      // DISTINCT RED PERIMETER RIM STRIPE (SPORT SIGNATURE)
      const redLipGeo = new THREE.TorusGeometry(wheelRadius * 0.73, 0.012, 10, 32);
      const redLip = new THREE.Mesh(redLipGeo, redLipMat);
      redLip.position.set(pos.x < 0 ? -wheelThickness / 2 - 0.012 : wheelThickness / 2 + 0.012, 0, 0);
      redLip.rotation.y = Math.PI / 2;
      wheelGroup.add(redLip);

      // 10-Spoke Sport Design
      const spokeGeo = new THREE.BoxGeometry(wheelRadius * 1.34, 0.036, 0.032);
      for (let s = 0; s < 5; s++) {
        const spoke = new THREE.Mesh(spokeGeo, rimMat);
        spoke.position.set(pos.x < 0 ? -wheelThickness / 2 + 0.01 : wheelThickness / 2 - 0.01, 0, 0);
        spoke.rotation.x = (s * Math.PI) / 5;
        wheelGroup.add(spoke);
      }

      // Center Hub Cap with Hyundai Emblem
      const hubGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.02, 16);
      hubGeo.rotateZ(Math.PI / 2);
      const hub = new THREE.Mesh(hubGeo, chromeMat);
      hub.position.set(pos.x < 0 ? -wheelThickness / 2 - 0.015 : wheelThickness / 2 + 0.015, 0, 0);
      wheelGroup.add(hub);

      // Brake Disc Rotor
      const discGeo = new THREE.CylinderGeometry(wheelRadius * 0.56, wheelRadius * 0.56, 0.03, 24);
      discGeo.rotateZ(Math.PI / 2);
      const disc = new THREE.Mesh(discGeo, chromeMat);
      wheelGroup.add(disc);

      // Bright Red Sport Brake Caliper
      const caliperGeo = new THREE.BoxGeometry(0.09, 0.18, 0.065);
      const caliper = new THREE.Mesh(caliperGeo, redCaliperMat);
      caliper.position.set(pos.x < 0 ? -0.04 : 0.04, wheelRadius * 0.30, 0);
      wheelGroup.add(caliper);

      this.carGroup.add(wheelGroup);
      this.wheels.push(wheelGroup);
    });

    /* -------------------------------------------------------------------------
     * 10. UNDERBODY NEON SHOWROOM GLOW
     * ------------------------------------------------------------------------- */
    const underglowLight = new THREE.PointLight(0x3b82f6, 0, 4.0);
    underglowLight.position.set(0, 0.08, 0);
    this.carGroup.add(underglowLight);
    this.underglowObjects.push(underglowLight);

    this.turntable.add(this.carGroup);
  }

  /* =========================================================================
   * CONTROLS & CAMERA
   * ========================================================================= */

  setCarPaint(hexColor) {
    this.currentPaintColor = hexColor;
    this.bodyMaterials.forEach(mat => {
      mat.color.setHex(hexColor);
    });
  }

  setCarType(type) {
    if (this.carType === type) return;
    this.buildCar(type);
    
    this.carGroup.position.y += 0.4;
    gsap.to(this.carGroup.position, {
      y: 0.32,
      duration: 0.6,
      ease: 'bounce.out'
    });

    document.querySelectorAll('.btn-model-opt').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.model === type);
    });
  }

  toggleHeadlights() {
    this.isHeadlightsOn = !this.isHeadlightsOn;
    this.soundEngine.playSwitchClick();

    const intensity = this.isHeadlightsOn ? 3.5 : 0;
    const beamOpacity = this.isHeadlightsOn ? 0.18 : 0;
    
    if (this.headlightMat) {
      this.headlightMat.emissiveIntensity = intensity;
    }
    this.volumetricCones.forEach(cone => {
      cone.visible = this.isHeadlightsOn;
      cone.material.opacity = beamOpacity;
    });

    const btn = document.getElementById('btn-toggle-lights');
    if (btn) btn.classList.toggle('active', this.isHeadlightsOn);
  }

  toggleUnderglow() {
    this.isUnderglowOn = !this.isUnderglowOn;
    this.soundEngine.playSwitchClick();

    const intensity = this.isUnderglowOn ? 2.8 : 0;
    this.underglowObjects.forEach(light => {
      light.intensity = intensity;
    });

    const btn = document.getElementById('btn-toggle-underglow');
    if (btn) btn.classList.toggle('active', this.isUnderglowOn);
  }

  toggleAutoRotate() {
    this.isAutoRotating = !this.isAutoRotating;
    const btn = document.getElementById('btn-toggle-rotate');
    if (btn) btn.classList.toggle('active', this.isAutoRotating);
  }

  toggleEngine() {
    this.isEngineRunning = !this.isEngineRunning;
    const btn = document.getElementById('btn-engine-start');
    const revFill = document.querySelector('.rev-bar-fill');
    const isEn = window.currentAppLang === 'en';
    
    if (this.isEngineRunning) {
      this.soundEngine.startEngine();
      if (btn) {
        btn.classList.add('running');
        btn.innerHTML = `<i data-lucide="power"></i> <span>${isEn ? 'ENGINE ON / STOP' : 'इंजन ऑन / STOP'}</span>`;
        if (window.lucide) lucide.createIcons();
      }
      if (revFill) revFill.style.width = '35%';
    } else {
      this.soundEngine.stopEngine();
      if (btn) {
        btn.classList.remove('running');
        btn.innerHTML = `<i data-lucide="power"></i> <span>${isEn ? 'START ENGINE' : 'स्टार्ट इंजन / START'}</span>`;
        if (window.lucide) lucide.createIcons();
      }
      if (revFill) revFill.style.width = '0%';
    }
  }

  revEngine() {
    if (!this.isEngineRunning) {
      this.toggleEngine();
    }
    this.soundEngine.revEngine();
    
    const revFill = document.querySelector('.rev-bar-fill');
    if (revFill) {
      revFill.style.width = '95%';
      setTimeout(() => {
        if (this.isEngineRunning) revFill.style.width = '35%';
      }, 900);
    }

    if (this.carGroup) {
      gsap.to(this.carGroup.position, {
        y: '+=0.04',
        duration: 0.08,
        yoyo: true,
        repeat: 7,
        ease: 'power1.inOut'
      });
    }
  }

  setCameraPreset(preset) {
    let targetPos = new THREE.Vector3(4.6, 1.8, 5.0);
    let targetLook = new THREE.Vector3(0, 0.62, 0);

    switch (preset) {
      case 'front':
        targetPos.set(2.2, 1.25, 4.2);
        targetLook.set(0, 0.55, 1.2);
        break;
      case 'side':
        targetPos.set(5.2, 1.15, 0);
        targetLook.set(0, 0.58, 0);
        break;
      case 'rear':
        targetPos.set(-2.4, 1.35, -4.4);
        targetLook.set(0, 0.68, -1.6);
        break;
      case 'top':
        targetPos.set(0.1, 7.0, 0.1);
        targetLook.set(0, 0, 0);
        break;
      case 'interior':
        targetPos.set(0.75, 1.2, 0.25);
        targetLook.set(0.1, 0.88, 0.5);
        break;
      case 'orbit':
      default:
        targetPos.set(4.6, 1.8, 5.0);
        targetLook.set(0, 0.62, 0);
        break;
    }

    this.soundEngine.playCameraClick();
    this.smoothCameraTransition(targetPos, targetLook);
  }

  smoothCameraTransition(pos, lookAt, duration = 1.2) {
    gsap.to(this.camera.position, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration: duration,
      ease: 'power2.inOut'
    });

    gsap.to(this.controls.target, {
      x: lookAt.x,
      y: lookAt.y,
      z: lookAt.z,
      duration: duration,
      ease: 'power2.inOut'
    });
  }

  initHotspotsDOM() {
    // Hotspots removed per user request: keep car 3D view 100% clean and unobstructed
    document.querySelectorAll('.hotspot-annotation').forEach(el => el.remove());
  }

  updateHotspotsLanguage() {
    // Disabled
  }

  onHotspotClick(hotspot) {
    // Disabled
  }

  updateHotspots() {
    // Disabled to keep 3D car view clean
  }

  setupEvents() {
    document.querySelectorAll('.btn-model-opt').forEach(btn => {
      if (btn.dataset.model) {
        btn.addEventListener('click', () => {
          this.setCarType(btn.dataset.model);
        });
      }
    });

    document.querySelectorAll('.color-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        document.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        const hex = parseInt(dot.dataset.color.replace('#', '0x'), 16);
        this.setCarPaint(hex);
        this.soundEngine.playSwitchClick();
      });
    });

    const lightsBtn = document.getElementById('btn-toggle-lights');
    if (lightsBtn) lightsBtn.addEventListener('click', () => this.toggleHeadlights());

    const underglowBtn = document.getElementById('btn-toggle-underglow');
    if (underglowBtn) underglowBtn.addEventListener('click', () => this.toggleUnderglow());

    const rotateBtn = document.getElementById('btn-toggle-rotate');
    if (rotateBtn) rotateBtn.addEventListener('click', () => this.toggleAutoRotate());

    const engineBtn = document.getElementById('btn-engine-start');
    if (engineBtn) engineBtn.addEventListener('click', () => this.toggleEngine());

    const revBtn = document.getElementById('btn-rev-engine');
    if (revBtn) revBtn.addEventListener('click', () => this.revEngine());

    document.querySelectorAll('.btn-cam-view').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-cam-view').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setCameraPreset(btn.dataset.view);
      });
    });
  }

  onWindowResize() {
    if (!this.container || !this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isAutoRotating && this.turntable) {
      this.turntable.rotation.y += 0.0035;
    }

    if (this.controls) {
      this.controls.update();
    }

    this.updateHotspots();

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

/**
 * Procedural Web Audio Engine
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
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  startEngine() {
    if (this.isMuted) return;
    this.initAudio();
    if (this.isRunning) return;

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
    if (!this.isRunning || !this.idleGain) return;
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
    if (this.isMuted && this.idleGain) {
      this.idleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isMuted;
  }
};
}
