"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { money } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { Btn, IconClose, IconMinus, IconPlus, cx } from "@/components/ui";

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, count, setQty, remove, clear } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[95]">
      <div className="absolute inset-0 bg-navy-deep/55 fade-in" onClick={closeCart} aria-hidden />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="drawer-in absolute inset-y-0 right-0 flex w-[min(94vw,430px)] flex-col bg-white shadow-[-30px_0_70px_-40px_rgba(10,29,49,.6)]"
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <div>
            <span className="micro text-water">Cart</span>
            <h2 className="mt-1.5 font-display text-lg font-extrabold text-navy">
              {count} item{count === 1 ? "" : "s"}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-[6px] border border-rule p-2 text-navy transition-colors hover:bg-plate"
          >
            <IconClose />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-rule bg-plate text-navy">
              <IconPlus className="h-5 w-5 rotate-45" />
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-navy">Your cart is empty</h3>
            <p className="mt-2 max-w-[280px] text-[14px] leading-[1.6] text-mute">
              Add a directly purchasable product, or request a quote for larger systems.
            </p>
            <Btn href="/products" variant="primary" className="mt-6" onClick={closeCart}>
              Continue Shopping
            </Btn>
            <button
              type="button"
              onClick={() => {
                clear();
                closeCart();
              }}
              className="hidden"
            >
              clear
            </button>
          </div>
        ) : (
          <>
            <ul className="thin-scroll flex-1 divide-y divide-rule overflow-y-auto">
              {lines.map((line) => (
                <li key={line.product.id} className="flex gap-3.5 p-4">
                  <Link
                    href={`/products/${line.product.slug}`}
                    onClick={closeCart}
                    className="relative h-[74px] w-[74px] shrink-0 overflow-hidden bg-plate photo"
                  >
                    <Image
                      src={line.product.image}
                      alt={line.product.name}
                      fill
                      sizes="74px"
                      className="object-cover"
                      style={{ objectPosition: line.product.imagePosition ?? "center" }}
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${line.product.slug}`}
                        onClick={closeCart}
                        className="text-[14px] font-semibold leading-snug text-navy hover:text-water"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(line.product.id)}
                        aria-label={`Remove ${line.product.name} from cart`}
                        className="shrink-0 text-mute transition-colors hover:text-[#B03A2E]"
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="micro-sm mt-1.5 text-mute">{line.product.sku}</p>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <div className="flex items-center rounded-[5px] border border-rule">
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty - 1)}
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          className="px-2 py-1.5 text-navy transition-colors hover:bg-plate"
                        >
                          <IconMinus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[26px] text-center font-mono text-[13px] font-semibold text-navy tnum">
                          {line.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQty(line.product.id, line.qty + 1)}
                          aria-label={`Increase quantity of ${line.product.name}`}
                          className="px-2 py-1.5 text-navy transition-colors hover:bg-plate"
                        >
                          <IconPlus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-mono text-[14px] font-semibold text-navy tnum">
                        {money(line.lineTotal)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-rule bg-plate p-5">
              <div className="flex items-baseline justify-between">
                <span className="micro text-navy">Subtotal</span>
                <span className="font-mono text-xl font-semibold text-navy tnum">
                  {money(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-[12px] leading-[1.55] text-mute">
                Concept storefront — totals are illustrative. Shipping, tax and quote-based
                equipment are not included.
              </p>
              <div className="mt-4 grid gap-2">
                <Btn href="/checkout" variant="primary" className={cx("w-full")} onClick={closeCart}>
                  Proceed to Demo Checkout
                </Btn>
                <div className="grid grid-cols-2 gap-2">
                  <Btn href="/cart" variant="outline" size="sm" onClick={closeCart}>
                    View Cart
                  </Btn>
                  <Btn href="/products" variant="outline" size="sm" onClick={closeCart}>
                    Continue Shopping
                  </Btn>
                </div>
              </div>
              <div className="mt-3 border-t border-rule pt-3">
                <Btn onClick={clear} variant="quiet" size="sm" className="px-0">
                  Empty cart
                </Btn>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
