import React from 'react';
import { Bell } from 'lucide-react';
import { UserSubscription } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  subscription: UserSubscription;
  activePage: string;
  onSelectPage: (page: string) => void;
  theme: Theme;
  onToggleTheme: () => void;
}

// Each entry is its own page.
const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'pakketten', label: 'Pakketten' },
  { id: 'kwaliteit', label: 'Kwaliteit' },
  { id: 'snelheid', label: 'Snelheidstest' },
];

export const Header: React.FC<HeaderProps> = ({
  subscription,
  activePage,
  onSelectPage,
  theme,
  onToggleTheme
}) => {
  const handleNav = (id: string) => onSelectPage(id);

  return (
    <header className="sticky top-0 z-30 bg-slate-950/75 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-2">
      {/* Brand */}
      <button
        onClick={() => handleNav('home')}
        className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none shrink-0"
        title={`${subscription.serverRegion} — ${subscription.pingMs}ms`}
      >
        <span className="font-semibold text-[22px] text-slate-100 tracking-tight group-hover:text-white transition-colors duration-200">
          deiptivi<span className="text-cyan-400">.com</span>
        </span>
      </button>

      {/* Floating capsule nav. Phones: its own full-width row under the brand,
          scrollable if the labels overflow. Desktop: absolutely centred. */}
      <nav className="order-last w-full overflow-x-auto no-scrollbar lg:order-none lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-auto lg:overflow-visible">
        <div className="inline-flex items-center gap-1 bg-indigo-950/25 backdrop-blur-md p-1.5 rounded-full text-[13px] lg:text-[15px] text-slate-100/85">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-3.5 py-1.5 min-h-[38px] lg:min-h-0 rounded-full transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-400 text-black font-semibold'
                    : 'hover:text-slate-100 hover:bg-slate-100/10 active:bg-slate-100/20'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Secondary links & primary CTA */}
      <div className="flex items-center gap-1 sm:gap-2 ml-auto min-w-0">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />

        <button
          onClick={() => handleNav('pakketten')}
          className="p-2 text-slate-100/90 hover:text-slate-100 hover:bg-slate-100/10 rounded-full transition-all relative cursor-pointer"
          title="Aanbiedingen"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400"></span>
        </button>

        <span className="hidden md:block w-px h-6 bg-slate-100/25 mx-2"></span>

        {/* Primary CTA. Hidden on phones: the plan name is far too wide there and
            the sticky bottom bar already carries "Bekijk pakketten". */}
        <button
          onClick={() => handleNav('pakketten')}
          className="hidden sm:block max-w-[38vw] lg:max-w-none truncate bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2.5 rounded-lg text-[15px] font-bold transition-all cursor-pointer whitespace-nowrap"
        >
          {subscription.planName}
        </button>
      </div>
    </header>
  );
};
