import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { profile } from '../../data/profile';
import { revealCopy } from '../../data/screens';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useSettings } from '../../state/settingsContext';
import styles from './Reveal.module.css';

const SEEN_KEY = 'portfolio-mmo.revealed';
const EASE = [0.2, 0.8, 0.2, 1] as const;

function wasSeen() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * 01 · Révélation (3 à 4 s, passable à tout moment) :
 * 0 s fermé → 0,6 s les battants s'écartent → 1,5 s le décor se pose calque par calque
 * (entrées successives, sans parallaxe) → 3 s la sélection prend le relais.
 * Second passage : directement à la sélection. Mouvement réduit : fondu de 300 ms.
 */
export function RevealScreen() {
  const navigate = useNavigate();
  const { reducedMotion, music, setMusic } = useSettings();
  const [phase, setPhase] = useState(0);
  const [seen] = useState(wasSeen);

  const finish = () => {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* ignore */
    }
    navigate('/selection', { replace: true });
  };

  useEffect(() => {
    if (seen) {
      navigate('/selection', { replace: true });
      return;
    }
    if (reducedMotion) {
      const t = window.setTimeout(finish, 300);
      return () => window.clearTimeout(t);
    }
    const timers = [
      window.setTimeout(() => setPhase(1), 600),
      window.setTimeout(() => setPhase(2), 1500),
      window.setTimeout(finish, 3400),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
    // Séquence jouée une seule fois au montage.
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useHotkeys({ Escape: finish });

  if (seen) return null;

  return (
    <motion.main
      className={styles.screen}
      aria-label="Ouverture"
      animate={reducedMotion ? { opacity: 0 } : undefined}
      transition={{ duration: 0.3 }}
    >
      {/* Décor : trois calques qui se posent l'un après l'autre */}
      <div className={styles.scene} aria-hidden="true">
        {(['back', 'mid', 'front'] as const).map((layer, k) => (
          <motion.div
            key={layer}
            className={`${styles.layer} ${styles[layer]}`}
            initial={{ opacity: 0, y: 40 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: k * 0.35, ease: EASE }}
          >
            <ImageSlot id={`reveal.layer.${layer}`} plain={layer !== 'back'} className={styles.layerArt} />
          </motion.div>
        ))}
      </div>

      {/* Battants */}
      <div className={styles.leaves} aria-hidden="true">
        <motion.div
          className={`${styles.leaf} ${styles.leafLeft}`}
          animate={phase >= 1 ? { rotateY: 105, opacity: 0 } : { rotateY: 0 }}
          transition={{ duration: 0.9, ease: EASE, opacity: { delay: 0.6, duration: 0.3 } }}
        >
          <ImageSlot id="reveal.leaf-left" plain className={styles.leafArt} />
        </motion.div>
        <motion.div
          className={`${styles.leaf} ${styles.leafRight}`}
          animate={phase >= 1 ? { rotateY: -105, opacity: 0 } : { rotateY: 0 }}
          transition={{ duration: 0.9, ease: EASE, opacity: { delay: 0.6, duration: 0.3 } }}
        >
          <ImageSlot id="reveal.leaf-right" plain className={styles.leafArt} />
        </motion.div>
      </div>

      {/* Couverture : le nom au centre, légère respiration */}
      <motion.div
        className={styles.cover}
        animate={phase >= 1 ? { opacity: 0, scale: 1.08 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <ImageSlot id="reveal.cover" plain className={styles.coverArt}>
          <h1 className={styles.title}>{profile.fullName}</h1>
        </ImageSlot>
      </motion.div>

      <button
        type="button"
        className={styles.sound}
        title={music ? revealCopy.soundOn : revealCopy.soundOff}
        aria-pressed={music}
        aria-label={music ? revealCopy.soundOn : revealCopy.soundOff}
        onClick={() => setMusic(!music)}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {music ? <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9l5 6M21 9l-5 6" />}
        </svg>
      </button>
      <button type="button" className={styles.skip} onClick={finish}>
        {revealCopy.skip} <span aria-hidden="true">→</span>
      </button>
    </motion.main>
  );
}
