"use client";

import { useState, type FormEvent } from "react";
import { money } from "@/lib/catalog";
import { useCart } from "@/lib/store";
import { Btn, Eyebrow, IconCheck, cx } from "@/components/ui";

const inputCls =
  "w-full rounded-[6px] border border-rule bg-white px-3.5 py-3 text-[14.5px] text-ink placeholder:text-mute/70 transition-colors hover:border-navy/30 focus:border-water focus:outline-none focus:ring-2 focus:ring-water/25";

export default function CheckoutPage() {
  const { lines, count, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<{ name?: string; email?: string }>({});

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = "Enter the name for this demonstration order.";
    if (!email.trim()) next.email = "Enter an email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    setError(next);
    if (Object.keys(next).length) return;
    setPlaced(`DEMO-${Math.floor(10000 + Math.random() * 90000)}`);
    clear();
  };

  if (placed) {
    return (
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[760px] px-5 py-20 sm:px-8">
          <div className="rise-in border border-rule bg-plate p-8 sm:p-12">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white">
              <IconCheck className="h-6 w-6" />
            </span>
            <span className="micro mt-6 block text-water">Demo checkout complete</span>
            <h1 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight text-navy">
              No order was placed
            </h1>
            <p className="mt-4 text-[16px] leading-[1.75] text-mute">
              This is a front-end concept. Your details were validated locally in the browser and
              nothing was transmitted — no order exists, no payment was taken, and no sales or
              fulfilment team has been notified.
            </p>
            <dl className="mt-7 grid gap-px border border-rule bg-rule sm:grid-cols-2">
              <div className="bg-white p-4">
                <dt className="micro-sm text-mute">Demonstration reference</dt>
                <dd className="mt-2 font-mono text-[15px] font-semibold text-navy tnum">{placed}</dd>
              </div>
              <div className="bg-white p-4">
                <dt className="micro-sm text-mute">Cart</dt>
                <dd className="mt-2 text-[15px] font-medium text-navy">Cleared</dd>
              </div>
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Btn href="/products" variant="primary" size="lg">
                Continue Shopping
              </Btn>
              <Btn href="/quote" variant="outline" size="lg">
                Request a system quote
              </Btn>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Checkout — concept build</Eyebrow>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
            <div>
              <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] text-navy">
                Demo checkout
              </h1>
              <p className="mt-4 max-w-[560px] text-[15.5px] leading-[1.7] text-mute">
                This page demonstrates the checkout step of the storefront. It does not process
                payments and does not create an order.
              </p>
            </div>
            <div className="border-l-2 border-aqua bg-white p-5">
              <p className="text-[13.5px] leading-[1.7] text-mute">
                <strong className="text-navy">Payment details are intentionally not collected.</strong>{" "}
                No card number, expiry or security code field exists anywhere in this concept, and
                no personal information leaves your browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14 lg:py-16 xl:pl-[108px] xl:pr-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="micro text-navy">01 — Contact for this demonstration</span>
              <span className="h-px flex-1 bg-rule" />
            </div>

            {lines.length === 0 ? (
              <div className="mt-6 border border-rule bg-plate p-8 text-center">
                <h2 className="font-display text-xl font-extrabold text-navy">
                  Your cart is empty
                </h2>
                <p className="mt-2 text-[14.5px] leading-[1.65] text-mute">
                  Add a product before running through the checkout.
                </p>
                <Btn href="/products" variant="primary" className="mt-5">
                  Continue Shopping
                </Btn>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="co-name" className="micro-sm text-navy">
                    Name for the order <span className="text-mute">— Required</span>
                  </label>
                  <input
                    id="co-name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (error.name) setError((x) => ({ ...x, name: undefined }));
                    }}
                    aria-invalid={!!error.name}
                    aria-describedby={error.name ? "co-name-error" : undefined}
                    className={cx(inputCls, "mt-2", error.name && "border-[#D9A19A] bg-[#FDF6F5]")}
                    placeholder="Full name"
                  />
                  {error.name ? (
                    <p id="co-name-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {error.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="co-email" className="micro-sm text-navy">
                    Email <span className="text-mute">— Required</span>
                  </label>
                  <input
                    id="co-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error.email) setError((x) => ({ ...x, email: undefined }));
                    }}
                    aria-invalid={!!error.email}
                    aria-describedby={error.email ? "co-email-error" : undefined}
                    className={cx(inputCls, "mt-2", error.email && "border-[#D9A19A] bg-[#FDF6F5]")}
                    placeholder="name@company.com"
                  />
                  {error.email ? (
                    <p id="co-email-error" role="alert" className="mt-1.5 text-[12.5px] font-medium text-[#B03A2E]">
                      {error.email}
                    </p>
                  ) : null}
                </div>

                <div className="sm:col-span-2 mt-2 border-t border-rule pt-6">
                  <div className="flex items-center gap-3">
                    <span className="micro text-navy">02 — Payment</span>
                    <span className="h-px flex-1 bg-rule" />
                  </div>
                  <div className="mt-4 border border-dashed border-navy/30 bg-plate p-6">
                    <p className="font-display text-[16px] font-bold text-navy">
                      Card entry is disabled in this concept
                    </p>
                    <p className="mt-2 max-w-[540px] text-[14px] leading-[1.7] text-mute">
                      A live build would connect this step to a payment provider such as Shopify
                      Checkout or a payment gateway. Until that connection exists, collecting card
                      details here would be misleading — so the fields are deliberately absent.
                    </p>
                  </div>
                </div>

                <div className="sm:col-span-2 border-t border-rule pt-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-[420px] text-[12.5px] leading-[1.6] text-mute">
                      By continuing you are running a demonstration flow only. No order, payment or
                      notification is created.
                    </p>
                    <Btn type="submit" variant="primary" size="lg" className="shrink-0">
                      Place Demo Order
                    </Btn>
                  </div>
                </div>
              </form>
            )}
          </div>

          <aside className="lg:sticky lg:top-[121px] lg:self-start">
            <div className="border border-rule">
              <div className="border-b border-rule bg-navy px-5 py-3.5">
                <span className="micro text-white">Order summary</span>
              </div>
              <ul className="divide-y divide-rule bg-white">
                {lines.length === 0 ? (
                  <li className="px-5 py-6 text-[14px] text-mute">No items in the cart.</li>
                ) : (
                  lines.map((l) => (
                    <li key={l.product.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold text-navy">
                          {l.product.name}
                        </span>
                        <span className="micro-sm text-mute tnum">Qty {l.qty}</span>
                      </span>
                      <span className="shrink-0 font-mono text-[14px] font-semibold text-navy tnum">
                        {money(l.lineTotal)}
                      </span>
                    </li>
                  ))
                )}
              </ul>
              <div className="flex items-baseline justify-between border-t border-rule bg-plate px-5 py-4">
                <span className="micro text-navy">Subtotal</span>
                <span className="font-mono text-[22px] font-semibold text-navy tnum">
                  {money(subtotal)}
                </span>
              </div>
            </div>

            <div className="mt-5 border-l-2 border-aqua bg-white p-5 ring-1 ring-rule">
              <p className="text-[13.5px] leading-[1.7] text-mute">
                Quote-based equipment (commercial, industrial, municipal) never enters checkout —
                those systems are scoped through the quote request form.
              </p>
              <Btn href="/quote" variant="outline" size="sm" className="mt-4">
                Request a quote
              </Btn>
            </div>
            <p className="mt-4 text-[12.5px] text-mute">
              {count} item{count === 1 ? "" : "s"} in the cart · concept build, no live commerce
              backend.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
