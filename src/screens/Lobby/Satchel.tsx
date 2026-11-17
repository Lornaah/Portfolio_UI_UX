import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { scrolls } from '../../data/lobby';
import { useSettings } from '../../state/settingsContext';
import type { Scroll } from '../../types/content';
import parchment from './Parchment.module.css';
import styles from './Satchel.module.css';

/** Besace (bas droite) : les parchemins sortent au survol et se déroulent au clic. */
export function Satchel() {
  const [open, setOpen] = useState<Scroll['id'] | null>(null);
  const { playSfx } = useSettings();
  const current = scrolls.find((s) => s.id === open);

  const close = () => {
    const id = open;
    setOpen(null);
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-scroll-id="${id}"]`)?.focus());
  };

  return (
    <>
      <AnimatePresence>{current && <ScrollPanel key={current.id} scroll={current} onClose={close} />}</AnimatePresence>
      <div className={styles.wrap}>
        <span className={styles.strap} aria-hidden="true" />
        {scrolls.map((s) => {
          const on = s.id === open;
          return (
            <button
              key={s.id}
              type="button"
              className={styles.scroll}
              data-scroll-id={s.id}
              data-open={on}
              aria-label={`Parchemin ${s.title}`}
              aria-expanded={on}
              aria-controls={on ? `scroll-panel-${s.id}` : undefined}
              style={{ '--r': `${s.tilt}deg`, left: s.left } as CSSProperties}
              onClick={() => {
                setOpen(on ? null : s.id);
                if (!on) playSfx('sfx.unroll');
              }}
            >
              <ImageSlot id="lobby.scroll" as="span" plain className={styles.roll} />
              <span className={styles.cap} aria-hidden="true" />
              <span className={styles.band} aria-hidden="true" />
              <span className={styles.label} aria-hidden="true">{s.label}</span>
            </button>
          );
        })}
        <ImageSlot id="lobby.satchel" plain className={styles.bag}>
          <span className={styles.flap} />
          <span className={styles.clasp} />
          <span className={styles.bagLabel}>BESACE</span>
        </ImageSlot>
      </div>
    </>
  );
}

function ScrollPanel({ scroll, onClose }: { scroll: Scroll; onClose: () => void }) {
  const { reducedMotion } = useSettings();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current?.focus({ preventScroll: true }), []);
  return (
    <motion.section
      ref={ref}
      tabIndex={-1}
      id={`scroll-panel-${scroll.id}`}
      className={parchment.parchment}
      style={{ right: 30, bottom: 236 }}
      aria-label={scroll.title}
      initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <span className={parchment.roller} aria-hidden="true" />
      <ImageSlot id="lobby.scroll.paper" plain className={parchment.sheet}>
        <span className={parchment.kicker}>PARCHEMIN</span>
        <h2 className={parchment.title}>{scroll.title}</h2>
        <p className={parchment.text}>{scroll.text}</p>
        {scroll.cta.internal ? (
          <Link className={parchment.cta} to={scroll.cta.href}>{scroll.cta.label}</Link>
        ) : (
          <a className={parchment.cta} href={scroll.cta.href} download={scroll.cta.download || undefined}>{scroll.cta.label}</a>
        )}
        <button type="button" className={parchment.secondary} onClick={onClose}>Renrouler</button>
      </ImageSlot>
      <span className={parchment.roller} aria-hidden="true" />
    </motion.section>
  );
}
