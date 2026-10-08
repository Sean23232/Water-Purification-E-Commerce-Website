"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProduct, getCategory, money, products, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { useQuote } from "@/components/QuoteForm";
import { ProductCard } from "@/components/ProductCard";
import { Btn, IconArrow, IconMinus, IconPlus, Reveal, cx } from "@/components/ui";

function Gallery({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const others = products.filter((p) => p.id !== product.id && p.category === product.category);
  const shots = [
    { src: product.image, position: product.imagePosition ?? "center", label: "Primary" },
    { src: others[0]?.image ?? category?.image ?? product.image, position: "center", label: "In situ" },
    {
      src: others[1]?.image ?? category?.image ?? product.image,
      position: "center 40%",
      label: "Detail",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden border border-rule bg-plate photo">
        <Image
          src={shots[active].src}
          alt={`${product.name} — ${shots[active].label.toLowerCase()} view`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover"
          style={{ objectPosition: shots[active].position }}
        />
        <span className="absolute left-0 top-0 bg-navy px-2.5 py-1.5 micro-sm text-white">
          {product.application}
        </span>
        <span className="absolute bottom-3 right-3 bg-white/92 px-2.5 py-1.5 micro-sm text-navy tnum">
          Fig. {String(active + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        {shots.map((s, i) => (
          <button
            key={`${s.src}-${i}`}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-pressed={active === i}
            className={cx(
              "relative aspect-[4/3] overflow-hidden border bg-plate photo transition-colors duration-150",
              active === i ? "border-water" : "border-rule hover:border-navy/40",
            )}
          >
            <Image
              src={s.src}
              alt=""
              fill
              sizes="160px"
              className="object-cover"
              style={{ objectPosition: s.position }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const product = getProduct(slug);
  const { add } = useCart();
  const { open } = useQuote();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const category = getCategory(product.category);
  const isQuote = product.priceKind === "quote";
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    add(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <>
      <section className="border-b border-rule bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 pt-7 sm:px-8 xl:pl-[108px] xl:pr-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px]">
            <Link href="/" className="text-mute hover:text-water">
              Home
            </Link>
            <span className="text-rule">/</span>
            <Link href="/products" className="text-mute hover:text-water">
              Products
            </Link>
            <span className="text-rule">/</span>
            <Link href={`/products?category=${product.category}`} className="text-mute hover:text-water">
              {category?.name}
            </Link>
            <span className="text-rule">/</span>
            <span className="font-medium text-navy">{product.name}</span>
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-14 lg:py-14 xl:pl-[108px] xl:pr-10">
          <div className="lg:sticky lg:top-[121px] lg:self-start">
            <Gallery product={product} />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <span className="micro text-water">{product.application}</span>
              <span className="h-px flex-1 bg-rule" />
              <span className="micro-sm text-mute">{product.sku}</span>
            </div>

            <h1 className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-extrabold leading-[1.1] text-navy">
              {product.name}
            </h1>

            <p className="mt-4 text-[16px] leading-[1.75] text-mute">{product.description}</p>

            <div className="mt-7 border border-rule">
              <div className="flex items-baseline justify-between gap-4 border-b border-rule bg-plate px-5 py-4">
                <span className="micro text-navy">{isQuote ? "Pricing" : "Unit price"}</span>
                <span
                  className={cx(
                    "font-mono font-semibold text-navy tnum",
                    isQuote ? "text-[17px] text-water" : "text-[28px]",
                  )}
                >
                  {isQuote ? (product.quoteLabel ?? "Quote Required") : money(product.price as number)}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4 px-5 py-3.5">
                <span className="micro-sm text-mute">Availability</span>
                <span className="text-right text-[13.5px] font-medium text-navy">
                  {product.availability}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isQuote ? (
                <Btn onClick={() => open(product.name)} variant="navy" size="lg">
                  Request a Quote
                  <IconArrow />
                </Btn>
              ) : (
                <>
                  <div className="flex h-[54px] items-center rounded-[6px] border border-rule">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="px-3.5 text-navy transition-colors hover:bg-plate"
                    >
                      <IconMinus className="h-4 w-4" />
                    </button>
                    <label htmlFor="detail-qty" className="sr-only">
                      Quantity
                    </label>
                    <input
                      id="detail-qty"
                      type="number"
                      min={1}
                      max={99}
                      value={qty}
                      onChange={(e) => setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
                      className="w-11 bg-transparent text-center font-mono text-[15px] font-semibold text-navy tnum focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(99, q + 1))}
                      aria-label="Increase quantity"
                      className="px-3.5 text-navy transition-colors hover:bg-plate"
                    >
                      <IconPlus className="h-4 w-4" />
                    </button>
                  </div>
                  <Btn onClick={onAdd} variant="primary" size="lg">
                    {added ? "Added to cart ✓" : `Add to Cart — ${money((product.price as number) * qty)}`}
                  </Btn>
                </>
              )}
              <Btn href="/quote" variant="outline" size="lg">
                Ask a question
              </Btn>
            </div>

            <p className="mt-4 text-[12.5px] leading-[1.6] text-mute">
              Sample product record — pricing and availability are placeholders for this concept
              build.
            </p>

            {/* specs */}
            <div className="mt-9">
              <div className="flex items-center gap-3">
                <span className="micro text-navy">Specification</span>
                <span className="h-px flex-1 bg-rule" />
              </div>
              <table className="mt-4 w-full border-collapse text-left">
                <caption className="sr-only">Specifications for {product.name}</caption>
                <tbody>
                  {product.specs.map((s, i) => (
                    <tr
                      key={s.label}
                      className={cx("border-b border-rule", i % 2 === 1 && "bg-plate/60")}
                    >
                      <th
                        scope="row"
                        className="w-[45%] py-3 pr-4 align-top text-[13px] font-medium text-mute"
                      >
                        {s.label}
                      </th>
                      <td className="py-3 align-top text-[14px] font-medium text-navy">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-[12.5px] leading-[1.6] text-mute">
                Sample specification data for demonstration. Replace with manufacturer data before
                publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* cross links */}
      <section className="border-t border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 xl:pl-[108px] xl:pr-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="border border-rule bg-white p-6">
              <span className="micro text-water">Scale</span>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                Products are organised from household point-of-use filters through to
                infrastructure-scale treatment equipment.
              </p>
              <Btn href="/products" variant="outline" size="sm" className="mt-5">
                Browse all products
              </Btn>
            </div>
            <div className="border border-rule bg-white p-6">
              <span className="micro text-water">Category</span>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                You are viewing the {category?.name ?? "product"} category —{" "}
                {category?.short ?? ""}
              </p>
              <Btn href={category?.href ?? "/products"} variant="outline" size="sm" className="mt-5">
                View category
              </Btn>
            </div>
            <div className="border border-rule bg-white p-6">
              <span className="micro text-water">Not sure?</span>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mute">
                Answer three questions and get a directional starting point for your project.
              </p>
              <Btn href="/#solution-finder" variant="outline" size="sm" className="mt-5">
                Open solution finder
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 xl:pl-[108px] xl:pr-10">
          <div className="flex items-end justify-between gap-6 border-b border-rule pb-5">
            <h2 className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-extrabold text-navy">
              Related products
            </h2>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-water hover:text-navy"
            >
              View all <IconArrow className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 60} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
