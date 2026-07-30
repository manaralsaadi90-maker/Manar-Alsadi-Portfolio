'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Verified credentials, degree + Nuffic (IDW) recognition documents.
 * Images are stored in /public/images/credentials. Personal fields
 * should be redacted before publishing (see admin guide).
 * Add/remove documents by editing the `docs` array below.
 */
const docs = [
  { src: '/images/credentials/mba-doc-1.jpg', label: 'MBA, Nuffic (IDW) recognition, equivalent to a Dutch WO Master\'s' },
  { src: '/images/credentials/ba-doc-1.jpg', label: 'BA English Language & Literature, Nuffic (IDW) recognition' },
];

export function Credentials() {
  const [zoom, setZoom] = useState<string | null>(null);

  return (
    <section id="credentials" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Verified Credentials"
          title="Degrees, recognized in the Netherlands."
          lead="My MBA and Bachelor's are officially evaluated by Nuffic (IDW), the MBA as equivalent to a Dutch academic (WO) Master's in Business Administration."
        />

        <Reveal>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-muted">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Nuffic (IDW) evaluated · MBA grade: Very Good (83.39%)
          </div>
        </Reveal>

        <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
          {docs.map((doc, i) => (
            <Reveal key={doc.src} delay={i * 0.04}>
              <button
                onClick={() => setZoom(doc.src)}
                data-cursor="hover"
                className="group block w-full overflow-hidden rounded-2xl border border-border bg-surface/40"
                aria-label={`View document: ${doc.label}`}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={doc.src}
                    alt={doc.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="px-4 py-3 text-left text-sm text-muted">{doc.label}</p>
              </button>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-6 text-sm text-faint">
            Full certified copies and the original Syrian diplomas are available to employers on request.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoom(null)} role="dialog" aria-modal="true" aria-label="Credential document"
          >
            <button
              onClick={() => setZoom(null)} aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg hover:border-accent"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              className="relative max-h-[88vh] max-w-3xl overflow-auto rounded-xl"
              initial={{ scale: 0.96 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={zoom} alt="Credential document" className="h-auto w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
