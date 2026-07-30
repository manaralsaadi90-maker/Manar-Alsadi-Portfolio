'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

/** Sticky, glassy navigation that condenses on scroll. Mobile drawer included. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-3' : 'py-5',
      )}
    >
      <div className="container">
        <div
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2 transition-all duration-300 md:px-5',
            scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent',
          )}
        >
          <Link href="/" className="font-display text-lg font-semibold tracking-tight" aria-label="Home">
            Manar<span className="text-accent">.</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button href={site.cvPath} external size="sm" variant="secondary" magnetic>
              <Download className="h-4 w-4" /> CV
            </Button>
            <Button href="/#contact" size="sm" magnetic>
              Let&apos;s talk
            </Button>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 top-0 z-40 flex flex-col bg-bg/98 px-6 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-semibold"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-8 flex gap-3">
              <Button href={site.cvPath} external variant="secondary" onClick={() => setOpen(false)}>
                <Download className="h-4 w-4" /> Download CV
              </Button>
              <Button href="/#contact" onClick={() => setOpen(false)}>
                Let&apos;s talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
