# Portfolio MMO-RPG · Justine Herault

Portfolio UI/UX sous forme d'interface de MMO-RPG medieval fantasy.
Spécifications : `docs/portfolio-mmo-wireframes/` (HANDOFF.md + maquettes).

## Démo autonome

`npm run build:demo` produit `dist-demo/portfolio-demo.html`, un fichier unique consultable sans serveur, avec un menu « Démo · écrans ».

## Lancer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Parcours (routes)

| Route | Écran |
|---|---|
| `/` | 01 + 02 · Ouverture à la lanterne, puis sélection du personnage dans l'armurerie (passable, Échap ; second passage : pièce déjà éclairée) |
| `/selection` | 02 · Sélection seule |
| `/lancement` | 03 · Ancien écran de chargement (hors parcours, Jouer mène directement au lobby) |
| `/jeu` | 04 · Lobby (HUD) |
| `/jeu/talents` · `/jeu/personnage` · `/jeu/carte` · `/jeu/faits-d-armes` | 05–08, par-dessus le lobby |
| `/version-texte` | Version texte, sans jeu ni animation |

Raccourcis en jeu : **P** Personnage · **R** Réputation · **T** Talents · **F** Faits d'armes · **L** Lettres · **I** Inventaire · **O** Options · **Échap** fermer.
Origines et Objectifs (les deux autres O) s'ouvrent au clic ou au clavier (Tab).

## Où modifier quoi

- **Contenus** : `src/data/*.ts` (aucun texte en dur dans les composants). Les `[X]` sont à remplir.
- **Charte** : `src/styles/tokens.css` (couleurs, typos, rayons, ombres, mouvement).
- **Visuels et sons** : `src/data/assets.ts` + `public/assets/README.md`.
- **Découpes** (parchemin déchiré, rubans…) : `src/styles/shapes.css`.

## Accessibilité et mouvement

- Aucune parallaxe ni mouvement lié à la souris.
- `prefers-reduced-motion` et l'option « Animations réduites » posent `data-reduced-motion` sur `<html>` : boucles CSS coupées, Motion en mode réduit, texte affiché d'un coup, quête en vedette figée.
- Vrais `<button>` / `<a>`, focus visible, `aria-label` sur les éléments iconographiques, focus rendu à l'élément déclencheur à la fermeture.
