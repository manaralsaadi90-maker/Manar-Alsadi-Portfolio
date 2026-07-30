import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { personalProjects } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/** Self-Built Projects - things Manar built for himself (tutors, Dutch trainer, this site). */
export function SelfBuilt() {
  if (personalProjects.length === 0) return null;
  return (
    <section id="self-built" className="section-pad border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Self-Built Projects"
          title="Made on my own initiative."
          lead="Tools and sites I designed and built for myself, from study apps to my Dutch vocabulary trainer and this very portfolio."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {personalProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={p.links.caseStudy || `/projects/${p.slug}`}
                data-cursor="hover"
                className="group block overflow-hidden rounded-2xl border border-border bg-surface/40 transition-colors hover:border-accent/60"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={`${p.title} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">{p.category}</p>
                  <h3 className="mt-1 flex items-center gap-1 font-display text-base font-semibold">
                    {p.title}
                    <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
