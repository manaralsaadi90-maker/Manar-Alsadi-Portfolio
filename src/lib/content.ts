import { z } from 'zod';
import {
  socialSchema, skillGroupSchema, experienceSchema, educationSchema,
  projectSchema, photoSchema, recommendationSchema, certificationSchema, valueSchema,
} from './schemas';

import socialsJson from '@/content/data/socials.json';
import skillsJson from '@/content/data/skills.json';
import experienceJson from '@/content/data/experience.json';
import educationJson from '@/content/data/education.json';
import projectsJson from '@/content/data/projects.json';
import photosJson from '@/content/data/photos.json';
import recommendationsJson from '@/content/data/recommendations.json';
import certificationsJson from '@/content/data/certifications.json';
import valuesJson from '@/content/data/values.json';

/** Parse helper: validates JSON against a schema and throws a readable error. */
function parse<T extends z.ZodTypeAny>(schema: T, data: unknown, name: string): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in ${name}.json:\n${result.error.toString()}`);
  }
  return result.data;
}

export const socials = parse(z.array(socialSchema), socialsJson, 'socials');
export const skills = parse(z.array(skillGroupSchema), skillsJson, 'skills');
export const experience = parse(z.array(experienceSchema), experienceJson, 'experience');
export const education = parse(z.array(educationSchema), educationJson, 'education');
export const projects = parse(z.array(projectSchema), projectsJson, 'projects');
export const photos = parse(z.array(photoSchema), photosJson, 'photos');
export const recommendations = parse(z.array(recommendationSchema), recommendationsJson, 'recommendations');
export const certifications = parse(z.array(certificationSchema), certificationsJson, 'certifications');
export const values = parse(z.array(valueSchema), valuesJson, 'values');

/** Case-study projects that live on the homepage grid. */
export const workProjects = projects.filter((p) => p.group === 'work');
export const universityProjects = projects.filter((p) => p.group === 'university');
export const personalProjects = projects.filter((p) => p.group === 'personal');
export const featuredProjects = projects.filter((p) => !p.academic);
export const academicProjects = projects.filter((p) => p.academic);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
