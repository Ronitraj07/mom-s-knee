import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const waitlistSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(80, "Name is too long"),
  email: z.string().trim().email("Enter a valid email address").max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone is too long")
    .regex(/^[+\d\s()-]*$/, "Phone contains invalid characters")
    .optional()
    .or(z.literal("")),
});

const WaitlistSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = waitlistSchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") ?? "",
    });

    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setSubmitting(true);
    const { name, email, phone } = parsed.data as { name: string; email: string; phone?: string };
    const { error } = await supabase
      .from("waitlist_signups")
      .insert([{ name, email, phone: phone || null }]);
    setSubmitting(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("This email is already on the waitlist.");
      } else {
        toast.error(error.message);
      }
      return;
    }
    setSubmitted(true);
    toast.success("You're on the list. We'll be in touch.");
  };

  return (
    <section
      id="waitlist"
      className="relative py-24 md:py-36 bg-gradient-soft overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-1/4 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container max-w-3xl relative">
        <div className="reveal text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5">
            Early access
          </p>
          <h2 className="font-serif text-4xl md:text-6xl font-light text-foreground leading-tight">
            Be the first to experience
            <br />
            <span className="italic text-primary">pain-free movement.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Join the waitlist for launch updates, founding-member pricing,
            and a quiet first look at what's coming.
          </p>
        </div>

        <div className="reveal mt-12 rounded-3xl bg-card/80 backdrop-blur-md border border-border/70 p-6 md:p-10 shadow-soft">
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-primary mb-5">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-foreground">You're on the list.</h3>
              <p className="mt-2 text-muted-foreground font-light">
                Thank you. We'll reach out before launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    maxLength={80}
                    placeholder="Your name"
                    className="h-12 rounded-xl bg-background border-border/70 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={255}
                    placeholder="you@example.com"
                    className="h-12 rounded-xl bg-background border-border/70 focus-visible:ring-primary"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                  Phone <span className="text-muted-foreground/70 normal-case tracking-normal">(optional)</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={20}
                  placeholder="+1 555 000 0000"
                  className="h-12 rounded-xl bg-background border-border/70 focus-visible:ring-primary"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full h-12 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {submitting ? "Joining…" : "Join the waitlist"}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground/80 font-light">
                We'll only use your details to share launch updates. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
