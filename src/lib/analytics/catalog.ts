import { routes } from '@/content/routes';

export const steps = [
  'documents',
  'tests',
  'runs',
  'review',
  'findings',
  'working-papers',
] as const;

export function canonicalPage(path: string) {
  return routes.some((route) => route.path === path && route.indexable) ? path : null;
}
