import Image from 'next/image';
import { education, values } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

/** About - story, values, education timeline and a portrait. */
export function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="About"
          title="From Damascus to the Netherlands."
          lead="A career built across countries, languages and industries, driven by curiosity and resilience."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Portrait */}
          <div className="space-y-8">
            <Parallax speed={30}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
                <Image
                  src="/images/manar-portrait.jpg"
                  alt="Manar Alsadi"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover"
                />
              </div>
            </Parallax>
          </div>

          {/* Story + values + education */}
          <div className="space-y-12">
            <div className="space-y-5 text-lg leading-relaxed text-muted">
              <Reveal>
                <p>
                  My story doesn&apos;t fit a template. I studied English Literature at Damascus
                  University, finishing my degree through the Syrian war while starting my first job,
                  and that training in close reading and storytelling still shapes how I understand
                  people and explain ideas.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  Over eleven years at Syriatel, one of Syria&apos;s largest telecom operators, I grew
                  from the front line, customer calls and the sales floor, into a Product Management
                  Specialist, managing B2B products and telecom services for corporate clients, from
                  VPN lines to Bulk SMS, and spending two years on the{' '}
                  <strong className="text-fg">Syriatel Cash</strong> e-wallet. I earned an MBA along the
                  way and learned to turn customer insight and data into decisions leaders acted on.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  Then I chose to start again in the Netherlands, a country whose openness I admire.
                  Rather than wait, I enrolled at Fontys to sharpen my digital and UX skills,
                  completing my first year with high grades, and I bring that same adaptability to
                  everything I do.
                </p>
              </Reveal>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                What guides me
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {values.map((v, i) => (
                  <Reveal key={v.title} delay={i * 0.05}>
                    <div className="glass h-full rounded-2xl p-5">
                      <h4 className="font-display text-lg font-semibold">{v.title}</h4>
                      <p className="mt-2 text-sm text-muted">{v.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Education
              </h3>
              <ol className="relative border-l border-border pl-6">
                {education.map((e, i) => (
                  <Reveal as="li" key={e.degree} delay={i * 0.05} className="mb-8 last:mb-0">
                    <span className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border-2 border-accent bg-bg" aria-hidden />
                    <p className="text-xs uppercase tracking-widest text-faint">
                      {formatDate(e.start)} to {e.end === 'Present' ? 'Present' : e.end ? formatDate(e.end) : ''}
                    </p>
                    <h4 className="mt-1 font-display text-lg font-semibold">{e.degree}</h4>
                    <p className="text-sm text-muted">{e.institution}</p>
                    {e.summary && <p className="mt-1 text-sm text-faint">{e.summary}</p>}
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
