import { useRef, useEffect } from 'react';

interface SoundOrbProps {
  mouseX?: number;
  mouseY?: number;
  isActive?: boolean;
  size?: number;
}

export function SoundOrb({
  mouseX = 0,
  mouseY = 0,
  isActive = true,
  size = 300,
}: SoundOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    // Apply smooth parallax transform based on mouse position
    const translateX = mouseX * 12;
    const translateY = mouseY * 8;
    
    orb.style.transform = `translate(${translateX}px, ${translateY}px)`;
  }, [mouseX, mouseY]);

  return (
    <div
      ref={orbRef}
      className="relative transition-transform duration-1000 ease-out"
      style={{ width: size, height: size }}
    >
      {/* Outer glow - deep orange */}
      <div
        className="absolute inset-0 rounded-full bg-primary/15 blur-3xl animate-breathe"
        style={{ transform: 'scale(1.4)' }}
      />
      
      {/* Secondary glow ring */}
      <div
        className="absolute inset-6 rounded-full bg-primary/10 blur-2xl animate-pulse-glow"
        style={{ animationDelay: '-2s' }}
      />
      
      {/* Core orb */}
      <div className="absolute inset-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm animate-breathe">
        {/* Inner highlight */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-transparent via-primary/5 to-primary/10" />
      </div>
      
      {/* Center point */}
      <div className="absolute inset-1/3 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 animate-pulse-glow">
        <div className="absolute inset-3 rounded-full bg-gradient-to-tr from-primary/50 via-transparent to-primary/30" />
      </div>

      {/* Floating particles - minimal and elegant */}
      {isActive && (
        <>
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-primary/60 animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '-3s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-primary/50 animate-float" style={{ animationDelay: '-5s' }} />
        </>
      )}
    </div>
  );
}
