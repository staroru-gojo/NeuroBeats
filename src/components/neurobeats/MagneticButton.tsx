import { useRef, useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'lg' | 'xl';
}

export function MagneticButton({
  children,
  className,
  onClick,
  variant = 'primary',
  size = 'lg',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Magnetic pull effect - button follows cursor slightly
    setTransform({
      x: distanceX * 0.15,
      y: distanceY * 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const variantStyles = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground border border-border',
    ghost: 'bg-transparent border border-border text-foreground hover:bg-muted',
  };

  const sizeStyles = {
    default: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  return (
    <Button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn(
        'relative font-semibold rounded-lg overflow-hidden',
        'transition-all duration-500 ease-out',
        variantStyles[variant],
        sizeStyles[size],
        isHovered && variant === 'primary' && 'shadow-xl shadow-primary/30',
        isHovered && 'scale-[1.02]',
        className
      )}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
    >
      {/* Glow effect on hover */}
      <span 
        className={cn(
          'absolute inset-0 rounded-lg transition-opacity duration-500',
          isHovered && variant === 'primary' ? 'opacity-100' : 'opacity-0',
          'bg-gradient-to-r from-primary/0 via-primary-foreground/10 to-primary/0'
        )} 
      />
      <span className="relative z-10">{children}</span>
    </Button>
  );
}
