import { useRef, useEffect, useState } from 'react';

interface NeuralWaveformProps {
  mouseX?: number;
  mouseY?: number;
  isOptimized?: boolean;
  color?: 'orange' | 'white';
  className?: string;
}

export function NeuralWaveform({
  isOptimized = true,
  color = 'orange',
  className = '',
}: NeuralWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 600, height: 300 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = {
      orange: { main: '#FF6B01', glow: '#FF8533' },
      white: { main: '#FFFFFF', glow: '#F0F0F0' },
    };

    const selectedColor = colors[color];
    let time = 0;

    const draw = () => {
      const { width, height } = dimensions;
      ctx.clearRect(0, 0, width, height);

      // Create gradient for the line
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, `${selectedColor.main}00`);
      gradient.addColorStop(0.15, `${selectedColor.main}80`);
      gradient.addColorStop(0.5, selectedColor.main);
      gradient.addColorStop(0.85, `${selectedColor.main}80`);
      gradient.addColorStop(1, `${selectedColor.main}00`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw glow - subtle and smooth
      ctx.shadowColor = selectedColor.glow;
      ctx.shadowBlur = 25;

      ctx.beginPath();

      const centerY = height / 2;
      const amplitude = isOptimized ? 25 : 50;
      const frequency = isOptimized ? 0.018 : 0.025;

      for (let x = 0; x < width; x++) {
        // Base wave
        let y = centerY;

        // Primary wave - smooth sine
        y += Math.sin(x * frequency + time) * amplitude;

        // Secondary wave for subtle complexity
        y += Math.sin(x * frequency * 1.8 + time * 1.2) * (amplitude * 0.25);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Draw additional subtle wave layer
      ctx.globalAlpha = 0.25;
      ctx.shadowBlur = 12;
      ctx.beginPath();

      for (let x = 0; x < width; x++) {
        let y = centerY;
        y += Math.sin(x * frequency * 0.6 + time * 0.7 + Math.PI) * (amplitude * 0.5);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
      ctx.globalAlpha = 1;

      // Slow, intentional animation speed
      time += isOptimized ? 0.012 : 0.018;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isOptimized, color, dimensions]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        setDimensions({ width: rect.width || 600, height: rect.height || 300 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      className={`w-full h-full ${className}`}
    />
  );
}