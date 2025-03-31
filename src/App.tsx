import { FC } from 'react'
import Button from '@/components/Button/Button'

const App:FC = () => {
  return (
    <div className='main'>
      <div className='container'>

        <Button label="button" variant='primary' onClick={() => console.log('lskdjflksjd')} />
        <Button label="button" variant='secondary' color="blue" onClick={() => console.log('lskdjflksjd')} />

        <Button label="button" variant='primary' color="blue" onClick={() => console.log('lskdjflksjd')} />
        <Button label="button" variant='secondary' color="silver" onClick={() => console.log('lskdjflksjd')} />

      </div>
    </div>
  )
}

export default App
