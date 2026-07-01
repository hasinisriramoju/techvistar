import { TRUST_ITEMS } from '@/lib/constants';

const items = [...TRUST_ITEMS, ...TRUST_ITEMS]; // Double for seamless loop

export function TrustBar() {
  return (
    <section aria-label="Client industries" className="relative border-y border-white/[0.04] bg-ink-2/40 overflow-hidden py-5">
      {/* Fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10"
        style={{ background: 'linear-gradient(90deg, #0A0A0A, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10"
        style={{ background: 'linear-gradient(-90deg, #0A0A0A, transparent)' }} />

      <div className="flex items-center gap-0 overflow-hidden">
        <div className="flex items-center gap-8 animate-marquee shrink-0 pr-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-8 shrink-0">
              <span className="label-mono text-white/25 whitespace-nowrap">{item}</span>
              <span className="h-1 w-1 rounded-full bg-white/10 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
