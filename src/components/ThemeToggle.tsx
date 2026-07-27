import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

/** Labelled on purpose — an icon alone did not read as "make the site darker". */
export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const goingDark = theme === 'light';

  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-800 bg-slate-900 hover:bg-slate-850 text-slate-100 text-[13px] font-semibold transition-all cursor-pointer"
      title={goingDark ? 'Donkere modus inschakelen' : 'Lichte modus inschakelen'}
      aria-label={goingDark ? 'Donkere modus inschakelen' : 'Lichte modus inschakelen'}
      aria-pressed={!goingDark}
    >
      {goingDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
      <span className="hidden sm:inline">{goingDark ? 'Donker' : 'Licht'}</span>
    </button>
  );
};
