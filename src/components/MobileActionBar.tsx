import React from 'react';
import { Zap } from 'lucide-react';
import { whatsappLink } from '../data/contact';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface MobileActionBarProps {
  onOpenPackages: () => void;
}

/**
 * Persistent bottom bar on phones only. Two primary actions, both at least
 * 48px tall so they stay comfortable touch targets.
 */
export const MobileActionBar: React.FC<MobileActionBarProps> = ({ onOpenPackages }) => (
  <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-slate-950/80 backdrop-blur-xl border-t border-slate-100/15">
    <div className="flex items-center gap-2.5 max-w-lg mx-auto">
      <button
        onClick={onOpenPackages}
        className="flex-1 min-h-[48px] rounded-2xl bg-cyan-400 active:bg-cyan-300 text-black font-black text-sm flex items-center justify-center gap-2 transition-all"
      >
        <Zap className="w-4 h-4" />
        Bekijk pakketten
      </button>
      <a
        href={whatsappLink('Hallo! Ik heb een vraag over Deiptivi.')}
        target="_blank"
        rel="noreferrer"
        className="flex-1 min-h-[48px] rounded-2xl bg-[#25D366] active:bg-[#1eb457] text-[#06301a] font-black text-sm flex items-center justify-center gap-2 transition-all"
      >
        <WhatsAppIcon className="w-4 h-4" />
        WhatsApp support
      </a>
    </div>
  </div>
);
