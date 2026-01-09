import { useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { NeuralWaveform } from './NeuralWaveform';
import { SoundOrb } from './SoundOrb';
import { MagneticButton } from './MagneticButton';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalizedX, normalizedY } = useMousePosition(containerRef);

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
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-16"
    >
      {/* Background - solid dark */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle radial gradient - reduced opacity */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-primary/[0.02] rounded-full blur-3xl" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Sound Orb - reduced opacity */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none"
        style={{
          transform: `translate(calc(-50% + ${normalizedX * 20}px), calc(-50% + ${normalizedY * 15}px))`,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <SoundOrb mouseX={normalizedX} mouseY={normalizedY} size={450} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Hero headline - MASSIVE and bold */}
        <h1 
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold tracking-tight mb-10 opacity-0 animate-fade-up leading-[1.1]"
          style={{
            transform: `translate(${normalizedX * 8}px, ${normalizedY * 5}px)`,
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Music, <span className="text-gradient-orange">engineered</span>
          <br />for focus.
        </h1>

        {/* Supporting text - muted */}
        <p 
          className="text-lg sm:text-xl text-muted-foreground/70 max-w-2xl mx-auto mb-14 leading-relaxed opacity-0 animate-fade-up"
          style={{ animationDelay: '0.15s' }}
        >
          Most music apps treat music as entertainment. NeuroBeats treats it as a cognitive tool. 
          We adapt sound profiles based on your task and mental load.
        </p>

        {/* CTA - accent justified */}
        <div className="opacity-0 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <MagneticButton 
            variant="primary" 
            size="xl"
            onClick={handleStartSession}
          >
            Start a Focus Session
          </MagneticButton>
        </div>
      </div>

      {/* Waveform at bottom - reduced opacity */}
      <div className="absolute bottom-0 left-0 right-0 h-40 opacity-20 pointer-events-none">
        <NeuralWaveform
          mouseX={0.5}
          mouseY={0.5}
          isOptimized={true}
          color="orange"
        />
      </div>

      {/* Scroll indicator - muted */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}