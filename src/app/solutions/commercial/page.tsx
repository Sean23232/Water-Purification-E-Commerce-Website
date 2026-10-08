import type { Metadata } from "next";
import { SolutionLanding } from "@/components/SolutionLanding";

export const metadata: Metadata = {
  title: "Commercial Water Solutions",
  description:
    "Water treatment equipment for offices, hospitality, retail and business operations — scoped and quoted per project.",
};

export default function CommercialPage() {
  return <SolutionLanding variant="commercial" />;
}
