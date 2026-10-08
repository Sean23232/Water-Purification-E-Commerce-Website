import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/catalog";
import { Btn, Eyebrow, IconArrow, Reveal } from "@/components/ui";

export const metadata: Metadata = {
  title: "Water Treatment Guides",
  description:
    "Sample educational guides on residential filtration, commercial treatment systems and large-scale water treatment.",
};

const TOPICS = [
  { label: "Residential", copy: "Point-of-use and point-of-entry planning for homes." },
  { label: "Commercial", copy: "Demand, duty cycle and site access for businesses." },
  { label: "Industrial & Municipal", copy: "Phasing, redundancy and project documentation." },
  { label: "Maintenance", copy: "Service access, cartridge handling and spares holding." },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="border-b border-rule bg-navy">
        <div className="mx-auto grid w-full max-w-[1360px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div>
            <Eyebrow tone="light">Resources</Eyebrow>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,4.4vw,3.4rem)] font-extrabold leading-[1.05] text-white">
              Make a More Informed Water Treatment Decision
            </h1>
            <p className="mt-5 max-w-[560px] text-[16px] leading-[1.75] text-white/72">
              Sample editorial content for this concept. Written as general planning guidance — no
              single treatment technology is presented as suitable for every supply.
            </p>
          </div>
          <div className="border-l-2 border-aqua bg-white/6 p-5 lg:mb-2">
            <p className="micro text-aqua">How to read these</p>
            <p className="mt-3 text-[14.5px] leading-[1.7] text-white/72">
              Each guide covers the questions worth answering before you buy. They do not assess
              your water, and they never claim that one system removes every concern.
            </p>
          </div>
        </div>
      </section>

      <div className="relative h-[220px] w-full photo sm:h-[300px] lg:h-[360px]">
        <Image
          src="/images/guide-testing.jpg"
          alt="Water testing bench with sample bottles, a handheld meter and a notebook"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center 45%" }}
        />
        <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/45 to-transparent" />
        <span className="absolute bottom-4 left-0 w-full">
          <span className="mx-auto block max-w-[1360px] px-5 sm:px-8 xl:pl-[108px] xl:pr-10">
            <span className="micro bg-white/92 px-3 py-2 text-navy">
              Sample imagery — replace with own photography
            </span>
          </span>
        </span>
      </div>

      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <div>
              <Eyebrow>Latest guides</Eyebrow>
              <h2 className="mt-5 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-extrabold leading-[1.1] text-navy">
                Three places to start
              </h2>
            </div>
            <p className="text-[15.5px] leading-[1.7] text-mute lg:pb-2">
              Replace these with your own articles, technical bulletins and case notes when the
              real content is available.
            </p>
          </div>

          <div className="mt-10 space-y-px border-t border-navy/15 bg-rule">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={i * 70}>
                <Link
                  href={`/resources/${g.slug}`}
                  className="group grid grid-cols-1 gap-5 bg-white px-4 py-6 transition-colors duration-200 hover:bg-plate sm:grid-cols-[220px_1fr_auto] sm:items-center sm:gap-8 sm:px-5"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden bg-plate photo">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      sizes="220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  </span>
                  <span className="block">
                    <span className="flex items-center gap-3">
                      <span className="micro-sm text-water">{g.topic}</span>
                      <span className="h-px w-6 bg-rule" />
                      <span className="micro-sm text-mute">{g.readTime}</span>
                    </span>
                    <span className="mt-3 block font-display text-[21px] font-extrabold leading-tight text-navy sm:text-[25px]">
                      {g.title}
                    </span>
                    <span className="mt-3 block max-w-[620px] text-[15px] leading-[1.65] text-mute">
                      {g.excerpt}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-water sm:flex-col sm:items-end sm:gap-3">
                    Read Guide
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-navy transition-colors duration-200 group-hover:border-water group-hover:bg-water group-hover:text-white">
                      <IconArrow className="h-4 w-4" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Topics</Eyebrow>
          <div className="mt-8 grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((t) => (
              <div key={t.label} className="bg-white p-6">
                <h3 className="font-display text-[17px] font-bold text-navy">{t.label}</h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-mute">{t.copy}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Btn href="/quote" variant="navy">
              Ask for guidance
              <IconArrow />
            </Btn>
            <Btn href="/products" variant="outline">
              Browse products
            </Btn>
          </div>
        </div>
      </section>
    </>
  );
}
