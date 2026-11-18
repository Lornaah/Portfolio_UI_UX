import { ImageSlot } from '../../components/ImageSlot';
import styles from './Lantern.module.css';

/** Lanterne (wireframe) : anneau, chapeau, verre, socle ; flamme et halo quand elle est allumée. */
export function Lantern({ lit }: { lit: boolean }) {
  return (
    <ImageSlot id="intro.lantern" plain className={styles.lantern}>
      <span className={styles.halo} data-lit={lit} />
      <span className={styles.ring} />
      <span className={styles.cap} />
      <span className={styles.glass}>
        <ImageSlot id="intro.flame" as="span" plain className={styles.flame} data-lit={lit} />
      </span>
      <span className={styles.base} />
    </ImageSlot>
  );
}

/** Main qui tient la lanterne par l'anneau, venant du bas de l'écran. */
export function Hand() {
  return (
    <ImageSlot id="intro.hand" plain className={styles.hand} placeholder={
      <>
        <span className={styles.arm} />
        <span className={styles.fist} />
        <span className={styles.thumb} />
        {[0, 1, 2, 3].map((k) => <span key={k} className={styles.finger} style={{ top: 30 + k * 22 }} />)}
      </>
    } />
  );
}
