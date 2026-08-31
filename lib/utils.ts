import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes, letting later classes win over earlier ones.
 * Without twMerge, `cn('px-4', 'px-6')` emits both and the winner depends on
 * stylesheet order — which breaks the `className` override prop on every
 * primitive in components/ui.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
