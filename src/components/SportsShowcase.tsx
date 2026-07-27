import React from 'react';
import {
  Goal,
  Flag,
  Volleyball,
  CircleDot,
  Bike,
  Target,
  Swords,
  Gauge,
  Trophy,
  Snowflake,
  Shield,
  Medal
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

export interface Sport {
  name: string;
  icon: LucideIcon;
  competitions: string[];
  channels: string;
  /** Every photo was checked by eye against its sport before being used here. */
  image: string;
}

// Sized for the card, not the source: 640px covers the 240px home tile at 2x
// and the ~400px page card at 1.6x.
const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=640&auto=format&fit=crop&q=75`;

const SPORTS: Sport[] = [
  {
    name: 'Voetbal',
    icon: Goal,
    competitions: ['Eredivisie', 'Champions League', 'Premier League', 'LaLiga', 'Serie A', 'EK & WK'],
    channels: 'ESPN 1 NL · Ziggo Sport · Viaplay',
    image: unsplash('photo-1552667466-07770ae110d0')
  },
  {
    name: 'Formule 1',
    icon: Flag,
    competitions: ['Alle Grands Prix', 'Kwalificaties', 'Sprintraces', 'Dutch GP Zandvoort'],
    channels: 'Viaplay Sport 1 4K',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/FIA_F1_Austria_2023_Nr._21_%281%29.jpg/960px-FIA_F1_Austria_2023_Nr._21_%281%29.jpg'
  },
  {
    name: 'Basketbal',
    icon: Volleyball,
    competitions: ['NBA', 'EuroLeague', 'BNXT League'],
    channels: 'Ziggo Sport · ESPN',
    image: unsplash('photo-1546519638-68e109498ffc')
  },
  {
    name: 'Tennis',
    icon: CircleDot,
    competitions: ['Wimbledon', 'Roland Garros', 'US & Australian Open', 'ATP & WTA Tour'],
    channels: 'Ziggo Sport · Eurosport',
    image: unsplash('photo-1554068865-24cecd4e34b8')
  },
  {
    name: 'Wielrennen',
    icon: Bike,
    competitions: ['Tour de France', 'Giro d’Italia', 'Vuelta', 'Amstel Gold Race'],
    channels: 'Eurosport 1 NL 4K',
    image: unsplash('photo-1541625602330-2277a4c46182')
  },
  {
    name: 'Darts',
    icon: Target,
    competitions: ['PDC World Championship', 'Premier League Darts', 'World Matchplay'],
    channels: 'Viaplay Sport',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Darts_in_a_dartboard.jpg/960px-Darts_in_a_dartboard.jpg'
  },
  {
    name: 'Vechtsport',
    icon: Swords,
    competitions: ['UFC', 'Glory Kickboxing', 'Boks-PPV'],
    channels: 'ESPN 1 NL · PPV inbegrepen',
    image: unsplash('photo-1549719386-74dfcbf7dbed')
  },
  {
    name: 'Motorsport',
    icon: Gauge,
    competitions: ['MotoGP', 'Formule E', 'WRC', '24 uur van Le Mans'],
    channels: 'Eurosport · Ziggo Sport',
    image: unsplash('photo-1558981403-c5f9899a28bc')
  },
  {
    name: 'Golf',
    icon: Trophy,
    competitions: ['The Masters', 'PGA Tour', 'Ryder Cup', 'The Open'],
    channels: 'Ziggo Sport Golf',
    image: unsplash('photo-1535131749006-b7f58c99034b')
  },
  {
    name: 'Schaatsen',
    icon: Snowflake,
    competitions: ['WK Afstanden', 'ISU World Cup', 'EK Allround'],
    channels: 'NOS · Eurosport',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Langebaan_wedstrijden_vrouwen_in_Beesterzwaag%2C_Jantje_Venema_Tienkamp%2C_Bestanddeelnr_914-5792.jpg/960px-Langebaan_wedstrijden_vrouwen_in_Beesterzwaag%2C_Jantje_Venema_Tienkamp%2C_Bestanddeelnr_914-5792.jpg'
  },
  {
    name: 'NFL & honkbal',
    icon: Shield,
    competitions: ['NFL Sunday', 'Super Bowl', 'MLB'],
    channels: 'ESPN 1 NL',
    image: unsplash('photo-1566577739112-5180d4bf9390')
  },
  {
    name: 'Hockey & handbal',
    icon: Medal,
    competitions: ['Hoofdklasse', 'EK & WK hockey', 'Handbal Champions League'],
    channels: 'Ziggo Sport · Eurosport',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Field_hockey.jpg'
  }
];

export const SPORTS_LIST = SPORTS;

export const SportsShowcase: React.FC = () => (
  <div className="space-y-8 animate-fadeIn">
    <div className="text-center space-y-2 max-w-2xl mx-auto">
      <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">Sport</p>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight">
        Elke wedstrijd die telt, live in 4K
      </h1>
      <p className="text-sm text-slate-400">
        Van de Eredivisie tot de Super Bowl — alle grote competities zitten in je abonnement,
        inclusief pay-per-view events zonder meerprijs.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {SPORTS.map((sport) => (
        <div
          key={sport.name}
          className="rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden flex flex-col"
        >
          <div className="relative h-36 overflow-hidden">
            <img
              src={sport.image}
              alt={sport.name}
              width={640}
              height={360}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
            <div className="absolute bottom-3 left-4 flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-black shrink-0">
                <sport.icon className="w-4.5 h-4.5" />
              </span>
              <h2 className="text-lg font-black text-white tracking-tight drop-shadow">{sport.name}</h2>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-3 flex-1">

          <ul className="flex flex-wrap gap-1.5">
            {sport.competitions.map((c) => (
              <li
                key={c}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-850 text-slate-300 border border-slate-800"
              >
                {c}
              </li>
            ))}
          </ul>

            <p className="mt-auto pt-1 text-[11px] text-slate-500 font-medium">{sport.channels}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8 text-center space-y-3">
      <h2 className="text-xl font-black text-slate-100 tracking-tight">
        Mis je een competitie?
      </h2>
      <p className="text-sm text-slate-400 max-w-xl mx-auto">
        Vraag het even en we kijken of de zender in je pakket zit. Meestal is het antwoord ja.
      </p>
      <a
        href={whatsappLink('Hallo! Zit deze competitie in het pakket: ')}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all"
      >
        <WhatsAppIcon className="w-4 h-4" />
        Vraag het via WhatsApp
      </a>
    </div>
  </div>
);
