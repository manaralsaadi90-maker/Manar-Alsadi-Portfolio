'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { skills } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Fluent (C1)' },
  { name: 'Nederlands', level: 'Learning (A2-B1)' },
];

const goals = [
  'Grow a digital business & marketing career in the Netherlands',
  'Deepen UX research and product thinking',
  'Master data visualization and AI-assisted workflows',
  'Reach professional Dutch fluency',
];

/** Skills, animated proficiency cards, languages and career goals. */
export function Skills() {
  const reduce = useReducedMotion();
  return (
    <section id="skills" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Capabilities"
          title="A T-shaped skill set."
          lead="Broad across digital business, with real depth in marketing, UX and the tools that ship modern work."
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {skills.map((group, gi) => (
            <Reveal key={group.category} delay={gi * 0.05}>
              <div className="glass h-full rounded-3xl p-6">
                <h3 className="font-display text-lg font-semibold">{group.category}</h3>
                <ul className="mt-5 space-y-4">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-fg">{item.name}</span>
                        {typeof item.level === 'number' && (
                          <span className="text-faint">{item.level}%</span>
                        )}
                      </div>
                      {typeof item.level === 'number' && (
                        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
                            initial={{ width: reduce ? `${item.level}%` : 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">Languages</h3>
              <ul className="mt-5 space-y-3">
                {languages.map((l) => (
                  <li key={l.name} className="flex items-center justify-between border-b border-border/60 pb-3 last:border-0">
                    <span>{l.name}</span>
                    <span className="text-sm text-accent">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="glass h-full rounded-3xl p-6">
              <h3 className="font-display text-lg font-semibold">Career goals</h3>
              <ul className="mt-5 space-y-3">
                {goals.map((g) => (
                  <li key={g} className="flex gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {g}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
