import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SERVICES } from '@/lib/constants';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) document.title = `${service.title} — TechVistar`;
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden border-b border-white/[0.04]">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 30% 50%, ${service.color}0A 0%, transparent 60%)` }}
          />
          <div className="container-site relative z-10 py-24 lg:py-32">
            {/* Breadcrumb */}
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/70 transition-colors mb-8 group"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
              All services
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Service icon + category */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ background: `${service.color}15`, borderColor: `${service.color}30` }}
                >
                  <Icon className="h-6 w-6" style={{ color: service.color }} strokeWidth={1.75} />
                </div>
                <span className="label-mono" style={{ color: service.color }}>Service</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6 max-w-2xl">
                {service.title}
              </h1>
              <p className="text-xl text-white/45 max-w-xl leading-relaxed mb-8">
                {service.description}
              </p>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Start this engagement
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ── Problems section ── */}
        <section aria-labelledby="problems-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div {...fadeUp}>
                <p className="label-mono text-[#6E7FEF] mb-3">Problems we solve</p>
                <h2 id="problems-heading" className="text-3xl font-bold tracking-[-0.04em] text-white mb-6">
                  Sound familiar?
                </h2>
                <ul className="space-y-3">
                  {service.problems.map((problem) => (
                    <li key={problem} className="flex items-start gap-3">
                      <XCircle className="h-4 w-4 text-red-400/60 shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span className="text-sm text-white/50">{problem}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
                <p className="label-mono text-[#6E7FEF] mb-3">What we deliver</p>
                <h2 className="text-3xl font-bold tracking-[-0.04em] text-white mb-6">
                  Our deliverables
                </h2>
                <ul className="space-y-3">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-[#6E7FEF] shrink-0 mt-0.5" strokeWidth={1.75} />
                      <span className="text-sm text-white/50">{d}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Technology Stack ── */}
        <section aria-labelledby="tech-heading" className="border-b border-white/[0.04] bg-ink-2/20">
          <div className="container-site py-20">
            <motion.div {...fadeUp} className="mb-12">
              <p className="label-mono text-[#6E7FEF] mb-3">Technology</p>
              <h2 id="tech-heading" className="text-3xl font-bold tracking-[-0.04em] text-white">
                Tools & Technologies
              </h2>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {service.technologies.map((tech, i) => (
                <motion.div
                  key={tech}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-ink-2/60 px-4 py-3"
                >
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ background: service.color }}
                  />
                  <span className="text-sm font-mono text-white/60">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process overview ── */}
        <section aria-labelledby="process-heading" className="border-b border-white/[0.04]">
          <div className="container-site py-20">
            <motion.div {...fadeUp} className="mb-12">
              <p className="label-mono text-[#6E7FEF] mb-3">How we engage</p>
              <h2 id="process-heading" className="text-3xl font-bold tracking-[-0.04em] text-white">
                Our engagement approach
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { step: '01', title: 'Discovery & Scoping', desc: 'We align on goals, constraints, and success criteria. Written scope before any build work begins.' },
                { step: '02', title: 'Iterative Build', desc: 'Regular demos, code reviews, and test evidence. No black-box development.' },
                { step: '03', title: 'Integration & Deploy', desc: 'Ship to your environment with runbooks, integrations, and knowledge transfer.' },
                { step: '04', title: 'Handover & Support', desc: 'Documentation, training, and defined support SLAs so your team owns the system.' },
              ].map(({ step, title, desc }, i) => (
                <motion.div
                  key={step}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6"
                >
                  <span className="font-mono text-xs font-bold text-[#6E7FEF]/60 block mb-3">{step}</span>
                  <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                  <p className="text-xs text-white/35 leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-ink-2/20">
          <div className="container-site py-20">
            <motion.div
              {...fadeUp}
              className="rounded-3xl border border-white/[0.08] bg-ink-2/80 p-10 sm:p-14 text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-white/40 mb-8 max-w-md mx-auto leading-relaxed">
                Share your goals and timeline. We'll respond with a scoped proposal or statement of work within one business day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  Start a conversation
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/[0.1] text-white/60 text-sm font-medium hover:text-white hover:border-white/[0.2] transition-all"
                >
                  View all services
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
