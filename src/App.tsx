import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, MemoryRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { DemoNav } from './demo/DemoNav';
import { Stage } from './components/Stage';
import { CharacterSelectScreen } from './screens/CharacterSelect/CharacterSelectScreen';
import { LaunchScreen } from './screens/Launch/LaunchScreen';
import { AchievementsScreen, CharacterScreen, MapScreen, QuestBoardScreen, TalentsScreen } from './screens/lazy';
import { GameLayout } from './screens/Lobby/GameLayout';
import { TextVersionScreen } from './screens/TextVersion/TextVersionScreen';
import { SettingsProvider } from './state/Settings';

const IS_DEMO = import.meta.env.VITE_DEMO === 'true';

/** En démo (fichier unique, sans serveur), les routes vivent en mémoire : aucune URL à gérer. */
function Router({ children }: { children: ReactNode }) {
  return IS_DEMO ? <MemoryRouter>{children}</MemoryRouter> : <BrowserRouter>{children}</BrowserRouter>;
}

/** Ouverture + sélection : remontée à chaque navigation (permet de rejouer l'ouverture). */
function OpeningRoute() {
  const location = useLocation();
  return <CharacterSelectScreen key={location.key} />;
}

export function App() {
  return (
    <Router>
      <SettingsProvider>
        <Routes>
          {/* Version texte : page HTML classique, hors scène de jeu */}
          <Route path="/version-texte" element={<TextVersionScreen />} />
          <Route
            path="*"
            element={
              <Stage>
                <Suspense fallback={null}>
                  <Routes>
                    <Route path="/" element={<OpeningRoute />} />
                    <Route path="/selection" element={<CharacterSelectScreen />} />
                    <Route path="/lancement" element={<LaunchScreen />} />
                    <Route path="/jeu" element={<GameLayout />}>
                      <Route path="faits-d-armes" element={<AchievementsScreen />} />
                      <Route path="talents" element={<TalentsScreen />} />
                      <Route path="personnage" element={<CharacterScreen />} />
                      <Route path="carte" element={<MapScreen />} />
                      <Route path="quetes" element={<QuestBoardScreen />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Stage>
            }
          />
        </Routes>
        {IS_DEMO && <DemoNav />}
      </SettingsProvider>
    </Router>
  );
}
