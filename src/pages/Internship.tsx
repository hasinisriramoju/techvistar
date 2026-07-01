import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Phone, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { INTERNSHIP_PROGRAM } from '@/lib/constants';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.05] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors pr-6">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-white/30 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/40 leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Internship = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = '3-Month AI & Python Program — TechVistar';
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative border-b border-white/[0.04] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(94,106,210,0.12) 0%, transparent 60%)' }} />

          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border border-[#6E7FEF]/25 bg-[#6E7FEF]/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B9CF4] animate-signal-pulse" />
                <span className="label-mono text-[#8B9CF4]">{INTERNSHIP_PROGRAM.eyebrow}</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-3xl">
                {INTERNSHIP_PROGRAM.title}{' '}
                <span className="text-gradient-signal">{INTERNSHIP_PROGRAM.titleAccent}</span>
              </h1>
              <p className="text-xl text-white/45 max-w-xl leading-relaxed mb-10">
                {INTERNSHIP_PROGRAM.subtitle}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-10">
                {INTERNSHIP_PROGRAM.summaryStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-start rounded-xl border border-white/[0.06] bg-ink-2/60 px-5 py-4"
                  >
                    <span className="text-xl font-bold text-white">{stat.value}</span>
                    <span className="text-xs text-white/35 mt-0.5">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href={`tel:${INTERNSHIP_PROGRAM.cta.phoneTel}`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6E7FEF] text-white font-bold text-sm hover:bg-[#5E6AD2] transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  {INTERNSHIP_PROGRAM.cta.phoneDisplay}
                </a>
                <a
                  href="mailto:support@techvistar.com"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#6E7FEF]/25 text-[#8B9CF4] font-semibold text-sm hover:border-[#6E7FEF]/50 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  Email to register
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Curriculum ── */}
        <section aria-labelledby="curriculum-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <p className="label-mono text-[#6E7FEF] mb-3">12-week pathway</p>
              <h2 id="curriculum-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white">
                Full curriculum
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {INTERNSHIP_PROGRAM.phases.map((phase, pi) => (
                <motion.div
                  key={phase.key}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: pi * 0.1 }}
                  className="rounded-2xl border border-white/[0.06] bg-ink-2/60 overflow-hidden"
                >
                  {/* Phase header */}
                  <div className="p-6 border-b border-white/[0.05]">
                    <span className="label-mono text-[#6E7FEF]/70 block mb-2">{phase.monthLabel}</span>
                    <h3 className="text-base font-semibold text-white leading-snug">{phase.title}</h3>
                  </div>

                  {/* Weeks */}
                  <ul className="p-4 space-y-1">
                    {phase.weeks.map((week) => (
                      <li key={week.label} className="rounded-xl px-4 py-3 hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="label-mono text-[#6E7FEF]/50 shrink-0 mt-0.5">{week.label}</span>
                          <span className="text-xs text-white/45 leading-relaxed">{week.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Highlights + Audience ── */}
        <section aria-labelledby="highlights-heading" className="border-b border-white/[0.04] bg-ink-2/20">
          <div className="container-site py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Highlights */}
              <motion.div {...fadeUp}>
                <p className="label-mono text-[#6E7FEF] mb-3">Program highlights</p>
                <h2 id="highlights-heading" className="text-2xl font-bold text-white mb-6">What you get</h2>
                <ul className="space-y-3">
                  {INTERNSHIP_PROGRAM.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#6E7FEF]/25 bg-[#6E7FEF]/10 shrink-0">
                        <Check className="h-3 w-3 text-[#8B9CF4]" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm text-white/60">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Audience */}
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                <p className="label-mono text-[#6E7FEF] mb-3">Who it's for</p>
                <h2 className="text-2xl font-bold text-white mb-6">Is this for you?</h2>
                <ul className="space-y-3">
                  {INTERNSHIP_PROGRAM.audience.map((a) => (
                    <li key={a} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#6E7FEF]/60 shrink-0" />
                      <span className="text-sm text-white/60">{a}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section aria-labelledby="faq-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20">
            <motion.div {...fadeUp} className="mb-12">
              <p className="label-mono text-[#6E7FEF] mb-3">Common questions</p>
              <h2 id="faq-heading" className="text-3xl font-bold tracking-[-0.04em] text-white">FAQs</h2>
            </motion.div>

            <div className="max-w-2xl">
              <div className="rounded-2xl border border-white/[0.06] bg-ink-2/60 px-6 divide-y divide-white/[0.05]">
                {INTERNSHIP_PROGRAM.faqs.map((faq) => (
                  <FAQ key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Registration CTA ── */}
        <section className="bg-ink-2/20">
          <div className="container-site py-20">
            <motion.div
              {...fadeUp}
              className="rounded-3xl border border-[#6E7FEF]/20 bg-[#6E7FEF]/[0.04] p-10 sm:p-16 text-center relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at center, rgba(94,106,210,0.1) 0%, transparent 70%)' }} />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border border-[#6E7FEF]/25 bg-[#6E7FEF]/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#8B9CF4] animate-signal-pulse" />
                  <span className="label-mono text-[#8B9CF4]">{INTERNSHIP_PROGRAM.cta.urgent}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white mb-4">
                  Register for the next batch
                </h2>
                <p className="text-white/45 mb-8 max-w-md mx-auto leading-relaxed">
                  Call or WhatsApp us to confirm your seat. Batches are limited to ensure quality guidance.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={`tel:${INTERNSHIP_PROGRAM.cta.phoneTel}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6E7FEF] text-white font-bold text-sm hover:bg-[#5E6AD2] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {INTERNSHIP_PROGRAM.cta.phoneDisplay}
                  </a>
                  <a
                    href="mailto:support@techvistar.com?subject=AI%20Python%20Program%20Registration"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-[#6E7FEF]/25 text-[#8B9CF4] font-semibold text-sm hover:border-[#6E7FEF]/50 transition-colors"
                  >
                    Email to register
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Internship;
