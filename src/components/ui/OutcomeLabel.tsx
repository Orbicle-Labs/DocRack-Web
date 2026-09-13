import { Check, X, FileQuestion, UserRound, Minus, TriangleAlert } from 'lucide-react';

export const outcomeNames = [
  'Pass',
  'Fail',
  'Insufficient evidence',
  'Needs human review',
  'Not applicable',
  'Processing error',
] as const;
export type Outcome = (typeof outcomeNames)[number];
const icons = [Check, X, FileQuestion, UserRound, Minus, TriangleAlert];
export function OutcomeLabel({ outcome }: { outcome: Outcome }) {
  const index = outcomeNames.indexOf(outcome);
  const Icon = icons[index];
  return (
    <span className={`outcome outcome-${index}`}>
      <Icon size={16} aria-hidden="true" />
      {outcome}
    </span>
  );
}
