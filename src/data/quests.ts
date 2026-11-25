import type { Rarity } from '../types/content';
import { achievements } from './achievements';
import { zones } from './zones';

export type QuestStatus = 'en-cours' | 'accomplie';

export interface Quest {
  id: string;
  title: string;
  zoneId: string;
  status: QuestStatus;
  rarity?: Rarity;
  meta: string;
  summary: string;
  objectives: { label: string; done: boolean }[];
  reward: string;
  /** Haut fait correspondant dans la salle des trophées. */
  achievementId?: string;
}

export const questBoardCopy = {
  kicker: 'TABLEAU D’AFFICHAGE',
  title: 'Quêtes',
  statusLabel: { 'en-cours': 'En cours', accomplie: 'Accomplie' } as Record<QuestStatus, string>,
  zone: 'Zone',
  objectives: 'OBJECTIFS',
  reward: 'RÉCOMPENSE',
  seeAchievement: 'Voir le haut fait',
  boardLabel: 'Toutes les quêtes',
};

/** Zone de chaque projet sur la carte. */
const ZONE_OF: Record<string, string> = {
  smg: 'industrie', import: 'industrie', obs: 'industrie', layer: 'industrie', sismo: 'industrie', cube: 'industrie',
  fit: 'clients', chien: 'clients', quiz: 'clients',
  ferme: 'tour', bots: 'tour',
};

/** Quête en cours (le dernier projet), à remplir. */
const current: Quest = {
  id: 'dernier',
  title: '[Dernier projet]',
  zoneId: 'base',
  status: 'en-cours',
  meta: '[dates]',
  summary: '[Une phrase : le problème, pour qui, ce que je fais.]',
  objectives: [
    { label: '[Objectif 1]', done: true },
    { label: '[Objectif 2]', done: false },
    { label: '[Objectif 3]', done: false },
  ],
  reward: '[X] pts',
};

/** Les projets terminés deviennent des quêtes accomplies (mêmes données que les faits d'armes). */
export const quests: Quest[] = [
  current,
  ...achievements.map<Quest>((a) => ({
    id: a.id,
    title: a.title,
    zoneId: ZONE_OF[a.id] ?? 'base',
    status: 'accomplie',
    rarity: a.rarity,
    meta: a.meta,
    summary: a.sub,
    objectives: a.criteria.map((label) => ({ label, done: true })),
    reward: `${a.points} pts`,
    achievementId: a.id,
  })),
];

export function zoneName(id: string): string {
  return zones.find((z) => z.id === id)?.name ?? id;
}
