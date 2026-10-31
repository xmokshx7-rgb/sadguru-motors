/**
 * Sadguru Motors - Supabase Cloud Database Client
 * Official Direct REST Client with zero dependencies
 * Connects directly to Supabase PostgREST API
 */

const SUPABASE_CONFIG = {
  url: 'https://jcjbufwcwizxijcjjryq.supabase.co',
  anonKey: 'sb_publishable_pG1dDGKLCNvgSvGTjLVYXQ_b0epjODb',
  table: 'cars',
  leadsTable: 'customer_leads'
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

  /* ================= GOOGLE CUSTOMER LEADS API ================= */
  async getAllLeads() {
    let cloudLeads = [];
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.leadsTable}?select=*&order=last_login.desc`, {
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      if (res.ok) {
        cloudLeads = await res.json();
      }
    } catch (err) {
      console.warn('Supabase leads fetch failed, falling back to local storage:', err);
    }

    // Merge with local storage leads to ensure 0% data loss
    try {
      const localLeads = JSON.parse(localStorage.getItem('sadguru_customer_leads') || '[]');
      const leadMap = new Map();
      cloudLeads.forEach(l => leadMap.set(l.email || l.id, l));
      localLeads.forEach(l => {
        const key = l.email || l.id;
        if (!leadMap.has(key)) {
          leadMap.set(key, l);
        } else {
          // Merge fresher timestamps
          const existing = leadMap.get(key);
          if (new Date(l.last_login || 0) > new Date(existing.last_login || 0)) {
            leadMap.set(key, { ...existing, ...l });
          }
        }
      });
      return Array.from(leadMap.values());
    } catch (e) {
      return cloudLeads;
    }
  },

  async recordCustomerLead(leadData) {
    const nowIso = new Date().toISOString();
    const cleanLead = {
      id: leadData.id || ('usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5)),
      name: leadData.name || 'Google User',
      email: leadData.email || '',
      picture: leadData.picture || '',
      provider: leadData.provider || 'google',
      created_at: leadData.created_at || nowIso,
      last_login: nowIso,
      phone: leadData.phone || '',
      car_interest: leadData.car_interest || ''
    };

    // 1. Immediately cache in local storage (instant response)
    try {
      const localLeads = JSON.parse(localStorage.getItem('sadguru_customer_leads') || '[]');
      const existingIdx = localLeads.findIndex(l => l.email === cleanLead.email);
      if (existingIdx >= 0) {
        localLeads[existingIdx] = { ...localLeads[existingIdx], ...cleanLead, created_at: localLeads[existingIdx].created_at || cleanLead.created_at };
      } else {
        localLeads.unshift(cleanLead);
      }
      localStorage.setItem('sadguru_customer_leads', JSON.stringify(localLeads));
    } catch (e) {
      console.warn('Local lead save warning:', e);
    }

    // 2. Persist to Supabase Cloud Database (if table exists)
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.leadsTable}`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(cleanLead)
      });
      return res.ok;
    } catch (err) {
      console.warn('Supabase lead write failed (cached locally):', err);
      return false;
    }
  },

  async deleteLead(leadId) {
    // Delete from local cache
    try {
      const localLeads = JSON.parse(localStorage.getItem('sadguru_customer_leads') || '[]');
      const filtered = localLeads.filter(l => l.id !== leadId && l.email !== leadId);
      localStorage.setItem('sadguru_customer_leads', JSON.stringify(filtered));
    } catch (e) {}

    // Delete from Supabase
    try {
      const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/${SUPABASE_CONFIG.leadsTable}?id=eq.${encodeURIComponent(leadId)}`, {
        method: 'DELETE',
        headers: {
          'apikey': SUPABASE_CONFIG.anonKey,
          'Authorization': `Bearer ${SUPABASE_CONFIG.anonKey}`
        }
      });
      return res.ok;
    } catch (err) {
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
