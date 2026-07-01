import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ABOUT_COPY, ABOUT_PAGE, ABOUT_STATS, SITE } from '@/lib/constants';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About — TechVistar';
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-white/[0.04]">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div
            className="pointer-events-none absolute top-0 right-0 w-96 h-96"
            style={{ background: 'radial-gradient(circle at top right, rgba(94,106,210,0.08) 0%, transparent 60%)' }}
          />
          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label-mono text-[#6E7FEF] mb-4">{ABOUT_PAGE.hero.eyebrow}</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-2xl">
                {ABOUT_PAGE.hero.title}
              </h1>
              <p className="text-xl text-white/45 max-w-xl leading-relaxed">
                {ABOUT_PAGE.hero.lead}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Stats row ── */}
        <section aria-label="Company statistics" className="border-b border-white/[0.04] bg-ink-2/30">
          <div className="container-site py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ABOUT_STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="text-center rounded-xl border border-white/[0.06] bg-ink-2/60 px-4 py-6"
                >
                  <div className="text-2xl font-bold text-white mb-1.5">{stat.value}</div>
                  <div className="text-xs text-white/35 leading-snug">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who we are ── */}
        <section aria-labelledby="overview-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <motion.div {...fadeUp}>
                <p className="label-mono text-[#6E7FEF] mb-3">Overview</p>
                <h2 id="overview-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white mb-6">
                  {ABOUT_PAGE.overview.title}
                </h2>
                <div className="space-y-4">
                  {ABOUT_PAGE.overview.paragraphs.map((p, i) => (
                    <p key={i} className="text-white/50 leading-relaxed">{p}</p>
                  ))}
                </div>
              </motion.div>

              {/* Mission + Vision */}
              <div className="space-y-4">
                {[ABOUT_COPY.mission, ABOUT_COPY.vision].map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.1 + i * 0.1 }}
                    className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6"
                  >
                    <div className="h-0.5 w-8 bg-[#6E7FEF] rounded-full mb-4" />
                    <h3 className="text-sm font-bold text-[#8B9CF4] uppercase tracking-wider mb-2">{pillar.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{pillar.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Focus areas ── */}
        <section aria-labelledby="focus-heading" className="border-b border-white/[0.04] bg-ink-2/20">
          <div className="container-site py-20 lg:py-28">
            <motion.div {...fadeUp} className="mb-12">
              <p className="label-mono text-[#6E7FEF] mb-3">Practice areas</p>
              <h2 id="focus-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white">
                What we focus on
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ABOUT_PAGE.focusAreas.map((area, i) => {
                const Icon = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                    className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6 hover:border-white/[0.12] transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#6E7FEF]/20 bg-[#6E7FEF]/10 mb-4">
                      <Icon className="h-5 w-5 text-[#8B9CF4]" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-2">{area.title}</h3>
                    <p className="text-xs text-white/40 leading-relaxed">{area.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Principles ── */}
        <section aria-labelledby="principles-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20 lg:py-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div {...fadeUp}>
                <p className="label-mono text-[#6E7FEF] mb-3">How we run engagements</p>
                <h2 id="principles-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white mb-4">
                  Operating principles
                </h2>
                <p className="text-white/40 leading-relaxed">{ABOUT_PAGE.principlesIntro}</p>
              </motion.div>

              <ul className="space-y-4">
                {ABOUT_PAGE.principles.map((line, i) => (
                  <motion.li
                    key={i}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: 0.05 + i * 0.08 }}
                    className="flex gap-4 items-start"
                  >
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#6E7FEF]/25 bg-[#6E7FEF]/10 mt-0.5">
                      <CheckCircle2 className="h-3 w-3 text-[#8B9CF4]" strokeWidth={2} />
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{line}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Location + CTA ── */}
        <section className="border-b border-white/[0.04] bg-ink-2/20">
          <div className="container-site py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeUp}>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-4 w-4 text-[#6E7FEF]" />
                  <span className="label-mono text-white/30">Headquarters</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{SITE.location}</h2>
                <p className="text-sm text-white/40">Remote delivery for clients across India and overseas.</p>

                <div className="mt-6 pt-6 border-t border-white/[0.05]">
                  <p className="label-mono text-white/25 mb-3">Our commitment</p>
                  <p className="text-sm text-white/45 leading-relaxed">{ABOUT_COPY.closing}</p>
                </div>
              </motion.div>

              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                <div className="rounded-2xl border border-white/[0.08] bg-ink-2/80 p-8">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Let's discuss your project
                  </h3>
                  <p className="text-sm text-white/40 mb-6 leading-relaxed">
                    Discuss scope or a statement of work—we respond to new business inquiries within one business day.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
                  >
                    Start a conversation
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
