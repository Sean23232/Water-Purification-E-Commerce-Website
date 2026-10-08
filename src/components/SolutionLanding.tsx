"use client";

import Image from "next/image";
import { products, type Product } from "@/lib/catalog";
import { useQuote } from "@/components/QuoteForm";
import { ProductCard } from "@/components/ProductCard";
import { Btn, Eyebrow, IconArrow, Reveal, cx } from "@/components/ui";

type Block = { n: string; title: string; copy: string };

interface Config {
  index: string;
  rail: string;
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  tone: "light" | "dark";
  coversTitle: string;
  covers: Block[];
  processTitle: string;
  process: Block[];
  filter: (p: Product) => boolean;
  productsTitle: string;
  productsIntro: string;
  note: string;
  ctaTitle: string;
  ctaCopy: string;
  ctaPrimary: string;
}

const CONFIGS: Record<string, Config> = {
  residential: {
    index: "01",
    rail: "RESIDENTIAL",
    eyebrow: "Home water systems",
    title: "Residential Water Solutions",
    intro:
      "Practical filtration and treatment for the water you drink, cook with and use at home — from a single under-sink unit to whole-property equipment at the main line.",
    image: "/images/cat-residential.jpg",
    imageAlt: "Under-sink reverse osmosis filtration equipment installed in a kitchen cabinet",
    tone: "light",
    coversTitle: "What this covers",
    covers: [
      {
        n: "01",
        title: "Drinking water at a single tap",
        copy: "Point-of-use filters and reverse osmosis units installed under the sink or on the counter.",
      },
      {
        n: "02",
        title: "Water used across the property",
        copy: "Central filtration fitted at the main supply line for showers, laundry and appliances.",
      },
      {
        n: "03",
        title: "Conditioning and maintenance",
        copy: "Softening equipment where hardness or scale is a concern, plus replacement cartridges.",
      },
    ],
    processTitle: "A straightforward way to buy at home",
    process: [
      { n: "01", title: "Identify the tap or the property", copy: "Decide whether you need filtered water at one fixture or across the whole supply." },
      { n: "02", title: "Check the space and the plumbing", copy: "Cabinet depth, available outlets and the existing pipework determine what fits." },
      { n: "03", title: "Order or ask", copy: "Household products can be purchased directly; anything unclear can go through a quote request." },
    ],
    filter: (p) => p.application === "Residential",
    productsTitle: "Residential products",
    productsIntro: "Sample household products available for direct purchase in this concept store.",
    note: "Household water conditions vary. Consider a water test and the installation space before selecting equipment — no single system suits every supply.",
    ctaTitle: "Not sure which home system fits?",
    ctaCopy: "Answer three questions and we will point you to the right part of the catalogue.",
    ctaPrimary: "Open the solution finder",
  },
  commercial: {
    index: "02",
    rail: "COMMERCIAL",
    eyebrow: "Commercial solutions",
    title: "Commercial Water Systems",
    intro:
      "Filtration and treatment equipment for offices, hospitality, retail, food service and business operations — sized against your flow, your hours and your site.",
    image: "/images/cat-commercial.jpg",
    imageAlt: "Stainless steel commercial filtration skid with pressure gauges in a mechanical room",
    tone: "light",
    coversTitle: "Where commercial systems are used",
    covers: [
      { n: "01", title: "Workplaces and offices", copy: "Point-of-use and centrally installed equipment for staff and visitor amenities." },
      { n: "02", title: "Hospitality and food service", copy: "Equipment considered for kitchens, beverage lines and high daily turnover." },
      { n: "03", title: "Retail and light process", copy: "Pre-filtration and treatment ahead of equipment that is sensitive to supply conditions." },
    ],
    processTitle: "How a commercial project runs",
    process: [
      { n: "01", title: "Share the demand", copy: "Peak flow, operating hours and the number of outlets served shape the equipment." },
      { n: "02", title: "Review the site", copy: "Plant space, access for service, incoming supply and existing equipment are confirmed." },
      { n: "03", title: "Receive a quote", copy: "Commercial equipment is quoted against the application rather than sold at list price." },
      { n: "04", title: "Install and maintain", copy: "Service access and cartridge handling are part of the specification, not an afterthought." },
    ],
    filter: (p) => p.application === "Commercial",
    productsTitle: "Commercial products",
    productsIntro: "Heavy-duty equipment quoted per project, plus directly purchasable spares.",
    note: "System selection depends on flow rate, duty cycle, available space and the water itself. Nothing here confirms suitability for a specific site.",
    ctaTitle: "Planning a commercial installation?",
    ctaCopy: "Send the demand, the site and the timeline — we will come back with a scoped quote request.",
    ctaPrimary: "Discuss Your Requirements",
  },
  "industrial-municipal": {
    index: "03",
    rail: "INDUSTRIAL & MUNICIPAL",
    eyebrow: "Industrial & municipal",
    title: "Industrial & Municipal Solutions",
    intro:
      "Scalable treatment equipment for industrial operations, infrastructure projects and municipal applications — developed as a scoped project rather than an off-the-shelf purchase.",
    image: "/images/cat-industrial.jpg",
    imageAlt: "Industrial water treatment pipework, valves and pressure vessels along a concrete wall",
    tone: "dark",
    coversTitle: "Applications we build around",
    covers: [
      { n: "01", title: "Industrial operations", copy: "Process and operational water duties at higher volumes and continuous duty cycles." },
      { n: "02", title: "Municipal applications", copy: "Community-scale treatment considered against the project brief and phasing." },
      { n: "03", title: "Infrastructure projects", copy: "Sectioned, containerised or site-built arrangements integrated with existing assets." },
    ],
    processTitle: "How a large project is structured",
    process: [
      { n: "01", title: "Brief and data", copy: "Capacity, flow rate, feed conditions and application requirements are collected." },
      { n: "02", title: "Configuration", copy: "Staging, redundancy and site integration are worked through with your project team." },
      { n: "03", title: "Scope and quote", copy: "Equipment schedule, documentation and phasing are quoted against the agreed scope." },
      { n: "04", title: "Delivery and handover", copy: "Sectioned delivery, installation support and operating documentation are scheduled." },
    ],
    filter: (p) => p.application === "Industrial" || p.application === "Municipal",
    productsTitle: "Large-scale equipment",
    productsIntro: "Representative industrial and municipal equipment — every item is quote based.",
    note: "Final configuration is developed against the project brief, applicable standards and site-specific water data. This page does not confirm technical suitability.",
    ctaTitle: "Have a project to scope?",
    ctaCopy: "Share the requirements you already have. Incomplete briefs are welcome — that is what the conversation is for.",
    ctaPrimary: "Discuss Your Requirements",
  },
};

export function SolutionLanding({ variant }: { variant: keyof typeof CONFIGS }) {
  const c = CONFIGS[variant];
  const { open } = useQuote();
  const list = products.filter(c.filter).slice(0, 6);
  const dark = c.tone === "dark";

  return (
    <>
      {/* hero */}
      <section className={cx("relative overflow-hidden", dark ? "bg-navy-deep" : "bg-plate")}>
        <div className="absolute inset-0 photo">
          <Image
            src={c.image}
            alt={c.imageAlt}
            fill
            sizes="100vw"
            priority
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
          <span
            className={cx(
              "absolute inset-0",
              dark
                ? "bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/40"
                : "bg-gradient-to-r from-white via-white/92 to-white/45",
            )}
          />
          <span className={cx("absolute inset-0", dark ? "bg-navy-deep/35" : "bg-plate/25")} />
        </div>

        <div className="relative mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-24 xl:pl-[108px] xl:pr-10">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-8 hidden w-16 xl:block">
            <span className={cx("absolute left-0 top-0 h-full w-px", dark ? "bg-white/20" : "bg-navy/15")} />
            <span
              className={cx(
                "micro vertical-label absolute left-4 top-24",
                dark ? "text-aqua" : "text-mute",
              )}
            >
              {c.index} — {c.rail}
            </span>
          </div>

          <div className="max-w-[640px]">
            <Eyebrow tone={dark ? "light" : "default"}>{c.eyebrow}</Eyebrow>
            <h1
              className={cx(
                "mt-6 font-display text-[clamp(2.1rem,4.4vw,3.5rem)] font-extrabold leading-[1.05]",
                dark ? "text-white" : "text-navy",
              )}
            >
              {c.title}
            </h1>
            <p
              className={cx(
                "mt-5 max-w-[560px] text-[16px] leading-[1.75]",
                dark ? "text-white/75" : "text-mute",
              )}
            >
              {c.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Btn
                onClick={() => open()}
                variant={dark ? "primary" : "navy"}
                size="lg"
              >
                {c.ctaPrimary}
                <IconArrow />
              </Btn>
              <Btn href="/products" variant={dark ? "outlineLight" : "outline"} size="lg">
                Browse all products
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* covers */}
      <section className={cx("border-b border-rule", dark ? "bg-white" : "bg-white")}>
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <Eyebrow>{c.coversTitle}</Eyebrow>
            </div>
            <div className="grid gap-px bg-rule sm:grid-cols-3">
              {c.covers.map((b, i) => (
                <Reveal key={b.n} delay={i * 70} className="h-full">
                  <div className="h-full bg-white p-6">
                    <span className="micro text-water-deep tnum">{b.n}</span>
                    <h3 className="mt-3 font-display text-[17px] font-bold leading-snug text-navy">
                      {b.title}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-[1.65] text-mute">{b.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* products */}
      <section className="bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Products for this application</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold leading-[1.1] text-navy">
                {c.productsTitle}
              </h2>
              <p className="mt-4 max-w-[540px] text-[15.5px] leading-[1.7] text-mute">
                {c.productsIntro}
              </p>
            </div>
            <p className="micro text-mute lg:text-right tnum">{list.length} items</p>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 70} className="h-full">
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 border-l-2 border-aqua bg-white p-5">
            <p className="text-[13.5px] leading-[1.65] text-mute">{c.note}</p>
          </div>
        </div>
      </section>

      {/* process */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <Eyebrow>{c.processTitle}</Eyebrow>
          <div className="mt-8 border-t border-navy/15">
            {c.process.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="grid grid-cols-[auto_1fr] gap-4 border-b border-rule py-6 sm:grid-cols-[auto_minmax(180px,260px)_1fr] sm:gap-8">
                  <span className="micro text-water tnum">{s.n}</span>
                  <h3 className="font-display text-[17px] font-bold leading-snug text-navy sm:text-[19px]">
                    {s.title}
                  </h3>
                  <p className="col-span-2 text-[14.5px] leading-[1.65] text-mute sm:col-span-1">
                    {s.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-navy">
        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:py-16 xl:pl-[108px] xl:pr-10">
          <div className="max-w-[620px]">
            <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-extrabold leading-tight text-white">
              {c.ctaTitle}
            </h2>
            <p className="mt-3 text-[15.5px] leading-[1.7] text-white/70">{c.ctaCopy}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn onClick={() => open()} variant="primary" size="lg">
              {c.ctaPrimary}
              <IconArrow />
            </Btn>
            <Btn href="/#solution-finder" variant="outlineLight" size="lg">
              Solution finder
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
