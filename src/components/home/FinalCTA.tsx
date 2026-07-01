import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="section-pad border-t border-white/[0.04] bg-ink-2/30 relative overflow-hidden"
    >
      {/* Background dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-grid-dots opacity-40" style={{ backgroundSize: '32px 32px' }} />

      {/* Gradient orb */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(94,106,210,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="container-site relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="label-mono text-[#6E7FEF] mb-6">Ready to build?</p>
          <h2
            id="final-cta-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.05em] text-white leading-[1.0] mb-6 max-w-2xl mx-auto"
          >
            Let's build something
            <br />
            <span className="text-white/20">that lasts.</span>
          </h2>
          <p className="text-lg text-white/40 max-w-md mx-auto mb-10 leading-relaxed">
            We acknowledge new business inquiries within one business day. Share your goals and we'll respond with a clear approach.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              id="final-cta-btn"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-white text-ink font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-signal"
            >
              Start a project
              <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
            </Link>
            <a
              href="mailto:support@techvistar.com"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/[0.1] text-white/60 font-medium text-base hover:text-white hover:border-white/[0.2] transition-all"
            >
              support@techvistar.com
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            {[
              '98% on-time delivery',
              'Response within 1 business day',
              '60+ completed engagements',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-white/25">
                <div className="h-1 w-1 rounded-full bg-[#6E7FEF]/50" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
