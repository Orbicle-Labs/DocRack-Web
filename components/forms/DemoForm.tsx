'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Field, HoneypotInput, Input, Select } from '@/components/ui';
import { submitForm } from '@/lib/forms';

/**
 * The client schema now mirrors app/api/demo-booking/route.ts exactly — same
 * regex, same lengths, same enum. It used to be looser, so a name with a digit
 * in it passed here and came back a 422 rendered as a generic toast with no
 * indication of which field was wrong.
 *
 * The wire contract is unchanged: same endpoint, same five field names, same
 * enum values. `auditCount` in particular must stay these four strings — the
 * server uses z.enum and anything else is a 422.
 */
const demoSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Enter at least 2 characters')
    .max(100, 'Keep this under 100 characters')
    .regex(/^[\p{L}\s'\-\.]+$/u, 'Use letters, spaces, hyphens and apostrophes only'),
  email: z
    .string()
    .min(1, 'Enter your work email')
    .email('Enter a valid email address')
    .max(254, 'Keep this under 254 characters'),
  companyName: z
    .string()
    .min(2, 'Enter at least 2 characters')
    .max(200, 'Keep this under 200 characters'),
  auditCount: z.enum(['1-10', '10-50', '50-100', '100+'], {
    errorMap: () => ({ message: 'Select a range' }),
  }),
  _hp: z.string().max(0).optional(),
});

type DemoInput = z.infer<typeof demoSchema>;

/**
 * Labels only. The values are the server's enum and cannot change without a
 * server edit; the brackets they describe can. `1-10` and `10-50` both contain
 * 10 on the wire, so the labels resolve the overlap for the reader.
 */
const AUDIT_RANGES: { value: DemoInput['auditCount']; label: string }[] = [
  { value: '1-10', label: 'Up to 10 audits a year' },
  { value: '10-50', label: '11 – 50 audits a year' },
  { value: '50-100', label: '51 – 100 audits a year' },
  { value: '100+', label: 'More than 100 audits a year' },
];

/** Fields the server can name in a 422. Anything else becomes a form-level error. */
const MAPPABLE = new Set(['fullName', 'email', 'companyName', 'auditCount']);

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    // Errors appear on blur, then correct live. Validating on every keystroke
    // from the first character tells someone their email is invalid while
    // they are still typing it.
    mode: 'onTouched',
    defaultValues: { fullName: '', email: '', companyName: '', _hp: '' },
  });

  async function onSubmit(data: DemoInput) {
    // Client honeypot: a filled hidden field means a bot, so stop silently.
    if (data._hp) return;

    setFormError(null);

    const result = await submitForm('/api/demo-booking', {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      auditCount: data.auditCount,
      _hp: data._hp ?? '',
    });

    if (result.ok) {
      toast.success('Request received. We will be in touch.');
      setSubmitted(true);
      reset();
      return;
    }

    const { message, fields } = result.failure;

    // Put a server 422 back on the field it belongs to, so the person can see
    // what to fix rather than reading a banner and guessing.
    if (fields) {
      let firstField: keyof DemoInput | null = null;
      for (const [name, text] of Object.entries(fields)) {
        if (!MAPPABLE.has(name)) continue;
        const key = name as keyof DemoInput;
        setError(key, { type: 'server', message: text });
        firstField ??= key;
      }
      if (firstField) setFocus(firstField);
    }

    setFormError(message);
    toast.error(message);
  }

  if (submitted) {
    return (
      <div className="rounded-card bg-surface-1 p-7 shadow-raised sm:p-8">
        <CheckCircle2 size={28} className="text-success" aria-hidden="true" />
        <h2 className="mt-4 text-h3">Request received.</h2>
        <p className="mt-3 max-w-prose text-body text-muted">
          We will reply from a docrack.ai address on the next working day to arrange a time. If it
          is urgent, reply to that email and say so.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setFormError(null);
          }}
        >
          Send another request
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-card bg-surface-1 p-6 shadow-raised sm:p-8"
    >
      <HoneypotInput {...register('_hp')} />

      <div className="flex flex-col gap-5">
        <Field htmlFor="fullName" label="Full name" error={errors.fullName?.message}>
          <Input
            id="fullName"
            autoComplete="name"
            invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
        </Field>

        <Field
          htmlFor="email"
          label="Work email"
          error={errors.email?.message}
          hint="We reply to this address — a personal one slows the response down."
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            aria-describedby={cx(errors.email && 'email-error', 'email-hint')}
            {...register('email')}
          />
        </Field>

        <Field htmlFor="companyName" label="Organisation" error={errors.companyName?.message}>
          <Input
            id="companyName"
            autoComplete="organization"
            invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? 'companyName-error' : undefined}
            {...register('companyName')}
          />
        </Field>

        <Field
          htmlFor="auditCount"
          label="Audits run each year"
          error={errors.auditCount?.message}
          hint="Roughly. It tells us which parts of the product to show you."
        >
          <Select
            id="auditCount"
            defaultValue=""
            invalid={!!errors.auditCount}
            aria-describedby={cx(errors.auditCount && 'auditCount-error', 'auditCount-hint')}
            {...register('auditCount')}
          >
            <option value="" disabled>
              Select a range
            </option>
            {AUDIT_RANGES.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      {formError && (
        <p
          role="alert"
          className="mt-5 rounded-card bg-danger-100 px-4 py-3 text-body-sm text-danger-strong"
        >
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" fullWidth loading={isSubmitting} className="mt-6">
        {isSubmitting ? 'Sending…' : 'Request a demo'}
      </Button>

      <p className="mt-4 text-caption text-muted">
        We use these details to arrange the demo and follow up about DocRack. No newsletter, and we
        do not pass them on.
      </p>
    </form>
  );
}

/** Space-joined ids for aria-describedby, dropping the falsy ones. */
function cx(...parts: (string | false | undefined | null)[]): string | undefined {
  const joined = parts.filter(Boolean).join(' ');
  return joined.length > 0 ? joined : undefined;
}
