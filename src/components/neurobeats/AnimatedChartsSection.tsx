import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Tooltip,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-xl">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function AttentionShiftChart({ isVisible }: { isVisible: boolean }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const data = [
    { name: 'Without Music', taskFocus: 54, mindWandering: 27, external: 19 },
    { name: 'With Music', taskFocus: 62, mindWandering: 18, external: 20 },
  ];

  return (
    <div className="group bg-card rounded-xl border border-border p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h3 className="text-base font-semibold mb-1 group-hover:text-gradient-orange transition-all">How Optimized Music Shifts Your Attention</h3>
      <p className="text-xs text-muted-foreground/70 mb-6">Attention distribution comparison</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barGap={8}>
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              tick={{ fill: 'hsl(0 0% 50%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={{ stroke: 'hsl(0 0% 25%)' }}
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100} 
              tick={{ fill: 'hsl(0 0% 70%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: 11, color: 'hsl(0 0% 60%)' }}
            />
            <Bar
              dataKey="taskFocus"
              name="Task-Focus"
              stackId="a"
              fill="hsl(24 100% 50%)"
              radius={[0, 0, 0, 0]}
              animationDuration={animate ? 1500 : 0}
            />
            <Bar
              dataKey="mindWandering"
              name="Mind-Wandering"
              stackId="a"
              fill="hsl(0 0% 35%)"
              radius={[0, 0, 0, 0]}
              animationDuration={animate ? 1500 : 0}
              animationBegin={300}
            />
            <Bar
              dataKey="external"
              name="External Distraction"
              stackId="a"
              fill="hsl(0 0% 25%)"
              radius={[0, 4, 4, 0]}
              animationDuration={animate ? 1500 : 0}
              animationBegin={600}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function LyricalVsInstrumentalChart({ isVisible }: { isVisible: boolean }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const data = [
    { task: 'Verbal Memory', silence: 87, instrumental: 88, lyrics: 60 },
    { task: 'Reading', silence: 85, instrumental: 91, lyrics: 60 },
  ];

  return (
    <div className="group bg-card rounded-xl border border-border p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h3 className="text-base font-semibold mb-1 group-hover:text-gradient-orange transition-all">Why Instrumental Music Works Better</h3>
      <p className="text-xs text-muted-foreground/70 mb-6">Performance scores by audio condition</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4} barCategoryGap="20%">
            <XAxis 
              dataKey="task" 
              tick={{ fill: 'hsl(0 0% 70%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: 'hsl(0 0% 50%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={{ stroke: 'hsl(0 0% 25%)' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(0 0% 60%)' }} />
            <Bar
              dataKey="silence"
              name="Silence"
              fill="hsl(0 0% 30%)"
              radius={[4, 4, 0, 0]}
              animationDuration={animate ? 1200 : 0}
            />
            <Bar
              dataKey="instrumental"
              name="Instrumental"
              fill="hsl(24 100% 50%)"
              radius={[4, 4, 0, 0]}
              animationDuration={animate ? 1200 : 0}
              animationBegin={200}
            />
            <Bar
              dataKey="lyrics"
              name="With Lyrics"
              fill="hsl(0 0% 40%)"
              radius={[4, 4, 0, 0]}
              animationDuration={animate ? 1200 : 0}
              animationBegin={400}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function BPMChart({ isVisible }: { isVisible: boolean }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 700);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const data = [
    { task: 'Reading', min: 50, max: 80, opacity: 0.6 },
    { task: 'Math', min: 80, max: 120, opacity: 0.75 },
    { task: 'Coding', min: 100, max: 140, opacity: 0.9 },
    { task: 'Creative', min: 120, max: 140, opacity: 1 },
  ];

  return (
    <div className="group bg-card rounded-xl border border-border p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h3 className="text-base font-semibold mb-1 group-hover:text-gradient-orange transition-all">Task-Specific Tempo Recommendations</h3>
      <p className="text-xs text-muted-foreground/70 mb-6">Optimal BPM ranges by task type</p>
      
      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={item.task} className="relative group/bar">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground font-medium">{item.task}</span>
              <span className="text-muted-foreground/70 font-mono text-xs">{item.min}–{item.max} BPM</span>
            </div>
            <div className="h-3 bg-muted/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out relative"
                style={{
                  width: animate ? `${((item.max - 40) / 120) * 100}%` : '0%',
                  marginLeft: `${((item.min - 40) / 120) * 100}%`,
                  background: `linear-gradient(90deg, hsl(24 100% 45% / ${item.opacity}), hsl(24 100% 55% / ${item.opacity}))`,
                  transitionDelay: `${index * 150}ms`,
                  boxShadow: animate ? '0 0 12px hsl(24 100% 50% / 0.4)' : 'none',
                }}
              />
            </div>
          </div>
        ))}
        
        <div className="flex justify-between text-xs text-muted-foreground/60 pt-3 border-t border-border/50 mt-6">
          <span>40 BPM</span>
          <span>80</span>
          <span>120</span>
          <span>160 BPM</span>
        </div>
      </div>
    </div>
  );
}

function CognitiveLoadChart({ isVisible }: { isVisible: boolean }) {
  const [animate, setAnimate] = useState(false);
  const [data, setData] = useState<{ time: number; chaos: number; optimized: number }[]>([]);

  useEffect(() => {
    const points = Array.from({ length: 25 }, (_, i) => {
      const t = i / 24;
      return {
        time: i,
        chaos: 45 + Math.sin(t * 6) * 20 + Math.sin(t * 12) * 12 + Math.cos(t * 3) * 8,
        optimized: 25 + Math.sin(t * 1.5) * 4,
      };
    });
    setData(points);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setAnimate(true), 900);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div className="group bg-card rounded-xl border border-border p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10">
      <h3 className="text-base font-semibold mb-1 group-hover:text-gradient-orange transition-all">How Optimized Sound Sustains Focus</h3>
      <p className="text-xs text-muted-foreground/70 mb-6">Cognitive load comparison over time</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="optimizedGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(24 100% 45%)" />
                <stop offset="100%" stopColor="hsl(24 100% 55%)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <XAxis 
              dataKey="time" 
              tick={{ fill: 'hsl(0 0% 50%)', fontSize: 10 }}
              tickFormatter={() => ''}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={false}
              label={{ value: 'Time →', position: 'bottom', fill: 'hsl(0 0% 50%)', fontSize: 11, dy: 5 }}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: 'hsl(0 0% 50%)', fontSize: 11 }}
              axisLine={{ stroke: 'hsl(0 0% 25%)' }}
              tickLine={{ stroke: 'hsl(0 0% 25%)' }}
              label={{ value: 'Cognitive Load %', angle: -90, position: 'insideLeft', fill: 'hsl(0 0% 50%)', fontSize: 11, dx: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: 'hsl(0 0% 60%)' }} />
            <Line
              type="monotone"
              dataKey="chaos"
              name="Chaotic Music"
              stroke="hsl(0 0% 45%)"
              strokeWidth={1.5}
              dot={false}
              animationDuration={animate ? 2500 : 0}
              strokeDasharray="4 2"
            />
            <Line
              type="monotone"
              dataKey="optimized"
              name="Optimized Sound"
              stroke="url(#optimizedGradient)"
              strokeWidth={2.5}
              dot={false}
              animationDuration={animate ? 2500 : 0}
              animationBegin={400}
              filter="url(#glow)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function AnimatedChartsSection() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-40 px-6 bg-muted/50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background pointer-events-none" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Hero headline - strengthened */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Muted label */}
          <p className="text-muted-foreground/70 text-xs font-medium uppercase tracking-wider mb-6">
            Data Visualization
          </p>
          {/* Hero element */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            See the <span className="text-gradient-orange">Difference</span>
          </h2>
          {/* Supporting text */}
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            Research-backed data showing how optimized sound impacts focus and performance
          </p>
        </div>

        {/* Charts grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <AttentionShiftChart isVisible={isInView} />
          </div>
          <div className={`transition-all duration-700 delay-150 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <LyricalVsInstrumentalChart isVisible={isInView} />
          </div>
          <div className={`transition-all duration-700 delay-300 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <BPMChart isVisible={isInView} />
          </div>
          <div className={`transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '450ms' }}>
            <CognitiveLoadChart isVisible={isInView} />
          </div>
        </div>
      </div>
    </section>
  );
}