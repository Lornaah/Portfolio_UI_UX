import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { FacetedGem } from '../../components/FacetedGem';
import { ImageSlot } from '../../components/ImageSlot';
import { useSettings } from '../../state/settingsContext';
import type { Spell } from '../../types/content';
import styles from './SpellBar.module.css';

export interface GemLayout {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface SpellGemProps {
  spell: Spell;
  index: number;
  layout: GemLayout;
  expanded?: boolean;
  onActivate: () => void;
}

/** Une gemme hexagonale facettée de la barre de sorts, avec son infobulle. */
export function SpellGem({ spell, index, layout, expanded, onActivate }: SpellGemProps) {
  const { playSfx } = useSettings();
  const { x, y, w, h } = layout;
  const big = Boolean(spell.featured);
  const ic = big ? 34 : 24;
  const tipId = `spell-tip-${spell.id}`;
  const cellStyle: CSSProperties = { left: x, top: y, width: w, height: h };

  const inner = (
    <>
      <span className={styles.tip} id={tipId} role="tooltip">
        <b className={styles.tipTitle}>{spell.label}</b>
        <span className={styles.tipMeta}>Sort instantané{spell.hotkey ? ` · touche ${spell.key}` : ''}</span>
        <span className={styles.tipDesc}>{spell.desc}</span>
      </span>
      <span className={styles.pane} style={{ '--d': `${(0.7 + Math.abs(index - 4) * 0.08).toFixed(2)}s` } as CSSProperties}>
        <ImageSlot
          id={`spell.gem.${spell.id}`}
          as="span"
          plain
          className={styles.gemSlot}
          placeholder={
            <>
              <span className={`${styles.mount} shape-hex`} />
              <FacetedGem width={w} height={h} table={big ? 0.46 : 0.54} ring={big} className={styles.gem} />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--c-ink)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={styles.icon}
                style={{ left: w / 2 - ic / 2, top: h / 2 - ic / 2, width: ic, height: ic }}
                aria-hidden="true"
              >
                <path d={spell.icon} />
              </svg>
            </>
          }
        />
        <span className="glint" style={{ '--g': `${(index * 0.45).toFixed(2)}s`, left: w * 0.68, top: h * 0.1 } as CSSProperties} />
        <span className={styles.key} data-big={big} aria-hidden="true">{spell.key}</span>
      </span>
    </>
  );

  const common = {
    className: styles.cell,
    style: cellStyle,
    'aria-label': spell.label,
    'aria-describedby': tipId,
    'aria-keyshortcuts': spell.hotkey ? spell.key : undefined,
    'data-spell-id': spell.id,
    onMouseEnter: () => playSfx('sfx.hover'),
  };

  if (spell.action.type === 'route') {
    const a = spell.action;
    return (
      <Link {...common} to={a.to} state={a.focus ? { focus: a.focus } : undefined} onClick={() => playSfx('sfx.click')}>
        {inner}
      </Link>
    );
  }
  return (
    <button {...common} type="button" aria-expanded={expanded} onClick={onActivate}>
      {inner}
    </button>
  );
}
