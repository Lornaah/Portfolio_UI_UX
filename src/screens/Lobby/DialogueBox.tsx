import { useTypewriter } from '../../hooks/useTypewriter';
import { profile } from '../../data/profile';
import { useSettings } from '../../state/settingsContext';
import styles from './DialogueBox.module.css';

/** Boîte de dialogue façon visual novel : texte tapé, clic = réplique suivante. */
export function DialogueBox({ line, onNext }: { line: string; onNext: () => void }) {
  const { reducedMotion } = useSettings();
  const { shown } = useTypewriter(line, { enabled: !reducedMotion });
  return (
    <>
      <button type="button" className={styles.box} onClick={onNext} aria-label="Réplique suivante">
        <span className={`${styles.name} shape-slant`}>{profile.firstName.toUpperCase()}</span>
        <span className={styles.body} data-asset="lobby.dialogue.frame">
          <span className={styles.text} aria-hidden="true">
            {shown}
            <span className={styles.caret}>▌</span>
          </span>
          <span className={styles.more} aria-hidden="true">▼</span>
        </span>
      </button>
      {/* Réplique complète pour les lecteurs d'écran (pas d'annonce lettre par lettre). */}
      <span className="sr-only" aria-live="polite">{`${profile.firstName} : ${line}`}</span>
    </>
  );
}
