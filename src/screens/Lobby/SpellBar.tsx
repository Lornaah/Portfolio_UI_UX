import { levelLine, profile } from '../../data/profile';
import { spells } from '../../data/spells';
import type { Popover } from './GameLayout';
import styles from './SpellBar.module.css';
import { SpellGem, type GemLayout } from './SpellGem';

/** Disposition 4 · 1 · 4 (px dans la barre de 732×160), reprise de la maquette. */
function layout(i: number): GemLayout {
  if (i === 4) return { x: 304, y: -12, w: 124, h: 112 };
  const n = i < 4 ? i : i - 5;
  return { x: (i < 4 ? 0 : 450) + n * 66, y: n % 2 ? 38 : 0, w: 84, h: 76 };
}

interface SpellBarProps {
  popover: Popover;
  onPopover: (p: Exclude<Popover, null>) => void;
}

export function SpellBar({ popover, onPopover }: SpellBarProps) {
  return (
    <nav className={styles.bar} aria-label="Barre de sorts PORTFOLIO" data-asset="lobby.spellbar.frame">
      <svg width="732" height="160" viewBox="0 0 732 160" className={styles.links} aria-hidden="true">
        <path d="M270 57L306 57M426 57L462 57" stroke="var(--c-ink)" strokeWidth="3" />
        <path d="M288 49l8 8l-8 8l-8-8zM444 49l8 8l-8 8l-8-8z" fill="var(--c-ink)" />
      </svg>
      <ul className={styles.list}>
        {spells.map((s, i) => (
          <li key={s.id}>
            <SpellGem
              spell={s}
              index={i}
              layout={layout(i)}
              expanded={s.action.type === 'options' ? popover === 'options' : s.action.type === 'panel' ? popover === s.action.panel : undefined}
              onActivate={() => {
                if (s.action.type === 'options') onPopover('options');
                else if (s.action.type === 'panel') onPopover(s.action.panel);
              }}
            />
          </li>
        ))}
      </ul>
      {spells.some((s) => s.isNew) && <span className={styles.newTag} aria-hidden="true">NEW</span>}
      <div
        className={styles.xp}
        role="meter"
        aria-label={levelLine}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(profile.xpProgress * 100)}
      >
        <div className={styles.xpFill} style={{ width: `${profile.xpProgress * 100}%` }} />
      </div>
      <span className={styles.xpLabel} aria-hidden="true">{levelLine}</span>
    </nav>
  );
}
