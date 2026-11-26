import { useEffect, useState } from 'react';
import { Square, Volume2 } from 'lucide-react';
import type { Language } from '@/content';
import { cn } from '@/lib/utils';

const speechEvent = 'cancercare:speech';
const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;

function useVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => hasSpeech ? window.speechSynthesis.getVoices() : []);
  useEffect(() => {
    if (!hasSpeech) return;
    const update = () => setVoices(window.speechSynthesis.getVoices());
    update();
    window.speechSynthesis.addEventListener('voiceschanged', update);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', update);
  }, []);
  return voices;
}

function pickVoice(voices: SpeechSynthesisVoice[], language: Language) {
  const prefix = language === 'sw' ? 'sw' : 'en';
  const matching = voices.filter(voice => voice.lang.toLowerCase().startsWith(prefix));
  return matching.find(voice => /ke$/i.test(voice.lang)) ?? matching.find(voice => /gb|za|ng/i.test(voice.lang)) ?? matching[0] ?? null;
}

// Turns chat or leaflet text into something pleasant to hear.
function speakable(text: string) {
  return text.replace(/\*\*/g, '').replace(/^\s*[-*•]\s+/gm, '').replace(/\/(learn|find-care|how-it-works|get-involved|resources|about|privacy)\/(#[\w-]+)?/g, '').replace(/\s+/g, ' ').trim();
}

/** A small "Listen" button. Hidden when the device has no voice for the language. */
export function ReadAloudButton({ text, language, labels, className, tone = 'light' }: { text: string; language: Language; labels: { listen: string; stop: string }; className?: string; tone?: 'light' | 'dark' }) {
  const voices = useVoices();
  const [speaking, setSpeaking] = useState(false);
  const voice = pickVoice(voices, language);
  const available = hasSpeech && (voice !== null || (language === 'en' && voices.length === 0));

  useEffect(() => {
    const reset = () => setSpeaking(false);
    window.addEventListener(speechEvent, reset);
    return () => { window.removeEventListener(speechEvent, reset); };
  }, []);

  useEffect(() => () => { if (speaking) window.speechSynthesis.cancel(); }, [speaking]);

  if (!available) return null;

  function toggle() {
    window.speechSynthesis.cancel();
    window.dispatchEvent(new Event(speechEvent));
    if (speaking) return;
    const utterance = new SpeechSynthesisUtterance(speakable(text));
    utterance.lang = voice?.lang ?? (language === 'sw' ? 'sw-KE' : 'en-KE');
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }

  return <button type="button" onClick={toggle} aria-pressed={speaking} className={cn('inline-flex min-h-8 items-center gap-1.5 rounded-full px-2.5 text-[11px] font-bold transition', tone === 'dark' ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-mist text-forest hover:bg-line', className)}>
    {speaking ? <Square className="size-3 fill-current" aria-hidden="true" /> : <Volume2 className="size-3.5" aria-hidden="true" />}
    {speaking ? labels.stop : labels.listen}
  </button>;
}
