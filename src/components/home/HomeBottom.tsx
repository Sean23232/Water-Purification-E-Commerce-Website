"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categories, guides, type Application } from "@/lib/catalog";
import { useQuote } from "@/components/QuoteForm";
import { Btn, Eyebrow, IconArrow, IconCheck, IconCompass, IconLayers, IconList, IconSupport, Reveal, Section, cx } from "@/components/ui";

/* --------------------------------------------------------- solution finder */

type Answers = { location: string; goal: string; next: string };

const Q1 = [
  { id: "home", label: "Home" },
  { id: "business", label: "Business" },
  { id: "industrial", label: "Industrial facility" },
  { id: "municipal", label: "Municipal or large-scale application" },
];

const Q2 = [
  { id: "drinking", label: "Drinking water filtration" },
  { id: "property", label: "Whole-property water treatment" },
  { id: "process", label: "Process or operational water treatment" },
  { id: "large", label: "Large-scale treatment requirements" },
  { id: "unsure", label: "Not sure yet" },
];

const Q3 = [
  { id: "browse", label: "Browse products" },
  { id: "compare", label: "Compare available systems" },
  { id: "guidance", label: "Request expert guidance or a quote" },
];

const LOCATION_APP: Record<string, Application> = {
  home: "Residential",
  business: "Commercial",
  industrial: "Industrial",
  municipal: "Municipal",
};

function pickCategory(location: string, goal: string): string {
  if (location === "municipal") return "municipal-solutions";
  if (location === "industrial") return "industrial-treatment";
  if (location === "business") {
    if (goal === "drinking") return "drinking-water-filters";
    return "commercial-filtration";
  }
  if (goal === "property") return "whole-home";
  if (goal === "process") return "softening-conditioning";
  if (goal === "large") return "whole-home";
  if (goal === "unsure") return "drinking-water-filters";
  return "drinking-water-filters";
}

const START_POINTS: Record<string, string> = {
  drinking: "Point-of-use filtration at a single tap, with reverse osmosis as an alternative.",
  property: "Central filtration installed at the main supply line, with conditioning as an option.",
  process: "Duty-led equipment specified against flow, hours and the process itself.",
  large: "Phased treatment equipment scoped with your project team.",
  unsure: "Start with the product catalogue and narrow down by application.",
};

export function SolutionFinder() {
  const [answers, setAnswers] = useState<Answers>({ location: "", goal: "", next: "" });
  const { open } = useQuote();

  const set = (key: keyof Answers, value: string) =>
    setAnswers((a) => ({ ...a, [key]: value }));

  const complete = answers.location && answers.goal && answers.next;
  const category = categories.find((c) => c.slug === pickCategory(answers.location, answers.goal));
  const application = LOCATION_APP[answers.location] ?? "Residential";
  const ref = `SF-${String(Q1.findIndex((o) => o.id === answers.location) + 1)}${String(
    Q2.findIndex((o) => o.id === answers.goal) + 1,
  )}${String(Q3.findIndex((o) => o.id === answers.next) + 1)}-${String(
    (Q1.findIndex((o) => o.id === answers.location) + 1) * 37 +
      (Q2.findIndex((o) => o.id === answers.goal) + 1) * 11 +
      (Q3.findIndex((o) => o.id === answers.next) + 1) * 5,
  ).padStart(4, "0")}`;

  const nextHref =
    answers.next === "compare"
      ? `/products?application=${encodeURIComponent(application)}`
      : `/products?category=${category?.slug ?? ""}`;

  const optionCls = (active: boolean) =>
    cx(
      "rounded-[6px] border px-4 py-3 text-left text-[14.5px] font-medium leading-snug transition-all duration-150",
      active
        ? "border-water bg-water/8 text-navy shadow-[inset_3px_0_0_0_#087DB8]"
        : "border-rule bg-white text-mute hover:border-navy/40 hover:text-navy",
    );

  return (
    <Section id="solution-finder" index="04" label="SOLUTION FINDER" tone="plate" className="py-16 lg:py-24">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Find the right water solution</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
              Not Sure Which System You Need?
            </h2>
          </div>
          <p className="text-[15.5px] leading-[1.7] text-mute lg:pb-2">
            Answer three short questions. We will point you to the part of the catalogue that fits
            your situation — and the next step that makes sense for you.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
        {/* questions */}
        <div className="border border-rule bg-white">
          <div className="flex items-center justify-between border-b border-rule bg-navy px-6 py-3.5">
            <span className="micro text-white">Questionnaire</span>
            <span className="micro text-aqua tnum">
              {complete ? "03 / 03" : answers.goal ? "02 / 03" : answers.location ? "01 / 03" : "00 / 03"}
            </span>
          </div>

          <div className="divide-y divide-rule">
            {/* Q1 */}
            <fieldset className="p-6">
              <legend className="flex w-full items-baseline gap-3">
                <span className="micro text-water tnum">01</span>
                <span className="font-display text-[17px] font-bold text-navy">
                  Where will the system be used?
                </span>
              </legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {Q1.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={answers.location === o.id}
                    onClick={() => set("location", o.id)}
                    className={optionCls(answers.location === o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Q2 */}
            <fieldset className={cx("p-6", !answers.location && "pointer-events-none opacity-40")}>
              <legend className="flex w-full items-baseline gap-3">
                <span className="micro text-water tnum">02</span>
                <span className="font-display text-[17px] font-bold text-navy">
                  What is the primary goal?
                </span>
              </legend>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {Q2.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={answers.goal === o.id}
                    disabled={!answers.location}
                    onClick={() => set("goal", o.id)}
                    className={optionCls(answers.goal === o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Q3 */}
            <fieldset className={cx("p-6", !answers.goal && "pointer-events-none opacity-40")}>
              <legend className="flex w-full items-baseline gap-3">
                <span className="micro text-water tnum">03</span>
                <span className="font-display text-[17px] font-bold text-navy">
                  What is the preferred next step?
                </span>
              </legend>
              <div className="mt-4 grid gap-2.5">
                {Q3.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={answers.next === o.id}
                    disabled={!answers.goal}
                    onClick={() => set("next", o.id)}
                    className={optionCls(answers.next === o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule bg-plate px-6 py-4">
            <button
              type="button"
              onClick={() => setAnswers({ location: "", goal: "", next: "" })}
              disabled={!answers.location}
              className="text-[13.5px] font-semibold text-mute underline underline-offset-4 transition-colors hover:text-navy disabled:opacity-40 disabled:no-underline"
            >
              Reset answers
            </button>
            <span className="micro-sm text-mute">
              {complete ? "Recommendation ready" : "Select an option in each question"}
            </span>
          </div>
        </div>

        {/* recommendation slip */}
        <div>
          {!complete ? (
            <div className="flex h-full min-h-[340px] flex-col justify-center border border-dashed border-navy/25 bg-white/60 p-8 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-white text-water">
                <IconCompass className="h-5 w-5" />
              </span>
              <p className="mt-5 font-display text-[17px] font-bold text-navy">
                Your recommendation appears here
              </p>
              <p className="mx-auto mt-2 max-w-[300px] text-[14px] leading-[1.65] text-mute">
                Answer all three questions to see the suggested starting point for your project.
              </p>
            </div>
          ) : (
            <div className="rise-in border border-navy bg-white">
              <div className="flex items-center justify-between bg-navy px-6 py-3.5">
                <span className="micro text-white">Recommendation</span>
                <span className="micro text-aqua tnum">REF {ref}</span>
              </div>

              <div className="p-6">
                <p className="micro-sm text-mute">Suggested starting category</p>
                <h3 className="mt-2.5 font-display text-[26px] font-extrabold leading-tight text-navy">
                  {category?.name}
                </h3>

                <dl className="mt-5 divide-y divide-rule border-y border-rule">
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="micro-sm text-mute">Application area</dt>
                    <dd className="text-right text-[14px] font-semibold text-navy">{application}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="micro-sm text-mute">Primary goal</dt>
                    <dd className="text-right text-[14px] font-semibold text-navy">
                      {Q2.find((o) => o.id === answers.goal)?.label}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3">
                    <dt className="micro-sm text-mute">Next step</dt>
                    <dd className="text-right text-[14px] font-semibold text-navy">
                      {Q3.find((o) => o.id === answers.next)?.label}
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-[14px] leading-[1.65] text-mute">
                  <span className="font-semibold text-navy">Where to begin:</span>{" "}
                  {START_POINTS[answers.goal]}
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  {answers.next === "guidance" ? (
                    <Btn onClick={() => open()} variant="primary" className="w-full">
                      Request expert guidance
                      <IconArrow />
                    </Btn>
                  ) : (
                    <Btn href={nextHref} variant="primary" className="w-full">
                      {answers.next === "compare" ? "Compare available systems" : "Browse products"}
                      <IconArrow />
                    </Btn>
                  )}
                  <Btn href={category?.href ?? "/products"} variant="outline" className="w-full">
                    View {category?.name ?? "category"}
                  </Btn>
                </div>

                <p className="mt-5 border-t border-rule pt-4 text-[12.5px] leading-[1.6] text-mute">
                  This is a directional suggestion based on your three answers. It is not a
                  calculation of technical suitability, and it does not confirm that a system meets
                  your water quality requirements. Selection may depend on water testing, flow
                  rate, capacity and application requirements.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------- commercial/industrial banner */

const AREAS = [
  { n: "01", label: "Commercial facilities", copy: "Offices, hospitality, retail and institutional sites." },
  { n: "02", label: "Industrial operations", copy: "Process water, manufacturing and plant duties." },
  { n: "03", label: "Municipal and infrastructure projects", copy: "Community supply and phased infrastructure works." },
];

export function ProjectBanner() {
  const { open } = useQuote();

  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 photo">
        <Image
          src="/images/banner-industrial.jpg"
          alt="Interior of a large water treatment plant with membrane racks and pressure vessels"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 55%" }}
        />
        <span className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/92 to-navy-deep/45" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-navy-deep/60" />
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 py-16 sm:px-8 lg:py-28 xl:pl-[108px] xl:pr-10">
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-8 hidden w-16 xl:block">
          <span className="absolute left-0 top-0 h-full w-px bg-white/20" />
          <span className="micro vertical-label absolute left-4 top-24 text-aqua">
            05 — PROJECTS
          </span>
        </div>

        <div className="max-w-[720px]">
          <Reveal>
            <Eyebrow tone="light">Consultative buying</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.3rem)] font-extrabold leading-[1.06] text-white">
              Water Treatment Solutions Built Around Your Operation
            </h2>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.75] text-white/75">
              From commercial filtration equipment to large-scale treatment systems, explore
              options designed around your application and operational requirements.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <ul className="mt-9 divide-y divide-white/15 border-y border-white/15">
              {AREAS.map((a) => (
                <li key={a.n} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="micro-sm w-7 shrink-0 text-aqua">{a.n}</span>
                  <span className="font-display text-[17px] font-bold text-white sm:w-[290px]">
                    {a.label}
                  </span>
                  <span className="text-[14.5px] leading-[1.6] text-white/65">{a.copy}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Btn onClick={() => open()} variant="primary" size="lg">
                Discuss Your Requirements
                <IconArrow />
              </Btn>
              <Btn href="/solutions/industrial-municipal" variant="outlineLight" size="lg">
                View large-scale solutions
              </Btn>
            </div>
            <p className="mt-4 text-[12.5px] text-white/50">
              Larger projects run through a quote request rather than direct checkout.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ why choose */

const REASONS = [
  {
    icon: IconLayers,
    title: "Solutions Across Multiple Scales",
    copy: "Explore products for residential, commercial, and large-scale applications.",
  },
  {
    icon: IconCompass,
    title: "Product Guidance",
    copy: "Get help understanding product options and choosing the right next step.",
  },
  {
    icon: IconList,
    title: "Straightforward Shopping",
    copy: "Clear product information, organized categories, and easy navigation.",
  },
  {
    icon: IconSupport,
    title: "Project-Based Support",
    copy: "Share your requirements for larger installations and custom treatment needs.",
  },
];

export function WhyChoose() {
  return (
    <Section index="06" label="WHY AQUAPURE" tone="white" className="py-16 lg:py-24">
      <Reveal>
        <div className="max-w-[640px]">
          <Eyebrow>Why choose our water solutions</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
            Built to be understood before it is bought
          </h2>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {REASONS.map((r, i) => (
          <Reveal key={r.title} delay={i * 70} className="h-full">
            <div className="flex h-full flex-col bg-white p-7 transition-colors duration-200 hover:bg-plate">
              <r.icon className="h-7 w-7 text-water" />
              <span className="micro-sm mt-6 text-water-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-navy">
                {r.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">{r.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------- category browser */

export function CategoryBrowser() {
  return (
    <Section index="07" label="CATEGORIES" tone="plate" className="py-16 lg:py-24">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Product category navigation</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
              Browse the full index
            </h2>
          </div>
          <p className="text-[15.5px] leading-[1.7] text-mute lg:pb-2">
            Eight categories covering point-of-use filters through to infrastructure-scale
            treatment. Each link opens a filtered view of the catalogue.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 border-t border-navy/15">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={Math.min(i, 5) * 50}>
            <Link
              href={c.href}
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-rule bg-white px-3 py-4 transition-colors duration-200 hover:bg-plate sm:gap-6 sm:px-5 sm:py-5"
            >
              <span className="micro w-7 shrink-0 text-water-deep tnum transition-colors group-hover:text-navy">
                {c.index}
              </span>

              <span className="min-w-0">
                <span className="block font-display text-[17px] font-extrabold leading-tight text-navy transition-transform duration-200 group-hover:translate-x-1 sm:text-[21px]">
                  {c.name}
                </span>
                <span className="mt-1.5 block max-w-[640px] text-[13.5px] leading-[1.55] text-mute">
                  {c.short}
                </span>
              </span>

              <span className="flex items-center gap-3 sm:gap-5">
                <span className="relative hidden h-[52px] w-[72px] shrink-0 overflow-hidden bg-plate photo sm:block">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule text-navy transition-colors duration-200 group-hover:border-water group-hover:bg-water group-hover:text-white">
                  <IconArrow className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-9">
        <Btn href="/products" variant="navy">
          Open the catalogue
          <IconArrow />
        </Btn>
      </div>
    </Section>
  );
}

/* --------------------------------------------------------------- guides */

export function ResourcesSection() {
  return (
    <Section index="08" label="GUIDES" tone="white" className="py-16 lg:py-24">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Educational resources</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
              Make a More Informed Water Treatment Decision
            </h2>
          </div>
          <p className="text-[15.5px] leading-[1.7] text-mute lg:pb-2">
            Sample editorial content covering residential, commercial and large-scale planning.
            Written as general guidance — no single treatment technology suits every supply.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {guides.map((g, i) => (
          <Reveal key={g.slug} delay={i * 80} className="h-full">
            <article className="group flex h-full flex-col border border-rule bg-white transition-colors duration-200 hover:border-navy/35">
              <Link href={`/resources/${g.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-plate photo">
                <Image
                  src={g.image}
                  alt={g.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-0 left-0 bg-white px-3 py-1.5 micro-sm text-navy">
                  {g.topic}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <span className="micro-sm text-mute">{g.readTime}</span>
                <h3 className="mt-3 font-display text-[19px] font-extrabold leading-tight text-navy">
                  <Link href={`/resources/${g.slug}`} className="underline-wipe inline">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">{g.excerpt}</p>
                <Link
                  href={`/resources/${g.slug}`}
                  className="mt-auto inline-flex items-center gap-2 pt-5 text-[13.5px] font-semibold text-water"
                >
                  Read Guide
                  <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}


