import { z } from 'zod';

const common = {
  fullName: z
    .string()
    .trim()
    .min(2, 'Enter at least 2 characters')
    .max(100, 'Keep this under 100 characters')
    .regex(/^[\p{L}\s'\-\.]+$/u, 'Use letters, spaces, hyphens and apostrophes only'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, 'Enter your email')
    .email('Enter a valid email address')
    .max(254, 'Keep this under 254 characters'),
  _hp: z.string().max(0).optional(),
};

export const demoSchema = z.object({
  ...common,
  companyName: z
    .string()
    .trim()
    .min(2, 'Enter at least 2 characters')
    .max(200, 'Keep this under 200 characters'),
  auditCount: z.enum(['1-10', '10-50', '50-100', '100+'], {
    errorMap: () => ({ message: 'Select a range' }),
  }),
});
export const supportSchema = z.object({
  ...common,
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little more — at least 10 characters')
    .max(5000, 'Keep this under 5000 characters'),
});
export type DemoInput = z.infer<typeof demoSchema>;
export type SupportInput = z.infer<typeof supportSchema>;
