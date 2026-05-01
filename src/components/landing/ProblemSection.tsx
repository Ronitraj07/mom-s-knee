const pains = [
  {
    title: "Stiffness when standing",
    body: "That first step from the chair shouldn't be a negotiation.",
  },
  {
    title: "Stairs feel heavier",
    body: "Climbing them used to be unconscious. Now it's a calculation.",
  },
  {
    title: "Quiet daily discomfort",
    body: "Small aches you've stopped mentioning — to others, even to yourself.",
  },
];

const ProblemSection = () => {
  return (
    <section className="relative py-24 md:py-36 bg-background">
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 reveal md:sticky md:top-28">
            <p className="text-xs uppercase tracking-[0.25em] text-primary/70 mb-5">
              The quiet problem
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-foreground">
              Most women don't talk about their <span className="italic text-primary">knees.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md">
              Until one day, the things they used to do without thinking
              start asking permission first.
            </p>
          </div>

          <div className="md:col-span-7 space-y-4 md:space-y-6">
            {pains.map((p, i) => (
              <div
                key={p.title}
                className="reveal group rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-7 md:p-9 transition-smooth hover:border-primary/30 hover:shadow-soft"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-5">
                  <span className="mt-1 font-serif text-2xl text-gold/80 italic">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground font-light">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {p.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
