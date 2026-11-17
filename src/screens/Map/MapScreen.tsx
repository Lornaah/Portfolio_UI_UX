import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import { defaultZoneId, mapMeta, zones } from '../../data/zones';
import { useSettings } from '../../state/settingsContext';
import styles from './Map.module.css';

/** 07 · Carte : carte pliée qui se déplie pli par pli, épingles, fiche de zone. */
export function MapScreen() {
  const { reducedMotion } = useSettings();
  const [zoneId, setZoneId] = useState(defaultZoneId);
  const cur = zones.find((z) => z.id === zoneId) ?? zones[0];

  return (
    <div className={styles.screen}>
      <div className={styles.mapWrap}>
        <motion.div
          className={styles.map}
          initial={reducedMotion ? false : { clipPath: 'inset(0% 66.6% 50% 0%)' }}
          animate={reducedMotion ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: ['inset(0% 66.6% 50% 0%)', 'inset(0% 66.6% 0% 0%)', 'inset(0% 33.3% 0% 0%)', 'inset(0% 0% 0% 0%)'] }}
          transition={{ duration: 0.9, times: [0, 0.33, 0.66, 1], ease: 'easeOut' }}
        >
          <ImageSlot id="map.paper" className={styles.paper} />
          <span className={styles.foldV} style={{ left: '33.3%' }} aria-hidden="true" />
          <span className={styles.foldV} style={{ left: '66.6%' }} aria-hidden="true" />
          <span className={styles.foldH} aria-hidden="true" />
          <h2 className={styles.title}>{mapMeta.title}</h2>
          <ImageSlot id="map.compass-rose" plain className={styles.rose}>
            <span aria-hidden="true">{mapMeta.compassRose}</span>
          </ImageSlot>
          <ul className={styles.pins} aria-label="Zones">
            {zones.map((z, i) => (
              <li key={z.id}>
                <motion.button
                  type="button"
                  className={styles.zone}
                  style={{ left: z.x, top: z.y }}
                  aria-pressed={z.id === zoneId}
                  onClick={() => setZoneId(z.id)}
                  initial={reducedMotion ? false : { opacity: 0, y: -40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95 + i * 0.1, duration: 0.4, ease: [0.3, 1.4, 0.5, 1] }}
                >
                  <span className={`${styles.pin} shape-pin`} aria-hidden="true" />
                  <span className={styles.zoneName}>{z.name}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.section
          key={cur.id}
          className={styles.card}
          aria-label="Fiche de zone"
          aria-live="polite"
          initial={{ opacity: 0, y: -24, rotate: 7 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          exit={{ opacity: 0, transition: { duration: 0.12 } }}
          transition={{ duration: 0.35, ease: [0.3, 1.4, 0.5, 1] }}
        >
          <span className={styles.cardPin} aria-hidden="true" />
          <span className={styles.kicker}>{mapMeta.zoneKicker}</span>
          <h3 className={styles.cardTitle}>{cur.name}</h3>
          <p className={styles.text}>{cur.desc}</p>
          <ImageSlot id={`map.zone.${cur.id}`} className={styles.zoneImg} />
          <span className={styles.kicker}>{mapMeta.questsKicker}</span>
          <p className={styles.text}>{cur.quests}</p>
          <Link to="/jeu/faits-d-armes" className={styles.cta}>{mapMeta.cta}</Link>
        </motion.section>
      </AnimatePresence>

      <CloseButton size={64} style={{ right: 36, top: 36 }} />
    </div>
  );
}
