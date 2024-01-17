import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Header from '@/layout/Header'
// import Footer from '@/layout/Footer'
import themeConfig from '@/config/theme'
import './App.scss'
import AppMixin from './mixins/AppMixin'
import { useSelector } from 'react-redux'
import type { reducerIState } from '@/store/type'

function App(): React.ReactNode {
  let [className, setClassName] = useState('')
  let { isHideHeader } = useSelector((state: reducerIState) => state.gobalReducer)
  let { handleUrlParams } = AppMixin()
  handleUrlParams()
  useEffect(() => {
    setClassName(isHideHeader ? 'fullScreen' : '')
  }, [isHideHeader])
  return (
    <ConfigProvider theme={themeConfig}>
      <Header></Header>
      <div className={`App-container ${className}`}>
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
    </ConfigProvider>
  )
}
export default App
