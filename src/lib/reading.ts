// Text size and contrast preferences, remembered on this device.
export type Reading = { size: 0 | 1 | 2; contrast: boolean };

const key = 'cancercare.reading';
export const zoomLevels = [1, 1.15, 1.3] as const;

export function loadReading(): Reading {
  try {
    const saved = JSON.parse(window.localStorage.getItem(key) ?? '{}');
    return { size: [0, 1, 2].includes(saved.size) ? saved.size : 0, contrast: saved.contrast === true };
  } catch {
    return { size: 0, contrast: false };
  }
}

export function applyReading(reading: Reading) {
  const root = document.documentElement;
  root.style.setProperty('--reading-zoom', String(zoomLevels[reading.size]));
  root.classList.toggle('reading-large', reading.size > 0);
  root.classList.toggle('high-contrast', reading.contrast);
  try { window.localStorage.setItem(key, JSON.stringify(reading)); } catch { /* storage unavailable */ }
}
