import { FC } from 'react'
import './stat.scss'

interface StatProps {
  title: string;
  value?: number;
  color: 'yellow' | 'silver' | 'blue'
}

const Stat: FC<StatProps> = ({ title, value = 0, color }) => {
  return (
    <div className={`stat stat--${color}`}>
      <div className='stat__title'>{title}</div>
      <div className='stat__value'>{value}</div>
    </div>
  )
}

export default Stat
