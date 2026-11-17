import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { ImageSlot } from '../../components/ImageSlot';
import type { InfoPanel as InfoPanelData } from '../../types/content';
import { useSettings } from '../../state/settingsContext';
import styles from './Parchment.module.css';

/** Parchemin « à venir » pour les sorts sans écran dédié (Origines, Réputation, Objectifs, Lettres). */
export function InfoPanel({ panel, onClose }: { panel: InfoPanelData; onClose: () => void }) {
  const { reducedMotion } = useSettings();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      className={styles.parchment}
      style={{ left: 354, bottom: 204 }}
      aria-label={panel.title}
      initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <span className={styles.roller} aria-hidden="true" />
      <ImageSlot id="lobby.scroll.paper" plain className={styles.sheet}>
        <span className={styles.kicker}>PARCHEMIN</span>
        <h2 className={styles.title}>{panel.title}</h2>
        <p className={styles.text}>{panel.text}</p>
        {panel.cta && (
          <a className={styles.cta} href={panel.cta.href}>
            {panel.cta.label}
          </a>
        )}
        <button type="button" className={styles.secondary} onClick={onClose}>
          Renrouler
        </button>
      </ImageSlot>
      <span className={styles.roller} aria-hidden="true" />
    </motion.section>
  );
}
