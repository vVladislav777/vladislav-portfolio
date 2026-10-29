import { PageTransition } from "@/components/ui/page-transition";
import { Hero } from "@/components/sections/hero";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { WorksSection } from "@/components/sections/works-section";
import { Services } from "@/components/sections/services";
import { Benefits } from "@/components/sections/benefits";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { BriefForm } from "@/components/sections/brief-form";
import { Faq } from "@/components/sections/faq";
import { Contacts } from "@/components/sections/contacts";
import { LetsTalk } from "@/components/sections/lets-talk";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <MarqueeBand />
      <WorksSection />
      <Services />
      <Benefits />
      <Process />
      <Pricing />
      <BriefForm />
      <Faq />
      <Contacts />
      <LetsTalk />
      <Footer />
    </PageTransition>
  );
}
