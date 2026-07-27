import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';
import { SPORTS_LIST } from './SportsShowcase';
import { usePauseOffscreen } from '../hooks/usePauseOffscreen';

interface SportsMarqueeProps {
  onOpenSports: () => void;
}

/** Home-page teaser for the Sport page: the same twelve sports, auto-scrolling. */
export const SportsMarquee: React.FC<SportsMarqueeProps> = ({ onOpenSports }) => {
  const trackRef = usePauseOffscreen<HTMLDivElement>();

  return (
    <section className="space-y-4 defer-render">
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-black text-slate-100 tracking-tight flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          Alle sport, live in 4K
        </h2>
        <p className="text-xs text-slate-400">
          Voetbal, Formule 1, basketbal, tennis en meer — inclusief pay-per-view events
        </p>
      </div>
      <button
        onClick={onOpenSports}
        className="text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
      >
        Bekijk alle sporten
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>

    {/* The list runs twice so the loop is seamless. */}
    <div ref={trackRef} className="-mx-4 sm:-mx-6 lg:-mx-8 mask-edges overflow-hidden">
      <div
        className="flex w-max animate-marquee-slow animate-marquee-reverse gap-4 px-4 sm:px-6 lg:px-8 py-1"
        style={{ animationDuration: '70s' }}
      >
        {[...SPORTS_LIST, ...SPORTS_LIST].map((sport, idx) => (
          <div
            key={`${sport.name}-${idx}`}
            className="relative w-[240px] h-[150px] shrink-0 rounded-2xl overflow-hidden border border-slate-800 pointer-events-none select-none"
          >
            <img
              src={sport.image}
              alt={sport.name}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
            <div className="absolute bottom-3 left-4 right-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-black shrink-0">
                  <sport.icon className="w-4 h-4" />
                </span>
                <span className="text-base font-black text-white tracking-tight drop-shadow">
                  {sport.name}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-white/75 truncate">
                {sport.competitions.slice(0, 3).join(' · ')}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};
