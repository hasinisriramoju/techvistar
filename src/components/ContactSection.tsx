import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';

import { CONTACT_INFO, CONTACT_SIDEBAR, SECTION_CONTACT } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
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
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject);
      params.append('message', formData.message);

      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbyVFalUML0Mnb-S2RuoCA68d5422p5MvMWF_id4Uw-MIQyiH5PxiglxPGdHDV47QJ22/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }
      );

      if (response.ok) {
        toast({
          title: 'Inquiry received',
          description: 'We will respond within one business day where possible.',
        });
        setFormData(initialFormData);
      } else {
        throw new Error('Failed to send message');
      }
    } catch {
      toast({
        title: 'Unable to send',
        description: 'Please try again or email us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <SiteSection
      ref={ref}
      id="contact"
      variant="muted"
      aria-labelledby="contact-heading"
      style={{
        background: '#E1EBF0',
        borderTop: '1px solid rgba(19,38,58,0.10)',
      }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(90vw,520px)] w-[min(90vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,.45), transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#6CD99C]">
            {SECTION_CONTACT.tag}
          </p>
          <h2
            id="contact-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-[#13263A] sm:text-5xl"
          >
            {SECTION_CONTACT.title}{'\u0020'}
            <span className="text-[#6CD99C]">{SECTION_CONTACT.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#475569]">
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
                  className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                    style={{ background: 'rgba(19,38,58,0.08)', color: '#13263A' }}
                  >
                    <info.icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h4 className="font-semibold font-display" style={{ color: '#13263A' }}>{info.title}</h4>
                    <p className="text-sm mt-0.5" style={{ color: '#475569' }}>{info.details}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-xl border border-[rgba(19,38,58,0.15)] bg-white p-6 shadow-sm">
              <h4 className="font-semibold font-display mb-2" style={{ color: '#13263A' }}>{CONTACT_SIDEBAR.slaTitle}</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{CONTACT_SIDEBAR.slaBody}</p>
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
              className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-md"
              aria-label="Project inquiry form"
            >
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#13263A' }}>
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
                    className="bg-background border-border focus-visible:ring-[#13263A]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#13263A' }}>
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
                    className="bg-background border-border focus-visible:ring-[#13263A]"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-semibold mb-2" style={{ color: '#13263A' }}>
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
                  className="bg-background border-border focus-visible:ring-[#13263A]"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: '#13263A' }}>
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
                  className="bg-background border-border focus-visible:ring-[#13263A] resize-none"
                />
              </div>

              <Button
                variant="hero"
                size="lg"
                type="submit"
                className="w-full group"
                disabled={isSubmitting}
                style={{ background: '#13263A', color: '#ffffff', border: 'none' }}
              >
                {isSubmitting ? 'Submitting…' : 'Submit inquiry'}
                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </SiteSection>
  );
};