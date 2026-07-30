'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Custom cursor: a small dot + a lagging ring that grows over interactive
 * elements. Only mounts on fine-pointer devices and when motion is allowed.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add('has-custom-cursor');

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHidden(false);
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [role="button"], input, textarea, [data-cursor="hover"]'));
    };
    const leave = () => setHidden(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden style={{ opacity: hidden ? 0 : 1 }}>
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute rounded-full border border-fg/40"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovering ? 56 : 34, height: hovering ? 56 : 34, opacity: hovering ? 1 : 0.5 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </div>
  );
}
