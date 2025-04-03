import { FC } from 'react'
import './select.scss'
import IconSelectO from '@/components/icons/IconSelectO';
import IconSelectX from '@/components/icons/IconSelectX';


interface SelectProps {
  playerSymbol: number;
  setPlayerSymbol: (arg: number) => void;
}

const Select: FC<SelectProps> = ({ playerSymbol, setPlayerSymbol }) => {
  return (
    <div className='select'>

      <div className='select__title h-xs'>PICK PLAYER 1’S MARK</div>

      <label className="select__switch">
        <input 
          className='select__checkbox'
          type="checkbox" 
          checked={playerSymbol === 0} 
          onChange={() => setPlayerSymbol(playerSymbol === 0 ? 1 : 0)} 
        />
        <div className="select__slider">
          <div className={`select__slider-icon ${playerSymbol === 1 ? 'active' : ''}`}>
            <IconSelectX />
          </div>
          <div className={`select__slider-icon ${playerSymbol === 0 ? 'active': ''}`}>
            <IconSelectO />
          </div>
        </div>
      </label>

      <div className='select__subtitle'>REMEMBER : X GOES FIRST</div>
    </div>
  )
}

export default Select
