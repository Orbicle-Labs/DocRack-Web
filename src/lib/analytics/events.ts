import { z } from 'zod';
import { routes } from '@/content/routes';

export const steps = [
  'documents',
  'tests',
  'runs',
  'review',
  'findings',
  'working-papers',
] as const;
const page = z
  .string()
  .refine((value) => routes.some((route) => route.path === value && route.indexable));
export const eventSchema = z.discriminatedUnion('name', [
  z
    .object({
      name: z.literal('demo_cta_click'),
      props: z
        .object({
          page,
          placement: z.enum(['header', 'main', 'footer']),
          ctaId: z.literal('book-demo'),
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('workflow_step_view'),
      props: z.object({ stepId: z.enum(steps) }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('source_open'),
      props: z
        .object({ demoId: z.literal('p2p'), sourceKind: z.enum(['invoice', 'order', 'rule']) })
        .strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('demo_form_start'),
      props: z.object({ page: z.literal('/book-demo') }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('demo_request_success'),
      props: z.object({ page: z.literal('/book-demo') }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('support_request_success'),
      props: z.object({ page: z.literal('/support') }).strict(),
    })
    .strict(),
  z
    .object({
      name: z.literal('form_error'),
      props: z
        .object({
          form: z.enum(['demo', 'support']),
          errorClass: z.enum(['validation', 'network', 'storage', 'rate-limit', 'request']),
        })
        .strict(),
    })
    .strict(),
]);
// sample_download deliberately absent: no approved genuine sample exists.
export type AnalyticsEvent = z.infer<typeof eventSchema>;
export type AnalyticsConfig = { enabled: boolean; domain?: string };
export function canonicalPage(path: string) {
  return routes.some((route) => route.path === path && route.indexable) ? path : null;
}
