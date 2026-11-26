import type { PagesCopy } from '@/content-pages';
import { pageContainer } from '@/lib/site-styles';
import { cn } from '@/lib/utils';
import { PageIntro } from './PageIntro';

function slug(text: string) {
  return text.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

export function PrivacyPage({ content }: { content: PagesCopy['privacy'] }) {
  const groups = [
    { id: 'privacy', title: content.privacyTitle, sections: content.privacy },
    { id: 'terms', title: content.termsTitle, sections: content.terms },
  ];
  return <>
    <PageIntro eyebrow={content.eyebrow} title={content.title} description={content.description} backHome={content.backHome}>
      <p className="mt-4 text-[12px] font-semibold text-forest">{content.updated}</p>
    </PageIntro>
    <section className="bg-white py-12 md:py-16">
      <div className={cn(pageContainer, 'grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16')}>
        <nav aria-label={content.contents} className="lg:sticky lg:top-6 lg:self-start">
          <p className="text-[11px] font-extrabold tracking-[.1em] text-leaf uppercase">{content.contents}</p>
          {groups.map(group => <div key={group.id} className="mt-4">
            <a href={`#${group.id}`} className="text-[14px] font-bold text-ink hover:text-forest">{group.title}</a>
            <ul className="mt-2 space-y-1.5 border-l border-line pl-3">{group.sections.map(section => <li key={section.title}><a href={`#${group.id}-${slug(section.title)}`} className="text-[12px] text-copy hover:text-forest hover:underline">{section.title}</a></li>)}</ul>
          </div>)}
        </nav>
        <div className="max-w-[760px] space-y-14">
          {groups.map(group => <article key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="scroll-mt-6">
            <h2 id={`${group.id}-title`} className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-.045em]">{group.title}</h2>
            {group.sections.map(section => <section key={section.title} id={`${group.id}-${slug(section.title)}`} className="mt-8 scroll-mt-6 border-t border-line pt-6">
              <h3 className="text-[18px] font-bold tracking-[-.02em]">{section.title}</h3>
              {section.body.map(paragraph => <p key={paragraph} className="mt-3 text-[14px] leading-[1.75] text-copy">{paragraph}</p>)}
            </section>)}
          </article>)}
          <p className="rounded-[14px] bg-mist p-4 text-[12px] leading-[1.6] text-copy">{content.reviewNote}</p>
        </div>
      </div>
    </section>
  </>;
}
