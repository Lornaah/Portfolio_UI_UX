import { useMemo, type CSSProperties } from 'react';
import { hexGem } from '../lib/facetedHex';

interface FacetedGemProps {
  width: number;
  height: number;
  table?: number;
  padY?: number;
  ring?: boolean;
  outline?: boolean;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}

/** Gemme hexagonale facettée en SVG (décorative). */
export function FacetedGem({ width, height, table, padY, ring, outline, strokeWidth = 1.5, className, style }: FacetedGemProps) {
  const p = useMemo(() => hexGem(width, height, { table, padY, ring }), [width, height, table, padY, ring]);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style} aria-hidden="true">
      <path d={p.facetA} fill="var(--c-gem-facet-a)" />
      <path d={p.facetB} fill="var(--c-gem-facet-b)" />
      <path d={p.facetC} fill="var(--c-gem-facet-c)" />
      {ring && <path d={p.ring} fill="none" stroke="var(--c-ink)" strokeWidth={1.2} />}
      {outline && <path d={p.outline} fill="none" stroke="var(--c-ink)" strokeWidth={strokeWidth + 0.5} />}
      <path d={p.table} fill="var(--c-gem-table)" stroke="var(--c-ink)" strokeWidth={strokeWidth} />
    </svg>
  );
}
