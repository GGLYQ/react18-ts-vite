// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Map from '@/components/Map'
import Aside from '@/components/Aside'
import React from 'react'
import './index.scss'
function Home(): React.ReactNode {
  return (
    <div className='App-container-home'>
      <Aside />
      <Map></Map>
      <Outlet></Outlet>
    </div>
  )
}

export default Home
