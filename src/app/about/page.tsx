import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Btn, Eyebrow, IconArrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "AquaPure Water Solutions — the placeholder brand behind this water purification e-commerce concept.",
};

const SCALES = [
  {
    n: "01",
    title: "Residential",
    copy: "Household products sold directly: drinking water filters, reverse osmosis systems, whole-home filtration and replacement cartridges.",
    href: "/solutions/residential",
    link: "Residential solutions",
  },
  {
    n: "02",
    title: "Commercial",
    copy: "Filtration equipment for offices, hospitality, retail and business operations, quoted against the demand and the site.",
    href: "/solutions/commercial",
    link: "Commercial solutions",
  },
  {
    n: "03",
    title: "Industrial & Municipal",
    copy: "Large-scale treatment equipment scoped with project teams for industrial operations, infrastructure and municipal applications.",
    href: "/solutions/industrial-municipal",
    link: "Industrial & municipal",
  },
];

const PLACEHOLDERS = [
  { label: "Legal company name", value: "[To be supplied]" },
  { label: "Registered address", value: "[To be supplied]" },
  { label: "Telephone", value: "[To be supplied]" },
  { label: "Email address", value: "[To be supplied]" },
  { label: "Company registration", value: "[To be supplied]" },
  { label: "Social profiles", value: "[To be supplied]" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <Eyebrow>About us</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] text-navy">
              One supplier, every scale of water treatment
            </h1>
            <p className="mt-5 max-w-[580px] text-[16.5px] leading-[1.75] text-mute">
              AquaPure Water Solutions is the placeholder brand used throughout this front-end
              concept. It stands for a supplier that can serve a homeowner buying a basic filter
              and a procurement manager researching a major treatment system, without changing
              website.
            </p>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden border border-rule bg-white photo">
            <Image
              src="/images/about.jpg"
              alt="Equipment assembly workshop with a stainless workbench and a partially built treatment skid"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <Eyebrow>What this business covers</Eyebrow>
          </div>
          <div className="space-y-6">
            <p className="font-display text-[clamp(1.35rem,2.3vw,1.85rem)] font-bold leading-[1.35] text-navy">
              Cleaner water should not require you to already know the name of the equipment.
            </p>
            <p className="text-[16px] leading-[1.8] text-mute">
              Most people arrive with a problem rather than a part number: a tap they do not want
              to drink from, a machine that is unhappy with the supply, a building that needs a
              treatment train it does not yet have. The job of this storefront is to let each of
              those people start in the right place — and to give the people with a specification
              a fast route to a quote.
            </p>
            <p className="text-[16px] leading-[1.8] text-mute">
              The catalogue is deliberately structured so that more products, categories and
              guides can be added as the business supplies real data. Nothing on this site
              currently makes claims about certifications, contaminant removal or performance:
              those statements belong to the manufacturer data that will replace the sample
              records.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Three markets, one catalogue</Eyebrow>
          <div className="mt-9 grid gap-px bg-rule border border-rule sm:grid-cols-3">
            {SCALES.map((s, i) => (
              <Reveal key={s.n} delay={i * 70} className="h-full">
                <div className="flex h-full flex-col bg-white p-7">
                  <span className="micro text-water-deep tnum">{s.n}</span>
                  <h2 className="mt-3 font-display text-[22px] font-extrabold text-navy">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-mute">{s.copy}</p>
                  <Link
                    href={s.href}
                    className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-semibold text-water hover:text-navy"
                  >
                    {s.link}
                    <IconArrow className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <Eyebrow>Brand details</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold leading-tight text-navy">
              Everything here is easy to replace
            </h2>
            <p className="mt-4 max-w-[520px] text-[15.5px] leading-[1.75] text-mute">
              The name &ldquo;AquaPure Water Solutions&rdquo;, the logo mark, the navigation labels
              and the sample copy are all placeholders. Company details are intentionally left as
              editable fields rather than invented.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Btn href="/resources" variant="navy">
                Read the guides
                <IconArrow />
              </Btn>
              <Btn href="/contact" variant="outline">
                Contact us
              </Btn>
            </div>
          </div>

          <dl className="grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {PLACEHOLDERS.map((p) => (
              <div key={p.label} className="bg-white px-5 py-4">
                <dt className="micro-sm text-mute">{p.label}</dt>
                <dd className="mt-2 font-mono text-[14px] font-medium text-navy">{p.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
