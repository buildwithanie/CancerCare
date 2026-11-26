import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { applyReading, loadReading } from './lib/reading';

// Apply saved text size and contrast before the first paint.
applyReading(loadReading());


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);




// Offline support: register the service worker in the built site only.
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => navigator.serviceWorker.ready).then(registration => {
      const urls = performance.getEntriesByType('resource').map(entry => entry.name).concat(window.location.href.split('#')[0]);
      registration.active?.postMessage({ type: 'cache-urls', urls });
    }).catch(() => { /* offline support is optional */ });
  });
}

// Privacy-friendly visitor counts (Cloudflare Web Analytics, no cookies).
// Set VITE_CF_ANALYTICS_TOKEN in the Cloudflare Pages build settings, or turn on
// Web Analytics for the Pages project in the Cloudflare dashboard instead.
const analyticsToken = import.meta.env.VITE_CF_ANALYTICS_TOKEN as string | undefined;
if (import.meta.env.PROD && analyticsToken) {
  const beacon = document.createElement('script');
  beacon.defer = true;
  beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
  beacon.dataset.cfBeacon = JSON.stringify({ token: analyticsToken });
  document.head.append(beacon);
}
