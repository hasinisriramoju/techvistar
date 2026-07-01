import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HERO_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Typing accent ────────────────────────────────────────────────────────────
function TypingAccent({
  text,
  reduced,
  delayMs,
  charMs = 72,
  className,
}: {
  text: string;
  reduced: boolean;
  delayMs: number;
  charMs?: number;
  className?: string;
}) {
  const [len, setLen] = useState(reduced ? text.length : 0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced) {
      setLen(text.length);
      return;
    }
    setLen(0);
    timeoutRef.current = window.setTimeout(() => {
      let i = 0;
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setLen(Math.min(i, text.length));
        if (i >= text.length && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
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
    <span className={`relative inline-block align-baseline ${className ?? ""}`}>
      <span aria-hidden className="invisible whitespace-pre">
        {text}
      </span>
      <span className="absolute left-0 top-0 whitespace-pre" aria-hidden>
        {visible}
        {!done && (
          <span
            className="ml-px inline-block h-[0.85em] w-[2px] translate-y-px bg-[#6CD99C]/90 align-middle animate-pulse"
            aria-hidden
          />
        )}
      </span>
    </span>
  );
}

// ─── Right-side system diagram (matches reference: two stacked windows) ──────
function SystemDiagram() {
  return (
    <div
      className="relative flex w-full items-center justify-center"
      aria-hidden
      style={{
        aspectRatio: "1 / 0.95",
        maxWidth: 860,
        transform: "translateX(6%)",
        opacity: 0.5,
      }}
    >
      {/* Concentric dashed rings */}
      <svg viewBox="0 0 560 560" className="absolute h-full w-full" fill="none">
        <circle
          cx="280"
          cy="280"
          r="270"
          stroke="#FFFFFF"
          strokeOpacity="0.06"
          strokeWidth="1"
        />
        <circle
          cx="280"
          cy="280"
          r="270"
          stroke="#6CD99C"
          strokeOpacity="0.10"
          strokeWidth="1"
          strokeDasharray="1 5"
        />
        <circle
          cx="280"
          cy="280"
          r="220"
          stroke="#FFFFFF"
          strokeOpacity="0.07"
          strokeWidth="1"
        />
      </svg>

      {/* Wrapper holding both windows, offset like the reference */}
      <div className="relative w-full max-w-[820px]">
        {/* ── TOP WINDOW · tabs + node list + chart ── */}
        <div
          className="relative z-20 rounded-xl border overflow-hidden"
          style={{
            background: "rgba(13,27,38,0.94)",
            borderColor: "rgba(108,217,156,0.16)",
            boxShadow:
              "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 60px rgba(108,217,156,0.05)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
          </div>

          {/* Tab bar */}
          <div
            className="flex items-center gap-6 px-5 pt-3 pb-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              className="font-mono text-[12px]"
              style={{ color: "#6CD99C" }}
            >
              [ System Architecture ]
            </span>
            <span
              className="font-mono text-[12px]"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              [ Codebase ]
            </span>
            <span
              className="font-mono text-[12px]"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              [ Metrics ]
            </span>
          </div>
          <div className="px-5">
            <div
              className="h-[1.5px] w-[132px]"
              style={{ background: "#6CD99C", opacity: 0.7 }}
            />
          </div>

          {/* Body: left node list, right bar chart */}
          <div className="grid grid-cols-[1fr_1.05fr] gap-3 p-4">
            {/* Left — node stack */}
            <div className="flex flex-col gap-2">
              {["Client Layer", "API Gateway", "Services"].map((n) => (
                <div
                  key={n}
                  className="rounded-md px-2.5 py-1.5 font-mono text-[10px]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(108,217,156,0.22)",
                    color: "rgba(255,255,255,0.62)",
                  }}
                >
                  {n}
                </div>
              ))}
              <div className="mt-1 grid grid-cols-2 gap-1.5">
                {["Auth", "Cache", "DB", "CDN"].map((n) => (
                  <div
                    key={n}
                    className="rounded-md px-2 py-1.5 text-center font-mono text-[9px]"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      color: "rgba(255,255,255,0.42)",
                    }}
                  >
                    {n}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — bar chart */}
            <div
              className="rounded-lg p-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <svg viewBox="0 0 180 100" className="h-full w-full" fill="none">
                {[
                  { x: 20, baseY: 84, fromH: 8, toH: 24, delay: 0 },
                  { x: 44, baseY: 84, fromH: 14, toH: 34, delay: 0.12 },
                  { x: 68, baseY: 84, fromH: 18, toH: 42, delay: 0.24 },
                  { x: 92, baseY: 84, fromH: 16, toH: 38, delay: 0.36 },
                  { x: 116, baseY: 84, fromH: 22, toH: 54, delay: 0.48 },
                  { x: 140, baseY: 84, fromH: 26, toH: 66, delay: 0.6 },
                ].map((b, i) => (
                  <motion.rect
                    key={i}
                    x={b.x}
                    width="14"
                    rx="2"
                    fill="#6CD99C"
                    fillOpacity={0.18 + i * 0.06}
                    initial={{ height: b.fromH, y: b.baseY - b.fromH }}
                    animate={{
                      height: [b.fromH, b.toH, b.fromH],
                      y: [
                        b.baseY - b.fromH,
                        b.baseY - b.toH,
                        b.baseY - b.fromH,
                      ],
                    }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: b.delay,
                    }}
                  />
                ))}
                <motion.polyline
                  points="27,58 51,48 75,40 99,44 123,28 147,16"
                  stroke="#6CD99C"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, ease: "easeInOut", delay: 0.3 }}
                />
                {[
                  [27, 58],
                  [51, 48],
                  [75, 40],
                  [99, 44],
                  [123, 28],
                  [147, 16],
                ].map(([cx, cy], i) => (
                  <motion.circle
                    key={i}
                    cx={cx as number}
                    cy={cy as number}
                    r="2.4"
                    fill="#6CD99C"
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.3, 1] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                ))}
                {["Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                  <text
                    key={m}
                    x={44 + i * 24}
                    y="96"
                    fill="#FFFFFF"
                    fillOpacity="0.3"
                    fontSize="6"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {m}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative sparkle */}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
type HeroSectionProps = { showAnnouncementBar?: boolean };

export const HeroSection = ({
  showAnnouncementBar = false,
}: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion === true;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.28], [0, 36]);

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
      style={{ backgroundColor: "#0D1B26" }}
    >
      {/* Fabric / noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
          opacity: 0.6,
          mixBlendMode: "overlay",
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
        style={{ backgroundColor: "#0D1B26" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.8 }}
      />

      {/* ── Main scroll wrapper ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className={cn(
          "relative z-10 flex min-h-[100svh] items-center px-6 sm:px-8 lg:px-12 xl:px-16",
          showAnnouncementBar
            ? "pt-[9.75rem] md:pt-[10.5rem]"
            : "pt-[7.5rem] md:pt-28",
          "pb-20 md:pb-24",
        )}
      >
        <div className="mx-auto w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-[minmax(0,45fr)_55fr] gap-8 lg:gap-10 items-center">
          {/* ── COLUMN 1 · Typography + CTAs ──────────────────────────────────── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col min-w-0"
          >
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
                <span className="block whitespace-normal sm:whitespace-nowrap">
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
              style={{ color: "#8FA0B0" }}
            >
              {HERO_COPY.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col sm:flex-row gap-3 w-full max-w-sm"
            >
              <Link
                to="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:flex-1 flex items-center justify-center h-14 rounded-2xl text-base font-semibold transition-all duration-200"
                style={{ background: "#6CD99C", color: "#0B131A" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#80e4aa";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#6CD99C";
                }}
              >
                {HERO_COPY.ctaPrimary}
              </Link>

              <Link
                to="/#services"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:flex-1 flex items-center justify-center h-14 rounded-2xl text-base font-semibold text-white transition-all duration-200"
                style={{ background: "#1E2F3D", border: "1px solid #2A3D50" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#253748";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "#1E2F3D";
                }}
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </motion.div>

            {/* Location line */}
            {HERO_COPY.locationLine && (
              <motion.p
                variants={fadeUp}
                className="mt-12 text-xs font-medium tracking-[0.12em]"
                style={{ color: "#8FA0B0" }}
              >
                {HERO_COPY.locationLine}
              </motion.p>
            )}
          </motion.div>

          {/* ── COLUMN 2 · Analytical illustration ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-end w-full pl-8"
            aria-hidden
          >
            <div className="w-full max-w-[760px]">
              <SystemDiagram />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
