'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';

// ─── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    concept: 'Concept 1',
    title: 'The Growth Engine Core',
    pillar: { n: '01', label: 'Engineering discipline' },
    desc: 'Version control, environments that mirror production, and repeatable releases—so deploys are boring in the right way.',
    illustration: 'engine',
  },
  {
    concept: 'Concept 2',
    title: 'Minimalist Radar Chart Navigation',
    pillar: { n: '02', label: 'Security & reliability' },
    desc: 'Threat-aware design, sensible defaults, and testing matched to your risk profile, data sensitivity, and compliance needs.',
    illustration: 'radar',
  },
  {
    concept: 'Concept 3',
    title: 'Asymmetric Terminal & Timeline',
    pillar: { n: '03', label: 'Revenue alignment' },
    desc: "Shared truth on backlog, demos, funnel metrics, and documentation so sales, marketing, and product agree on what 'done' means.",
    illustration: 'terminal',
  },
  {
    concept: 'Concept 4',
    title: 'Connected Tech Stack Layers',
    pillar: { n: '04', label: 'Quality & handover' },
    desc: 'Test evidence, runbooks, and training so your internal team owns the system after go-live.',
    illustration: 'stack',
  },
  {
    concept: 'Concept 5',
    title: 'Transparent Terms Ledger',
    pillar: { n: '05', label: 'Transparent terms' },
    desc: 'Effort-based or milestone billing with written assumptions—no surprise line items without prior approval.',
    illustration: 'ledger',
  },
  {
    concept: 'Concept 6',
    title: 'Full-Stack Continuity Web',
    pillar: { n: '06', label: 'Full-stack continuity' },
    desc: 'One partner for UI, APIs, data, automation, and docs reduces integration risk and speeds root-cause resolution.',
    illustration: 'web',
  },
] as const;

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function EngineIllustration() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Soft background accent */}
      <circle cx="160" cy="100" r="72" fill="#80E4AA" fillOpacity="0.06" />

      {/* Connecting belt between gears */}
      <path d="M118 70 Q90 90 100 130" stroke="#9bc2cf" strokeWidth="1.2" fill="none" strokeDasharray="3 4" />
      <path d="M202 70 Q230 90 220 130" stroke="#9bc2cf" strokeWidth="1.2" fill="none" strokeDasharray="3 4" />

      {/* Small gear top-left */}
      {(() => {
        const cx = 95, cy = 58, rOut = 20, rIn = 13, teeth = 8;
        const pts = Array.from({ length: teeth * 2 }, (_, i) => {
          const angle = (Math.PI * i) / teeth;
          const r = i % 2 === 0 ? rOut : rIn;
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
        }).join(' ');
        return (
          <g>
            <polygon points={pts} fill="#eef6f8" stroke="#9bc2cf" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="6" fill="#ffffff" stroke="#9bc2cf" strokeWidth="1" />
          </g>
        );
      })()}

      {/* Small gear bottom-right */}
      {(() => {
        const cx = 232, cy = 142, rOut = 17, rIn = 11, teeth = 7;
        const pts = Array.from({ length: teeth * 2 }, (_, i) => {
          const angle = (Math.PI * i) / teeth;
          const r = i % 2 === 0 ? rOut : rIn;
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
        }).join(' ');
        return (
          <g>
            <polygon points={pts} fill="#eef6f8" stroke="#9bc2cf" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="5" fill="#ffffff" stroke="#9bc2cf" strokeWidth="1" />
          </g>
        );
      })()}

      {/* Main large gear, center */}
      {(() => {
        const cx = 160, cy = 100, rOut = 46, rIn = 33, teeth = 12;
        const pts = Array.from({ length: teeth * 2 }, (_, i) => {
          const angle = (Math.PI * i) / teeth;
          const r = i % 2 === 0 ? rOut : rIn;
          return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
        }).join(' ');
        return (
          <g>
            <polygon points={pts} fill="#ffffff" stroke="#80E4AA" strokeWidth="1.6" />
            <circle cx={cx} cy={cy} r="22" fill="none" stroke="#80E4AA" strokeWidth="1.2" strokeOpacity="0.5" />
            <circle cx={cx} cy={cy} r="9" fill="#80E4AA" fillOpacity="0.25" stroke="#80E4AA" strokeWidth="1.4" />
          </g>
        );
      })()}

      {/* Tick marks radiating from center, like a build/release rhythm */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 16;
        const x1 = 160 + Math.cos(angle) * 58;
        const y1 = 100 + Math.sin(angle) * 58;
        const x2 = 160 + Math.cos(angle) * 64;
        const y2 = 100 + Math.sin(angle) * 64;
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c3dbe2" strokeWidth="1" />;
      })}
    </svg>
  );
}

function RadarIllustration() {
  const axes = 6;
  const cx = 160, cy = 96, r = 64;
  const rings = [0.33, 0.58, 0.82, 1];
  const dataPoints = [0.85, 0.55, 0.75, 0.65, 0.9, 0.7]; // highlighted axis 4 = Security

  const point = (ring: number, i: number) => {
    const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
    return { x: cx + Math.cos(angle) * r * ring, y: cy + Math.sin(angle) * r * ring };
  };

  const dataPath = dataPoints.map((v, i) => {
    const p = point(v, i);
    return `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`;
  }).join(' ') + 'Z';

  return (
    <svg viewBox="0 0 320 192" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Axis labels */}
      {['Quality', 'Security', 'Reliability', 'Scope', 'Engineering', 'Speed'].map((label, i) => {
        const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
        const lx = cx + Math.cos(angle) * (r + 18);
        const ly = cy + Math.sin(angle) * (r + 18);
        return (
          <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
            fontSize="8" fill="#7a9bac" fontFamily="sans-serif">{label}</text>
        );
      })}
      {/* Rings */}
      {rings.map((rv, ri) => {
        const pts = Array.from({ length: axes }, (_, i) => point(rv, i));
        const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
        return <path key={ri} d={d} stroke="#c8dae3" strokeWidth="0.8" fill="none" />;
      })}
      {/* Axis lines */}
      {Array.from({ length: axes }, (_, i) => {
        const tip = point(1, i);
        return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y} stroke="#c8dae3" strokeWidth="0.8" />;
      })}
      {/* Data polygon */}
      <path d={dataPath} fill="#80E4AA" fillOpacity="0.18" stroke="#80E4AA" strokeWidth="1.5" />
      {/* Highlighted dot on Security axis (index 1) */}
      {(() => {
        const p = point(dataPoints[1], 1);
        return (
          <>
            <circle cx={p.x} cy={p.y} r="5" fill="#80E4AA" />
            <circle cx={p.x} cy={p.y} r="9" fill="#80E4AA" fillOpacity="0.2" />
            {/* Pill label */}
            <rect x={p.x + 12} y={p.y - 9} width={84} height={18} rx="9" fill="#13263A" />
            <text x={p.x + 54} y={p.y + 1} textAnchor="middle" dominantBaseline="middle"
              fontSize="8" fill="#80E4AA" fontFamily="sans-serif" fontWeight="600">Revenue alignment</text>
          </>
        );
      })()}
    </svg>
  );
}

function TerminalIllustration() {
  const steps = ['Step 1','Step 2','Step 3','Step 4','Step 5','Step 6','Step 7'];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Left panel - light mint */}
      <rect x="8" y="8" width="118" height="184" rx="8" fill="#e8f5f0" />
      {steps.map((s, i) => {
        const active = i === 3;
        return (
          <g key={i}>
            <rect x="14" y={22 + i * 24} width="106" height="18" rx="4"
              fill={active ? '#80E4AA' : 'transparent'} />
            <text x="26" y={22 + i * 24 + 10} fontSize="8.5" fill={active ? '#0a6640' : '#7a9bac'}
              fontFamily="sans-serif" fontWeight={active ? '700' : '400'}>{s}</text>
            {active && (
              <text x="82" y={22 + i * 24 + 10} fontSize="7.5" fill="#0a6640"
                fontFamily="sans-serif" fontWeight="600">Active</text>
            )}
          </g>
        );
      })}
      {/* Right panel - dark navy */}
      <rect x="136" y="8" width="176" height="184" rx="8" fill="#0b1929" />
      {/* Chart line */}
      <polyline
        points="148,170 166,155 184,148 202,138 220,122 238,108 256,90 274,72 292,52"
        stroke="#80E4AA" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Area fill */}
      <polygon
        points="148,170 166,155 184,148 202,138 220,122 238,108 256,90 274,72 292,52 292,180 148,180"
        fill="#80E4AA" fillOpacity="0.07" />
      {/* Dot */}
      <circle cx="274" cy="72" r="4" fill="#80E4AA" />
      <circle cx="274" cy="72" r="7" fill="#80E4AA" fillOpacity="0.2" />
      {/* Grid lines */}
      {[40,80,120,160].map((y, i) => (
        <line key={i} x1="148" y1={y + 20} x2="300" y2={y + 20} stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.8" />
      ))}
    </svg>
  );
}

function StackIllustration() {
  const layers = [
    { label: 'Security', y: 30, highlight: false },
    { label: 'Alignment', y: 62, highlight: false },
    { label: 'Integration', y: 94, highlight: false },
    { label: 'Quality & handover', y: 126, highlight: true },
    { label: 'Engineering discipline', y: 158, highlight: false },
    { label: 'Infrastructure', y: 190, highlight: false },
  ];

  // Isometric layer helper
  const iso = (y: number, highlight: boolean) => {
    const top = y;
    const h = 26;
    const w = 200;
    const skewX = 30;
    const skewY = 12;
    const fillColor = highlight ? '#80E4AA' : '#1a3a52';
    const strokeColor = highlight ? '#80E4AA' : '#2d5a7a';

    // Top face (parallelogram)
    const topFace = `M${60},${top} L${60 + w * 0.7},${top - skewY} L${60 + w * 0.7 + skewX},${top - skewY + 10} L${60 + skewX},${top + 10}Z`;
    // Front face
    const frontFace = `M${60 + skewX},${top + 10} L${60 + w * 0.7 + skewX},${top - skewY + 10} L${60 + w * 0.7 + skewX},${top - skewY + 10 + h} L${60 + skewX},${top + 10 + h}Z`;

    return { topFace, frontFace, fillColor, strokeColor, highlight, top, skewX, w, skewY, h };
  };

  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dark background */}
      <rect width="320" height="240" fill="#0b1929" rx="0" />
      {layers.map((layer, i) => {
        const { topFace, frontFace, fillColor, strokeColor, highlight, top, skewX, w, skewY, h } = iso(layer.y, layer.highlight);
        return (
          <g key={i}>
            <path d={frontFace} fill={fillColor} fillOpacity={highlight ? 0.3 : 0.15} stroke={strokeColor} strokeWidth="0.8" />
            <path d={topFace} fill={fillColor} fillOpacity={highlight ? 0.5 : 0.2} stroke={strokeColor} strokeWidth="0.8" />
            <text
              x={60 + skewX + (w * 0.7) / 2}
              y={top + 4}
              textAnchor="middle"
              fontSize={highlight ? '8.5' : '7.5'}
              fill={highlight ? '#80E4AA' : '#7ec8e3'}
              fontFamily="sans-serif"
              fontWeight={highlight ? '700' : '400'}
            >
              {layer.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LedgerIllustration() {
  const rows = [
    { label: 'Discovery sprint', amount: '$4,200', done: true },
    { label: 'API integration', amount: '$6,800', done: true },
    { label: 'QA & handover', amount: '$3,100', done: false },
    { label: 'Change request #1', amount: '$0', done: false, flagged: true },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="20" y="14" width="280" height="118" rx="10" fill="#ffffff" stroke="#dce8ec" strokeWidth="1" />
      <line x1="20" y1="42" x2="300" y2="42" stroke="#e2ecef" strokeWidth="1" />
      <text x="34" y="30" fontSize="9" fontWeight="700" fill="#13263A" fontFamily="sans-serif">Milestone ledger</text>
      {rows.map((row, i) => {
        const y = 56 + i * 22;
        return (
          <g key={i}>
            <circle cx="38" cy={y} r="4.5" fill={row.flagged ? '#fcd34d' : row.done ? '#80E4AA' : '#dce8ec'} />
            {row.done && !row.flagged && (
              <path d={`M35,${y} l2,2 l4,-5`} stroke="#0a6640" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <text x="52" y={y + 3} fontSize="8.5" fill="#3a5060" fontFamily="sans-serif">{row.label}</text>
            <text x="288" y={y + 3} fontSize="8.5" fontWeight="600" textAnchor="end"
              fill={row.flagged ? '#b88a00' : '#13263A'} fontFamily="sans-serif">{row.amount}</text>
            {row.flagged && (
              <rect x="190" y={y - 8} width="92" height="15" rx="7.5" fill="#fdf3d7" />
            )}
            {row.flagged && (
              <text x="236" y={y + 3} fontSize="7" fontWeight="600" textAnchor="middle"
                fill="#b88a00" fontFamily="sans-serif">Needs approval</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function WebIllustration() {
  // Central node with surrounding connected nodes representing full-stack continuity
  const center = { x: 160, y: 100 };
  const nodes = [
    { x: 60, y: 50, label: 'UI' },
    { x: 60, y: 150, label: 'APIs' },
    { x: 160, y: 30, label: 'Data' },
    { x: 260, y: 50, label: 'Automation' },
    { x: 260, y: 150, label: 'Docs' },
    { x: 160, y: 170, label: 'Infra' },
  ];
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {nodes.map((n, i) => (
        <line key={i} x1={center.x} y1={center.y} x2={n.x} y2={n.y} stroke="#80E4AA" strokeWidth="1.2" strokeOpacity="0.5" />
      ))}
      {/* connect adjacent outer nodes lightly */}
      {nodes.map((n, i) => {
        const next = nodes[(i + 1) % nodes.length];
        return <line key={`o${i}`} x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#b0cdd8" strokeWidth="0.8" strokeOpacity="0.4" />;
      })}
      {/* outer nodes */}
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="14" fill="#ffffff" stroke="#80E4AA" strokeWidth="1.3" />
          <text x={n.x} y={n.y + 3} fontSize="7" textAnchor="middle" fill="#13263A" fontFamily="sans-serif" fontWeight="600">{n.label}</text>
        </g>
      ))}
      {/* center node */}
      <circle cx={center.x} cy={center.y} r="22" fill="#80E4AA" fillOpacity="0.15" stroke="#80E4AA" strokeWidth="1.5" />
      <circle cx={center.x} cy={center.y} r="9" fill="#80E4AA" />
      <text x={center.x} y={center.y + 36} fontSize="8" textAnchor="middle" fill="#4a6070" fontFamily="sans-serif">One partner</text>
    </svg>
  );
}

// ─── Tooltip ──────────────────────────────────────────────────────────────────
function Tooltip({
  pillar,
  position = 'bottom-left',
}: {
  pillar: { n: string; label: string };
  desc: string;
  position?: 'bottom-left' | 'top-right' | 'bottom-right';
}) {
  const posClass =
    position === 'bottom-left' ? 'bottom-4 left-4' :
    position === 'top-right' ? 'top-4 right-4' :
    'bottom-4 right-4';

  return (
    <div className={`absolute ${posClass} max-w-[160px] rounded-xl bg-white p-3 shadow-[0_4px_20px_-4px_rgba(19,38,58,0.18)] border border-[#e2ecef]`}>
      <p className="mb-1 font-mono text-xs font-semibold tracking-widest text-[#80E4AA]">
        Pillar {pillar.n}
      </p>
      <p className="text-sm font-bold leading-tight text-[#13263A]">{pillar.label}</p>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function BenefitCard({
  card,
  delay,
}: {
  card: typeof CARDS[number];
  delay: number;
}) {
  const { ref, isInView } = useAnimatedSection();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col rounded-2xl bg-white shadow-[0_4px_24px_-8px_rgba(19,38,58,0.1)] border border-[#e2ecef] overflow-hidden"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-sm font-bold leading-tight text-[#13263A]">{card.title}</p>
        <p className="text-xs text-[#4a6070] mt-0.5">{card.concept}</p>
      </div>

      {/* Illustration area */}
      <div
        className="relative mx-3 rounded-xl overflow-hidden flex-1"
        style={{
          minHeight: 200,
          background: card.illustration === 'stack' || card.illustration === 'terminal' ? '#0b1929' : '#f0f7f9',
        }}
      >
        {card.illustration === 'engine' && <EngineIllustration />}
        {card.illustration === 'radar' && <RadarIllustration />}
        {card.illustration === 'terminal' && <TerminalIllustration />}
        {card.illustration === 'stack' && <StackIllustration />}
        {card.illustration === 'ledger' && <LedgerIllustration />}
        {card.illustration === 'web' && <WebIllustration />}

        <Tooltip
          pillar={card.pillar}
          desc={''}
          position={
            card.illustration === 'terminal' ? 'top-right' :
            card.illustration === 'stack' ? 'bottom-right' :
            'bottom-left'
          }
        />
      </div>

      {/* Bottom padding */}
      <div className="h-4" />
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const BenefitsSection = () => {
  const { ref, isInView } = useAnimatedSection();

  return (
    <SiteSection
      ref={ref}
      id="benefits"
      variant="muted"
      aria-labelledby="benefits-heading"
      className="bg-[#E1EBF0]"
    >
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#6CD99C]">
            Benefits
          </p>
          <h2
            id="benefits-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-[#13263A] sm:text-5xl"
          >
            Why teams choose{' '}
            <span className="text-[#6CD99C]">technology-first growth</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#475569]">
            Clear scope, disciplined engineering, marketing and ops alignment, and
            communication leadership can audit—so pipeline, efficiency, and delivery
            stay aligned from kickoff to handover.
          </p>
        </motion.div>

        {/* 6-card grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CARDS.map((card, i) => (
            <BenefitCard key={card.concept} card={card} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </SiteSection>
  );
};