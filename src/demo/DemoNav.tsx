import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './DemoNav.module.css';

const SCREENS = [
  { to: '/', label: '01 · Révélation', replay: true },
  { to: '/selection', label: '02 · Sélection du personnage' },
  { to: '/lancement', label: '03 · Lancement' },
  { to: '/jeu', label: '04 · Lobby (HUD)' },
  { to: '/jeu/talents', label: '05 · Talents' },
  { to: '/jeu/personnage', label: '06 · Fiche personnage' },
  { to: '/jeu/carte', label: '07 · Carte' },
  { to: '/jeu/faits-d-armes', label: '08 · Faits d’armes' },
  { to: '/version-texte', label: 'Version texte' },
];

/** Menu de la démo uniquement : saute directement à n'importe quel écran du parcours. */
export function DemoNav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.toggle} aria-expanded={open} aria-controls="demo-nav-list" onClick={() => setOpen((o) => !o)}>
        Démo · écrans <span aria-hidden="true">{open ? '▴' : '▾'}</span>
      </button>
      {open && (
        <ul id="demo-nav-list" className={styles.list}>
          {SCREENS.map((s) => (
            <li key={s.to}>
              <button
                type="button"
                className={styles.item}
                aria-current={pathname === s.to ? 'page' : undefined}
                onClick={() => {
                  if (s.replay) {
                    try {
                      localStorage.removeItem('portfolio-mmo.revealed');
                    } catch {
                      /* ignore */
                    }
                  }
                  setOpen(false);
                  navigate(s.to);
                }}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
