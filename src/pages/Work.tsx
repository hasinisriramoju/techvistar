import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WORK_PROJECTS } from '@/lib/constants';

type Category = 'All' | 'AI' | 'Web' | 'Automation';

const FILTERS: Category[] = ['All', 'AI', 'Web', 'Automation'];

const categoryColors: Record<string, string> = {
  AI: '#6E7FEF',
  Web: '#22D3EE',
  Automation: '#34D399',
};

const Work = () => {
  const [filter, setFilter] = useState<Category>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Work — TechVistar';
  }, []);

  const filtered = filter === 'All'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content" className="pt-16">
        {/* ── Hero ── */}
        <section className="relative border-b border-white/[0.04] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />
          <div className="container-site relative z-10 py-24 lg:py-32">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <p className="label-mono text-[#6E7FEF] mb-4">Portfolio</p>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-[-0.04em] text-white leading-[1.0] mb-6">
                What we've shipped
                <br />
                <span className="text-white/30">for clients</span>
              </h1>
              <p className="text-lg text-white/45 max-w-xl leading-relaxed">
                Representative work across web, AI, and automation. Details anonymized where required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Filter tabs ── */}
        <div className="border-b border-white/[0.04] bg-ink-2/30 sticky top-16 z-40">
          <div className="container-site py-4">
            <div className="flex items-center gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                    filter === f
                      ? 'bg-white text-ink'
                      : 'text-white/45 hover:text-white hover:bg-white/[0.04]',
                  ].join(' ')}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Projects grid ── */}
        <section aria-labelledby="projects-heading" className="py-16">
          <div className="container-site">
            <h2 id="projects-heading" className="sr-only">Projects</h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => {
                  const color = categoryColors[project.category] ?? '#6E7FEF';
                  return (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="group flex flex-col rounded-2xl border border-white/[0.06] bg-ink-2/60 overflow-hidden hover:border-white/[0.12] hover:bg-ink-2/80 hover:-translate-y-1 hover:shadow-card transition-all duration-200"
                    >
                      {/* Accent bar */}
                      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }} />

                      <div className="flex flex-col flex-1 p-6">
                        {/* Category + industry */}
                        <div className="flex items-center gap-2 mb-4">
                          <span
                            className="label-mono rounded-full px-2.5 py-1"
                            style={{ background: `${color}15`, color }}
                          >
                            {project.category}
                          </span>
                          <span className="label-mono text-white/20">{project.industry}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{project.title}</h3>
                        <p className="text-sm text-white/40 leading-relaxed flex-1">{project.description}</p>

                        {/* Footer */}
                        <div className="mt-6 flex items-end justify-between">
                          <div>
                            <div className="label-mono text-white/20 mb-1">Outcome</div>
                            <div className="text-sm font-bold text-white">{project.outcome}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1.5">
                              {project.stack.slice(0, 2).map((tech) => (
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
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-sm text-white/30 mb-5">Details are anonymized. Discuss specific engagement experience during a scoping call.</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-ink text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Discuss your project
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

export default Work;
