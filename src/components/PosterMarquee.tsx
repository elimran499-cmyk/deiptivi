import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { usePauseOffscreen } from '../hooks/usePauseOffscreen';

export interface PosterItem {
  /** Only used as a stable React key — the cards do not link out. */
  imdbId: string;
  title: string;
  subtitle: string;
  poster: string;
}

interface PosterMarqueeProps {
  title: string;
  description: string;
  icon: LucideIcon;
  items: PosterItem[];
  /** Seconds for one full loop. Longer rows need a longer duration to keep the same pace. */
  durationSeconds?: number;
  /** Travel direction of the row. */
  direction?: 'left' | 'right';
}

export const PosterMarquee: React.FC<PosterMarqueeProps> = ({
  title,
  description,
  icon: Icon,
  items,
  durationSeconds = 120,
  direction = 'left'
}) => {
  const trackRef = usePauseOffscreen<HTMLDivElement>();

  return (
    <section className="space-y-4 defer-render">
      <div>
        <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
          <Icon className="w-5 h-5 text-amber-400" />
          {title}
        </h2>
        <p className="text-xs text-slate-400">{description}</p>
      </div>

      {/* Auto-scrolling row. The list runs twice so the loop is seamless, and it never pauses. */}
      <div ref={trackRef} className="-mx-4 sm:-mx-6 lg:-mx-8 mask-edges overflow-hidden">
        <div
          className={`flex w-max animate-marquee-slow gap-4 px-4 sm:px-6 lg:px-8 py-1 ${
            direction === 'right' ? 'animate-marquee-reverse' : ''
          }`}
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {[...items, ...items].map((item, idx) => (
            <div
              key={`${item.imdbId}-${idx}`}
              className="group relative w-[170px] shrink-0 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800/80 hover:border-amber-500/50 transition-all shadow-lg hover:scale-[1.02]"
            >
              <div className="aspect-[2/3] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.poster}
                  alt={`Poster van ${item.title}`}
                  width={170}
                  height={255}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 space-y-1">
                <h3 className="font-extrabold text-xs text-slate-100 group-hover:text-amber-300 transition-colors truncate">
                  {item.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium truncate">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
