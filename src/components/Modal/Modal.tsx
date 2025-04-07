import { FC } from 'react';
import './modal.scss';
import Button from '../Button/Button';
import IconO from '../icons/IconO';
import IconX from '../icons/IconX';

interface ModalProps {
  isOpen: boolean;
  winner: 1 | 0 | 'tie' | null;
  playerSymbol: 1 | 0;
  onQuit: () => void;
  onNext: () => void;
  onRestart?: () => void;
  type?: 'result' | 'confirm';
}

const Modal: FC<ModalProps> = ({
  isOpen,
  winner,
  playerSymbol,
  onQuit,
  onNext,
  onRestart,
  type = 'result'
}) => {
  if (!isOpen) return null;

  const isTie = winner === 'tie';
  const isPlayerWin = winner === playerSymbol;

  const renderTitle = () => {
    if (isTie) return <h2 className='modal__title h-l'>ROUND TIED</h2>;
    if (winner === 1) return <h2 className='modal__title h-l modal__title--blue'><IconX /> TAKES THE ROUND</h2>;
    if (winner === 0) return <h2 className='modal__title h-l modal__title--yellow'><IconO /> TAKES THE ROUND</h2>;
    return null;
  };

  const renderSubtitle = () => {
    if (isTie) return null;
    return isPlayerWin ? 'YOU WON!' : 'OH NO, YOU LOST…';
  };

  const renderButtons = () => {
    if (type === 'confirm') {
      return (
        <>
          <Button label='NO, CANCEL' color='silver' variant='secondary' onClick={onQuit} />
          <Button label='YES, RESTART' variant='secondary' onClick={onRestart} />
        </>
      );
    }

    return (
      <>
        <Button label='QUIT' color='silver' variant='secondary' onClick={onQuit} />
        <Button label='NEXT ROUND' variant='secondary' onClick={onNext} />
      </>
    );
  };

  return (
    <div className="modal">
      <div className="modal__content">
        {renderSubtitle() && <div className='modal__subtitle'>{renderSubtitle()}</div>}
        {renderTitle()}
        <div className='modal__btns'>
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
