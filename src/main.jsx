import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./i18n";

// Robust handler to retrigger flash animation on repeated clicks/keys of .qty-btn
if (typeof window !== 'undefined') {
  // Capture ?ref=CODE and persist it for 12 hours (cookie + localStorage with TTL)
  try {
    const url = new URL(window.location.href);
    const ref = url.searchParams.get('ref');
    if (ref) {
      const code = String(ref).trim().toUpperCase().slice(0, 64);
      if (code) {
        const ttlMs = 12 * 60 * 60 * 1000; // 12 hours
        const expireAt = Date.now() + ttlMs;
        try {
          localStorage.setItem('affiliate_ref', code);
          localStorage.setItem('affiliate_ref_expires', String(expireAt));
        } catch (_) {}
        try {
          const expires = new Date(expireAt).toUTCString();
          document.cookie = `affiliate_ref=${encodeURIComponent(code)}; expires=${expires}; path=/; SameSite=Lax`;
        } catch (_) {}
      }
      // Clean the URL to avoid leaking the ref further
      try {
        url.searchParams.delete('ref');
        window.history.replaceState({}, '', url.toString());
      } catch (_) {}
    }
  } catch (_) {}

  const triggerFlashOnBtn = (btn) => {
    if (!btn) return;
    // Find nearest parent container for flash
    let parent = btn.closest && btn.closest('.menu-item, .card, .cart-item');
    // fallback: walk up until body
    let node = btn;
    while (!parent && node && node !== document.body) {
      node = node.parentElement;
      if (!node) break;
      if (node.classList && (node.classList.contains('menu-item') || node.classList.contains('card') || node.classList.contains('cart-item'))) {
        parent = node;
        break;
      }
    }
    if (!parent) return;

    parent.classList.remove('flash');
    // force reflow
    void parent.offsetWidth;
    parent.classList.add('flash');

    if (parent._flashTimeout) clearTimeout(parent._flashTimeout);
    parent._flashTimeout = setTimeout(() => {
      parent.classList.remove('flash');
      parent._flashTimeout = null;
    }, 420);
  };

  // Handle pointer interactions (covers mouse & touch)
  document.addEventListener('pointerdown', (e) => {
    const btn = (e.target.closest && e.target.closest('.qty-btn')) || (e.target.closest && e.target.closest('.qty-controls') && e.target.closest('.qty-controls').querySelector('.qty-btn'));
    if (!btn) return;
    triggerFlashOnBtn(btn);
  });

  // Handle keyboard activation (Enter / Space) when focused inside a qty control
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const active = document.activeElement;
    if (!active) return;
    const btn = active.closest && active.closest('.qty-btn') || (active.closest && active.closest('.qty-controls') && active.closest('.qty-controls').querySelector('.qty-btn'));
    if (!btn) return;
    triggerFlashOnBtn(btn);
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
