import type { Metadata } from "next";
import { Catalogue } from "./Catalogue";

export const metadata: Metadata = {
  title: "All Water Treatment Products",
  description:
    "Search, filter and sort the sample catalogue: drinking water filters, reverse osmosis, whole-home filtration, commercial, industrial and municipal treatment equipment.",
};

type Params = { category?: string[] | string; application?: string[] | string; q?: string[] | string };

const first = (v: string[] | string | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const sp = await searchParams;
  return (
    <Catalogue
      initialCategory={first(sp.category) || "all"}
      initialApplication={first(sp.application) || "all"}
      initialQuery={first(sp.q)}
    />
  );
}
