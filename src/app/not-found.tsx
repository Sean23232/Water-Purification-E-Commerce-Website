import Link from "next/link";
import { Btn, Eyebrow, IconArrow } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex w-full max-w-[1360px] flex-col items-start px-5 py-24 sm:px-8 lg:py-32 xl:pl-[108px] xl:pr-10">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 max-w-[720px] font-display text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.05] text-navy">
          That page is not in the catalogue
        </h1>
        <p className="mt-5 max-w-[520px] text-[16px] leading-[1.75] text-mute">
          The link may be out of date, or the product may have been removed from the sample data.
          The catalogue and the solution finder are good places to restart.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Btn href="/products" variant="primary" size="lg">
            Browse all products
            <IconArrow />
          </Btn>
          <Btn href="/" variant="outline" size="lg">
            Back to the homepage
          </Btn>
        </div>
        <nav className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule pt-6" aria-label="Suggested">
          <Link href="/solutions/residential" className="text-[14px] font-medium text-water hover:text-navy">
            Residential solutions
          </Link>
          <Link href="/solutions/commercial" className="text-[14px] font-medium text-water hover:text-navy">
            Commercial solutions
          </Link>
          <Link href="/solutions/industrial-municipal" className="text-[14px] font-medium text-water hover:text-navy">
            Industrial & municipal
          </Link>
          <Link href="/resources" className="text-[14px] font-medium text-water hover:text-navy">
            Resources
          </Link>
        </nav>
      </div>
    </section>
  );
}
