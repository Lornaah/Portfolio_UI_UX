/** Identité, niveau et disponibilité. Les valeurs [X] restent à remplir. */
export const profile = {
  firstName: 'Justine',
  fullName: 'Justine Herault',
  classesLine: 'UI/UX Designer · Développeuse · Illustratrice',
  classesLineLower: 'UI/UX designer, développeuse, illustratrice',
  /** Niveau = années d'expérience. */
  level: '[X]',
  yearsOfExperience: '[X]',
  /** Remplissage de la barre d'XP (0 → 1). */
  xpProgress: 0.68,
  availability: {
    status: 'Disponible',
    detail: '[mission / poste]',
    since: '[à partir de…]',
  },
  base: 'Pau',
  baseLabel: 'Pau · camp de base',
  email: '[X]',
  cvHref: '/assets/docs/cv.pdf',
} as const;

export const levelLine = `Niveau ${profile.level} = ${profile.yearsOfExperience} ans d'expérience`;

export const mailto = `mailto:${profile.email}`;
