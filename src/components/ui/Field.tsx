import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Form controls for the two lead forms.
 *
 * Plain top labels, not the floating-label pattern the legacy forms used. A
 * floating label doubles as the placeholder, so the field's purpose disappears
 * the moment someone types — and it forces a 12px label, which is below the
 * size §8 sets for form text.
 *
 * The control edge is `line-interactive` (3.27:1), not `line` (1.63:1): an
 * input boundary is a control boundary and WCAG 1.4.11 wants 3:1 for it.
 */

const CONTROL_BASE = 'v2-field';

/** Invalid state is a border colour AND an inner ring — colour alone fails 1.4.1. */
function stateClasses(invalid?: boolean) {
  return invalid
    ? 'border-danger shadow-[inset_0_0_0_1px_var(--color-danger)]'
    : 'border-line-interactive';
}

export interface FieldProps {
  /** Must match the control's `id`. */
  htmlFor: string;
  label: string;
  error?: string;
  /** Persistent helper text. Rendered above the error, never replaced by it. */
  hint?: string;
  /** Appended to the label for genuinely optional fields. Required is the default. */
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Label + control + messages. The caller wires `aria-describedby` to
 * `${htmlFor}-hint` / `${htmlFor}-error`, which this renders with those ids.
 */
export function Field({
  htmlFor,
  label,
  error,
  hint,
  optional = false,
  children,
  className,
}: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="v2-field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>

      {hint && (
        <p id={`${htmlFor}-hint`} className="v2-field-hint">
          {hint}
        </p>
      )}

      {children}

      {/* role="alert" only once there is something to announce — an always-mounted
          live region fires on every keystroke that changes it. */}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="text-caption text-danger-strong">
          {error}
        </p>
      )}
    </div>
  );
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, 'h-11', stateClasses(invalid), className)}
      {...rest}
    />
  );
});

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, rows = 5, ...rest },
  ref
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(CONTROL_BASE, 'resize-y py-2.5', stateClasses(invalid), className)}
      {...rest}
    />
  );
});

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className, children, ...rest },
  ref
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(CONTROL_BASE, 'h-11 appearance-none pr-10', stateClasses(invalid), className)}
        {...rest}
      >
        {children}
      </select>
      {/* Inline SVG rather than a lucide import: this is decoration inside a
          control, and it must not pull an icon component into every form. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        fill="none"
      >
        <path
          d="m4 6 4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
});

/**
 * The honeypot. Rendered for bots, hidden from humans and from assistive tech.
 *
 * `display:none` is deliberate and matches the legacy markup — the server
 * silently 200s any submission that fills this, so the field must stay
 * genuinely invisible rather than merely off-screen.
 */
export const HoneypotInput = React.forwardRef<HTMLInputElement, InputProps>(
  function HoneypotInput(props, ref) {
    return (
      <input
        ref={ref}
        type="text"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...props}
      />
    );
  }
);
