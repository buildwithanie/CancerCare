import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import type { Copy } from '@/content';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

const contactEmail = 'buildwithanie@gmail.com';
type PageCopy = Copy['getInvolvedPage'];
type TopicId = PageCopy['topics'][number]['id'];
type ServiceState = 'checking' | 'ready' | 'unavailable';

export function GetInvolvedPage({ content }: { content: PageCopy }) {
  const [service, setService] = useState<ServiceState>('checking');
  const [topic, setTopic] = useState<TopicId>('idea');
  const [replyEmail, setReplyEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [sendError, setSendError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [website, setWebsite] = useState('');
  const emailInput = useRef<HTMLInputElement>(null);
  const messageInput = useRef<HTMLTextAreaElement>(null);
  const requestId = useRef<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/contact', { signal: controller.signal, headers: { accept: 'application/json' } })
      .then(async result => result.ok ? result.json() : { ready: false })
      .then(result => { if (!controller.signal.aborted) setService(result.ready === true ? 'ready' : 'unavailable'); })
      .catch(() => { if (!controller.signal.aborted) setService('unavailable'); });
    return () => controller.abort();
  }, []);

  function draftChanged() {
    requestId.current = null;
    setSendError('');
  }

  function validateDraft() {
    const trimmedEmail = replyEmail.trim();
    const trimmedMessage = message.trim();
    const invalidEmail = Boolean(trimmedEmail) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    const invalidMessage = trimmedMessage.length < 10 || trimmedMessage.length > 800;
    setEmailError(invalidEmail ? content.replyEmailError : '');
    setMessageError(invalidMessage ? content.messageError : '');
    if (invalidEmail) emailInput.current?.focus();
    else if (invalidMessage) messageInput.current?.focus();
    return invalidEmail || invalidMessage ? null : { trimmedEmail, trimmedMessage };
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (service !== 'ready' || sending) return;
    const draft = validateDraft();
    if (!draft) return;

    requestId.current ??= crypto.randomUUID();
    setSending(true);
    setSendError('');
    try {
      const result = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          topic,
          replyEmail: draft.trimmedEmail,
          message: draft.trimmedMessage,
          website,
          requestId: requestId.current,
        }),
      });
      const payload = await result.json();
      if (result.status === 202 && payload.accepted === true && typeof payload.receipt === 'string') {
        setSent(true);
      } else {
        if (result.status === 503) setService('unavailable');
        setSendError(content.sendError);
      }
    } catch {
      setSendError(content.sendError);
    } finally {
      setSending(false);
    }
  }

  function startAnother() {
    setSent(false);
    setTopic('idea');
    setReplyEmail('');
    setMessage('');
    setWebsite('');
    setEmailError('');
    setMessageError('');
    setSendError('');
    requestId.current = null;
  }

  return <>
    <section className="overflow-hidden bg-[#eff6ee] py-10 md:py-14">
      <div className={pageContainer}>
        <a href="/" className="mb-8 inline-flex items-center gap-2 text-[12px] font-semibold text-forest hover:underline">
          <ArrowLeft className="size-4" aria-hidden="true" />{content.backHome}
        </a>
        <div className="grid items-center gap-9 lg:grid-cols-[.92fr_1.08fr] lg:gap-16">
          <div className="pb-2 lg:py-8">
            <p className={cn(sectionKicker, 'mb-5')}>{content.eyebrow}</p>
            <h1 className="max-w-[620px] text-[clamp(46px,5.1vw,74px)] font-bold leading-[1.02] tracking-[-.065em] text-ink">{content.title}</h1>
            <p className="mt-6 max-w-[540px] text-[16px] leading-[1.7] text-copy md:text-[18px]">{content.description}</p>
            <a href="#contact-form" className="mt-8 inline-flex min-h-11 items-center gap-3 rounded-full bg-forest px-6 text-[13px] font-bold text-white shadow-[0_10px_25px_#07533125] hover:bg-ink">
              {content.formTitle}<ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
          <figure className="relative overflow-hidden rounded-[28px] bg-[#cbdcc6] shadow-[0_22px_45px_#123b241c]">
            <img src="/cancer-care-mission.jpg" alt={content.imageAlt} className="aspect-[1.5] w-full object-cover" />
          </figure>
        </div>
      </div>
    </section>

    <section id="contact-form" aria-labelledby="contact-title" className="bg-[#fbfcf9] py-14 md:py-20">
      <div className={cn(pageContainer, 'grid items-start gap-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(300px,.7fr)] lg:gap-8')}>
        <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_18px_50px_#0d3f2510]">
          <div className="border-b border-line bg-[#f8fbf7] px-5 py-6 sm:px-8 sm:py-8">
            <p className={sectionKicker}>{content.formKicker}</p>
            <h2 id="contact-title" className="mt-3 text-[clamp(30px,3.4vw,42px)] font-bold leading-[1.1] tracking-[-.05em] text-ink">{content.formTitle}</h2>
            <p className="mt-2 max-w-[550px] text-[14px] leading-[1.65] text-copy">{content.formIntro}</p>
          </div>

          {sent ? <div role="status" className="flex min-h-[400px] flex-col items-start justify-center p-6 sm:p-9">
            <span className="grid size-16 place-items-center rounded-full bg-mist text-forest"><Check className="size-8" aria-hidden="true" /></span>
            <h3 className="mt-6 text-[clamp(28px,3vw,38px)] font-bold tracking-[-.05em] text-ink">{content.sentTitle}</h3>
            <p className="mt-3 max-w-[490px] text-[15px] leading-[1.65] text-copy">{content.sentText}</p>
            <button type="button" onClick={startAnother} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-forest px-5 text-[13px] font-bold text-forest hover:bg-mist">{content.anotherAction}<ArrowRight className="size-4" aria-hidden="true" /></button>
          </div> : <form onSubmit={sendMessage} noValidate className="p-5 sm:p-8">
            {service === 'unavailable' && <div role="status" className="mb-7 rounded-[14px] border border-[#d6e3d1] bg-[#f0f6ed] p-4">
              <p className="text-[13px] font-bold text-forest">{content.unavailableTitle}</p>
              <p className="mt-1 text-[12px] leading-[1.55] text-copy">{content.unavailableText}</p>
            </div>}
            <fieldset>
              <legend className="text-[14px] font-bold text-ink">{content.topicLegend}</legend>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {content.topics.map(item => <label key={item.id} className="cursor-pointer">
                  <input type="radio" name="topic" checked={topic === item.id} onChange={() => { setTopic(item.id); draftChanged(); }} className="peer sr-only" />
                  <span className="flex min-h-[102px] flex-col rounded-[14px] border border-line bg-white p-3.5 transition-colors hover:border-leaf peer-checked:border-forest peer-checked:bg-mist peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-forest">
                    <strong className="text-[13px] leading-[1.25] text-ink">{item.title}</strong>
                    <span className="mt-2 text-[11px] leading-[1.4] text-copy">{item.description}</span>
                  </span>
                </label>)}
              </div>
            </fieldset>

            <div className="mt-7">
              <label htmlFor="contact-reply-email" className="block text-[14px] font-bold text-ink">{content.replyEmailLabel}</label>
              <p id="contact-reply-hint" className="mt-1 text-[12px] leading-[1.5] text-copy">{content.replyEmailHint}</p>
              <input ref={emailInput} id="contact-reply-email" type="email" inputMode="email" autoComplete="email" value={replyEmail} maxLength={254} aria-invalid={Boolean(emailError)} aria-describedby={emailError ? 'contact-reply-hint contact-reply-error' : 'contact-reply-hint'} onChange={event => { setReplyEmail(event.target.value); setEmailError(''); draftChanged(); }} placeholder="name@example.com" className="mt-3 block min-h-12 w-full rounded-[12px] border border-[#bfd2c1] bg-white px-4 text-[14px] text-ink outline-none placeholder:text-[#748e7d] focus:border-forest focus:ring-3 focus:ring-forest/15 aria-invalid:border-red-600" />
              {emailError && <p id="contact-reply-error" role="alert" className="mt-2 text-[12px] font-semibold text-red-700">{emailError}</p>}
            </div>

            <div className="mt-7">
              <label htmlFor="contact-message" className="block text-[14px] font-bold text-ink">{content.messageLabel}</label>
              <p id="contact-message-hint" className="mt-1 text-[12px] leading-[1.5] text-copy">{content.messageHint}</p>
              <textarea ref={messageInput} id="contact-message" value={message} maxLength={800} rows={6} aria-invalid={Boolean(messageError)} aria-describedby={messageError ? 'contact-message-hint contact-message-error' : 'contact-message-hint'} onChange={event => { setMessage(event.target.value); setMessageError(''); draftChanged(); }} placeholder={content.messagePlaceholder} className="mt-3 block min-h-[170px] w-full resize-y rounded-[12px] border border-[#bfd2c1] bg-white p-4 text-[14px] leading-[1.6] text-ink outline-none placeholder:text-[#748e7d] focus:border-forest focus:ring-3 focus:ring-forest/15 aria-invalid:border-red-600" />
              <div className="mt-1.5 flex items-start justify-between gap-3">
                <span>{messageError && <span id="contact-message-error" role="alert" className="text-[12px] font-semibold text-red-700">{messageError}</span>}</span>
                <span className="shrink-0 text-[11px] text-copy">{message.length}/800 {content.charactersLabel}</span>
              </div>
            </div>

            <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
            {sendError && <p role="alert" className="mt-5 rounded-[12px] bg-red-50 p-3 text-[12px] font-semibold text-red-700">{sendError}</p>}
            <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-line pt-6">
              <button type="submit" disabled={service !== 'ready' || sending} className="inline-flex min-h-12 items-center gap-3 rounded-full bg-forest px-6 text-[13px] font-bold text-white shadow-[0_8px_20px_#07533125] hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50">
                <Send className="size-4" aria-hidden="true" />{sending ? content.sendingLabel : content.sendAction}<ArrowRight className="size-4" aria-hidden="true" />
              </button>
              {service === 'checking' && <span role="status" className="text-[12px] text-copy">{content.checkingLabel}</span>}
              {service === 'unavailable' && <span role="status" className="text-[12px] text-copy">{content.unavailableTitle}</span>}
            </div>
          </form>}
        </div>

        <aside className="overflow-hidden rounded-[28px] bg-[#104936] text-white lg:sticky lg:top-6">
          <div className="relative overflow-hidden px-6 pb-7 pt-7 sm:px-8 sm:pt-8">
            <div aria-hidden="true" className="absolute -right-20 -top-20 size-56 rounded-full border-[30px] border-white/10" />
            <span className="relative grid size-12 place-items-center rounded-full bg-white/13"><MessageCircle className="size-6" aria-hidden="true" /></span>
            <h2 className="relative mt-6 max-w-[280px] text-[clamp(26px,3vw,35px)] font-bold leading-[1.08] tracking-[-.045em]">{content.sideTitle}</h2>
            <div className="relative mt-6 border-t border-white/20 pt-5">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#c4e7cf]">{content.directEmailAction}</p>
              <a href={`mailto:${contactEmail}`} className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-[14px] font-semibold text-white underline underline-offset-4 hover:text-[#d5efd9]"><Mail className="size-4 shrink-0" aria-hidden="true" />{contactEmail}</a>
            </div>
          </div>
          <div className="bg-[#0c3d2f] px-6 py-6 sm:px-8">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#b4dfbd]" aria-hidden="true" />
              <div><h3 className="text-[14px] font-bold">{content.safetyTitle}</h3><p className="mt-2 text-[12px] leading-[1.65] text-[#d5e6d9]">{content.safetyText}</p></div>
            </div>
            <p className="mt-6 border-t border-white/15 pt-5 text-[11px] leading-[1.65] text-[#d5e6d9]">{content.privacyText}</p>
          </div>
        </aside>
      </div>
    </section>
  </>;
}
