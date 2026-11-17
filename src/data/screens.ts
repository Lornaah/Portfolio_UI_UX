/** Textes des écrans d'ouverture (Révélation, Sélection, Lancement). */
export const revealCopy = {
  skip: 'Passer',
  soundOn: 'Couper le son',
  soundOff: 'Activer le son',
};

export const selectCopy = {
  nameplateHint: 'Lettrage du nom',
  sheetKicker: (pos: number, total: number) => `CLASSE ${pos} / ${total}`,
  talentsKicker: 'TALENTS PHARES',
  questsKicker: 'QUÊTES MISES EN AVANT',
  prev: 'Tourner le cadran vers la classe précédente',
  next: 'Tourner le cadran vers la classe suivante',
  seal: 'DISCOVER',
  sealHint: 'sceau · Entrée',
  sealAria: 'Discover : entrer dans le monde',
  quickLinks: { text: 'Version texte', cv: 'CV', sound: 'Son' },
};

export const launchCopy = {
  kicker: 'Écran de chargement',
  title: 'Illustration de la zone de départ',
  progress: (n: number) => `Chargement du monde… ${n} %`,
  enter: 'Entrer en jeu →',
};
