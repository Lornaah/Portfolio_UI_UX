import { useEffect, useState } from 'react';

/** Index qui avance tout seul ; en pause quand `paused` (survol, focus, animations réduites). */
export function useRotator(length: number, { interval = 4200, paused = false } = {}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (paused || length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), interval);
    return () => window.clearInterval(id);
  }, [length, interval, paused]);
  return [index, setIndex] as const;
}
