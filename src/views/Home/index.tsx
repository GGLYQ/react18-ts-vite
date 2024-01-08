import { useState } from 'react'

function Home() {
  const [count] = useState(0)

  return (
      <div>{count}</div>
  )
}

export default Home

