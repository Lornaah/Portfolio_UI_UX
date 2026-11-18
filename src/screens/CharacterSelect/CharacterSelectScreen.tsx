import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageSlot } from '../../components/ImageSlot';
import { classes, dialRingText } from '../../data/classes';
import { profile } from '../../data/profile';
import { introCopy, selectCopy } from '../../data/screens';
import { useAmbientLoop } from '../../hooks/useAmbientLoop';
import { useHotkeys } from '../../hooks/useHotkeys';
import { useSettings } from '../../state/settingsContext';
import { preloadGame } from '../lazy';
import { Armory, Brazier } from './Armory';
import styles from './CharacterSelect.module.css';
import { Hooded, type Pose } from './Hooded';
import { Hand, Lantern } from './Lantern';

const N = classes.length;
const LIT_KEY = 'portfolio-mmo.lantern-lit';
const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Étapes de l'ouverture : noir → étincelle → la lanterne s'avance → braseros → interface. */
type Stage = 'dark' | 'spark' | 'advance' | 'braziers' | 'ready';
/** Début de chaque étape après le clic (ms). Total ≈ 3 s. */
const TIMELINE: [Stage, number][] = [['advance', 550], ['braziers', 1750], ['ready', 2500]];

function alreadyLit() {
  try {
    return localStorage.getItem(LIT_KEY) === '1';
  } catch {
    return false;
  }
}

function ticksPath() {
  let t = '';
  for (let a = 0; a < 72; a++) {
    const rad = (a * 5 * Math.PI) / 180;
    const len = a % 6 === 0 ? 22 : 10;
    t += `M${(320 + 310 * Math.cos(rad)).toFixed(1)} ${(320 + 310 * Math.sin(rad)).toFixed(1)} L${(320 + (310 - len) * Math.cos(rad)).toFixed(1)} ${(320 + (310 - len) * Math.sin(rad)).toFixed(1)} `;
  }
  return t;
}

/**
 * 01 + 02 · Ouverture et sélection du personnage.
 * Une main tient une lanterne dans le noir ; allumée, elle s'avance et éclaire
 * l'armurerie. La silhouette encapuchonnée se retourne, l'interface se met en place.
 * Second passage et mouvement réduit : la pièce est déjà éclairée.
 */
export function CharacterSelectScreen() {
  const navigate = useNavigate();
  const { chosenClass, setChosenClass, music, setMusic, reducedMotion, playSfx } = useSettings();
  const [stage, setStage] = useState<Stage>(() => (reducedMotion || alreadyLit() ? 'ready' : 'dark'));
  const [i, setI] = useState(() => Math.max(0, classes.findIndex((c) => c.id === chosenClass)));
  const [turns, setTurns] = useState(0);
  const [pose, setPose] = useState<Pose>(stage === 'ready' ? 'front' : 'back');
  const [leaving, setLeaving] = useState(false);
  const lightRef = useRef<HTMLButtonElement>(null);
  const radioRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ticks = useMemo(() => ticksPath(), []);
  const cur = classes[i];
  const lit = stage !== 'dark';
  const ready = stage === 'ready';
  const [fromIntro] = useState(stage !== 'ready');

  useAmbientLoop('sfx.fire.loop', stage === 'braziers' || ready, 0.35);

  useEffect(() => {
    if (stage === 'dark') lightRef.current?.focus({ preventScroll: true });
  }, [stage]);

  const ignite = () => {
    if (stage !== 'dark') return;
    setStage('spark');
    playSfx('sfx.intro.ignite');
    try {
      localStorage.setItem(LIT_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const skip = () => {
    setStage('ready');
    setPose('front');
  };

  // Déroulé après le clic sur « Allumer la lanterne » (lancé une fois, au passage à 'spark')
  const started = stage !== 'dark';
  useEffect(() => {
    if (!started) return;
    const timers = TIMELINE.map(([s, ms]) => window.setTimeout(() => setStage((cur) => (cur === 'ready' ? cur : s)), ms));
    timers.push(window.setTimeout(() => setPose('three'), 1850));
    timers.push(window.setTimeout(() => setPose('front'), 2150));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [started]);

  // Dans le noir : n'importe quelle touche allume (sauf navigation clavier)
  useEffect(() => {
    if (stage !== 'dark') return;
    const onKey = (e: KeyboardEvent) => {
      if (['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'Escape'].includes(e.key)) return;
      if (e.target instanceof HTMLButtonElement) return;
      ignite();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const select = (k: number, d?: number) => {
    if (k === i) return;
    const delta = d ?? (((k - i + N) % N) === 2 ? -1 : (k - i + N) % N);
    setI(k);
    setTurns((t) => t + delta);
    playSfx('sfx.select.class');
    if (!reducedMotion) {
      setPose('three');
      window.setTimeout(() => setPose('front'), 260);
    }
  };
  const step = (d: number) => select((i + d + N) % N, d);

  const play = () => {
    if (leaving) return;
    setChosenClass(cur.id);
    setLeaving(true);
    preloadGame();
    window.setTimeout(() => navigate('/jeu'), reducedMotion ? 0 : 700);
  };

  useHotkeys({
    Escape: () => {
      if (!ready) skip();
    },
    ArrowLeft: () => ready && step(-1),
    ArrowRight: () => ready && step(1),
    Enter: (e) => {
      if (ready && document.activeElement === document.body) {
        e.preventDefault();
        play();
      }
    },
  });

  // Radiogroup : flèches dans la liste = changement de classe + focus suivant
  const onRadioKey = (e: ReactKeyboardEvent, k: number) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (k + d + N) % N;
    select(n, d);
    radioRefs.current[n]?.focus();
  };

  // Halo de révélation : suit la lanterne, puis s'efface
  const mask = {
    dark: { cx: 720, cy: 640, r: 0, o: 1 },
    spark: { cx: 720, cy: 640, r: 150, o: 1 },
    advance: { cx: 720, cy: 150, r: 760, o: 0.92 },
    braziers: { cx: 720, cy: 300, r: 1500, o: 0.4 },
    ready: { cx: 720, cy: 300, r: 1600, o: 0 },
  }[stage];

  return (
    <main className={styles.screen} aria-label="Sélection du personnage">
      <Armory />

      {/* Plateforme runique au sol (le cadran, vu en perspective) */}
      <div className={styles.platformWrap} aria-hidden="true">
        <ImageSlot id="select.platform" plain className={styles.platform}>
          <svg width="640" height="640" viewBox="0 0 640 640">
            <defs>
              <path id="ringText" d="M 320 320 m -270 0 a 270 270 0 1 1 540 0 a 270 270 0 1 1 -540 0" />
            </defs>
            <circle cx="320" cy="320" r="310" fill="rgba(244,244,242,.18)" stroke="var(--c-ink)" strokeWidth="3" />
            <circle cx="320" cy="320" r="230" fill="none" stroke="var(--c-ink)" strokeWidth="1.5" strokeDasharray="6 10" />
            <g className={styles.ring} style={{ transform: `rotate(${-120 * turns}deg)` }}>
              <path d={ticks} stroke="var(--c-ink)" strokeWidth="2.5" fill="none" />
              <text fontSize="20" fontWeight="800" letterSpacing="8" fill="var(--c-ink)">
                <textPath href="#ringText">{dialRingText}</textPath>
              </text>
            </g>
          </svg>
        </ImageSlot>
      </div>

      <Brazier x={420} lit={stage === 'braziers' || ready} />
      <Brazier x={930} lit={stage === 'braziers' || ready} delay={0.25} />

      {/* Personnage central */}
      <div className={styles.hero} role="img" aria-label={selectCopy.silhouetteAria(cur.name)}>
        <Hooded pose={pose} cls={cur} />
      </div>
      <span className={styles.chain} data-lit={lit} aria-hidden="true" />

      {/* La lanterne : tenue en main, puis portée au fond de la pièce et suspendue au-dessus du personnage */}
      <motion.div
        className={styles.lanternGroup}
        aria-hidden="true"
        initial={false}
        animate={stage === 'dark' || stage === 'spark' ? { y: 470, scale: 1.25 } : { y: 0, scale: 0.34 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        <Lantern lit={lit} />
        <motion.div
          className={styles.handWrap}
          initial={false}
          animate={{ opacity: stage === 'dark' || stage === 'spark' ? 1 : 0, y: stage === 'advance' ? 30 : 0 }}
          transition={{ duration: 0.3, delay: stage === 'advance' ? 0.15 : 0 }}
        >
          <Hand />
        </motion.div>
      </motion.div>

      {/* Obscurité, percée par le halo de la lanterne */}
      <motion.div
        className={styles.darkness}
        aria-hidden="true"
        initial={false}
        animate={{ '--cx': `${mask.cx}px`, '--cy': `${mask.cy}px`, '--r': `${mask.r}px`, opacity: mask.o } as Record<string, string | number>}
        transition={{ duration: stage === 'spark' ? 0.5 : 1.2, ease: EASE }}
        style={{ pointerEvents: ready ? 'none' : 'auto' }}
      />

      {stage === 'dark' && (
        <div className={styles.lightPrompt}>
          <button ref={lightRef} type="button" className={styles.lightBtn} onClick={ignite}>
            {introCopy.light}
          </button>
          <span className={styles.pressKey}>{introCopy.pressKey}</span>
        </div>
      )}

      {/* Interface, qui se met en place une fois la pièce éclairée */}
      {ready && (
        <>
          <motion.div className={styles.left} initial={fromIntro ? { opacity: 0, x: -60 } : false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE }}>
            <ImageSlot id="select.nameplate" plain className={styles.nameplate}>
              <span className={styles.name}>{profile.fullName.toUpperCase()}</span>
              <span className={styles.nameHint}>{selectCopy.nameplateHint}</span>
            </ImageSlot>
            <div className={styles.heading}>
              <span className={styles.kicker}>{selectCopy.kicker}</span>
              <h1 className={styles.title}>{selectCopy.title}</h1>
            </div>
            <div role="radiogroup" aria-label={selectCopy.listLabel} className={styles.classList}>
              {classes.map((c, k) => {
                const on = k === i;
                return (
                  <button
                    key={c.id}
                    ref={(el) => {
                      radioRefs.current[k] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    tabIndex={on ? 0 : -1}
                    className={styles.classCard}
                    onClick={() => select(k)}
                    onKeyDown={(e) => onRadioKey(e, k)}
                  >
                    <ImageSlot id={`select.emblem.${c.id}`} as="span" plain className={styles.cardEmblem}>
                      <span aria-hidden="true">{c.short}</span>
                    </ImageSlot>
                    <span className={styles.cardText}>
                      <span className={styles.cardName}>{c.name}</span>
                      <span className={styles.cardLine}>{c.line}</span>
                    </span>
                    {on && <span className={styles.chosen}>◆ {selectCopy.chosen}</span>}
                  </button>
                );
              })}
            </div>
            <span className={styles.hint}>{selectCopy.hint}</span>
          </motion.div>

          <motion.div className={styles.arrows} initial={fromIntro ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <button type="button" className={styles.arrow} style={{ left: 500 }} onClick={() => step(-1)} aria-label={selectCopy.prev}>
              <span aria-hidden="true">‹</span>
            </button>
            <button type="button" className={styles.arrow} style={{ left: 880 }} onClick={() => step(1)} aria-label={selectCopy.next}>
              <span aria-hidden="true">›</span>
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.section
              key={cur.id}
              aria-label="Détail de la classe"
              aria-live="polite"
              className={styles.sheetWrap}
              initial={{ opacity: 0, y: -100, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              exit={{ opacity: 0, y: 50, rotate: 8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.45, ease: [0.3, 1.2, 0.5, 1], delay: fromIntro ? 0.15 : 0 }}
            >
              <span className={styles.sheetPin} aria-hidden="true" />
              <ImageSlot id="select.sheet" plain className={`${styles.sheet} shape-torn-bottom`}>
                <span className={styles.kicker}>{selectCopy.sheetKicker(i + 1, N)}</span>
                <h2 className={styles.className}>{cur.name}</h2>
                <p className={styles.line}>« {cur.line} »</p>
                <p className={styles.pitch}>{cur.pitch}</p>
                <span className={styles.kicker}>{selectCopy.talentsKicker}</span>
                <ul className={styles.chips}>{cur.talents.map((t) => <li key={t}>{t}</li>)}</ul>
                <span className={styles.kicker}>{selectCopy.questsKicker}</span>
                <ul className={styles.quests}>
                  {cur.quests.map((q) => (
                    <li key={q}><span className={styles.diamond} aria-hidden="true" />{q}</li>
                  ))}
                </ul>
              </ImageSlot>
            </motion.section>
          </AnimatePresence>

          <motion.div className={styles.bottom} initial={fromIntro ? { opacity: 0, y: 40 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25, ease: EASE }}>
            <div className={`${styles.ribbon} shape-ribbon-2`}>
              <span className={styles.ribbonName}>{profile.firstName}</span>
              <span className={styles.ribbonSub}>{cur.name} · Niv. {profile.level}</span>
            </div>
            <button type="button" className={styles.play} onClick={play}>
              <span className={styles.playLabel}>{selectCopy.play}</span>
              <span className={styles.playHint} aria-hidden="true">{selectCopy.playHint}</span>
            </button>
          </motion.div>

          <nav className={styles.quick} aria-label="Accès rapides">
            <Link to="/version-texte" className={styles.quickItem}>
              <span className={styles.quickIcon} aria-hidden="true" />
              <span>{selectCopy.quickLinks.text}</span>
            </Link>
            <a href={profile.cvHref} download className={styles.quickItem}>
              <span className={styles.quickIcon} aria-hidden="true" />
              <span>{selectCopy.quickLinks.cv}</span>
            </a>
          </nav>
        </>
      )}

      {/* Toujours accessibles : son, et « passer » pendant l'introduction */}
      <button
        type="button"
        className={styles.sound}
        aria-pressed={music}
        aria-label={music ? introCopy.soundOn : introCopy.soundOff}
        title={music ? introCopy.soundOn : introCopy.soundOff}
        onClick={() => setMusic(!music)}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 9h4l5-4v14l-5-4H4z" />
          {music ? <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="M16 9l5 6M21 9l-5 6" />}
        </svg>
      </button>
      {!ready && (
        <button type="button" className={styles.skip} onClick={skip}>
          {introCopy.skip} <span aria-hidden="true">→</span>
        </button>
      )}

      {leaving && (
        <motion.div
          className={styles.fadeOut}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeIn' }}
        />
      )}
    </main>
  );
}
