import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import type { Language } from '@/content';

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

// Shows "Install app" only when the browser offers installation (mostly Chrome on Android).
export function InstallButton({ language }: { language: Language }) {
  const [prompt, setPrompt] = useState<InstallPrompt | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => { event.preventDefault(); setPrompt(event as InstallPrompt); };
    const onInstalled = () => setPrompt(null);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);

  if (!prompt) return null;
  return <button type="button" onClick={async () => { await prompt.prompt(); await prompt.userChoice; setPrompt(null); }} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[12px] font-bold text-forest hover:bg-mist">
    <Download className="size-3.5" aria-hidden="true" />{language === 'sw' ? 'Sakinisha programu' : 'Install app'}
  </button>;
}
