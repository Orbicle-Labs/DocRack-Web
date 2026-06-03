"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, ShieldAlert, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const intakeSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  companyName: z.string().min(2, "Organization name must be at least 2 characters"),
  auditCount: z.string().min(1, "Please select your active audits range"),
  _hp: z.string().max(0, "Bot detected").optional(),
});

type IntakeInput = z.infer<typeof intakeSchema>;

export default function IntakePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IntakeInput>({
    resolver: zodResolver(intakeSchema),
    defaultValues: { fullName: "", email: "", companyName: "", auditCount: "", _hp: "" },
  });

  const onSubmit = async (data: IntakeInput) => {
    // Client-side honeypot check
    if (data._hp) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/demo-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          companyName: data.companyName,
          auditCount: data.auditCount,
          _hp: data._hp ?? "",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      toast.success("Demo booked successfully! We will be in touch shortly.");
      setBookingSuccess(true);
      reset();
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setSubmitError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <header className="auth-header">
          <h3>BOOK A DEMO</h3>
          <p>Schedule a live walkthrough with our team. We will show you exactly how Orvyn works.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Honeypot — hidden from humans, bots fill it */}
          <input
            type="text"
            {...register("_hp")}
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Full Name */}
          <div className="form-group">
            <input
              type="text"
              id="fullName"
              {...register("fullName")}
              className={`form-input ${errors.fullName ? "invalid" : ""}`}
              placeholder=" "
              autoComplete="name"
              aria-invalid={errors.fullName ? "true" : "false"}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
            />
            <label htmlFor="fullName" className="form-label">Full Name</label>
            {errors.fullName && (
              <span id="fullName-error" className="text-[11px] font-mono text-rose-500 mt-1 block">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Organization */}
          <div className="form-group">
            <input
              type="text"
              id="companyName"
              {...register("companyName")}
              className={`form-input ${errors.companyName ? "invalid" : ""}`}
              placeholder=" "
              autoComplete="organization"
              aria-invalid={errors.companyName ? "true" : "false"}
              aria-describedby={errors.companyName ? "companyName-error" : undefined}
            />
            <label htmlFor="companyName" className="form-label">Organization</label>
            {errors.companyName && (
              <span id="companyName-error" className="text-[11px] font-mono text-rose-500 mt-1 block">
                {errors.companyName.message}
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`form-input ${errors.email ? "invalid" : ""}`}
              placeholder=" "
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <label htmlFor="email" className="form-label">Email Address</label>
            {errors.email && (
              <span id="email-error" className="text-[11px] font-mono text-rose-500 mt-1 block">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Audits Range */}
          <div className="form-group">
            <select
              id="auditCount"
              {...register("auditCount")}
              className={`form-input appearance-none ${errors.auditCount ? "invalid" : ""}`}
              defaultValue=""
              aria-invalid={errors.auditCount ? "true" : "false"}
              aria-describedby={errors.auditCount ? "auditCount-error" : undefined}
            >
              <option value="" disabled hidden></option>
              <option value="1-10">1 – 10 Annual Audits</option>
              <option value="10-50">10 – 50 Annual Audits</option>
              <option value="50-100">50 – 100 Annual Audits</option>
              <option value="100+">100+ Annual Audits</option>
            </select>
            <label htmlFor="auditCount" className="form-label">Annual Audits Range</label>
            {errors.auditCount && (
              <span id="auditCount-error" className="text-[11px] font-mono text-rose-500 mt-1 block">
                {errors.auditCount.message}
              </span>
            )}
          </div>

          {submitError && (
            <div className="border border-rose-500/20 bg-rose-500/5 p-4 rounded text-[12px] text-rose-500 flex items-start gap-2.5 mb-5 font-mono" role="alert">
              <ShieldAlert className="shrink-0 mt-0.5" size={16} />
              <span>{submitError}</span>
            </div>
          )}

          <button
            type="submit"
            className={`btn btn-primary form-submit-btn ${isSubmitting ? "loading" : ""}`}
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner mr-2" aria-hidden="true"></span>
                <span>Booking...</span>
              </>
            ) : (
              <span className="btn-text flex items-center gap-1.5">
                <CalendarDays size={12} /> Book My Demo
              </span>
            )}
          </button>
        </form>

        {/* Success overlay */}
        <div className={`form-success-overlay ${bookingSuccess ? "active" : ""}`}>
          <div className="success-icon-box text-emerald-500">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="font-header font-black text-lg uppercase mb-2">Demo Booked!</h3>
          <p className="text-[12px] text-secondary max-w-xs mx-auto mb-6">
            {"Thanks for your interest in Orvyn. Our team will reach out within 24 hours to confirm your demo slot."}
          </p>
          <button
            onClick={() => setBookingSuccess(false)}
            className="btn btn-secondary text-xs"
          >
            Book Another Slot
          </button>
        </div>
      </div>
    </div>
  );
}
