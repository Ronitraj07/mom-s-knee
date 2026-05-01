import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(1, "Please write a message").max(2000),
});

const ContactSection = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);

    setSubmitting(true);
    const { name, email, message } = parsed.data as { name: string; email: string; message: string };
    const { error } = await supabase.from("contact_submissions").insert([{ name, email, message }]);
    setSubmitting(false);
    if (error) return toast.error(error.message);
    setSubmitted(true);
    toast.success("Message sent. We'll get back to you soon.");
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background">
      <div className="container max-w-3xl">
        <div className="reveal text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold mb-5">Contact</p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground leading-tight">
            Get in <span className="italic text-primary">touch</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground font-light max-w-xl mx-auto">
            Questions, partnerships, or press — we'd love to hear from you.
          </p>
        </div>

        <div className="reveal mt-10 rounded-3xl bg-card/80 backdrop-blur-md border border-border/70 p-6 md:p-10 shadow-soft">
          {submitted ? (
            <div className="text-center py-6">
              <h3 className="font-serif text-2xl text-foreground">Thank you.</h3>
              <p className="mt-2 text-muted-foreground font-light">We've received your message.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="c-name" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                    Name
                  </Label>
                  <Input id="c-name" name="name" required maxLength={100} className="h-12 rounded-xl bg-background border-border/70" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                    Email
                  </Label>
                  <Input id="c-email" name="email" type="email" required maxLength={255} className="h-12 rounded-xl bg-background border-border/70" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-message" className="text-xs uppercase tracking-[0.18em] text-foreground/70">
                  Message
                </Label>
                <Textarea id="c-message" name="message" required maxLength={2000} rows={5} className="rounded-xl bg-background border-border/70" />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full h-12 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                {submitting ? "Sending…" : "Send message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
