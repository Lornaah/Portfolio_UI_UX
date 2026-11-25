/**
 * Registre des visuels et sons.
 *
 * Chaque élément illustré du portfolio pointe vers un identifiant d'ici
 * (attribut data-asset dans le DOM). Tant que `src` est vide, l'emplacement
 * s'affiche en wireframe hachuré avec son libellé.
 * Pour brancher un visuel : déposer le fichier dans public/assets/… et renseigner `src`.
 *
 * Les identifiants dynamiques (ex. `achievements.medal.smg`) peuvent être ajoutés ici
 * au fur et à mesure ; un identifiant absent est simplement affiché en placeholder.
 */
export interface AssetEntry {
  label: string;
  src?: string;
  /** Texte alternatif si l'image porte du sens ; vide = décorative. */
  alt?: string;
}

export const images: Record<string, AssetEntry> = {
  // 01 · Ouverture (lanterne)
  'intro.hand': { label: 'Main qui tient la lanterne' },
  'intro.lantern': { label: 'Lanterne (éteinte / allumée)' },
  'intro.flame': { label: 'Flamme de la lanterne' },

  // 02 · Sélection du personnage (armurerie)
  'select.armory': { label: 'Armurerie (décor de fond)' },
  'select.nameplate': { label: 'Lettrage du nom' },
  'select.platform': { label: 'Plateforme runique au sol' },
  'select.brazier': { label: 'Brasero' },
  'select.hero.back': { label: 'Silhouette encapuchonnée · de dos' },
  'select.hero.three': { label: 'Silhouette encapuchonnée · trois-quarts' },
  'select.hero.front': { label: 'Silhouette encapuchonnée · de face, visage dans l’ombre' },
  'select.accessory.uiux': { label: 'Accessoire UI/UX (stylet)' },
  'select.accessory.dev': { label: 'Accessoire DEV (clavier)' },
  'select.accessory.illu': { label: 'Accessoire ILLU (pinceau)' },
  'select.emblem.uiux': { label: 'Emblème UI/UX' },
  'select.emblem.dev': { label: 'Emblème DEV' },
  'select.emblem.illu': { label: 'Emblème ILLU' },
  'select.sheet': { label: 'Fiche déchirée (papier)' },

  // 03 · Lancement
  'launch.illustration': { label: 'Illustration de la zone de départ' },
  'launch.portrait': { label: 'Portrait de la classe choisie' },

  // 04 · Lobby — scène en calques (de l'arrière vers l'avant)
  'lobby.layer.sky': { label: 'Calque 1 · ciel, lune, nuages' },
  'lobby.layer.mountains': { label: 'Calque 2 · montagnes' },
  'lobby.layer.hills': { label: 'Calque 3 · collines et décor' },
  'lobby.layer.ground': { label: 'Calque 4 · sol' },
  'lobby.layer.foreground': { label: 'Calque 5 · avant-plan (feuillages)' },
  'lobby.decor.left': { label: 'Décor gauche' },
  'lobby.decor.right': { label: 'Décor droit (arche)' },
  'lobby.hero': { label: 'Justine, en grand au premier plan (respire, cligne, cheveux et tissu animés)' },
  'lobby.level-banner': { label: 'Bannière de niveau' },
  'lobby.astrolabe': { label: 'Astrolabe suspendu' },
  'lobby.astrolabe.map': { label: 'Mini-carte de l’astrolabe' },
  'lobby.notice.paper': { label: 'Papier des avis de quête' },
  'lobby.notice.quest-thumb': { label: 'Vignette de la quête en vedette' },
  'lobby.toast.icon': { label: 'Icône du haut fait débloqué' },
  'lobby.dialogue.frame': { label: 'Cadre de la boîte de dialogue' },
  'lobby.spellbar.frame': { label: 'Monture de la barre de sorts' },
  'lobby.satchel': { label: 'Besace' },
  'lobby.scroll': { label: 'Parchemin roulé' },
  'lobby.scroll.paper': { label: 'Parchemin déroulé' },
  'lobby.options.frame': { label: 'Cadre du panneau Options' },
  'lobby.options.lute': { label: 'Luth du troubadour' },

  // Gemmes de la barre de sorts (une par sort : spell.gem.<id>)
  'spell.gem.personnage': { label: 'Gemme P · Personnage' },
  'spell.gem.origines': { label: 'Gemme O · Origines' },
  'spell.gem.reputation': { label: 'Gemme R · Réputation' },
  'spell.gem.talents': { label: 'Gemme T · Talents' },
  'spell.gem.faits-d-armes': { label: 'Gemme F · Faits d’armes' },
  'spell.gem.objectifs': { label: 'Gemme O · Objectifs' },
  'spell.gem.lettres': { label: 'Gemme L · Lettres' },
  'spell.gem.inventaire': { label: 'Gemme I · Inventaire' },
  'spell.gem.options': { label: 'Gemme O · Options' },

  // Tableau des quêtes
  'quests.board': { label: 'Tableau d’affichage en bois' },
  'quests.parchment': { label: 'Parchemin de quête (grand)' },
  'quests.scrap': { label: 'Bout de papier épinglé' },
  // 'quests.illustration.<questId>' : illustration de chaque quête

  // 05 · Talents
  'talents.background': { label: 'Fond du grimoire' },
  'talents.page': { label: 'Page de grimoire' },
  'talents.ripped-page': { label: 'Page arrachée (détail)' },
  // 'talents.illustration.<talentId>' : illustration de chaque talent

  // 06 · Fiche personnage
  'character.background': { label: 'Fond de la fiche personnage' },
  'character.hero': { label: 'Personnage en pied (vues pour rotation)' },
  'character.rune-circle': { label: 'Cercle runique' },
  'character.sheet': { label: 'Feuille inclinée' },
  // 'character.gem.<slotId>' : gemme d'équipement

  // 07 · Carte
  'map.paper': { label: 'Carte pliée' },
  'map.compass-rose': { label: 'Rose des vents' },
  // 'map.zone.<zoneId>' : illustration de zone

  // 08 · Faits d'armes
  'achievements.background': { label: 'Salle des trophées' },
  'achievements.case': { label: 'Vitrine (coffret)' },
  'achievements.velvet': { label: 'Velours' },
  'achievements.showcase': { label: 'Écrin' },
  // 'achievements.medal.<id>' : médaille de chaque fait d'armes
};

/** Sons (vides : aucun fichier n'est chargé tant que src n'est pas renseigné). */
export const sounds: Record<string, AssetEntry> = {
  'music.lute': { label: 'Musique au luth (boucle)' },
  'sfx.intro.ignite': { label: 'Ouverture · la lanterne s’allume' },
  'sfx.fire.loop': { label: 'Feu doux des braseros (boucle)' },
  'sfx.select.class': { label: 'Sélection · changement de classe' },
  'sfx.hover': { label: 'Survol d’une gemme' },
  'sfx.click': { label: 'Clic / sort lancé' },
  'sfx.unroll': { label: 'Parchemin qui se déroule' },
  'sfx.page': { label: 'Page arrachée' },
  'sfx.medal': { label: 'Médaille décrochée' },
};

export function getImage(id: string): AssetEntry {
  return images[id] ?? { label: id };
}
