/** Types des contenus du portfolio (src/data/*). */

export type ClassId = 'uiux' | 'dev' | 'illu';

export interface PlayerClass {
  id: ClassId;
  short: string;
  name: string;
  line: string;
  pitch: string;
  talents: string[];
  quests: string[];
}

export type PanelId = 'origines' | 'reputation' | 'objectifs' | 'lettres';

export type SpellAction =
  | { type: 'route'; to: string; focus?: 'inventory' }
  | { type: 'panel'; panel: PanelId }
  | { type: 'options' };

export interface Spell {
  id: string;
  /** Touche clavier (une lettre de P O R T F O L I O). */
  key: string;
  label: string;
  desc: string;
  /** Tracé SVG 24×24 de l'icône (placeholder, sera remplacé par l'illustration). */
  icon: string;
  action: SpellAction;
  /** Gemme centrale, plus grosse. */
  featured?: boolean;
  /** Pastille « NEW ». */
  isNew?: boolean;
  /** Le raccourci clavier est-il actif ? (les trois O partagent la touche : seul Options la prend) */
  hotkey: boolean;
}

export interface InfoPanel {
  id: PanelId;
  title: string;
  text: string;
  cta?: { label: string; href: string };
}

export interface Scroll {
  id: 'texte' | 'cv';
  label: string;
  title: string;
  text: string;
  cta: { label: string; href: string; download?: boolean; internal?: boolean };
  /** Inclinaison dans la besace (deg) et position horizontale (px). */
  tilt: number;
  left: number;
}

export interface QuestSlide {
  title: string;
  meta: string;
  /** Quête ouverte sur le tableau d'affichage. */
  questId: string;
}

export type TalentStatus = 'acquired' | 'learning';

export interface Talent {
  id: string;
  label: string;
  desc: string;
  status: TalentStatus;
  /** Identifiants de faits d'armes liés. */
  usedIn: string[];
}

export interface TalentBranch {
  id: string;
  label: string;
  desc: string;
  talents: [Talent, Talent, Talent];
}

export interface TalentTree {
  id: ClassId;
  short: string;
  name: string;
  points: string;
  branches: [TalentBranch, TalentBranch, TalentBranch];
}

export type Rarity = 'L' | 'E' | 'R' | 'C';

export interface EquipmentSlot {
  id: string;
  slot: string;
  tool: string;
  abbr: string;
  rarity: Rarity;
  usage: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface Zone {
  id: string;
  name: string;
  x: number;
  y: number;
  desc: string;
  quests: string;
}

export type MedalShape = 'circle' | 'shield' | 'star' | 'diamond' | 'hex' | 'arch';

export type AchievementCategory = 'metier' | 'clients' | 'illu' | 'perso';

export interface Achievement {
  id: string;
  category: AchievementCategory;
  rarity: Rarity;
  shape: MedalShape;
  title: string;
  meta: string;
  sub: string;
  criteria: string[];
  awardedOn: string;
  points: string;
  caseStudyHref: string;
}
