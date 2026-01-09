import { Navbar } from "@/components/neurobeats/Navbar";
import { HeroSection } from "@/components/neurobeats/HeroSection";
import { CorePhilosophySection } from "@/components/neurobeats/CorePhilosophySection";
import { ScienceCardsSection } from "@/components/neurobeats/ScienceCardsSection";
import { AnimatedChartsSection } from "@/components/neurobeats/AnimatedChartsSection";
import { InteractiveDemoSection } from "@/components/neurobeats/InteractiveDemoSection";
import { FeedbackLoopSection } from "@/components/neurobeats/FeedbackLoopSection";
import { ClosingCTASection } from "@/components/neurobeats/ClosingCTASection";
import Footer from "@/components/neurobeats/Footer";

export default function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <CorePhilosophySection />
      <ScienceCardsSection />
      <AnimatedChartsSection />
      <InteractiveDemoSection />
      <FeedbackLoopSection />
      <ClosingCTASection />

      {/* Footer goes at the end */}
      <Footer />
    </main>
  );
}
