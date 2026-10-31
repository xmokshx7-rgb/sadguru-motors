/**
 * Sadguru Motors - Supabase Cloud Database Client
 * Official Direct REST Client with zero dependencies
 * Connects directly to Supabase PostgREST API
 */

const SUPABASE_CONFIG = {
  url: 'https://jcjbufwcwizxijcjjryq.supabase.co',
  anonKey: 'sb_publishable_pG1dDGKLCNvgSvGTjLVYXQ_b0epjODb',
  table: 'cars'
};

window.SadguruDB = {
  async getAllCars() {
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?select=*&order=created_at.desc`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
      const rows = await res.json();
      return rows.map(r => window.SadguruDB.formatFromSupabase(r));
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local storage:', err);
      return null;
    }
  },

  async addCar(carData) {
    try {
      const payload = window.SadguruDB.formatForSupabase(carData);
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`Supabase insert error: ${res.status}`);
      const inserted = await res.json();
      return inserted[0] ? window.SadguruDB.formatFromSupabase(inserted[0]) : carData;
    } catch (err) {
      console.error('Supabase addCar error:', err);
      throw err;
    }
  },

  async updateCarStatus(carId, isSold) {
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?id=eq.${encodeURIComponent(carId)}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_sold: isSold })
      });
      return res.ok;
    } catch (err) {
      console.error('Supabase updateCarStatus error:', err);
      return false;
    }
  },

  async deleteCar(carId) {
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.table}?id=eq.${encodeURIComponent(carId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      return res.ok;
    } catch (err) {
      console.error('Supabase deleteCar error:', err);
      return false;
    }
  },

  formatFromSupabase(r) {
    return {
      id: r.id,
      name: r.name,
      brand: r.brand,
      model: r.model || r.name,
      year: r.year,
      price: parseFloat(r.price) || 0,
      emi: r.emi || '₹15,000',
      km: typeof r.km === 'number' ? `${r.km.toLocaleString('en-IN')} km` : (r.km || '0 km'),
      type: r.category || 'sedan',
      fuel_hi: r.fuel || 'पेट्रोल',
      fuel_en: r.fuel || 'Petrol',
      trans_hi: r.transmission || 'मैनुअल',
      trans_en: r.transmission || 'Manual',
      reg_hi: r.reg_number || 'HR-26 (गुड़गांव)',
      reg_en: r.reg_number || 'HR-26 (Gurugram)',
      owners_hi: r.ownership || '1st ओनर',
      owners_en: r.ownership || '1st Owner',
      color_hi: r.color || 'व्हाइट',
      color_en: r.color || 'White',
      image: r.image || 'assets/car-photos/verna-hero-34.jpg',
      features_hi: Array.isArray(r.features) ? r.features : [],
      features_en: Array.isArray(r.features) ? r.features : [],
      is_sold: !!r.is_sold,
      status: r.is_sold ? 'sold' : 'available'
    };
  },

  formatForSupabase(c) {
    const kmNum = typeof c.km === 'number' ? c.km : (parseInt(String(c.km || '0').replace(/[^0-9]/g, '')) || 0);
    return {
      id: c.id,
      name: c.name,
      brand: c.brand,
      model: c.model || c.name.split(' ')[1] || 'Model',
      year: parseInt(c.year) || 2020,
      price: parseFloat(c.price) || 5.0,
      emi: c.emi || '₹15,000',
      km: kmNum,
      reg_number: c.reg_hi || c.reg_number || 'HR-26',
      ownership: c.owners_hi || c.ownership || '1st Owner',
      fuel: c.fuel_hi || c.fuel || 'Petrol',
      transmission: c.trans_hi || c.transmission || 'Manual',
      category: c.type || c.category || 'sedan',
      color: c.color_hi || c.color || 'White',
      image: c.image || 'assets/car-photos/verna-hero-34.jpg',
      features: c.features_hi || c.features || [],
      is_sold: c.status === 'sold' || !!c.is_sold
    };
  }
};
