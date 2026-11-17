import type { CSSProperties } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { notices, questSlides } from '../../data/lobby';
import { useRotator } from '../../hooks/useRotator';
import { useSettings } from '../../state/settingsContext';
import styles from './QuestNotices.module.css';

const vars = (r: number, d: number) => ({ '--r': `${r}deg`, '--d': `${d}s` }) as CSSProperties;

/** Avis de quête : morceaux de parchemin déchirés et épinglés. */
export function QuestNotices() {
  const { reducedMotion } = useSettings();
  const [hold, setHold] = useState(false);
  const [i] = useRotator(questSlides.length, { paused: hold || reducedMotion });
  const slide = questSlides[i];
  const to = slide.achievementId ? `/jeu/faits-d-armes?medaille=${slide.achievementId}` : '/jeu/faits-d-armes';

  return (
    <>
      <Link
        to={to}
        className={styles.notice}
        style={{ ...vars(3, 0.4), left: 1066, top: 284, width: 172, height: 216, zIndex: 10 }}
        aria-label={`${notices.quest.aria} : ${slide.title}`}
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <ImageSlot id="lobby.notice.paper" as="span" plain className={`${styles.paper} shape-torn-1`} style={{ background: 'var(--c-paper)', padding: '24px 14px 14px' }}>
          <span className={styles.heading} style={{ fontSize: 20 }}>{notices.quest.heading}</span>
          <ImageSlot id="lobby.notice.quest-thumb" as="span" className={styles.thumb} />
          <span className={styles.title}>{slide.title}</span>
          <span className={styles.meta}>{slide.meta}</span>
          <span className={styles.reward}>
            {notices.quest.reward}
            <span className={styles.coin} aria-hidden="true" />
          </span>
        </ImageSlot>
        <span className={styles.pin} aria-hidden="true" />
      </Link>

      <a
        href={notices.contact.href}
        className={styles.notice}
        style={{ ...vars(-5, 0.55), left: 1256, top: 296, width: 148, height: 138, zIndex: 11 }}
        aria-label={notices.contact.title}
      >
        <ImageSlot id="lobby.notice.paper" as="span" plain className={`${styles.paper} shape-torn-2`} style={{ background: 'var(--c-paper-2)', padding: '24px 12px 12px' }}>
          <span className={styles.heading} style={{ fontSize: 17 }}>{notices.contact.heading}</span>
          <span className={styles.rule} />
          <span className={styles.title}>{notices.contact.title}</span>
          <span className={styles.meta}>{notices.contact.text}</span>
        </ImageSlot>
        <span className={styles.pin} aria-hidden="true" />
      </a>

      <div className={styles.notice} style={{ ...vars(6, 0.7), left: 1262, top: 446, width: 132, height: 96, zIndex: 10 }}>
        <ImageSlot id="lobby.notice.paper" as="span" plain className={`${styles.paper} shape-torn-3`} style={{ background: 'var(--c-stone-1)', padding: '22px 10px 10px', gap: 4 }}>
          <span className={styles.heading} style={{ fontSize: 13, letterSpacing: '.1em' }}>{notices.availability.heading}</span>
          <span className={styles.avail}>
            {notices.availability.lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </span>
        </ImageSlot>
        <span className={styles.pin} aria-hidden="true" />
      </div>
    </>
  );
}
