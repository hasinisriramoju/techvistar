import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { SiteSection } from "@/components/SiteSection";

import {
  CONTACT_INFO,
  CONTACT_SIDEBAR,
  SECTION_CONTACT,
} from "@/lib/constants";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const ContactSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const params = new URLSearchParams();
      params.append("name", formData.name);
      params.append("email", formData.email);
      params.append("subject", formData.subject);
      params.append("message", formData.message);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyVFalUML0Mnb-S2RuoCA68d5422p5MvMWF_id4Uw-MIQyiH5PxiglxPGdHDV47QJ22/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params.toString(),
        },
      );

      if (response.ok) {
        toast({
          title: "Inquiry received",
          description:
            "We will respond within one business day where possible.",
        });
        setFormData(initialFormData);
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast({
        title: "Unable to send",
        description: "Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SiteSection
      ref={ref}
      id="contact"
      variant="muted"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-background border-b border-border-subtle"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-[0.15]" />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {SECTION_CONTACT.tag && (
            <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              {SECTION_CONTACT.tag}
            </p>
          )}
          <h2
            id="contact-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {SECTION_CONTACT.title}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{SECTION_CONTACT.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {SECTION_CONTACT.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="md:col-span-2 space-y-5"
          >
            <div className="space-y-5">
              {CONTACT_INFO.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.06 + index * 0.04 }}
                  className="flex gap-4 rounded-xl border border-border-subtle bg-surface-charcoal/40 p-4 shadow-xl shadow-black/20"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20"
                  >
                    <info.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4
                      className="font-semibold font-display text-white text-sm"
                    >
                      {info.title}
                    </h4>
                    <p className="text-xs mt-0.5 text-muted-foreground">
                      {info.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-border-subtle bg-surface-charcoal/50 backdrop-blur-xl p-6 shadow-xl shadow-black/25">
              <h4
                className="font-semibold font-display text-primary text-sm mb-2"
              >
                {CONTACT_SIDEBAR.slaTitle}
              </h4>
              <p
                className="text-xs leading-relaxed text-muted-foreground"
              >
                {CONTACT_SIDEBAR.slaBody}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.06 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border-subtle bg-surface-charcoal/30 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-black/40"
              aria-label="Project inquiry form"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Full name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Name as per business records"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border-subtle text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/30 text-xs"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                  >
                    Work email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@organization.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border-subtle text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/30 text-xs"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Subject / reference
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. RFP — mobile app Q3"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border-border-subtle text-white focus-visible:ring-primary focus-visible:border-primary placeholder:text-muted-foreground/30 text-xs"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2"
                >
                  Requirements summary
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Goals, timeline, budget band, integrations, compliance constraints, and success criteria."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background border-border-subtle text-white focus-visible:ring-primary focus-visible:border-primary resize-none placeholder:text-muted-foreground/30 text-xs"
                />
              </div>

              <Button
                variant="default"
                size="lg"
                type="submit"
                className="w-full group bg-primary text-background font-bold text-xs uppercase tracking-wider h-11 shadow-[0_0_15px_-3px_rgba(171,199,255,0.3)] hover:opacity-95 border-none"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting…" : "Submit inquiry"}
                <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </SiteSection>
  );
};
