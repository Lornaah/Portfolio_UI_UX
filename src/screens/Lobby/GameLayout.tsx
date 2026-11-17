import { AnimatePresence, motion } from 'motion/react';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { spells } from '../../data/spells';
import { useHotkeys, type HotkeyMap } from '../../hooks/useHotkeys';
import { useSettings } from '../../state/settingsContext';
import type { PanelId } from '../../types/content';
import styles from './GameLayout.module.css';
import { LobbyScreen } from './LobbyScreen';

export type Popover = null | 'options' | PanelId;

const overlayLabels: Record<string, string> = {
  '/jeu/faits-d-armes': 'Faits d’armes',
  '/jeu/talents': 'Talents',
  '/jeu/personnage': 'Fiche personnage',
  '/jeu/carte': 'Carte du monde',
};

/** Fige l'écran sortant pendant son animation de sortie. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const [frozen] = useState(outlet);
  return frozen;
}

/**
 * Coquille « en jeu » : le lobby reste monté (et inerte) sous les écrans
 * Talents, Fiche, Carte, Faits d'armes. Porte les raccourcis P O R T F O L I O.
 */
export function GameLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const outlet = useOutlet();
  const { playSfx } = useSettings();
  const [popover, setPopover] = useState<Popover>(null);
  const overlayOpen = location.pathname !== '/jeu';
  const returnFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(overlayOpen);

  // Focus : mémorise l'élément déclencheur à l'ouverture, le rend à la fermeture.
  useEffect(() => {
    if (overlayOpen && !wasOpen.current) {
      const active = document.activeElement;
      returnFocus.current = active instanceof HTMLElement && active !== document.body ? active : null;
    }
    if (!overlayOpen && wasOpen.current) {
      const el = returnFocus.current;
      if (el && document.contains(el)) requestAnimationFrame(() => el.focus());
    }
    wasOpen.current = overlayOpen;
  }, [overlayOpen]);

  // À l'ouverture d'un écran, le focus entre dedans (sauf si l'écran l'a déjà placé).
  useEffect(() => {
    if (!overlayOpen) return;
    const id = requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-overlay-path="${location.pathname}"]`);
      if (el && !el.contains(document.activeElement)) el.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [overlayOpen, location.pathname]);

  const togglePopover = (p: Exclude<Popover, null>) => {
    if (overlayOpen) navigate('/jeu');
    setPopover((cur) => (cur === p ? null : p));
    playSfx('sfx.click');
  };

  const map: HotkeyMap = {
    Escape: () => {
      if (overlayOpen) navigate('/jeu');
      else if (popover) {
        const id = popover;
        setPopover(null);
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-spell-id="${id}"]`)?.focus());
      }
    },
  };
  for (const s of spells) {
    if (!s.hotkey) continue;
    const a = s.action;
    map[s.key] = (e) => {
      e.preventDefault();
      if (a.type === 'route') {
        setPopover(null);
        playSfx('sfx.click');
        if (location.pathname === a.to) navigate('/jeu');
        else navigate(a.to, { state: a.focus ? { focus: a.focus } : undefined });
      } else if (a.type === 'options') togglePopover('options');
      else togglePopover(a.panel);
    };
  }
  useHotkeys(map);

  return (
    <>
      <LobbyScreen inert={overlayOpen} popover={popover} onPopover={togglePopover} onClosePopover={() => setPopover(null)} />
      <AnimatePresence>
        {outlet && (
          <motion.div
            key={location.pathname}
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-label={overlayLabels[location.pathname]}
            data-overlay-path={location.pathname}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Suspense fallback={null}>
              <FrozenOutlet />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
