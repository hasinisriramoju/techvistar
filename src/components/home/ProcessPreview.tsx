import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '@/lib/constants';

export function ProcessPreview() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-pad border-t border-white/[0.04] bg-ink-2/30"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <p className="label-mono text-[#6E7FEF] mb-3">How we deliver</p>
            <h2 id="process-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-white leading-tight">
              Vision to results,
              <br />
              <span className="text-white/30">without guesswork</span>
            </h2>
          </div>
          <Link
            to="/process"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors group shrink-0"
          >
            Full process
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Connector line (except last) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-9 left-full w-4 h-px bg-white/[0.06] z-10" />
                )}

                <div className="rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6 hover:border-white/[0.12] hover:bg-ink-2 transition-all duration-200 h-full">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs font-bold text-[#6E7FEF]/60">{step.step}</span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-white/40" strokeWidth={1.75} />
                    </div>
                  </div>

                  {/* Phase label */}
                  <p className="label-mono text-[#6E7FEF]/60 mb-2">{step.phase}</p>

                  {/* Title */}
                  <h3 className="text-base font-semibold text-white mb-3 leading-snug">{step.title}</h3>

                  {/* Description */}
                  <p className="text-sm text-white/35 leading-relaxed">{step.description}</p>

                  {/* Duration badge */}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-white/25 border border-white/[0.05] rounded-full px-2.5 py-1">
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    {step.duration}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
