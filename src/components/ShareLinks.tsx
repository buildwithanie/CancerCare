import { useState } from 'react';
import { Check, Link2, Send } from 'lucide-react';
import type { Copy } from '@/content';

export function ShareLinks({ share }: { share: Copy['share'] }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href.split('#')[0];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch { /* clipboard unavailable */ }
  }

  return <div className="flex flex-wrap items-center gap-2 text-[12px]">
    <span className="font-semibold text-white/85">{share.title}:</span>
    <a href={`https://wa.me/?text=${encodeURIComponent(`${document.title} ${url}`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/12 px-3 font-semibold hover:bg-white/20"><Send className="size-3.5" aria-hidden="true" />{share.whatsapp}</a>
    <button type="button" onClick={() => void copyLink()} className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-white/12 px-3 font-semibold hover:bg-white/20">{copied ? <Check className="size-3.5" aria-hidden="true" /> : <Link2 className="size-3.5" aria-hidden="true" />}<span aria-live="polite">{copied ? share.copied : share.copy}</span></button>
  </div>;
}
