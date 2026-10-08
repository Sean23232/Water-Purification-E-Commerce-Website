import { ApplicationCards, FeaturedProducts, Hero } from "@/components/home/HomeTop";
import {
  CategoryBrowser,
  ProjectBanner,
  ResourcesSection,
  SolutionFinder,
  WhyChoose,
} from "@/components/home/HomeBottom";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ApplicationCards />
      <FeaturedProducts />
      <SolutionFinder />
      <ProjectBanner />
      <WhyChoose />
      <CategoryBrowser />
      <ResourcesSection />
    </>
  );
}
