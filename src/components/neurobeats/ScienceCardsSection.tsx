import { ReactNode, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface ScienceCardProps {
  title: string;
  description: string;
  visual: ReactNode;
  index: number;
}

function ScienceCard({ title, description, visual, index }: ScienceCardProps) {
  const [cardRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'group relative bg-card rounded-xl border border-border p-6 transition-all duration-500',
        'hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2',
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className={cn(
        "absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-primary/5 transition-opacity duration-500",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
      
      {/* Top border glow */}
      <div className={cn(
        "absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary to-transparent transition-opacity duration-500",
        isHovered ? "opacity-100" : "opacity-0"
      )} />
      
      <div className="relative z-10">
        {/* Visual */}
        <div className="h-44 mb-6 flex items-center justify-center overflow-hidden rounded-lg bg-muted/30 border border-border/30">
          {visual}
        </div>

        {/* Content - reduced visual weight */}
        <h3 className={cn(
          "text-lg font-semibold mb-3 transition-all duration-300",
          isHovered ? "text-gradient-orange" : "text-foreground"
        )}>
          {title}
        </h3>
        <p className="text-muted-foreground/90 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// Visual components remain unchanged
function WaveformChaosToSimple() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full p-4">
      <path
        d="M10,40 Q20,20 30,45 T50,30 T70,50 T90,25"
        fill="none"
        stroke="hsl(0 0% 40%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="opacity-70"
      />
      <path
        d="M95,40 L110,40 M105,35 L112,40 L105,45"
        fill="none"
        stroke="hsl(0 0% 50%)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M115,40 Q135,30 155,40 T195,40"
        fill="none"
        stroke="hsl(24 100% 50%)"
        strokeWidth="2"
        className="animate-pulse-glow"
        style={{ filter: 'drop-shadow(0 0 6px hsl(24 100% 50% / 0.5))' }}
      />
      <circle cx="195" cy="40" r="3" fill="hsl(24 100% 50%)" className="animate-pulse" />
    </svg>
  );
}

function FocusGraph() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full p-4">
      <line x1="30" y1="10" x2="30" y2="85" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      <line x1="30" y1="85" x2="190" y2="85" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      
      <text x="20" y="25" fill="hsl(0 0% 50%)" fontSize="7" textAnchor="end">High</text>
      <text x="20" y="80" fill="hsl(0 0% 50%)" fontSize="7" textAnchor="end">Low</text>
      <text x="60" y="95" fill="hsl(0 0% 50%)" fontSize="6">Without</text>
      <text x="140" y="95" fill="hsl(0 0% 50%)" fontSize="6">With Music</text>

      <rect x="45" y="35" width="28" height="45" fill="hsl(0 0% 35%)" rx="3" />
      <rect x="125" y="55" width="28" height="25" fill="hsl(0 0% 35%)" rx="3" />
      
      <rect x="78" y="45" width="28" height="35" fill="hsl(24 100% 50%)" rx="3" style={{ filter: 'drop-shadow(0 2px 8px hsl(24 100% 50% / 0.3))' }} />
      <rect x="158" y="20" width="28" height="60" fill="hsl(24 100% 50%)" rx="3" style={{ filter: 'drop-shadow(0 2px 8px hsl(24 100% 50% / 0.3))' }} />
      
      <rect x="40" y="5" width="8" height="8" fill="hsl(0 0% 35%)" rx="1" />
      <text x="52" y="12" fill="hsl(0 0% 60%)" fontSize="6">Mind-wandering</text>
      <rect x="115" y="5" width="8" height="8" fill="hsl(24 100% 50%)" rx="1" />
      <text x="127" y="12" fill="hsl(0 0% 60%)" fontSize="6">Task-focus</text>
    </svg>
  );
}

function RhythmComparison() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full p-4">
      <text x="10" y="15" fill="hsl(0 0% 50%)" fontSize="8">Distracting</text>
      <path
        d="M10,30 L22,18 L28,42 L38,15 L48,35 L55,22 L65,45 L78,18 L88,32 L100,24"
        fill="none"
        stroke="hsl(0 0% 40%)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      <text x="10" y="55" fill="hsl(24 100% 55%)" fontSize="8">Predictable</text>
      <path
        d="M10,68 Q30,58 50,68 T90,68"
        fill="none"
        stroke="hsl(24 100% 50%)"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 4px hsl(24 100% 50% / 0.4))' }}
      />
      
      <line x1="110" y1="10" x2="110" y2="75" stroke="hsl(0 0% 20%)" strokeWidth="1" strokeDasharray="3,3" />
      
      <text x="120" y="28" fill="hsl(0 0% 45%)" fontSize="7">Breaks focus</text>
      <text x="120" y="65" fill="hsl(24 100% 55%)" fontSize="7">Sustains focus</text>
    </svg>
  );
}

function TempoChart() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full p-4">
      <text x="5" y="20" fill="hsl(0 0% 70%)" fontSize="8">Reading</text>
      <rect x="55" y="12" width="50" height="14" fill="hsl(24 100% 50%)" fillOpacity="0.5" rx="3" />
      <text x="110" y="22" fill="hsl(0 0% 50%)" fontSize="7">50-80 BPM</text>
      
      <text x="5" y="42" fill="hsl(0 0% 70%)" fontSize="8">Math</text>
      <rect x="55" y="34" width="75" height="14" fill="hsl(24 100% 50%)" fillOpacity="0.65" rx="3" />
      <text x="135" y="44" fill="hsl(0 0% 50%)" fontSize="7">80-120</text>
      
      <text x="5" y="64" fill="hsl(0 0% 70%)" fontSize="8">Coding</text>
      <rect x="55" y="56" width="90" height="14" fill="hsl(24 100% 50%)" fillOpacity="0.8" rx="3" style={{ filter: 'drop-shadow(0 2px 6px hsl(24 100% 50% / 0.3))' }} />
      <text x="150" y="66" fill="hsl(0 0% 50%)" fontSize="7">100-140</text>
      
      <text x="5" y="86" fill="hsl(0 0% 70%)" fontSize="8">Creative</text>
      <rect x="55" y="78" width="100" height="14" fill="hsl(24 100% 50%)" rx="3" style={{ filter: 'drop-shadow(0 2px 6px hsl(24 100% 50% / 0.4))' }} />
      <text x="160" y="88" fill="hsl(0 0% 50%)" fontSize="7">120-140</text>
    </svg>
  );
}

function FlowCurve() {
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full p-4">
      <line x1="25" y1="10" x2="25" y2="82" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      <line x1="25" y1="82" x2="190" y2="82" stroke="hsl(0 0% 25%)" strokeWidth="1" />
      
      <text x="12" y="50" fill="hsl(0 0% 50%)" fontSize="6" transform="rotate(-90, 12, 50)">Performance</text>
      <text x="105" y="95" fill="hsl(0 0% 50%)" fontSize="7" textAnchor="middle">Arousal Level</text>
      <text x="35" y="90" fill="hsl(0 0% 40%)" fontSize="6">Low</text>
      <text x="170" y="90" fill="hsl(0 0% 40%)" fontSize="6">High</text>
      
      <path
        d="M30,78 Q55,73 85,25 Q110,8 135,25 Q165,73 188,78"
        fill="none"
        stroke="hsl(24 100% 50%)"
        strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 6px hsl(24 100% 50% / 0.4))' }}
      />
      
      <rect x="75" y="12" width="60" height="50" fill="hsl(24 100% 50%)" fillOpacity="0.1" rx="6" stroke="hsl(24 100% 50%)" strokeOpacity="0.3" strokeWidth="1" />
      <text x="105" y="40" fill="hsl(24 100% 55%)" fontSize="9" textAnchor="middle" fontWeight="bold">FLOW</text>
      <text x="105" y="52" fill="hsl(24 100% 55%)" fontSize="6" textAnchor="middle">ZONE</text>
      
      <circle cx="110" cy="16" r="4" fill="hsl(24 100% 50%)" style={{ filter: 'drop-shadow(0 0 4px hsl(24 100% 50% / 0.6))' }} />
    </svg>
  );
}

const scienceCards = [
  {
    title: "Minimize Cognitive Interference",
    description: "Music with lyrics competes for linguistic processing. Research indicates that lyrics reduce performance on language-heavy tasks by approximately 30%. NeuroBeats uses instrumental patterns engineered to minimize this interference.",
    visual: <WaveformChaosToSimple />,
  },
  {
    title: "Increase Task-Focus, Decrease Mind-Wandering",
    description: "Studies suggest that preferred background music increases task-focus states by 8–15%, primarily by reducing mind-wandering. When you listen to sound optimized for your current task, your brain naturally shifts into a focused state.",
    visual: <FocusGraph />,
  },
  {
    title: "Rhythm as a Cognitive Anchor",
    description: "Predictable rhythm creates stability. When sound is consistent and rhythmic, your brain stops analyzing it and uses it as a background stabilizer. Sudden changes break concentration. Consistent rhythm sustains it.",
    visual: <RhythmComparison />,
  },
  {
    title: "Tempo Matters",
    description: "Reading benefits from 50–80 BPM (minimal stimulation). Math benefits from 80–120 BPM (rhythmic stability). Coding benefits from 100–140 BPM (moderate activation). Research shows that slow music can actually impair processing speed.",
    visual: <TempoChart />,
  },
  {
    title: "Enter Flow. Stay There Longer.",
    description: "Flow happens at optimal arousal levels — not too bored, not overstimulated. NeuroBeats sound profiles maintain this sweet spot, helping you enter flow faster and stay there longer without mental fatigue.",
    visual: <FlowCurve />,
  },
];

export function ScienceCardsSection() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      id="science"
      ref={sectionRef}
      className="relative py-40 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero headline - strengthened */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Muted label - not hero */}
          <p className="text-muted-foreground/70 text-xs font-medium uppercase tracking-wider mb-6">
            Research-Backed Science
          </p>
          {/* Hero element - massive and bold */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            The Science of <span className="text-gradient-orange">Sound & Focus</span>
          </h2>
          {/* Supporting text - muted */}
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            Every design decision is backed by cognitive science research
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scienceCards.map((card, index) => (
            <ScienceCard
              key={card.title}
              title={card.title}
              description={card.description}
              visual={card.visual}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}