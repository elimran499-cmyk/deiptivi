import React, { useState } from 'react';
import { Check, Monitor, Star, Zap } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

type TierId = 'basis' | 'premium';
type DurationId = '3m' | '6m' | '15m';

const DURATIONS: { id: DurationId; label: string; months: number; badge?: string; note?: string }[] = [
  { id: '3m', label: '3 Maanden', months: 3 },
  { id: '6m', label: '6 Maanden', months: 6 },
  { id: '15m', label: '12+3 Maanden', months: 15, badge: '-50%', note: 'BESTE DEAL' },
];

const DEVICE_OPTIONS = [1, 2, 3, 4];

/** Price per tier, keyed by duration and then by device count. */
const PRICES: Record<TierId, Record<DurationId, string[]>> = {
  premium: {
    '3m': ['34,99', '49,99', '69,99', '89,99'],
    '6m': ['44,99', '79,99', '99,99', '139,99'],
    '15m': ['78,00', '124,99', '179,99', '199,99'],
  },
  basis: {
    '3m': ['24,99', '39,99', '49,99', '57,99'],
    '6m': ['34,99', '49,99', '69,99', '89,99'],
    '15m': ['49,00', '79,00', '109,00', '129,00'],
  },
};

const TIERS: Record<TierId, { name: string; label: string; features: string[] }> = {
  basis: {
    name: 'Basis Pakket',
    label: 'BASIS',
    features: [
      'SD/HD/FULL HD Kwaliteit',
      '+25.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay',
      '+140.000 Films & Series',
      'Wekelijkse Updates',
      '24/7 Support NL & BE',
      '100% Anoniem',
      'AntiFreeze Technologie',
      'Alle Apparaten',
      'Exclusieve NL & BE Content',
      'Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
  premium: {
    name: 'Premium VIP Pakket',
    label: 'PREMIUM VIP',
    features: [
      'SD/HD/FULL HD/4K/8K/HDR-VR',
      '+80.000 Kanalen + Netflix',
      'RTL, NPO, ZIGGO, SBS, ESPN, Viaplay, VTM',
      '+200.000 Films & Series',
      'Dagelijkse Updates',
      'Alle Sport PPV Events',
      'VIP 24/7 Support',
      'Enterprise Anti-Freeze PRO',
      'Persoonlijke VIP Manager',
      'Alle Apparaten',
      'VPN Inbegrepen',
      'Exclusieve VIP Content',
      'Videoland, Netflix, Amazon, HBO, Apple TV, Hulu',
    ],
  },
};

const perMonth = (price: string, months: number) =>
  (parseFloat(price.replace(',', '.')) / months).toFixed(2).replace('.', ',');

export const PricingPlans: React.FC = () => {
  const [tier, setTier] = useState<TierId>('basis');
  const [devices, setDevices] = useState(1);

  const isPremium = tier === 'premium';
  const active = TIERS[tier];
  const deviceLabel = `${devices} ${devices === 1 ? 'apparaat' : 'apparaten'}`;

  const accentText = isPremium ? 'text-amber-400' : 'text-cyan-400';
  const accentBorder = isPremium ? 'border-amber-400/40' : 'border-cyan-400/40';
  const accentChip = isPremium
    ? 'bg-amber-400/15 text-amber-400 border-amber-400/40'
    : 'bg-cyan-400/15 text-cyan-400 border-cyan-400/40';
  const accentButton = isPremium
    ? 'bg-amber-400 hover:bg-amber-300 text-black'
    : 'bg-cyan-400 hover:bg-cyan-300 text-black';

  const orderLink = (duration: string, price: string) =>
    whatsappLink(
      `Hallo! Ik wil het ${active.name} bestellen.\n\nAbonnement: ${duration}\nApparaten: ${deviceLabel}\nPrijs: €${price}`
    );

  return (
    <section id="pakketten" className="space-y-6 scroll-mt-24">
      <div className="text-center space-y-1">
        <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">Prijzen</p>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
          Eén abonnement, eindeloze mogelijkheden
        </h2>
        <p className="text-xs text-slate-400">
          Bestel direct via WhatsApp — activatie binnen enkele minuten.
        </p>
      </div>

      {/* Tier switch */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl shadow-sm">
          <button
            onClick={() => setTier('basis')}
            className={`px-5 sm:px-7 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
              !isPremium
                ? 'bg-cyan-400 text-black'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'
            }`}
          >
            Basis
          </button>
          <button
            onClick={() => setTier('premium')}
            className={`px-5 sm:px-7 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isPremium
                ? 'bg-amber-400 text-black'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Premium VIP
          </button>
        </div>
      </div>

      {/* Device switch */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl overflow-x-auto max-w-full shadow-sm">
          {DEVICE_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setDevices(n)}
              className={`px-3 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                devices === n
                  ? 'bg-indigo-500 text-slate-100'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-850'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              {n} {n === 1 ? 'Apparaat' : 'Apparaten'}
            </button>
          ))}
        </div>
      </div>

      {/* The three durations of the selected tier, side by side */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {DURATIONS.map((d) => {
          const price = PRICES[tier][d.id][devices - 1];
          const highlight = d.id === '15m';

          return (
            <div
              key={d.id}
              className={`relative rounded-2xl sm:rounded-3xl border bg-slate-900 p-4 sm:p-6 flex flex-col text-center transition-all duration-300 hover:-translate-y-1 ${
                highlight ? `${accentBorder} shadow-xl` : 'border-slate-800'
              }`}
            >
              {d.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold bg-amber-400 text-black tracking-wider whitespace-nowrap">
                  {d.note} · {d.badge}
                </span>
              )}

              <p className={`text-xs font-extrabold uppercase tracking-[0.15em] ${accentText}`}>
                {d.label}
              </p>

              <p className={`mt-2 sm:mt-3 text-3xl sm:text-4xl font-black tracking-tight ${accentText}`}>
                €{price}
              </p>
              <p className="mt-1 text-[10px] sm:text-[11px] text-slate-400 font-medium">
                ≈ €{perMonth(price, d.months)} per maand
              </p>

              <p className="mt-2 sm:mt-3 text-[10px] sm:text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                {deviceLabel} inbegrepen
              </p>

              <a
                href={orderLink(d.label, price)}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 sm:mt-6 min-h-[46px] rounded-xl sm:rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all ${accentButton}`}
              >
                {isPremium ? <Zap className="w-4 h-4" /> : <WhatsAppIcon className="w-4 h-4" />}
                {isPremium ? 'Word VIP Nu' : 'Bestel Nu'}
              </a>

              {/* Every pack carries the full tier inclusion list, so a visitor
                  never has to look elsewhere to see what they are buying. */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-800 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] font-extrabold border tracking-wider ${accentChip}`}
                  >
                    {active.label}
                  </span>
                  <h3 className="text-[13px] sm:text-sm font-black text-slate-100 tracking-tight">
                    Wat zit er in het {active.name}?
                  </h3>
                </div>

                <ul className="mt-3 space-y-1.5 sm:space-y-2.5">
                  {active.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-semibold text-slate-300"
                    >
                      <span
                        className={`mt-0.5 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border flex items-center justify-center shrink-0 ${accentChip}`}
                      >
                        <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
