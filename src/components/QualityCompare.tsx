import React, { useCallback, useRef, useState } from 'react';
import { MoveHorizontal, Sparkles } from 'lucide-react';

const IMAGE =
  'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=1200&auto=format&fit=crop&q=80';

/**
 * Split-screen slider: the same frame rendered as a soft, low-bitrate SD feed
 * on the left and as a clean 4K HDR feed on the right. The "SD" side is the
 * same image degraded in CSS, so there is only one download.
 */
export const QualityCompare: React.FC = () => {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const pct = ((clientX - box.left) / box.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    draggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Zie het verschil: SD tegenover 4K HDR
        </h2>
        <p className="text-xs text-slate-400">
          Sleep de knop om dezelfde wedstrijd in beide kwaliteiten te vergelijken
        </p>
      </div>

      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/15 select-none cursor-ew-resize touch-none bg-slate-950"
      >
        {/* 4K HDR — the clean frame underneath */}
        <img
          src={IMAGE}
          alt="Dezelfde uitzending in 4K HDR"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover saturate-125 contrast-110"
          draggable={false}
        />

        {/* SD — the same frame, degraded, clipped to the left of the handle */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={IMAGE}
            alt="Dezelfde uitzending in SD-kwaliteit"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover blur-[2.5px] saturate-50 brightness-90 contrast-90 scale-[1.02]"
            draggable={false}
          />
          {/* Coarse block pattern, standing in for compression artefacts */}
          <div
            className="absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(rgba(0,0,0,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.35) 1px, transparent 1px)',
              backgroundSize: '10px 10px'
            }}
          />
        </div>

        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 text-slate-300 border border-white/20 backdrop-blur-md">
          SD 576p · andere providers
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-black/70 text-amber-300 border border-amber-400/40 backdrop-blur-md">
          4K HDR · Deiptivi
        </span>

        {/* Handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white/90 pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center shadow-xl">
            <MoveHorizontal className="w-5 h-5" />
          </span>
        </div>
      </div>
    </section>
  );
};
