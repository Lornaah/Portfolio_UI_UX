import type { PlayerClass } from '../types/content';

/** Les trois classes du cadran de sélection. */
export const classes: PlayerClass[] = [
  {
    id: 'uiux',
    short: 'UI/UX',
    name: 'UI/UX Designer',
    line: 'Observer avant de dessiner.',
    pitch: 'Recherche utilisateur, ateliers, parcours, maquettes et design system.',
    talents: ['Observation', 'Prototypage', 'Design system'],
    quests: ['Refonte « Import grid »', 'Bibliothèque SmgComponents', 'AuTour de mon chien'],
  },
  {
    id: 'dev',
    short: 'DEV',
    name: 'Développeuse',
    line: 'Ce que je dessine, je le construis.',
    pitch: 'Composants Java Swing, sites et apps React, API REST et Spring.',
    talents: ['Java Swing', 'React', 'API REST'],
    quests: ['Bibliothèque SmgComponents', 'FIT DISTANCE', 'Ferme Incrémentale'],
  },
  {
    id: 'illu',
    short: 'ILLU',
    name: 'Illustratrice',
    line: 'Une image qui dit tout sans un mot.',
    pitch: 'Logos, chartes graphiques, icônes et illustrations vectorielles pour mes clients.',
    talents: ['Logo', 'Charte graphique', 'Icônes'],
    quests: ['Icône du chatbot Sismo', 'Illustration du cube IJK', '[Logo client]'],
  },
];

/** Texte qui tourne sur l'anneau du cadran. */
export const dialRingText =
  'UI/UX DESIGNER · RECHERCHE · PROTOTYPAGE · DÉVELOPPEUSE · JAVA · REACT · ILLUSTRATRICE · LOGOS · ICÔNES ·';
