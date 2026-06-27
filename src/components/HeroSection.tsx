import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { HERO_COPY } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// ─── Animation variants ───────────────────────────────────────────────────────
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 1.0 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Typing accent ────────────────────────────────────────────────────────────
function TypingAccent({
  text, reduced, delayMs, charMs = 72, className,
}: {
  text: string; reduced: boolean; delayMs: number; charMs?: number; className?: string;
}) {
  const [len, setLen] = useState(reduced ? text.length : 0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) { setLen(text.length); return; }
    setLen(0);
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setLen(Math.min(i, text.length));
        if (i >= text.length && intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      }, charMs);
    }, delayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, reduced, delayMs, charMs]);

  const visible = text.slice(0, len);
  const done = len >= text.length;

  return (
    <span className={`relative inline-block align-baseline ${className ?? ''}`}>
      <span aria-hidden className="invisible whitespace-pre">{text}</span>
      <span className="absolute left-0 top-0 whitespace-pre" aria-hidden>
        {visible}
        {!done && (
          <span className="ml-px inline-block h-[0.85em] w-[2px] translate-y-px bg-[#6CD99C]/90 align-middle animate-pulse" aria-hidden />
        )}
      </span>
    </span>
  );
}

// ─── Right-side analytical illustration (no numbers or money) ─────────────────
function AnalyticsIllustration() {
  return (
    <svg
      viewBox="0 0 560 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden
    >
      {/* ── PANEL 1 · Bar + Line Chart ──────────────────────────────────────── */}
      <rect x="30" y="20" width="240" height="160" rx="6"
        fill="#6CD99C" fillOpacity="0.07"
        stroke="#6CD99C" strokeOpacity="0.22" strokeWidth="0.8" />

      <text x="46" y="42" fill="#6CD99C" fillOpacity="0.55" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">CONVERSION METRICS</text>

      {/* Axes */}
      <line x1="52" y1="152" x2="248" y2="152" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="0.6" />
      <line x1="52" y1="55" x2="52" y2="152" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="0.6" />

      {/* Y grid lines */}
      {[75, 95, 115, 135].map((y, i) => (
        <line key={i} x1="52" y1={y} x2="248" y2={y} stroke="#FFFFFF" strokeOpacity="0.10" strokeWidth="0.5" strokeDasharray="3 3" />
      ))}

      {/* Y labels — relative only, no numbers */}
      {[['75', 'high'], ['95', 'med'], ['115', 'low'], ['135', 'base']].map(([y, label]) => (
        <text key={y} x="44" y={parseInt(y) + 3} fill="#FFFFFF" fillOpacity="0.35" fontSize="5.5" fontFamily="monospace" textAnchor="end">{label}</text>
      ))}

      {/* X labels */}
      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, i) => (
        <text key={m} x={66 + i * 31} y="163" fill="#FFFFFF" fillOpacity="0.40" fontSize="6" fontFamily="monospace" textAnchor="middle">{m}</text>
      ))}

      {/* Bars — ascending to show growth */}
      {[
        [66, 105, 47],
        [97, 95, 57],
        [128, 80, 72],
        [159, 88, 64],
        [190, 68, 84],
        [221, 55, 97],
      ].map(([x, y, h], i) => (
        <rect key={i} x={x - 9} y={y} width="18" height={h}
          fill="#6CD99C" fillOpacity={0.14 + i * 0.025} rx="2" />
      ))}

      {/* Trend line */}
      <polyline
        points="66,108  97,95  128,80  159,85  190,68  221,56"
        stroke="#6CD99C" strokeOpacity="0.70" strokeWidth="1.4" fill="none"
        strokeLinejoin="round" strokeLinecap="round"
      />
      {/* Trend dots */}
      {[[66, 108], [97, 95], [128, 80], [159, 85], [190, 68], [221, 56]].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="#6CD99C" fillOpacity="0.80" />
      ))}

      {/* ── PANEL 2 · System Architecture ────────────────────────────────────── */}
      <rect x="295" y="20" width="235" height="200" rx="6"
        fill="#FFFFFF" fillOpacity="0.04"
        stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="0.8" />

      <text x="311" y="42" fill="#FFFFFF" fillOpacity="0.45" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">SYSTEM ARCHITECTURE</text>

      {/* Flow nodes */}
      {[
        [311, 56, 108, 22, 'Client Layer'],
        [311, 96, 108, 22, 'API Gateway'],
        [311, 136, 108, 22, 'Services'],
        [441, 56, 72, 22, 'Auth'],
        [441, 96, 72, 22, 'Cache'],
        [441, 136, 72, 22, 'DB'],
        [441, 176, 72, 22, 'CDN'],
      ].map(([x, y, w, h, label], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} rx="3"
            fill="#FFFFFF" fillOpacity="0.06"
            stroke="#6CD99C" strokeOpacity={0.28 + (i < 3 ? 0.08 : 0)} strokeWidth="0.8" />
          <text x={(x as number) + (w as number) / 2} y={(y as number) + 14} fill="#FFFFFF" fillOpacity="0.55" fontSize="7"
            fontFamily="monospace" textAnchor="middle">{label as string}</text>
        </g>
      ))}

      {/* Connector lines */}
      {[
        [419, 67, 441, 67],
        [419, 107, 441, 107],
        [419, 147, 441, 147],
        [419, 147, 441, 187],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#6CD99C" strokeOpacity="0.28" strokeWidth="0.7" strokeDasharray="3 2" />
      ))}

      <line x1="365" y1="78" x2="365" y2="96" stroke="#6CD99C" strokeOpacity="0.28" strokeWidth="0.7" />
      <line x1="365" y1="118" x2="365" y2="136" stroke="#6CD99C" strokeOpacity="0.28" strokeWidth="0.7" />

      {/* ── PANEL 3 · Component Tree ──────────────────────────────────────────── */}
      <rect x="30" y="204" width="240" height="175" rx="6"
        fill="#FFFFFF" fillOpacity="0.04"
        stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="0.8" />

      <text x="46" y="226" fill="#FFFFFF" fillOpacity="0.45" fontSize="7.5" fontFamily="monospace" letterSpacing="1.5">COMPONENT TREE</text>

      <rect x="110" y="237" width="60" height="18" rx="2"
        fill="#6CD99C" fillOpacity="0.12" stroke="#6CD99C" strokeOpacity="0.35" strokeWidth="0.8" />
      <text x="140" y="249" fill="#6CD99C" fillOpacity="0.80" fontSize="7" fontFamily="monospace" textAnchor="middle">&lt;App /&gt;</text>

      <line x1="140" y1="255" x2="140" y2="266" stroke="#FFFFFF" strokeOpacity="0.20" strokeWidth="0.7" />
      <line x1="80" y1="266" x2="200" y2="266" stroke="#FFFFFF" strokeOpacity="0.20" strokeWidth="0.7" />

      {[
        [46, 266, 68, 18, '<Router />'],
        [116, 266, 68, 18, '<Layout />'],
        [186, 266, 68, 18, '<Store />'],
      ].map(([x, y, w, h, label], i) => (
        <g key={i}>
          <line x1={(x as number) + (w as number) / 2} y1={y as number} x2={(x as number) + (w as number) / 2} y2={(y as number) + 6} stroke="#FFFFFF" strokeOpacity="0.20" strokeWidth="0.7" />
          <rect x={x} y={(y as number) + 6} width={w} height={h} rx="2"
            fill="#FFFFFF" fillOpacity="0.05" stroke="#FFFFFF" strokeOpacity="0.20" strokeWidth="0.7" />
          <text x={(x as number) + (w as number) / 2} y={(y as number) + 18} fill="#FFFFFF" fillOpacity="0.50" fontSize="6.5" fontFamily="monospace" textAnchor="middle">{label as string}</text>
        </g>
      ))}

      {[80, 150, 220].map((cx, col) => {
        const baseY = 302;
        const labels = [['<Hero />', '<Nav />'], ['<Section />', '<Footer />'], ['<Modal />', '<Toast />']];
        return labels[col].map((label, row) => (
          <g key={`${col}-${row}`}>
            <line x1={cx} y1={baseY - 6} x2={cx} y2={baseY + row * 28} stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="0.6" />
            <rect x={cx - 30} y={baseY + row * 28} width="60" height="16" rx="2"
              fill="#FFFFFF" fillOpacity="0.04" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="0.6" />
            <text x={cx} y={baseY + row * 28 + 11} fill="#FFFFFF" fillOpacity="0.40" fontSize="6" fontFamily="monospace" textAnchor="middle">{label}</text>
          </g>
        ));
      })}

      {/* ── PANEL 4 · Code Block ─────────────────────────────────────────────── */}
      <rect x="295" y="240" width="235" height="139" rx="6"
        fill="#FFFFFF" fillOpacity="0.04"
        stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="0.8" />

      <rect x="295" y="240" width="235" height="20" rx="6"
        fill="#FFFFFF" fillOpacity="0.05" />
      <rect x="295" y="250" width="235" height="10"
        fill="#FFFFFF" fillOpacity="0.05" />
      <circle cx="312" cy="250" r="3.5" fill="#FFFFFF" fillOpacity="0.22" />
      <circle cx="325" cy="250" r="3.5" fill="#FFFFFF" fillOpacity="0.15" />
      <circle cx="338" cy="250" r="3.5" fill="#FFFFFF" fillOpacity="0.10" />
      <text x="360" y="253" fill="#FFFFFF" fillOpacity="0.35" fontSize="6.5" fontFamily="monospace">api/growth.ts</text>

      {[
        { x: 311, y: 276, color: '#6CD99C', op: 0.70, text: 'export async function fetchGrowth(' },
        { x: 311, y: 289, color: '#FFFFFF', op: 0.45, text: '  client: TechVistarClient,' },
        { x: 311, y: 302, color: '#FFFFFF', op: 0.45, text: '  range: DateRange' },
        { x: 311, y: 315, color: '#6CD99C', op: 0.65, text: '): Promise<GrowthReport> {' },
        { x: 311, y: 328, color: '#FFFFFF', op: 0.32, text: '  const metrics = await client' },
        { x: 311, y: 341, color: '#FFFFFF', op: 0.32, text: '    .analytics.query(range);' },
        { x: 311, y: 354, color: '#6CD99C', op: 0.60, text: '  return transform(metrics);' },
        { x: 311, y: 367, color: '#FFFFFF', op: 0.45, text: '}' },
      ].map((line, i) => (
        <text key={i} x={line.x} y={line.y} fill={line.color} fillOpacity={line.op}
          fontSize="7.5" fontFamily="monospace">{line.text}</text>
      ))}

      {/* ── PANEL 5 · Status Cards ────────────────────────────────────────────── */}
      {/* outer container: x=30, width=500, so right edge=530. 4 cards × 112w + gaps fit inside */}
      <rect x="30" y="402" width="500" height="96" rx="6"
        fill="#FFFFFF" fillOpacity="0.03"
        stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="0.8" />

      {/* cards: x positions 38, 164, 290, 416 — each 112 wide, 80 tall, bottom = 402+16+80=498 < 498 ✓ */}
      {[
        { x: 38,  label: 'LEADS',  icon: '↗', status: 'Growing', trend: 'up this month' },
        { x: 164, label: 'CONV.',  icon: '↗', status: 'Strong',  trend: 'above target'  },
        { x: 290, label: 'PIPE',   icon: '↗', status: 'Healthy', trend: 'on track'      },
        { x: 416, label: 'NPS',    icon: '★', status: 'Top',     trend: 'top quartile'  },
      ].map((m) => (
        <g key={m.label}>
          {/* card box: top=414, height=72, bottom=486 — well inside outer box bottom 498 */}
          <rect x={m.x} y="414" width="112" height="72" rx="4"
            fill="#FFFFFF" fillOpacity="0.04"
            stroke="#6CD99C" strokeOpacity="0.18" strokeWidth="0.8" />

          {/* icon badge */}
          <rect x={m.x + 8} y="421" width="18" height="18" rx="2"
            fill="#6CD99C" fillOpacity="0.12" stroke="#6CD99C" strokeOpacity="0.30" strokeWidth="0.7" />
          <text x={m.x + 17} y="433" fill="#6CD99C" fillOpacity="0.75" fontSize="8" fontFamily="monospace" textAnchor="middle">{m.icon}</text>

          {/* label — sits at y=447, well inside card */}
          <text x={m.x + 8} y="447" fill="#FFFFFF" fillOpacity="0.38" fontSize="6" fontFamily="monospace" letterSpacing="1">{m.label}</text>
          {/* status word — y=459 */}
          <text x={m.x + 8} y="459" fill="#FFFFFF" fillOpacity="0.78" fontSize="10" fontFamily="monospace" fontWeight="bold">{m.status}</text>
          {/* trend — y=471, bottom of text ~479, card bottom=486 ✓ */}
          <text x={m.x + 8} y="471" fill="#6CD99C" fillOpacity="0.60" fontSize="6" fontFamily="monospace">{m.trend}</text>
        </g>
      ))}

      {/* divider dashes between cards */}
      {[152, 278, 404].map((x) => (
        <line key={x} x1={x} y1="450" x2={x + 10} y2="450"
          stroke="#6CD99C" strokeOpacity="0.22" strokeWidth="0.8" strokeDasharray="2 2" />
      ))}
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
type HeroSectionProps = { showAnnouncementBar?: boolean; };

export const HeroSection = ({ showAnnouncementBar = false }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY      = useTransform(scrollYProgress, [0, 0.28], [0, 36]);

  // The headline reads: "Technology-first Growth" / "Without the chaos"
  // headlineLine1 = "Technology-first"
  // headlineAccent = "Growth"  ← comes AFTER headlineLine1, at the end of line 1
  // headlineLine2 = "Without the chaos"
  const heroHeadlineLabel = `${HERO_COPY.headlineLine1} ${HERO_COPY.headlineAccent} ${HERO_COPY.headlineLine2}`;

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] overflow-hidden selection:bg-[#6CD99C]/20"
      style={{ backgroundColor: '#0D1B26' }}
    >
      {/* Fabric / noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.6,
          mixBlendMode: 'overlay',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 50% 60%, rgba(20,35,50,0.0) 0%, rgba(8,16,24,0.7) 100%),
            repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.010) 2px, rgba(255,255,255,0.010) 4px),
            repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 6px)
          `,
        }}
      />

      {/* Fade-in overlay */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ backgroundColor: '#0D1B26' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8 }}
      />

      {/* ── Main scroll wrapper ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className={cn(
          'relative z-10 flex min-h-[100svh] items-center px-6 sm:px-8 lg:px-12 xl:px-16',
          showAnnouncementBar ? 'pt-[9.75rem] md:pt-[10.5rem]' : 'pt-[7.5rem] md:pt-28',
          'pb-20 md:pb-24'
        )}
      >
        <div className="mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[minmax(420px,45fr)_55fr] gap-8 lg:gap-10 items-center">

          {/* ── COLUMN 1 · Typography + CTAs ──────────────────────────────────── */}
          <motion.div variants={container} initial="hidden" animate="visible" className="flex flex-col min-w-0">

            {/* Headline
                Line 1: "Technology-first Growth"
                          ^^^^^^^^^^^^^^^^^ ^^^^^^
                          headlineLine1     headlineAccent (green, typed)
                Line 2: "Without the chaos"
            */}
            <motion.h1
              variants={rise}
              className="font-display text-[clamp(2.4rem,4.8vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white"
              aria-label={heroHeadlineLabel}
            >
              <span aria-hidden className="block">
                {/* Line 1: "Technology-first Growth" — all inline so they never separate */}
                <span className="block whitespace-nowrap">
                  <span className="text-white">{HERO_COPY.headlineLine1} </span>
                  <TypingAccent
                    text={HERO_COPY.headlineAccent}
                    reduced={reduceMotion}
                    delayMs={1800}
                    className="text-[#6CD99C]"
                  />
                </span>
                {/* Line 2: "Without the chaos" */}
                <span className="mt-1 block text-white sm:mt-2">
                  {HERO_COPY.headlineLine2}
                </span>
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-md text-base leading-relaxed sm:text-lg"
              style={{ color: '#8FA0B0' }}
            >
              {HERO_COPY.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 w-full max-w-sm"
            >
              <Link
                to="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center h-14 rounded-2xl text-base font-semibold transition-all duration-200"
                style={{ background: '#6CD99C', color: '#0B131A' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#80e4aa'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#6CD99C'; }}
              >
                {HERO_COPY.ctaPrimary}
              </Link>

              <Link
                to="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center h-14 rounded-2xl text-base font-semibold text-white transition-all duration-200"
                style={{ background: '#1E2F3D', border: '1px solid #2A3D50' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#253748'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = '#1E2F3D'; }}
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </motion.div>

            {/* Location line */}
            <motion.p
              variants={fadeUp}
              className="mt-12 text-xs font-medium tracking-[0.12em]"
              style={{ color: '#8FA0B0' }}
            >
              {HERO_COPY.locationLine}
            </motion.p>
          </motion.div>

          {/* ── COLUMN 2 · Analytical illustration ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-end w-full pl-8"
            aria-hidden
          >
            <div className="w-full max-w-[600px]">
              <AnalyticsIllustration />
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};