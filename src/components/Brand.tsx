import { cn } from '@/lib/utils';

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[18px] font-bold min-[340px]:gap-2 min-[340px]:text-[20px] tracking-[-.055em] min-[400px]:gap-3 min-[400px]:text-[23px] sm:text-[27px]', light ? 'text-white' : 'text-forest')}>
      <span aria-hidden="true" className={cn('relative grid size-8 place-items-center min-[340px]:size-9 overflow-hidden rounded-full bg-forest min-[400px]:size-10 sm:size-11', light && 'bg-white')}>
        <svg viewBox="0 0 48 48" className={cn('size-7 fill-none stroke-white min-[400px]:size-8', light && 'stroke-forest')} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M24 7c-8 0-11 7-8 14 2 5 7 10 13 18" />
          <path d="M24 7c8 0 11 7 8 14-2 5-7 10-13 18" />
          <path d="M13 40c5-4 9-9 13-15" />
        </svg>
      </span>
      <span>CancerCare</span>
    </span>
  );
}
