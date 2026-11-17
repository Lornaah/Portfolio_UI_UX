# Visuels et sons à fournir

Chaque élément illustré porte un attribut `data-asset="…"` dans le DOM et pointe vers une entrée de `src/data/assets.ts`.
Tant que `src` est vide, l'emplacement s'affiche en wireframe (hachure grise ou aplats).

**Pour brancher un visuel** : déposer le fichier ici (ex. `public/assets/images/lobby/hero.png`), puis renseigner `src: '/assets/images/lobby/hero.png'` (et `alt` si l'image porte du sens) dans `src/data/assets.ts`.

Astuce : dans la console du navigateur, `document.querySelectorAll('[data-asset-status=missing]')` liste les emplacements encore vides de l'écran courant.

| Identifiant | Élément |
|---|---|
| `reveal.cover` | Couverture / feuilles empilées, nom au centre |
| `reveal.leaf-left` | Battant gauche (feuille / page) |
| `reveal.leaf-right` | Battant droit (feuille / page) |
| `reveal.layer.back` | Calque fond |
| `reveal.layer.mid` | Calque décor |
| `reveal.layer.front` | Calque avant-plan |
| `select.background` | Fond de la sélection |
| `select.nameplate` | Lettrage du nom |
| `select.dial` | Cadran rotatif |
| `select.hero.uiux` | Justine en pied · tenue UI/UX Designer |
| `select.hero.dev` | Justine en pied · tenue Développeuse |
| `select.hero.illu` | Justine en pied · tenue Illustratrice |
| `select.medallion.uiux` | Médaillon UI/UX |
| `select.medallion.dev` | Médaillon DEV |
| `select.medallion.illu` | Médaillon ILLU |
| `select.sheet` | Fiche déchirée (papier) |
| `select.seal` | Sceau DISCOVER |
| `launch.illustration` | Illustration de la zone de départ |
| `launch.portrait` | Portrait de la classe choisie |
| `lobby.layer.sky` | Calque 1 · ciel, lune, nuages |
| `lobby.layer.mountains` | Calque 2 · montagnes |
| `lobby.layer.hills` | Calque 3 · collines et décor |
| `lobby.layer.ground` | Calque 4 · sol |
| `lobby.layer.foreground` | Calque 5 · avant-plan (feuillages) |
| `lobby.decor.left` | Décor gauche |
| `lobby.decor.right` | Décor droit (arche) |
| `lobby.hero` | Justine, en grand au premier plan (respire, cligne, cheveux et tissu animés) |
| `lobby.level-banner` | Bannière de niveau |
| `lobby.astrolabe` | Astrolabe suspendu |
| `lobby.astrolabe.map` | Mini-carte de l’astrolabe |
| `lobby.notice.paper` | Papier des avis de quête |
| `lobby.notice.quest-thumb` | Vignette de la quête en vedette |
| `lobby.toast.icon` | Icône du haut fait débloqué |
| `lobby.dialogue.frame` | Cadre de la boîte de dialogue |
| `lobby.spellbar.frame` | Monture de la barre de sorts |
| `lobby.satchel` | Besace |
| `lobby.scroll` | Parchemin roulé |
| `lobby.scroll.paper` | Parchemin déroulé |
| `lobby.options.frame` | Cadre du panneau Options |
| `lobby.options.lute` | Luth du troubadour |
| `spell.gem.personnage` | Gemme P · Personnage |
| `spell.gem.origines` | Gemme O · Origines |
| `spell.gem.reputation` | Gemme R · Réputation |
| `spell.gem.talents` | Gemme T · Talents |
| `spell.gem.faits-d-armes` | Gemme F · Faits d’armes |
| `spell.gem.objectifs` | Gemme O · Objectifs |
| `spell.gem.lettres` | Gemme L · Lettres |
| `spell.gem.inventaire` | Gemme I · Inventaire |
| `spell.gem.options` | Gemme O · Options |
| `talents.background` | Fond du grimoire |
| `talents.page` | Page de grimoire |
| `talents.ripped-page` | Page arrachée (détail) |
| `character.background` | Fond de la fiche personnage |
| `character.hero` | Personnage en pied (vues pour rotation) |
| `character.rune-circle` | Cercle runique |
| `character.sheet` | Feuille inclinée |
| `map.paper` | Carte pliée |
| `map.compass-rose` | Rose des vents |
| `achievements.background` | Salle des trophées |
| `achievements.case` | Vitrine (coffret) |
| `achievements.velvet` | Velours |
| `achievements.showcase` | Écrin |
| `music.lute` | Musique au luth (boucle) |
| `sfx.hover` | Survol d’une gemme |
| `sfx.click` | Clic / sort lancé |
| `sfx.unroll` | Parchemin qui se déroule |
| `sfx.page` | Page arrachée |
| `sfx.medal` | Médaille décrochée |

## Identifiants dynamiques (un par élément de contenu)

| Modèle | Élément |
|---|---|
| `achievements.medal.<id>` | Médaille de chaque fait d'armes (`src/data/achievements.ts`) |
| `talents.illustration.<talentId>` | Illustration de chaque talent ou branche (`src/data/talents.ts`) |
| `character.gem.<slotId>` | Gemme d'équipement (`src/data/character.ts`) |
| `map.zone.<zoneId>` | Illustration de zone (`src/data/zones.ts`) |

## Documents

- `docs/cv.pdf` : CV téléchargeable (lien défini dans `src/data/profile.ts`).
