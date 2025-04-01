import { FC } from 'react'
import Cell from '@/components/Cell/Cell'

const App:FC = () => {
  return (
    <div className='main'>
      <div className='container'>
        <Cell value={1}/>
        <Cell value={0}/>
        <Cell/>
      </div>
    </div>
  )
}

export default App
