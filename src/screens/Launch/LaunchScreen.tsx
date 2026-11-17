import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { classes } from '../../data/classes';
import { launchCopy } from '../../data/screens';
import { loadingTip } from '../../data/spells';
import { useSettings } from '../../state/settingsContext';
import { preloadGame } from '../lazy';
import styles from './Launch.module.css';

const DURATION = 1800;

/**
 * 03 · Lancement (1,5 à 2 s) : précharge les fenêtres du jeu.
 * Le portrait de la classe choisie zoome puis part vers la bannière de niveau du lobby.
 */
export function LaunchScreen() {
  const navigate = useNavigate();
  const { chosenClass, reducedMotion } = useSettings();
  const cls = classes.find((c) => c.id === chosenClass) ?? classes[0];
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const done = progress >= 100 && loaded;

  useEffect(() => {
    preloadGame().finally(() => setLoaded(true));
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = window.setTimeout(() => navigate('/jeu', { replace: true }), reducedMotion ? 0 : 450);
    return () => window.clearTimeout(t);
  }, [done, navigate, reducedMotion]);

  return (
    <main className={styles.screen} aria-label="Lancement">
      <ImageSlot id="launch.illustration" className={styles.bg} />
      <div className={styles.titleBox}>
        <span className={styles.kicker}>{launchCopy.kicker}</span>
        <span className={styles.title}>{launchCopy.title}</span>
      </div>

      <motion.div
        className={styles.portraitWrap}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={done ? { x: -620, y: -330, scale: 0.2, opacity: 0 } : { scale: 1.1, opacity: 1 }}
        transition={done ? { duration: 0.45, ease: [0.5, 0, 0.75, 0] } : { duration: DURATION / 1000, ease: 'easeOut' }}
      >
        <ImageSlot id="launch.portrait" className={`${styles.portrait} shape-arch`} showLabel label={`Portrait · ${cls.name}`} />
      </motion.div>

      <p className={styles.tip}>
        {loadingTip.before}
        <b>{loadingTip.word}</b>
        {loadingTip.after}
        {loadingTip.keys.map((k) => (
          <span key={k.key}>
            <b>{k.key}</b>
            {k.text}
          </span>
        ))}
      </p>

      <div className={styles.progressWrap}>
        <div
          className={styles.track}
          role="progressbar"
          aria-label="Chargement du monde"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.progressLabel} aria-hidden="true">{launchCopy.progress(progress)}</span>
      </div>

      <Link to="/jeu" replace className={styles.enter}>{launchCopy.enter}</Link>
    </main>
  );
}
