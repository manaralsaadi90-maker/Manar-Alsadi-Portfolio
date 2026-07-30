import { z } from 'zod';

/*
  ─────────────────────────────────────────────────────────────
  CONTENT SCHEMAS
  These Zod schemas validate every JSON content file at build
  time. If you add a field to a JSON file, add it here too and
  the whole app stays type-safe. Loaders throw a clear error if
  content is malformed, no silent breakage in production.
  ─────────────────────────────────────────────────────────────
*/

export const socialSchema = z.object({
  label: z.string(),
  href: z.string(),
  icon: z.enum(['linkedin', 'github', 'mail', 'instagram', 'dribbble', 'behance', 'twitter']),
});

export const skillGroupSchema = z.object({
  category: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      level: z.number().min(0).max(100).optional(),
    }),
  ),
});

export const experienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  location: z.string().optional(),
  start: z.string(),
  end: z.string().optional(), // omit or "Present"
  summary: z.string(),
  achievements: z.array(z.string()).default([]),
  technologies: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  start: z.string(),
  end: z.string().optional(),
  summary: z.string().optional(),
});

export const projectMetricSchema = z.object({ label: z.string(), value: z.string() });

export const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  category: z.string(),
  year: z.string(),
  role: z.string(),
  summary: z.string(),
  cover: z.string(),
  thumbnail: z.string().optional(),
  group: z.enum(['work', 'university', 'personal']).default('university'),
  featured: z.boolean().default(false),
  academic: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  metrics: z.array(projectMetricSchema).default([]),
  gallery: z.array(z.string()).default([]),
  links: z
    .object({
      live: z.string().optional(),
      github: z.string().optional(),
      caseStudy: z.string().optional(),
      official: z.string().optional(),
      extra: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    })
    .default({}),
  downloads: z.array(z.object({ label: z.string(), file: z.string() })).default([]),
  videos: z.array(z.object({ label: z.string(), youtube: z.string() })).default([]),
});

export const photoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  category: z.string(),
  width: z.number(),
  height: z.number(),
});

export const recommendationSchema = z.object({
  name: z.string(),
  position: z.string(),
  company: z.string(),
  image: z.string(),
  quote: z.string().optional(),
  relationship: z.string().optional(),
});

export const certificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  image: z.string().optional(),
  credentialUrl: z.string().optional(),
});

export const valueSchema = z.object({ title: z.string(), description: z.string() });

export type Social = z.infer<typeof socialSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Photo = z.infer<typeof photoSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Value = z.infer<typeof valueSchema>;
