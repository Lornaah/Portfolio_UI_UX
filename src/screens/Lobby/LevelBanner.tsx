import { ImageSlot } from '../../components/ImageSlot';
import { profile } from '../../data/profile';
import styles from './LevelBanner.module.css';

/** Bannière de niveau (haut gauche). Niveau = années d'expérience. */
export function LevelBanner() {
  return (
    <ImageSlot id="lobby.level-banner" plain className={styles.banner}>
      <div className={styles.badge} aria-hidden="true">
        <span className={styles.niv}>NIV.</span>
        <span className={styles.level}>{profile.level}</span>
        <span className={styles.tip} />
      </div>
      <div className={`${styles.ribbon} shape-ribbon`}>
        <span className={styles.name}>{profile.fullName}</span>
        <span className="sr-only">Niveau {profile.level}, soit {profile.yearsOfExperience} ans d’expérience.</span>
        <span className={styles.classes}>{profile.classesLine}</span>
        <span className={styles.status}>
          <span aria-hidden="true">● </span>
          {profile.availability.status} · {profile.availability.detail}
        </span>
      </div>
    </ImageSlot>
  );
}
