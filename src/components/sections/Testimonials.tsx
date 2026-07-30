'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Linkedin } from 'lucide-react';
import { recommendations } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Testimonials, LinkedIn recommendation cards. Each shows name/role/company
 * and the recommendation screenshot; click to view the full screenshot.
 * Add a new recommendation by dropping an image in /public/images/recommendations
 * and adding an entry to recommendations.json.
 */
export function Testimonials() {
  const [zoom, setZoom] = useState<string | null>(null);
  if (recommendations.length === 0) return null;

  return (
    <section id="testimonials" className="section-pad border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Recommendations"
          title="What colleagues say."
          lead="Real LinkedIn recommendations from people I've worked with."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((r, i) => (
            <Reveal key={`${r.name}-${i}`} delay={i * 0.05}>
              <figure className="glass flex h-full flex-col rounded-3xl p-6">
                <Linkedin className="h-6 w-6 text-accent" aria-hidden />
                {r.quote ? (
                  <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-fg">
                    “{r.quote}”
                  </blockquote>
                ) : (
                  <p className="mt-4 flex-1 text-sm text-muted">
                    Recommendation from {r.name}. Click to read the full note.
                  </p>
                )}

                <button
                  onClick={() => setZoom(r.image)}
                  data-cursor="hover"
                  className="group relative mt-5 aspect-[10/7] w-full overflow-hidden rounded-xl border border-border"
                  aria-label={`View full recommendation from ${r.name}`}
                >
                  <Image
                    src={r.image}
                    alt={`LinkedIn recommendation from ${r.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>

                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display font-semibold">{r.name}</p>
                  <p className="text-sm text-muted">{r.position} · {r.company}</p>
                  {r.relationship && <p className="mt-1 text-xs text-faint">{r.relationship}</p>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Recommendation screenshot"
          >
            <button
              onClick={() => setZoom(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg hover:border-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              className="relative max-h-[85vh] max-w-3xl overflow-auto rounded-xl"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={zoom} alt="LinkedIn recommendation full screenshot" className="h-auto w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
