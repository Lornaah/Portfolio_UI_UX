import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CloseButton } from '../../components/CloseButton';
import { ImageSlot } from '../../components/ImageSlot';
import { achievements } from '../../data/achievements';
import { defaultTalentId, talentsMeta, talentTrees } from '../../data/talents';
import { useSettings } from '../../state/settingsContext';
import styles from './Talents.module.css';

/** Géométrie des arbres (px dans la page de 1340×820), reprise de la maquette. */
const COL_W = 446;
const ROOT_Y = 680;
const BRANCH_Y = 555;
const LEAF_Y = [450, 355, 260];
const BRANCH_DX = [-140, 0, 140];
const ZIG = [-24, 24, -24];

interface NodeInfo {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  learned: boolean;
  crumb: string;
  desc: string;
  status: string;
  col: number;
  usedIn: string[];
  isBranch: boolean;
}

function buildTrees() {
  let lines = '';
  let dashed = '';
  const nodes: NodeInfo[] = [];
  const trees = talentTrees.map((t, ti) => {
    const cx = COL_W * ti + COL_W / 2;
    const treeNodes: NodeInfo[] = [];
    t.branches.forEach((b, bi) => {
      const bx = cx + BRANCH_DX[bi];
      lines += `M${cx} ${ROOT_Y} C${cx} ${ROOT_Y - 60} ${bx} ${BRANCH_Y + 60} ${bx} ${BRANCH_Y} `;
      treeNodes.push({ id: b.id, label: b.label, x: bx, y: BRANCH_Y, size: 52, learned: true, crumb: `${t.name} · branche`, desc: b.desc, status: 'BRANCHE', col: ti, usedIn: [], isBranch: true });
      let px = bx;
      let py = BRANCH_Y;
      b.talents.forEach((l, li) => {
        const lx = bx + ZIG[li];
        const ly = LEAF_Y[li];
        const learned = l.status === 'acquired';
        const seg = `M${px} ${py} L${lx} ${ly} `;
        if (learned) lines += seg;
        else dashed += seg;
        treeNodes.push({ id: l.id, label: l.label, x: lx, y: ly, size: 42, learned, crumb: `${t.name} · ${b.label}`, desc: l.desc, status: learned ? 'ACQUIS' : 'EN COURS', col: ti, usedIn: l.usedIn, isBranch: false });
        px = lx;
        py = ly;
      });
    });
    nodes.push(...treeNodes);
    return { tree: t, cx, nodes: treeNodes };
  });
  return { lines, dashed, nodes, trees };
}

/** 05 · Talents [T] : 3 arbres sur une page de grimoire, page arrachée pour le détail. */
export function TalentsScreen() {
  const { lines, dashed, nodes, trees } = useMemo(() => buildTrees(), []);
  const [sel, setSel] = useState<string>(defaultTalentId);
  const { playSfx } = useSettings();
  const cur = nodes.find((n) => n.id === sel);
  const onRight = cur ? cur.col !== 2 : true;
  // La page de détail recouvre un arbre (comme la maquette) : on le rend inerte pour qu'aucun nœud caché ne reste focusable.
  const covered = cur ? (onRight ? 2 : 0) : -1;

  return (
    <ImageSlot id="talents.background" plain className={styles.screen}>
      <span className={`${styles.bgHatch} hatch`} aria-hidden="true" />
      <ImageSlot id="talents.page" plain className={styles.page}>
        <header className={styles.header}>
          <span className={styles.kicker}>{talentsMeta.kicker}</span>
          <h2 className={styles.title}>{talentsMeta.title}</h2>
          <span className={styles.summary}>{talentsMeta.summary}</span>
        </header>
        <span className={styles.divider} style={{ left: 446 }} aria-hidden="true" />
        <span className={styles.divider} style={{ left: 892 }} aria-hidden="true" />
        <svg width="1340" height="820" viewBox="0 0 1340 820" className={styles.lines} aria-hidden="true">
          <path d={lines} stroke="var(--c-ink)" strokeWidth="2" fill="none" />
          <path d={dashed} stroke="var(--c-stone-4)" strokeWidth="2" strokeDasharray="5 5" fill="none" />
        </svg>

        {trees.map(({ tree, cx, nodes: tn }, ti) => (
          <div key={tree.id} role="group" aria-label={`Arbre ${tree.name}, ${tree.points}`} inert={ti === covered}>
            <div className={styles.root} style={{ left: cx - 110, top: ROOT_Y - 37 }} aria-hidden="true">
              <span className={styles.rootDisc}>{tree.short}</span>
              <span className={`${styles.rootRibbon} shape-ribbon-3`}>{tree.name} · {tree.points}</span>
            </div>
            {tn.map((n) => (
              <button
                key={n.id}
                type="button"
                className={styles.node}
                style={{ left: n.x - 44, top: n.y - n.size / 2 }}
                aria-pressed={n.id === sel}
                aria-label={`${n.label}${n.isBranch ? ' (branche)' : ''}, ${n.status.toLowerCase()}`}
                data-learned={n.learned}
                onClick={() => {
                  setSel(n.id);
                  playSfx('sfx.page');
                }}
              >
                <span className={styles.dot} style={{ width: n.size, height: n.size }} />
                <span className={styles.nodeLabel}>{n.label}</span>
              </button>
            ))}
          </div>
        ))}
      </ImageSlot>

      <AnimatePresence mode="wait">
        {cur && (
          <motion.section
            key={cur.id}
            aria-label="Page du talent"
            aria-live="polite"
            className={styles.detail}
            style={{ left: onRight ? 930 : 90 }}
            initial={{ opacity: 0, x: onRight ? 120 : -120, rotate: onRight ? 10 : -10 }}
            animate={{ opacity: 1, x: 0, rotate: onRight ? 3 : -3 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ImageSlot id="talents.ripped-page" plain className={`${styles.detailPaper} shape-ripped-left`}>
              <span className={styles.crumb}>{cur.crumb.toUpperCase()}</span>
              <h3 className={styles.detailTitle}>{cur.label}</h3>
              <span className={styles.stamp}>{cur.status}</span>
              <ImageSlot id={`talents.illustration.${cur.id}`} className={styles.illu} />
              <p className={styles.desc}>{cur.desc}</p>
              <span className={styles.crumb}>UTILISÉ DANS</span>
              {cur.usedIn.length ? (
                <ul className={styles.used}>
                  {cur.usedIn.map((id) => {
                    const a = achievements.find((x) => x.id === id);
                    return a ? (
                      <li key={id}><Link to={`/jeu/faits-d-armes?medaille=${id}`}>{a.title}</Link></li>
                    ) : null;
                  })}
                </ul>
              ) : (
                <span className={styles.usedPlaceholder}>{talentsMeta.usedInPlaceholder}</span>
              )}
              <button type="button" className={styles.putBack} onClick={() => setSel('')}>
                Reposer la page
              </button>
            </ImageSlot>
          </motion.section>
        )}
      </AnimatePresence>

      <CloseButton style={{ right: 22, top: 18 }} />
    </ImageSlot>
  );
}
