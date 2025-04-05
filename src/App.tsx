import { FC, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import Game from '@/pages/Game/Game'
import { GameConfig, PlayerSymbol } from './types/types';

const App:FC = () => {
  const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(1);
  const [gameConfig, setGameConfig] = useState<GameConfig>({ mode: 'pvp', playerSymbol: 1});

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Home 
            playerSymbol={playerSymbol}
            setPlayerSymbol={setPlayerSymbol}
            setGameConfig={setGameConfig} 
          />} />
          <Route path="/game" element={<Game config={gameConfig} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
