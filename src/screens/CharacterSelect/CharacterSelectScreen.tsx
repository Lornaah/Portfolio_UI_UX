import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { classes, dialRingText } from '../../data/classes';
import { profile } from '../../data/profile';
import { selectCopy } from '../../data/screens';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useSettings } from '../../state/settingsContext';
import styles from './CharacterSelect.module.css';

const CX = 620;
const CY = 450;
const R = 372;
const N = classes.length;

function ticksPath() {
  let t = '';
  for (let a = 0; a < 72; a++) {
    const rad = (a * 5 * Math.PI) / 180;
    const len = a % 6 === 0 ? 18 : 8;
    t += `M${(CX + R * Math.cos(rad)).toFixed(1)} ${(CY + R * Math.sin(rad)).toFixed(1)} L${(CX + (R - len) * Math.cos(rad)).toFixed(1)} ${(CY + (R - len) * Math.sin(rad)).toFixed(1)} `;
  }
  return t;
}

/** 02 · Sélection du personnage : cadran rotatif à 3 médaillons de classe. */
export function CharacterSelectScreen() {
  const navigate = useNavigate();
  const { chosenClass, setChosenClass, music, setMusic } = useSettings();
  const [i, setI] = useState(() => Math.max(0, classes.findIndex((c) => c.id === chosenClass)));
  const [turns, setTurns] = useState(0);
  const drag = useRef<number | null>(null);
  const ticks = useMemo(() => ticksPath(), []);
  const cur = classes[i];

  const step = (d: number) => {
    setI((v) => (v + d + N) % N);
    setTurns((t) => t + d);
  };
  const pick = (k: number) => {
    let d = (k - i + N) % N;
    if (d === 2) d = -1;
    setI(k);
    setTurns((t) => t + d);
  };
  const discover = () => setChosenClass(cur.id);

  useHotkeys({
    ArrowLeft: () => step(-1),
    ArrowRight: () => step(1),
    Enter: (e) => {
      // « sceau · Entrée » : seulement si aucun contrôle n'a le focus (sinon Entrée active ce contrôle)
      if (document.activeElement === document.body) {
        e.preventDefault();
        discover();
        navigate('/lancement');
      }
    },
  });

  return (
    <main className={styles.screen} aria-label="Sélection du personnage">
      <ImageSlot id="select.background" plain className={styles.bg}>
        <span className={`${styles.bgHatch} hatch`} />
      </ImageSlot>

      <ImageSlot id="select.nameplate" plain className={styles.nameplate}>
        <h1 className={styles.name}>{profile.fullName.toUpperCase()}</h1>
        <span className={styles.nameHint}>{selectCopy.nameplateHint}</span>
      </ImageSlot>

      {/* Zone de glisser : un geste horizontal fait tourner le cadran (pas de suivi de la souris). */}
      <div
        className={styles.dragZone}
        aria-hidden="true"
        onPointerDown={(e) => {
          drag.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (drag.current === null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
        }}
        onPointerLeave={() => {
          drag.current = null;
        }}
      />

      <ImageSlot id="select.dial" plain className={styles.dial}>
        <svg width="1440" height="900" viewBox="0 0 1440 900" aria-hidden="true">
          <defs>
            <path id="ringText" d={`M ${CX} ${CY} m -332 0 a 332 332 0 1 1 664 0 a 332 332 0 1 1 -664 0`} />
          </defs>
          <circle cx={CX} cy={CY} r={R} fill="rgba(244,244,242,.35)" stroke="var(--c-ink)" strokeWidth="2" />
          <circle cx={CX} cy={CY} r="290" fill="none" stroke="var(--c-stone-4)" strokeWidth="1.5" strokeDasharray="4 8" />
          <g className={styles.ring} style={{ transform: `rotate(${-120 * turns}deg)` }}>
            <path d={ticks} stroke="var(--c-ink)" strokeWidth="2" fill="none" />
            <text fontSize="15" fontWeight="700" letterSpacing="6" fill="var(--c-ink-soft)">
              <textPath href="#ringText">{dialRingText}</textPath>
            </text>
            <path d="M620 78 L632 96 L620 114 L608 96 Z" fill="var(--c-ink)" />
          </g>
        </svg>
      </ImageSlot>

      <ImageSlot
        id={`select.hero.${cur.id}`}
        plain
        className={`${styles.hero} shape-arch`}
        showLabel
        label={<>Justine en pied<br />tenue : {cur.name}<br />flotte au centre du cadran</>}
      />

      <div role="group" aria-label="Classes">
        {classes.map((c, k) => {
          const on = k === i;
          const rel = (((k - i) % N) + N) % N;
          const ang = ((-90 + rel * 120) * Math.PI) / 180;
          const size = on ? 120 : 86;
          const x = CX + R * Math.cos(ang);
          const y = CY + R * Math.sin(ang);
          return (
            <button
              key={c.id}
              type="button"
              className={styles.medal}
              style={{ left: x - 80, top: y - size / 2 }}
              aria-pressed={on}
              aria-label={`Classe ${c.name}`}
              onClick={() => pick(k)}
            >
              <ImageSlot id={`select.medallion.${c.id}`} as="span" plain className={styles.disc} style={{ width: size, height: size }}>
                <span aria-hidden="true">{c.short}</span>
              </ImageSlot>
              {!on && <span className={styles.medalLabel} aria-hidden="true">{c.name}</span>}
            </button>
          );
        })}
      </div>

      <button type="button" className={styles.turn} style={{ left: 222 }} onClick={() => step(-1)} aria-label={selectCopy.prev}>
        <span aria-hidden="true">↺</span>
      </button>
      <button type="button" className={styles.turn} style={{ left: 962 }} onClick={() => step(1)} aria-label={selectCopy.next}>
        <span aria-hidden="true">↻</span>
      </button>

      <div className={`${styles.ribbon} shape-ribbon-2`}>
        <span className={styles.ribbonName}>{profile.firstName}</span>
        <span className={styles.ribbonSub}>{cur.name} · Niv. {profile.level}</span>
      </div>

      <Link to="/lancement" className={styles.seal} aria-label={selectCopy.sealAria} onClick={discover}>
        <ImageSlot id="select.seal" as="span" plain className={styles.sealArt}>
          <span className={styles.sealWord}>{selectCopy.seal}</span>
          <span className={styles.sealHint}>{selectCopy.sealHint}</span>
        </ImageSlot>
      </Link>

      <AnimatePresence mode="wait">
        <motion.section
          key={cur.id}
          aria-label="Détail de la classe"
          aria-live="polite"
          className={styles.sheetWrap}
          initial={{ opacity: 0, y: -120, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          exit={{ opacity: 0, y: 60, rotate: 8, transition: { duration: 0.2 } }}
          transition={{ duration: 0.5, ease: [0.3, 1.2, 0.5, 1] }}
        >
          <ImageSlot id="select.sheet" plain className={`${styles.sheet} shape-torn-bottom`}>
            <span className={styles.kicker}>{selectCopy.sheetKicker(i + 1, N)}</span>
            <h2 className={styles.className}>{cur.name}</h2>
            <p className={styles.line}>« {cur.line} »</p>
            <p className={styles.pitch}>{cur.pitch}</p>
            <span className={styles.kicker} style={{ marginTop: 6 }}>{selectCopy.talentsKicker}</span>
            <ul className={styles.chips}>
              {cur.talents.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <span className={styles.kicker} style={{ marginTop: 6 }}>{selectCopy.questsKicker}</span>
            <ul className={styles.quests}>
              {cur.quests.map((q) => (
                <li key={q}><span className={styles.diamond} aria-hidden="true" />{q}</li>
              ))}
            </ul>
          </ImageSlot>
        </motion.section>
      </AnimatePresence>
      <span className={styles.sheetPin} aria-hidden="true" />

      <nav className={styles.quick} aria-label="Accès rapides">
        <Link to="/version-texte" className={styles.quickItem}>
          <span className={styles.quickIcon} aria-hidden="true" />
          <span>{selectCopy.quickLinks.text}</span>
        </Link>
        <a href={profile.cvHref} download className={styles.quickItem}>
          <span className={styles.quickIcon} aria-hidden="true" />
          <span>{selectCopy.quickLinks.cv}</span>
        </a>
        <button type="button" className={styles.quickItem} aria-pressed={music} onClick={() => setMusic(!music)}>
          <span className={styles.quickIcon} data-on={music} aria-hidden="true" />
          <span>{selectCopy.quickLinks.sound}</span>
        </button>
      </nav>
    </main>
  );
}
