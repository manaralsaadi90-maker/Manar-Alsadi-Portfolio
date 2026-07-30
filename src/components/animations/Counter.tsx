'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Animated number counter. Parses a value like "-34%", "4.8x", "160"
 * and animates the numeric portion when scrolled into view.
 */
export function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-20%' });

  const match = value.match(/-?\d+(\.\d+)?/);
  const number = match ? parseFloat(match[0]) : null;
  const prefix = match ? value.slice(0, match.index) : '';
  const suffix = match ? value.slice((match.index ?? 0) + match[0].length) : value;
  const decimals = match && match[0].includes('.') ? 1 : 0;

  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (number === null) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${prefix}${number.toFixed(decimals)}${suffix}`;
      return;
    }
    if (inView) mv.set(number);
    const unsub = spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
    });
    return () => unsub();
  }, [inView, number, reduce, mv, spring, prefix, suffix, decimals]);

  if (number === null) return <span className={className}>{value}</span>;
  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>;
}
