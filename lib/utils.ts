import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge resolves conflicts by class GROUP, and it infers groups from
 * Tailwind's default scale. Our custom `fontSize` keys (text-body-sm,
 * text-label, text-mono-xs …) are not in that scale, so out of the box it
 * files them under `text-color` — and then silently drops the actual colour
 * sitting beside them.
 *
 * That produced real bugs: the primary Button lost `text-white` next to
 * `text-body-sm`, and the danger Badge lost `text-danger-strong` next to
 * `text-mono-xs`, both failing contrast. Declaring the custom sizes here is
 * what keeps size and colour in separate groups.
 */
const FONT_SIZES = [
  'display',
  'h1',
  'h2',
  'h3',
  'h4',
  'lead',
  'body-lg',
  'body',
  'body-sm',
  'caption',
  'label',
  'mono-sm',
  'mono-xs',
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
    },
  },
});

/**
 * Merge Tailwind classes, letting later classes win over earlier ones.
 * Without twMerge, `cn('px-4', 'px-6')` emits both and the winner depends on
 * stylesheet order — which breaks the `className` override prop on every
 * primitive in components/ui.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
