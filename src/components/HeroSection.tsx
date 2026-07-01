import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { HERO_COPY, TESTIMONIAL_AGGREGATE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Zap, Shield, CheckCircle2 } from "lucide-react";

// Animation variants
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// System Diagram with floating stat cards
function SystemVisual() {
  return (
    <div
      className="relative flex w-full items-center justify-center select-none"
      aria-hidden
      style={{
        aspectRatio: "1 / 1",
        maxWidth: 580,
      }}
    >
      {/* Concentric rotating dotted lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-80 h-80 rounded-full border border-dashed border-primary/20"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-secondary/15"
        />
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[540px] h-[540px] rounded-full border border-white/[0.03]"
        />
      </div>

      {/* Central Glow Orb */}
      <div className="relative flex h-48 w-48 items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-container via-accent to-electric-teal rounded-full blur-[80px] opacity-30 animate-pulse" />
        <div className="relative z-10 w-24 h-24 rounded-3xl bg-surface-charcoal/80 border border-border-subtle backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <Zap className="h-10 w-10 text-electric-teal animate-bounce" />
        </div>
      </div>

      {/* Floating stat card 1: 98% On-time */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-[10%] z-20 rounded-2xl border border-border-subtle/85 bg-surface-charcoal/90 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        </div>
        <div>
          <div className="font-mono text-sm font-bold text-white uppercase tracking-tight">
            {TESTIMONIAL_AGGREGATE[0].value}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {TESTIMONIAL_AGGREGATE[0].label}
          </div>
        </div>
      </motion.div>

      {/* Floating stat card 2: 60+ Engagements */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-16 left-[5%] z-20 rounded-2xl border border-border-subtle/85 bg-surface-charcoal/90 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <div className="font-mono text-sm font-bold text-white uppercase tracking-tight">
            {TESTIMONIAL_AGGREGATE[1].value}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {TESTIMONIAL_AGGREGATE[1].label}
          </div>
        </div>
      </motion.div>

      {/* Floating stat card 3: 4.9 Satisfaction */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        className="absolute right-[5%] top-1/3 z-20 rounded-2xl border border-border-subtle/85 bg-surface-charcoal/90 p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center gap-3"
      >
        <div className="h-10 w-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <div className="font-mono text-sm font-bold text-white uppercase tracking-tight">
            {TESTIMONIAL_AGGREGATE[2].value}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            {TESTIMONIAL_AGGREGATE[2].label}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.35], [0, 48]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative isolate min-h-screen overflow-hidden bg-background flex items-center justify-center py-20"
    >
      {/* Mesh / Radial Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[80vw] h-[80vw] max-w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,113,227,0.12)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute bottom-[10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-[radial-gradient(circle,rgba(203,190,255,0.06)_0%,transparent_70%)] blur-2xl" />
        <div className="absolute inset-0 bg-grid-pattern-dark opacity-[0.25]" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 md:mt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Typography + CTAs */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Announcement badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-3 py-1 bg-surface-charcoal/80 border border-border-subtle rounded-full mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric-teal animate-pulse" />
              <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider">
                Systems Engineering v2.0
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={rise}
              className="font-display text-[32px] sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-white max-w-2xl"
            >
              Technology-first{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Growth
              </span>{" "}
              Without the chaos.
            </motion.h1>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed"
            >
              {HERO_COPY.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link
                to="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center px-8 h-12 rounded-xl bg-primary text-background font-bold text-sm tracking-wide hover:opacity-95 active:scale-98 transition-all shadow-[0_0_20px_-3px_rgba(171,199,255,0.4)]"
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
                className="inline-flex items-center justify-center px-8 h-12 rounded-xl border border-border-subtle bg-surface-charcoal/40 text-white font-bold text-sm tracking-wide hover:bg-white/[0.04] active:scale-98 transition-all"
              >
                {HERO_COPY.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right visual dashboard orbits */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center pl-0 lg:pl-6"
          >
            <SystemVisual />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

