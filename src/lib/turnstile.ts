// Loads Cloudflare Turnstile only when the server says protection is on, and gets a one-time token.
type TurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

declare global { interface Window { turnstile?: TurnstileApi } }

let loading: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loading ??= new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => window.turnstile ? resolve(window.turnstile) : reject(new Error('turnstile'));
    script.onerror = () => { loading = null; reject(new Error('turnstile')); };
    document.head.append(script);
  });
  return loading;
}

/**
 * Runs the check inside `container`. Most visitors see nothing; a few get a one-tap box.
 * Resolves with a token, or rejects if the check fails or times out.
 */
export async function getTurnstileToken(container: HTMLElement, siteKey: string, language: 'en' | 'sw'): Promise<string> {
  const turnstile = await loadTurnstile();
  return new Promise((resolve, reject) => {
    let id = '';
    const finish = (done: () => void) => { window.clearTimeout(timer); try { turnstile.remove(id); } catch { /* already removed */ } done(); };
    const timer = window.setTimeout(() => finish(() => reject(new Error('timeout'))), 60_000);
    id = turnstile.render(container, {
      sitekey: siteKey,
      appearance: 'interaction-only',
      language: language === 'sw' ? 'sw' : 'en',
      callback: (token: string) => finish(() => resolve(token)),
      'error-callback': () => finish(() => reject(new Error('failed'))),
      'expired-callback': () => finish(() => reject(new Error('expired'))),
    });
  });
}
