import { FC } from 'react';
import './home.scss';
import IconLogo from '@/components/icons/IconLogo';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import { GameConfig, GameMode } from '@/types/types';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  gameConfig: GameConfig;
  setGameConfig: (config: GameConfig) => void;
}

const Home: FC<HomeProps> = ({ gameConfig, setGameConfig }) => {
  const navigate = useNavigate();

  const startGame = (mode: GameMode) => {
    const config = { ...gameConfig, mode };
    setGameConfig(config);
    localStorage.setItem('game-config', JSON.stringify(config));
    navigate('/game');
  };

  return (
    <div className="home">
      <div className='home__wrap'>
        <div className="home__logo">
          <IconLogo />
        </div>
        <Select
          playerSymbol={gameConfig.playerSymbol}
          setPlayerSymbol={(symbol) =>
            setGameConfig({ ...gameConfig, playerSymbol: symbol })
          }
        />
        <div className="home__btns">
          <Button label="NEW GAME (VS CPU)" onClick={() => startGame('cpu')} />
          <Button label="NEW GAME (VS PLAYER)" color="blue" onClick={() => startGame('pvp')} />
        </div>
      </div>
    </div>
  );
};

export default Home;
