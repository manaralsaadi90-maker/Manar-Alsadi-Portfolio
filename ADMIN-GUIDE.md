# Admin Guide — updating your portfolio without touching code

Everything you'll routinely change lives in two places:

- **`src/content/`** — the text/data (JSON + MDX)
- **`public/`** — the images and your CV

After any change: if running locally, the dev server (`npm run dev`) refreshes automatically. If the site is deployed on Vercel/Netlify, push to GitHub and it rebuilds itself.

> Tip: JSON files must stay valid. Keep the quotes and commas exactly as shown. If a build fails, it will tell you which file and field is wrong (the content is validated automatically).

---

## 1. Add or edit a project

1. Open `src/content/data/projects.json`.
2. Copy an existing `{ … }` block and edit the fields:
   - `slug` — URL-safe id, e.g. `"my-new-project"` (must be unique).
   - `title`, `category`, `year`, `role`, `summary`.
   - `cover` — path to the hero image (see step 4 for adding images).
   - `featured` — `true` shows it in the main "Selected Work" grid.
   - `academic` — `true` shows it under "University Work" instead.
   - `tags`, `tools`, `metrics`, `gallery`, `links`.
3. Create the case study: add a file `src/content/case-studies/my-new-project.mdx`
   (filename **must** match the `slug`). Copy an existing `.mdx` file as a template — it already contains every section: Overview, Problem, Research, Competitor Analysis, Persona, Journey Map, UX Decisions, Wireframes, Design, Marketing Strategy, Development, Challenges, Solutions, Results, Lessons Learned, Technologies.
4. Inside the MDX you can use:
   - `## Heading` for sections, normal markdown for text/lists.
   - `<Callout>…</Callout>` for a highlighted note.
   - `<Figure src="/images/projects/x.jpg" caption="…" />` for one image.
   - `<Gallery images={["/images/projects/a.jpg","/images/projects/b.jpg"]} />` for a grid.

The project page appears automatically at `/projects/my-new-project`.

## 2. Replace / add images

All images live under `public/images/`. Reference them in JSON **without** the `public` part (e.g. the file `public/images/projects/x.jpg` is written as `"/images/projects/x.jpg"`).

- **Projects:** `public/images/projects/`
- **Photography:** `public/images/photography/`
- **Recommendations:** `public/images/recommendations/`
- **Certifications:** `public/images/certifications/`

Use `.jpg`/`.webp`, keep files reasonably sized (long edge ~1600px). Next.js optimises them automatically.

## 3. Replace your profile picture

Drop your headshot at `public/images/profile.jpg` (portrait, ~900×1100) and `public/images/about-portrait.jpg` for the About section. Keep the same filenames and nothing else needs to change.

## 4. Update your CV

Replace `public/documents/Manar-Alsadi-CV.pdf` with your real CV, keeping the same filename. (To use a different filename, update `cvPath` in `src/lib/site.ts`.)

## 5. Add a LinkedIn recommendation

1. Screenshot the recommendation and save it to `public/images/recommendations/` (e.g. `recommendation-03.jpg`).
2. Add an entry to `src/content/data/recommendations.json`:
   ```json
   { "name": "Full Name", "position": "Their Role", "company": "Company",
     "image": "/images/recommendations/recommendation-03.jpg",
     "quote": "Optional pulled quote", "relationship": "Managed Manar directly" }
   ```
   Leave `"quote": ""` to show only the screenshot.

## 6. Add a certificate

1. Save the certificate image to `public/images/certifications/`.
2. Add an entry to `src/content/data/certifications.json` with `title`, `issuer`, `date` (`"YYYY-MM"`), `image`, and optional `credentialUrl`.

## 7. Credentials & degree documents (Nuffic)

The **Photography section has been removed.** In its place, the **Verified Credentials** section shows your redacted Nuffic (IDW) evaluation documents. To change them, edit the `docs` array at the top of `src/components/sections/Credentials.tsx` and place images in `public/images/credentials/`.

> Privacy: the published Nuffic images are redacted (date of birth + reference numbers blacked out). The original Syrian diplomas live in `public/images/credentials/` (mba-doc-*.jpg, ba-doc-*.jpg) but are **not shown publicly** — keep it that way, or redact before publishing.

## 8. Update experience, education, skills, values

- Experience → `src/content/data/experience.json`
- Education → `src/content/data/education.json`
- Skills (grouped, with 0–100 levels) → `src/content/data/skills.json`
- Values → `src/content/data/values.json`

## 9. Update LinkedIn / GitHub / email / social links

Edit `src/content/data/socials.json`. Email and location also live in `src/lib/site.ts`.

## 10. Change colours

Open `src/styles/globals.css` and edit the tokens under `:root` (values are **space-separated RGB channels**, e.g. `--accent: 122 162 255;`). Change `--accent` and `--accent-2` to re-skin the whole site. A ready-made light theme lives under `.light` — add `className="light"` to `<html>` in `src/app/layout.tsx` to use it.

## 11. Change typography

Fonts are loaded in `src/app/layout.tsx` (`Inter`, `Sora`, `JetBrains_Mono` from `next/font/google`). Swap the imports for other Google fonts and update `--font-sans` / `--font-display` accordingly.

## 12. The contact form

By default the form opens the visitor's email app pre-filled to you (works with zero setup). To receive submissions as data instead, create a free form endpoint (e.g. Formspree) and add to a `.env.local` file:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/your-id
```

## 13. Deploy

### GitHub
```bash
git init && git add -A && git commit -m "Portfolio"
# create a repo on github.com, then:
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

### Vercel (recommended)
1. Go to vercel.com → New Project → import your GitHub repo.
2. Framework preset auto-detects **Next.js**. No config needed.
3. Add an env var `NEXT_PUBLIC_SITE_URL` = your final domain (for correct SEO/sitemap). Add `NEXT_PUBLIC_FORM_ENDPOINT` if using a form service.
4. Deploy. Every future `git push` redeploys automatically.

### Netlify
1. netlify.com → Add new site → import from GitHub.
2. Build command `npm run build`, publish directory handled by the official Next.js runtime (Netlify detects it).
3. Set the same env vars as above.

Before going live, set `NEXT_PUBLIC_SITE_URL` and update the URLs in `src/content/data/socials.json` and `src/lib/site.ts` to your real profiles.
