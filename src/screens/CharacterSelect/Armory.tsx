import { ImageSlot } from '../../components/ImageSlot';
import styles from './Armory.module.css';

/** Décor : l'armurerie (un seul plan, sans parallaxe). Wireframe tant que l'illustration n'est pas fournie. */
export function Armory() {
  return (
    <ImageSlot id="select.armory" plain className={styles.armory} placeholder={
      <>
        <span className={`${styles.wall} hatch`} />
        <span className={`${styles.arch} shape-arch`} />
        {/* Râteliers d'armes */}
        <span className={styles.rack} style={{ left: 60 }}>
          {[0, 1, 2, 3].map((k) => <span key={k} className={styles.blade} style={{ left: 18 + k * 34 }} />)}
        </span>
        <span className={styles.rack} style={{ right: 60 }}>
          {[0, 1, 2, 3].map((k) => <span key={k} className={styles.blade} style={{ left: 18 + k * 34 }} />)}
        </span>
        {/* Boucliers et bannières */}
        <span className={styles.shield} style={{ left: 300, top: 120 }} />
        <span className={styles.shield} style={{ right: 300, top: 120 }} />
        <span className={styles.banner} style={{ left: 470 }} />
        <span className={styles.banner} style={{ right: 470 }} />
        <span className={styles.floor} />
        <span className={styles.label}>Armurerie · décor illustré</span>
      </>
    } />
  );
}

/** Brasero avec flamme vacillante (boucle d'ambiance, coupée en mouvement réduit). */
export function Brazier({ x, lit, delay = 0 }: { x: number; lit: boolean; delay?: number }) {
  return (
    <ImageSlot id="select.brazier" plain className={styles.brazier} style={{ left: x }}>
      <span className={styles.bowl} />
      <span className={styles.stand} />
      <span className={styles.flame} data-lit={lit} style={{ transitionDelay: `${delay}s` }} />
      <span className={styles.glow} data-lit={lit} style={{ transitionDelay: `${delay}s` }} />
    </ImageSlot>
  );
}
