import { Reveal, TextReveal } from '@/components/animations/Reveal';
import { cn } from '@/lib/utils';

/** Consistent eyebrow + title + optional lead used across all sections. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal>
          <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-8 bg-accent" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <h2 className="text-display-sm font-display font-semibold md:text-display-md">
        <TextReveal text={title} />
      </h2>
      {lead && (
        <Reveal delay={0.1}>
          <p className={cn('mt-5 text-lg text-muted', align === 'center' && 'mx-auto')}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
