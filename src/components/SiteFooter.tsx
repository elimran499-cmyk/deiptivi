import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface SiteFooterProps {
  onSelectPage: (page: string) => void;
}

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'sport', label: 'Sport' },
  { id: 'pakketten', label: 'Pakketten' },
  { id: 'kwaliteit', label: 'Kwaliteit' },
  { id: 'snelheid', label: 'Snelheidstest' }
];

export const SiteFooter: React.FC<SiteFooterProps> = ({ onSelectPage }) => (
  <footer className="border-t border-slate-800 bg-slate-900/60 mt-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-32 lg:pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="space-y-3">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-[19px] text-slate-100 tracking-tight">
            deiptivi<span className="text-cyan-400">.com</span>
          </span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
          Deiptivi (deiptivi.com) is premium IPTV voor Nederland en België. 4K live sport, films en
          series op al je apparaten — zonder contract.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
          Navigatie
        </h3>
        <ul className="space-y-2">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onSelectPage(l.id)}
                className="text-xs text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
          Contact
        </h3>
        <ul className="space-y-2.5 text-xs text-slate-400">
          <li>
            <a
              href={whatsappLink('Hallo! Ik heb een vraag over Deiptivi.')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-slate-100 transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              WhatsApp support
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            Support 24/7, ook in het weekend
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Servers in Amsterdam (AMS-IX)
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
          Goed om te weten
        </h3>
        <ul className="space-y-2 text-xs text-slate-400">
          <li>Eenmalige betaling, geen automatische verlenging</li>
          <li>14 dagen niet-goed-geld-terug</li>
          <li>Activatie binnen enkele minuten</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
        <p>© {new Date().getFullYear()} Deiptivi — deiptivi.com. Alle rechten voorbehouden.</p>
        <p>Betaling en activatie verlopen via WhatsApp.</p>
      </div>
    </div>
  </footer>
);
