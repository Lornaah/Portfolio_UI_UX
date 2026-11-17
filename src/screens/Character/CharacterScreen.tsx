import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import { rarityLabels } from '../../data/achievements';
import { characterProfile, characterStats, characterTabPlaceholder, characterTabs, equipment } from '../../data/character';
import { profile } from '../../data/profile';
import styles from './Character.module.css';

const CX = 720;
const CY = 470;
const R = 320;

type Tab = (typeof characterTabs)[number]['id'];

/** 06 · Fiche personnage [P] / [I] : cercle runique de 10 gemmes d'équipement (= outils). */
export function CharacterScreen() {
  const location = useLocation();
  const [sel, setSel] = useState(0);
  const [tab, setTab] = useState<Tab>('personnage');
  const gemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cur = equipment[sel];

  // Touche I (Inventaire) : le focus va directement sur l'équipement.
  useEffect(() => {
    if ((location.state as { focus?: string } | null)?.focus === 'inventory') {
      requestAnimationFrame(() => gemRefs.current[0]?.focus());
    }
  }, [location.state]);

  return (
    <ImageSlot id="character.background" plain className={styles.screen}>
      <span className={`${styles.bgHatch} hatch`} aria-hidden="true" />

      <ImageSlot id="character.rune-circle" plain className={styles.runes} placeholder={
        <>
          <span className={styles.outer} />
          <span className={styles.inner} />
        </>
      } />
      <ImageSlot
        id="character.hero"
        plain
        className={`${styles.hero} shape-arch`}
        showLabel
        label={<>Personnage en pied<br />glisser pour tourner</>}
      />
      <span className={styles.shadow} aria-hidden="true" />

      <header className={styles.header}>
        <h2 className={styles.name}>{profile.fullName}</h2>
        <span className={styles.sub}>{profile.classesLineLower} · Niveau {profile.level}</span>
      </header>

      <ul className={styles.ring} aria-label="Équipement (outils)">
        {equipment.map((e, i) => {
          const a = ((-90 + i * 36) * Math.PI) / 180;
          const x = CX + R * Math.cos(a);
          const y = CY + R * Math.sin(a);
          return (
            <li key={e.id}>
              <button
                ref={(el) => {
                  gemRefs.current[i] = el;
                }}
                type="button"
                className={styles.slot}
                style={{ left: x - 32, top: y - 32 }}
                aria-pressed={i === sel}
                aria-label={`${e.slot} : ${e.tool}, ${rarityLabels[e.rarity].toLowerCase()}`}
                onClick={() => setSel(i)}
              >
                <ImageSlot id={`character.gem.${e.id}`} as="span" plain className={styles.gem}>
                  <span className={styles.abbr} aria-hidden="true">{e.abbr}</span>
                </ImageSlot>
              </button>
            </li>
          );
        })}
      </ul>

      {tab === 'personnage' ? (
        <>
          <section className={styles.stats} aria-label="Caractéristiques">
            <span className={styles.kicker}>CARACTÉRISTIQUES</span>
            <dl className={styles.statList}>
              {characterStats.map((s) => (
                <div key={s.label} className={styles.statRow}>
                  <dt>{s.label}</dt>
                  <dd className={styles.statValue}>{s.value}</dd>
                </div>
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
      ) : (
        <section className={styles.stats} aria-label={characterTabs.find((t) => t.id === tab)?.label}>
          <span className={styles.kicker}>{characterTabs.find((t) => t.id === tab)?.label.toUpperCase()}</span>
          <p className={styles.placeholder}>{characterTabPlaceholder}</p>
        </section>
      )}

      <AnimatePresence mode="wait">
        <motion.section
          key={cur.id}
          className={styles.item}
          aria-label="Objet sélectionné"
          aria-live="polite"
          initial={{ opacity: 0, y: -30, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 2.5 }}
          exit={{ opacity: 0, x: 40, transition: { duration: 0.12 } }}
          transition={{ duration: 0.35, ease: [0.3, 1.4, 0.5, 1] }}
        >
          <span className={styles.kicker}>{cur.slot.toUpperCase()}</span>
          <h3 className={styles.itemTitle}>{cur.tool}</h3>
          <span className={styles.rarity}>{rarityLabels[cur.rarity]}</span>
          <p className={styles.itemText}>{cur.usage}</p>
        </motion.section>
      </AnimatePresence>

      <nav className={styles.tabs} aria-label="Onglets de la fiche">
        {characterTabs.map((t) => (
          <button key={t.id} type="button" className={styles.tab} aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
            <span className={`${styles.tabShape} shape-tag`} aria-hidden="true" />
            <span className={styles.tabLabel}>{t.label}</span>
          </button>
        ))}
      </nav>

      <CloseButton size={64} style={{ right: 36, top: 36 }} />
    </ImageSlot>
  );
}
