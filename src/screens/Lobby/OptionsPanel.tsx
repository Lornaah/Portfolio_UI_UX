import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ImageSlot } from '../../components/ImageSlot';
import { Switch } from '../../components/Switch';
import { useSettings } from '../../state/settingsContext';
import styles from './OptionsPanel.module.css';

/** Panneau Options (dernier O) : luth (musique), bruitages, animations réduites. */
export function OptionsPanel({ onClose }: { onClose: () => void }) {
  const { music, setMusic, sfx, setSfx, calm, setCalm } = useSettings();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);

  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      id="options-panel"
      className={styles.panel}
      aria-label="Options"
      data-asset="lobby.options.frame"
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 30 }}
      transition={{ duration: 0.3, ease: [0.3, 1.4, 0.5, 1] }}
    >
      <span className={styles.arrow} aria-hidden="true" />
      <div className={styles.head}>
        <h2 className={styles.title}>OPTIONS</h2>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fermer les options">
          <span aria-hidden="true">✕</span>
        </button>
      </div>

      <button
        type="button"
        className={styles.lute}
        aria-pressed={music}
        aria-label={music ? 'Couper la musique' : 'Jouer la musique'}
        onClick={() => setMusic(!music)}
      >
        <ImageSlot id="lobby.options.lute" as="span" plain className={styles.luteArt} placeholder={
          <span className={styles.luteBody}>
            <span className={styles.lHead} />
            <span className={styles.lNeck} />
            <span className={styles.lBowl} />
            <span className={styles.lRose} />
            <span className={styles.lBridge} />
            <span className={styles.lStrings} data-on={music}><span /></span>
          </span>
        }>
          {music && (
            <span aria-hidden="true">
              <span className={styles.note} style={{ left: 56, top: 40, animationDelay: '0s' }}>♪</span>
              <span className={styles.note} style={{ left: 66, top: 64, animationDelay: '.8s' }}>♫</span>
              <span className={styles.note} style={{ left: 46, top: 26, animationDelay: '1.6s' }}>♪</span>
            </span>
          )}
        </ImageSlot>
        <span className={styles.luteKicker}>LUTH DU TROUBADOUR</span>
        <span className={styles.luteLabel}>{music ? 'Musique en cours' : 'Jouer la musique'}</span>
        <span className={styles.luteHint}>Pincez les cordes pour lancer ou couper la musique.</span>
      </button>

      <Switch label="Bruitages" checked={sfx} onChange={setSfx} />
      <Switch label="Animations réduites" checked={calm} onChange={setCalm} />
      <span className={styles.hint}>Touche O ou clic sur la gemme : ouvrir, fermer</span>
    </motion.section>
  );
}
