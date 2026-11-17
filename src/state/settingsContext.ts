import { createContext, useContext } from 'react';
import type { ClassId } from '../types/content';
import type { StoredSettings } from './Settings';

export interface SettingsValue extends StoredSettings {
  /** Vrai si le système OU l'option « Animations réduites » le demande. */
  reducedMotion: boolean;
  setMusic: (v: boolean) => void;
  setSfx: (v: boolean) => void;
  setCalm: (v: boolean) => void;
  playSfx: (id: string) => void;
  chosenClass: ClassId;
  setChosenClass: (c: ClassId) => void;
}

export const SettingsContext = createContext<SettingsValue | null>(null);

/** Réglages globaux (musique, bruitages, animations réduites) et classe choisie. */
export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings doit être utilisé dans <SettingsProvider>');
  return ctx;
}
