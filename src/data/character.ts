import type { EquipmentSlot, Stat } from '../types/content';
import { profile } from './profile';

/** Équipement = outils. 10 gemmes sur le cercle runique, dans l'ordre horaire depuis le haut. */
export const equipment: EquipmentSlot[] = [
  { id: 'arme', slot: 'Arme principale', tool: 'Figma', abbr: 'FIG', rarity: 'L', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'main-gauche', slot: 'Main gauche', tool: '[IDE Java]', abbr: 'IDE', rarity: 'E', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'tete', slot: 'Tête', tool: '[outil de recherche]', abbr: 'REC', rarity: 'R', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'torse', slot: 'Torse', tool: '[outil d’illustration]', abbr: 'ILL', rarity: 'E', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'mains', slot: 'Mains', tool: '[outil de proto]', abbr: 'PRO', rarity: 'R', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'bijou', slot: 'Bijou', tool: '[outil IA]', abbr: 'IA', rarity: 'E', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'anneau-1', slot: 'Anneau', tool: 'React', abbr: 'RCT', rarity: 'E', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'anneau-2', slot: 'Anneau', tool: 'Spring', abbr: 'SPR', rarity: 'R', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'cape', slot: 'Cape', tool: 'Godot', abbr: 'GDT', rarity: 'R', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
  { id: 'monture', slot: 'Monture', tool: '[outil favori]', abbr: '???', rarity: 'L', usage: '[À quoi il me sert, depuis quand, sur quels projets]' },
];

export const characterStats: Stat[] = [
  { label: 'Années d’expérience', value: profile.yearsOfExperience },
  { label: 'Projets livrés', value: '[X]' },
  { label: 'Ateliers animés', value: '[X]' },
  { label: 'Composants créés', value: '[X]' },
  { label: 'Sessions d’observation', value: '[X]' },
];

export const characterProfile: Stat[] = [
  { label: 'Base', value: profile.base },
  { label: 'Statut', value: '[Freelance / disponible]' },
  { label: 'Langues', value: '[FR, EN, …]' },
  { label: 'Formation', value: '[Langues et traduction]' },
];

export const characterTabs = [
  { id: 'personnage', label: 'Personnage' },
  { id: 'reputation', label: 'Réputation' },
  { id: 'metiers', label: 'Métiers' },
] as const;

export const characterTabPlaceholder = '[Contenu à venir]';
