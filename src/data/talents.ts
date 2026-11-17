import type { Talent, TalentBranch, TalentTree } from '../types/content';

const t = (id: string, label: string, desc: string, status: Talent['status'] = 'acquired', usedIn: string[] = []): Talent =>
  ({ id, label, desc, status, usedIn });

const b = (id: string, label: string, talents: TalentBranch['talents']): TalentBranch =>
  ({ id, label, desc: `Branche ${label} : ses talents montent au-dessus.`, talents });

export const talentsMeta = { kicker: 'GRIMOIRE', title: 'Talents', summary: '3 arbres · [X] points investis', usedInPlaceholder: '[Projets liés → faits d’armes]' };

export const talentTrees: TalentTree[] = [
  { id: 'uiux', short: 'UI/UX', name: 'UI/UX Designer', points: '[X] pts', branches: [
    b('uiux-recherche', 'Recherche', [
      t('uiux-entretiens', 'Entretiens', 'Entretiens semi-directifs avec des utilisateurs experts.'),
      t('uiux-observation', 'Observation', 'Sessions d’observation en situation réelle.'),
      t('uiux-ateliers', 'Ateliers', 'Animation d’ateliers de co-conception.'),
    ]),
    b('uiux-conception', 'Conception', [
      t('uiux-audit', 'Audit UX', 'Repérage des frictions sur une version en production.'),
      t('uiux-parcours', 'Parcours', 'Cartographie et simplification des parcours.'),
      t('uiux-proto', 'Prototypage', 'Prototypes interactifs dans Figma.'),
    ]),
    b('uiux-interface', 'Interface', [
      t('uiux-composants', 'Composants', 'Bibliothèque de composants réutilisables.'),
      t('uiux-ds', 'Design system', 'Règles, états, variantes, tokens.'),
      t('uiux-micro', 'Micro-interact.', 'Survols, transitions, retours d’état.'),
    ]),
  ] },
  { id: 'dev', short: 'DEV', name: 'Développeuse', points: '[X] pts', branches: [
    b('dev-front', 'Front', [
      t('dev-swing', 'Java Swing', 'Composants pour une application métier desktop.'),
      t('dev-react', 'React', 'Sites et apps web clients.'),
      t('dev-godot', 'Godot', 'Projets de jeu personnels.', 'learning'),
    ]),
    b('dev-back', 'Back', [
      t('dev-spring', 'Spring', 'Services Java et micro-services.'),
      t('dev-api', 'API REST', 'Conception et intégration d’API.'),
      t('dev-supabase', 'Supabase', 'Base de données et authentification.'),
    ]),
    b('dev-methode', 'Méthode', [
      t('dev-mvvm', 'MVVM', 'Architecture d’écrans maintenables.'),
      t('dev-review', 'Code review', 'Conventions et revues entre pairs.'),
      t('dev-codingame', 'CodinGame', 'Bots heuristiques en compétition.', 'learning'),
    ]),
  ] },
  { id: 'illu', short: 'ILLU', name: 'Illustratrice', points: '[X] pts', branches: [
    b('illu-identite', 'Identité', [
      t('illu-logo', 'Logo', 'Logos et monogrammes pour des clients.'),
      t('illu-charte', 'Charte', 'Chartes graphiques : couleurs, typos, usages.'),
      t('illu-declinaisons', 'Déclinaisons', 'Cartes, en-têtes, réseaux sociaux.'),
    ]),
    b('illu-illustration', 'Illustration', [
      t('illu-vectoriel', 'Vectoriel', 'Illustrations vectorielles sur mesure.'),
      t('illu-icones', 'Icônes', 'Jeux d’icônes cohérents.'),
      t('illu-personnages', 'Personnages', 'Personnages et mascottes.', 'learning'),
    ]),
    b('illu-supports', 'Supports', [
      t('illu-print', 'Print', 'Flyers, affiches, cartes.'),
      t('illu-web', 'Web', 'Visuels de sites et bannières.'),
      t('illu-signaletique', 'Signalétique', 'Panneaux et supports physiques.', 'learning'),
    ]),
  ] },
];

/** Talent ouvert par défaut (comme la maquette). */
export const defaultTalentId = 'uiux-observation';
