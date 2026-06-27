import { motion, useReducedMotion } from 'framer-motion';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Quote, Star } from 'lucide-react';
import { useMemo } from 'react';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { SECTION_TESTIMONIALS, TESTIMONIAL_AGGREGATE, TESTIMONIALS } from '@/lib/constants';

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]!.charAt(0)}${parts[parts.length - 1]!.charAt(0)}`.toUpperCase();
  }
  return name.charAt(0).toUpperCase();
}

export const TestimonialsSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const reduceMotion = useReducedMotion();

  const autoScrollPlugins = useMemo(
    () =>
      reduceMotion
        ? []
        : [
            AutoScroll({
              speed: 0.45,
              startDelay: 500,
              playOnInit: true,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
              stopOnFocusIn: false,
            }),
          ],
    [reduceMotion]
  );

  return (
    <SiteSection
      ref={ref}
      id="testimonials"
      variant="slate"
      aria-labelledby="testimonials-heading"
      style={{
        background: '#E1EBF0',
        borderTop: '1px solid rgba(19,38,58,0.10)',
      }}
    >
      <div className="container-custom relative z-10">
        <SectionHeader
          tag={SECTION_TESTIMONIALS.tag}
          title={SECTION_TESTIMONIALS.title}
          highlight={SECTION_TESTIMONIALS.highlight}
          description={SECTION_TESTIMONIALS.description}
          isInView={isInView}
          headingId="testimonials-heading"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08, ease }}
          className="relative"
        >
          <p className="mb-6 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(19,38,58,0.50)' }}>
            {reduceMotion ? 'Client voices' : 'Client voices — continuously updated'}
          </p>

          <div className="relative -mx-4 sm:-mx-6 lg:-mx-8">
            {/* Edge fade masks */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-[#E1EBF0] to-transparent sm:w-14 md:w-20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-[#E1EBF0] to-transparent sm:w-14 md:w-20"
              aria-hidden
            />

            <Carousel
              opts={{ align: 'start', loop: true, dragFree: false }}
              plugins={autoScrollPlugins}
              className="w-full"
            >
              <CarouselContent className="-ml-3 md:-ml-4">
                {TESTIMONIALS.map((testimonial) => (
                  <CarouselItem
                    key={`${testimonial.name}-${testimonial.company}`}
                    className="pl-3 md:pl-4 basis-[88%] sm:basis-[75%] md:basis-1/2 lg:basis-[38%] xl:basis-[32%]"
                  >
                    <figure className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-[#C9D7E3] bg-white shadow-[0_10px_40px_-18px_rgba(19,38,58,0.10)] ring-1 ring-[#13263A]/[0.02] transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(19,38,58,0.15)] hover:border-[#13263A]/20">
                      {/* Top accent bar — brand Deep Blue */}
                      <div
                        className="h-1 w-full shrink-0"
                        style={{ background: 'linear-gradient(to right, #13263A, #80E4AA)' }}
                        aria-hidden
                      />

                      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
                        <Quote
                          className="pointer-events-none absolute right-5 top-5 h-12 w-12 sm:h-14 sm:w-14"
                          style={{ color: 'rgba(19,38,58,0.06)' }}
                          strokeWidth={1}
                          aria-hidden
                        />

                        {/* Star rating */}
                        <div
                          className="relative z-[1] mb-4 inline-flex w-fit items-center gap-0.5 rounded-full px-2.5 py-1"
                          style={{
                            background: '#FDF8EC',
                            border: '1px solid #E7D6A7',
                          }}
                          aria-label={`${testimonial.rating} out of 5 stars`}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < testimonial.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'fill-slate-200 text-slate-200'
                              }`}
                              aria-hidden
                            />
                          ))}
                        </div>

                        <blockquote className="relative z-[1] flex-1 text-[0.9375rem] font-medium leading-[1.65] text-slate-800 sm:text-[1.03rem]">
                          <span className="text-slate-300">&ldquo;</span>
                          {testimonial.content}
                          <span className="text-slate-300">&rdquo;</span>
                        </blockquote>

                        <figcaption
                          className="relative z-[1] mt-6 flex items-center gap-4 pt-5"
                          style={{ borderTop: '1px solid rgba(19,38,58,0.10)' }}
                        >
                          <div
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold tracking-tight text-white shadow-md ring-2 ring-white sm:h-12 sm:w-12 sm:text-sm"
                            style={{ background: 'linear-gradient(135deg, #13263A, #2A4A68)' }}
                            aria-hidden
                          >
                            {initials(testimonial.name)}
                          </div>
                          <div className="min-w-0 flex-1 text-left">
                            <div className="font-display text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                              {testimonial.name}
                            </div>
                            <div className="mt-0.5 text-xs text-slate-500 sm:text-sm">
                              <span className="font-medium text-slate-600">{testimonial.role}</span>
                              {testimonial.company ? (
                                <>
                                  <span className="mx-1.5 text-slate-300" aria-hidden>·</span>
                                  <span>{testimonial.company}</span>
                                </>
                              ) : null}
                            </div>
                          </div>
                        </figcaption>
                      </div>
                    </figure>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious
                  className="-left-2 lg:-left-4 text-slate-800 shadow-sm hover:bg-[#E1EBF0]"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(19,38,58,0.20)',
                    backdropFilter: 'blur(12px)',
                  }}
                />
                <CarouselNext
                  className="-right-2 lg:-right-4 text-slate-800 shadow-sm hover:bg-[#E1EBF0]"
                  style={{
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(19,38,58,0.20)',
                    backdropFilter: 'blur(12px)',
                  }}
                />
              </div>
            </Carousel>
          </div>
        </motion.div>

        {/* Aggregate stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="mx-auto mt-14 max-w-5xl rounded-2xl px-4 py-8 shadow-[0_8px_32px_-20px_rgba(19,38,58,0.12)] sm:px-8 md:py-10"
          style={{
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(19,38,58,0.12)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <p className="mb-6 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(19,38,58,0.50)' }}>
            Delivery indicators
          </p>
          <div className="grid grid-cols-1 divide-y divide-[#D6E2EA] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {TESTIMONIAL_AGGREGATE.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center px-4 py-6 text-center first:pt-0 last:pb-0 sm:py-4 sm:first:pt-4 sm:last:pb-4"
              >
                <div className="font-display text-3xl font-bold tabular-nums tracking-tight text-slate-900 md:text-[2rem]">
                  <span style={{ background: 'linear-gradient(to right, #13263A, #2A4A68)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {stat.value}
                  </span>
                </div>
                <div className="mt-2 max-w-[14rem] text-xs font-medium leading-snug text-slate-600 sm:text-[0.8125rem]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-400">
            Metrics are compiled from internal delivery records and structured post-engagement surveys; they are not aggregated from public review marketplaces.
          </p>
        </motion.div>
      </div>
    </SiteSection>
  );
};