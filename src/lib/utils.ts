import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date string (YYYY-MM or YYYY-MM-DD) into a readable label. */
export function formatDate(value: string) {
  const [y, m] = value.split('-');
  if (!m) return y;
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
}
