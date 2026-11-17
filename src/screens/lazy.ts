import { lazy } from 'react';

/** Écrans chargés à la demande ; `preloadGame` est appelé pendant le Lancement. */
const loaders = {
  talents: () => import('./Talents/TalentsScreen'),
  character: () => import('./Character/CharacterScreen'),
  map: () => import('./Map/MapScreen'),
  achievements: () => import('./Achievements/AchievementsScreen'),
};

export const TalentsScreen = lazy(() => loaders.talents().then((m) => ({ default: m.TalentsScreen })));
export const CharacterScreen = lazy(() => loaders.character().then((m) => ({ default: m.CharacterScreen })));
export const MapScreen = lazy(() => loaders.map().then((m) => ({ default: m.MapScreen })));
export const AchievementsScreen = lazy(() => loaders.achievements().then((m) => ({ default: m.AchievementsScreen })));

export function preloadGame(): Promise<unknown> {
  return Promise.all(Object.values(loaders).map((load) => load()));
}
