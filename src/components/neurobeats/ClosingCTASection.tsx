import { useInView } from '@/hooks/useInView';
import { MagneticButton } from './MagneticButton';

export function ClosingCTASection() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.3 });

  const handleStartSession = () => {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
      demoSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative py-48 px-6 bg-background overflow-hidden">
      {/* Subtle glow - reduced */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl" />
      
      {/* Hero content - strengthened */}
      <div className={`relative z-10 max-w-4xl mx-auto text-center transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Hero headline - massive */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-12 leading-[1.1]">
          Stop fighting your brain.<br />
          <span className="text-gradient-orange">Work with it.</span>
        </h2>
        
        {/* Primary CTA - accent color justified */}
        <div className="mb-10">
          <MagneticButton 
            variant="primary" 
            size="xl"
            onClick={handleStartSession}
          >
            Start Your First Focus Session
          </MagneticButton>
        </div>
        
        {/* Supporting text - muted */}
        <p className="text-muted-foreground/70 text-lg">
          Choose your task. Listen. Get to work.
        </p>
      </div>
    </section>
  );
}