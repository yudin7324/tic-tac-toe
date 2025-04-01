import { FC } from 'react'
import './cell.scss'
import IconO from '@/components/icons/IconO'
import IconX from '@/components/icons/IconX'

interface CallProps {
  value?: number | undefined;
}

const Cell: FC<CallProps> = ({ value }) => {
  return (
    <div className='cell'>
      {value === undefined ? <></> : value === 0 ? <IconO /> : <IconX />}
    </div>
  )
}

export default Cell
