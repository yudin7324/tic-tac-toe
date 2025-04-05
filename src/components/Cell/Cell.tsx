import { FC, useState } from 'react';
import './cell.scss';
import IconO from '@/components/icons/IconO';
import IconX from '@/components/icons/IconX';
import IconOutlineX from '../icons/IconOutlineX';
import IconOutlineO from '../icons/IconOutlineO';

interface CellProps {
  value: 1 | 0 | null;
  onClick: () => void;
  preview: 1 | 0;
}

const Cell: FC<CellProps> = ({ value, onClick, preview }) => {
  const [hover, setHover] = useState(false);

  const isEmpty = value === null;

  return (
    <button
      className="cell"
      onClick={onClick}
      disabled={!isEmpty}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {value === 1 && <IconX />}
      {value === 0 && <IconO />}

      {isEmpty && hover && (
        <div className="cell__preview">
          {preview === 1 ? <IconOutlineX /> : <IconOutlineO/> }
        </div>
      )}
    </button>
  );
};

export default Cell;
