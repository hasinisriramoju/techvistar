import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { INTERNSHIP_MARQUEE_SEGMENTS } from '@/lib/constants';

type AnnouncementMarqueeProps = {
  variant: 'dark' | 'light';
};

export const AnnouncementMarquee = ({ variant }: AnnouncementMarqueeProps) => {
  const reduceMotion = useReducedMotion();
  const line = INTERNSHIP_MARQUEE_SEGMENTS.join('  ·  ');

  return (
    <div
      className={cn(
        'relative overflow-hidden border-t py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.12em]',
        variant === 'dark'
          ? 'border-white/10 bg-slate-950/55 text-sky-100/95 backdrop-blur-md'
          : 'border-sky-800/40 bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-sky-50'
      )}
      role="region"
      aria-label="Program announcements"
    >
      {reduceMotion ? (
        <p className="px-4 text-center leading-snug text-[0.7rem] normal-case tracking-normal sm:text-sm">
          {line}
        </p>
      ) : (
        <div className="marquee-track flex w-max">
          <span className="inline-flex shrink-0 items-center px-6 sm:px-10">{line}</span>
          <span className="inline-flex shrink-0 items-center px-6 sm:px-10" aria-hidden>
            {line}
          </span>
        </div>
      )}
    </div>
  );
};
