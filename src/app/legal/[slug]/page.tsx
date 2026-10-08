import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow } from "@/components/ui";

const DOCS: Record<string, { title: string; updated: string; sections: { h: string; p: string[] }[] }> = {
  privacy: {
    title: "Privacy Policy",
    updated: "[Effective date — to be supplied]",
    sections: [
      {
        h: "About this document",
        p: [
          "This is placeholder policy copy for a front-end concept. It must be replaced with the business's actual privacy policy, reviewed for the jurisdictions in which the company operates, before the site is published.",
          "AquaPure Water Solutions is a placeholder brand name used throughout this concept.",
        ],
      },
      {
        h: "Information entered on this site",
        p: [
          "The quote request form, contact form, newsletter sign-up and demo checkout in this concept run entirely in your browser. Nothing you type is transmitted to a server, stored in a database or shared with a third party.",
          "Your cart contents are stored in your browser's local storage so that they persist between pages. Clearing your browser data removes them.",
        ],
      },
      {
        h: "When a commerce backend is connected",
        p: [
          "A live build would describe the customer data collected during purchase, order fulfilment and support, the legal basis for processing, retention periods, and the rights available to individuals.",
          "It would also name the processors used for payments, email and analytics once those contracts are in place.",
        ],
      },
      {
        h: "Cookies and analytics",
        p: [
          "No analytics, advertising or tracking cookies are set by this concept build.",
          "Cookie and consent language should be added when a third-party analytics provider is introduced.",
        ],
      },
      {
        h: "Contact",
        p: ["[Data protection contact — to be supplied]", "[Postal address — to be supplied]"],
      },
    ],
  },
  terms: {
    title: "Terms and Conditions",
    updated: "[Effective date — to be supplied]",
    sections: [
      {
        h: "About this document",
        p: [
          "This is placeholder legal copy for a front-end concept and does not constitute a binding set of terms. Replace it with terms reviewed by the business's legal advisor before publication.",
        ],
      },
      {
        h: "Nature of this site",
        p: [
          "This build is a front-end concept. It does not process payments, create orders or transmit enquiries. Product records, pricing, availability and specifications are sample data used for demonstration.",
        ],
      },
      {
        h: "Products and pricing",
        p: [
          "Sample prices shown for residential products are illustrative only. Commercial, industrial and municipal equipment is quoted against the project rather than sold at a listed price.",
          "Specifications published here are placeholders pending manufacturer data.",
        ],
      },
      {
        h: "Suitability and selection",
        p: [
          "Information provided on this site is general in nature. System selection may depend on water testing, flow rate, capacity and application requirements, and nothing on this site confirms that a particular system will meet a specific water quality requirement.",
        ],
      },
      {
        h: "Intellectual property",
        p: [
          "The brand name, logo, copy, photography and layout shown here are placeholders created for demonstration purposes and should be replaced with the business's own assets.",
        ],
      },
    ],
  },
};

export function generateStaticParams() {
  return [{ slug: "privacy" }, { slug: "terms" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCS[slug];
  return { title: doc ? doc.title : "Legal" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <>
      <section className="border-b border-rule bg-plate">
        <div className="mx-auto w-full max-w-[1360px] px-5 py-12 sm:px-8 lg:py-16 xl:pl-[108px] xl:pr-10">
          <Eyebrow>Legal</Eyebrow>
          <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
            <h1 className="font-display text-[clamp(2rem,4vw,3.1rem)] font-extrabold leading-[1.06] text-navy">
              {doc.title}
            </h1>
            <p className="micro text-mute">{doc.updated}</p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[220px_minmax(0,720px)] lg:gap-16 lg:py-16 xl:pl-[108px] xl:pr-10">
          <aside>
            <h2 className="micro border-b border-navy/20 pb-3 text-navy">Documents</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/legal/privacy"
                  className={`text-[14.5px] font-medium hover:text-water ${
                    slug === "privacy" ? "text-water" : "text-navy"
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/terms"
                  className={`text-[14.5px] font-medium hover:text-water ${
                    slug === "terms" ? "text-water" : "text-navy"
                  }`}
                >
                  Terms and Conditions
                </Link>
              </li>
            </ul>
            <div className="mt-6 border-l-2 border-aqua bg-plate p-4">
              <p className="text-[13px] leading-[1.65] text-mute">
                Placeholder copy — replace with the business&rsquo;s approved legal documents.
              </p>
            </div>
          </aside>

          <article>
            {doc.sections.map((s) => (
              <div key={s.h} className="border-b border-rule py-6 first:pt-0">
                <h2 className="font-display text-[20px] font-extrabold text-navy">{s.h}</h2>
                {s.p.map((para, i) => (
                  <p key={i} className="mt-3 text-[15.5px] leading-[1.8] text-ink/85">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
