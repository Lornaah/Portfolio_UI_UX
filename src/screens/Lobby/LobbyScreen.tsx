import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { dialogueLines } from '../../data/lobby';
import { infoPanels } from '../../data/spells';
import { profile } from '../../data/profile';
import { AchievementToast } from './AchievementToast';
import { Astrolabe } from './Astrolabe';
import { DialogueBox } from './DialogueBox';
import type { Popover } from './GameLayout';
import { InfoPanel } from './InfoPanel';
import { LevelBanner } from './LevelBanner';
import styles from './Lobby.module.css';
import { OptionsPanel } from './OptionsPanel';
import { QuestNotices } from './QuestNotices';
import { Satchel } from './Satchel';
import { SceneLayers } from './SceneLayers';
import { SpellBar } from './SpellBar';

interface LobbyProps {
  inert: boolean;
  popover: Popover;
  onPopover: (p: Exclude<Popover, null>) => void;
  onClosePopover: () => void;
}

/** 04 · Lobby (HUD) : scène plein écran en calques + interface de jeu. */
export function LobbyScreen({ inert, popover, onPopover, onClosePopover }: LobbyProps) {
  const [line, setLine] = useState(0);
  const nextLine = () => setLine((l) => (l + 1) % dialogueLines.length);

  const closeAndRefocus = (spellId: string) => {
    onClosePopover();
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-spell-id="${spellId}"]`)?.focus());
  };

  return (
    <main className={styles.lobby} inert={inert} aria-label="Lobby">
      <h1 className="sr-only">{profile.fullName} · portfolio</h1>
      <SceneLayers onTalk={nextLine} />
      <DialogueBox line={dialogueLines[line]} onNext={nextLine} />
      <LevelBanner />
      <Astrolabe />
      <QuestNotices />
      <AchievementToast />
      <SpellBar popover={popover} onPopover={onPopover} />
      <AnimatePresence>
        {popover === 'options' && <OptionsPanel key="options" onClose={() => closeAndRefocus('options')} />}
        {popover && popover !== 'options' && (
          <InfoPanel key={popover} panel={infoPanels[popover]} onClose={() => closeAndRefocus(popover)} />
        )}
      </AnimatePresence>
      <Satchel />
    </main>
  );
}
