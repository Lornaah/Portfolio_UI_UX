import type { CSSProperties } from 'react';
import { FacetedGem } from '../../components/FacetedGem';
import { ImageSlot } from '../../components/ImageSlot';
import type { Achievement } from '../../types/content';
import styles from './Achievements.module.css';

const MOUNT = { L: 104, E: 88, R: 76, C: 66 } as const;
const GEM = { L: 66, E: 54, R: 46, C: 38 } as const;

/** Médaille : monture (forme selon le projet) + gemme facettée dont la taille dépend de la rareté. */
export function Medal({ a, size, gem, glintDelay = 0 }: { a: Achievement; size?: number; gem?: number; glintDelay?: number }) {
  const ms = size ?? MOUNT[a.rarity];
  const gs = gem ?? GEM[a.rarity];
  const big = Boolean(size);
  return (
    <ImageSlot
      id={`achievements.medal.${a.id}`}
      as="span"
      plain
      className={styles.medalArt}
      style={{ width: ms, height: ms }}
      placeholder={
        <>
          <span className={`medal-${a.shape}`} style={{ position: 'absolute', inset: 0, background: 'var(--c-ink)' }} />
          <span className={`medal-${a.shape}`} style={{ position: 'absolute', inset: big ? 8 : 5, background: 'var(--c-stone-2)' }} />
          <FacetedGem
            width={gs}
            height={gs}
            padY={0.07}
            table={big ? 0.46 : 0.5}
            outline
            strokeWidth={big ? 2 : 1.5}
            style={{ position: 'absolute', left: '50%', top: '50%', margin: `${-gs / 2}px 0 0 ${-gs / 2}px` }}
          />
        </>
      }
    >
      <span className="glint" style={{ left: big ? '70%' : '68%', top: big ? '12%' : '10%', '--g': `${glintDelay}s`, animationDuration: '5s' } as CSSProperties} />
    </ImageSlot>
  );
}
