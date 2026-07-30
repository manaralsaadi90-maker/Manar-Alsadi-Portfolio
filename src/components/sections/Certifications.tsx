import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { certifications } from '@/lib/content';
import { formatDate } from '@/lib/utils';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/animations/Reveal';

/** Certifications, credential cards. Add entries in certifications.json. */
export function Certifications() {
  if (certifications.length === 0) return null;
  return (
    <section id="certifications" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications."
          lead="Formal proof of the skills behind the work."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <Reveal key={`${c.title}-${i}`} delay={i * 0.05}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40">
                {c.image && (
                  <div className="relative aspect-[10/7] overflow-hidden border-b border-border">
                    <Image
                      src={c.image}
                      alt={`${c.title} certificate`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.issuer}</p>
                  <p className="mt-1 text-xs text-faint">{formatDate(c.date)}</p>
                  {c.credentialUrl && (
                    <a
                      href={c.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-accent hover:underline"
                    >
                      View credential <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
