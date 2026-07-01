import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Services — TechVistar';
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* Hero */}
        <section className="relative border-b border-white/[0.04] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(94,106,210,0.08) 0%, transparent 60%)' }} />
          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label-mono text-[#6E7FEF] mb-4">Our services</p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-2xl">
                What we build for
                <br />
                <span className="text-white/30">growth-minded teams</span>
              </h1>
              <p className="text-lg text-white/45 max-w-xl leading-relaxed">
                Five productized services with defined outcomes, written assumptions, and handover your team can operate. Start with one, combine, or grow into a full growth stack.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services list */}
        <section aria-labelledby="services-list-heading" className="py-16">
          <div className="container-site">
            <h2 id="services-list-heading" className="sr-only">Services</h2>
            <div className="space-y-4">
              {SERVICES.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.slug}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                  >
                    <Link
                      to={`/services/${service.slug}`}
                      className="group flex flex-col sm:flex-row sm:items-start gap-6 rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6 sm:p-8 hover:border-white/[0.12] hover:bg-ink-2/80 transition-all duration-200"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      {/* Icon */}
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                        style={{ background: `${service.color}12`, borderColor: `${service.color}25` }}
                      >
                        <Icon className="h-6 w-6" style={{ color: service.color }} strokeWidth={1.75} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2 leading-snug">{service.title}</h3>
                            <p className="text-sm text-white/45 leading-relaxed max-w-2xl">{service.description}</p>
                          </div>
                          <ArrowUpRight
                            className="h-5 w-5 text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 mt-1"
                            strokeWidth={2}
                          />
                        </div>

                        {/* Deliverables + tech */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <p className="label-mono text-white/20 mb-2.5">Deliverables</p>
                            <ul className="space-y-1.5">
                              {service.deliverables.map((d) => (
                                <li key={d} className="flex items-center gap-2 text-xs text-white/40">
                                  <span className="h-1 w-1 rounded-full shrink-0" style={{ background: service.color }} />
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="label-mono text-white/20 mb-2.5">Technologies</p>
                            <div className="flex flex-wrap gap-1.5">
                              {service.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[10px] font-mono text-white/30 bg-white/[0.04] px-2 py-1 rounded-md border border-white/[0.06]"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.5 }}
              className="mt-12 rounded-2xl border border-white/[0.08] bg-ink-2/60 p-8 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-2">Not sure where to start?</h3>
              <p className="text-sm text-white/40 mb-6 max-w-md mx-auto">
                Share your goals and we'll recommend which services make the most sense—no obligation.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
