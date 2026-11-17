import type { CSSProperties, ReactNode } from 'react';
import { getImage } from '../data/assets';
import styles from './ImageSlot.module.css';

interface ImageSlotProps {
  /** Identifiant du registre src/data/assets.ts (posé en data-asset). */
  id: string;
  className?: string;
  style?: CSSProperties;
  /** Affiche le libellé du placeholder (mode wireframe). */
  showLabel?: boolean;
  /** Libellé personnalisé (sinon celui du registre). */
  label?: ReactNode;
  /** Remplace la hachure par un rendu wireframe sur mesure tant qu'aucune image n'est fournie. */
  placeholder?: ReactNode;
  /** Pas de hachure (calques de scène dessinés en aplats). */
  plain?: boolean;
  children?: ReactNode;
  as?: 'div' | 'span';
}

/**
 * Emplacement d'image clairement identifiable.
 * - image renseignée → <img> qui remplit le cadre
 * - sinon → hachure grise (ou `placeholder`) + libellé optionnel
 * Les enfants sont toujours rendus par-dessus.
 */
export function ImageSlot({ id, className, style, showLabel, label, placeholder, plain, children, as = 'div' }: ImageSlotProps) {
  const asset = getImage(id);
  const Tag = as;
  const ready = Boolean(asset.src);
  const cls = [styles.slot, !ready && !placeholder && !plain ? 'hatch' : '', className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={style} data-asset={id} data-asset-status={ready ? 'ready' : 'missing'}>
      {ready ? (
        <img className={styles.img} src={asset.src} alt={asset.alt ?? ''} draggable={false} />
      ) : (
        <>
          {placeholder}
          {showLabel && <span className={styles.label}>{label ?? asset.label}</span>}
        </>
      )}
      {children}
    </Tag>
  );
}
