import { cn } from '@/lib/utils';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-3 whitespace-nowrap text-[23px] font-bold tracking-[-.055em] sm:text-[27px]', light ? 'text-white' : 'text-forest')}>
      <span aria-hidden="true" className={cn('relative grid size-10 place-items-center overflow-hidden rounded-full bg-forest sm:size-11', light && 'bg-white')}>
        <svg viewBox="0 0 48 48" className={cn('size-8 fill-none stroke-white', light && 'stroke-forest')} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 7c-8 0-11 7-8 14 2 5 7 10 13 18" />
          <path d="M24 7c8 0 11 7 8 14-2 5-7 10-13 18" />
          <path d="M13 40c5-4 9-9 13-15" />
        </svg>
      </span>
      <span>CancerCare</span>
    </span>
  );
}
