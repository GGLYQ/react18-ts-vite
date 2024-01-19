// import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Main from '@/layout/Main'
import Aside from '@/layout/Aside'
import React from 'react'
import './index.scss'
import ToolbarPanel from './components/ToolbarPanel'

function Home(): React.ReactNode {
  return (
    <div className='App-homePage'>
      <Aside />
      <div className='App-content'>
        <Main></Main>
       < ToolbarPanel/>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Home
