import { useEffect, useState } from 'react';

/** Texte « tapé » lettre par lettre. Affiché d'un coup si les animations sont réduites. */
export function useTypewriter(text: string, { enabled = true, interval = 38 } = {}) {
  const [state, setState] = useState({ text, count: 0 });
  // Nouveau texte : on repart de zéro (dérivé au rendu, sans effet).
  const count = state.text === text ? state.count : 0;

  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      setState((s) => {
        const c = s.text === text ? s.count : 0;
        if (c >= text.length) {
          window.clearInterval(id);
          return s.text === text ? s : { text, count: c };
        }
        return { text, count: c + 1 };
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [text, enabled, interval]);

  const shown = enabled ? text.slice(0, count) : text;
  return { shown, done: shown.length >= text.length };
}
