/** Textes des écrans d'ouverture (Révélation, Sélection, Lancement). */
/** Ouverture : la lanterne qui allume l'écran de sélection. */
export const introCopy = {
  light: 'Allumer la lanterne',
  pressKey: 'ou appuyez sur une touche',
  skip: 'Passer l’introduction',
  soundOn: 'Couper le son',
  soundOff: 'Activer le son',
};

/** 02 · Sélection du personnage (armurerie). */
export const selectCopy = {
  kicker: 'SÉLECTION DU PERSONNAGE',
  title: 'Choisis ta classe',
  listLabel: 'Classes',
  chosen: 'Choisie',
  hint: '← → changer de classe · Entrée pour jouer',
  nameplateHint: 'Lettrage du nom',
  sheetKicker: (pos: number, total: number) => `CLASSE ${pos} / ${total}`,
  talentsKicker: 'TALENTS PHARES',
  questsKicker: 'QUÊTES MISES EN AVANT',
  prev: 'Classe précédente',
  next: 'Classe suivante',
  play: 'Jouer',
  playHint: 'Entrée',
  quickLinks: { text: 'Version texte', cv: 'CV', sound: 'Son' },
  silhouetteAria: (name: string) => `Personnage encapuchonné, classe ${name}`,
};

export const launchCopy = {
  kicker: 'Écran de chargement',
  title: 'Illustration de la zone de départ',
  progress: (n: number) => `Chargement du monde… ${n} %`,
  enter: 'Entrer en jeu →',
};
