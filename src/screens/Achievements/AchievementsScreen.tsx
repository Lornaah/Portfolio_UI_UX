import { AnimatePresence, motion } from 'motion/react';
import { useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import {
  achievementCategories,
  achievements,
  achievementsMeta,
  defaultAchievementId,
  rarityNames,
  showcaseSlots,
} from '../../data/achievements';
import { useSettings } from '../../state/settingsContext';
import type { Achievement, AchievementCategory } from '../../types/content';
import styles from './Achievements.module.css';
import { Medal } from './Medal';

type Cat = 'all' | AchievementCategory;

/** 08 · Faits d'armes [F] : vitrine 4×3 de médailles sur velours + écrin avec certificat. */
export function AchievementsScreen() {
  const [params] = useSearchParams();
  const initial = achievements.some((a) => a.id === params.get('medaille')) ? params.get('medaille')! : defaultAchievementId;
  const [cat, setCat] = useState<Cat>('all');
  const [sel, setSel] = useState(initial);
  const { playSfx } = useSettings();
  const s = achievements.find((a) => a.id === sel) ?? achievements[0];
  const empties = Math.max(0, showcaseSlots - achievements.length);

  return (
    <ImageSlot id="achievements.background" plain className={styles.screen}>
      <header className={styles.header}>
        <span className={styles.kicker}>{achievementsMeta.kicker}</span>
        <h2 className={styles.title}>{achievementsMeta.title}</h2>
      </header>
      <ul className={styles.counters} aria-label="Compteurs">
        {achievementsMeta.counters.map((c) => (
          <li key={c.label} className={`${styles.plaque} shape-plaque`}>
            <span className={styles.plaqueValue}>{c.value}</span>
            <span className={styles.plaqueLabel}>{c.label}</span>
          </li>
        ))}
      </ul>

      <div role="group" aria-label="Catégories" className={styles.tabs}>
        {achievementCategories.map((c) => (
          <button key={c.id} type="button" className={styles.tab} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <ImageSlot id="achievements.case" plain className={styles.case}>
        <ul className={styles.grid} aria-label="Vitrine des médailles">
          {achievements.map((a, i) => (
            <MedalCell
              key={a.id}
              a={a}
              index={i}
              selected={a.id === sel}
              dimmed={cat !== 'all' && a.category !== cat}
              onPick={() => {
                setSel(a.id);
                playSfx('sfx.medal');
              }}
            />
          ))}
          {Array.from({ length: empties }, (_, k) => (
            <li key={`empty-${k}`} className={styles.cell} data-rarity="">
              <span className={styles.hook} aria-hidden="true" />
              <span className={styles.plate} data-empty="true">{achievementsMeta.emptySlot}</span>
            </li>
          ))}
        </ul>
      </ImageSlot>

      <section className={styles.showcase} aria-label="Écrin du trophée choisi" aria-live="polite">
        <ImageSlot id="achievements.showcase" plain className={styles.cushion}>
          <span className={styles.showcaseLabel}>{achievementsMeta.showcase}</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={s.id}
              className={styles.bigMedal}
              initial={{ opacity: 0, scale: 0.4, rotate: achievements.indexOf(s) % 2 ? 20 : -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.5, ease: [0.3, 1.4, 0.5, 1] }}
            >
              <Medal a={s} size={170} gem={110} glintDelay={1} />
            </motion.span>
          </AnimatePresence>
        </ImageSlot>
        <div className={styles.certificate}>
          <span className={styles.certKicker}>{rarityNames[s.rarity]} · {s.meta}</span>
          <h3 className={styles.certTitle}>{s.title}</h3>
          <p className={styles.certSub}>{s.sub}</p>
          <span className={styles.certRule} />
          <span className={styles.certKicker} style={{ color: 'var(--c-ink-soft)' }}>{achievementsMeta.citation}</span>
          <ul className={styles.criteria}>
            {s.criteria.map((c) => (
              <li key={c}>
                <span className={styles.diamond} aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <span className={styles.awarded}>Décerné le {s.awardedOn} · {s.points} points</span>
          <a className={styles.caseStudy} href={s.caseStudyHref}>{achievementsMeta.caseStudy}</a>
        </div>
      </section>

      <CloseButton style={{ right: 36, top: 30 }} />
    </ImageSlot>
  );
}

function MedalCell({ a, index, selected, dimmed, onPick }: { a: Achievement; index: number; selected: boolean; dimmed: boolean; onPick: () => void }) {
  return (
    <li className={styles.cell} data-rarity={a.rarity} data-selected={selected} data-dimmed={dimmed}>
      <span className={styles.hook} aria-hidden="true" />
      <button
        type="button"
        className={styles.medal}
        aria-label={`${a.title}, ${rarityNames[a.rarity].toLowerCase()}`}
        aria-pressed={selected}
        style={{ '--d': `${(index * 0.05).toFixed(2)}s` } as CSSProperties}
        onClick={onPick}
      >
        <span className={styles.ribbon} aria-hidden="true" />
        <span className={styles.ring} aria-hidden="true" />
        <Medal a={a} glintDelay={+(index * 0.4).toFixed(1)} />
      </button>
      <span className={styles.plate} aria-hidden="true">{a.title}</span>
    </li>
  );
}
