import { launchPages } from './launch';
export interface Faq {
  q: string;
  a: string;
}
export const faqs: Faq[] = launchPages
  .find((p) => p.path === '/support')!
  .faq.map((f) => ({ q: f.question, a: f.answer }));
