import { useState } from 'react'
import Aside from '@/components/Aside'

function Home() {
  const [count] = useState(0)

  return (
    <div className='App-home'>
      <Aside />
    </div>
  )
}

export default Home
