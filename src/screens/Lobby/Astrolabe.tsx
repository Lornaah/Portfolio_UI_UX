import { Link } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { astrolabe } from '../../data/lobby';
import styles from './Astrolabe.module.css';

/** Astrolabe suspendu (haut droite) : ouvre la carte. Balancier et anneau en rotation lente. */
export function Astrolabe() {
  return (
    <Link to="/jeu/carte" className={styles.astro} aria-label="Ouvrir la carte du monde">
      <span className={styles.pendulum} aria-hidden="true">
        <span className={styles.chain} />
        <span className={styles.hook} />
        <ImageSlot id="lobby.astrolabe" as="span" plain className={styles.dial}>
          <span className={styles.ring}>
            <span className={styles.ringFace} />
            <span className={styles.ticks} />
            <span className={`${styles.cardinal} ${styles.n}`}>N</span>
            <span className={`${styles.cardinal} ${styles.s}`}>S</span>
            <span className={`${styles.cardinal} ${styles.e}`}>E</span>
            <span className={`${styles.cardinal} ${styles.o}`}>O</span>
          </span>
          <ImageSlot id="lobby.astrolabe.map" as="span" className={styles.mini}>
            <span className={styles.mpin} style={{ left: 22, top: 30 }} />
            <span className={styles.mpin} style={{ left: 74, top: 22, transitionDelay: '.08s' }} />
            <span className={styles.mpin} style={{ left: 70, top: 78, transitionDelay: '.16s' }} />
          </ImageSlot>
          <span className={`${styles.needle} shape-star4`} />
          <span className={styles.blip} />
          <span className={styles.knob} />
        </ImageSlot>
        <span className={styles.place}>{astrolabe.place}</span>
        <span className={styles.hint}>{astrolabe.hint}</span>
      </span>
    </Link>
  );
}
