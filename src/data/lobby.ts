import type { QuestSlide, Scroll } from '../types/content';
import { mailto, profile } from './profile';

/** Répliques de la boîte de dialogue (clic = réplique suivante). */
export const dialogueLines: string[] = [
  'Te voilà. Je conçois des interfaces, puis je les construis.',
  'Neuf sorts, un mot : lis les touches de gauche à droite.',
  'Je travaille près de Pau, sur site ou à distance.',
  'L’astrolabe suspendu, là-haut, ouvre la carte.',
];

/** Diapos de l'avis « Quête » (défilent toutes les ~4 s). */
export const questSlides: QuestSlide[] = [
  { title: '[Dernier projet]', meta: '[dates]' },
  { title: 'Bibliothèque SmgComponents', meta: 'Légendaire · UI/UX + Dev', achievementId: 'smg' },
  { title: 'Icône du chatbot Sismo', meta: 'Rare · Illustratrice', achievementId: 'sismo' },
];

export const notices = {
  quest: { heading: 'QUÊTE', reward: 'Récompense [X] pts', aria: 'Quête en vedette' },
  contact: { heading: 'AVIS', title: 'Prendre contact', text: 'Une mission, un poste, une question', href: mailto },
  availability: { heading: 'DISPONIBLE', lines: [profile.availability.detail, profile.availability.since] },
};

/** Parchemins de la besace. */
export const scrolls: Scroll[] = [
  { id: 'texte', label: 'Texte', title: 'Version texte', text: 'Tout le portfolio sur une seule page simple, sans jeu ni animation.',
    cta: { label: 'Ouvrir la version texte', href: '/version-texte', internal: true }, tilt: -13, left: 52 },
  { id: 'cv', label: 'CV', title: 'Curriculum vitæ', text: '[Résumé en trois lignes : métier, expérience, disponibilité]',
    cta: { label: 'Télécharger le CV (PDF)', href: profile.cvHref, download: true }, tilt: 12, left: 108 },
];

export const toast = { kicker: 'HAUT FAIT DÉBLOQUÉ', title: 'Explorateur : premier pas dans le monde' };

export const astrolabe = { place: profile.baseLabel, hint: 'Astrolabe · ouvrir la carte' };
