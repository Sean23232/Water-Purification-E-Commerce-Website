import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides, products } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { Btn, Eyebrow, IconArrow, Reveal } from "@/components/ui";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide" };
  return { title: guide.title, description: guide.excerpt };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== slug);
  const related = products.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <section className="border-b border-rule bg-white">
        <div className="mx-auto w-full max-w-[1360px] px-5 pt-7 sm:px-8 xl:pl-[108px] xl:pr-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[13px]">
            <Link href="/" className="text-mute hover:text-water">
              Home
            </Link>
            <span className="text-rule">/</span>
            <Link href="/resources" className="text-mute hover:text-water">
              Resources
            </Link>
            <span className="text-rule">/</span>
            <span className="font-medium text-navy">{guide.topic}</span>
          </nav>
        </div>

        <div className="mx-auto w-full max-w-[1360px] px-5 pb-12 pt-8 sm:px-8 lg:pb-16 xl:pl-[108px] xl:pr-10">
          <div className="max-w-[820px]">
            <div className="flex items-center gap-3">
              <span className="micro text-water">{guide.topic}</span>
              <span className="h-px w-7 bg-aqua" />
              <span className="micro-sm text-mute">{guide.readTime}</span>
            </div>
            <h1 className="mt-5 font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.08] text-navy">
              {guide.title}
            </h1>
            <p className="mt-5 text-[17px] leading-[1.7] text-mute">{guide.excerpt}</p>
          </div>
        </div>
      </section>

      <div className="relative h-[240px] w-full photo sm:h-[380px] lg:h-[460px]">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <span className="absolute inset-0 bg-navy/10" />
      </div>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:py-16 xl:pl-[108px] xl:pr-10">
          <article className="max-w-[680px]">
            {guide.body.map((para, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[17.5px] leading-[1.75] text-ink first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[56px] first-letter:font-extrabold first-letter:leading-[0.9] first-letter:text-water"
                    : "mt-6 text-[16.5px] leading-[1.8] text-ink/85"
                }
              >
                {para}
              </p>
            ))}

            <div className="mt-9 border-l-2 border-aqua bg-plate p-6">
              <p className="micro text-navy">Please note</p>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-mute">
                This article is general information for planning purposes. It does not assess any
                specific water supply and should not be treated as a specification. Confirm
                requirements against water testing, flow rate, capacity and the application before
                selecting equipment.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3 border-t border-rule pt-7">
              <Btn href="/quote" variant="navy">
                Request a quote
                <IconArrow />
              </Btn>
              <Btn href="/products" variant="outline">
                Browse products
              </Btn>
            </div>
          </article>

          <aside className="lg:sticky lg:top-[121px] lg:self-start">
            <h2 className="micro border-b border-navy/20 pb-3 text-navy">More guides</h2>
            <ul className="mt-4 space-y-4">
              {others.map((g) => (
                <li key={g.slug}>
                  <Link href={`/resources/${g.slug}`} className="group block">
                    <span className="micro-sm text-water">{g.topic}</span>
                    <span className="mt-1.5 block font-display text-[16px] font-bold leading-snug text-navy group-hover:text-water">
                      {g.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 border border-rule bg-plate p-5">
              <p className="micro-sm text-mute">Related products</p>
              <ul className="mt-3 space-y-2.5">
                {related.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/products/${p.slug}`}
                      className="text-[14px] font-medium text-navy hover:text-water"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-14 sm:px-8 lg:py-20 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Continue reading</Eyebrow>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 70} className="h-full">
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
