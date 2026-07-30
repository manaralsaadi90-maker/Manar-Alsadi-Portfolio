'use client';

/**
 * Scroll provider. We use the browser's native scrolling (fast, works with
 * the mouse wheel and trackpad everywhere). Smooth anchor jumps are handled
 * by `scroll-behavior: smooth` in globals.css.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
