"use client";

import Image from "next/image";
import Link from "next/link";
import { money, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { Btn, cx } from "@/components/ui";

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const { add } = useCart();
  const isQuote = product.priceKind === "quote";

  return (
    <article className="group relative flex h-full flex-col border border-rule bg-white transition-colors duration-200 hover:border-navy/30">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-plate photo"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ objectPosition: product.imagePosition ?? "center" }}
        />
        <span className="absolute left-0 top-0 bg-navy px-2.5 py-1.5 micro-sm text-white">
          {product.application}
        </span>
        {isQuote ? (
          <span className="absolute right-0 top-0 bg-white/95 px-2.5 py-1.5 micro-sm text-navy">
            Quote Based
          </span>
        ) : null}
        {typeof index === "number" ? (
          <span className="absolute bottom-2 left-2 micro-sm text-navy/45 tnum">
            {String(index + 1).padStart(2, "0")}
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="micro-sm text-mute">{product.sku}</p>

        <h3 className="mt-3 font-display text-[17px] font-bold leading-[1.25] text-navy">
          <Link href={`/products/${product.slug}`} className="underline-wipe inline">
            {product.name}
          </Link>
        </h3>

        <div className="mt-4 flex items-baseline justify-between gap-3 border-y border-rule py-2.5">
          <span className="micro-sm text-mute">{isQuote ? "Pricing" : "Price"}</span>
          <span
            className={cx(
              "font-mono font-semibold tnum",
              isQuote ? "text-[13px] tracking-[0.04em] text-water" : "text-[17px] text-navy",
            )}
          >
            {isQuote ? (product.quoteLabel ?? "Quote Required") : money(product.price as number)}
          </span>
        </div>

        <p className="mt-3 text-[13.5px] leading-[1.6] text-mute">{product.short}</p>

        <div className="mt-auto flex flex-col gap-2 pt-5">
          <Btn href={`/products/${product.slug}`} variant="outline" size="sm" className="w-full">
            View Details
          </Btn>
          {isQuote ? (
            <Btn href={`/quote?product=${product.slug}`} variant="navy" size="sm" className="w-full">
              Request a Quote
            </Btn>
          ) : (
            <Btn onClick={() => add(product.id)} variant="primary" size="sm" className="w-full">
              Add to Cart
            </Btn>
          )}
        </div>
      </div>
    </article>
  );
}
