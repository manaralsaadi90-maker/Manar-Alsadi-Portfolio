'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { experience } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/** Experience, an animated vertical timeline with a scroll-linked progress line. */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 70%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="experience" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've made an impact."
          lead="A 14-year track record from front-line roles to product management, always connecting work to measurable outcomes."
        />

        <div ref={ref} className="relative mt-16 pl-8 md:pl-0">
          {/* Center line (desktop) / left line (mobile) */}
          <div className="absolute left-1 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-2" style={{ scaleY }} />
          </div>

          <ol className="space-y-16">
            {experience.map((job, i) => {
              const left = i % 2 === 0;
              return (
                <li key={`${job.company}-${job.start}`} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <span
                    className="absolute -left-[30px] top-2 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg md:left-1/2 md:-translate-x-1/2"
                    aria-hidden
                  />
                  <div className={left ? 'md:col-start-1' : 'md:col-start-2'}>
                    <Reveal>
                      {/* Text is always left-aligned for readability, regardless of card side. */}
                      <div className="glass rounded-2xl p-6 text-left">
                        <p className="text-xs uppercase tracking-widest text-accent">
                          {formatDate(job.start)} to {job.end === 'Present' ? 'Present' : job.end ? formatDate(job.end) : 'Present'}
                        </p>
                        <h3 className="mt-2 font-display text-xl font-semibold">{job.role}</h3>
                        <p className="text-muted">{job.company}{job.location ? ` · ${job.location}` : ''}</p>
                        <p className="mt-3 text-sm text-muted">{job.summary}</p>
                        {job.achievements.length > 0 && (
                          <ul className="mt-4 space-y-2 text-sm text-faint">
                            {job.achievements.map((a) => (
                              <li key={a} className="flex gap-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {job.technologies.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {job.technologies.map((t) => (
                              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
