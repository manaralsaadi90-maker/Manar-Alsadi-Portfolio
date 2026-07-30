import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { nav, site } from '@/lib/site';
import { socials } from '@/lib/content';
import { SocialIcons } from '@/components/ui/SocialIcons';
import { Reveal } from '@/components/animations/Reveal';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <div className="container py-16 md:py-20">
        <Reveal>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-md">
              <p className="font-display text-3xl font-semibold md:text-4xl">
                Let&apos;s build something worth remembering.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 inline-block text-lg text-accent underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            </div>
            <SocialIcons socials={socials} />
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. Designed &amp; built with intent.
          </p>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-fg">
                {item.label}
              </Link>
            ))}
          </nav>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
