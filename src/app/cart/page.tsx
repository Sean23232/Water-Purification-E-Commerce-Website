"use client";

import Image from "next/image";
import Link from "next/link";
import { money } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { Btn, Eyebrow, IconArrow, IconClose, IconMinus, IconPlus } from "@/components/ui";

export default function CartPage() {
  const { lines, count, subtotal, setQty, remove, clear, openCart } = useCart();

  return (
    <>
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Shopping cart</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] text-navy">
              Your cart
            </h1>
            <p className="micro text-mute tnum">
              {count} item{count === 1 ? "" : "s"} · demo storefront
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          {lines.length === 0 ? (
            <div className="mx-auto max-w-[560px] border border-rule bg-plate px-6 py-14 text-center">
              <span className="micro text-water">Cart empty</span>
              <h2 className="mt-4 font-display text-2xl font-extrabold text-navy">
                Nothing in the cart yet
              </h2>
              <p className="mt-3 text-[15px] leading-[1.7] text-mute">
                Directly purchasable products will appear here. Larger systems are handled through
                a quote request instead of checkout.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Btn href="/products" variant="primary" size="lg">
                  Continue Shopping
                </Btn>
                <Btn href="/quote" variant="outline" size="lg">
                  Request a quote
                </Btn>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-12">
              <div>
                <div className="hidden grid-cols-[1fr_120px_110px_40px] gap-4 border-b border-navy/20 pb-3 sm:grid">
                  <span className="micro-sm text-mute">Product</span>
                  <span className="micro-sm text-mute">Quantity</span>
                  <span className="micro-sm text-right text-mute">Total</span>
                  <span className="sr-only">Remove</span>
                </div>

                <ul className="divide-y divide-rule">
                  {lines.map((line) => (
                    <li
                      key={line.product.id}
                      className="grid gap-4 py-5 sm:grid-cols-[1fr_120px_110px_40px] sm:items-center"
                    >
                      <div className="flex gap-4">
                        <Link
                          href={`/products/${line.product.slug}`}
                          className="relative h-[84px] w-[84px] shrink-0 overflow-hidden border border-rule bg-plate photo"
                        >
                          <Image
                            src={line.product.image}
                            alt={line.product.name}
                            fill
                            sizes="84px"
                            className="object-cover"
                            style={{ objectPosition: line.product.imagePosition ?? "center" }}
                          />
                        </Link>
                        <div className="min-w-0">
                          <span className="micro-sm text-mute">{line.product.sku}</span>
                          <Link
                            href={`/products/${line.product.slug}`}
                            className="mt-1.5 block font-display text-[16px] font-bold leading-snug text-navy hover:text-water"
                          >
                            {line.product.name}
                          </Link>
                          <p className="mt-1 text-[13.5px] text-mute tnum">
                            {money(line.product.price as number)} each
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(line.product.id)}
                            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-mute hover:text-[#B03A2E]"
                          >
                            <IconClose className="h-3.5 w-3.5" /> Remove
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-start rounded-[6px] border border-rule sm:justify-center">
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          className="px-3 py-2.5 text-navy hover:bg-plate"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[28px] text-center font-mono text-[14px] font-semibold text-navy tnum">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.product.name}`}
                          className="px-3 py-2.5 text-navy hover:bg-plate"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="text-left font-mono text-[16px] font-semibold text-navy tnum sm:text-right">
                        {money(line.lineTotal)}
                      </span>

                      <button
                        type="button"
                        onClick={() => remove(line.product.id)}
                        aria-label={`Remove ${line.product.name} from cart`}
                        className="hidden justify-self-end p-2 text-mute hover:text-[#B03A2E] sm:block"
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                  <Btn href="/products" variant="outline" size="sm">
                    <IconArrow className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Btn>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[13.5px] font-medium text-mute underline underline-offset-4 hover:text-[#B03A2E]"
                  >
                    Empty the cart
                  </button>
                </div>
              </div>

              <aside className="lg:sticky lg:top-[121px] lg:self-start">
                <div className="border border-rule">
                  <div className="border-b border-rule bg-navy px-5 py-3.5">
                    <span className="micro text-white">Order summary</span>
                  </div>
                  <div className="space-y-3 bg-white px-5 py-5">
                    <div className="flex items-baseline justify-between text-[14.5px]">
                      <span className="text-mute">Items ({count})</span>
                      <span className="font-mono font-medium text-navy tnum">
                        {money(subtotal)}
                      </span>
                    </div>
                    <div className="flex items-baseline justify-between text-[14.5px]">
                      <span className="text-mute">Shipping</span>
                      <span className="text-[13.5px] text-mute">Not calculated in this demo</span>
                    </div>
                    <div className="flex items-baseline justify-between text-[14.5px]">
                      <span className="text-mute">Tax</span>
                      <span className="text-[13.5px] text-mute">Not calculated in this demo</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-rule pt-4">
                      <span className="micro text-navy">Subtotal</span>
                      <span className="font-mono text-[24px] font-semibold text-navy tnum">
                        {money(subtotal)}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-rule bg-plate px-5 py-5">
                    <Btn href="/checkout" variant="primary" size="lg" className="w-full">
                      Proceed to Demo Checkout
                    </Btn>
                    <Btn href="/quote" variant="outline" size="sm" className="mt-2 w-full">
                      Request a quote for larger systems
                    </Btn>
                    <p className="mt-4 text-[12.5px] leading-[1.6] text-mute">
                      Concept storefront. Checkout is a demonstration — no payment details are
                      collected and no order is placed.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCart}
                  className="mt-4 w-full text-[13.5px] font-medium text-water underline underline-offset-4 hover:text-navy"
                >
                  Open the slide-out cart
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
