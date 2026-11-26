import { ArrowRight, CircleCheck, CircleDashed, CircleX, Ear, Languages, Mail, ShieldCheck, UserRound, HeartHandshake } from 'lucide-react';
import type { Language } from '@/content';
import type { PagesCopy } from '@/content-pages';
import { organisation } from '@/data/organisation';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';
import { PageIntro } from './PageIntro';

const valueIcons = [Ear, ShieldCheck, Languages, HeartHandshake] as const;
const statusIcons = [CircleCheck, CircleDashed, CircleX] as const;

export function AboutPage({ content, language }: { content: PagesCopy['about']; language: Language }) {
  const registration = organisation.registration[language];
  const heading = 'text-[clamp(30px,3.2vw,46px)] leading-[1.08] font-bold tracking-[-.05em]';
  return <>
    <PageIntro eyebrow={content.eyebrow} title={content.title} description={content.description} backHome={content.backHome}>
      {(registration || organisation.founded) && <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[13px]">
        {registration && <div><dt className="font-bold text-forest">{content.registrationLabel}</dt><dd className="text-copy">{registration}</dd></div>}
        {organisation.founded && <div><dt className="font-bold text-forest">{content.foundedLabel}</dt><dd className="text-copy">{organisation.founded}</dd></div>}
      </dl>}
    </PageIntro>

    <section aria-labelledby="why-title" className="bg-white py-12 md:py-16">
      <div className={pageContainer}>
        <p className={cn(sectionKicker, 'mb-3')}>{content.whyKicker}</p>
        <h2 id="why-title" className={cn(heading, 'max-w-[720px]')}>{content.whyTitle}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">{content.why.map((item, index) => <li key={item.title} className="rounded-[20px] border border-line bg-[#f8faf6] p-6">
          <span className="text-[13px] font-extrabold text-leaf">0{index + 1}</span>
          <h3 className="mt-3 text-[19px] font-bold tracking-[-.03em]">{item.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.65] text-copy">{item.text}</p>
        </li>)}</ol>
      </div>
    </section>

    <section aria-labelledby="values-title" className="bg-[#f3f8f2] py-12 md:py-16">
      <div className={pageContainer}>
        <p className={cn(sectionKicker, 'mb-3')}>{content.valuesKicker}</p>
        <h2 id="values-title" className={heading}>{content.valuesTitle}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{content.values.map((value, index) => { const Icon = valueIcons[index % valueIcons.length]; return <li key={value.title} className="rounded-[20px] bg-white p-6 ring-1 ring-line">
          <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-forest text-white"><Icon className="size-5" /></span>
          <h3 className="mt-4 text-[17px] font-bold tracking-[-.02em]">{value.title}</h3>
          <p className="mt-2 text-[13px] leading-[1.6] text-copy">{value.text}</p>
        </li>; })}</ul>
      </div>
    </section>

    <section aria-labelledby="status-title" className="bg-white py-12 md:py-16">
      <div className={cn(pageContainer, 'grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14')}>
        <div>
          <p className={cn(sectionKicker, 'mb-3')}>{content.statusKicker}</p>
          <h2 id="status-title" className={heading}>{content.statusTitle}</h2>
        </div>
        <ul className="divide-y divide-line rounded-[20px] border border-line">{content.status.map((item, index) => { const Icon = statusIcons[index]; return <li key={item.label} className="flex gap-4 p-5">
          <Icon className={cn('mt-0.5 size-5 shrink-0', index === 0 ? 'text-forest' : index === 1 ? 'text-leaf' : 'text-copy')} aria-hidden="true" />
          <div><p className="text-[12px] font-extrabold tracking-[.08em] text-forest uppercase">{item.label}</p><p className="mt-1 text-[14px] leading-[1.6] text-ink">{item.text}</p></div>
        </li>; })}</ul>
      </div>
    </section>

    {organisation.team.length > 0 && <section aria-labelledby="team-title" className="bg-[#f3f8f2] py-12 md:py-16">
      <div className={pageContainer}>
        <p className={cn(sectionKicker, 'mb-3')}>{content.teamKicker}</p>
        <h2 id="team-title" className={heading}>{content.teamTitle}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{organisation.team.map(member => <li key={member.name} className="rounded-[20px] bg-white p-5 text-center ring-1 ring-line">
          {member.photo ? <img src={member.photo} alt="" className="mx-auto size-24 rounded-full object-cover" /> : <span aria-hidden="true" className="mx-auto grid size-24 place-items-center rounded-full bg-mist text-forest"><UserRound className="size-10" /></span>}
          <h3 className="mt-4 text-[16px] font-bold">{member.name}</h3>
          <p className="mt-1 text-[12px] text-copy">{member.role[language]}</p>
        </li>)}</ul>
      </div>
    </section>}

    <section aria-labelledby="join-title" className="bg-forest py-12 text-white md:py-14">
      <div className={cn(pageContainer, 'flex flex-wrap items-center justify-between gap-6')}>
        <div className="max-w-[640px]">
          <h2 id="join-title" className="text-[clamp(26px,2.8vw,38px)] leading-[1.1] font-bold tracking-[-.04em]">{content.joinTitle}</h2>
          <p className="mt-3 text-[14px] leading-[1.65] text-white/85">{content.joinText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/get-involved/" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-[13px] font-bold text-forest hover:bg-mist">{content.joinAction}<ArrowRight className="size-4" aria-hidden="true" /></a>
          <a href={`mailto:${organisation.contactEmail}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/60 px-5 text-[13px] font-bold text-white hover:bg-white/10"><Mail className="size-4" aria-hidden="true" />{content.contactLabel}</a>
        </div>
      </div>
    </section>
  </>;
}
