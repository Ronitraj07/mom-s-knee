import { useScrollReveal } from "@/hooks/useScrollReveal";
import Hero from "@/components/landing/Hero";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionTeaser from "@/components/landing/SolutionTeaser";
import ScienceSection from "@/components/landing/ScienceSection";
import ProductTeaser from "@/components/landing/ProductTeaser";
import AudienceSection from "@/components/landing/AudienceSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  useScrollReveal();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <ProblemSection />
      <SolutionTeaser />
      <ScienceSection />
      <ProductTeaser />
      <AudienceSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
};

export default Index;
