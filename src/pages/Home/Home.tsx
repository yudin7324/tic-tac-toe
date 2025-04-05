import { FC } from 'react'
import './home.scss'
import IconLogo from '@/components/icons/IconLogo'
import Button from '@/components/Button/Button'
import Select from '@/components/Select/Select'
import { GameConfig, GameMode, PlayerSymbol } from '@/types/types'
import { useNavigate } from 'react-router-dom'

interface HomeProps {
  playerSymbol: PlayerSymbol;
  setPlayerSymbol: (symbol: PlayerSymbol) => void;
  setGameConfig: (config: GameConfig) => void;
}

const Home: FC<HomeProps> = ({ playerSymbol, setPlayerSymbol, setGameConfig }) => {
  const navigate = useNavigate();

  const startGame = (mode: GameMode) => {
    setGameConfig({ mode, playerSymbol });
    navigate('/game');
  };

  return (
    <div className="home">
      <div className="home__logo">
        <IconLogo />
      </div>
      <Select playerSymbol={playerSymbol} setPlayerSymbol={setPlayerSymbol} />
      <div className='home__btns'>
        <Button label="NEW GAME (VS CPU)" onClick={() => startGame('cpu')} />
        <Button label="NEW GAME  (VS PLAYER)" color="blue" onClick={() => startGame('pvp')} />
      </div>
    </div>
  )
}

export default Home
