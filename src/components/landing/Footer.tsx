import { useSiteContent } from "@/hooks/useSiteContent";

const Footer = () => {
  const { content } = useSiteContent(["socials", "motto"]);
  const socials = content.socials ?? {};
  const motto = (content.motto?.text as string) || "Move freely again.";

  const links: { label: string; href: string }[] = [];
  if (socials.instagram) links.push({ label: "Instagram", href: socials.instagram });
  if (socials.facebook) links.push({ label: "Facebook", href: socials.facebook });
  if (socials.tiktok) links.push({ label: "TikTok", href: socials.tiktok });
  if (socials.email) links.push({ label: "Contact", href: `mailto:${socials.email}` });

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
            <p className="font-serif text-3xl text-foreground font-light tracking-tight">
              Mom's <span className="italic text-primary">Knee</span>
            </p>
            <p className="mt-2 font-serif text-sm text-muted-foreground italic">{motto}</p>
          </div>

          <nav className="flex items-center gap-6 text-sm text-muted-foreground font-light flex-wrap">
            {links.length > 0 ? (
              links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="hover:text-primary transition-smooth"
                >
                  {l.label}
                </a>
              ))
            ) : (
              <a href="#contact" className="hover:text-primary transition-smooth">
                Contact
              </a>
            )}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground/80 font-light">
          <p>© {new Date().getFullYear()} Mom's Knee — All rights reserved.</p>
          <p className="italic">
            Statements have not been evaluated for diagnosis, treatment, or cure of any condition.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
