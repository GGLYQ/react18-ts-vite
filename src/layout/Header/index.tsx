import React from 'react'
import './index.scss'
import { systemTitle, menuList, useInfo } from '@/data/header'
import type { IObj, IRouter } from '@/utils/base'
import { withRouter } from '@/utils/withRouter'

interface PropType {
  router: IRouter
}
class Header extends React.Component<PropType> {
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  menuClick(item: IObj) {
    let { navigate } = this.props.router
    navigate(item.router)
  }
  render() {
    return (
      <div className='App-header flex flex-center-between'>
        <div className='App-header-title font-yzHei'>{systemTitle}</div>
        <div className='App-header-content flex'>
          {/* 菜单栏 */}
          <div className='App-header-menu flex'>
            {menuList.map((menu) => {
              return (
                <div className='App-header-menu-item' onClick={() => this.menuClick(menu)} key={menu.title}>
                  {menu.title}
                </div>
              )
            })}
          </div>
          {/* 用户信息 */}
          <div className='App-header-useinfo'>{useInfo.name}</div>
        </div>
      </div>
    )
  }
}

// 使用高阶组件包裹当前类组件
const NavigateComponent = withRouter(Header)
export default NavigateComponent
