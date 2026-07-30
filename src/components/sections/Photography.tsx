'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { photos } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Lightbox } from '@/components/ui/Lightbox';
import { cn } from '@/lib/utils';

/** Photography, filterable masonry gallery with a fullscreen lightbox. */
export function Photography() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(photos.map((p) => p.category)))],
    [],
  );
  const [active, setActive] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = active === 'All' ? photos : photos.filter((p) => p.category === active);

  return (
    <section id="photography" className="section-pad border-t border-border">
      <div className="container">
        <SectionHeading
          eyebrow="Through my lens"
          title="Photography."
          lead="An eye for composition and detail, the same instinct I bring to design and brand work."
        />

        {/* Category filter */}
        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Photo categories">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                'rounded-full border px-4 py-2 text-sm transition-colors',
                active === cat
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted hover:text-fg',
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry via CSS columns */}
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((photo) => {
            const realIndex = photos.indexOf(photo);
            return (
              <motion.button
                key={photo.src}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => setLightboxIndex(realIndex)}
                data-cursor="hover"
                className="group relative block w-full overflow-hidden rounded-2xl border border-border"
                aria-label={`Open photo: ${photo.alt}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-bg/0 transition-colors group-hover:bg-bg/20" />
                <span className="glass absolute bottom-3 left-3 rounded-full px-3 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.category}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Lightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
