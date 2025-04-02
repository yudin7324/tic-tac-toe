import { FC } from 'react'
import './select.scss'


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
        <span className="select__slider"></span>
      </label>

      <div className='select__subtitle'>REMEMBER : X GOES FIRST</div>
    </div>
  )
}

export default Select
