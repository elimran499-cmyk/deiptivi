import React from 'react';
import { CreditCard, Zap, ShieldCheck, Headphones, RefreshCw, Activity } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

const STEPS = [
  {
    icon: WhatsAppIcon,
    title: 'Kies je pakket',
    body: 'Stuur je keuze via WhatsApp. We bevestigen direct wat je krijgt en wat het kost.'
  },
  {
    icon: CreditCard,
    title: 'Betaal veilig',
    body: 'Je ontvangt een betaalverzoek. Geen abonnement, geen automatische incasso.'
  },
  {
    icon: Zap,
    title: 'Binnen 5 minuten kijken',
    body: 'Je inloggegevens komen meteen binnen, met uitleg voor jouw apparaat.'
  }
];

const GUARANTEES = [
  {
    icon: RefreshCw,
    title: '14 dagen geld terug',
    body: 'Werkt het niet naar behoren? Dan krijg je je geld terug.'
  },
  {
    icon: Headphones,
    title: '24/7 support in het Nederlands',
    body: 'Een vraag of storing? We reageren dag en nacht via WhatsApp.'
  },
  {
    icon: Activity,
    title: '99,9% uptime',
    body: 'Servers in Amsterdam, met automatische omschakeling bij onderhoud.'
  },
  {
    icon: ShieldCheck,
    title: 'Geen contract',
    body: 'Je betaalt eenmalig voor de gekozen periode. Daarna stopt het vanzelf.'
  }
];

const PAYMENT_METHODS = ['iDEAL', 'Bancontact', 'PayPal', 'Creditcard', 'Bankoverschrijving'];

export const TrustSignals: React.FC = () => (
  <section className="space-y-6 defer-render">
    <div className="text-center space-y-1">
      <p className="kicker text-[11px] font-bold uppercase tracking-[0.18em] text-amber-400">
        Zo werkt het
      </p>
      <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
        Van bestelling tot kijken in drie stappen
      </h2>
    </div>

    <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
      {STEPS.map((step, i) => (
        <li
          key={step.title}
          className="relative rounded-3xl border border-slate-800 bg-slate-900 p-6 space-y-3"
        >
          <span className="absolute top-5 right-5 text-3xl font-black text-slate-800 leading-none">
            {i + 1}
          </span>
          <span className="w-11 h-11 rounded-2xl bg-amber-400/15 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <step.icon className="w-5 h-5" />
          </span>
          <h3 className="text-base font-black text-slate-100 tracking-tight">{step.title}</h3>
          <p className="text-xs text-slate-400 leading-relaxed">{step.body}</p>
        </li>
      ))}
    </ol>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
      {GUARANTEES.map((g) => (
        <div
          key={g.title}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-5 space-y-2.5"
        >
          <span className="w-9 h-9 rounded-xl bg-cyan-400/15 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
            <g.icon className="w-4 h-4" />
          </span>
          <h3 className="text-sm font-black text-slate-100 tracking-tight">{g.title}</h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">{g.body}</p>
        </div>
      ))}
    </div>

    <div className="max-w-5xl mx-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-500">
          Betaalmogelijkheden
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {PAYMENT_METHODS.map((m) => (
            <li
              key={m}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-850 text-slate-300 border border-slate-800"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={whatsappLink('Hallo! Ik heb een vraag voordat ik bestel.')}
        target="_blank"
        rel="noreferrer"
        className="shrink-0 min-h-[48px] px-6 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-sm flex items-center justify-center gap-2 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4" />
        Stel je vraag via WhatsApp
      </a>
    </div>
  </section>
);
