"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Btn, IconArrow, IconCheck, Logo, cx } from "@/components/ui";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Residential Systems", href: "/solutions/residential" },
      { label: "Commercial Systems", href: "/solutions/commercial" },
      { label: "Replacement Filters", href: "/products?category=accessories" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Home Water Treatment", href: "/solutions/residential" },
      { label: "Commercial Water Treatment", href: "/solutions/commercial" },
      { label: "Industrial Solutions", href: "/solutions/industrial-municipal" },
      { label: "Municipal Applications", href: "/solutions/industrial-municipal" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Water Treatment Guides", href: "/resources" },
      { label: "FAQs", href: "/resources" },
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms and Conditions", href: "/legal/terms" },
    ],
  },
];

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address to subscribe.");
      return;
    }
    setError("");
    setDone(true);
  };

  if (done) {
    return (
      <div className="rise-in border border-aqua/40 bg-white/5 p-5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-aqua text-navy">
          <IconCheck className="h-4 w-4" />
        </span>
        <p className="mt-3 font-display text-[15px] font-bold text-white">You are on the list</p>
        <p className="mt-1.5 text-[13px] leading-[1.6] text-white/65">
          Demo confirmation — no address was transmitted or stored. Replace this with your email
          platform when the site goes live.
        </p>
        <button
          type="button"
          onClick={() => {
            setDone(false);
            setEmail("");
          }}
          className="mt-3 text-[13px] font-semibold text-aqua underline underline-offset-4"
        >
          Use a different address
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="newsletter-email" className="micro text-aqua">
        Newsletter
      </label>
      <p className="mt-3 text-[14px] leading-[1.65] text-white/70">
        Product updates and water treatment guides, sent occasionally.
      </p>
      <div className="mt-4 flex items-stretch gap-2">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="name@company.com"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className={cx(
            "min-w-0 flex-1 rounded-[6px] border bg-white/8 px-3.5 py-3 text-[14px] text-white placeholder:text-white/45 focus:outline-none focus:ring-2 focus:ring-aqua/50",
            error ? "border-[#E3968C]" : "border-white/20 focus:border-aqua",
          )}
        />
        <button
          type="submit"
          aria-label="Subscribe to the newsletter"
          className="shrink-0 rounded-[6px] bg-aqua px-4 text-navy transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <IconArrow />
        </button>
      </div>
      {error ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-[12.5px] text-[#E3968C]">
          {error}
        </p>
      ) : null}
    </form>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 technical-grid opacity-[0.35]" aria-hidden />
      <div className="relative mx-auto max-w-[1360px] px-5 sm:px-8 xl:pl-[108px] xl:pr-10">
        {/* top */}
        <div className="grid gap-10 border-b border-white/12 py-14 lg:grid-cols-[1.15fr_2fr] lg:gap-16">
          <div>
            <Logo className="h-10" dark />
            <p className="mt-6 max-w-sm text-[14.5px] leading-[1.7] text-white/70">
              AquaPure Water Solutions is a placeholder brand for this concept — a supplier of water
              purification and treatment products spanning household filters, commercial
              filtration, and large-scale industrial and municipal systems.
            </p>
            <div className="mt-6 space-y-2">
              <p className="micro-sm text-white/45">Registered details</p>
              <p className="text-[13.5px] text-white/60">[Company address — to be supplied]</p>
              <p className="text-[13.5px] text-white/60">[Telephone — to be supplied]</p>
              <p className="text-[13.5px] text-white/60">[Email address — to be supplied]</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="micro border-b border-white/15 pb-3 text-aqua">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-white/72 transition-colors duration-150 hover:text-aqua"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* newsletter */}
        <div className="grid gap-8 border-b border-white/12 py-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-display text-[26px] font-extrabold leading-tight text-white sm:text-[30px]">
              Stay informed before you buy
            </h2>
            <p className="mt-2 text-[14.5px] leading-[1.65] text-white/65">
              Practical guidance on choosing and maintaining water treatment equipment.
            </p>
          </div>
          <Newsletter />
        </div>

        {/* bottom */}
        <div className="flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-white/50">
            © {new Date().getFullYear()} AquaPure Water Solutions — placeholder brand name for this
            front-end concept. All content is sample data.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/legal/privacy" className="text-[12.5px] text-white/50 hover:text-aqua">
              Privacy Policy
            </Link>
            <Link href="/legal/terms" className="text-[12.5px] text-white/50 hover:text-aqua">
              Terms and Conditions
            </Link>
            <span className="micro-sm text-white/55">Concept build — no live commerce backend</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
