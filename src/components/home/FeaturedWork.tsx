import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { WORK_PROJECTS } from '@/lib/constants';

const FEATURED = WORK_PROJECTS.slice(0, 3);

export function FeaturedWork() {
  return (
    <section
      id="projects"
      aria-labelledby="work-heading"
      className="section-pad border-t border-white/[0.04] bg-ink"
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
            <p className="label-mono text-[#6E7FEF] mb-3">Selected work</p>
            <h2 id="work-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-white leading-tight">
              What we've
              <br />
              <span className="text-white/30">shipped for clients</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors group shrink-0"
          >
            All case studies
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Asymmetric grid: large + 2 small */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Large card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <ProjectCard project={FEATURED[0]} large />
          </motion.div>

          {/* Two small cards */}
          <div className="flex flex-col gap-4">
            {FEATURED.slice(1).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white border border-white/[0.06] hover:border-white/[0.15] rounded-lg px-5 py-2.5 transition-all duration-150 hover:bg-white/[0.03]"
          >
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
}: {
  project: (typeof WORK_PROJECTS)[number];
  large?: boolean;
}) {
  const categoryColors: Record<string, string> = {
    AI: '#6E7FEF',
    Web: '#22D3EE',
    Automation: '#34D399',
  };
  const color = categoryColors[project.category] ?? '#6E7FEF';

  return (
    <Link
      to="/work"
      className={[
        'group relative flex flex-col rounded-2xl border border-white/[0.06] bg-ink-2/60 overflow-hidden hover:border-white/[0.12] hover:bg-ink-2/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-card',
        large ? 'min-h-[340px]' : 'flex-1',
      ].join(' ')}
      aria-label={`${project.title} case study`}
    >
      {/* Gradient accent bar */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }} />

      <div className={['flex flex-col flex-1', large ? 'p-8' : 'p-6'].join(' ')}>
        {/* Category + Industry */}
        <div className="flex items-center gap-2 mb-auto">
          <span
            className="inline-flex items-center label-mono rounded-full px-2.5 py-1"
            style={{ background: `${color}15`, color }}
          >
            {project.category}
          </span>
          <span className="label-mono text-white/20">{project.industry}</span>
        </div>

        {/* Title */}
        <h3 className={['font-bold text-white leading-snug mt-5', large ? 'text-2xl' : 'text-lg'].join(' ')}>
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-white/40 leading-relaxed">
          {large ? project.description : project.description.slice(0, 100) + '...'}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-end justify-between">
          {/* Outcome stat */}
          <div>
            <div className="label-mono text-white/20 mb-1">Outcome</div>
            <div className="text-base font-bold text-white">{project.outcome}</div>
          </div>

          {/* Stack chips + arrow */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex gap-1.5">
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
    </Link>
  );
}
