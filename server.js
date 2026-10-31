/**
 * Sadguru Motors - Node.js Production HTTP & Inventory API Server
 * Sector 14, Old Delhi Road, Gurugram (HR-26)
 * Zero external dependencies - Runs natively on any Node.js version!
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(PUBLIC_DIR, 'data');
const CARS_FILE = path.join(DATA_DIR, 'cars.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Backup sync to website/satguru and website/sadguru if present
const BACKUP_DIRS = [
  path.join(PUBLIC_DIR, 'website', 'satguru', 'data'),
  path.join(PUBLIC_DIR, 'website', 'sadguru', 'data')
];
BACKUP_DIRS.forEach(dir => {
  if (fs.existsSync(path.dirname(dir)) && !fs.existsSync(dir)) {
    try { fs.mkdirSync(dir, { recursive: true }); } catch (e) {}
  }
});

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

// Valuation algorithm in JavaScript
function calculateValuation(brand, model, year, km) {
  let basePrice = 8.5; // Lakhs base
  const brandLower = (brand || '').toLowerCase();
  
  if (['bmw', 'audi', 'mercedes'].includes(brandLower)) basePrice = 24.0;
  else if (['toyota', 'mahindra'].includes(brandLower)) basePrice = 14.0;
  else if (['hyundai', 'tata', 'kia'].includes(brandLower)) basePrice = 9.5;
  else if (['maruti'].includes(brandLower)) basePrice = 6.2;

  const currentYear = 2026;
  const age = Math.max(1, currentYear - (parseInt(year) || 2020));
  const depreciation = Math.pow(0.91, age);
  const kmFactor = Math.max(0.82, 1 - (((parseInt(km) || 30000) / 100000) * 0.12));

  const estimated = Math.max(2.0, basePrice * depreciation * kmFactor);
  return {
    brand,
    model,
    year,
    km,
    estimatedPriceLakhs: parseFloat(estimated.toFixed(2)),
    minOfferLakhs: parseFloat((estimated * 0.94).toFixed(2)),
    maxOfferLakhs: parseFloat((estimated * 1.06).toFixed(2)),
    gurgaonRtoBonus: 'Free HR-26 RC Transfer Included',
    dealership: 'Sadguru Motors, Sector 14 Gurgaon'
  };
}

// Helpers for reading and writing cars
function readCarsData() {
  try {
    if (fs.existsSync(CARS_FILE)) {
      const raw = fs.readFileSync(CARS_FILE, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading cars file:', err);
  }
  return [];
}

function writeCarsData(cars) {
  const jsonStr = JSON.stringify(cars, null, 2);
  try {
    fs.writeFileSync(CARS_FILE, jsonStr, 'utf8');
  } catch (e) {
    console.error('Failed writing to primary cars file:', e);
  }
  BACKUP_DIRS.forEach(dir => {
    try {
      if (fs.existsSync(dir)) {
        fs.writeFileSync(path.join(dir, 'cars.json'), jsonStr, 'utf8');
      }
    } catch (e) {}
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // 1. Health check
  if (pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'online',
      dealership: 'Sadguru Motors, Sector 14, Gurugram',
      carsCount: readCarsData().length
    }));
    return;
  }

  // 2. GET /api/cars - Get all cars
  if (pathname === '/api/cars' && req.method === 'GET') {
    const cars = readCarsData();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(cars));
    return;
  }

  // 3. POST /api/cars - Add/Upload new car
  if (pathname === '/api/cars' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 50 * 1024 * 1024) {
        req.connection.destroy();
      }
    });
    req.on('end', () => {
      try {
        const carData = JSON.parse(body || '{}');
        if (!carData.name) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Car name is required' }));
          return;
        }

        const cars = readCarsData();
        
        // Generate unique car id if not provided
        const newId = carData.id || ('car-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6));
        
        // Populate standard fields and bilingual fallbacks
        const newCar = {
          id: newId,
          name: carData.name,
          brand: carData.brand || 'Other',
          year: parseInt(carData.year) || 2022,
          price: parseFloat(carData.price) || 8.5,
          emi: carData.emi || ('₹' + Math.round((carData.price || 8.5) * 1550).toLocaleString('en-IN')),
          type: (carData.type || 'sedan').toLowerCase(),
          fuel_hi: carData.fuel_hi || carData.fuel || 'पेट्रोल',
          fuel_en: carData.fuel_en || carData.fuel || 'Petrol',
          trans_hi: carData.trans_hi || carData.transmission || 'मैनुअल',
          trans_en: carData.trans_en || carData.transmission || 'Manual',
          km: carData.km ? (carData.km.toString().includes('km') ? carData.km : `${carData.km} km`) : '25,000 km',
          reg_hi: carData.reg_hi || carData.reg || 'HR-26 (गुड़गांव)',
          reg_en: carData.reg_en || carData.reg || 'HR-26 (Gurugram)',
          owners_hi: carData.owners_hi || (carData.owners ? `${carData.owners} ओनर` : '1st ओनर'),
          owners_en: carData.owners_en || (carData.owners ? `${carData.owners} Owner` : '1st Owner'),
          color_hi: carData.color_hi || carData.color || 'व्हाइट',
          color_en: carData.color_en || carData.color || 'White',
          inspectionGrade: carData.inspectionGrade || 'A+ (99/100, 210+ Certified)',
          warranty_hi: carData.warranty_hi || '1 साल की सद्गुरु शील्ड वारंटी',
          warranty_en: carData.warranty_en || '1 Year Sadguru Shield Warranty',
          status: carData.status || 'available', // available | sold
          image: carData.image || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
          allPhotos: Array.isArray(carData.allPhotos) && carData.allPhotos.length > 0 
            ? carData.allPhotos 
            : [{ url: carData.image || 'assets/car-photos/verna-hero-34.jpg', label_hi: 'फ्रंट व्यू', label_en: 'Front View' }],
          features_hi: Array.isArray(carData.features_hi) && carData.features_hi.length > 0
            ? carData.features_hi
            : (carData.features ? carData.features : ['सर्टिफाइड नॉन-एक्सीडेंटल', 'पावर स्टीयरिंग & एसी', 'टचस्क्रीन सिस्टम']),
          features_en: Array.isArray(carData.features_en) && carData.features_en.length > 0
            ? carData.features_en
            : (carData.features ? carData.features : ['Certified Non-Accidental', 'Power Steering & AC', 'Touchscreen System']),
          desc_hi: carData.desc_hi || `गुड़गांव रजिस्टर्ड ${carData.name}। 100% वेरिफाइड नॉन-एक्सीडेंटल और शोरूम कंडीशन।`,
          desc_en: carData.desc_en || `Gurugram registered ${carData.name}. Verified non-accidental, mint showroom condition.`
        };

        // Insert at beginning of inventory
        cars.unshift(newCar);
        writeCarsData(cars);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'कार सफलतापूर्वक अपलोड कर दी गई है।', car: newCar }));
      } catch (err) {
        console.error('Error saving car:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid car data payload' }));
      }
    });
    return;
  }

  // 4. DELETE /api/cars/:id or DELETE /api/cars?id=...
  if ((pathname.startsWith('/api/cars/') || pathname === '/api/cars') && req.method === 'DELETE') {
    let carId = parsedUrl.query.id;
    if (!carId && pathname.startsWith('/api/cars/')) {
      carId = pathname.replace('/api/cars/', '').trim();
    }

    if (!carId) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Car ID is required for deletion' }));
      return;
    }

    let cars = readCarsData();
    const initialLen = cars.length;
    cars = cars.filter(c => c.id !== carId);

    if (cars.length === initialLen) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Car not found with ID: ' + carId }));
      return;
    }

    writeCarsData(cars);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      message: 'गाड़ी इन्वेंट्री से सफलतापूर्वक हटा दी गई है।',
      deletedId: carId,
      remainingCount: cars.length
    }));
    return;
  }

  // 5. PUT /api/cars/:id - Update car (e.g. status: sold / available, price)
  if (pathname.startsWith('/api/cars/') && req.method === 'PUT') {
    const carId = pathname.replace('/api/cars/', '').trim();
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const updateData = JSON.parse(body || '{}');
        let cars = readCarsData();
        const index = cars.findIndex(c => c.id === carId);

        if (index === -1) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Car not found' }));
          return;
        }

        cars[index] = { ...cars[index], ...updateData };
        writeCarsData(cars);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, car: cars[index] }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid update payload' }));
      }
    });
    return;
  }

  // 6. Valuation endpoint
  if (pathname === '/api/valuation' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const quote = calculateValuation(data.brand, data.model, data.year, data.km);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(quote));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // 7. Test drive lead endpoint
  if (pathname === '/api/test-drive' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        const leadId = 'SG-' + Date.now().toString().slice(-6);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          bookingId: leadId,
          message: 'टेस्ट ड्राइव अनुरोध सफलतापूर्वक दर्ज कर लिया गया है।',
          details: data
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid booking data' }));
      }
    });
    return;
  }

  // 8. Static File Serving & Admin Route rewrite
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  } else if (safePath === '/admin' || safePath === '/admin/' || safePath === '\\admin') {
    safePath = '/admin.html';
  }

  const filePath = path.join(PUBLIC_DIR, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 404 handler - fallback to index.html for SPA
      const fallbackPath = path.join(PUBLIC_DIR, 'index.html');
      fs.readFile(fallbackPath, (fallbackErr, content) => {
        if (fallbackErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found - Sadguru Motors');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(content);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🚗 Sadguru Motors Node.js Server running at http://localhost:${PORT}`);
  console.log(`🛠️ Dealer Admin Portal: http://localhost:${PORT}/admin`);
  console.log(`📍 Sector 14, Old Delhi Road, Gurugram, Haryana - 122001`);
  console.log(`================================================================`);
});
