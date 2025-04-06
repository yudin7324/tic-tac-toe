import { FC } from 'react'
import './home.scss'
import IconLogo from '@/components/icons/IconLogo'
import Button from '@/components/Button/Button'
import Select from '@/components/Select/Select'
import { GameConfig } from '@/types/types'
import { useNavigate } from 'react-router-dom'

interface HomeProps {
  gameConfig: GameConfig;
  setGameConfig: (config: GameConfig) => void;
}

const Home: FC<HomeProps> = ({ gameConfig, setGameConfig }) => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <div className="home__logo">
        <IconLogo />
      </div>
      <Select
        playerSymbol={gameConfig.playerSymbol}
        setPlayerSymbol={(symbol) =>
          setGameConfig({ ...gameConfig, playerSymbol: symbol })
        }
      />
      <div className='home__btns'>
      <Button label="NEW GAME (VS CPU)" onClick={() => {
        setGameConfig({ ...gameConfig, mode: 'cpu' });
        navigate('/game');
      }} />

      <Button label="NEW GAME (VS PLAYER)" color="blue" onClick={() => {
        setGameConfig({ ...gameConfig, mode: 'pvp' });
        navigate('/game');
      }} />
      </div>
    </div>
  )
}

export default Home
