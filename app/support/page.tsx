'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Send, CheckCircle2, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: 'How does the CARO 2020 Auto-Checklist work?',
    a: 'DocRack extracts structured tables from accounting records (PDF, CSV, or XML) using a sandboxed document parser. These are evaluated against certified compliance prompt chains, flagging discrepancies matched directly to standard audit rows.',
  },
  {
    q: 'Is client financial data safe and DPDP compliant?',
    a: 'Yes. DocRack uses Row Level Security (RLS) to lock database queries to verified CA client roles. All data is stored within India (AWS Mumbai region) — no compliance records leave sovereign borders.',
  },
  {
    q: 'How are immutable audit trails guaranteed?',
    a: 'Every checklist validation and ledger scan produces a cryptographic signature. These are linked sequentially in Merkle trees — any modification of older logs instantly breaks the hash chain, exposing tampering.',
  },
  {
    q: 'Can DocRack integrate with legacy Tally Prime?',
    a: 'Yes. DocRack accepts standard XML exports from Tally installations and can sync data into isolated workspaces via REST API. No changes to your existing Tally setup are required.',
  },
];

const ticketSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _hp: z.string().max(0, 'Bot detected').optional(),
});

type TicketInput = z.infer<typeof ticketSchema>;

export default function SupportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TicketInput>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { fullName: '', email: '', message: '', _hp: '' },
  });

  const toggleFaq = (index: number) => {
    setActiveFaq((prev) => (prev === index ? null : index));
  };

  const onSubmit = async (data: TicketInput) => {
    // Client-side honeypot check
    if (data._hp) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/support-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          message: data.message,
          _hp: data._hp ?? '',
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }

      toast.success('Message sent successfully. We will get back to you soon.');
      setSubmitSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="legacy-page min-h-screen pb-20">
      <header className="page-title-section">
        <span className="page-tag">Help & Support</span>
        <h1 className="page-title">Support & FAQ</h1>
        <p className="page-subtitle max-w-xl mx-auto">
          Have a question about DocRack? Browse our FAQs or send us a message and we will get back
          to you within one business day.
        </p>
      </header>

      <section className="faq-accordion-grid">
        {/* LEFT: FAQ Accordions */}
        <div className="faq-card-list">
          <h3 className="font-header font-extrabold text-[18px] uppercase tracking-tight text-primary mb-4 border-b border-color pb-2">
            FREQUENTLY ASKED QUESTIONS
          </h3>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isActive = activeFaq === idx;
              return (
                <article className={`accordion-item ${isActive ? 'active' : ''}`} key={faq.q}>
                  <header
                    className="accordion-header"
                    onClick={() => toggleFaq(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleFaq(idx);
                      }
                    }}
                    role="button"
                    aria-expanded={isActive}
                    tabIndex={0}
                  >
                    <span className="accordion-title text-primary">{faq.q}</span>
                    <span className="accordion-icon">{isActive ? '×' : '+'}</span>
                  </header>
                  <div
                    className="accordion-content"
                    style={{ maxHeight: isActive ? '200px' : '0' }}
                  >
                    <p className="text-[12px] text-secondary leading-relaxed pt-2">{faq.a}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <div className="relative">
          <div className="auth-card w-full !max-w-full">
            <header className="auth-header !mb-6">
              <h3>SEND A MESSAGE</h3>
              <p>{"Got a question or need help? We're here for you."}</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot — hidden from humans, bots fill it */}
              <input
                type="text"
                {...register('_hp')}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Full Name */}
              <div className="form-group">
                <input
                  type="text"
                  id="fullName"
                  {...register('fullName')}
                  className={`form-input ${errors.fullName ? 'invalid' : ''}`}
                  placeholder=" "
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                <label htmlFor="fullName" className="form-label">
                  Full Name
                </label>
                {errors.fullName && (
                  <span
                    id="fullName-error"
                    className="text-[11px] font-mono text-rose-500 mt-1 block"
                  >
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`form-input ${errors.email ? 'invalid' : ''}`}
                  placeholder=" "
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                {errors.email && (
                  <span id="email-error" className="text-[11px] font-mono text-rose-500 mt-1 block">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="form-group">
                <textarea
                  id="message"
                  rows={4}
                  {...register('message')}
                  className={`form-input !h-auto ${errors.message ? 'invalid' : ''}`}
                  placeholder=" "
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                {errors.message && (
                  <span
                    id="message-error"
                    className="text-[11px] font-mono text-rose-500 mt-1 block"
                  >
                    {errors.message.message}
                  </span>
                )}
              </div>

              {submitError && (
                <div
                  className="border border-rose-500/20 bg-rose-500/5 p-4 rounded text-[12px] text-rose-500 flex items-start gap-2.5 mb-5 font-mono"
                  role="alert"
                >
                  <ShieldAlert className="shrink-0 mt-0.5" size={16} />
                  <span>{submitError}</span>
                </div>
              )}

              <button
                type="submit"
                className={`btn btn-primary form-submit-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner mr-2" aria-hidden="true"></span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <span className="btn-text flex items-center gap-1.5">
                    <Send size={12} /> Send Message
                  </span>
                )}
              </button>
            </form>

            {/* Success overlay */}
            <div className={`form-success-overlay ${submitSuccess ? 'active' : ''}`}>
              <div className="success-icon-box text-emerald-500">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="font-header font-black text-lg uppercase mb-2">Message Sent!</h3>
              <p className="text-[12px] text-secondary max-w-xs mx-auto mb-6">
                {"Thanks for reaching out. We'll get back to you within one business day."}
              </p>
              <button onClick={() => setSubmitSuccess(false)} className="btn btn-secondary text-xs">
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
