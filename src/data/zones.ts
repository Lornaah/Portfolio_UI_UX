import type { Zone } from '../types/content';
import { profile } from './profile';

/** Zones de la carte (coordonnées en px dans la carte de 1000×760). */
export const zones: Zone[] = [
  { id: 'base', name: profile.baseLabel, x: 420, y: 470, desc: 'Où je vis et travaille. Sur site ou à distance.', quests: '[Disponibilités, zone d’intervention]' },
  { id: 'industrie', name: 'La Citadelle · logiciel métier', x: 200, y: 200, desc: '[Client grand compte, secteur énergie] : application desktop de géoscience. UX et dev.', quests: 'SmgComponents · Import grid · Layer management' },
  { id: 'clients', name: 'Le Bourg marchand · clients', x: 640, y: 230, desc: 'Sites et applications pour des indépendants et petites structures.', quests: 'AuTour de mon chien · FIT DISTANCE · Quiz chronométré' },
  { id: 'tour', name: 'La Tour · projets perso', x: 640, y: 560, desc: 'Expérimentations, jeux, compétitions de code.', quests: 'Ferme Incrémentale · bots CodinGame' },
];

export const defaultZoneId = 'base';

export const mapMeta = { title: 'Carte du monde', compassRose: 'Rose des vents', zoneKicker: 'ZONE', questsKicker: 'QUÊTES DE LA ZONE', cta: 'Voir les faits d’armes' };
