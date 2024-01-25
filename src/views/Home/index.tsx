// import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Main from '@/layout/Main'
import Aside from '@/layout/Aside'
import React, { useEffect, useState, memo } from 'react'
import './index.scss'
import ToolbarPanel from './components/ToolbarPanel'
import { IObj } from '@/utils/type'

function Home(): React.ReactNode {
  let [pathName, setPathName] = useState('')
  let location = useLocation() as IObj
  useEffect(() => {
    setPathName(location?.pathname)
  }, [location, pathName])
  return (
    <div className='App-homePage'>
      <Aside />
      <div className='App-content'>
        <Main></Main>
        {pathName == '/home' ? <ToolbarPanel /> : ''}
        <Outlet></Outlet>
      </div>
    </div>
  )
}
let MemoComponent = memo(Home)
export default MemoComponent
