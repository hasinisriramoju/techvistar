import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

const AUTO_INTERVAL = 5000;

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = TESTIMONIALS.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, AUTO_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current, paused, next]);

  const t = TESTIMONIALS[current];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-pad border-t border-white/[0.04] bg-ink-2/30"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 text-center"
        >
          <p className="label-mono text-[#6E7FEF] mb-3">Client references</p>
          <h2 id="testimonials-heading" className="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-white leading-tight">
            What our clients
            <br />
            <span className="text-white/30">say about delivery</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="rounded-2xl border border-white/[0.08] bg-ink-2/80 backdrop-blur-sm overflow-hidden">
            {/* Stars */}
            <div className="flex gap-1 px-8 pt-8">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#6E7FEF] text-[#6E7FEF]" />
              ))}
            </div>

            {/* Quote */}
            <div className="px-8 pt-5 pb-8" style={{ minHeight: 200 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="text-xl text-white/80 leading-relaxed font-light mb-8">
                    "{t.content}"
                  </blockquote>
                  <div className="flex items-center gap-3">
                    {/* Avatar placeholder */}
                    <div className="h-10 w-10 rounded-full bg-[#6E7FEF]/15 border border-[#6E7FEF]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[#8B9CF4]">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.name}</div>
                      <div className="text-xs text-white/35">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress bar */}
            <div className="flex gap-1.5 px-8 pb-6">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="h-0.5 flex-1 rounded-full overflow-hidden bg-white/[0.06] transition-all"
                >
                  <motion.div
                    className="h-full rounded-full bg-[#6E7FEF]"
                    initial={{ width: '0%' }}
                    animate={{ width: i === current ? '100%' : i < current ? '100%' : '0%' }}
                    style={{ background: i < current ? 'rgba(110,127,239,0.4)' : '#6E7FEF' }}
                    transition={i === current ? { duration: AUTO_INTERVAL / 1000, ease: 'linear' } : { duration: 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-ink-2 text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="label-mono text-white/20">
              {current + 1} / {total}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-ink-2 text-white/40 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
