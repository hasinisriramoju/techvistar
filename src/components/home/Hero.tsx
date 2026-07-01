import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Brain, Globe, Workflow, Zap } from 'lucide-react';
import { HERO_COPY } from '@/lib/constants';

/* ── Word cycling animation ── */
const WORDS = HERO_COPY.cyclingWords;
const INTERVAL_MS = 2200;

function CyclingWord() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex overflow-hidden h-[1.1em] align-bottom" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={WORDS[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-gradient-signal inline-block"
        >
          {WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ── Floating Badge ── */
function FloatingBadge({
  label, icon: Icon, color,
  style,
}: {
  label: string; icon: React.ElementType; color: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute glass rounded-full px-4 py-2.5 flex items-center gap-2.5 shadow-card"
      style={style}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: `${color}15` }}>
        <Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={2.2} />
      </div>
      <span className="text-xs font-semibold text-white/80 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

/* ── Animated grid orb ── */
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-grid-dots opacity-60" style={{ backgroundSize: '32px 32px' }} />

      {/* Central glow */}
      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94,106,210,0.12) 0%, rgba(94,106,210,0.04) 40%, transparent 70%)',
        }}
      />

      {/* Side accent */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px]"
        style={{
          background: 'radial-gradient(circle at top right, rgba(167,139,250,0.06) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}

/* ── Main Hero ── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
    >
      <HeroBackground />

      <motion.div
        style={{ opacity, y }}
        className="container-site relative z-10 pt-32 pb-24 lg:pt-40 lg:pb-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* ── Left: text ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8 border border-white/[0.08] bg-white/[0.03]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#6E7FEF] animate-signal-pulse" />
              <span className="label-mono text-white/40">{HERO_COPY.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[1.0] text-white mb-6">
              We build
              <br />
              <CyclingWord />
              <br />
              <span className="text-white/30">for growth</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/50 leading-relaxed max-w-md mb-10">
              {HERO_COPY.tagline}
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to="/contact"
                className="btn-primary text-base px-6 py-3.5"
              >
                {HERO_COPY.ctaPrimary}
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                to="/services"
                className="btn-ghost text-base px-6 py-3.5"
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </div>
          </motion.div>

          {/* ── Right: visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center h-[500px] lg:h-[560px]"
          >
            {/* Central dark panel */}
            <div className="absolute inset-12 rounded-3xl border border-white/[0.06] bg-ink-2/60 backdrop-blur-sm" />

            {/* Rotating rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 rounded-full border border-dashed border-white/[0.05] animate-spin-slow" />
              <div
                className="absolute w-96 h-96 rounded-full border border-dashed border-[#6E7FEF]/10"
                style={{ animation: 'spin-slow 30s linear infinite reverse' }}
              />
              <div className="absolute w-[480px] h-[480px] rounded-full border border-white/[0.02]" />
            </div>

            {/* Center icon */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-ink-2 border border-white/[0.08] shadow-card mb-4">
                <Zap className="h-9 w-9 text-[#6E7FEF]" strokeWidth={1.5} />
              </div>
              <div className="label-mono text-white/20 text-center">Technology-first</div>
              <div className="label-mono text-white/20 text-center">Growth Partner</div>
            </div>

            {/* Floating badges */}
            <FloatingBadge
              label="Applied AI"
              icon={Brain}
              color="#6E7FEF"
              style={{ top: '15%', left: '5%' }}
            />
            <FloatingBadge
              label="Web Systems"
              icon={Globe}
              color="#22D3EE"
              style={{ bottom: '22%', left: '3%' }}
            />
            <FloatingBadge
              label="Automation"
              icon={Workflow}
              color="#34D399"
              style={{ top: '32%', right: '4%' }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="label-mono text-white/20">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}
