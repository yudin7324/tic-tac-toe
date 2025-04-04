import { FC } from 'react'
import './turn.scss'
import IconSelectO from '../icons/IconSelectO';
import IconSelectX from '../icons/IconSelectX';

interface TurnProps {
  value: number;
}

const Turn: FC<TurnProps> = ({ value }) => {
  return (
    <div className='turn'>
      {value === 0 ? <IconSelectO/> : <IconSelectX/>}
      <span className='turn__title'>turn</span>
    </div>
  )
}

export default Turn
