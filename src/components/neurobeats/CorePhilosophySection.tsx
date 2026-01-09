import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

export function CorePhilosophySection() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showOptimized, setShowOptimized] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowOptimized(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let animationId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid lines
      ctx.strokeStyle = 'hsl(0 0% 25%)';
      ctx.lineWidth = 1;
      
      for (let y = 0; y <= height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Labels
      ctx.fillStyle = 'hsl(0 0% 50%)';
      ctx.font = '12px system-ui';
      ctx.fillText('HIGH', 10, 25);
      ctx.fillText('LOW', 10, height - 10);

      // Chaotic line (muted)
      ctx.beginPath();
      ctx.strokeStyle = showOptimized ? 'hsl(0 0% 40%)' : 'hsl(0 50% 50%)';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'hsl(0 50% 50%)';
      ctx.shadowBlur = showOptimized ? 5 : 12;

      for (let x = 0; x < width; x += 2) {
        const progress = x / width;
        const baseY = height * 0.3;
        let y = baseY + Math.sin(x * 0.05 + time) * 30 + Math.sin(x * 0.1 + time * 1.5) * 20 + Math.sin(x * 0.02 + time * 0.5) * 40 * Math.sin(progress * Math.PI);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Optimized line (orange)
      if (isInView) {
        ctx.beginPath();
        ctx.strokeStyle = '#FF6B01';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FF6B01';
        ctx.shadowBlur = 15;

        const drawProgress = showOptimized ? 1 : Math.min(time / 3, 1);

        for (let x = 0; x < width * drawProgress; x += 2) {
          const baseY = height * 0.7;
          let y = baseY + Math.sin(x * 0.02 + time * 0.5) * 15 + Math.sin(x * 0.01 + time * 0.3) * 8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.font = '11px system-ui';
      ctx.fillStyle = showOptimized ? 'hsl(0 0% 45%)' : 'hsl(0 50% 55%)';
      ctx.fillText('CHAOTIC', width - 80, 50);
      
      if (isInView) {
        ctx.fillStyle = '#FF6B01';
        ctx.fillText('OPTIMIZED', width - 90, height - 40);
      }

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isInView, showOptimized]);

  return (
    <section id="philosophy" ref={sectionRef} className="relative py-40 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        {/* Hero headline - massive and bold */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Why Music Matters
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - reduced visual weight */}
          <div className={`space-y-8 transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl text-muted-foreground leading-relaxed opacity-80">
              Your brain has limited attention bandwidth. Music should support focus or stay out of the way.
            </p>
            <ul className="space-y-4 text-base text-muted-foreground opacity-75">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-border rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-foreground font-semibold">Reading</strong> — low stimulation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-border rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-foreground font-semibold">Coding</strong> — moderate activation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-border rounded-full mt-2.5 flex-shrink-0" />
                <span><strong className="text-foreground font-semibold">Problem-solving</strong> — rhythmic stability</span>
              </li>
            </ul>
            {/* Removed orange from static text - not interactive */}
            <p className="text-xl text-foreground font-semibold">
              Music as a tool, not content.
            </p>
          </div>

          {/* Right column - chart */}
          <div className={`transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-background rounded-xl p-8 border border-border">
              <h3 className="text-xs font-medium text-muted-foreground/80 mb-6 uppercase tracking-wider">Cognitive Load</h3>
              <canvas ref={canvasRef} width={500} height={280} className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}