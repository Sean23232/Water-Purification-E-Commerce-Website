import type { Metadata } from "next";
import { SolutionLanding } from "@/components/SolutionLanding";

export const metadata: Metadata = {
  title: "Residential Water Solutions",
  description:
    "Home water purification: under-sink filtration, reverse osmosis, whole-home filtration and conditioning equipment.",
};

export default function ResidentialPage() {
  return <SolutionLanding variant="residential" />;
}
