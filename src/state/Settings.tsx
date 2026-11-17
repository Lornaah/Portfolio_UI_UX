import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { sounds } from '../data/assets';
import type { ClassId } from '../types/content';
import { SettingsContext, type SettingsValue } from './settingsContext';

export interface StoredSettings {
  music: boolean;
  sfx: boolean;
  calm: boolean;
}

const STORAGE_KEY = 'portfolio-mmo.settings';
const CLASS_KEY = 'portfolio-mmo.class';
/** Son coupé par défaut (spec Révélation). */
const DEFAULTS: StoredSettings = { music: false, sfx: true, calm: false };

function readStored(): StoredSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<StoredSettings>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

function readClass(): ClassId {
  try {
    const v = sessionStorage.getItem(CLASS_KEY);
    return v === 'dev' || v === 'illu' || v === 'uiux' ? v : 'uiux';
  } catch {
    return 'uiux';
  }
}

function useSystemReducedMotion(): boolean {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredSettings>(readStored);
  const [chosenClass, setChosenClassState] = useState<ClassId>(readClass);
  const system = useSystemReducedMotion();
  const reducedMotion = system || stored.calm;
  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch {
      /* stockage indisponible : réglages non mémorisés */
    }
  }, [stored]);

  useEffect(() => {
    document.documentElement.dataset.reducedMotion = String(reducedMotion);
  }, [reducedMotion]);

  // Musique : ne charge rien tant qu'aucun fichier n'est renseigné dans data/assets.ts
  useEffect(() => {
    const src = sounds['music.lute']?.src;
    if (!src) return;
    if (!musicRef.current) {
      musicRef.current = new Audio(src);
      musicRef.current.loop = true;
    }
    if (stored.music) musicRef.current.play().catch(() => undefined);
    else musicRef.current.pause();
  }, [stored.music]);

  const playSfx = useCallback(
    (id: string) => {
      if (!stored.sfx) return;
      const src = sounds[id]?.src;
      if (!src) return;
      new Audio(src).play().catch(() => undefined);
    },
    [stored.sfx],
  );

  const setChosenClass = useCallback((c: ClassId) => {
    setChosenClassState(c);
    try {
      sessionStorage.setItem(CLASS_KEY, c);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SettingsValue>(
    () => ({
      ...stored,
      reducedMotion,
      setMusic: (music) => setStored((s) => ({ ...s, music })),
      setSfx: (sfx) => setStored((s) => ({ ...s, sfx })),
      setCalm: (calm) => setStored((s) => ({ ...s, calm })),
      playSfx,
      chosenClass,
      setChosenClass,
    }),
    [stored, reducedMotion, playSfx, chosenClass, setChosenClass],
  );

  return (
    <SettingsContext.Provider value={value}>
      <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>{children}</MotionConfig>
    </SettingsContext.Provider>
  );
}
