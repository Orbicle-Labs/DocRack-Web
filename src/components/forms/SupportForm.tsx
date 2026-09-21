'use client';

import React, { useRef, useEffect, useState, useSyncExternalStore } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supportSchema, type SupportInput } from '@/lib/forms/schemas';
import { CheckCircle2 } from 'lucide-react';
import { Button, Field, HoneypotInput, Input, Textarea } from '@/components/ui';
import { track } from '@/lib/analytics/client';
import { submitForm } from '@/lib/forms/submit';

const MAPPABLE = new Set(['fullName', 'email', 'message']);

const subscribe = () => () => {};
export function SupportForm() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
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
  } = useForm<SupportInput>({
    resolver: zodResolver(supportSchema),
    mode: 'onTouched',
  });

  async function onSubmit(data: SupportInput) {
    if (data._hp || inFlight.current) return;
    inFlight.current = true;

    setFormError(null);

    const result = await submitForm('/api/support-ticket', {
      fullName: data.fullName,
      email: data.email,
      message: data.message,
      _hp: data._hp ?? '',
    });

    inFlight.current = false;
    if (result.ok) {
      setSubmitted(true);
      reset();
      return;
    }

    const { message, fields } = result.failure;

    if (fields) {
      let firstField: keyof SupportInput | null = null;
      for (const [name, text] of Object.entries(fields)) {
        if (!MAPPABLE.has(name)) continue;
        const key = name as keyof SupportInput;
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
          Message sent.
        </h2>
        <p className="mt-3 max-w-prose text-body text-muted">
          Your message has been submitted to the team. We will use your details to respond to your
          question.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => {
            setSubmitted(false);
            setFormError(null);
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(onSubmit, () =>
          track({ name: 'form_error', props: { form: 'support', errorClass: 'validation' } })
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

        <Field htmlFor="email" label="Email" error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </Field>

        <Field
          htmlFor="message"
          label="Your question"
          error={errors.message?.message}
          hint="The more specific the better — which audit, which step, what you expected to happen."
        >
          <Textarea
            id="message"
            rows={6}
            invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error message-hint' : 'message-hint'}
            {...register('message')}
          />
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
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>

      <p className="mt-4 text-caption text-muted">
        We use these details to answer your question and follow up about it.
      </p>
    </form>
  );
}
