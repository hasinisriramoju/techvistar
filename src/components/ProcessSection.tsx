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
      className="relative overflow-hidden bg-[#E1EBF0]"
    >
      

      {/* Radial vignette to fade grid at edges */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
'radial-gradient(circle at top, rgba(255,255,255,0.6), transparent 70%)',
        }}
      />

      {/* Faint green ambient behind heading */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/4"
        aria-hidden
        style={{
          background:
'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10 py-24 sm:py-32">

        {/* ── Header ── */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          {/* Heading — white + bright green highlight */}
          <h2
            id="process-heading"
            className="font-display text-4xl font-bold leading-tight tracking-tight text-[#13263A] sm:text-5xl"
          >
            {SECTION_PROCESS.title}{' '}
            <span className="font-bold text-[#6CD99C]">
              {SECTION_PROCESS.highlight}
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#475569]">
            {SECTION_PROCESS.description}
          </p>
        </div>

        {/* ── Operating principles ── */}
        <div className="mx-auto mb-24 max-w-3xl">
          <p className="mb-4 text-center font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#475569]">
            Operating Principles
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-y-3 border-y border-white/[0.05] px-4 py-3 sm:flex-nowrap sm:divide-x sm:divide-white/[0.05] sm:gap-y-0 sm:px-0"
            aria-label="Operating principles"
          >
            {PROCESS_PILLARS.map((word) => (
              <li key={word} className="text-center sm:px-12">
                <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#475569]">
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
  width: '2px',
  background:
    'linear-gradient(to bottom, transparent, #B7C8D6 10%, #B7C8D6 90%, transparent)',
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
                      className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full"
                      style={{
                        background: '#E1EBF0',
                        border: '1.5px solid #CBD5E1',
                        boxShadow: '0 0 0 6px #E1EBF0',
                      }}
                    >
                      <div
                        className="h-3 w-3 rounded-full bg-[#6CD99C]"
                        style={{ boxShadow: '0 0 10px 3px rgba(108,217,156,0.60)' }}
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
        <p className="mx-auto mt-24 max-w-2xl text-center text-base leading-relaxed text-[#475569]">
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
          background: 'linear-gradient(to right, transparent, rgba(19,38,58,0.14) 20%, rgba(19,38,58,0.14) 80%, transparent)',
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
      className="relative overflow-hidden rounded-2xl"
     style={{
  background: 'rgba(255,255,255,0.35)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',

  border: '1.5px solid #13263A',

boxShadow: `
0 0 12px rgba(19,38,58,0.45),
0 0 28px rgba(19,38,58,0.35),
0 0 60px rgba(19,38,58,0.28),
0 25px 60px rgba(15,23,42,0.12)
`,

  transition: 'all 0.35s ease',
}}

onMouseEnter={(e) => {
  const card = e.currentTarget as HTMLDivElement;

  card.style.transform = 'translateY(-6px)';

  card.style.boxShadow = `
    0 0 0 1px rgba(19,38,58,0.25),
    0 0 18px rgba(19,38,58,0.30),
    0 0 40px rgba(19,38,58,0.25),
    0 0 80px rgba(19,38,58,0.18),
    0 25px 45px rgba(55, 114, 178, 0.12),
    inset 0 1px 0 rgba(255,255,255,0.7)
  `;
}}

onMouseLeave={(e) => {
  const card = e.currentTarget as HTMLDivElement;

  card.style.transform = 'translateY(0)';

  card.style.boxShadow = `
    0 0 0 1px rgba(19,38,58,0.15),
    0 0 12px rgba(19,38,58,0.20),
    0 0 30px rgba(19,38,58,0.15),
    0 15px 35px rgba(19,38,58,0.08),
    inset 0 1px 0 rgba(255,255,255,0.55)
  `;
}}
    >
      <div className="p-7 sm:p-8">
        {/* Step number + Icon row */}
        <div className="mb-6 flex items-start justify-between">
          <span
            className="font-mono text-sm font-bold"
            style={{ color: '#13263A'}}
          >
            {stepLabel}
          </span>

          {/* Icon container */}
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: '#EEF6F2',
border: '1px solid #C6EAD9',
            }}
            aria-hidden
          >
            <Icon className="h-5 w-5 text-[#13263A]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 font-display text-xl font-bold leading-snug tracking-tight sm:text-2xl" style={{ color: '#13263A' }}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-base leading-relaxed text-[#475569]">
          {item.description}
        </p>

        {/* Divider */}
        <div
          className="my-5 h-px w-full"
          aria-hidden
          style={{ background: '#D6E2EA'}}
        />

        {/* Deliverables */}
        <ul className="space-y-3">
          {item.deliverables.map((line) => (
            <li key={line} className="flex items-start gap-3 text-base leading-snug text-[#475569]">
              <span
                className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#6CD99C]"
                aria-hidden
                style={{ boxShadow: '0 0 5px 1px rgba(108,217,156,0.50)' }}
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}