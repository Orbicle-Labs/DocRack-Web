'use client';

import React, { useRef, useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { demoSchema, type DemoInput } from '@/lib/forms/schemas';
import { CheckCircle2 } from 'lucide-react';
import { Button, Field, HoneypotInput, Input, Select } from '@/components/ui';
import { track } from '@/lib/analytics/client';
import { submitForm } from '@/lib/forms/submit';

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

const subscribe = () => () => {};
export function DemoForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const started = useRef(false);
  const inFlight = useRef(false);
  const receipt = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (submitted) receipt.current?.focus();
  }, [submitted]);

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
  });

  async function onSubmit(data: DemoInput) {
    // Client honeypot: a filled hidden field means a bot, so stop silently.
    if (data._hp || inFlight.current) return;
    inFlight.current = true;

    setFormError(null);

    const result = await submitForm('/api/demo-booking', {
      fullName: data.fullName,
      email: data.email,
      companyName: data.companyName,
      auditCount: data.auditCount,
      _hp: data._hp ?? '',
    });

    inFlight.current = false;
    if (result.ok) {
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
  }

  if (submitted) {
    return (
      <div role="status" className="rounded-card bg-surface-1 p-7 shadow-raised sm:p-8">
        <CheckCircle2 size={28} className="text-success" aria-hidden="true" />
        <h2 ref={receipt} tabIndex={-1} className="mt-4 text-h3">
          Request received.
        </h2>
        <p className="mt-3 max-w-prose text-body text-muted">
          Thank you for your interest. Your demo request has been received. Our team will follow up
          to discuss your workflow.
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
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track({ name: 'demo_form_start', props: { page: '/book-demo' } });
        }
      }}
      onSubmit={(event) => {
        void handleSubmit(onSubmit, () =>
          track({ name: 'form_error', props: { form: 'demo', errorClass: 'validation' } })
        )(event);
      }}
      data-hydrated={hydrated}
      aria-busy={isSubmitting}
      noValidate
      className="rounded-card bg-surface-1 p-6 shadow-raised sm:p-8"
    >
      <noscript>
        <p className="mb-5 text-body-sm">
          Enable JavaScript to send this form. You can read the website without it.
        </p>
      </noscript>
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
          hint="The address our team can use to follow up."
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
          hint="An approximate range helps us understand your team."
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

      <Button
        type="submit"
        size="lg"
        fullWidth
        disabled={!hydrated}
        loading={isSubmitting}
        className="mt-6"
      >
        {isSubmitting ? 'Sending…' : 'Request a demo'}
      </Button>

      <p className="mt-4 text-caption text-muted">
        We use these details to respond to your enquiry. See our{' '}
        <Link href="/privacy" className="underline underline-offset-4">
          privacy review status
        </Link>{' '}
        or contact the team with questions about website data handling.
      </p>
    </form>
  );
}

/** Space-joined ids for aria-describedby, dropping the falsy ones. */
function cx(...parts: (string | false | undefined | null)[]): string | undefined {
  const joined = parts.filter(Boolean).join(' ');
  return joined.length > 0 ? joined : undefined;
}
