'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button, Field, HoneypotInput, Input, Textarea } from '@/components/ui';
import { submitForm } from '@/lib/forms';

/** Mirrors app/api/support-ticket/route.ts exactly — same regex, same lengths. */
const supportSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Enter at least 2 characters')
    .max(100, 'Keep this under 100 characters')
    .regex(/^[\p{L}\s'\-\.]+$/u, 'Use letters, spaces, hyphens and apostrophes only'),
  email: z
    .string()
    .min(1, 'Enter your email')
    .email('Enter a valid email address')
    .max(254, 'Keep this under 254 characters'),
  message: z
    .string()
    .min(10, 'Tell us a little more — at least 10 characters')
    .max(5000, 'Keep this under 5000 characters'),
  _hp: z.string().max(0).optional(),
});

type SupportInput = z.infer<typeof supportSchema>;

const MAPPABLE = new Set(['fullName', 'email', 'message']);

export function SupportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    defaultValues: { fullName: '', email: '', message: '', _hp: '' },
  });

  async function onSubmit(data: SupportInput) {
    if (data._hp) return;

    setFormError(null);

    const result = await submitForm('/api/support-ticket', {
      fullName: data.fullName,
      email: data.email,
      message: data.message,
      _hp: data._hp ?? '',
    });

    if (result.ok) {
      toast.success('Message sent. We will reply by email.');
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
    toast.error(message);
  }

  if (submitted) {
    return (
      <div className="rounded-card bg-surface-1 p-7 shadow-raised sm:p-8">
        <CheckCircle2 size={28} className="text-success" aria-hidden="true" />
        <h2 className="mt-4 text-h3">Message sent.</h2>
        <p className="mt-3 max-w-prose text-body text-muted">
          We reply by email within one working day. If your question is about an evaluation already
          under way, mention the organisation name and it will reach the right person faster.
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

      <Button type="submit" size="lg" fullWidth loading={isSubmitting} className="mt-6">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>

      <p className="mt-4 text-caption text-muted">
        We use these details to answer your question and follow up about it. Nothing else.
      </p>
    </form>
  );
}
