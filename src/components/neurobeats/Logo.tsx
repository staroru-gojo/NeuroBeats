type LogoProps = {
  size?: number;
  showText?: boolean;
};

export default function Logo({ size = 36, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Logo mark */}
      <div
        className="flex items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold"
        style={{ width: size, height: size }}
      >
        <span className="relative">
          N
          {/* subtle pulse line */}
          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent rounded-full opacity-80" />
        </span>
      </div>

      {/* Logo text */}
      {showText && (
        <span className="text-lg font-semibold tracking-tight">
          NeuroBeats
        </span>
      )}
    </div>
  );
}
