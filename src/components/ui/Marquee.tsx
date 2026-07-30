import { cn } from '@/lib/utils';

/** Infinite horizontal marquee (pauses on hover, respects reduced motion via CSS). */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className={cn('group relative flex overflow-hidden', className)} aria-hidden>
      <div className="flex min-w-full shrink-0 animate-marquee items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {doubled.map((item, i) => (
          <span key={i} className="whitespace-nowrap text-2xl font-medium text-faint md:text-4xl">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
