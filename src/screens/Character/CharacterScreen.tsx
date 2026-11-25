import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import { rarityLabels } from '../../data/achievements';
import { characterProfile, characterStats, characterTabs, crafts, equipment, reputation, standingLabels } from '../../data/character';
import { profile } from '../../data/profile';
import { useSettings } from '../../state/settingsContext';
import styles from './Character.module.css';

const R = 320;
const STEP = 360 / equipment.length;
const EASE = [0.2, 0.8, 0.2, 1] as const;

type Tab = (typeof characterTabs)[number]['id'];

/**
 * 06 · Fiche personnage [P] / [I] : cercle runique de 10 gemmes d'équipement (= outils).
 * Choisir une gemme fait tourner le cercle pour l'amener en haut ; une étincelle descend
 * vers le personnage et la fiche de l'objet tombe sur la table.
 */
export function CharacterScreen() {
  const location = useLocation();
  const { playSfx, reducedMotion } = useSettings();
  const [sel, setSel] = useState(0);
  const [turn, setTurn] = useState(0);
  const [tab, setTab] = useState<Tab>('personnage');
  const gemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = equipment[sel];

  // Touche I (Inventaire) : le focus va directement sur l'équipement.
  useEffect(() => {
    if ((location.state as { focus?: string } | null)?.focus === 'inventory') {
      requestAnimationFrame(() => gemRefs.current[0]?.focus());
    }
  }, [location.state]);

  /** Choisit une gemme : le cercle tourne par le plus court chemin pour l'amener en haut. */
  const pick = (i: number) => {
    if (i === sel) return;
    let d = i - sel;
    if (d > equipment.length / 2) d -= equipment.length;
    if (d < -equipment.length / 2) d += equipment.length;
    setTurn((t) => t - d * STEP);
    setSel(i);
    playSfx('sfx.click');
  };

  const onTabKey = (e: ReactKeyboardEvent, k: number) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (k + d + characterTabs.length) % characterTabs.length;
    setTab(characterTabs[n].id);
    tabRefs.current[n]?.focus();
  };

  return (
    <ImageSlot id="character.background" plain className={styles.screen}>
      <span className={`${styles.bgHatch} hatch`} aria-hidden="true" />

      {/* Cercle runique : anneaux qui tournent lentement */}
      <ImageSlot id="character.rune-circle" plain className={styles.runes} placeholder={
        <>
          <span className={styles.outer} />
          <span className={styles.inner} />
          <span className={styles.runeTicks} />
        </>
      } />
      <ImageSlot
        id="character.hero"
        plain
        className={`${styles.hero} shape-arch`}
        showLabel
        label={<>Personnage en pied<br />{cur.tool} équipé</>}
      />
      <span className={styles.shadow} aria-hidden="true" />

      {/* Éclat sur le personnage à chaque changement d'objet */}
      {!reducedMotion && (
        <motion.span
          key={`flash-${sel}`}
          className={styles.heroFlash}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.55, 0] }}
          transition={{ duration: 0.7, delay: 0.45 }}
        />
      )}
      {/* Étincelle : de la gemme (en haut du cercle) vers le personnage */}
      {!reducedMotion && sel !== -1 && (
        <motion.span
          key={`spark-${sel}`}
          className={`${styles.spark} shape-star4`}
          aria-hidden="true"
          initial={{ y: 0, opacity: 0, scale: 0.4 }}
          animate={{ y: [0, 0, 230], opacity: [0, 1, 0], scale: [0.4, 1.3, 0.6] }}
          transition={{ duration: 0.9, times: [0, 0.45, 1], ease: 'easeIn' }}
        />
      )}

      <header className={styles.header}>
        <h2 className={styles.name}>{profile.fullName}</h2>
        <span className={styles.sub}>{profile.classesLineLower} · Niveau {profile.level}</span>
      </header>

      {/* Les 10 gemmes, sur un plateau qui tourne */}
      <div className={styles.dial} style={{ transform: `rotate(${turn}deg)` }}>
        <ul className={styles.ring} aria-label="Équipement (outils)">
          {equipment.map((e, i) => {
            const a = ((-90 + i * STEP) * Math.PI) / 180;
            const on = i === sel;
            return (
              <li key={e.id}>
                <button
                  ref={(el) => {
                    gemRefs.current[i] = el;
                  }}
                  type="button"
                  className={styles.slot}
                  style={{ left: R + R * Math.cos(a) - 32, top: R + R * Math.sin(a) - 32 }}
                  aria-pressed={on}
                  aria-label={`${e.slot} : ${e.tool}, ${rarityLabels[e.rarity].toLowerCase()}`}
                  data-rarity={e.rarity}
                  onClick={() => pick(i)}
                >
                  {/* Contre-rotation : l'abréviation reste lisible pendant que le cercle tourne */}
                  <span className={styles.upright} style={{ transform: `rotate(${-turn}deg)` }}>
                    <ImageSlot id={`character.gem.${e.id}`} as="span" plain className={styles.gem}>
                      <span className={styles.abbr} aria-hidden="true">{e.abbr}</span>
                    </ImageSlot>
                    <span className={styles.slotName} aria-hidden="true">{e.slot}</span>
                  </span>
                  {on && !reducedMotion && <span key={turn} className={styles.burst} aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <span className={styles.needle} aria-hidden="true" />

      {/* Panneau gauche, selon l'onglet */}
      <div id="character-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className={styles.panelZone}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            className={styles.panelStack}
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -40, transition: { duration: 0.15 } }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {tab === 'personnage' && <PersonnagePanel />}
            {tab === 'reputation' && <ReputationPanel />}
            {tab === 'metiers' && <MetiersPanel />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fiche de l'objet : tombe sur la table */}
      <AnimatePresence mode="wait">
        <motion.section
          key={cur.id}
          className={styles.item}
          data-rarity={cur.rarity}
          aria-label="Objet sélectionné"
          aria-live="polite"
          initial={{ opacity: 0, y: -160, rotate: 14, scale: 1.15 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5, scale: 1 }}
          exit={{ opacity: 0, x: 80, rotate: 10, transition: { duration: 0.15 } }}
          transition={{ duration: 0.55, ease: [0.3, 1.35, 0.5, 1], delay: reducedMotion ? 0 : 0.2 }}
        >
          <span className={styles.kicker}>{cur.slot.toUpperCase()}</span>
          <h3 className={styles.itemTitle}>{cur.tool}</h3>
          <motion.span
            className={styles.rarity}
            initial={{ scale: 2.2, rotate: -18, opacity: 0 }}
            animate={{ scale: 1, rotate: -4, opacity: 1 }}
            transition={{ delay: reducedMotion ? 0 : 0.6, duration: 0.3, ease: [0.3, 1.6, 0.5, 1] }}
          >
            {rarityLabels[cur.rarity]}
          </motion.span>
          <p className={styles.itemText}>{cur.usage}</p>
        </motion.section>
      </AnimatePresence>

      <div role="tablist" aria-label="Onglets de la fiche" aria-orientation="vertical" className={styles.tabs}>
        {characterTabs.map((t, k) => (
          <button
            key={t.id}
            ref={(el) => {
              tabRefs.current[k] = el;
            }}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="character-panel"
            tabIndex={tab === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => onTabKey(e, k)}
          >
            <span className={`${styles.tabShape} shape-tag`} aria-hidden="true" />
            <span className={styles.tabLabel}>{t.label}</span>
          </button>
        ))}
      </div>

      <CloseButton size={64} style={{ right: 36, top: 36 }} />
    </ImageSlot>
  );
}

function PersonnagePanel() {
  return (
    <>
      <section className={styles.stats} aria-label="Caractéristiques">
        <span className={styles.kicker}>CARACTÉRISTIQUES</span>
        <dl className={styles.statList}>
          {characterStats.map((s, k) => (
            <motion.div
              key={s.label}
              className={styles.statRow}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + k * 0.06 }}
            >
              <dt>{s.label}</dt>
              <dd className={styles.statValue}>{s.value}</dd>
            </motion.div>
          ))}
        </dl>
      </section>
      <section className={styles.profile} aria-label="Profil">
        <span className={styles.pin} aria-hidden="true" />
        <span className={styles.kicker}>PROFIL</span>
        <dl className={styles.profileList}>
          {characterProfile.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd> · {s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function ReputationPanel() {
  return (
    <section className={`${styles.stats} ${styles.tall}`} aria-label="Réputation">
      <span className={styles.kicker}>RÉPUTATION</span>
      <ul className={styles.repList}>
        {reputation.map((r, k) => (
          <motion.li key={r.who} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + k * 0.08 }}>
            <span className={styles.repWho}>{r.who}</span>
            <span className={styles.repRole}>{r.role} · {r.mission}</span>
            <q className={styles.repQuote}>{r.quote}</q>
            <span className={styles.gauge} role="meter" aria-label={`Réputation : ${standingLabels[r.standing]}`} aria-valuemin={0} aria-valuemax={standingLabels.length - 1} aria-valuenow={r.standing}>
              <motion.i initial={{ width: 0 }} animate={{ width: `${(r.standing / (standingLabels.length - 1)) * 100}%` }} transition={{ delay: 0.3 + k * 0.08, duration: 0.6 }} />
            </span>
            <span className={styles.repStanding}>{standingLabels[r.standing]}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function MetiersPanel() {
  return (
    <section className={`${styles.stats} ${styles.tall}`} aria-label="Métiers">
      <span className={styles.kicker}>MÉTIERS</span>
      <ul className={styles.craftList}>
        {crafts.map((c, k) => (
          <motion.li key={c.name} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + k * 0.06 }}>
            <span className={styles.craftHead}>
              <b>{c.name}</b>
              <span>{c.level} / {c.max}</span>
            </span>
            <span className={styles.gauge} role="meter" aria-label={`${c.name} : niveau ${c.level} sur ${c.max}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(c.progress * 100)}>
              <motion.i initial={{ width: 0 }} animate={{ width: `${c.progress * 100}%` }} transition={{ delay: 0.25 + k * 0.06, duration: 0.6 }} />
            </span>
            <span className={styles.craftTools}>{c.tools}</span>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
