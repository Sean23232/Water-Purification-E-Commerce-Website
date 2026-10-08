import type { Metadata } from "next";
import { SolutionLanding } from "@/components/SolutionLanding";

export const metadata: Metadata = {
  title: "Industrial & Municipal Solutions",
  description:
    "Scalable water treatment equipment for industrial operations, infrastructure projects and municipal applications.",
};

export default function IndustrialMunicipalPage() {
  return <SolutionLanding variant="industrial-municipal" />;
}
