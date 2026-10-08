"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Btn, IconCheck, IconClose, cx } from "@/components/ui";

/* ------------------------------------------------------------ form state */

interface Fields {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  application: string;
  location: string;
  system: string;
  capacity: string;
  description: string;
  contactMethod: string;
}

const empty: Fields = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  application: "",
  location: "",
  system: "",
  capacity: "",
  description: "",
  contactMethod: "",
};

type Errors = Partial<Record<keyof Fields, string>>;

const APPLICATIONS = ["Commercial", "Industrial", "Municipal / Large-Scale", "Other"];
const CONTACT = ["Email", "Phone", "Either is fine"];

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.fullName.trim()) e.fullName = "Enter your full name.";
  if (!f.company.trim()) e.company = "Enter your company or organisation.";
  if (!f.email.trim()) e.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim()))
    e.email = "Enter a valid email address, for example name@company.com.";
  if (!f.application) e.application = "Select an application type.";
  if (!f.system.trim()) e.system = "Tell us which system or product you need.";
  if (!f.description.trim()) e.description = "Describe the project so we can understand the scope.";
  else if (f.description.trim().length < 20)
    e.description = "Please add a little more detail (at least 20 characters).";
  if (!f.contactMethod) e.contactMethod = "Choose how you would prefer to be contacted.";
  if (f.phone.trim() && !/^[0-9+()\-\s]{6,}$/.test(f.phone.trim()))
    e.phone = "Enter a valid phone number or leave this field empty.";
  return e;
}

function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-3">
        <span className="micro-sm text-navy">{label}</span>
        <span className="micro-sm text-mute">{required ? "Required" : "Optional"}</span>
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? <p className="mt-1.5 text-[12.5px] text-mute">{hint}</p> : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const inputCls =
  "w-full rounded-[6px] border border-rule bg-white px-3.5 py-3 text-[14.5px] text-ink placeholder:text-mute/70 transition-colors duration-150 hover:border-navy/30 focus:border-water focus:outline-none focus:ring-2 focus:ring-water/25";

const inputErr = "border-[#D9A19A] bg-[#FDF6F5]";

export function QuoteForm({ defaultSystem = "" }: { defaultSystem?: string }) {
  const [fields, setFields] = useState<Fields>({ ...empty, system: defaultSystem });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState<string | null>(null);

  const set = (key: keyof Fields, value: string) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(fields);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const first = document.getElementById(Object.keys(e)[0]);
      first?.focus();
      first?.scrollIntoView({ block: "center", behavior: "smooth" });
      return;
    }
    const ref = `QP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmitted(ref);
  };

  if (submitted) {
    return (
      <div className="rise-in border border-rule bg-plate p-8 sm:p-10">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
          <IconCheck className="h-5 w-5" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-navy">
          Your quote request has been recorded
        </h3>
        <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-mute">
          This is a front-end demonstration, so nothing has been transmitted to a sales team. The
          form validated and completed as it would in a live build.
        </p>
        <dl className="mt-6 grid gap-px overflow-hidden border border-rule bg-rule sm:grid-cols-2">
          <div className="bg-white p-4">
            <dt className="micro-sm text-mute">Reference</dt>
            <dd className="mt-2 font-mono text-[15px] font-semibold text-navy tnum">{submitted}</dd>
          </div>
          <div className="bg-white p-4">
            <dt className="micro-sm text-mute">Applicant</dt>
            <dd className="mt-2 text-[15px] font-medium text-navy">{fields.fullName}</dd>
          </div>
          <div className="bg-white p-4">
            <dt className="micro-sm text-mute">Application</dt>
            <dd className="mt-2 text-[15px] font-medium text-navy">{fields.application}</dd>
          </div>
          <div className="bg-white p-4">
            <dt className="micro-sm text-mute">Preferred contact</dt>
            <dd className="mt-2 text-[15px] font-medium text-navy">{fields.contactMethod}</dd>
          </div>
        </dl>
        <div className="mt-7 flex flex-wrap gap-3">
          <Btn
            variant="outline"
            onClick={() => {
              setFields({ ...empty, system: defaultSystem });
              setErrors({});
              setSubmitted(null);
            }}
          >
            Submit another request
          </Btn>
          <Btn href="/products" variant="primary">
            Browse products
          </Btn>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field id="q-fullName" label="Full name" required error={errors.fullName}>
        <input
          id="q-fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          value={fields.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "q-fullName-error" : undefined}
          className={cx(inputCls, errors.fullName && inputErr)}
          placeholder="Jordan Reyes"
        />
      </Field>

      <Field id="q-company" label="Company / organisation" required error={errors.company}>
        <input
          id="q-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={fields.company}
          onChange={(e) => set("company", e.target.value)}
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? "q-company-error" : undefined}
          className={cx(inputCls, errors.company && inputErr)}
          placeholder="Organisation name"
        />
      </Field>

      <Field id="q-email" label="Email address" required error={errors.email}>
        <input
          id="q-email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={(e) => set("email", e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "q-email-error" : undefined}
          className={cx(inputCls, errors.email && inputErr)}
          placeholder="name@company.com"
        />
      </Field>

      <Field id="q-phone" label="Phone number" error={errors.phone}>
        <input
          id="q-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={fields.phone}
          onChange={(e) => set("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "q-phone-error" : undefined}
          className={cx(inputCls, errors.phone && inputErr)}
          placeholder="+1 555 000 0000"
        />
      </Field>

      <Field id="q-application" label="Application type" required error={errors.application}>
        <select
          id="q-application"
          name="application"
          value={fields.application}
          onChange={(e) => set("application", e.target.value)}
          aria-invalid={!!errors.application}
          aria-describedby={errors.application ? "q-application-error" : undefined}
          className={cx(inputCls, "appearance-none", errors.application && inputErr)}
        >
          <option value="">Select an application</option>
          {APPLICATIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </Field>

      <Field id="q-location" label="Project location" error={errors.location}>
        <input
          id="q-location"
          name="location"
          type="text"
          value={fields.location}
          onChange={(e) => set("location", e.target.value)}
          className={inputCls}
          placeholder="City / region"
        />
      </Field>

      <Field id="q-system" label="Required system or product" required error={errors.system}>
        <input
          id="q-system"
          name="system"
          type="text"
          value={fields.system}
          onChange={(e) => set("system", e.target.value)}
          aria-invalid={!!errors.system}
          aria-describedby={errors.system ? "q-system-error" : undefined}
          className={cx(inputCls, errors.system && inputErr)}
          placeholder="e.g. Commercial filtration skid"
        />
      </Field>

      <Field id="q-capacity" label="Estimated capacity or flow rate" error={errors.capacity}>
        <input
          id="q-capacity"
          name="capacity"
          type="text"
          value={fields.capacity}
          onChange={(e) => set("capacity", e.target.value)}
          className={inputCls}
          placeholder="e.g. 12 m³/h — units of your choice"
        />
      </Field>

      <div className="sm:col-span-2">
        <Field
          id="q-description"
          label="Project description"
          required
          error={errors.description}
          hint="Include the application, existing setup and any known constraints."
        >
          <textarea
            id="q-description"
            name="description"
            rows={5}
            value={fields.description}
            onChange={(e) => set("description", e.target.value)}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "q-description-error" : undefined}
            className={cx(inputCls, "resize-y", errors.description && inputErr)}
            placeholder="Tell us about the site, the duty and what you are trying to achieve."
          />
        </Field>
      </div>

      <fieldset className="sm:col-span-2">
        <legend className="micro-sm text-navy">
          Preferred contact method <span className="text-mute">— Required</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {CONTACT.map((c) => (
            <label
              key={c}
              className={cx(
                "cursor-pointer rounded-[6px] border px-4 py-2.5 text-[14px] font-medium transition-colors duration-150",
                fields.contactMethod === c
                  ? "border-water bg-water/10 text-navy"
                  : "border-rule bg-white text-mute hover:border-navy/40 hover:text-navy",
              )}
            >
              <input
                type="radio"
                name="contactMethod"
                value={c}
                checked={fields.contactMethod === c}
                onChange={(e) => set("contactMethod", e.target.value)}
                className="sr-only"
              />
              {c}
            </label>
          ))}
        </div>
        {errors.contactMethod ? (
          <p role="alert" className="mt-2 text-[12.5px] font-medium text-[#B03A2E]">
            {errors.contactMethod}
          </p>
        ) : null}
      </fieldset>

      <div className="sm:col-span-2 border-t border-rule pt-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-[12.5px] leading-[1.6] text-mute">
            Demo submission — this concept does not send your details anywhere and does not imply
            that a sales team has received your enquiry.
          </p>
          <Btn type="submit" variant="primary" size="lg" className="shrink-0">
            Submit Quote Request
          </Btn>
        </div>
      </div>
    </form>
  );
}

/* ----------------------------------------------------------- modal shell */

interface QuoteCtx {
  open: (system?: string) => void;
  close: () => void;
}

const QuoteContext = createContext<QuoteCtx | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; system: string }>({
    open: false,
    system: "",
  });

  const value = useMemo<QuoteCtx>(
    () => ({
      open: (system = "") => setState({ open: true, system }),
      close: () => setState((s) => ({ ...s, open: false })),
    }),
    [],
  );

  return (
    <QuoteContext.Provider value={value}>
      {children}
      {state.open ? (
        <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <div className="fixed inset-0 bg-navy-deep/65 fade-in" onClick={value.close} aria-hidden />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
            className="rise-in relative my-auto w-full max-w-3xl border border-rule bg-white shadow-[0_30px_80px_-30px_rgba(10,29,49,.55)]"
          >
            <div className="flex items-start justify-between gap-6 border-b border-rule bg-plate px-6 py-5 sm:px-8">
              <div>
                <span className="micro text-water">Quote request</span>
                <h2 className="mt-2 font-display text-2xl font-extrabold text-navy sm:text-[28px]">
                  Discuss Your Requirements
                </h2>
                <p className="mt-2 max-w-lg text-[14px] leading-[1.6] text-mute">
                  Share the scope of your project and the details you already have. Fields marked
                  required help us understand the application.
                </p>
              </div>
              <button
                type="button"
                onClick={value.close}
                aria-label="Close quote form"
                className="mt-1 shrink-0 rounded-[6px] border border-rule bg-white p-2 text-navy transition-colors hover:bg-plate"
              >
                <IconClose />
              </button>
            </div>
            <div className="px-6 py-7 sm:px-8">
              <QuoteForm defaultSystem={state.system} />
            </div>
          </div>
        </div>
      ) : null}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
