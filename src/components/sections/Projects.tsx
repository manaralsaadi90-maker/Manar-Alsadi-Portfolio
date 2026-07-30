import { workProjects } from '@/lib/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectCard } from '@/components/ui/ProjectCard';

/** Professional Work - real, paid work. Currently the Syriatel Cash flagship. */
export function Projects() {
  if (workProjects.length === 0) return null;
  return (
    <section id="projects" className="section-pad">
      <div className="container">
        <SectionHeading
          eyebrow="Professional Work"
          title="Real products, real impact."
          lead="Work I owned in a professional role, with the problem, the process and the outcome as a full case study."
        />
        <div className="mx-auto mt-16 max-w-3xl">
          {workProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
