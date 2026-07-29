import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, Star, Sparkles, Zap } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { FEATURED_FILMS } from '../data/mockData';
import { whatsappLink } from '../data/contact';
import { usePauseOffscreen } from '../hooks/usePauseOffscreen';

// Broadcaster logos for the wall below the hero. Image only — no names.
const LOGO_WALL = [
  {
    name: 'HBO',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/HBO_logo.svg/1280px-HBO_logo.svg.png',
  },
  { name: 'Ziggo Sport', src: 'https://www.iptvtotaal.digital/assets/channels/ziggo-sport.png' },
  { name: 'DAZN', src: 'https://www.iptvtotaal.digital/assets/channels/dazn.png' },
  { name: 'Viaplay', src: 'https://www.iptvtotaal.digital/assets/channels/viaplay.png' },
  { name: 'ESPN', src: 'https://www.iptvtotaal.digital/assets/channels/espn.png' },
  { name: 'Eurosport', src: 'https://www.iptvtotaal.digital/assets/channels/eurosport.png' },
];

// The marquee loops by translating -50%, so the first half has to be wider than
// the viewport or the row runs dry and the loop shows a gap. Six tiles is only
// ~1100px, so repeat the set until one half covers the widest screens, then
// duplicate that half for the seam.
const WALL_REPEAT = 3;
const LOGO_WALL_LOOP = Array.from({ length: WALL_REPEAT * 2 }, () => LOGO_WALL).flat();

// Keep the perceived speed constant now that the row travels much further:
// ~25px/s over WALL_REPEAT copies of a ~1116px set.
const WALL_DURATION = `${Math.round((WALL_REPEAT * 1116) / 25)}s`;

interface HeroBannerProps {
  onGoToPackages: () => void;
}

const films = FEATURED_FILMS;

export const HeroBanner: React.FC<HeroBannerProps> = ({ onGoToPackages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wallRef = usePauseOffscreen<HTMLDivElement>();

  // Auto rotate hero carousel every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % films.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentFilm = films[currentIndex];

  return (
    <section className="relative -mx-4 sm:-mx-6 lg:-mx-8 -mt-4 sm:-mt-6 lg:-mt-8 overflow-hidden group">
      {/* Backdrop: a real still from the featured film, with scrims layered over
          it so the copy stays readable whatever the frame looks like. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          key={currentFilm.imdbId}
          src={currentFilm.backdrop}
          srcSet={`${currentFilm.backdrop.replace('UX1600', 'UX960')} 960w, ${currentFilm.backdrop} 1600w`}
          sizes="100vw"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center animate-fadeIn"
        />
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        {/* Electric Violet wash — the highlight accent, used as a gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(122,4,235,0.45),transparent_60%)]"></div>
      </div>

      {/* Carousel Left/Right Buttons */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 + films.length) % films.length)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
          title="Vorige uitgelicht"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % films.length)}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer"
          title="Volgende uitgelicht"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Centered Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-10 sm:pt-16 pb-8 flex flex-col items-center text-center">
        {/* Promo pill — points at the packages rather than a single channel */}
        <button
          onClick={onGoToPackages}
          className="flex items-center rounded-full border border-white/30 hover:border-white/50 text-white text-[13px] transition-colors cursor-pointer group/pill"
        >
          <span className="flex items-center gap-2 pl-3.5 pr-3 py-1.5 border-r border-white/30 font-bold text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            Nu 50% korting
          </span>
          <span className="flex items-center gap-2 pl-3 pr-3.5 py-1.5 text-white/85 group-hover/pill:text-white">
            12+3 maanden vanaf &euro;69,99
            <ArrowRight className="w-3.5 h-3.5 group-hover/pill:translate-x-0.5 transition-transform" />
          </span>
        </button>

        {/* Headline — the promise, not the inventory count. Leads with the brand
            keyword so "deiptv" is the first thing crawlers read in the h1. */}
        <h1 className="mt-8 font-display font-extrabold text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl text-balance">
          Deiptivi — nul buffering. 99,9% uptime.
        </h1>
        <p className="mt-5 font-display font-medium text-lg sm:text-2xl text-white/90 leading-snug max-w-3xl text-balance">
          Deiptivi (deiptv) geeft je 4K live sport, +80.000 zenders en 200.000 films &amp; series — direct
          actief, op al je apparaten.
        </p>

        {/* Currently featured film — real poster, real credits */}
        <p className="mt-8 kicker text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
          Nu uitgelicht
        </p>

        <div className="mt-3 max-w-2xl">
          <div>
            <p className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-lg">
              {currentFilm.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-slate-300">
              <span className="flex items-center gap-1 font-bold text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                {currentFilm.rating.toFixed(1)}
              </span>
              <span className="w-px h-3 bg-white/25"></span>
              <span>{currentFilm.year}</span>
              <span className="w-px h-3 bg-white/25"></span>
              <span>{currentFilm.duration}</span>
              <span className="w-px h-3 bg-white/25"></span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-400/15 text-cyan-400 text-[11px] font-bold">
                4K
              </span>
            </div>
            <p className="mt-2 text-[13px] text-slate-300">
              {currentFilm.genres.join(' · ')}
            </p>
            <p className="mt-1.5 text-[13px] text-slate-300">
              Regie: <span className="text-white">{currentFilm.director}</span> · Met{' '}
              <span className="text-white">{currentFilm.cast.join(', ')}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onGoToPackages}
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-[15px] flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4" />
            Bekijk pakketten
          </button>

          <a
            href={whatsappLink('Hallo! Ik heb een vraag over Deiptivi.')}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-lg border border-white/40 hover:border-white/70 hover:bg-white/10 text-white font-medium text-[15px] flex items-center gap-2 transition-all"
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
            Vraag advies via WhatsApp
          </a>
        </div>

        {/* Carousel Indicators Dots */}
        <div className="mt-7 flex items-center justify-center gap-1.5">
          {films.map((m, idx) => (
            <button
              key={m.imdbId}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
              }`}
              title={m.title}
            />
          ))}
        </div>
      </div>

      {/* Broadcaster wall — logo tiles on a scrolling row */}
      <div id="zenders" className="relative z-10 pb-10 scroll-mt-24">
        <div className="px-4 sm:px-6 lg:px-8">
          <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">
            Live tv
          </p>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Al je favoriete zenders
          </h2>
        </div>

        <div ref={wallRef} className="mt-6 mask-edges overflow-hidden">
          <div
            className="flex w-max animate-marquee items-center gap-4"
            style={{ animationDuration: WALL_DURATION }}
          >
            {LOGO_WALL_LOOP.map((logo, idx) => (
              <div
                key={`${logo.name}-${idx}`}
                className="w-[170px] h-[70px] shrink-0 rounded-2xl bg-white/70 hover:bg-white/90 flex items-center justify-center px-5 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_28px_-6px_rgba(255,255,255,0.75)]"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  width={150}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="max-h-9 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
