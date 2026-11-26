// Display preferences, remembered on this device and applied before the page draws.
export type Theme = 'standard' | 'contrast' | 'dark' | 'soft';
export type Reading = { scale: number; theme: Theme; spacing: boolean; calm: boolean };

const key = 'cancercare.reading';
export const scaleRange = { min: 90, max: 160, step: 10 } as const;
export const defaultReading: Reading = { scale: 100, theme: 'standard', spacing: false, calm: false };
const themes: Theme[] = ['standard', 'contrast', 'dark', 'soft'];

function clampScale(value: number) {
  const stepped = Math.round(value / scaleRange.step) * scaleRange.step;
  return Math.min(scaleRange.max, Math.max(scaleRange.min, stepped));
}

export function loadReading(): Reading {
  try {
    const saved = JSON.parse(window.localStorage.getItem(key) ?? '{}');
    // Older saved format: { size: 0 | 1 | 2, contrast: boolean }
    const legacyScale = [100, 115, 130][saved.size as number];
    return {
      scale: clampScale(typeof saved.scale === 'number' ? saved.scale : legacyScale ?? 100),
      theme: themes.includes(saved.theme) ? saved.theme : saved.contrast === true ? 'contrast' : 'standard',
      spacing: saved.spacing === true,
      calm: saved.calm === true,
    };
  } catch {
    return defaultReading;
  }
}

export function applyReading(reading: Reading) {
  const root = document.documentElement;
  const scale = clampScale(reading.scale);
  root.style.setProperty('--reading-zoom', String(scale / 100));
  root.classList.toggle('reading-scaled', scale !== 100);
  for (const theme of themes) root.classList.toggle(`theme-${theme}`, reading.theme === theme && theme !== 'standard');
  root.classList.toggle('reading-spacing', reading.spacing);
  root.classList.toggle('reading-calm', reading.calm);
  root.style.colorScheme = reading.theme === 'dark' ? 'dark' : 'light';
  try { window.localStorage.setItem(key, JSON.stringify({ ...reading, scale })); } catch { /* storage unavailable */ }
}

export function isCalm() {
  return document.documentElement.classList.contains('reading-calm') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
