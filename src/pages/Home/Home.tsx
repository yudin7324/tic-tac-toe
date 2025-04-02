import IconLogo from '@/components/icons/IconLogo'
import Button from '@/components/Button/Button'
import { FC } from 'react'
import './home.scss'
import Select from '@/components/Select/Select'

interface HomeProps {
  playerSymbol: number;
  setPlayerSymbol: (arg: number) => void;
}

const Home: FC<HomeProps> = ({ playerSymbol, setPlayerSymbol }) => {
  return (
    <div className="home">
      <div className="home__logo">
        <IconLogo />
      </div>
      <Select playerSymbol={playerSymbol} setPlayerSymbol={setPlayerSymbol} />
      <div className='home__btns'>
        <Button as="link" to="/game" label="NEW GAME (VS CPU)" />
        <Button as="link" to="/game" label="NEW GAME  (VS PLAYER)" color="blue" />
      </div>
    </div>
  )
}

export default Home
