import { ArrowUpRight, Check, MapPin, ShieldCheck } from 'lucide-react';
import type { Copy, Language } from '@/content';
import { publishedFacilities } from '@/data/facilities';
import { pageContainer, sectionKicker } from '@/lib/site-styles';
import { cn } from '@/lib/utils';

export function DirectorySection({ directory, language }: { directory: Copy['directory']; language: Language }) {
  return <section id="directory" aria-labelledby="directory-title" className="bg-white py-3 pb-10 md:py-5 md:pb-12">
    <div className={pageContainer}>
      <div className="grid gap-7 lg:grid-cols-[1fr_.88fr_.78fr] lg:gap-8">
        <div className="py-2">
          <p className={cn(sectionKicker, 'mb-3')}>{directory.kicker}</p>
          <h2 id="directory-title" className="max-w-[430px] text-[clamp(30px,3vw,44px)] leading-[1.08] font-bold tracking-[-.05em]">{directory.title}</h2>
          <p className="mt-3 max-w-[450px] text-[13px] leading-[1.65] text-copy">{directory.description}</p>
          <a href="https://nhfr.dha.go.ke/facilities" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-forest underline underline-offset-4">{directory.sourceLink}<ArrowUpRight className="size-3.5" aria-hidden="true" /></a>
        </div>
        {publishedFacilities.length === 0 ? <>
          <div className="rounded-[18px] bg-[#f2f5ee] p-6">
            <span aria-hidden="true" className="grid size-10 place-items-center rounded-full bg-forest text-white"><ShieldCheck className="size-6" /></span>
            <p className="mt-3 text-[10px] font-bold tracking-[.1em] text-leaf uppercase">{directory.status}</p>
            <h3 className="mt-1 text-[21px] font-bold tracking-[-.035em]">{directory.emptyTitle}</h3>
            <p className="mt-2 text-[12px] leading-[1.6] text-copy">{directory.emptyDescription}</p>
          </div>
          <div className="border-l border-leaf/40 py-2 pl-6">
            <h3 className="text-[11px] font-extrabold tracking-[.1em] text-forest uppercase">{directory.fieldsTitle}</h3>
            <ul className="mt-4 space-y-3">{directory.fields.map(field => <li key={field} className="flex items-start gap-2 text-[12px] leading-[1.45]"><Check className="size-4 shrink-0 text-forest" aria-hidden="true" />{field}</li>)}</ul>
          </div>
        </> : <ul className="grid gap-4 lg:col-span-2 lg:grid-cols-2">{publishedFacilities.map(facility => <li key={facility.id} className="rounded-[18px] border border-line bg-sand p-6">
          <h3 className="text-[21px] font-bold">{facility.name}</h3>
          <p className="mt-2 flex gap-2 text-[12px] text-copy"><MapPin className="size-4 shrink-0" aria-hidden="true" />{facility.location[language]}, {facility.subCounty}</p>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={directory.servicesLabel}>{facility.services.map(service => <li key={service.name.en} className="rounded-full bg-mist px-3 py-1 text-[11px] text-forest">{service.name[language]}</li>)}</ul>
          <p className="mt-4 text-[11px] font-bold tracking-[.08em] text-leaf uppercase">{directory.accessLabel}</p><p className="mt-1 text-[12px] leading-[1.5] text-copy">{facility.patientAccess[language]}</p>
          <p className="mt-4 border-t border-line pt-3 text-[11px] text-copy">{directory.verifiedLabel} {new Intl.DateTimeFormat(language === 'sw' ? 'sw-KE' : 'en-KE', { dateStyle: 'medium' }).format(new Date(`${facility.providerConfirmation.confirmedOn}T00:00:00`))}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-bold text-forest"><a href={facility.source.url} target="_blank" rel="noopener noreferrer" className="underline">{facility.source.label}</a><a href={facility.contact.href} className="underline">{facility.contact.label[language]}</a></div>
        </li>)}</ul>}
      </div>
    </div>
  </section>;
}
