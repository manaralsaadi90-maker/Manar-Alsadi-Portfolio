import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, ExternalLink, Github, Clock, User, Wrench, Download, PlayCircle } from 'lucide-react';
import { getProject, projects } from '@/lib/content';
import { getCaseStudySource, getCaseStudySlugs } from '@/lib/case-studies';
import { site } from '@/lib/site';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { Button } from '@/components/ui/Button';
import { Counter } from '@/components/animations/Counter';
import { Reveal, TextReveal } from '@/components/animations/Reveal';
import { Parallax } from '@/components/animations/Parallax';

export const dynamicParams = false;

export function generateStaticParams() {
  const withMdx = new Set(getCaseStudySlugs());
  return projects.filter((p) => withMdx.has(p.slug)).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.cover, width: 1600, height: 1000, alt: project.title }],
      type: 'article',
    },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary, images: [project.cover] },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  const source = getCaseStudySource(params.slug);
  if (!project || !source) notFound();

  const next = projects[(projects.findIndex((p) => p.slug === params.slug) + 1) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    about: project.category,
    author: { '@type': 'Person', name: site.name },
    dateCreated: project.year,
    keywords: project.tags.join(', '),
  };

  return (
    <article className="pb-24 pt-28 md:pt-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        <header className="mt-8 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.2em] text-accent">{project.category} · {project.year}</p>
          <h1 className="mt-4 font-display text-display-sm font-semibold md:text-display-md">
            <TextReveal text={project.title} />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl text-lg text-muted">{project.summary}</p>
          </Reveal>
        </header>

        <Reveal delay={0.15}>
          <div className="mt-10 grid gap-6 rounded-2xl border border-border bg-surface/40 p-6 sm:grid-cols-3">
            <Meta icon={<User className="h-4 w-4" />} label="Role" value={project.role} />
            <Meta icon={<Clock className="h-4 w-4" />} label="Year" value={project.year} />
            <Meta icon={<Wrench className="h-4 w-4" />} label="Tools" value={project.tools.join(', ')} />
          </div>
        </Reveal>

        {/* Links */}
        {(project.links.live || project.links.github || project.links.official || (project.links.extra?.length ?? 0) > 0) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.live && (
              <Button href={project.links.live} external variant="secondary" magnetic>
                <ExternalLink className="h-4 w-4" /> Visit live site
              </Button>
            )}
            {project.links.official && (
              <Button href={project.links.official} external variant="secondary" magnetic>
                <ExternalLink className="h-4 w-4" /> Official page
              </Button>
            )}
            {project.links.github && (
              <Button href={project.links.github} external variant="secondary" magnetic>
                <Github className="h-4 w-4" /> View code
              </Button>
            )}
            {project.links.extra?.map((l) => (
              <Button key={l.href} href={l.href} external variant="secondary" magnetic>
                <ExternalLink className="h-4 w-4" /> {l.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Hero image */}
      <div className="container mt-12">
        <Parallax speed={40}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border">
            <Image src={project.cover} alt={`${project.title} cover`} fill priority sizes="100vw" className="object-cover" />
          </div>
        </Parallax>
      </div>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div className="container mt-12">
          <div className="grid gap-6 rounded-3xl border border-border bg-surface/40 p-8 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <Counter value={m.value} className="font-display text-4xl font-semibold text-gradient md:text-5xl" />
                <p className="mt-2 text-sm text-faint">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Case-study body (MDX) */}
      <div className="container mt-4">
        <div className="mx-auto max-w-prose">
          <MDXRemote source={source.content} components={mdxComponents} />
        </div>
      </div>

      {/* Videos (inline YouTube) */}
      {project.videos.length > 0 && (
        <div className="container mt-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="flex items-center gap-2 font-display text-2xl font-semibold">
              <PlayCircle className="h-6 w-6 text-accent" /> Watch it in action
            </h2>
            <p className="mt-2 text-sm text-faint">
              These are AI-generated concept samples, so they are demonstrations of the idea rather than final production assets.
            </p>
            <div className={`mt-6 grid gap-6 ${project.videos.length > 1 ? 'sm:grid-cols-2' : ''}`}>
              {project.videos.map((v) => (
                <figure key={v.youtube}>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-border">
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src={`https://www.youtube-nocookie.com/embed/${v.youtube}`}
                      title={v.label}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-muted">{v.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <div className="container mt-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-semibold">Gallery</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={i * 0.05}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                    <Image src={src} alt={`${project.title} preview ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Downloads */}
      {project.downloads.length > 0 && (
        <div className="container mt-14">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-semibold">Documents</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {project.downloads.map((dl) => (
                <a
                  key={dl.file}
                  href={dl.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-3 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  <Download className="h-4 w-4" /> {dl.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tools & tags */}
      <div className="container mt-14">
        <div className="mx-auto flex max-w-prose flex-wrap gap-2 border-t border-border pt-8">
          {[...project.tools, ...project.tags].map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted">{t}</span>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div className="container mt-20">
        <Link
          href={next.links.caseStudy || `/projects/${next.slug}`}
          className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-border p-8 transition-colors hover:border-accent/60 md:flex-row md:items-center"
        >
          <div>
            <p className="text-sm uppercase tracking-widest text-faint">Next project</p>
            <p className="mt-2 font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-3xl">
              {next.title}
            </p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-fg text-bg transition-transform group-hover:translate-x-1">
            <ArrowLeft className="h-5 w-5 rotate-180" />
          </span>
        </Link>
      </div>
    </article>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-faint">{icon} {label}</p>
      <p className="mt-1 text-fg">{value}</p>
    </div>
  );
}
