import { FC } from 'react'
import './select.scss'
import IconSelectO from '@/components/icons/IconSelectO';
import IconSelectX from '@/components/icons/IconSelectX';
import { PlayerSymbol } from '@/types/types';

interface SelectProps {
  playerSymbol: number;
  setPlayerSymbol:(symbol: PlayerSymbol) => void;
}

const Select: FC<SelectProps> = ({ playerSymbol, setPlayerSymbol }) => {
  return (
    <div className='select'>
      <label className='select__title h-xs' htmlFor="select">PICK PLAYER 1’S MARK</label>
      <label className="select__switch">
        <input 
          className='select__checkbox'
          type="checkbox" 
          checked={playerSymbol === 0} 
          onChange={() => setPlayerSymbol(playerSymbol === 0 ? 1 : 0)} 
          id="select"
        />
        <span className="select__slider">
          <span className={`select__slider-icon ${playerSymbol === 1 && 'active'}`}>
            <IconSelectX />
          </span>
          <span className={`select__slider-icon ${playerSymbol === 0 && 'active'}`}>
            <IconSelectO />
          </span>
        </span>
      </label>
      <div className='select__subtitle'>REMEMBER : X GOES FIRST</div>
    </div>
  )
}

export default Select
