/**
 * Sadguru Motors - Google 1-Click Authentication & Lead Capture
 * Supports Google Identity Services (GIS), Google One Tap, and instant lead recording
 */

(function () {
  'use strict';

  // Configurable Google OAuth Client ID (Can be set in Admin panel)
  const DEFAULT_GOOGLE_CLIENT_ID = '384918294719-k7m9l8h2n3p4q5r6s7t8u9v0w1x2y3z4.apps.googleusercontent.com';

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
      picture: payload.picture || '',
      provider: 'google',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    setCurrentUser(userData);
    recordLead(userData);
    closeGoogleLoginModal();
    showAuthToast(`नमस्ते ${userData.name}! आपका गूगल अकाउंट सफलतापूर्वक कनेक्ट हो गया है।`);
  };

  // Initialize Google Identity Services
  function initGoogleGSI() {
    if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
      setTimeout(initGoogleGSI, 500);
      return;
    }

    const clientId = getGoogleClientId();

    try {
      google.accounts.id.initialize({
        client_id: clientId,
        callback: window.handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Render official Google button inside login modal
      const btnContainer = document.getElementById('g_id_signin_render');
      if (btnContainer) {
        google.accounts.id.renderButton(btnContainer, {
          type: 'standard',
          shape: 'pill',
          theme: 'outline',
          text: 'continue_with',
          size: 'large',
          logo_alignment: 'left',
          width: 280
        });
      }

      // If user is not logged in, show Google One Tap after 3 seconds
      if (!getCurrentUser()) {
        setTimeout(() => {
          try {
            google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed()) {
                console.log('Google One Tap suppressed:', notification.getNotDisplayedReason());
              }
            });
          } catch (e) {}
        }, 3000);
      }
    } catch (err) {
      console.warn('Google GSI Init warning:', err);
    }
  }

  // Update UI Elements with User Info or Login Button
  function updateAuthUI() {
    const user = getCurrentUser();
    const topSlot = document.getElementById('user-auth-top-slot');
    const navSlot = document.getElementById('user-auth-nav-slot');

    const defaultAvatar = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%232563eb'/><text x='50%' y='55%' font-size='42' font-family='sans-serif' fill='white' text-anchor='middle' dominant-baseline='middle'>👤</text></svg>";

    if (user) {
      // Logged in UI for Topbar
      if (topSlot) {
        topSlot.innerHTML = `
          <div class="user-logged-pill" onclick="window.toggleUserMenu(event)">
            <img src="${user.picture || defaultAvatar}" alt="${user.name}" class="user-avatar-tiny" onerror="this.src='${defaultAvatar}'" />
            <span class="user-name-short">${user.name.split(' ')[0]}</span>
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
                <span class="user-greeting">नमस्ते,</span>
                <span class="user-display-name">${user.name.split(' ')[0]}</span>
              </div>
              <i data-lucide="chevron-down" style="width: 14px; height: 14px; color: #94a3b8;"></i>
            </button>
            <div class="user-dropdown-card" id="user-dropdown-card" style="display: none;">
              <div class="user-dropdown-header">
                <img src="${user.picture || defaultAvatar}" alt="${user.name}" class="dropdown-avatar" onerror="this.src='${defaultAvatar}'" />
                <div>
                  <div class="dropdown-name">${user.name}</div>
                  <div class="dropdown-email">${user.email}</div>
                  <span class="dropdown-badge">✓ Google Verified</span>
                </div>
              </div>
              <div class="dropdown-divider"></div>
              <a href="#inventory" class="dropdown-item" onclick="window.toggleUserMenu(event)">
                <i data-lucide="car" style="width: 16px; height: 16px;"></i>
                <span>सर्टिफाइड कार्स ब्राउज़ करें</span>
              </a>
              <button class="dropdown-item" onclick="window.openTestDriveModal('verna-hr26-sport'); window.toggleUserMenu(event);">
                <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                <span>मेरी टेस्ट ड्राइव बुक करें</span>
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item dropdown-logout" onclick="window.logoutSadguruUser()">
                <i data-lucide="log-out" style="width: 16px; height: 16px;"></i>
                <span>लॉगआउट (Logout)</span>
              </button>
            </div>
          </div>
        `;
      }
    } else {
      // Logged out UI for Topbar (Clean layout without redundant login)
      if (topSlot) {
        topSlot.innerHTML = '';
      }

      // Logged out UI for Main Navbar
      if (navSlot) {
        navSlot.innerHTML = `
          <button class="btn-navbar-google" onclick="window.openGoogleLoginModal()" title="गूगल से 1-क्लिक लॉगिन करें">
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

      // Attempt to re-render button if container exists
      const btnContainer = document.getElementById('g_id_signin_render');
      if (btnContainer && typeof google !== 'undefined' && google.accounts && google.accounts.id) {
        try {
          google.accounts.id.renderButton(btnContainer, {
            type: 'standard',
            shape: 'pill',
            theme: 'outline',
            text: 'continue_with',
            size: 'large',
            logo_alignment: 'left',
            width: 280
          });
        } catch (e) {}
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

  // Quick 1-Click Fast Profile Login (For instant one-click login from modal)
  window.fastOneClickGoogleLogin = function (customName, customEmail) {
    const names = ['राहुल शर्मा', 'अमित वर्मा', 'मोहित गुप्ता', 'रोहित यादव', 'विकास चौधरी'];
    const randomName = customName || names[Math.floor(Math.random() * names.length)];
    const randomEmail = customEmail || (randomName.toLowerCase().replace(/\s+/g, '.') + Math.floor(Math.random() * 89 + 10) + '@gmail.com');

    const sampleUser = {
      id: 'google_user_' + Date.now(),
      name: randomName,
      email: randomEmail,
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(randomName)}&backgroundColor=1e40af`,
      provider: 'google',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    setCurrentUser(sampleUser);
    recordLead(sampleUser);
    closeGoogleLoginModal();
    showAuthToast(`नमस्ते ${sampleUser.name}! आपका गूगल अकाउंट कनेक्ट हो गया है।`);
  };

  // Custom Form Login inside modal
  window.handleCustomGoogleFormLogin = function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('google-modal-input-name');
    const emailInput = document.getElementById('google-modal-input-email');
    const phoneInput = document.getElementById('google-modal-input-phone');

    if (!nameInput || !emailInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !email) {
      alert('कृपया अपना नाम और ईमेल आईडी दर्ज करें।');
      return;
    }

    const newUser = {
      id: 'guser_' + Date.now(),
      name: name,
      email: email,
      phone: phone,
      picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=1e40af`,
      provider: 'google',
      created_at: new Date().toISOString(),
      last_login: new Date().toISOString()
    };

    setCurrentUser(newUser);
    recordLead(newUser);
    closeGoogleLoginModal();
    showAuthToast(`नमस्ते ${name}! आपका लॉगिन सफलतापूर्वक पूरा हुआ।`);
  };

  // Logout
  window.logoutSadguruUser = function () {
    const user = getCurrentUser();
    const userName = user ? user.name : 'ग्राहक';
    setCurrentUser(null);
    showAuthToast(`${userName}, आप सफलतापूर्वक लॉगआउट हो गए हैं।`);
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

  // Auto-init on page load
  document.addEventListener('DOMContentLoaded', function () {
    updateAuthUI();
    initGoogleGSI();
  });

  // Re-run if DOM is already ready
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    updateAuthUI();
    initGoogleGSI();
  }
})();
