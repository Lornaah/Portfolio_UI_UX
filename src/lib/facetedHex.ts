/**
 * Géométrie des gemmes hexagonales facettées (reprise de la maquette HUD / Faits d'armes).
 * Renvoie des tracés SVG : 3 groupes de facettes (lumière, mi-teinte, ombre),
 * la table (hexagone intérieur), le contour, et pour la grosse gemme un anneau de taille.
 */
export interface HexGemPaths {
  facetA: string;
  facetB: string;
  facetC: string;
  table: string;
  outline: string;
  ring: string;
}

type Pt = [number, number];
const f1 = (n: number) => n.toFixed(1);
const pt = (q: Pt) => `${f1(q[0])} ${f1(q[1])}`;
/** Répartition des 6 facettes dans les 3 teintes. */
const SHADE = [0, 1, 2, 1, 0, 2];

export function hexGem(w: number, h: number, { table = 0.54, padY = 0, ring = false } = {}): HexGemPaths {
  const V: Pt[] = [
    [w * 0.25, h * padY],
    [w * 0.75, h * padY],
    [w, h / 2],
    [w * 0.75, h * (1 - padY)],
    [w * 0.25, h * (1 - padY)],
    [0, h / 2],
  ];
  const cx = w / 2;
  const cy = h / 2;
  const scale = (k: number) => V.map((v): Pt => [cx + (v[0] - cx) * k, cy + (v[1] - cy) * k]);
  const I = scale(table);
  const facets = ['', '', ''];
  for (let m = 0; m < 6; m++) {
    const m2 = (m + 1) % 6;
    facets[SHADE[m]] += `M${pt(V[m])}L${pt(V[m2])}L${pt(I[m2])}L${pt(I[m])}Z `;
  }
  let ringPath = '';
  if (ring) {
    ringPath = `M${scale(0.74).map(pt).join('L')}Z `;
    for (let q = 0; q < 6; q++) ringPath += `M${pt(V[q])}L${pt(I[q])} `;
  }
  return {
    facetA: facets[0],
    facetB: facets[1],
    facetC: facets[2],
    table: `M${I.map(pt).join('L')}Z`,
    outline: `M${V.map(pt).join('L')}Z`,
    ring: ringPath,
  };
}
