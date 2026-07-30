'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Magnetic } from '@/components/animations/Magnetic';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 focus-visible:outline-accent disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-bg hover:bg-accent hover:text-bg',
  secondary: 'border border-border bg-surface/60 text-fg hover:border-accent hover:text-accent',
  ghost: 'text-fg hover:text-accent',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AnchorProps = CommonProps & { href: string; external?: boolean };

/** Polymorphic button: renders <button>, internal <Link>, or external <a>. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps | AnchorProps>(function Button(props, ref) {
  const { variant = 'primary', size = 'md', magnetic = false, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  let node: React.ReactNode;

  if ('href' in props && props.href) {
    const { href, external } = props;
    const isExternal = external ?? /^https?:|^mailto:/.test(href);
    node = isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  } else {
    const { variant: _v, size: _s, magnetic: _m, className: _c, children: _ch, ...rest } =
      props as ButtonProps;
    node = (
      <button ref={ref} className={classes} {...rest}>
        {children}
      </button>
    );
  }

  return magnetic ? <Magnetic>{node}</Magnetic> : <>{node}</>;
});
