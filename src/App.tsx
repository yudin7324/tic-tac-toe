import { FC, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import Game from '@/pages/Game/Game'
import { GameConfig } from './types/types';

const App:FC = () => {

  const [gameConfig, setGameConfig] = useState<GameConfig>(() => {
    const saved = localStorage.getItem('game-config');
    return saved
      ? JSON.parse(saved)
      : { mode: 'pvp', playerSymbol: 1 };
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('game-config');
    if (savedConfig) {
      const parsed = JSON.parse(savedConfig);
      setGameConfig(parsed);
    }
  }, []);

  useEffect(() => {
    if (gameConfig) {
      localStorage.setItem('game-config', JSON.stringify(gameConfig));
    }
  }, [gameConfig]);

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Home gameConfig={gameConfig} setGameConfig={setGameConfig}/>}/>
          <Route path="/game" element={<Game config={gameConfig} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
