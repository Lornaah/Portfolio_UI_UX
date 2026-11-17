import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageSlot } from '../../components/ImageSlot';
import { toast } from '../../data/lobby';
import styles from './AchievementToast.module.css';

const SEEN_KEY = 'portfolio-mmo.toast-explorer';

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/** « Haut fait débloqué » : une seule fois par visite (la maquette le répétait toutes les 14 s). */
export function AchievementToast() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (alreadySeen()) return;
    const show = window.setTimeout(() => {
      setVisible(true);
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        /* ignore */
      }
    }, 3000);
    const hide = window.setTimeout(() => setVisible(false), 7500);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  return (
    <div className={styles.region} role="status">
      <AnimatePresence>
        {visible && (
          <motion.div
            className={styles.toast}
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ImageSlot id="lobby.toast.icon" as="span" plain className={styles.icon} />
            <span className={styles.text}>
              <span className={styles.kicker}>{toast.kicker}</span>
              <span className={styles.title}>{toast.title}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
