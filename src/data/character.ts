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

/** Onglet Réputation : ce que disent les clients et collègues (à remplir). */
export const reputation = [
  { who: '[Client grand compte, secteur énergie]', role: '[Poste]', standing: 3, quote: '[Citation courte sur la collaboration]', mission: 'Bibliothèque SmgComponents · Import grid' },
  { who: '[Coach Pilates indépendante]', role: 'FIT DISTANCE', standing: 3, quote: '[Citation courte]', mission: 'App de coaching' },
  { who: '[Éducatrice canine]', role: 'AuTour de mon chien', standing: 3, quote: '[Citation courte]', mission: 'Site vitrine' },
];
/** Paliers de réputation (jauge). */
export const standingLabels = ['Inconnue', 'Cordiale', 'Appréciée', 'Recommandée', 'Fidèle'];

/** Onglet Métiers : savoir-faire avec niveau de maîtrise. Les jauges (progress 0 → 1) sont des valeurs d'attente à ajuster. */
export const crafts = [
  { name: 'Recherche utilisateur', level: '[X]', max: '[X]', progress: 0.5, tools: 'Entretiens, observation, ateliers' },
  { name: 'Conception d’interfaces', level: '[X]', max: '[X]', progress: 0.5, tools: 'Figma, design system, prototypage' },
  { name: 'Développement front', level: '[X]', max: '[X]', progress: 0.5, tools: 'Java Swing, React' },
  { name: 'Développement back', level: '[X]', max: '[X]', progress: 0.5, tools: 'Spring, API REST, Supabase' },
  { name: 'Illustration', level: '[X]', max: '[X]', progress: 0.5, tools: 'Logos, icônes, vectoriel' },
];
