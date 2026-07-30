import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { UniversityProjects } from '@/components/sections/UniversityProjects';
import { SelfBuilt } from '@/components/sections/SelfBuilt';
import { Skills } from '@/components/sections/Skills';
import { Testimonials } from '@/components/sections/Testimonials';
import { Certifications } from '@/components/sections/Certifications';
import { Credentials } from '@/components/sections/Credentials';
import { Contact } from '@/components/sections/Contact';

/**
 * Homepage. Section order is a deliberate narrative:
 * hook -> story -> proof -> work -> skills -> social proof -> credentials -> act.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <UniversityProjects />
      <SelfBuilt />
      <Skills />
      <Testimonials />
      <Certifications />
      <Credentials />
      <Contact />
    </>
  );
}
