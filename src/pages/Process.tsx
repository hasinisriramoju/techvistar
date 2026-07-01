import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PROCESS_STEPS, PROCESS_PILLARS } from '@/lib/constants';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

const Process = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Process — TechVistar';
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative border-b border-white/[0.04] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(94,106,210,0.08) 0%, transparent 60%)' }} />
          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="label-mono text-[#6E7FEF] mb-4">Delivery framework</p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-2xl">
                Vision to results,
                <br />
                <span className="text-white/30">without guesswork</span>
              </h1>
              <p className="text-xl text-white/45 max-w-xl leading-relaxed">
                A four-phase VISTAR framework: align on vision, build with insight, integrate with strategy, then accelerate results with measured optimization.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── VISTAR pillars ── */}
        <section aria-label="VISTAR pillars" className="border-b border-white/[0.04] bg-ink-2/20">
          <div className="container-site py-10">
            <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-white/[0.06]">
              {PROCESS_PILLARS.map((word) => (
                <div key={word} className="px-8 py-4 text-center">
                  <span className="label-mono text-white/30">{word}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process steps — detailed ── */}
        <section aria-labelledby="steps-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20 lg:py-28">
            <h2 id="steps-heading" className="sr-only">Process steps</h2>
            <div className="relative">
              {/* Vertical spine */}
              <div className="hidden lg:block absolute left-[3.5rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />

              <div className="space-y-6">
                {PROCESS_STEPS.map((step, i) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={step.step}
                      {...fadeUp}
                      transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                      className="relative grid grid-cols-1 lg:grid-cols-[7rem_1fr] gap-6 lg:gap-10"
                    >
                      {/* Step marker */}
                      <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:pt-1">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#6E7FEF]/20 bg-[#6E7FEF]/10">
                          <Icon className="h-6 w-6 text-[#8B9CF4]" strokeWidth={1.75} />
                          {/* Spine dot */}
                          <div className="hidden lg:flex absolute -right-[3.25rem] top-1/2 -translate-y-1/2 h-2 w-2 items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-[#6E7FEF]" />
                          </div>
                        </div>
                        <div className="lg:text-center">
                          <span className="font-mono text-xs font-bold text-[#6E7FEF]/70 block">{step.step}</span>
                          <span className="label-mono text-white/25 block mt-1 lg:hidden">{step.phase}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-7 sm:p-8 hover:border-white/[0.12] transition-colors">
                        <span className="label-mono text-[#6E7FEF]/60 block mb-3">{step.phase}</span>
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-sm text-white/45 leading-relaxed mb-6">{step.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="label-mono text-white/20 mb-3">Deliverables</p>
                            <ul className="space-y-2">
                              {step.deliverables.map((d) => (
                                <li key={d} className="flex items-start gap-2 text-xs text-white/40">
                                  <span className="h-1.5 w-1.5 rounded-full bg-[#6E7FEF]/60 shrink-0 mt-1" />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-end">
                            <div className="inline-flex items-center gap-2 text-xs text-white/25 border border-white/[0.05] rounded-full px-3 py-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#6E7FEF]/40" />
                              {step.duration}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer note */}
            <motion.p
              {...fadeUp}
              className="mt-16 text-center text-sm text-white/25 max-w-2xl mx-auto leading-relaxed"
            >
              The same phases apply whether discovery is a focused workshop or a full audit—governance, documentation, and sign-off stay consistent throughout every engagement.
            </motion.p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-ink-2/20">
          <div className="container-site py-20">
            <motion.div {...fadeUp} className="text-center">
              <h2 className="text-3xl font-bold tracking-[-0.04em] text-white mb-4">
                Ready to start the process?
              </h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto">
                Share your goals and constraints. We'll propose an engagement path and scope that fits.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Process;
