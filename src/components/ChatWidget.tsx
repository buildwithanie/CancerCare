import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowRight, MessageCircle, Mic, MicOff, Phone, RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { ReadAloudButton } from '@/components/ReadAloud';
import { pagesCopy } from '@/content-pages';
import { getTurnstileToken } from '@/lib/turnstile';
import { fallbackReply, isUrgent, matchTopic, urgentReply } from '../../shared/assistant.js';
import type { Copy, Language } from '@/content';
import { cn } from '@/lib/utils';

type Message = { role: 'user' | 'assistant'; content: string; link?: { href: string; label: string }; urgent?: boolean; note?: string; suggest?: boolean };

type Recognition = {
  lang: string; interimResults: boolean; continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null; onend: (() => void) | null;
  start: () => void; stop: () => void;
};
const RecognitionClass = typeof window === 'undefined' ? undefined
  : (window as unknown as { SpeechRecognition?: new () => Recognition; webkitSpeechRecognition?: new () => Recognition }).SpeechRecognition
    ?? (window as unknown as { webkitSpeechRecognition?: new () => Recognition }).webkitSpeechRecognition;

/** Opens the assistant and asks a question from anywhere on the site. */
export function askAssistant(question: string) {
  window.dispatchEvent(new CustomEvent('cancercare:ask', { detail: question }));
}
type Mode = 'unknown' | 'ai' | 'offline';

const storageKey = 'cancercare.chat';
const passKey = 'cancercare.chat-pass';

function savedPass() {
  try { return window.sessionStorage.getItem(passKey) ?? undefined; } catch { return undefined; }
}
const sitePath = /(\/(?:learn|find-care|how-it-works|get-involved|resources|about|privacy|caregivers)\/(?:#[\w-]+)?)/g;

function loadMessages(): Message[] {
  try {
    const saved = JSON.parse(window.sessionStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(saved) ? saved.filter(item => item && typeof item.content === 'string').slice(-30) : [];
  } catch {
    return [];
  }
}

function offlineAnswer(question: string, language: Language): Message {
  if (isUrgent(question)) return { role: 'assistant', content: urgentReply(language, question), urgent: true };
  const topic = matchTopic(question);
  if (!topic) return { role: 'assistant', content: fallbackReply(language), suggest: true };
  return { role: 'assistant', content: topic.answer[language], link: topic.link && { href: topic.link.href, label: topic.link.label[language] } };
}

function Inline({ text }: { text: string }) {
  return <>{text.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) => chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4
    ? <strong key={index} className="font-bold">{chunk.slice(2, -2)}</strong>
    : chunk.split(sitePath).map((part, inner) => inner % 2 === 1
      ? <a key={`${index}-${inner}`} href={part} className="font-semibold text-forest underline underline-offset-2">{part}</a>
      : <span key={`${index}-${inner}`}>{part}</span>))}</>;
}

// Renders plain text with simple lists ("- item"), **bold** and site page links.
function RichText({ text }: { text: string }) {
  const blocks: { list: boolean; lines: string[] }[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const item = /^(?:[-*•]|\d+[.)])\s+(.*)$/.exec(line);
    const last = blocks.at(-1);
    if (item) {
      if (last?.list) last.lines.push(item[1]); else blocks.push({ list: true, lines: [item[1]] });
    } else blocks.push({ list: false, lines: [line] });
  }
  return <div className="space-y-2">{blocks.map((block, index) => block.list
    ? <ul key={index} className="space-y-1 pl-1">{block.lines.map((line, inner) => <li key={inner} className="flex gap-2"><span aria-hidden="true" className="mt-[7px] size-1.5 shrink-0 rounded-full bg-leaf" /><span><Inline text={line} /></span></li>)}</ul>
    : <p key={index}><Inline text={block.lines[0]} /></p>)}</div>;
}

export function ChatWidget({ language, content }: { language: Language; content: Copy['assistant'] }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('unknown');
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [siteKey, setSiteKey] = useState('');
  const humanCheck = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const speech = pagesCopy[language].speech;
  const recognition = useRef<Recognition | null>(null);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(false);

  function toggleMic() {
    if (!RecognitionClass) return;
    if (listening) { recognition.current?.stop(); return; }
    setMicError(false);
    const recogniser = new RecognitionClass();
    recogniser.lang = language === 'sw' ? 'sw-KE' : 'en-KE';
    recogniser.interimResults = true;
    recogniser.continuous = false;
    recogniser.onresult = event => setDraft(Array.from(event.results).map(result => result[0].transcript).join(' ').slice(0, 600));
    recogniser.onerror = () => setMicError(true);
    recogniser.onend = () => { setListening(false); input.current?.focus(); };
    recognition.current = recogniser;
    try { recogniser.start(); setListening(true); } catch { setMicError(true); }
  }

  useEffect(() => {
    try { window.sessionStorage.setItem(storageKey, JSON.stringify(messages)); } catch { /* storage unavailable */ }
    list.current?.scrollTo({ top: list.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    if (mode === 'unknown') {
      fetch('/api/chat', { headers: { accept: 'application/json' } })
        .then(result => result.ok ? result.json() : { ready: false })
        .then(result => { setMode(result.ready === true ? 'ai' : 'offline'); if (typeof result.siteKey === 'string') setSiteKey(result.siteKey); })
        .catch(() => setMode('offline'));
    }
    function onKey(event: KeyboardEvent) { if (event.key === 'Escape') close(); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = useRef<string | null>(null);
  useEffect(() => {
    function onAsk(event: Event) {
      const question = (event as CustomEvent<string>).detail;
      if (typeof question !== 'string') return;
      pending.current = question;
      setOpen(true);
    }
    window.addEventListener('cancercare:ask', onAsk);
    return () => window.removeEventListener('cancercare:ask', onAsk);
  }, []);

  useEffect(() => {
    if (open && pending.current && mode !== 'unknown') {
      const question = pending.current;
      pending.current = null;
      void ask(question);
    }
  }, [open, mode]); // eslint-disable-line react-hooks/exhaustive-deps

  function close() {
    setOpen(false);
    launcher.current?.focus();
  }

  async function ask(question: string) {
    const text = question.trim().slice(0, 600);
    if (!text || busy) return;
    const history: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(history);
    setDraft('');

    if (mode === 'offline' || isUrgent(text)) {
      setMessages([...history, offlineAnswer(text, language)]);
      return;
    }

    setBusy(true);
    try {
      const body = { language, messages: history.slice(-12).map(({ role, content }) => ({ role, content })) };
      const send = async (extra: Record<string, string | undefined>) => fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...body, ...extra }),
      });
      // Spam check: reuse the signed pass, or run Turnstile once when the server asks for it.
      let result = await send({ pass: savedPass() });
      if (result.status === 403 && siteKey && humanCheck.current) {
        try { window.sessionStorage.removeItem(passKey); } catch { /* storage unavailable */ }
        const turnstileToken = await getTurnstileToken(humanCheck.current, siteKey, language);
        result = await send({ turnstileToken });
      }
      const payload = await result.json().catch(() => ({}));
      if (typeof payload.pass === 'string') { try { window.sessionStorage.setItem(passKey, payload.pass); } catch { /* storage unavailable */ } }
      if (result.ok && typeof payload.reply === 'string') {
        setMessages([...history, { role: 'assistant', content: payload.reply, urgent: payload.urgent === true }]);
      } else {
        if (result.status === 503) setMode('offline');
        setMessages([...history, { ...offlineAnswer(text, language), note: result.status === 503 ? undefined : content.error }]);
      }
    } catch {
      setMessages([...history, { ...offlineAnswer(text, language), note: content.error }]);
    } finally {
      setBusy(false);
      input.current?.focus();
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void ask(draft);
  }

  return <>
    <button ref={launcher} type="button" onClick={() => open ? close() : setOpen(true)} aria-expanded={open} aria-controls="cancercare-chat" className={cn('chat-launcher fixed right-4 bottom-4 z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-forest px-4 text-[13px] font-bold text-white shadow-[0_14px_34px_#07533140] transition hover:bg-ink sm:right-6 sm:bottom-6 sm:px-5', open && 'max-sm:hidden')}>
      {open ? <X className="size-5" aria-hidden="true" /> : <MessageCircle className="size-5" aria-hidden="true" />}
      <span className={cn(open && 'sr-only')}>{open ? content.close : content.open}</span>
      {!open && <span aria-hidden="true" className="absolute -top-0.5 -right-0.5 size-3 animate-pulse rounded-full border-2 border-white bg-[#8fd19e]" />}
    </button>

    {open && <section id="cancercare-chat" role="dialog" aria-modal="false" aria-labelledby="chat-title" lang={language} className="chat-panel fixed inset-x-2 bottom-2 z-50 flex h-[min(620px,calc(100dvh-16px))] flex-col overflow-hidden rounded-[22px] border border-line bg-white shadow-[0_24px_70px_#15352c38] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:h-[min(600px,calc(100dvh-120px))] sm:w-[390px]">
      <header className="flex items-start gap-3 bg-forest px-4 py-3.5 text-white">
        <span aria-hidden="true" className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-white/15"><Sparkles className="size-5" /></span>
        <div className="min-w-0 flex-1">
          <h2 id="chat-title" className="text-[15px] font-bold tracking-[-.02em]">{content.title}</h2>
          <p className="text-[11px] text-white/80">{content.subtitle}{mode === 'offline' && <> · {content.offline}</>}</p>
        </div>
        <button type="button" onClick={() => setMessages([])} aria-label={content.restart} title={content.restart} className="grid size-8 place-items-center rounded-full hover:bg-white/15"><RotateCcw className="size-4" aria-hidden="true" /></button>
        <button type="button" onClick={close} aria-label={content.close} title={content.close} className="grid size-8 place-items-center rounded-full hover:bg-white/15"><X className="size-5" aria-hidden="true" /></button>
      </header>

      <div ref={list} aria-live="polite" className="flex-1 space-y-3 overflow-y-auto bg-[#f6faf5] px-4 py-4">
        <div className="max-w-[88%] rounded-[16px] rounded-tl-[5px] bg-white px-3.5 py-2.5 text-[13px] leading-[1.55] text-ink ring-1 ring-line">{content.greeting}</div>
        <p className="mx-auto max-w-[95%] rounded-[12px] bg-mist px-3 py-2 text-center text-[11px] leading-[1.45] text-copy">{content.notice}</p>

        {messages.map((message, index) => message.role === 'user'
          ? <div key={index} className="ml-auto w-fit max-w-[85%] rounded-[16px] rounded-tr-[5px] bg-forest px-3.5 py-2.5 text-[13px] leading-[1.5] whitespace-pre-wrap text-white">{message.content}</div>
          : <div key={index} className={cn('max-w-[90%] rounded-[16px] rounded-tl-[5px] px-3.5 py-2.5 text-[13px] leading-[1.55] ring-1', message.urgent ? 'bg-[#fff1ee] text-[#7a1d0f] ring-[#f1b8ac]' : 'bg-white text-ink ring-line')}>
            {message.note && <p className="mb-1.5 text-[11px] text-copy italic">{message.note}</p>}
            <RichText text={message.content} />
            {message.urgent && <span className="mt-2.5 flex gap-2">{['999', '112'].map(number => <a key={number} href={`tel:${number}`} className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-[#b3261e] px-3.5 text-[12px] font-bold text-white"><Phone className="size-3.5" aria-hidden="true" />{number}</a>)}</span>}
            {message.suggest && <span className="mt-2.5 flex flex-wrap gap-1.5">{content.suggestions.map(suggestion => <button key={suggestion} type="button" onClick={() => void ask(suggestion)} className="rounded-full border border-forest/30 bg-white px-2.5 py-1 text-left text-[11px] font-semibold text-forest hover:bg-mist">{suggestion}</button>)}</span>}
            <ReadAloudButton text={message.content} language={language} labels={speech} className="mt-2.5 mr-2" />
            {message.link && <a href={message.link.href} {...(message.link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[12px] font-bold text-forest hover:bg-line">{message.link.label}<ArrowRight className="size-3.5" aria-hidden="true" /></a>}
          </div>)}

        {busy && <div className="flex w-fit items-center gap-1 rounded-[16px] bg-white px-4 py-3 ring-1 ring-line" aria-label={content.thinking}>{[0, 1, 2].map(dot => <span key={dot} className="size-1.5 animate-bounce rounded-full bg-leaf" style={{ animationDelay: `${dot * 120}ms` }} />)}</div>}

        {messages.length === 0 && <div className="flex flex-wrap gap-2 pt-1">
          {content.suggestions.map(suggestion => <button key={suggestion} type="button" onClick={() => void ask(suggestion)} className="rounded-full border border-forest/30 bg-white px-3 py-1.5 text-left text-[12px] font-semibold text-forest transition hover:border-forest hover:bg-mist">{suggestion}</button>)}
        </div>}
      </div>

      <form onSubmit={submit} className="border-t border-line bg-white p-3">
        <div ref={humanCheck} className="mb-2 flex justify-center empty:hidden" />
        <div className="flex items-center gap-2">
          <label htmlFor="chat-input" className="sr-only">{content.placeholder}</label>
          {RecognitionClass && <button type="button" onClick={toggleMic} aria-pressed={listening} aria-label={listening ? speech.listening : speech.speakQuestion} title={listening ? speech.listening : speech.speakQuestion} className={cn('grid size-11 shrink-0 place-items-center rounded-full border transition', listening ? 'animate-pulse border-[#b3261e] bg-[#fff1ee] text-[#b3261e]' : 'border-line bg-white text-forest hover:bg-mist')}>{listening ? <MicOff className="size-4" aria-hidden="true" /> : <Mic className="size-4" aria-hidden="true" />}</button>}
          <input ref={input} id="chat-input" value={draft} onChange={event => setDraft(event.target.value)} maxLength={600} autoComplete="off" placeholder={listening ? speech.listening : content.placeholder} className="min-h-11 flex-1 rounded-full border border-input bg-sand px-4 text-[14px] outline-none focus:border-forest focus:ring-2 focus:ring-forest/20" />
          <button type="submit" disabled={!draft.trim() || busy} aria-label={content.send} className="grid size-11 shrink-0 place-items-center rounded-full bg-forest text-white transition hover:bg-ink disabled:opacity-40"><Send className="size-4" aria-hidden="true" /></button>
        </div>
        {listening && <p role="status" className="mt-2 text-center text-[11px] font-semibold text-[#b3261e]">{speech.listening}</p>}
        {micError && !listening && <p role="status" className="mt-2 text-center text-[11px] text-copy">{speech.micError}</p>}
        <a href="/get-involved/" className="mt-2 block text-center text-[11px] font-semibold text-forest underline underline-offset-2">{content.human}</a>
      </form>
    </section>}
  </>;
}
