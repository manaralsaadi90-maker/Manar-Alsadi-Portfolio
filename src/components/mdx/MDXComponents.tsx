import Image from 'next/image';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Reveal } from '@/components/animations/Reveal';

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <Reveal>
      <aside className="my-8 rounded-2xl border-l-2 border-accent bg-surface/50 p-5 text-fg">
        {children}
      </aside>
    </Reveal>
  );
}

function Figure({ src, caption }: { src: string; caption?: string }) {
  return (
    <Reveal>
      <figure className="my-10">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <Image src={src} alt={caption ?? ''} fill sizes="(max-width: 768px) 100vw, 800px" className="object-cover" />
        </div>
        {caption && <figcaption className="mt-3 text-center text-sm text-faint">{caption}</figcaption>}
      </figure>
    </Reveal>
  );
}

function Gallery({ images }: { images: string[] }) {
  return (
    <Reveal>
      <div className="my-10 grid gap-4 sm:grid-cols-2">
        {images.map((src, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" />
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export const mdxComponents: MDXRemoteProps['components'] = {
  h2: (props) => (
    <h2 className="mt-14 scroll-mt-28 font-display text-2xl font-semibold md:text-3xl" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 font-display text-xl font-semibold" {...props} />,
  p: (props) => <p className="mt-4 leading-relaxed text-muted" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-muted" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted" {...props} />,
  a: (props) => <a className="text-accent underline-offset-4 hover:underline" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  Callout,
  Figure,
  Gallery,
};
