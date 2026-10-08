"use client";

import { useMemo, useState } from "react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Btn, Eyebrow, IconArrow, IconSearch, Reveal, cx } from "@/components/ui";

const APPLICATIONS = ["Residential", "Commercial", "Industrial", "Municipal"] as const;

const SORTS = [
  { id: "featured", label: "Sort: Default" },
  { id: "name-asc", label: "Name: A–Z" },
  { id: "name-desc", label: "Name: Z–A" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
];

export function Catalogue({
  initialCategory = "all",
  initialApplication = "all",
  initialQuery = "",
}: {
  initialCategory?: string;
  initialApplication?: string;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [application, setApplication] = useState(initialApplication);
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.short.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.application.toLowerCase().includes(q) ||
        p.category.replace(/-/g, " ").includes(q);
      const matchesCategory = category === "all" || p.category === category;
      const matchesApplication = application === "all" || p.application === application;
      return matchesQuery && matchesCategory && matchesApplication;
    });

    const sorted = [...list];
    if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "price-asc") sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") sorted.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return sorted;
  }, [query, category, application, sort]);

  const reset = () => {
    setQuery("");
    setCategory("all");
    setApplication("all");
    setSort("featured");
  };

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <>
      {/* header band */}
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-8 hidden w-16 xl:block" />
          <Eyebrow>Catalogue</Eyebrow>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] text-navy">
                {activeCategory ? activeCategory.name : "All Water Treatment Products"}
              </h1>
              <p className="mt-4 max-w-[620px] text-[15.5px] leading-[1.7] text-mute">
                {activeCategory
                  ? activeCategory.description
                  : "Sample catalogue spanning household drinking water filters, whole-home filtration, commercial equipment, and large-scale treatment systems. Search, filter and sort to narrow it down."}
              </p>
            </div>
            <p className="micro text-mute lg:text-right tnum">
              {visible.length} / {products.length} items shown
            </p>
          </div>
        </div>
      </section>

      {/* controls */}
      <section className="sticky top-[64px] z-30 border-b border-rule bg-white/95 backdrop-blur lg:top-[105px]">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-4 sm:px-8 xl:pl-[108px] xl:pr-10">
          <div className="grid gap-4 lg:grid-cols-[minmax(220px,1fr)_auto_auto] lg:items-center">
            <div className="flex items-center gap-3 border-b-2 border-navy pb-2">
              <IconSearch className="h-[18px] w-[18px] shrink-0 text-mute" />
              <label htmlFor="catalogue-search" className="sr-only">
                Search products
              </label>
              <input
                id="catalogue-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, applications, categories…"
                className="w-full bg-transparent text-[15px] font-medium text-navy placeholder:font-normal placeholder:text-mute focus:outline-none"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="micro-sm shrink-0 text-mute hover:text-navy"
                >
                  Clear
                </button>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="filter-category" className="micro-sm shrink-0 text-mute">
                Category
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="min-w-0 max-w-[210px] rounded-[6px] border border-rule bg-white px-3 py-2 text-[13.5px] font-medium text-navy focus:border-water focus:outline-none focus:ring-2 focus:ring-water/20"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {APPLICATIONS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setApplication(application === a ? "all" : a)}
                  aria-pressed={application === a}
                  className={cx(
                    "rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150",
                    application === a
                      ? "border-navy bg-navy text-white"
                      : "border-rule bg-white text-mute hover:border-navy/40 hover:text-navy",
                  )}
                >
                  {a}
                </button>
              ))}
              <label htmlFor="catalogue-sort" className="sr-only">
                Sort products
              </label>
              <select
                id="catalogue-sort"
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
        </div>
      </section>

      {/* results */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          {visible.length === 0 ? (
            <div className="border border-rule bg-plate p-10 text-center sm:p-14">
              <span className="micro text-water">No matches</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-navy">
                Nothing matches those filters
              </h2>
              <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.65] text-mute">
                Try a broader search term, or clear the filters to see the full sample catalogue of{" "}
                {products.length} products.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Btn variant="primary" onClick={reset}>
                  Clear all filters
                </Btn>
                <Btn href="/quote" variant="outline">
                  Ask for a recommendation
                </Btn>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="micro-sm text-mute">Active filters</span>
                {category !== "all" ? (
                  <button
                    type="button"
                    onClick={() => setCategory("all")}
                    className="rounded-full bg-plate px-3 py-1.5 text-[12.5px] font-semibold text-navy hover:bg-plate-deep"
                  >
                    {activeCategory?.name} ✕
                  </button>
                ) : null}
                {application !== "all" ? (
                  <button
                    type="button"
                    onClick={() => setApplication("all")}
                    className="rounded-full bg-plate px-3 py-1.5 text-[12.5px] font-semibold text-navy hover:bg-plate-deep"
                  >
                    {application} ✕
                  </button>
                ) : null}
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-full bg-plate px-3 py-1.5 text-[12.5px] font-semibold text-navy hover:bg-plate-deep"
                  >
                    “{query}” ✕
                  </button>
                ) : null}
                {category === "all" && application === "all" && !query ? (
                  <span className="text-[13px] text-mute">None — showing everything</span>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {visible.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 4) * 60} className="h-full">
                    <ProductCard product={p} index={i} />
                  </Reveal>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 grid gap-5 border-t border-rule pt-8 sm:grid-cols-3">
            <div>
              <span className="micro text-water">Direct purchase</span>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-mute">
                Household products show a sample price and can be added to the demo cart.
              </p>
            </div>
            <div>
              <span className="micro text-water">Quote based</span>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-mute">
                Commercial, industrial and municipal equipment is quoted against the project.
              </p>
            </div>
            <div>
              <span className="micro text-water">Scalable data</span>
              <p className="mt-2.5 text-[14px] leading-[1.6] text-mute">
                Products and categories come from one catalogue file, ready to be swapped for a
                commerce backend.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


