import { Button } from "@/components/ui/button";
import heroWoman from "@/assets/hero-woman.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden bg-gradient-hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroWoman}
          alt="Woman walking freely outdoors at golden hour"
          width={1920}
          height={1080}
          className="h-full w-full object-cover object-center opacity-90 animate-fade-in-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Top brand mark */}
      <div className="relative z-10 container pt-8 md:pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-gold animate-glow-pulse" />
          <span className="font-serif text-lg md:text-xl text-foreground tracking-tight">
            Mom's <span className="italic text-primary">Knee</span>
          </span>
        </div>
        <span className="hidden sm:block text-xs uppercase tracking-[0.25em] text-foreground/60">
          Coming soon
        </span>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container flex min-h-[78vh] flex-col justify-center max-w-2xl">
        <p className="mb-6 inline-block w-fit rounded-full border border-primary/20 bg-background/60 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-primary animate-fade-in">
          A new chapter in knee health
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light leading-[1.02] text-foreground animate-fade-in" style={{ animationDelay: "120ms" }}>
          Empowering<br />
          <span className="italic text-primary">movement.</span><br />
          <span className="text-foreground/70">Coming soon.</span>
        </h1>
        <p className="mt-8 max-w-lg text-base md:text-lg leading-relaxed text-muted-foreground font-light animate-fade-in" style={{ animationDelay: "260ms" }}>
          A new approach to knee health designed for strength, flexibility,
          and long-term care — for the life you still want to live.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <Button
            size="lg"
            className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-soft"
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Join the waitlist
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="h-12 px-6 rounded-full text-foreground hover:bg-foreground/5"
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get early access →
          </Button>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-foreground/50 animate-fade-in" style={{ animationDelay: "700ms" }}>
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-foreground/30" />
      </div>
    </section>
  );
};

export default Hero;
