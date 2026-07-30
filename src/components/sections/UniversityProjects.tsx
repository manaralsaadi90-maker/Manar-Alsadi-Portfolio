import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { universityProjects } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/** University Projects - Fontys coursework (some using real brands as case studies by choice). */
export function UniversityProjects() {
  if (universityProjects.length === 0) return null;
  return (
    <section id="university" className="section-pad border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="University Projects, Fontys"
          title="Learning, applied."
          lead="Course projects from my Digital Business studies at Fontys, spanning research, strategy, branding, UX and data. Where real brands appear, they were chosen as academic case studies (not affiliated)."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {universityProjects.map((p, i) => (
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
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-accent">{p.category}</p>
                  <h3 className="mt-1 flex items-center gap-1 font-display text-lg font-semibold">
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
