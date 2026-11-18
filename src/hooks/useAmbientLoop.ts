import { useEffect } from 'react';
import { sounds } from '../data/assets';
import { useSettings } from '../state/settingsContext';

/** Son d'ambiance en boucle (ex. feu des braseros) tant que `active` et que les bruitages sont activés. */
export function useAmbientLoop(id: string, active: boolean, volume = 0.5) {
  const { sfx } = useSettings();
  useEffect(() => {
    const src = sounds[id]?.src;
    if (!src || !active || !sfx) return;
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = volume;
    audio.play().catch(() => undefined);
    return () => audio.pause();
  }, [id, active, sfx, volume]);
}
