const audiences = [
  {
    title: "Women, 30 and forward",
    body: "Quietly noticing the changes. Refusing to slow down because of them.",
  },
  {
    title: "Active adults",
    body: "Walkers, hikers, dancers, parents — anyone who moves and wants to keep moving.",
  },
  {
    title: "The early careful",
    body: "Those who believe prevention is far smarter than repair.",
  },
];

const AudienceSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container max-w-5xl text-center">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-primary/70 mb-5">
          Who it's for
        </p>
        <h2 className="reveal font-serif text-3xl md:text-5xl font-light text-foreground leading-tight max-w-3xl mx-auto">
          Made for the moments you'd rather not <span className="italic text-primary">postpone.</span>
        </h2>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              className="reveal border-t border-border pt-6"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <h3 className="font-serif text-xl text-foreground font-medium">{a.title}</h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                {a.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
