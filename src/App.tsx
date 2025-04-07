import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Game from '@/pages/Game/Game';
import { GameConfig } from './types/types';

const DEFAULT_CONFIG: GameConfig = {
  mode: 'cpu',
  playerSymbol: 1,
};

const App = () => {
  const [gameConfig, setGameConfig] = useState<GameConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    const saved = localStorage.getItem('game-config');
    if (saved) {
      setGameConfig(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('game-config', JSON.stringify(gameConfig));
  }, [gameConfig]);

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home gameConfig={gameConfig} setGameConfig={setGameConfig} />}
          />
          <Route path="/game" element={<Game config={gameConfig} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
