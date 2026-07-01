import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CONTACT_INFO, SITE } from '@/lib/constants';

type FormState = 'idle' | 'submitting' | 'success';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

const Contact = () => {
  const [formState, setFormState] = useState<FormState>('idle');
  const [fields, setFields] = useState({
    name: '', email: '', company: '', budget: '', message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact — TechVistar';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 1400));
    setFormState('success');
  };

  const inputClass =
    'w-full rounded-xl border border-white/[0.08] bg-ink-2/60 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#6E7FEF]/50 focus:bg-ink-2 transition-all duration-150';

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative border-b border-white/[0.04] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(94,106,210,0.08) 0%, transparent 60%)' }} />
          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="label-mono text-[#6E7FEF] mb-4">Get in touch</p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-2xl">
                Start a growth
                <br />
                <span className="text-white/30">conversation</span>
              </h1>
              <p className="text-lg text-white/45 max-w-xl leading-relaxed">
                Share your goals, timeline, budget band, and constraints. We'll reply with clarifying questions and a suggested approach.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Contact body ── */}
        <section aria-labelledby="contact-form-heading" className="py-16 lg:py-24">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
              {/* ── Left: Form ── */}
              <motion.div {...fadeUp}>
                <h2 id="contact-form-heading" className="text-2xl font-bold text-white mb-8">
                  Send us a message
                </h2>

                {formState === 'success' ? (
                  <div className="rounded-2xl border border-[#6E7FEF]/25 bg-[#6E7FEF]/[0.06] p-10 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#6E7FEF]/30 bg-[#6E7FEF]/15 mx-auto mb-5">
                      <CheckCircle2 className="h-7 w-7 text-[#8B9CF4]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Message received!</h3>
                    <p className="text-sm text-white/45 leading-relaxed">
                      We'll review your inquiry and respond within one business day (IST).
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-mono text-white/30 block mb-2" htmlFor="name">Name</label>
                        <input
                          id="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className={inputClass}
                          value={fields.name}
                          onChange={(e) => setFields({ ...fields, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label-mono text-white/30 block mb-2" htmlFor="email">Email</label>
                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="your@email.com"
                          className={inputClass}
                          value={fields.email}
                          onChange={(e) => setFields({ ...fields, email: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Company + Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="label-mono text-white/30 block mb-2" htmlFor="company">Company (optional)</label>
                        <input
                          id="company"
                          type="text"
                          placeholder="Company or organization"
                          className={inputClass}
                          value={fields.company}
                          onChange={(e) => setFields({ ...fields, company: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="label-mono text-white/30 block mb-2" htmlFor="budget">Budget range</label>
                        <select
                          id="budget"
                          className={inputClass + ' appearance-none cursor-pointer'}
                          value={fields.budget}
                          onChange={(e) => setFields({ ...fields, budget: e.target.value })}
                        >
                          <option value="" className="bg-ink-2">Select a range</option>
                          <option value="<50k" className="bg-ink-2">Under ₹50,000</option>
                          <option value="50-200k" className="bg-ink-2">₹50,000 – ₹2,00,000</option>
                          <option value="200k-500k" className="bg-ink-2">₹2,00,000 – ₹5,00,000</option>
                          <option value="500k+" className="bg-ink-2">₹5,00,000+</option>
                          <option value="discuss" className="bg-ink-2">Let's discuss</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="label-mono text-white/30 block mb-2" htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        placeholder="Describe your project, goals, and timeline..."
                        className={inputClass + ' resize-none'}
                        value={fields.message}
                        onChange={(e) => setFields({ ...fields, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {formState === 'submitting' ? (
                        <>Sending…<span className="h-4 w-4 animate-spin border-2 border-ink/30 border-t-ink rounded-full" /></>
                      ) : (
                        <>Send message <Send className="h-4 w-4" /></>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* ── Right: info ── */}
              <motion.aside
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.15 }}
                className="space-y-4"
              >
                {/* SLA card */}
                <div className="rounded-2xl border border-[#6E7FEF]/20 bg-[#6E7FEF]/[0.04] p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6E7FEF] animate-signal-pulse" />
                    <span className="label-mono text-[#8B9CF4]">First response</span>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    We acknowledge new business inquiries within <strong className="text-white/80">one business day (IST)</strong>. For urgent production issues from existing clients, please call and reference your engagement ID.
                  </p>
                </div>

                {/* Contact details */}
                <div className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6 space-y-5">
                  {CONTACT_INFO.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-ink-2">
                          <Icon className="h-3.5 w-3.5 text-white/40" strokeWidth={1.75} />
                        </div>
                        <div>
                          <div className="label-mono text-white/20 mb-0.5">{item.title}</div>
                          <div className="text-sm text-white/60">{item.details}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick links */}
                <div className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6">
                  <p className="label-mono text-white/25 mb-4">Quick links</p>
                  <div className="space-y-2.5">
                    {[
                      { label: 'View services', href: '/services' },
                      { label: 'Read about us', href: '/about' },
                      { label: 'AI & Python program', href: '/internship' },
                    ].map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        className="flex items-center justify-between group"
                      >
                        <span className="text-sm text-white/45 group-hover:text-white/80 transition-colors">{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover:text-white/50 transition-all group-hover:translate-x-0.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
