import { Github, Linkedin, Mail, Instagram, Dribbble, Twitter } from 'lucide-react';
import type { Social } from '@/lib/schemas';
import { Magnetic } from '@/components/animations/Magnetic';
import { cn } from '@/lib/utils';

const icons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
  instagram: Instagram,
  dribbble: Dribbble,
  behance: Dribbble,
  twitter: Twitter,
} as const;

export function SocialIcons({ socials, className }: { socials: Social[]; className?: string }) {
  return (
    <ul className={cn('flex items-center gap-2', className)}>
      {socials.map((s) => {
        const Icon = icons[s.icon] ?? Mail;
        const external = /^https?:/.test(s.href);
        return (
          <li key={s.label}>
            <Magnetic>
              <a
                href={s.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            </Magnetic>
          </li>
        );
      })}
    </ul>
  );
}
