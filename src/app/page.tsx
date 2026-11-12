import { PageTransition } from "@/components/ui/page-transition";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { WorksSection } from "@/components/sections/works-section";
import { Services, Process } from "@/components/sections/services-process";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { LetsTalk } from "@/components/sections/lets-talk";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <WorksSection />
      <Services />
      <Process />
      <Pricing />
      <About />
      <Faq />
      <LetsTalk />
      <Footer />
    </PageTransition>
  );
}
