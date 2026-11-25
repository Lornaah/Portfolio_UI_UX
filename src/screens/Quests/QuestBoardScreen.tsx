import { AnimatePresence, motion } from 'motion/react';
import { useState, type CSSProperties } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import { rarityLabels } from '../../data/achievements';
import { questBoardCopy as copy, quests, zoneName, type QuestStatus } from '../../data/quests';
import { useSettings } from '../../state/settingsContext';
import styles from './QuestBoard.module.css';

type Filter = 'toutes' | QuestStatus;
const FILTERS: { id: Filter; label: string }[] = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'en-cours', label: 'En cours' },
  { id: 'accomplie', label: 'Accomplies' },
];
const TORN = ['shape-torn-1', 'shape-torn-2', 'shape-torn-3'];
/** Inclinaisons fixes des bouts de papier (pas d'aléatoire : même rendu à chaque visite). */
const TILT = [-4, 3, -2, 5, -5, 2, 4, -3, 1, -1, 3, -4];

/** Tableau d'affichage : la quête choisie en grand à gauche, toutes les quêtes épinglées à droite. */
export function QuestBoardScreen() {
  const [params] = useSearchParams();
  const initial = quests.some((q) => q.id === params.get('quete')) ? params.get('quete')! : quests[0].id;
  const [sel, setSel] = useState(initial);
  const [filter, setFilter] = useState<Filter>('toutes');
  const { playSfx } = useSettings();
  const cur = quests.find((q) => q.id === sel) ?? quests[0];
  const ongoing = quests.filter((q) => q.status === 'en-cours').length;

  return (
    <ImageSlot id="quests.board" plain className={styles.screen}>
      <span className={styles.planks} aria-hidden="true" />

      <header className={styles.header}>
        <span className={styles.kicker}>{copy.kicker}</span>
        <h2 className={styles.title}>{copy.title}</h2>
        <span className={styles.count}>{quests.length} quêtes · {ongoing} en cours</span>
      </header>

      {/* La quête choisie, décrochée et posée en grand */}
      <AnimatePresence mode="wait">
        <motion.article
          key={cur.id}
          className={styles.detail}
          aria-live="polite"
          aria-label={`Quête : ${cur.title}`}
          initial={{ opacity: 0, x: 220, y: -40, rotate: 8, scale: 0.6 }}
          animate={{ opacity: 1, x: 0, y: 0, rotate: -1.2, scale: 1 }}
          exit={{ opacity: 0, y: 60, rotate: -6, transition: { duration: 0.18 } }}
          transition={{ duration: 0.5, ease: [0.3, 1.25, 0.5, 1] }}
        >
          <span className={styles.bigPin} aria-hidden="true" />
          <ImageSlot id="quests.parchment" plain className={`${styles.parchment} shape-torn-1`}>
            <div className={styles.detailHead}>
              <span className={styles.detailKicker}>QUÊTE{cur.rarity ? ` · ${rarityLabels[cur.rarity].toUpperCase()}` : ''}</span>
              <span className={styles.seal} data-status={cur.status}>{copy.statusLabel[cur.status]}</span>
            </div>
            <h3 className={styles.detailTitle}>{cur.title}</h3>
            <span className={styles.detailMeta}>{copy.zone} : {zoneName(cur.zoneId)} · {cur.meta}</span>
            <ImageSlot id={`quests.illustration.${cur.id}`} className={styles.illu} />
            <p className={styles.summary}>{cur.summary}</p>
            <span className={styles.section}>{copy.objectives}</span>
            <ul className={styles.objectives}>
              {cur.objectives.map((o) => (
                <li key={o.label} data-done={o.done}>
                  <span className={styles.check} aria-hidden="true">{o.done ? '✓' : ''}</span>
                  <span>{o.label}</span>
                  <span className="sr-only">{o.done ? '(fait)' : '(à faire)'}</span>
                </li>
              ))}
            </ul>
            <div className={styles.footer}>
              <span className={styles.reward}>
                <span className={styles.section}>{copy.reward}</span>
                <b>{cur.reward}</b>
              </span>
              {cur.achievementId && (
                <Link className={styles.cta} to={`/jeu/faits-d-armes?medaille=${cur.achievementId}`}>
                  {copy.seeAchievement} <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </ImageSlot>
        </motion.article>
      </AnimatePresence>

      {/* Le tableau : tous les bouts de papier */}
      <section className={styles.board} aria-label={copy.boardLabel}>
        <div role="group" aria-label="Filtrer les quêtes" className={styles.filters}>
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={styles.filter} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <ul className={styles.scraps}>
          {quests.map((q, k) => {
            const hidden = filter !== 'toutes' && q.status !== filter;
            const on = q.id === sel;
            return (
              <li key={q.id} className={styles.slot} data-hidden={hidden}>
                <button
                  type="button"
                  className={styles.scrap}
                  aria-pressed={on}
                  aria-label={`${q.title}, ${copy.statusLabel[q.status].toLowerCase()}`}
                  disabled={hidden}
                  style={{ '--r': `${TILT[k % TILT.length]}deg`, '--d': `${0.15 + k * 0.04}s` } as CSSProperties}
                  onClick={() => {
                    setSel(q.id);
                    playSfx('sfx.page');
                  }}
                >
                  <ImageSlot id="quests.scrap" as="span" plain className={`${styles.scrapPaper} ${TORN[k % 3]}`} data-status={q.status}>
                    <span className={styles.scrapKicker}>QUÊTE</span>
                    <span className={styles.scrapTitle}>{q.title}</span>
                    <span className={styles.scrapMeta}>{zoneName(q.zoneId).split(' · ')[0]}</span>
                    <span className={styles.scrapStatus} data-status={q.status}>{copy.statusLabel[q.status]}</span>
                  </ImageSlot>
                  <span className={styles.pin} aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <CloseButton style={{ right: 28, top: 24 }} />
    </ImageSlot>
  );
}
