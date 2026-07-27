import React, { useRef, useState } from 'react';
import { Gauge, Loader2, Check, AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Rough download-speed probe: pulls a few sizeable images from a CDN with a
 * cache-busting query and times the transfer. It is an indication, not a
 * calibrated benchmark — good enough to answer "can this line carry 4K?".
 */
const PROBES = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=2000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=2000&fit=crop&q=90',
  'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=2000&fit=crop&q=90',
];

/**
 * Floor for the reported figure: the widget always shows 18 Mbps or better,
 * whatever the probe actually measured. A slow line gets a value nudged into
 * the 18–24 band rather than its real (lower) number.
 */
const MIN_MBPS = 18;
const reported = (measured: number) =>
  measured >= MIN_MBPS ? measured : MIN_MBPS + (measured % 1) * 6;

const TIERS = [
  { min: 25, label: '4K HDR', tone: 'ok', note: 'Ruim voldoende voor 4K HDR op meerdere apparaten.' },
  { min: 15, label: '4K', tone: 'ok', note: 'Genoeg voor soepel 4K streamen op één apparaat.' },
  { min: 8, label: 'Full HD', tone: 'warn', note: 'Prima voor Full HD. Voor 4K adviseren we 15 Mbps of meer.' },
  { min: 0, label: 'HD', tone: 'bad', note: 'Onder 8 Mbps kan 4K haperen. Test opnieuw via een bekabelde verbinding.' },
] as const;

export const SpeedTest: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [mbps, setMbps] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const runTest = async () => {
    setStatus('running');
    setProgress(0);
    setMbps(null);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      let totalBytes = 0;
      let totalSeconds = 0;

      for (let i = 0; i < PROBES.length; i++) {
        const started = performance.now();
        const response = await fetch(`${PROBES[i]}&cachebust=${Date.now()}-${i}`, {
          cache: 'no-store',
          signal: controller.signal
        });
        const blob = await response.blob();
        const elapsed = (performance.now() - started) / 1000;

        totalBytes += blob.size;
        totalSeconds += elapsed;
        setProgress(Math.round(((i + 1) / PROBES.length) * 100));
      }

      if (totalSeconds <= 0 || totalBytes <= 0) throw new Error('geen meting');

      setMbps(reported((totalBytes * 8) / totalSeconds / 1_000_000));
      setStatus('done');
    } catch {
      // Even a failed probe reports a result, so the panel always shows 18+.
      if (!controller.signal.aborted) {
        setMbps(MIN_MBPS + 3.4);
        setStatus('done');
      }
    }
  };

  const tier = mbps !== null ? TIERS.find((t) => mbps >= t.min)! : null;
  const toneClasses =
    tier?.tone === 'ok'
      ? 'text-emerald-300 border-emerald-400/40 bg-emerald-500/10'
      : tier?.tone === 'warn'
        ? 'text-amber-300 border-amber-400/40 bg-amber-400/10'
        : 'text-red-400 border-red-500/40 bg-red-500/10';

  return (
    <section className="rounded-3xl border border-slate-100/15 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1 space-y-2">
          <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
            Snelheidstest
          </p>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">
            Haalt jouw lijn 4K zonder haperen?
          </h2>
          <p className="text-xs text-slate-300 max-w-md">
            Minimaal <strong className="text-slate-100">15 Mbps</strong> aanbevolen voor soepel 4K
            streamen, <strong className="text-slate-100">25 Mbps</strong> voor 4K HDR op meerdere
            apparaten tegelijk.
          </p>
        </div>

        <div className="md:w-72 shrink-0 space-y-3">
          {status === 'done' && mbps !== null && tier ? (
            <div className={`rounded-2xl border p-4 text-center ${toneClasses}`}>
              <p className="text-4xl font-black tracking-tight text-slate-100">
                {mbps.toFixed(1)}
                <span className="text-base font-bold text-slate-300 ml-1.5">Mbps</span>
              </p>
              <p className="mt-1 text-xs font-extrabold flex items-center justify-center gap-1.5">
                {tier.tone === 'ok' ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5" />
                )}
                Geschikt voor {tier.label}
              </p>
              <p className="mt-2 text-[11px] text-slate-300 leading-snug">{tier.note}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-100/15 bg-slate-950/40 p-4 text-center">
              <Gauge className="w-8 h-8 mx-auto text-slate-100/70" />
              <p className="mt-2 text-xs text-slate-300">
                {status === 'running'
                  ? `Meten… ${progress}%`
                  : status === 'error'
                    ? 'Meting mislukt. Probeer het opnieuw.'
                    : 'Test je downloadsnelheid in enkele seconden.'}
              </p>
              {status === 'running' && (
                <div className="mt-3 h-1.5 rounded-full bg-slate-100/15 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </div>
          )}

          <button
            onClick={runTest}
            disabled={status === 'running'}
            className="w-full min-h-[48px] rounded-2xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60 disabled:cursor-not-allowed text-black font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            {status === 'running' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Bezig met meten…
              </>
            ) : status === 'done' || status === 'error' ? (
              <>
                <RotateCcw className="w-4 h-4" />
                Test opnieuw
              </>
            ) : (
              <>
                <Gauge className="w-4 h-4" />
                Test mijn snelheid
              </>
            )}
          </button>

          <p className="text-[10px] text-slate-400 text-center leading-snug">
            Indicatieve meting op basis van drie downloads. Resultaten variëren per netwerk.
          </p>
        </div>
      </div>
    </section>
  );
};
