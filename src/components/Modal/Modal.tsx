import { FC } from 'react'
import './modal.scss'
import Button from '../Button/Button'
import IconO from '../icons/IconO'

const Modal: FC = () => {


  const subtitle = 'OH NO, YOU LOST…' || 'YOU WON!' || null;

  const title = 'TAKES THE ROUND' || 'ROUND TIED' || 'RESTART GAME?';

  const titleIcon = true || false;

  return (
    <div className="modal">
      <div className="modal__content">
        <div className='modal__subtitle'>OH NO, YOU LOST…</div>
        <h2 className='modal__title h-l'><IconO /> TAKES THE ROUND</h2>
        <div className='modal__btns'>
          <Button label='QUIT' color='silver' variant='secondary'/>
          <Button label='NEXT ROUND' variant='secondary' />

          {/* <Button label='NO, CANCEL' color='silver' variant='secondary'/>
          <Button label='YES, RESTART' variant='secondary' /> */}
        </div>
      </div>
    </div>
  )
}

export default Modal
