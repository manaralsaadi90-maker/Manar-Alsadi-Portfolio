# Manar Alsaadi — Portfolio

A premium, dark-mode personal portfolio built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion and Lenis smooth scrolling. Content is fully separated from code via typed JSON + MDX, so you can update the site without touching a single component.

## Tech stack

- **Next.js 14** (App Router, React Server Components, static generation)
- **TypeScript** (strict) + **Zod** for content validation
- **Tailwind CSS** with a token-driven design system
- **Framer Motion** for animation, **Lenis** for smooth scroll
- **MDX** case studies via `next-mdx-remote`
- **lucide-react** icons

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # eslint
npm run type-check   # tsc --noEmit
```

## Project structure

```
public/
  images/            profile, projects, photography, recommendations, certifications, og
  documents/         your CV (PDF)
src/
  app/               routes: home, /projects/[slug], sitemap, robots, icons
  components/
    animations/      Reveal, Parallax, Magnetic, Counter, ScrollProgress
    layout/          Navbar, Footer, SmoothScroll
    sections/        Hero, About, Experience, Projects, Skills, Photography, …
    ui/              Button, Cursor, Lightbox, ProjectCard, SectionHeading, …
    mdx/             MDX component overrides for case studies
  content/
    data/            *.json — the editable content (see ADMIN-GUIDE.md)
    case-studies/    *.mdx — one long-form case study per project
  lib/               content loader, schemas, site config, seo, utils
  styles/            globals.css (design tokens live here)
```

## Updating content

Everything you'll routinely change lives in `src/content/` and `public/`.
See **ADMIN-GUIDE.md** for step-by-step instructions.

## Deployment

See **ADMIN-GUIDE.md → Deploy**. One-click on Vercel is recommended.

---

Built to be fast, accessible (keyboard + reduced-motion + semantic HTML) and SEO-complete (metadata, Open Graph, Twitter cards, JSON-LD, sitemap, robots).
