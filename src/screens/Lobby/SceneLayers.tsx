import { ImageSlot } from '../../components/ImageSlot';
import styles from './SceneLayers.module.css';

/**
 * Scène en 5 calques superposés (ciel → avant-plan). Chaque calque est un
 * emplacement d'image ; tant qu'il est vide, on dessine les aplats du wireframe.
 * Aucun calque ne bouge avec la souris.
 */
export function SceneLayers({ onTalk }: { onTalk: () => void }) {
  return (
    <div className={styles.scene}>
      <ImageSlot id="lobby.layer.sky" plain className={styles.layer} placeholder={
        <>
          <span className={styles.moon} />
          <span className={styles.cloud} style={{ top: 150, width: 220, height: 44, opacity: 0.8 }} />
          <span className={styles.cloud} style={{ top: 250, width: 150, height: 32, opacity: 0.6, animationDelay: '-18s' }} />
        </>
      } />
      <ImageSlot id="lobby.layer.mountains" plain className={styles.layer} placeholder={<span className={`${styles.mountains} shape-mountains`} />} />
      <ImageSlot id="lobby.layer.hills" plain className={styles.layer} placeholder={<span className={`${styles.hills} shape-hills`} />}>
        <ImageSlot id="lobby.decor.left" className={styles.decorLeft} />
        <ImageSlot id="lobby.decor.right" className={`${styles.decorRight} shape-arch`} />
        <span className={styles.sceneNote}>Scène de jeu en plein écran · illustrée, en calques</span>
      </ImageSlot>
      <ImageSlot id="lobby.layer.ground" plain className={styles.layer} placeholder={<span className={styles.ground} />}>
        <button type="button" className={styles.hero} onClick={onTalk} aria-label="Parler à Justine">
          <ImageSlot
            id="lobby.hero"
            as="span"
            plain
            className={`${styles.heroArt} shape-arch`}
            showLabel
            label={<>Justine, en grand au premier plan<br />respire, cligne, cheveux et tissu animés</>}
          />
        </button>
      </ImageSlot>
      <ImageSlot id="lobby.layer.foreground" plain className={`${styles.layer} ${styles.foreground}`} placeholder={
        <>
          <span className={styles.bush} style={{ left: -90, top: 600, width: 190, height: 190 }} />
          <span className={styles.bush} style={{ right: -90, top: 660, width: 200, height: 200 }} />
        </>
      }>
        <span className={styles.mote} style={{ left: 300, top: 700, animationDelay: '0s' }} />
        <span className={styles.mote} style={{ left: 900, top: 640, animationDelay: '2.4s' }} />
        <span className={styles.mote} style={{ left: 1100, top: 700, animationDelay: '3.1s' }} />
        <span className={styles.mote} style={{ left: 380, top: 520, animationDelay: '5.3s' }} />
      </ImageSlot>
    </div>
  );
}
