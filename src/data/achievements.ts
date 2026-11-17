import type { Achievement, AchievementCategory, Rarity } from '../types/content';

export const achievementsMeta = {
  kicker: 'HAUTS FAITS',
  title: 'Salle des trophées',
  counters: [
    { value: '[X]', label: 'points' },
    { value: '[X]', label: 'projets livrés' },
    { value: '[X]', label: 'ateliers animés' },
  ],
  citation: 'CITATION',
  caseStudy: 'Lire l’étude de cas',
  emptySlot: 'Emplacement libre',
  showcase: 'ÉCRIN',
};

export const rarityNames: Record<Rarity, string> = { L: 'LÉGENDAIRE', E: 'ÉPIQUE', R: 'RARE', C: 'COMMUN' };
export const rarityLabels: Record<Rarity, string> = { L: 'Légendaire', E: 'Épique', R: 'Rare', C: 'Commun' };

export const achievementCategories: { id: 'all' | AchievementCategory; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'metier', label: 'Métier' },
  { id: 'clients', label: 'Clients' },
  { id: 'illu', label: 'Illustration' },
  { id: 'perso', label: 'Perso' },
];

const base = { awardedOn: '[date]', points: '[X]', caseStudyHref: '#' };

/** Vitrine 4 × 3 : 11 médailles + 1 emplacement libre (ajouté par l'écran). */
export const achievements: Achievement[] = [
  { ...base, id: 'smg', category: 'metier', rarity: 'L', shape: 'star', title: 'Bibliothèque SmgComponents', meta: 'UI/UX · Dev', sub: 'Concevoir et livrer une bibliothèque de composants Java Swing.', criteria: ['Audit des composants existants', 'Composants conçus et documentés', 'Adoption dans [X] écrans'] },
  { ...base, id: 'import', category: 'metier', rarity: 'E', shape: 'shield', title: 'Refonte « Import grid »', meta: 'UI/UX · Dev', sub: 'Fusionner deux parcours d’import en un seul écran.', criteria: ['Entretiens et observation', 'Maquettes validées en atelier', 'Écran livré en MVVM'] },
  { ...base, id: 'obs', category: 'metier', rarity: 'E', shape: 'circle', title: 'Sessions d’observation', meta: 'UI/UX', sub: 'Observer des utilisateurs experts en situation réelle.', criteria: ['Guide d’entretien', 'Grille d’observation', 'Synthèse des frictions'] },
  { ...base, id: 'fit', category: 'clients', rarity: 'E', shape: 'hex', title: 'FIT DISTANCE', meta: 'UI/UX · Dev', sub: 'App de coaching Pilates pour une coach indépendante.', criteria: ['Parcours élève et coach', 'Interface livrée', 'App en production'] },
  { ...base, id: 'layer', category: 'metier', rarity: 'R', shape: 'diamond', title: 'Layer management', meta: 'UI/UX', sub: 'Fusionner deux listes en une seule liste moderne.', criteria: ['Analyse de l’existant', 'Nouvelle liste unifiée', '[Résultat]'] },
  { ...base, id: 'chien', category: 'clients', rarity: 'R', shape: 'arch', title: 'AuTour de mon chien', meta: 'UI/UX · Illustratrice', sub: 'Site vitrine pour une éducatrice canine.', criteria: ['Repositionnement de l’offre', 'Maquettes', 'Site en ligne'] },
  { ...base, id: 'quiz', category: 'clients', rarity: 'R', shape: 'circle', title: 'Quiz chronométré', meta: 'UI/UX · Dev', sub: 'App de quiz avec QR code et podium pour un événement.', criteria: ['Parcours joueur', 'Écran de podium', 'Utilisée en soirée'] },
  { ...base, id: 'sismo', category: 'illu', rarity: 'R', shape: 'shield', title: 'Icône du chatbot Sismo', meta: 'Illustratrice', sub: 'Donner une identité à l’assistant d’une application métier.', criteria: ['Pistes graphiques', 'Palette et états de survol', 'Icône intégrée'] },
  { ...base, id: 'cube', category: 'illu', rarity: 'R', shape: 'hex', title: 'Illustration du cube IJK', meta: 'Illustratrice', sub: 'Schéma vectoriel pour expliquer les axes d’une grille.', criteria: ['Dessin vectoriel', 'Variantes d’axes', 'Intégré à l’application'] },
  { ...base, id: 'ferme', category: 'perso', rarity: 'R', shape: 'diamond', title: 'Ferme Incrémentale', meta: 'Dev', sub: 'Jeu incrémental en Godot et C#.', criteria: ['Boucle de jeu', 'Interface', '[Statut]'] },
  { ...base, id: 'bots', category: 'perso', rarity: 'C', shape: 'arch', title: 'Bots CodinGame', meta: 'Dev', sub: 'Bots heuristiques en compétition de programmation.', criteria: ['[Compétition]', '[Classement]', '[Approche]'] },
];

export const defaultAchievementId = 'smg';
export const showcaseSlots = 12;
