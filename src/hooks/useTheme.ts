import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'deiptivi_theme';
/** Pre-rebrand key — read once so a returning visitor keeps their choice. */
const LEGACY_STORAGE_KEY = 'streampulse_theme';

/**
 * Light is the default. The `light` class on <html> re-points the colour tokens
 * in index.css, so switching costs one class toggle rather than a re-render.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem(LEGACY_STORAGE_KEY);
    return saved === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
};
