import productSilhouette from "@/assets/product-silhouette.jpg";

const ProductTeaser = () => {
  return (
    <section className="relative py-24 md:py-36 bg-primary text-primary-foreground overflow-hidden">
      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-glow-pulse" />
      </div>

      <div className="container max-w-6xl grid md:grid-cols-2 gap-16 items-center relative">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-6">
            The product
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05]">
            Minimal outside.
            <br />
            <span className="italic text-gold">Powerful inside.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-primary-foreground/75 font-light leading-relaxed max-w-md">
            Considered packaging. Considered formulation. Every detail kept
            quietly intentional — until the moment you need it.
          </p>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-xs uppercase tracking-[0.25em] text-primary-foreground/60">
              Reveal · Soon
            </span>
          </div>
        </div>

        <div className="reveal relative flex justify-center md:justify-end">
          <div className="relative animate-float">
            {/* Glow behind product */}
            <div className="absolute inset-0 -m-8 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative aspect-[3/4] w-64 md:w-80 overflow-hidden rounded-3xl shadow-glow">
              <img
                src={productSilhouette}
                alt="Silhouette of upcoming wellness product packaging"
                loading="lazy"
                width={1024}
                height={1280}
                className="h-full w-full object-cover blur-[2px] scale-105"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTeaser;
