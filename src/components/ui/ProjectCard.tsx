'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/schemas';

/** Reusable project card with image zoom, reveal on hover and metrics. */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = project.links.caseStudy || `/projects/${project.slug}`;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.08 }}
      className="group"
    >
      <Link href={href} className="block" data-cursor="hover" aria-label={`View case study: ${project.title}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border">
          <Image
            src={project.cover}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent opacity-80" />
          <div className="absolute right-5 top-5 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-fg text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
          <div className="absolute bottom-5 left-5 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((t) => (
              <span key={t} className="glass rounded-full px-3 py-1 text-xs text-fg">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">{project.category} · {project.year}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 max-w-xl text-muted">{project.summary}</p>
          </div>
        </div>

        {project.metrics.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-6 border-t border-border pt-4">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-xl font-semibold text-fg">{m.value}</p>
                <p className="text-xs text-faint">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
