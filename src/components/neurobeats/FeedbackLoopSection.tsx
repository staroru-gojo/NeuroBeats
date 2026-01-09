import { useInView } from '@/hooks/useInView';

export function FeedbackLoopSection() {
  const [sectionRef, isInView] = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-40 px-6 bg-card">
      <div className="max-w-5xl mx-auto">
        {/* Hero headline - strengthened */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Muted label */}
          <p className="text-muted-foreground/70 text-xs font-medium uppercase tracking-wider mb-6">
            Personalization
          </p>
          {/* Hero element */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            It Learns How Your <span className="text-gradient-orange">Brain Works</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - reduced visual weight */}
          <div className={`transition-all duration-1000 delay-200 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-xl text-muted-foreground/80 mb-8 leading-relaxed">
              Every focus session generates data. After each session, you give simple feedback: 
              <span className="text-foreground font-semibold"> "Helped"</span> or 
              <span className="text-foreground font-semibold"> "Didn't Help"</span>. That's it.
            </p>
            <p className="text-base text-muted-foreground/70 mb-6">NeuroBeats uses this feedback to:</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-base text-muted-foreground/80">
                <span className="w-1.5 h-1.5 bg-border rounded-full flex-shrink-0" />
                Reinforce sound profiles that worked
              </li>
              <li className="flex items-center gap-3 text-base text-muted-foreground/80">
                <span className="w-1.5 h-1.5 bg-border rounded-full flex-shrink-0" />
                Reduce sound profiles that didn't
              </li>
              <li className="flex items-center gap-3 text-base text-muted-foreground/80">
                <span className="w-1.5 h-1.5 bg-border rounded-full flex-shrink-0" />
                Gradually personalize to your unique brain
              </li>
            </ul>
            <p className="text-lg text-foreground font-semibold">Over time, it becomes better at helping <em>you</em>.</p>
          </div>

          {/* Right column - visual */}
          <div className={`transition-all duration-1000 delay-400 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-background rounded-xl border border-border p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">Successful profile</span>
                  <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-primary rounded-full transition-all duration-1500 ${isInView ? 'w-4/5' : 'w-0'}`} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-muted-foreground/30 rounded-full flex-shrink-0" />
                  <span className="text-sm text-muted-foreground/70 font-medium">Unsuccessful profile</span>
                  <div className="flex-1 h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div className={`h-full bg-muted-foreground/30 rounded-full transition-all duration-1500 delay-300 ${isInView ? 'w-1/5' : 'w-3/5'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}