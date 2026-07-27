import React from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { whatsappLink } from '../data/contact';

interface FaqProps {
  onOpenSpeedTest?: () => void;
}

/** Plain strings, not nodes — the same list feeds the FAQPage structured data below. */
const QUESTIONS: { q: string; a: string }[] = [
  {
    q: 'Wat is Deiptivi (deiptv)?',
    a: 'Deiptivi — ook wel deiptv genoemd — is een premium IPTV-dienst voor Nederland en België op deiptivi.com: 4K live sport, meer dan 80.000 zenders en 200.000 films en series op al je apparaten, zonder contract.'
  },
  {
    q: 'Hoe bestel ik een deiptv abonnement?',
    a: 'Kies je pakket op deiptivi.com en stuur je keuze via WhatsApp. Je krijgt een bevestiging met de prijs, betaalt eenmalig en ontvangt je deiptv-gegevens meteen daarna.'
  },
  {
    q: 'Hoe snel is mijn abonnement actief?',
    a: 'Meestal binnen vijf minuten na je betaling. Je krijgt je gegevens en een korte installatie-uitleg via WhatsApp, afgestemd op het apparaat dat je gebruikt.'
  },
  {
    q: 'Op welke apparaten werkt Deiptivi?',
    a: 'Deiptivi werkt op smart-tv (Samsung, LG, Android TV), Amazon Fire Stick, Apple TV, telefoon en tablet (iOS en Android), Windows en Mac, en losse IPTV-boxen. Je kunt op zoveel apparaten installeren als je wilt — het aantal dat je tegelijk kunt gebruiken bepaal je met je pakket.'
  },
  {
    q: 'Kan ik op meerdere apparaten tegelijk kijken?',
    a: 'Ja. Bij het bestellen kies je voor 1 tot 4 gelijktijdige schermen. Wil je later uitbreiden, dan kan dat tussentijds.'
  },
  {
    q: 'Welke internetsnelheid heb ik nodig?',
    a: 'Vanaf 15 Mbps voor soepel 4K op één scherm, en 25 Mbps of meer voor 4K HDR op meerdere schermen tegelijk. Twijfel je? Doe de snelheidstest op deze site.'
  },
  {
    q: 'Heb ik een VPN nodig?',
    a: 'Niet per se. Bij het Premium VIP-pakket is een VPN inbegrepen; bij Basis niet. Werkt je provider traag op bepaalde momenten, dan helpt een VPN vaak.'
  },
  {
    q: 'Wat als een zender het niet doet?',
    a: 'Meld het via WhatsApp. Support is 24/7 bereikbaar en de meeste storingen zijn binnen enkele minuten opgelost.'
  },
  {
    q: 'Hoe betaal ik en wordt er automatisch verlengd?',
    a: 'Je betaalt eenmalig voor de gekozen periode via iDEAL, Bancontact, PayPal, creditcard of bankoverschrijving. Er is geen abonnement en geen automatische incasso — na afloop stopt het vanzelf.'
  },
  {
    q: 'Kan ik mijn geld terugkrijgen?',
    a: 'Ja, binnen 14 dagen na aankoop. Werkt het niet naar behoren en komen we er samen niet uit, dan krijg je je geld terug.'
  }
];

export const Faq: React.FC<FaqProps> = ({ onOpenSpeedTest }) => (
  <section className="space-y-6 defer-render">
    <div className="text-center space-y-1">
      <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">
        Veelgestelde vragen
      </p>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
        Deiptivi — alles wat je wilt weten voor je bestelt
      </h2>
    </div>

    {/* FAQPage structured data, generated from the list above so the two never drift. */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: QUESTIONS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a }
          }))
        })
      }}
    />

    <div className="max-w-3xl mx-auto space-y-2.5">
      {QUESTIONS.map((item) => (
        <details
          key={item.q}
          className="group rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden"
        >
          <summary className="flex items-center justify-between gap-4 p-4 sm:p-5 cursor-pointer list-none min-h-[56px] text-sm font-bold text-slate-100 marker:hidden">
            <span className="flex items-start gap-3">
              <HelpCircle className="w-4 h-4 mt-0.5 text-cyan-400 shrink-0" />
              {item.q}
            </span>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-4 sm:px-5 pb-5 pl-11 sm:pl-12 text-xs text-slate-400 leading-relaxed">
            {item.a}
            {item.q.startsWith('Welke internetsnelheid') && onOpenSpeedTest && (
              <button
                onClick={onOpenSpeedTest}
                className="ml-1.5 font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 cursor-pointer"
              >
                Test je snelheid
              </button>
            )}
          </p>
        </details>
      ))}
    </div>

    <p className="text-center text-xs text-slate-400">
      Staat je vraag er niet bij?{' '}
      <a
        href={whatsappLink('Hallo! Ik heb nog een vraag over Deiptivi.')}
        target="_blank"
        rel="noreferrer"
        className="font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
        Vraag het via WhatsApp
      </a>
    </p>
  </section>
);
