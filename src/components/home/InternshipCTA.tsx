import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, GraduationCap, CheckCircle2, Clock, Star } from 'lucide-react';
import { INTERNSHIP_PROGRAM } from '@/lib/constants';

export function InternshipCTA() {
  const highlights = [
    { icon: Clock, label: '1 hour / day' },
    { icon: CheckCircle2, label: 'Certificate' },
    { icon: Star, label: 'Real projects' },
    { icon: GraduationCap, label: '12 weeks' },
  ];

  return (
    <section
      aria-labelledby="internship-cta-heading"
      className="section-pad border-t border-white/[0.04] bg-ink relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 60% 50%, rgba(94,106,210,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-[#6E7FEF]/20 bg-[#6E7FEF]/[0.04] p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Inner glow */}
          <div
            className="pointer-events-none absolute top-0 right-0 w-96 h-96"
            style={{
              background: 'radial-gradient(circle at top right, rgba(94,106,210,0.12) 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 border border-[#6E7FEF]/25 bg-[#6E7FEF]/10">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8B9CF4] animate-signal-pulse" />
                <span className="label-mono text-[#8B9CF4]">{INTERNSHIP_PROGRAM.eyebrow}</span>
              </div>

              <h2 id="internship-cta-heading" className="text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-white leading-tight mb-4">
                {INTERNSHIP_PROGRAM.title}{' '}
                <span className="text-gradient-signal">{INTERNSHIP_PROGRAM.titleAccent}</span>
              </h2>
              <p className="text-white/50 leading-relaxed mb-8 max-w-md">
                {INTERNSHIP_PROGRAM.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/internship"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#6E7FEF] text-white font-semibold text-sm hover:bg-[#5E6AD2] transition-colors active:scale-[0.98]"
                >
                  View curriculum
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`tel:${INTERNSHIP_PROGRAM.cta.phoneTel}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-[#6E7FEF]/25 text-[#8B9CF4] font-semibold text-sm hover:border-[#6E7FEF]/50 transition-colors"
                >
                  Call to register
                </a>
              </div>
            </div>

            {/* Right: stats */}
            <div className="grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-start gap-3 rounded-xl border border-[#6E7FEF]/15 bg-[#6E7FEF]/[0.06] p-5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6E7FEF]/15 border border-[#6E7FEF]/20">
                    <Icon className="h-4.5 w-4.5 text-[#8B9CF4]" strokeWidth={1.75} style={{ width: 18, height: 18 }} />
                  </div>
                  <span className="text-sm font-semibold text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
