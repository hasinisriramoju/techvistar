import { forwardRef, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const variantClasses = {
  default: 'bg-white border-b border-slate-200/80',
  muted: 'bg-muted border-b border-border',
  slate: 'bg-slate-50/80 border-b border-slate-200/90',
} as const;

export type SiteSectionVariant = keyof typeof variantClasses;

type SiteSectionProps = ComponentPropsWithoutRef<'section'> & {
  variant?: SiteSectionVariant;
  /** Subtle grid overlay; turn off if the section has its own background treatment */
  showGrid?: boolean;
};

export const SiteSection = forwardRef<HTMLElement, SiteSectionProps>(
  ({ variant = 'default', showGrid = true, className, children, ...props }, ref) => (
    <section
      ref={ref}
      className={cn('section-padding relative overflow-hidden', variantClasses[variant], className)}
      {...props}
    >
      {showGrid ? (
        <div
          className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.24]"
          aria-hidden
        />
      ) : null}
      {children}
    </section>
  )
);

SiteSection.displayName = 'SiteSection';
