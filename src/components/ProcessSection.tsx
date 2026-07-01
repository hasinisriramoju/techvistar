import { motion } from 'framer-motion';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { PROCESS_PILLARS, PROCESS_STEPS, SECTION_PROCESS } from '@/lib/constants';

export const ProcessSection = () => {
  const { ref, isInView } = useAnimatedSection();

  return (
    <SiteSection
      ref={ref}
      id="process"
      variant="default"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-background border-b border-border-subtle"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-[0.15]" />

      {/* Radial vignette to fade grid at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at top, rgba(0, 113, 227, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-custom relative z-10 py-24 sm:py-32">

        {/* ── Header ── */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <h2
            id="process-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {SECTION_PROCESS.title}{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {SECTION_PROCESS.highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {SECTION_PROCESS.description}
          </p>
        </div>

        {/* ── Operating principles ── */}
        <div className="mx-auto mb-24 max-w-3xl">
          <p className="mb-4 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60">
            Operating Principles
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-y-3 border-y border-border-subtle px-4 py-3 sm:flex-nowrap sm:divide-x sm:divide-border-subtle sm:gap-y-0 sm:px-0"
            aria-label="Operating principles"
          >
            {PROCESS_PILLARS.map((word) => (
              <li key={word} className="text-center sm:px-12">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                  {word}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Timeline ── */}
        <div className="relative mx-auto max-w-5xl">

          {/* Spine line — static, glowing */}
          <div
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 lg:block"
            aria-hidden
            style={{
              width: '1px',
              background:
                'linear-gradient(to bottom, transparent, #2A2D32 10%, #2A2D32 90%, transparent)',
            }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-16">
            {PROCESS_STEPS.map((item, index) => {
              const Icon = item.icon;
              const isLeft = index % 2 === 0;
              const stepLabel = String(item.step).padStart(2, '0');

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative flex flex-col lg:flex-row lg:items-center"
                >
                  {/* LEFT SLOT — always renders the card on mobile; on desktop only for even steps */}
                  <div className="lg:w-[calc(50%-2.5rem)] lg:pr-10 lg:flex lg:justify-end">
                    {isLeft ? (
                      /* Desktop left + mobile (all cards) */
                      <div className="w-full lg:max-w-[420px]">
                        <Card item={item} Icon={Icon} stepLabel={stepLabel} />
                      </div>
                    ) : (
                      /* Odd steps: hidden on desktop (card goes in right slot); visible on mobile */
                      <div className="w-full lg:hidden">
                        <Card item={item} Icon={Icon} stepLabel={stepLabel} />
                      </div>
                    )}
                  </div>

                  {/* CENTER NODE — desktop only */}
                  <div className="hidden lg:flex lg:w-20 lg:shrink-0 lg:justify-center">
                    <div
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border-subtle shadow-[0_0_0_5px_#08090A]"
                    >
                      <div
                        className="h-2.5 w-2.5 rounded-full bg-electric-teal"
                        style={{ boxShadow: '0 0 10px 2px rgba(0,245,255,0.60)' }}
                      />
                    </div>
                  </div>

                  {/* RIGHT SLOT — desktop only, odd steps only */}
                  <div className="hidden lg:block lg:w-[calc(50%-2.5rem)] lg:pl-10">
                    {!isLeft && (
                      <div className="lg:max-w-[420px]">
                        <Card item={item} Icon={Icon} stepLabel={stepLabel} />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Footer note ── */}
        <p className="mx-auto mt-24 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
          The same phases apply whether discovery is a focused workshop or a full audit, and whether
          build is one squad or several—governance, documentation, and sign-off stay consistent throughout.
        </p>
      </div>

      {/* Section divider */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: '5%',
          right: '5%',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)',
        }}
      />
    </SiteSection>
  );
};

function Card({
  item,
  Icon,
  stepLabel,
}: {
  item: (typeof PROCESS_STEPS)[number];
  Icon: React.ElementType;
  stepLabel: string;
}) {
  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-border-subtle bg-surface-charcoal/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-surface-charcoal/70 hover:shadow-2xl hover:shadow-primary/5 shadow-xl shadow-black/25"
    >
      <div className="p-7 sm:p-8">
        {/* Step number + Icon row */}
        <div className="mb-6 flex items-start justify-between">
          <span
            className="font-mono text-sm font-bold text-primary"
          >
            {stepLabel}
          </span>

          {/* Icon container */}
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary"
            aria-hidden
          >
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 font-display text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Divider */}
        <div
          className="my-5 h-px w-full bg-border-subtle/50"
          aria-hidden
        />

        {/* Deliverables */}
        <ul className="space-y-3">
          {item.deliverables.map((line) => (
            <li key={line} className="flex items-start gap-3 text-xs leading-snug text-on-surface-variant">
              <span
                className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-electric-teal"
                aria-hidden
                style={{ boxShadow: '0 0 5px 1px rgba(0,245,255,0.50)' }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}