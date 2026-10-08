"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, products } from "@/lib/catalog";
import { useQuote } from "@/components/QuoteForm";
import { ProductCard } from "@/components/ProductCard";
import { Btn, Eyebrow, IconArrow, Reveal, Section, cx } from "@/components/ui";

/* --------------------------------------------------------------- hero */

const BENEFITS = [
  { n: "01", label: "Solutions for Every Scale" },
  { n: "02", label: "Residential to Industrial" },
  { n: "03", label: "Help Choosing the Right System" },
];

export function Hero() {
  const { open } = useQuote();

  return (
    <section className="relative overflow-hidden border-b border-rule bg-white">
      {/* right image plane — bleeds to the viewport edge */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46vw] max-w-[860px] photo lg:block">
        <Image
          src="/images/hero.jpg"
          alt="Modern water filtration equipment including stainless filter housings and a reverse osmosis unit"
          fill
          sizes="50vw"
          priority
          className="object-cover"
          style={{ objectPosition: "62% center" }}
        />
        <span className="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/55 via-40% to-transparent to-85%" />
        <span className="absolute inset-0 bg-gradient-to-t from-navy/12 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-[1360px] px-5 pb-14 pt-14 sm:px-8 lg:pb-24 lg:pt-24 xl:pl-[108px] xl:pr-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-8 hidden w-16 xl:block"
        >
          <span className="absolute left-0 top-0 h-full w-px bg-rule" />
          <span className="micro vertical-label absolute left-4 top-24 text-mute">
            01 — OVERVIEW
          </span>
        </div>

        <div className="lg:max-w-[50%] xl:max-w-[54%]">
          <Reveal>
            <Eyebrow>WATER PURIFICATION MADE SIMPLE</Eyebrow>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-navy text-[clamp(2.35rem,6vw,4.35rem)]">
              Cleaner Water.
              <br />
              Smarter Solutions.
              <br />
              <span className="text-water">Every Scale.</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-6 max-w-[540px] text-[16.5px] leading-[1.7] text-mute sm:text-[17.5px]">
              Discover dependable water purification products and treatment systems for your home,
              business, or large-scale operation.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Btn href="/products" size="lg" variant="primary">
                Shop Water Products
              </Btn>
              <Btn href="/solutions/residential" size="lg" variant="outline">
                Explore Treatment Solutions
              </Btn>
            </div>
            <button
              type="button"
              onClick={() => open()}
              className="mt-5 inline-flex items-center gap-2 text-[14.5px] font-semibold text-navy underline decoration-aqua decoration-2 underline-offset-[6px] transition-colors hover:text-water"
            >
              Need a custom system? Talk to our team.
              <IconArrow className="h-4 w-4" />
            </button>
          </Reveal>

          <Reveal delay={260}>
            <dl className="mt-12 grid gap-px border-t border-rule bg-rule sm:grid-cols-3">
              {BENEFITS.map((b) => (
                <div key={b.n} className="bg-white px-0 py-5 sm:px-4 sm:first:pl-0">
                  <dt className="micro-sm text-water-deep">{b.n}</dt>
                  <dd className="mt-2 text-[14.5px] font-semibold leading-snug text-navy">
                    {b.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>

      {/* mobile / tablet image */}
      <div className="relative h-[260px] w-full photo sm:h-[340px] lg:hidden">
        <Image
          src="/images/hero.jpg"
          alt="Modern water filtration equipment including stainless filter housings and a reverse osmosis unit"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% center" }}
        />
        <span className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}

/* --------------------------------------------------- shop by application */

const APPLICATION_CARDS = [
  {
    n: "01",
    title: "Home Water Purification",
    description:
      "Find practical filtration solutions for drinking water, kitchens, and whole-home applications.",
    cta: "Shop Home Systems",
    href: "/products?application=Residential",
    image: "/images/cat-residential.jpg",
    alt: "Under-sink reverse osmosis filtration equipment installed in a kitchen cabinet",
    accent: "bg-aqua",
    position: "center 55%",
  },
  {
    n: "02",
    title: "Commercial Water Systems",
    description:
      "Explore water treatment equipment for offices, hospitality, retail, and business operations.",
    cta: "Explore Commercial",
    href: "/solutions/commercial",
    image: "/images/cat-commercial.jpg",
    alt: "Stainless steel commercial filtration skid with gauges and valves in a mechanical room",
    accent: "bg-water",
    position: "center",
  },
  {
    n: "03",
    title: "Industrial & Municipal",
    description:
      "Discover scalable treatment equipment for demanding industrial and large-scale water applications.",
    cta: "View Large-Scale Solutions",
    href: "/solutions/industrial-municipal",
    image: "/images/cat-industrial.jpg",
    alt: "Industrial water treatment pipework and pressure vessels along a concrete wall",
    accent: "bg-navy",
    position: "center",
  },
];

export function ApplicationCards() {
  return (
    <Section id="applications" index="02" label="APPLICATIONS" tone="plate" className="py-16 lg:py-24">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Shop by application</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
              Start where your water is used
            </h2>
          </div>
          <p className="text-[15.5px] leading-[1.7] text-mute lg:pb-2">
            Three routes into the catalogue. Each one leads to the products, specifications and
            buying path that fits the scale of the job — from a single tap to a full treatment
            plant.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {APPLICATION_CARDS.map((card, i) => (
          <Reveal key={card.n} delay={i * 80} className="h-full">
            <Link
              href={card.href}
              className="group flex h-full flex-col border border-rule bg-white transition-all duration-200 hover:border-navy/35 hover:shadow-[0_18px_40px_-28px_rgba(16,43,70,.55)]"
            >
              <span className={cx("block h-[3px] w-full", card.accent)} aria-hidden />
              <div className="relative aspect-[16/11] overflow-hidden bg-plate photo">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  style={{ objectPosition: card.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="micro-sm text-mute">{card.n}</span>
                <h3 className="mt-3 font-display text-[21px] font-extrabold leading-tight text-navy">
                  {card.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">{card.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-rule pt-4 text-[13.5px] font-semibold text-water">
                  {card.cta}
                  <IconArrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------ featured products */

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "name-asc", label: "Name A–Z" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

export function FeaturedProducts() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const categoryOptions = useMemo(() => {
    const used = new Set(products.map((p) => p.category));
    return categories.filter((c) => used.has(c.slug));
  }, []);

  const visible = useMemo(() => {
    let list = products.filter((p) => p.featured);
    if (category !== "all") list = products.filter((p) => p.category === category);
    const sorted = [...list];
    if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "price-asc")
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc")
      sorted.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return sorted;
  }, [category, sort]);

  return (
    <Section id="products" index="03" label="PRODUCTS" tone="white" className="py-16 lg:py-24">
      <Reveal>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>Featured equipment</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.85rem)] font-extrabold leading-[1.1] text-navy">
              Explore Water Purification Products
            </h2>
            <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.7] text-mute">
              Browse solutions for everyday drinking water, whole-home filtration, and advanced
              treatment needs.
            </p>
          </div>
          <p className="micro text-mute lg:text-right">
            {visible.length} of {products.length} sample items
          </p>
        </div>
      </Reveal>

      {/* filter + sort bar */}
      <div className="mt-9 flex flex-col gap-4 border-y border-rule py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="micro-sm mr-1 hidden text-mute sm:inline">Filter</span>
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={cx(
              "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150",
              category === "all"
                ? "border-navy bg-navy text-white"
                : "border-rule bg-white text-mute hover:border-navy/40 hover:text-navy",
            )}
          >
            Featured
          </button>
          {categoryOptions.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={cx(
                "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150",
                category === c.slug
                  ? "border-navy bg-navy text-white"
                  : "border-rule bg-white text-mute hover:border-navy/40 hover:text-navy",
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-products" className="micro-sm shrink-0 text-mute">
            Sort
          </label>
          <select
            id="sort-products"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-[6px] border border-rule bg-white px-3 py-2 text-[13.5px] font-medium text-navy focus:border-water focus:outline-none focus:ring-2 focus:ring-water/20"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="mt-8 border border-rule bg-plate p-10 text-center">
          <p className="font-display text-lg font-bold text-navy">No products in this category yet</p>
          <p className="mt-2 text-[14.5px] text-mute">
            The catalogue is structured so new products and categories can be added at any time.
          </p>
          <Btn variant="outline" className="mt-5" onClick={() => setCategory("all")}>
            Show featured products
          </Btn>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 70} className="h-full">
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Btn href="/products" variant="navy" size="lg">
          View All Products
          <IconArrow />
        </Btn>
      </div>
    </Section>
  );
}
