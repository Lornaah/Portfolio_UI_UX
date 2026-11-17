import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Stage } from './components/Stage';
import { CharacterSelectScreen } from './screens/CharacterSelect/CharacterSelectScreen';
import { LaunchScreen } from './screens/Launch/LaunchScreen';
import { AchievementsScreen, CharacterScreen, MapScreen, TalentsScreen } from './screens/lazy';
import { GameLayout } from './screens/Lobby/GameLayout';
import { RevealScreen } from './screens/Reveal/RevealScreen';
import { TextVersionScreen } from './screens/TextVersion/TextVersionScreen';
import { SettingsProvider } from './state/Settings';

export function App() {
  return (
    <BrowserRouter>
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
                    <Route path="/" element={<RevealScreen />} />
                    <Route path="/selection" element={<CharacterSelectScreen />} />
                    <Route path="/lancement" element={<LaunchScreen />} />
                    <Route path="/jeu" element={<GameLayout />}>
                      <Route path="faits-d-armes" element={<AchievementsScreen />} />
                      <Route path="talents" element={<TalentsScreen />} />
                      <Route path="personnage" element={<CharacterScreen />} />
                      <Route path="carte" element={<MapScreen />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </Stage>
            }
          />
        </Routes>
      </SettingsProvider>
    </BrowserRouter>
  );
}
