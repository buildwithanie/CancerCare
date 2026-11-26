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
