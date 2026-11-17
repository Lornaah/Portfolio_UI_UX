import { useEffect, useState, type ReactNode } from 'react';
import styles from './Stage.module.css';

const W = 1440;
const H = 900;

/**
 * Scène fixe 1440×900 (format des maquettes), mise à l'échelle pour tenir
 * dans la fenêtre. Pas de responsive dans cette première passe.
 */
export function Stage({ children }: { children: ReactNode }) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return (
    <div className={styles.viewport}>
      <div className={styles.stage} style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
