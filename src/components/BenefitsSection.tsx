'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimatedSection } from '@/hooks/useAnimatedSection';
import { SiteSection } from '@/components/SiteSection';

// ─── Pillar data ──────────────────────────────────────────────────────────────
const PILLARS = [
  {
    n: '01', abbr: 'ED', title: 'Engineering discipline',
    desc: 'Version control, environments that mirror production, and repeatable releases—so deploys are boring in the right way.',
    color: '#00F5FF',
  },
  {
    n: '02', abbr: 'SR', title: 'Security & reliability',
    desc: 'Threat-aware design, sensible defaults, and testing matched to your risk profile, data sensitivity, and compliance needs.',
    color: '#7dd3fc',
  },
  {
    n: '03', abbr: 'RA', title: 'Revenue alignment',
    desc: "Shared truth on backlog, demos, funnel metrics, and documentation so sales, marketing, and product agree on what 'done' means.",
    color: '#c4b5fd',
  },
  {
    n: '04', abbr: 'QH', title: 'Quality & handover',
    desc: 'Test evidence, runbooks, and training so your internal team owns the system after go-live.',
    color: '#abc7ff',
  },
  {
    n: '05', abbr: 'TT', title: 'Transparent terms',
    desc: 'Effort-based or milestone billing with written assumptions—no surprise line items without prior approval.',
    color: '#fb923c',
  },
  {
    n: '06', abbr: 'FC', title: 'Full-stack continuity',
    desc: 'One partner for UI, APIs, data, automation, and docs reduces integration risk and speeds root-cause resolution.',
    color: '#abc7ff',
  },
] as const;

type Pillar = (typeof PILLARS)[number];

// ─── Panel ────────────────────────────────────────────────────────────────────
function PillarPanel({ pillar }: { pillar: Pillar | null }) {
  return (
    <div className="flex h-full min-h-[360px] w-full max-w-[440px] flex-col justify-center">
      <AnimatePresence mode="wait">
        {pillar ? (
          <motion.div
            key={pillar.n}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="rounded-2xl border border-border-subtle bg-surface-charcoal/50 backdrop-blur-xl p-10 shadow-2xl shadow-black/35"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-widest text-primary">
                Pillar {pillar.n}
              </span>
            </div>
            <div className="mt-1 mb-3 h-[3px] w-9 rounded-full" style={{ background: pillar.color }} />
            <h3 className="mb-3 text-[1.35rem] font-bold leading-snug text-white">
              {pillar.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{pillar.desc}</p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl border border-dashed border-border-subtle bg-surface-charcoal/20 p-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Click a label or face to explore each pillar
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── 3D Canvas + floating HTML labels ────────────────────────────────────────
const SIZE = 560; // canvas size in px

function Scene({ onPillarSelect }: { onPillarSelect: (i: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // One ref per label pill — we update them directly in rAF, no React state
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const stateRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    velX: 0,
    velY: 0,
    rotX: 0.3,
    rotY: 0,
    t: 0,
    animId: 0,
  });

  const sceneRef = useRef<{
    THREE: typeof import('three') | null;
    renderer: import('three').WebGLRenderer | null;
    scene: import('three').Scene | null;
    camera: import('three').PerspectiveCamera | null;
    mesh: import('three').Mesh | null;
    wire: import('three').Mesh | null;
    glow: import('three').Mesh | null;
    vertexPositions: import('three').Vector3[];
  }>({
    THREE: null,
    renderer: null,
    scene: null,
    camera: null,
    mesh: null,
    wire: null,
    glow: null,
    vertexPositions: [],
  });

  const onPillarSelectRef = useRef(onPillarSelect);
  onPillarSelectRef.current = onPillarSelect;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const animationState = stateRef.current;
    const sceneState = sceneRef.current;
    let cancelled = false;

    async function init() {
      const THREE = (await import('three')).default ?? (await import('three'));
      if (cancelled || !canvas) return;

      const s = sceneState;
      s.THREE = THREE;

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(SIZE, SIZE);
      renderer.setClearColor(0x000000, 0);
      s.renderer = renderer;

      const scene = new THREE.Scene();
      s.scene = scene;
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 0, 5.5);
      s.camera = camera;

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const d1 = new THREE.DirectionalLight(0xffffff, 1.8);
      d1.position.set(3, 4, 3);
      scene.add(d1);
      const d2 = new THREE.DirectionalLight(0xabc7ff, 1.2); // primary blue-grey
      d2.position.set(-3, -2, 2);
      scene.add(d2);
      const d3 = new THREE.DirectionalLight(0x00F5FF, 0.8); // electric teal
      d3.position.set(0, -4, -2);
      scene.add(d3);

      // Main icosahedron — glassy electric blue
      const geo = new THREE.IcosahedronGeometry(1.65, 0);
      const mat = new THREE.MeshPhongMaterial({
        color: 0x0071e3,
        emissive: 0x002c5c,
        emissiveIntensity: 0.2,
        shininess: 180,
        specular: 0xffffff,
        transparent: true,
        opacity: 0.22,
        side: THREE.DoubleSide,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      s.mesh = mesh;

      // Wireframe — electric teal edges
      const wireGeo = new THREE.IcosahedronGeometry(1.68, 0);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00F5FF,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const wire = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wire);
      s.wire = wire;




      // ── Pick 6 well-separated icosahedron vertices ────────────────────────
      const posAttr = geo.attributes.position;
      const seen = new Map<string, THREE.Vector3>();
      for (let i = 0; i < posAttr.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(posAttr, i);
        const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
        if (!seen.has(key)) seen.set(key, v);
      }
      const unique = Array.from(seen.values());
      const picked: THREE.Vector3[] = [unique[0]];
      while (picked.length < 6) {
        let best: THREE.Vector3 | null = null;
        let bestDist = -Infinity;
        for (const v of unique) {
          const minD = Math.min(...picked.map(p => p.distanceTo(v)));
          if (minD > bestDist) { bestDist = minD; best = v; }
        }
        if (best) picked.push(best);
      }
      s.vertexPositions = picked;

      // ── Animation loop — update DOM labels directly, no React setState ───
      const tmpVec = new THREE.Vector3();

      function animate() {
        const st = stateRef.current;
        st.animId = requestAnimationFrame(animate);
        st.t += 0.008;

        if (!st.isDragging) {
          st.velX *= 0.96;
          st.velY *= 0.96;
          st.rotY += 0.003 + st.velX;
          st.rotX += 0.001 + st.velY;
        }

        if (s.mesh) { s.mesh.rotation.y = st.rotY; s.mesh.rotation.x = st.rotX; }
        if (s.wire) { s.wire.rotation.y = st.rotY; s.wire.rotation.x = st.rotX; }


        // Project each vertex → canvas px → update pill DOM directly
        if (s.mesh && s.camera && s.vertexPositions.length) {
          s.vertexPositions.forEach((localPos, idx) => {
            const el = labelRefs.current[idx];
            if (!el) return;

            tmpVec.copy(localPos).applyMatrix4(s.mesh!.matrixWorld);
            const ndc = tmpVec.clone().project(s.camera!);

            const x = (ndc.x * 0.5 + 0.5) * SIZE;
            const y = (-ndc.y * 0.5 + 0.5) * SIZE;
            const depth = ndc.z; // –1 = front, +1 = back

            // Depth-based visual cues
            const t = (depth + 1) / 2;            // 0 front → 1 back
            const opacity = Math.max(0.3, 1 - t * 0.6);
            const scale = Math.max(0.8, 1 - t * 0.15);
            const zIndex = Math.round((1 - t) * 20);

            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.transform = `translate(-50%, -50%) scale(${scale})`;
            el.style.opacity = String(opacity);
            el.style.zIndex = String(zIndex);
            el.style.display = depth < 1.05 ? 'flex' : 'none';
          });
        }

        renderer.render(scene, camera);
      }
      animate();
    }

    init();
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationState.animId);
      sceneState.renderer?.dispose();
    };
  }, []);

  // ── Pointer / touch handlers ──────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const st = stateRef.current;
    st.isDragging = true; st.prevX = e.clientX; st.prevY = e.clientY;
    st.velX = 0; st.velY = 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const st = stateRef.current;
    if (!st.isDragging) return;
    const dx = e.clientX - st.prevX, dy = e.clientY - st.prevY;
    st.velX = dx * 0.012; st.velY = dy * 0.012;
    st.rotY += st.velX; st.rotX += st.velY;
    st.prevX = e.clientX; st.prevY = e.clientY;
  }, []);

  const onMouseUp = useCallback(() => { stateRef.current.isDragging = false; }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0], st = stateRef.current;
    st.isDragging = true; st.prevX = t.clientX; st.prevY = t.clientY;
    st.velX = 0; st.velY = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0], st = stateRef.current;
    if (!st.isDragging) return;
    const dx = t.clientX - st.prevX, dy = t.clientY - st.prevY;
    st.velX = dx * 0.012; st.velY = dy * 0.012;
    st.rotY += st.velX; st.rotX += st.velY;
    st.prevX = t.clientX; st.prevY = t.clientY;
  }, []);

  const onTouchEnd = useCallback(() => { stateRef.current.isDragging = false; }, []);

  const onClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const s = sceneRef.current;
    if (!s.THREE || !s.camera || !s.mesh) return;
    const THREE = s.THREE;
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const mouse = new THREE.Vector2(
      ((e.clientX - rect.left) / SIZE) * 2 - 1,
      -((e.clientY - rect.top) / SIZE) * 2 + 1,
    );
    const ray = new THREE.Raycaster();
    ray.setFromCamera(mouse, s.camera);
    const hits = ray.intersectObject(s.mesh);
    if (hits.length) {
      const normal = hits[0].face!.normal.clone().applyQuaternion(s.mesh.quaternion);
      let best = 0, bDot = -Infinity;
      s.vertexPositions.forEach((vp, i) => {
        const d = vp.clone().normalize().dot(normal);
        if (d > bDot) { bDot = d; best = i; }
      });
      if (bDot > 0.1) onPillarSelectRef.current(best);
    }
  }, []);

  return (
    <div className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
      {/* Dark background card behind the shape */}
      <div
        className="absolute inset-0 rounded-3xl bg-surface-charcoal/30 border border-border-subtle shadow-xl shadow-black/25"
      />
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        className="relative cursor-grab active:cursor-grabbing rounded-3xl"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={onClick}
      />

      {/* Floating pills — positioned by rAF via direct DOM refs */}
      {PILLARS.map((p, i) => (
        <button
          key={p.n}
          ref={el => { labelRefs.current[i] = el; }}
          onClick={() => onPillarSelectRef.current(i)}
          style={{
            position: 'absolute',
            display: 'none',           // rAF sets to 'flex' once coords arrive
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(18,20,23,0.9)',
            border: `1px solid ${p.color}99`,
            borderRadius: '999px',
            padding: '5px 12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(6px)',
            boxShadow: `0 0 10px ${p.color}22`,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, color: p.color, lineHeight: 1, fontFamily: 'monospace' }}>
            {p.title}
          </span>
        </button>
      ))}

      {/* Hint */}
      <div
        className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-mono border border-border-subtle/50 bg-background/80 text-muted-foreground"
      >
        ✦ Click &amp; drag to rotate
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export const BenefitsSection = () => {
  const { ref, isInView } = useAnimatedSection();
  const [activePillar, setActivePillar] = useState<number | null>(null);
  const pillar = activePillar !== null ? PILLARS[activePillar] : null;

  return (
    <SiteSection
      ref={ref}
      id="benefits"
      variant="muted"
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-background border-b border-border-subtle"
    >
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern-dark opacity-[0.15]" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="mb-3 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
            Benefits
          </p>
          <h2
            id="benefits-heading"
            className="mx-auto mb-4 max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl"
          >
            Why teams choose{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">technology-first growth</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Clear scope, disciplined engineering, marketing and ops alignment, and
            communication leadership can audit—so pipeline, efficiency, and delivery
            stay aligned from kickoff to handover.
          </p>
        </motion.div>

        {/* 3D stage — no background box, just the canvas floating on the page */}
        <motion.div
          className="mx-auto mb-6 flex max-w-6xl flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Scene onPillarSelect={setActivePillar} />
          <PillarPanel pillar={pillar} />
        </motion.div>
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
            "linear-gradient(to right, transparent, rgba(255,255,255,0.08) 20%, rgba(255,255,255,0.08) 80%, transparent)",
        }}
      />
    </SiteSection>
  );
};
