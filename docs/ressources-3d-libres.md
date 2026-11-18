# Ressources libres de droit pour l'armurerie et l'ouverture

Repérées le 18/11/2026. Vérifier la licence sur la page de chaque fichier avant usage :
elle est fixée par chaque auteur et peut changer.

## Modèles 3D (CC0, usage commercial autorisé, sans attribution obligatoire)

| Besoin | Ressource | Formats | Remarque |
|---|---|---|---|
| Armurerie : armes, coffres, tonneaux, mobilier, potions | [Quaternius · Fantasy Props MegaKit](https://quaternius.com/packs/fantasypropsmegakit.html) | glTF, FBX, OBJ | 200+ props médiévaux ; 60-70 % gratuits, le reste via Patreon (CC0 aussi) |
| Râteliers d'armes | [Quaternius · LowPoly Medieval Weapons](https://quaternius.itch.io/lowpoly-medieval-weapons) | FBX, OBJ, Blend | 22 armes, prix libre |
| Murs, voûtes, torches, donjon | [Kenney · Modular Dungeon Kit](https://opengameart.org/content/modular-dungeon-kit) · [Kenney · Castle Kit](https://opengameart.org/content/castle-kit) · [Kenney · Retro Fantasy Kit](https://kenney.nl/assets/retro-fantasy-kit) | glTF, FBX, OBJ | pièces modulaires qui s'emboîtent |
| Silhouette encapuchonnée | [Quaternius · Modular Character Outfits - Fantasy](https://quaternius.com/packs/modularcharacteroutfitsfantasy.html) | glTF, FBX, Blend | personnages animés ; vérifier qu'une capuche ou une cape figure dans le pack |
| Lanterne | [OpenGameArt · Low poly lantern](https://opengameart.org/content/low-poly-lantern-game-asset) | OBJ | CC0 annoncé, à vérifier sur la page |
| Main | [BlendSwap · Low Poly Hand (Rigged)](https://www.blendswap.com/blend/2429) | .blend | CC0, de 2011 : vérifier qu'il s'ouvre dans Blender actuel ; compte BlendSwap requis |

## Textures (CC0)

- [ambientCG](https://ambientcg.com) : pierre, bois, métal, plus de 2 000 matières PBR.
- [Poly Haven](https://polyhaven.com) : bois et pierre, PBR complets.

## Sons

| Besoin | Ressource | Licence |
|---|---|---|
| Feu de cheminée en boucle | [OpenGameArt · fireplace sound loop](https://opengameart.org/content/fireplace-sound-loop) | CC0 annoncé |
| Crépitements | [OpenGameArt · fire crackling](https://opengameart.org/content/fire-crackling) | CC0 |
| Feu de camp en boucle | [Freesound · HECKFRICKER #729395](https://freesound.org/people/HECKFRICKER/sounds/729395) | licence à vérifier |

## Attention au style

Quaternius et Kenney sont en low-poly stylisé. Le HANDOFF demande « ni cartoon » :
ces modèles sont parfaits pour prototyper la mise en scène et la lumière, moins pour le rendu final.

## Deux façons de les utiliser

1. **Rendu en images** : composer la scène dans Blender, puis exporter le décor et les poses
   en PNG ou WebP, branchés dans `src/data/assets.ts` (aucun changement de code).
2. **3D directement dans le navigateur (sans Blender)** : charger les fichiers glTF avec three.js.
   La lanterne devient une vraie lumière qui éclaire la pièce en temps réel. Ça impose un `<canvas>`,
   un fichier plus lourd et une alternative pour l'accessibilité et le mouvement réduit.
