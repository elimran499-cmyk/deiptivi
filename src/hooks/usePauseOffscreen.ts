import { useEffect, useRef } from 'react';

/**
 * Marquees animate `transform` forever, which keeps the compositor busy even
 * when the row is nowhere near the viewport — costly on phones. This pauses a
 * row while it is off-screen and resumes it when it scrolls back in.
 */
export const usePauseOffscreen = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        el.dataset.paused = entry.isIntersecting ? 'false' : 'true';
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
