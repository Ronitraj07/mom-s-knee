import lifestyleYoga from "@/assets/lifestyle-yoga.jpg";

const ScienceSection = () => {
  return (
    <section className="relative py-24 md:py-36 bg-background">
      <div className="container max-w-6xl grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="reveal order-2 md:order-1 relative">
          <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-soft">
            <img
              src={lifestyleYoga}
              alt="Woman holding a strong yoga pose, embodying mobility"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -right-4 md:-right-8 rounded-2xl bg-card border border-border/80 shadow-soft px-5 py-4 max-w-[200px]">
            <p className="text-xs uppercase tracking-[0.2em] text-gold mb-1">Certifications</p>
            <p className="text-sm font-medium text-foreground">FSSAI · GMP · ISO</p>
            <p className="text-[11px] text-muted-foreground mt-1 italic">Placeholder pending launch</p>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <p className="reveal text-xs uppercase tracking-[0.25em] text-primary/70 mb-5">
            Backed by research
          </p>
          <h2 className="reveal font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground">
            Designed for <span className="italic text-primary">real life,</span>
            not for clinics.
          </h2>
          <p className="reveal mt-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed">
            A modern nutraceutical approach — grounded in science, focused on
            prevention, and shaped around how you already move through your day.
          </p>

          <ul className="reveal mt-10 space-y-5">
            {[
              { k: "Nutraceutical-first", v: "Researched ingredients in clinically considered ratios." },
              { k: "Preventive by design", v: "Built for daily care, not last-resort intervention." },
              { k: "Quietly effective", v: "No loud claims. Just thoughtful, consistent support." },
            ].map((item) => (
              <li key={item.k} className="flex gap-4 border-l-2 border-gold/60 pl-5">
                <div>
                  <p className="font-serif text-lg text-foreground font-medium">{item.k}</p>
                  <p className="text-sm text-muted-foreground font-light">{item.v}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ScienceSection;
