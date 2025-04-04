import { FC } from 'react'
import './game.scss'
import Cell from '@/components/Cell/Cell'
import IconLogo from '@/components/icons/IconLogo'
import Stat from '@/components/Stat/Stat'
import Turn from '@/components/Turn/Turn'
import IconRestart from '@/components/icons/IconRestart'

const Game: FC = () => {
  return (
    <div className='game'>
      <div className='game__heading'>
        <IconLogo />
        <Turn value={1} />
        <button 
          className='game__restart'
          type='button'
          aria-label='restart button'
        >
          <IconRestart />
        </button>
      </div>
      <div className='game__grid'>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
      <div className='game__statistics'>
        <Stat title={'X (YOU)'} color='blue' />
        <Stat title={'TIES'} color='silver' />
        <Stat title={'O (CPU)'} color='yellow' />
      </div>
    </div>
  )
}

export default Game
