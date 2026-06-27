import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  tag: string;
  title: string;
  highlight: string;
  description: string;
  isInView: boolean;
  /** Use on light banded sections (default). Set false for dark hero-style blocks. */
  light?: boolean;
  /** Optional id for the section heading (accessibility / in-page links). */
  headingId?: string;
  className?: string;
}

export const SectionHeader = ({
  tag,
  title,
  highlight,
  description,
  isInView,
  light = true,
  headingId,
  className,
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className={cn('mx-auto mb-14 max-w-3xl text-center md:mb-16', className)}
    >
      <div className="mb-5 flex flex-col items-center gap-3">
        <span
          className={cn(
            'text-[0.6875rem] font-semibold uppercase tracking-[0.22em]',
            light ? 'text-primary' : 'text-emerald-300'
          )}
        >
          {tag}
        </span>
        <span
          className={cn(
            'h-px w-12 rounded-full',
            light ? 'bg-primary/35' : 'bg-emerald-400/40'
          )}
          aria-hidden
        />
      </div>
      <h2
        id={headingId}
        className={cn(
          'mb-5 font-display text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]',
          light ? 'text-slate-900' : 'text-white'
        )}
      >
        {title}{' '}
        <span className="gradient-text">{highlight}</span>
      </h2>
      <p
        className={cn(
          'mx-auto max-w-2xl text-base leading-relaxed md:text-lg',
          light ? 'text-slate-600' : 'text-slate-300'
        )}
      >
        {description}
      </p>
    </motion.div>
  );
};
