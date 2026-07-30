'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/animations/Reveal';

/**
 * Hero, the 5-second first impression. Animated headline, role + location,
 * dual CTAs, professional photo, ambient background and a scroll indicator.
 */
export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-36 md:pt-40"
    >
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -left-32 top-10 h-[36rem] w-[36rem] rounded-full bg-accent/20 blur-[120px]"
          animate={reduce ? {} : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-accent-2/20 blur-[120px]"
          animate={reduce ? {} : { x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-sm text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Open to opportunities in the Netherlands
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-6 font-display text-display-md font-semibold leading-[1.05]">
              I find the story{' '}
              <span className="text-gradient">in the numbers.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">{site.heroSubline}</p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-faint">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" /> {site.location}
              </span>
              <span className="h-4 w-px bg-border" aria-hidden />
              <span>Arabic · English · Nederlands (A2)</span>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/#contact" size="lg">
                Contact me
              </Button>
              <Button href={site.cvPath} external size="lg" variant="secondary">
                <Download className="h-4 w-4" /> Download CV
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Portrait */}
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/manar-hero.jpg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/10 to-transparent" />
            {/* Caption bar attached to the bottom of the photo */}
            <div className="glass absolute inset-x-4 bottom-4 rounded-2xl px-5 py-3">
              <p className="text-xs uppercase tracking-widest text-faint">Currently</p>
              <p className="text-sm font-medium">MBA-qualified · Digital Business @ Fontys</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="/#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
        animate={reduce ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
