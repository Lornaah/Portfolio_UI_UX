import type { InfoPanel, Spell } from '../types/content';
import { mailto } from './profile';

/**
 * Barre de sorts PORTFOLIO (ordre = lecture gauche → droite, 4 · 1 · 4).
 * Les trois O partagent la touche : seul le dernier (Options) la porte.
 */
export const spells: Spell[] = [
  { id: 'personnage', key: 'P', label: 'Personnage', desc: 'Ma fiche : caractéristiques, profil et équipement.', hotkey: true,
    icon: 'M12 4a3.5 3.5 0 1 0 0 7a3.5 3.5 0 1 0 0-7M5 20c0-4 3-6 7-6s7 2 7 6',
    action: { type: 'route', to: '/jeu/personnage' } },
  { id: 'origines', key: 'O', label: 'Origines', desc: 'D’où je viens : langues, enseignement, puis code et design.', hotkey: false,
    icon: 'M12 21V10M12 10C12 6 9 4 5 4c0 4 3 6 7 6M12 14c0-3 3-5 7-5c0 4-3 5-7 5',
    action: { type: 'panel', panel: 'origines' } },
  { id: 'reputation', key: 'R', label: 'Réputation', desc: 'Mes clients et ce qu’ils disent de mon travail.', hotkey: true,
    icon: 'M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7z',
    action: { type: 'panel', panel: 'reputation' } },
  { id: 'talents', key: 'T', label: 'Talents', desc: 'Trois arbres : UI/UX, développement, illustration.', hotkey: true,
    icon: 'M12 21v-7M12 14l-5-5M12 14l5-5M12 11V4M7 9V6M17 9V6',
    action: { type: 'route', to: '/jeu/talents' } },
  { id: 'faits-d-armes', key: 'F', label: 'Faits d’armes', desc: 'Mes projets, du rare au légendaire. L’orbe se remplit avec mon expérience.', hotkey: true, featured: true, isNew: true,
    icon: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H5c0 3 1 4 3 4M16 6h3c0 3-1 4-3 4M12 13v4M8 20h8',
    action: { type: 'route', to: '/jeu/faits-d-armes' } },
  { id: 'objectifs', key: 'O', label: 'Objectifs', desc: 'Ce que je cherche en ce moment.', hotkey: false,
    icon: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8',
    action: { type: 'panel', panel: 'objectifs' } },
  { id: 'lettres', key: 'L', label: 'Lettres', desc: 'Écrivez-moi, je réponds vite.', hotkey: true,
    icon: 'M3 6h18v12H3zM3 7l9 7 9-7',
    action: { type: 'panel', panel: 'lettres' } },
  { id: 'inventaire', key: 'I', label: 'Inventaire', desc: 'Mes outils du quotidien, par rareté.', hotkey: true,
    icon: 'M6 9h12l1 11H5zM9 9V7a3 3 0 0 1 6 0v2',
    action: { type: 'route', to: '/jeu/personnage', focus: 'inventory' } },
  { id: 'options', key: 'O', label: 'Options', desc: 'Musique au luth, bruitages, animations.', hotkey: true,
    icon: 'M12 8a4 4 0 1 0 0 8a4 4 0 1 0 0-8M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
    action: { type: 'options' } },
];

/** Sorts sans écran dédié pour l'instant : un parchemin « à venir ». */
export const infoPanels: Record<InfoPanel['id'], InfoPanel> = {
  origines: { id: 'origines', title: 'Origines', text: '[À venir : langues, enseignement, puis code et design.]' },
  reputation: { id: 'reputation', title: 'Réputation', text: '[À venir : mes clients et ce qu’ils disent de mon travail.]' },
  objectifs: { id: 'objectifs', title: 'Objectifs', text: '[À venir : ce que je cherche en ce moment.]' },
  lettres: { id: 'lettres', title: 'Lettres', text: 'Écrivez-moi, je réponds vite.', cta: { label: 'Écrire un message', href: mailto } },
};

export const loadingTip = {
  before: 'Astuce : vos raccourcis épellent ',
  word: 'P O R T F O L I O',
  after: '. ',
  keys: [
    { key: 'T', text: ' pour les talents, ' },
    { key: 'P', text: ' pour la fiche personnage, ' },
    { key: 'F', text: ' pour les faits d’armes.' },
  ],
};
