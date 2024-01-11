import React from 'react'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Header from '@/layout/Header'
// import Footer from '@/layout/Footer'
import themeConfig from '@/config/theme'
import './App.scss'

// let App: React.FC = () => ()
function App(): React.ReactNode {
  return (
    <ConfigProvider theme={themeConfig}>
      <Header></Header>
      <div className='App-container'>
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
    </ConfigProvider>
  )
}

export default App
