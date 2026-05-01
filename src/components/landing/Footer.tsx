const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-2 w-2 rounded-full bg-gold animate-glow-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-foreground/70">
                Launching soon
              </span>
            </div>
            <p className="font-serif text-2xl text-foreground font-light italic">
              Move freely again.
            </p>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground font-light">
            <a href="#" aria-label="Instagram" className="hover:text-primary transition-smooth">
              Instagram
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-smooth">
              LinkedIn
            </a>
            <a href="#" aria-label="Email" className="hover:text-primary transition-smooth">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground/80 font-light">
          <p>© {new Date().getFullYear()} — All rights reserved.</p>
          <p className="italic">
            Statements have not been evaluated for diagnosis, treatment, or cure of any condition.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
