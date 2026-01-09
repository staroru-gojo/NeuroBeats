import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { useMousePosition } from '@/hooks/useMousePosition';
import { NeuralWaveform } from './NeuralWaveform';
import { cn } from '@/lib/utils';

const tasks = {
  MATH: {
    name: 'Math',
    bpm: '80–120 BPM',
    description: 'Math requires mental endurance. Your sound profile provides rhythmic anchoring without distraction.',
    characteristics: ['Rhythmic stability', 'No lyrics', 'Moderate stimulation', 'Consistent energy'],
    color: 'from-primary/20 to-primary/5',
    audioSrc: '/audio/maths.m4a',
  },
  READING: {
    name: 'Reading',
    bpm: '50–80 BPM',
    description: 'Reading demands minimal cognitive interference. Slow, ambient textures support comprehension.',
    characteristics: ['Slow tempo', 'Ambient textures', 'No complexity', 'Gentle dynamics'],
    color: 'from-primary/15 to-transparent',
    audioSrc: '/audio/read.mp3',
  },
  CODING: {
    name: 'Coding',
    bpm: '100–140 BPM',
    description: 'Coding benefits from moderate activation. Driving rhythm keeps you engaged without overwhelming.',
    characteristics: ['Higher tempo', 'Steady pulse', 'Layered textures', 'Progressive builds'],
    color: 'from-primary/25 to-primary/10',
    audioSrc: '/audio/code.m4a',
  },
  CREATIVE: {
    name: 'Creative',
    bpm: '120–140 BPM',
    description: 'Creative work thrives on inspiration. Dynamic, evolving soundscapes spark new ideas.',
    characteristics: ['Energetic tempo', 'Varied textures', 'Emotional depth', 'Subtle variety'],
    color: 'from-primary/30 to-primary/15',
    audioSrc: '/audio/creative.m4a',
  },
};

type TaskKey = keyof typeof tasks;

export function InteractiveDemoSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2 });
  const { normalizedX, normalizedY } = useMousePosition(containerRef);
  const [activeTask, setActiveTask] = useState<TaskKey | null>(null); // Start with null
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTask = activeTask ? tasks[activeTask] : null;

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;
    
    audioRef.current.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      setAudioError('Failed to load audio. Please check the file path.');
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (timerRef.current) clearInterval(timerRef.current);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const fadeOutAudio = (callback: () => void) => {
    if (!audioRef.current) {
      callback();
      return;
    }

    const audio = audioRef.current;
    const startVolume = audio.volume;
    const fadeStep = startVolume / 20;
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume > fadeStep) {
        audio.volume = Math.max(0, audio.volume - fadeStep);
      } else {
        audio.volume = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        callback();
      }
    }, 50);
  };

  const fadeInAudio = () => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    const targetVolume = 0.7;
    const fadeStep = targetVolume / 20;
    
    audio.volume = 0;
    
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    
    fadeIntervalRef.current = setInterval(() => {
      if (audio.volume < targetVolume - fadeStep) {
        audio.volume = Math.min(targetVolume, audio.volume + fadeStep);
      } else {
        audio.volume = targetVolume;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 50);
  };

  const handleTaskChange = (task: TaskKey) => {
    setAudioError(null);
    const newAudioSrc = tasks[task].audioSrc;

    if (isPlaying && audioRef.current && activeTask !== task) {
      fadeOutAudio(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.src = newAudioSrc;
          audioRef.current.load();
          
          audioRef.current.play()
            .then(() => {
              fadeInAudio();
              setActiveTask(task);
              setSessionTime(0);
              startTimer();
            })
            .catch((error) => {
              console.error('Audio playback failed:', error);
              setAudioError('Playback failed. Click again to retry.');
              setIsPlaying(false);
            });
        }
      });
    } else {
      setActiveTask(task);
      
      if (audioRef.current) {
        audioRef.current.src = newAudioSrc;
        audioRef.current.load();
        
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            fadeInAudio();
            setSessionTime(0);
            startTimer();
          })
          .catch((error) => {
            console.error('Audio playback failed:', error);
            setAudioError('Click the button again to start audio');
            setIsPlaying(false);
          });
      }
    }
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
  };

  const handleStopSession = () => {
    if (audioRef.current) {
      fadeOutAudio(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setSessionTime(0);
      });
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section 
      id="demo" 
      ref={sectionRef}
      className="relative py-40 px-6 bg-muted/30 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background pointer-events-none" />
      
      <div 
        className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${normalizedX * 30}px, ${normalizedY * 20}px)`,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      <div 
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none"
        style={{
          transform: `translate(${normalizedX * -25}px, ${normalizedY * -15}px)`,
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      
      <div className="relative max-w-6xl mx-auto">
        <div 
          className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{
            transform: `translateY(${isInView ? normalizedY * 5 : 8}px)`,
            transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Muted label */}
          <p className="text-muted-foreground/70 text-xs font-medium uppercase tracking-wider mb-6">Interactive Demo</p>
          {/* Hero headline */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Watch Sound <span className="text-gradient-orange">Adapt</span>
          </h2>
          {/* Supporting text */}
          <p className="text-muted-foreground/80 text-lg max-w-2xl mx-auto">
            Select a task to see how NeuroBeats optimizes your audio profile
          </p>
        </div>

        {audioError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-center">
            <p className="text-destructive text-sm">{audioError}</p>
          </div>
        )}

        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          {(Object.keys(tasks) as TaskKey[]).map((task) => (
            <button
              key={task}
              onClick={() => handleTaskChange(task)}
              className={cn(
                'px-8 py-4 rounded-xl font-semibold transition-all duration-300',
                'hover:scale-[1.03] active:scale-[0.97]',
                'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background',
                activeTask === task
                  ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/30'
                  : 'bg-card border border-border text-foreground hover:border-primary/50 hover:bg-muted hover:shadow-lg'
              )}
            >
              {tasks[task].name}
            </button>
          ))}
        </div>

        <div className={`h-64 mb-12 transition-all duration-700 delay-300 ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative h-full bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
            <div className={cn(
              "absolute inset-0 bg-gradient-to-r transition-all duration-700",
              currentTask ? currentTask.color : 'from-muted/10 to-transparent'
            )} />
            
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `linear-gradient(hsl(0 0% 50% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50% / 0.1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }} />
            
            <div className="pointer-events-none">
              <NeuralWaveform 
                isOptimized={!!activeTask} 
                color="orange"
                mouseX={0.5}
                mouseY={0.5}
              />
            </div>
            
            {currentTask && (
              <>
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-5 py-2.5 rounded-xl border border-border shadow-lg">
                  <span className="text-primary font-mono text-xl font-bold">{currentTask.bpm}</span>
                </div>
                
                <div className="absolute top-4 left-4 bg-primary/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/20">
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">{currentTask.name} Mode</span>
                </div>
              </>
            )}
            
            {isPlaying && (
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <button
                  onClick={handleStopSession}
                  className="flex items-center gap-3 bg-card/90 backdrop-blur-sm hover:bg-card px-5 py-3 rounded-xl border border-border transition-all duration-300 hover:shadow-lg group"
                >
                  <div className="relative">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-3 h-3 bg-primary rounded-full animate-ping opacity-50" />
                  </div>
                  <span className="font-mono text-lg font-semibold text-foreground">{formatTime(sessionTime)}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Click to stop</span>
                </button>
              </div>
            )}
            
            {!activeTask && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">Select a task above to preview</p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span className="text-sm font-medium">Try it now</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {currentTask ? (
          <div className={`bg-card rounded-2xl border border-border p-8 shadow-xl transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="md:w-1/3">
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2">Optimized For</p>
                <h3 className="text-4xl font-bold text-gradient-orange mb-3">{currentTask.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <p className="text-primary font-semibold text-base">{currentTask.bpm}</p>
                </div>
              </div>
              <div className="md:w-2/3">
                <p className="text-muted-foreground/80 text-base mb-8 leading-relaxed">{currentTask.description}</p>
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-4">Sound Characteristics</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {currentTask.characteristics.map((char, index) => (
                    <div 
                      key={char} 
                      className="flex items-center gap-3 text-foreground bg-muted/30 rounded-xl px-5 py-3 border border-border/30 transition-all duration-300 hover:border-primary/30 hover:bg-muted/50"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <span className="w-1.5 h-1.5 bg-border rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium">{char}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={`bg-card/50 rounded-2xl border border-dashed border-border p-12 text-center transition-all duration-500 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-3">Ready to Experience NeuroBeats?</h3>
              <p className="text-muted-foreground text-lg">
                Choose a task type above to hear how our sound engine adapts to your cognitive needs.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}