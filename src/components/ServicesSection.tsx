/* ServicesSection.tsx — dark bg matching ProcessSection (#13263A) */

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { SiteSection } from "@/components/SiteSection";

import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { SECTION_SERVICES, SERVICES } from "@/lib/constants";

type Service = (typeof SERVICES)[number];
type ServiceGroup = { title: string; services: [Service, Service] };

const SVC: ServiceGroup[] = [
  { title: "Growth Foundations", services: [SERVICES[0], SERVICES[1]] },
  { title: "Growth & Automation", services: [SERVICES[2], SERVICES[3]] },
  { title: "Scale & Intelligence", services: [SERVICES[4], SERVICES[5]] },
];
const COUNT = SVC.length;

// ─── Graph geometry ───────────────────────────────────────────────────────────
const VW = 580;
const VH = 360;
const NODES: [number, number][] = [
  [80, 300],
  [290, 180],
  [520, 60],
];
const PTS = NODES.map(([x, y]) => `${x},${y}`).join(" ");

function segLen(pts: [number, number][]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    l += Math.sqrt(dx * dx + dy * dy);
  }
  return l;
}
const TOTAL_LEN = segLen(NODES);

// ─── GrowthGraph ─────────────────────────────────────────────────────────────
function GrowthGraph({ activeIndex }: { activeIndex: number }) {
  const drawFrac = activeIndex / (COUNT - 1);
  const dashOffset = TOTAL_LEN * (1 - drawFrac);
  const LINE_T = "stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1)";

  return (
    <svg
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      height="100%"
      aria-hidden
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="g-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0071e3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#00F5FF" />
        </linearGradient>
        <linearGradient id="g-area" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0071e3" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0071e3" stopOpacity="0.01" />
        </linearGradient>
        <filter id="g-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="n-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="area-clip">
          <rect
            x={0}
            y={0}
            width={VW * drawFrac + 2}
            height={VH + 20}
            style={{ transition: "width 0.9s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </clipPath>
      </defs>

      {[0.2, 0.4, 0.6, 0.8].map((t) => (
        <line
          key={t}
          x1={28}
          y1={VH * t}
          x2={VW - 8}
          y2={VH * t}
          stroke="rgba(0,245,255,0.08)"
          strokeWidth={1}
        />
      ))}
      <line
        x1={28}
        y1={4}
        x2={28}
        y2={VH}
        stroke="rgba(100,116,139,0.25)"
        strokeWidth={1}
      />
      <line
        x1={28}
        y1={VH}
        x2={VW - 8}
        y2={VH}
        stroke="rgba(100,116,139,0.25)"
        strokeWidth={1}
      />

      {[0.25, 0.5, 0.75].map((t) => (
        <text
          key={t}
          x={20}
          y={VH * t + 4}
          fontSize={8}
          textAnchor="end"
          fill="rgba(148,163,184,0.35)"
          fontFamily="inherit"
        >
          {Math.round((1 - t) * 100)}
        </text>
      ))}

      <polygon
        points={[
          ...NODES.map(([x, y]) => `${x},${y}`),
          `${NODES[NODES.length - 1][0]},${VH}`,
          `${NODES[0][0]},${VH}`,
        ].join(" ")}
        fill="url(#g-area)"
        clipPath="url(#area-clip)"
      />
      <polyline
        points={PTS}
        fill="none"
        stroke="rgba(0,113,227,0.15)"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#g-glow)"
        style={{
          strokeDasharray: TOTAL_LEN,
          strokeDashoffset: dashOffset,
          transition: LINE_T,
        }}
      />
      <polyline
        points={PTS}
        fill="none"
        stroke="url(#g-line)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: TOTAL_LEN,
          strokeDashoffset: dashOffset,
          transition: LINE_T,
        }}
      />

      {NODES.map(([x, y], i) => {
        const active = i === activeIndex;
        const past = i < activeIndex;
        const reached = i <= activeIndex;
        return (
          <g
            key={i}
            transform={`translate(${x},${y})`}
            style={{
              opacity: reached ? 1 : 0.2,
              transition: "opacity 0.5s ease",
            }}
          >
            {active && (
              <circle
                cx={0}
                cy={0}
                r={20}
                fill="rgba(0,245,255,0.10)"
                style={{ animation: "sv-pulse 2.2s ease-in-out infinite" }}
              />
            )}
            {reached && (
              <circle
                cx={0}
                cy={0}
                r={active ? 15 : 10}
                fill="rgba(0,245,255,0.06)"
                filter={active ? "url(#n-glow)" : undefined}
                style={{ transition: "r 0.5s ease" }}
              />
            )}
            <circle
              cx={0}
              cy={0}
              r={active ? 9 : past ? 6.5 : 5}
              fill={
                active ? "#00F5FF" : past ? "#abc7ff" : "rgba(100,116,139,0.25)"
              }
              stroke={
                active
                  ? "rgba(255,255,255,0.5)"
                  : past
                    ? "rgba(255,255,255,0.3)"
                    : "none"
              }
              strokeWidth={active ? 2.5 : 1.5}
              style={{
                transition: "r 0.45s ease, fill 0.45s ease",
                filter: active
                  ? "drop-shadow(0 0 10px rgba(0,245,255,0.9))"
                  : past
                    ? "drop-shadow(0 0 5px rgba(0,113,227,0.5))"
                    : "none",
              }}
            />
            <text
              x={0}
              y={active ? -24 : -18}
              textAnchor="middle"
              fontSize={active ? 11 : 9}
              fontWeight={active ? 700 : 500}
              fill={
                active ? "#00F5FF" : past ? "#abc7ff" : "rgba(100,116,139,0.35)"
              }
              fontFamily="inherit"
              style={{ transition: "all 0.4s ease", letterSpacing: "0.04em" }}
            >
              0{i + 1}
            </text>
          </g>
        );
      })}
      <style>{`
        @keyframes sv-pulse {
          0%   { r: 15px; opacity: 0.4; }
          70%  { r: 28px; opacity: 0;   }
          100% { r: 15px; opacity: 0;   }
        }
      `}</style>
    </svg>
  );
}

// ─── ContentPanel ─────────────────────────────────────────────────────────────
function ContentPanel({
  group,
  index,
}: {
  group: ServiceGroup;
  index: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
            style={{
              background: "rgba(0,245,255,0.12)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.30)",
              boxShadow: "0 0 12px rgba(0,245,255,0.15)",
            }}
          >
            0{index + 1}
          </span>
          <span
            className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#abc7ff" }}
          >
            Milestone {index + 1} of {COUNT}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-white mb-5 sm:text-2xl">
          {group.title}
        </h3>

        <div className="flex flex-col gap-4 flex-1">
          {group.services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-4 transition-all duration-300 bg-surface-charcoal/40 border border-border-subtle hover:border-primary/40 hover:bg-surface-charcoal/70"
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary"
                >
                  <service.icon className="h-4 w-4" strokeWidth={1.7} />
                </div>
                <span className="font-semibold text-sm text-white leading-snug">
                  {service.title}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground mb-3">
                {service.description}
              </p>
              <ul className="space-y-1.5" role="list">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2.5 text-sm leading-snug text-on-surface-variant"
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md bg-electric-teal/10 border border-electric-teal/25 text-electric-teal"
                    >
                      <Check className="h-2.5 w-2.5 stroke-[2.5]" aria-hidden />
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mt-5">
          {SVC.map((_, i) => (
            <div
              key={i}
              className="h-[3px] rounded-full"
              style={{
                flex: i === index ? 4 : 1,
                background:
                  i < index
                    ? "#00F5FF"
                    : i === index
                      ? "#00F5FF"
                      : "rgba(0,245,255,0.15)",
                transition:
                  "flex 0.5s cubic-bezier(0.4,0,0.2,1), background 0.4s ease",
              }}
            />
          ))}
        </div>

        <div className="mt-2.5 text-[0.65rem] text-muted-foreground flex items-center gap-1.5">
          {index < COUNT - 1 ? (
            <>
              <span>↓</span> Scroll to advance
            </>
          ) : (
            <>
              <span className="text-electric-teal">✓</span>
              <span className="font-medium text-electric-teal">
                Journey complete — scroll to continue
              </span>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
const AUTOPLAY_MS = 4500;

export const ServicesSection = () => {
  const { ref: inViewRef, isInView } = useAnimatedSection();
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(Date.now());

  const resetTimer = useCallback(() => {
    startRef.current = Date.now();
    setProgress(0);
  }, []);
  const goTo = useCallback(
    (i: number) => {
      setActiveIndex(i);
      resetTimer();
    },
    [resetTimer],
  );

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const p = Math.min(1, elapsed / AUTOPLAY_MS);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setActiveIndex((i) => (i + 1) % COUNT);
        startRef.current = Date.now();
        setProgress(0);
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, activeIndex]);

  return (
    <SiteSection
      ref={inViewRef}
      id="services"
      variant="muted"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-background border-b border-border-subtle"
    >
      {/* Dark Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(0, 113, 227, 0.08) 0%, transparent 60%)",
        }}
      />

      {/* Section header */}
      <div className="container-custom relative z-10 pb-0">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {SECTION_SERVICES.tag && (
            <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              {SECTION_SERVICES.tag}
            </p>
          )}
          <h2
            id="services-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            {SECTION_SERVICES.title}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{SECTION_SERVICES.highlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {SECTION_SERVICES.description}
          </p>
        </motion.div>
      </div>

      {/* ── DESKTOP ─────────────────────────────────────────────────────────── */}
      <div className="hidden md:block container-custom">
        <div
          className="rounded-2xl overflow-hidden bg-surface-charcoal/40 backdrop-blur-xl border border-border-subtle shadow-2xl shadow-black/40"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1px 1fr",
              minHeight: 580,
            }}
          >
            {/* LEFT: graph + nav */}
            <div className="flex flex-col p-5 lg:p-8" style={{ minHeight: 0 }}>
              <div className="flex flex-col gap-1.5 mb-6">
                {SVC.map((group, i) => (
                  <button
                    key={group.title}
                    onClick={() => goTo(i)}
                    className="flex items-center gap-2.5 text-left w-fit"
                    aria-label={`Go to ${group.title}`}
                    aria-current={i === activeIndex ? "true" : undefined}
                  >
                    <span
                      className="rounded-full h-[5px] flex-shrink-0"
                      style={{
                        width:
                          i === activeIndex ? 22 : i < activeIndex ? 13 : 7,
                        background:
                          i === activeIndex
                            ? "#00F5FF"
                            : i < activeIndex
                              ? "#abc7ff"
                              : "rgba(255,255,255,0.1)",
                        transition: "width 0.35s ease, background 0.35s ease",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.7rem",
                        lineHeight: 1.35,
                        color:
                          i === activeIndex
                            ? "#00F5FF"
                            : i < activeIndex
                              ? "#abc7ff"
                              : "rgba(255,255,255,0.3)",
                        fontWeight: i === activeIndex ? 700 : 500,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {group.title}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex-1 min-h-0" style={{ minHeight: 260 }}>
                <GrowthGraph activeIndex={activeIndex} />
              </div>

              <div className="flex justify-between mt-2 px-4">
                <span
                  className="text-[0.6rem] font-mono font-semibold tracking-wide text-primary/40 uppercase"
                >
                  Foundation
                </span>
                <span
                  className="text-[0.6rem] font-mono font-semibold tracking-wide text-secondary/40 uppercase"
                >
                  Scalable Business
                </span>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-1.5 mb-2.5">
                  {SVC.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      aria-label={`Go to milestone ${i + 1}`}
                      className="relative h-[3px] rounded-full overflow-hidden flex-1"
                      style={{
                        cursor: "pointer",
                        background: "rgba(255,255,255,0.06)",
                      }}
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width:
                            i < activeIndex
                              ? "100%"
                              : i === activeIndex
                                ? `${progress * 100}%`
                                : "0%",
                          transition:
                            i < activeIndex ? "width 0.3s ease" : "none",
                          background: i < activeIndex ? "#abc7ff" : "#00F5FF",
                        }}
                      />
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] text-muted-foreground">
                    {paused
                      ? "⏸ Paused"
                      : `Auto-advancing · ${activeIndex + 1} of ${COUNT}`}
                  </span>
                  <button
                    onClick={() => setPaused((p) => !p)}
                    className="text-[0.65rem] text-muted-foreground hover:text-white transition-colors"
                  >
                    {paused ? "▶ Resume" : "⏸ Pause"}
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              style={{
                width: 1,
                alignSelf: "stretch",
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 15%, rgba(255,255,255,0.08) 85%, transparent)",
                boxShadow: "0 0 6px 0px rgba(0,245,255,0.05)",
              }}
            />

            {/* RIGHT: content panel */}
            <div className="flex flex-col justify-center p-6 lg:p-10">
              <ContentPanel group={SVC[activeIndex]} index={activeIndex} />
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-6">
          <div
            className="flex flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl px-6 py-6 sm:flex-row sm:px-8 border border-border-subtle bg-surface-charcoal/30 shadow-xl shadow-black/20"
          >
            <span className="max-w-xl text-center text-sm leading-relaxed text-muted-foreground sm:text-left">
              {SECTION_SERVICES.cta}
            </span>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-lg px-5 py-2.5 bg-primary text-background font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_-3px_rgba(171,199,255,0.3)] hover:opacity-95"
            >
              Reach out <ArrowUpRight className="h-4 w-4" aria-hidden />
            </motion.a>
          </div>
        </div>
      </div>

      {/* ── MOBILE ──────────────────────────────────────────────────────────── */}
      <div className="md:hidden container-custom">
        <div className="flex flex-col gap-5">
          {SVC.map((group, index) => (
            <div
              key={group.title}
              className="rounded-2xl p-5 bg-surface-charcoal/40 border border-border-subtle shadow-lg"
            >
              <div
                className="h-[2px] w-full rounded-full mb-4"
                style={{
                  background: "linear-gradient(to right, #0071e3, #00F5FF)",
                }}
              />
              <div className="mb-4">
                <span
                  className="text-[0.65rem] font-mono font-bold uppercase tracking-[0.12em] text-electric-teal"
                >
                  0{index + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-white leading-snug">
                  {group.title}
                </h3>
              </div>
              {group.services.map((service) => (
                <div key={service.title} className="mb-4 last:mb-0">
                  <div className="flex gap-3 mb-1.5">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-primary"
                    >
                      <service.icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <span className="font-semibold text-sm text-white pt-1">
                      {service.title}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground mb-2">
                    {service.description}
                  </p>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-2 text-xs text-on-surface-variant"
                      >
                        <Check
                          className="h-3.5 w-3.5 mt-0.5 shrink-0 text-electric-teal"
                          strokeWidth={2.5}
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <div
            className="flex flex-col items-center gap-4 rounded-2xl px-6 py-6 border border-border-subtle bg-surface-charcoal/30 shadow-lg text-center"
          >
            <span className="text-sm leading-relaxed text-muted-foreground">
              {SECTION_SERVICES.cta}
            </span>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-5 py-3 bg-primary text-background font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_-3px_rgba(171,199,255,0.3)]"
            >
              Reach out <ArrowUpRight className="h-4 w-4" aria-hidden />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Section divider */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          bottom: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(19,38,58,0.14) 20%, rgba(19,38,58,0.14) 80%, transparent)",
        }}
      />
    </SiteSection>
  );
};
