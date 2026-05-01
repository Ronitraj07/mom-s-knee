const benefits = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3v18M5 8c0 4 3 6 7 6s7-2 7-6M5 16c0 4 3 6 7 6s7-2 7-6" strokeLinecap="round" />
      </svg>
    ),
    title: "Bone strength",
    body: "Foundational nutrients for long-term skeletal resilience.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3a9 9 0 0 0 0 18M3 12h18" strokeLinecap="round" />
      </svg>
    ),
    title: "Cartilage support",
    body: "Targeted care for the cushioning that keeps you moving.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 12c4-6 14-6 18 0M3 12c4 6 14 6 18 0" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
    title: "Mobility, returned",
    body: "A daily ritual designed for fluid, confident movement.",
  },
];

const SolutionTeaser = () => {
  return (
    <section className="relative py-24 md:py-36 bg-gradient-soft overflow-hidden">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="container max-w-5xl text-center relative">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-gold mb-6">
          Something is coming
        </p>
        <h2 className="reveal font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.05] text-foreground">
          Something <span className="italic text-primary">powerful</span> is on the way —
          <br className="hidden md:block" />
          <span className="text-foreground/70"> built for the way you actually live.</span>
        </h2>

        <div className="mt-20 grid md:grid-cols-3 gap-6 md:gap-8 text-left">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="reveal rounded-2xl bg-background/70 backdrop-blur-sm border border-border/60 p-8 transition-smooth hover:border-primary/40 hover:-translate-y-1 hover:shadow-soft"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary mb-5">
                {b.icon}
              </div>
              <h3 className="font-serif text-xl text-foreground font-medium">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionTeaser;
