import { PageTransition } from "@/components/ui/page-transition";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { About } from "@/components/sections/about";
import { WorksSection } from "@/components/sections/works-section";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { LetsTalk } from "@/components/sections/lets-talk";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <MarqueeBand />
      <About />
      <WorksSection />
      <Pricing />
      <Faq />
      <LetsTalk />
      <Footer />
    </PageTransition>
  );
}
