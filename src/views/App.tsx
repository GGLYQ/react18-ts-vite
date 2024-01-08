import react from 'react'
import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import withRouter from '@/utils/withRouter'  //在此引入自己的文件所在路径
import Header from '@/layout/Header'
// import Footer from '@/layout/Footer'
import themeConfig from '@/config/theme'
import './App.scss'

// const App: React.FC = () => ()
function App() {
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

export default withRouter(App)
