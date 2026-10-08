"use client";

import { useState, type FormEvent } from "react";
import { useQuote } from "@/components/QuoteForm";
import { Btn, Eyebrow, IconArrow, IconCheck, cx } from "@/components/ui";

interface Errors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const SUBJECTS = [
  "Question about a product",
  "Order or delivery question",
  "Installation and servicing",
  "Something else",
];

const inputCls =
  "w-full rounded-[6px] border border-rule bg-white px-3.5 py-3 text-[14.5px] text-ink placeholder:text-mute/70 transition-colors hover:border-navy/30 focus:border-water focus:outline-none focus:ring-2 focus:ring-water/25";
const errCls = "border-[#D9A19A] bg-[#FDF6F5]";

export default function ContactPage() {
  const { open } = useQuote();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<string | null>(null);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.email.trim()) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.subject) next.subject = "Choose a subject so your message reaches the right place.";
    if (!form.message.trim()) next.message = "Write a short message.";
    else if (form.message.trim().length < 15)
      next.message = "Please add a little more detail (at least 15 characters).";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = document.getElementById(`c-${Object.keys(next)[0]}`);
      first?.focus();
      return;
    }
    setDone(`CT-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  const routes = [
    {
      title: "Product question",
      copy: "Specs, compatibility, sizing or availability for something in the catalogue.",
      action: "Browse products",
      href: "/products",
    },
    {
      title: "Commercial or project enquiry",
      copy: "Flow rate, site details and scope — handled through the quote request form.",
      action: "Request a quote",
      href: "/quote",
    },
    {
      title: "Guidance on where to start",
      copy: "Three short questions that point you to the right part of the catalogue.",
      action: "Open solution finder",
      href: "/#solution-finder",
    },
  ];

  return (
    <>
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Contact</Eyebrow>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] text-navy">
                Talk to us about water
              </h1>
              <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.7] text-mute">
                Ask about a product, an order or a project. For large-scale or commercial
                requirements the quote form collects the details that matter.
              </p>
            </div>
            <dl className="grid gap-px border border-rule bg-rule">
              <div className="bg-white px-5 py-4">
                <dt className="micro-sm text-mute">Telephone</dt>
                <dd className="mt-2 font-mono text-[14px] text-navy">[To be supplied]</dd>
              </div>
              <div className="bg-white px-5 py-4">
                <dt className="micro-sm text-mute">Email</dt>
                <dd className="mt-2 font-mono text-[14px] text-navy">[To be supplied]</dd>
              </div>
              <div className="bg-white px-5 py-4">
                <dt className="micro-sm text-mute">Address</dt>
                <dd className="mt-2 font-mono text-[14px] text-navy">[To be supplied]</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="micro text-navy">Send a message</span>
              <span className="h-px flex-1 bg-rule" />
            </div>

            {done ? (
              <div className="rise-in mt-6 border border-rule bg-plate p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white">
                  <IconCheck className="h-5 w-5" />
                </span>
                <h2 className="mt-5 font-display text-2xl font-extrabold text-navy">
                  Message recorded
                </h2>
                <p className="mt-3 max-w-[520px] text-[15px] leading-[1.7] text-mute">
                  Demo submission — this concept does not transmit your message and no one has
                  received it. In a live build this would be delivered to the support inbox.
                </p>
                <p className="mt-4 font-mono text-[14px] font-semibold text-navy tnum">
                  Reference {done}
                </p>
                <Btn
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setDone(null);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                >
                  Send another message
                </Btn>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="micro-sm text-navy">
                    Your name <span className="text-mute">— Required</span>
                  </label>
                  <input
                    id="c-name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "c-name-error" : undefined}
                    className={cx(inputCls, "mt-2", errors.name && errCls)}
                    placeholder="Full name"
                  />
                  {errors.name ? (
                    <p id="c-name-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="c-email" className="micro-sm text-navy">
                    Email address <span className="text-mute">— Required</span>
                  </label>
                  <input
                    id="c-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "c-email-error" : undefined}
                    className={cx(inputCls, "mt-2", errors.email && errCls)}
                    placeholder="name@company.com"
                  />
                  {errors.email ? (
                    <p id="c-email-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="c-subject" className="micro-sm text-navy">
                    Subject <span className="text-mute">— Required</span>
                  </label>
                  <select
                    id="c-subject"
                    value={form.subject}
                    onChange={(e) => set("subject", e.target.value)}
                    aria-invalid={!!errors.subject}
                    aria-describedby={errors.subject ? "c-subject-error" : undefined}
                    className={cx(inputCls, "mt-2 appearance-none", errors.subject && errCls)}
                  >
                    <option value="">Choose a subject</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {errors.subject ? (
                    <p id="c-subject-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {errors.subject}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="micro-sm text-navy">
                    Message <span className="text-mute">— Required</span>
                  </label>
                  <textarea
                    id="c-message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "c-message-error" : undefined}
                    className={cx(inputCls, "mt-2 resize-y", errors.message && errCls)}
                    placeholder="How can we help?"
                  />
                  {errors.message ? (
                    <p id="c-message-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2 flex flex-col gap-4 border-t border-rule pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[380px] text-[12.5px] leading-[1.6] text-mute">
                    Demo form — nothing you enter is transmitted or stored.
                  </p>
                  <Btn type="submit" variant="primary" size="lg" className="shrink-0">
                    Send Message
                    <IconArrow />
                  </Btn>
                </div>
              </form>
            )}
          </div>

          <aside>
            <div className="flex items-center gap-3">
              <span className="micro text-navy">Faster routes</span>
              <span className="h-px flex-1 bg-rule" />
            </div>
            <div className="mt-6 grid gap-4">
              {routes.map((r) => (
                <div key={r.title} className="border border-rule bg-white p-5 transition-colors hover:border-navy/30">
                  <h2 className="font-display text-[17px] font-bold text-navy">{r.title}</h2>
                  <p className="mt-2 text-[14px] leading-[1.65] text-mute">{r.copy}</p>
                  {r.href === "/quote" ? (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-semibold text-water hover:text-navy"
                    >
                      {r.action}
                      <IconArrow className="h-4 w-4" />
                    </button>
                  ) : (
                    <Btn href={r.href} variant="outline" size="sm" className="mt-4">
                      {r.action}
                    </Btn>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 border-l-2 border-aqua bg-plate p-5">
              <p className="text-[13.5px] leading-[1.7] text-mute">
                Contact details, telephone numbers and email addresses are deliberately left as
                placeholders — they will be inserted once the business details are confirmed.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
