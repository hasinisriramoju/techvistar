import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SERVICES } from '@/lib/constants';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function ServicesBento() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad bg-ink"
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="label-mono text-[#6E7FEF] mb-3">What we build</p>
          <h2 id="services-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-white max-w-lg leading-tight mb-4">
            Six ways we{' '}
            <span className="text-gradient-signal">accelerate growth</span>
          </h2>
          <p className="text-white/45 max-w-xl leading-relaxed">
            Productized services with defined outcomes, written assumptions, and handover your team can operate.
            Start with one, or combine.
          </p>
        </motion.div>

        {/* Bento grid (2 rows of 3 columns, perfectly filled) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.slug}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="h-full"
              >
                <Link
                  to={`/services/${service.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-white/[0.06] bg-ink-2/60 p-6 hover:border-white/[0.12] hover:bg-ink-2/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-card"
                  aria-label={`${service.title} — learn more`}
                >
                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border mb-5 transition-colors duration-200"
                    style={{
                      background: `${service.color}12`,
                      borderColor: `${service.color}25`,
                    }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: service.color }}
                      strokeWidth={1.75}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables preview */}
                  <ul className="space-y-1.5 mb-5 border-t border-white/[0.04] pt-4">
                    {service.deliverables.slice(0, 2).map((d) => (
                      <li key={d} className="flex items-center gap-2 text-xs text-white/35">
                        <span
                          className="h-1 w-1 rounded-full shrink-0"
                          style={{ background: service.color }}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Footer arrow */}
                  <div className="mt-auto flex items-center justify-between border-t border-white/[0.04] pt-4">
                    <div className="flex gap-1.5">
                      {service.technologies.slice(0, 2).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-white/20 bg-white/[0.03] px-2 py-0.5 rounded-md border border-white/[0.05]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2}
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-ink-2/40 text-sm text-white/60 hover:text-white hover:bg-ink-2 hover:border-white/20 transition-all group"
          >
            Explore all services, pricing & packages
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
