import { FC, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '@/pages/Home/Home'
import Game from '@/pages/Game/Game'

const App:FC = () => {
  const [playerSymbol, setPlayerSymbol] = useState<number>(1);

  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<Home playerSymbol={playerSymbol} setPlayerSymbol={setPlayerSymbol} />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
