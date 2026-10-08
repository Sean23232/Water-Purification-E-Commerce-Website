import type { Metadata } from "next";
import Link from "next/link";
import { getProduct } from "@/lib/catalog";
import { Eyebrow } from "@/components/ui";
import QuotePrefill from "./Prefill";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Submit a quote request for commercial, industrial or municipal water treatment equipment.",
};

const EXPECT = [
  { n: "01", title: "Share the brief", copy: "Application, location, capacity and the system you believe you need." },
  { n: "02", title: "Confirm the detail", copy: "Water testing, flow rate, capacity and site constraints are reviewed against the request." },
  { n: "03", title: "Receive a scoped quote", copy: "Equipment, scope and phasing are quoted for the project rather than priced at list." },
];

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const sp = await searchParams;
  const product = sp.product ? getProduct(sp.product) : undefined;

  return (
    <>
      <section className="border-b border-rule bg-navy">
        <div className="mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <Eyebrow tone="light">Request a quote</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] text-white">
              Tell us what the project needs
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.75] text-white/72">
              For commercial, industrial and municipal systems, pricing depends on the application
              rather than a shelf price. Give us what you know — an incomplete brief is fine.
            </p>
          </div>
          <ol className="space-y-4 border-l-2 border-aqua pl-5 lg:mb-2">
            {EXPECT.map((e) => (
              <li key={e.n}>
                <span className="micro-sm text-aqua">{e.n}</span>
                <p className="mt-1.5 font-display text-[15.5px] font-bold text-white">{e.title}</p>
                <p className="mt-1 text-[14px] leading-[1.6] text-white/65">{e.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <QuotePrefill
              defaultSystem={product ? product.name : ""}
              selected={product ? { name: product.name, sku: product.sku } : null}
            />
          </div>

          <aside>
            <div className="border border-rule bg-plate p-6">
              <span className="micro text-water">Before you send</span>
              <h2 className="mt-4 font-display text-[20px] font-extrabold text-navy">
                What helps a quote come back quickly
              </h2>
              <ul className="mt-4 space-y-3 text-[14.5px] leading-[1.65] text-mute">
                <li className="border-b border-rule pb-3">
                  The application type and what the water is used for.
                </li>
                <li className="border-b border-rule pb-3">
                  An estimated capacity or flow rate, in whatever unit you already use.
                </li>
                <li className="border-b border-rule pb-3">
                  Site constraints — available space, existing equipment, access for delivery.
                </li>
                <li>Any water testing you already hold, if relevant to the application.</li>
              </ul>
            </div>

            <div className="mt-5 border-l-2 border-aqua bg-white p-5 ring-1 ring-rule">
              <p className="text-[13.5px] leading-[1.7] text-mute">
                Sending this form does not confirm that a system is suitable for your water or your
                site. Selection may depend on water testing, flow rate, capacity and application
                requirements, and it is assessed on a project-by-project basis.
              </p>
            </div>

            <div className="mt-5 border border-rule bg-white p-5">
              <p className="micro-sm text-mute">Household order?</p>
              <p className="mt-2.5 text-[14px] leading-[1.65] text-mute">
                Products marked with a price can be bought directly through the demo cart — no
                quote needed.
              </p>
              <Link
                href="/products"
                className="mt-4 inline-block text-[14px] font-semibold text-water underline decoration-aqua underline-offset-4 hover:text-navy"
              >
                Shop water products
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
