import { ImageSlot } from '../../components/ImageSlot';
import type { PlayerClass } from '../../types/content';
import styles from './Hooded.module.css';

export type Pose = 'back' | 'three' | 'front';
const POSES: Pose[] = ['back', 'three', 'front'];

/**
 * Silhouette encapuchonnée (avatar symbolique : on ne voit jamais le visage).
 * Trois poses en fondu enchaîné ; l'accessoire et l'emblème suivent la classe.
 */
export function Hooded({ pose, cls }: { pose: Pose; cls: PlayerClass }) {
  return (
    <div className={styles.figure}>
      {POSES.map((p) => (
        <ImageSlot
          key={p}
          id={`select.hero.${p}`}
          plain
          className={styles.pose}
          style={{ opacity: pose === p ? 1 : 0 }}
          placeholder={
            <>
              <span className={styles.cloak} />
              <span className={styles.hood} data-pose={p}>
                <span className={styles.face} data-pose={p} />
              </span>
            </>
          }
        />
      ))}
      <ImageSlot id={`select.emblem.${cls.id}`} as="span" plain className={styles.emblem} style={{ opacity: pose === 'back' ? 0 : 1 }}>
        <span>{cls.short}</span>
      </ImageSlot>
      <ImageSlot id={`select.accessory.${cls.id}`} as="span" plain className={styles.accessory} data-cls={cls.id} style={{ opacity: pose === 'back' ? 0 : 1 }} />
    </div>
  );
}
