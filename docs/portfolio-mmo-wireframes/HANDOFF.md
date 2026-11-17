# Portfolio MMO-RPG — Justine Herault — dossier de passation

Wireframes basse fidélité (gris, Inter). Ils fixent la **structure, le contenu et les interactions**, pas la direction artistique : matières, couleurs et typographies viendront de la charte et des visuels générés.

## Comment lire les maquettes

- `maquettes/*.dc.html` : un écran par fichier, au format Claude Design. Ils dépendent du runtime du canvas (`support.js`), donc **ils ne s'ouvrent pas tels quels dans un navigateur** : les lire comme une spec (HTML + CSS inline + bloc `<script type="text/x-dc">` qui contient la logique et les données).
- Syntaxe : `{{chemin}}` = valeur calculée dans `renderVals()`, `<sc-for list as>` = boucle, `<sc-if value>` = condition, `onClick="{{fn}}"` = handler, `this.state` / `setState` = état local.
- `canvas.json` : ordre et titres des écrans.
- Version de référence en ligne : https://claude.ai/artifact/E1jgCjBYLckJPE25jGugGd (mode Play pour cliquer).

## Parcours

1. `Main` — Révélation : pages qui tournent / feuillages qui s'écartent (storyboard).
2. `CharacterSelect` — Cadran rotatif à 3 médaillons de classe (UI/UX · Développeuse · Illustratrice), fiche déchirée de la classe, sceau **DISCOVER**.
3. `Loading` — Lancement du personnage.
4. `HUD` — Lobby en jeu, scène plein écran en calques (voir détail ci-dessous).
5. `Talents` [T] — 3 arbres côte à côte sur une page de grimoire, page déchirée superposée pour le détail.
6. `Character` [P] / [I] — Fiche personnage : cercle runique de 10 gemmes d'équipement (= outils), feuilles inclinées.
7. `Map` — Carte pliée avec épingles + fiche de zone (où je travaille).
8. `Achievements` [F] — Salle des trophées : vitrine 4×3 de médailles sur velours, rareté L/E/R/C, clic = médaille posée dans l'écrin avec son certificat.
9. `BarVariants`, `HiveGlass` — Pistes explorées pour la barre de sorts (archives, ne pas implémenter).

## Lobby (HUD) — éléments validés

- **Barre de sorts PORTFOLIO** : 9 gemmes hexagonales facettées en **4 · 1 · 4**, le F seul au centre et plus gros. Touches : P Personnage, O Origines, R Réputation, T Talents, F Faits d'armes, O Objectifs, L Lettres, I Inventaire, O Options. Infobulle au survol, reflet animé sur les gemmes. Barre d'XP dessous : « Niveau X = X ans d'expérience ».
- **Options** (dernier O) : panneau avec le luth (musique on/off), Bruitages, Animations réduites.
- **Astrolabe** en haut à droite : ouvre la carte.
- **Avis de quête** : morceaux de parchemin déchirés et épinglés (Quête, Prendre contact, Disponible).
- **Besace** en bas à droite : parchemins Texte et CV qui sortent au survol et se déroulent au clic.
- **Bannière de niveau** en haut à gauche : nom, 3 classes, « Disponible ».
- **Boîte de dialogue** façon visual novel en bas à gauche, texte tapé, clic = réplique suivante ; clic sur Justine aussi.

## Règles de conception (à respecter)

- Libellés réels (classes, compétences, projets) : c'est la forme qui s'inspire de la fantasy, pas le fond.
- Medieval fantasy mature mais imaginaire (Frieren, Yona, ACOTAR, Moontown, Avowed, lobbies de gacha coréens, site de Howard Le). Ni cartoon, ni Dark Souls, **ne doit pas ressembler à WoW**.
- IHM déstructurée mais organisée : formes, calques superposés, éléments interactifs, dynamisme.
- **Aucune parallaxe ni mouvement lié à la souris.**
- Niveau = années d'expérience. Les compteurs (projets, ateliers) vivent dans les hauts faits, pas sur le HUD.
- Les valeurs entre crochets `[X]` sont à remplir avec du réel.
- Respecter `prefers-reduced-motion` et l'option « Animations réduites ».
