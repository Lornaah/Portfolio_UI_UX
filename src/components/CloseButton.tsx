import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import styles from './CloseButton.module.css';

/** Bouton ✕ rond qui ramène au lobby. */
export function CloseButton({ to = '/jeu', size = 60, style }: { to?: string; size?: number; style?: CSSProperties }) {
  return (
    <Link to={to} className={styles.close} aria-label="Fermer et revenir au lobby" style={{ width: size, height: size, ...style }}>
      <span aria-hidden="true">✕</span>
    </Link>
  );
}
