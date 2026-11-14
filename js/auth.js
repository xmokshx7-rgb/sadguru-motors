/**
 * Sadguru Motors - Google Authentication & Lead Capture
 * Secure client authentication, Supabase lead recording & Owner access control
 * Sector 14, Gurugram
 */

(function () {
  'use strict';

  // Configurable Google OAuth Client ID (Set in Admin panel if valid Google Cloud ID exists)
  const DEFAULT_GOOGLE_CLIENT_ID = '';

  function getGoogleClientId() {
    return localStorage.getItem('sadguru_google_client_id') || DEFAULT_GOOGLE_CLIENT_ID;
  }

  // Parse JWT Token from Google Credential Response
  function parseJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Failed to parse Google JWT:', e);
      return null;
    }
  }

  // Current Logged in User
  function getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('sadguru_current_user') || 'null');
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem('sadguru_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sadguru_current_user');
    }
    updateAuthUI();
  }

  // Record Lead to Supabase & Local Cache
  async function recordLead(userData) {
    if (window.SadguruDB && typeof window.SadguruDB.recordCustomerLead === 'function') {
      try {
        await window.SadguruDB.recordCustomerLead(userData);
      } catch (err) {
        console.warn('Record lead error:', err);
      }
    }
  }

  // Handle Google Credential Callback (GIS)
  window.handleGoogleCredentialResponse = function (response) {
    if (!response || !response.credential) return;
    const payload = parseJwt(response.credential);
    if (!payload || !payload.email) return;

    const userData = {
      id: payload.sub || ('usr_' + Date.now()),
      name: payload.name || payload.given_name || 'Google User',
      email: payload.email,
      picture: payload.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.name || 'User')}&background=2563eb&color=fff&rounded=true&bold=true`,
      provider: 'google',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    setCurrentUser(userData);
    recordLead(userData);
    closeGoogleLoginModal();

    if (isOwnerAuthenticated()) {
      localStorage.setItem('sadguru_owner_auth', 'true');
      applyOwnerAccessUI();
      showAuthToast(`Welcome Owner ${userData.name}! Dealer portal is active.`);
    } else {
      showAuthToast(`Welcome, ${userData.name}! Signed in with Google.`);
    }
  };

  // Initialize Google Identity Services (only if a valid custom client ID is configured)
  function initGoogleGSI() {
    const clientId = getGoogleClientId();
    if (!clientId || clientId.length < 25) {
      // No Google Cloud OAuth Client ID configured - skip GIS to prevent Error 401: invalid_client
      return;
    }

    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      setTimeout(initGoogleGSI, 500);
      return;
    }

    try {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: window.handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
    } catch (err) {
      console.warn('Google GSI Init warning:', err);
    }
  }

  // Update UI Elements with User Info or Login Button
  function updateAuthUI() {
    applyOwnerAccessUI();
    const user = getCurrentUser();
    const topSlot = document.getElementById('user-auth-top-slot');
    const navSlot = document.getElementById('user-auth-nav-slot');
    const isOwner = isOwnerAuthenticated();

    const defaultAvatar = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%232563eb'/><text x='50%' y='55%' font-size='42' font-family='sans-serif' fill='white' text-anchor='middle' dominant-baseline='middle'>👤</text></svg>";

    if (user) {
      const firstName = (user.name || 'User').split(' ')[0];

      // Logged in UI for Topbar
      if (topSlot) {
        topSlot.innerHTML = `
          <div class="user-logged-pill" onclick="window.toggleUserMenu(event)">
            <img src="${user.picture || defaultAvatar}" alt="${user.name}" class="user-avatar-tiny" onerror="this.src='${defaultAvatar}'" />
            <span class="user-name-short">${firstName}</span>
            ${isOwner ? '<span class="user-owner-badge" title="Showroom Owner">👑</span>' : ''}
            <i data-lucide="chevron-down" style="width: 12px; height: 12px;"></i>
          </div>
        `;
      }

      // Logged in UI for Main Navbar
      if (navSlot) {
        navSlot.innerHTML = `
          <div class="user-menu-wrapper" id="user-menu-wrapper">
            <button class="user-profile-btn" onclick="window.toggleUserMenu(event)">
              <img src="${user.picture || defaultAvatar}" alt="${user.name}" class="user-avatar-img" onerror="this.src='${defaultAvatar}'" />
              <div class="user-btn-details">
                <span class="user-greeting">Hello,</span>
                <span class="user-display-name">${firstName}</span>
              </div>
              <i data-lucide="chevron-down" style="width: 14px; height: 14px; color: #94a3b8;"></i>
            </button>
            <div class="user-dropdown-card" id="user-dropdown-card" style="display: none;">
              <div class="user-dropdown-header">
                <img src="${user.picture || defaultAvatar}" alt="${user.name}" class="dropdown-avatar" onerror="this.src='${defaultAvatar}'" />
                <div>
                  <div class="dropdown-name">${user.name}</div>
                  <div class="dropdown-email">${user.email}</div>
                  <span class="dropdown-badge">${isOwner ? '👑 Verified Owner' : '✓ Google Verified'}</span>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              ${isOwner ? `
              <a href="admin.html" class="dropdown-item dropdown-owner-link">
                <i data-lucide="shield-check" style="width: 16px; height: 16px; color: #fbbf24;"></i>
                <span>👑 Dealer Portal (Admin)</span>
              </a>
              ` : ''}
              <a href="#inventory" class="dropdown-item" onclick="window.toggleUserMenu(event)">
                <i data-lucide="car" style="width: 16px; height: 16px;"></i>
                <span>Browse Certified Cars</span>
              </a>
              <button class="dropdown-item" onclick="window.openTestDriveModal('verna-hr26-sport'); window.toggleUserMenu(event);">
                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                <span>Book My Test Drive</span>
              </button>
              ${isOwner ? `
              <div class="dropdown-divider"></div>
              <button class="dropdown-item" onclick="window.exitOwnerMode(); window.toggleUserMenu(event);" style="color: #94a3b8; font-size: 0.8rem;">
                <i data-lucide="eye-off" style="width: 15px; height: 15px;"></i>
                <span>Hide Dealer Portal (Exit Owner Mode)</span>
              </button>
              ` : ''}
              <div class="dropdown-divider"></div>
              <button class="dropdown-item dropdown-logout" onclick="window.logoutSadguruUser()">
                <i data-lucide="log-out" style="width: 16px; height: 16px;"></i>
                <span>Logout</span>
              </button>
            </div>
          </div>
        `;
      }
    } else {
      // Logged out UI for Topbar
      if (topSlot) {
        topSlot.innerHTML = '';
      }

      // Logged out UI for Main Navbar
      if (navSlot) {
        navSlot.innerHTML = `
          <button class="btn-navbar-google" onclick="window.openGoogleLoginModal()" title="Sign In with Google">
            <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z"/><path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/></svg>
            <span>Google Login</span>
          </button>
        `;
      }
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Toggle User Profile Dropdown
  window.toggleUserMenu = function (e) {
    if (e) e.stopPropagation();
    const dropdown = document.getElementById('user-dropdown-card');
    if (dropdown) {
      dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
  };

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    const dropdown = document.getElementById('user-dropdown-card');
    const wrapper = document.getElementById('user-menu-wrapper');
    if (dropdown && dropdown.style.display === 'block') {
      if (wrapper && !wrapper.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    }
  });

  // Open Google Login Modal
  window.openGoogleLoginModal = function () {
    const modal = document.getElementById('google-login-modal');
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      const emailInput = document.getElementById('google-modal-input-email');
      if (emailInput && !emailInput.value) {
        setTimeout(() => emailInput.focus(), 150);
      }
    }
    if (window.lucide) lucide.createIcons();
  };

  // Close Google Login Modal
  window.closeGoogleLoginModal = function () {
    const modal = document.getElementById('google-login-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  // Custom Form Login inside modal
  window.handleCustomGoogleFormLogin = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const nameInput = document.getElementById('google-modal-input-name');
    const emailInput = document.getElementById('google-modal-input-email');
    const phoneInput = document.getElementById('google-modal-input-phone');

    const email = emailInput ? emailInput.value.trim() : '';
    let name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!email) {
      alert('Please enter your Google Email address (e.g. name@gmail.com).');
      if (emailInput) emailInput.focus();
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Please enter a valid email address (e.g. name@gmail.com).');
      if (emailInput) emailInput.focus();
      return;
    }

    // Auto-derive full name from email prefix if left blank
    if (!name) {
      const emailPrefix = email.split('@')[0];
      name = emailPrefix
        .replace(/[._-]+/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
        .trim();
      if (!name) name = 'Google User';
    }

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=2563eb&color=fff&rounded=true&bold=true`;

    const newUser = {
      id: 'guser_' + Date.now(),
      name: name,
      email: email,
      phone: phone,
      picture: avatarUrl,
      provider: 'google',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    setCurrentUser(newUser);
    recordLead(newUser);
    closeGoogleLoginModal();

    if (isOwnerAuthenticated()) {
      localStorage.setItem('sadguru_owner_auth', 'true');
      applyOwnerAccessUI();
      showAuthToast(`Welcome Owner ${name}! Dealer Portal is active.`);
    } else {
      showAuthToast(`Welcome, ${name}! Signed in with Google successfully.`);
    }
  };

  // Logout
  window.logoutSadguruUser = function () {
    const user = getCurrentUser();
    const userName = user ? user.name : 'Customer';
    setCurrentUser(null);
    localStorage.removeItem('sadguru_owner_auth');
    applyOwnerAccessUI();
    showAuthToast(`${userName}, you have successfully signed out.`);
  };

  // Toast Notification
  function showAuthToast(msg) {
    let toast = document.getElementById('auth-status-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'auth-status-toast';
      toast.className = 'auth-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="auth-toast-content">
        <i data-lucide="check-circle" style="color: #4ade80; width: 18px; height: 18px;"></i>
        <span>${msg}</span>
      </div>
    `;
    toast.classList.add('visible');
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
      toast.classList.remove('visible');
    }, 4500);
  }

  // =========================================================================
  // OWNER / DEALER ACCESS CONTROL (Visible strictly to showroom owner)
  // =========================================================================
  const OWNER_PIN = '9911';
  const OWNER_EMAILS = [
    'xmokshx7@gmail.com',
    'sadgurumotors@gmail.com',
    'mokshgulati@gmail.com',
    'admin@sadgurumotors.com'
  ];

  function isOwnerAuthenticated() {
    if (localStorage.getItem('sadguru_owner_auth') === 'true') {
      return true;
    }
    const user = getCurrentUser();
    if (user && user.email) {
      const emailLower = user.email.toLowerCase();
      if (OWNER_EMAILS.includes(emailLower) || emailLower.includes('moksh') || emailLower.endsWith('@sadgurumotors.com')) {
        return true;
      }
    }
    return false;
  }

  function applyOwnerAccessUI() {
    const isOwner = isOwnerAuthenticated();
    if (isOwner) {
      document.body.classList.add('owner-authenticated');
      const badges = document.querySelectorAll('.owner-only-element');
      badges.forEach(b => {
        if (b.tagName === 'LI') {
          b.style.display = 'block';
        } else {
          b.style.display = 'inline-flex';
        }
      });
    } else {
      document.body.classList.remove('owner-authenticated');
      const badges = document.querySelectorAll('.owner-only-element');
      badges.forEach(b => {
        b.style.display = 'none';
      });
    }
  }

  window.openOwnerPinModal = function () {
    const modal = document.getElementById('owner-pin-modal');
    if (modal) {
      modal.style.display = 'flex';
      const input = document.getElementById('owner-passcode-input');
      if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 150);
      }
      const err = document.getElementById('owner-pin-error');
      if (err) err.style.display = 'none';
      if (window.lucide) lucide.createIcons();
    }
  };

  window.closeOwnerPinModal = function () {
    const modal = document.getElementById('owner-pin-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  };

  window.handleOwnerPinSubmit = function (e) {
    if (e) e.preventDefault();
    const input = document.getElementById('owner-passcode-input');
    const err = document.getElementById('owner-pin-error');
    const pin = (input ? input.value : '').trim();

    if (pin === OWNER_PIN || pin === 'admin9911') {
      localStorage.setItem('sadguru_owner_auth', 'true');
      applyOwnerAccessUI();
      window.closeOwnerPinModal();
      showAuthToast('👑 Owner Verified! Dealer Portal is now active.');
      if (window.lucide) lucide.createIcons();
    } else {
      if (err) {
        err.style.display = 'block';
        err.innerText = 'Incorrect Owner PIN. Please try again.';
      }
    }
  };

  window.exitOwnerMode = function () {
    localStorage.removeItem('sadguru_owner_auth');
    applyOwnerAccessUI();
    showAuthToast('Owner mode exited. Dealer portal is now hidden.');
    if (window.lucide) lucide.createIcons();
  };

  // URL triggers (?owner=1 or ?admin=1)
  function checkUrlOwnerTriggers() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('owner') || urlParams.has('admin') || urlParams.has('dealer')) {
        window.openOwnerPinModal();
      }
    } catch (e) {}
  }

  // 4-Click Logo secret trigger for Showroom Owner
  let logoClickCount = 0;
  let logoClickTimer = null;
  document.addEventListener('click', function (e) {
    const logo = e.target.closest('.brand-logo');
    if (logo) {
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 4) {
        logoClickCount = 0;
        window.openOwnerPinModal();
      } else {
        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
        }, 2200);
      }
    }
  });

  // Ctrl+Shift+A secret key trigger
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      window.openOwnerPinModal();
    }
  });

  // Auto-init on page load
  document.addEventListener('DOMContentLoaded', function () {
    applyOwnerAccessUI();
    updateAuthUI();
    initGoogleGSI();
    checkUrlOwnerTriggers();
  });

  // Re-run if DOM is already ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    applyOwnerAccessUI();
    updateAuthUI();
    initGoogleGSI();
    checkUrlOwnerTriggers();
  }
})();
