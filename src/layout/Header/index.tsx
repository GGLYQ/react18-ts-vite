import React from 'react'
import './index.scss'
import { systemTitle, menuList, useInfo } from '@/data/header'
import type { IObj } from '@/utils/base'

class Header extends React.Component {
  // let {user} = this.props;
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  menuClick(item: IObj) {
    console.log(item)
  }
  render() {
    return (
      <div className='App-header flex flex-center-between'>
        <div className='App-header-title'>{systemTitle}</div>
        <div className='App-header-content flex'>
          {/* 菜单栏 */}
          <div className='App-header-menu flex'>
            {menuList.map((menu) => {
              return (
                <div className='App-header-menu-item' onClick={() => this.menuClick(menu)}>
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
export default Header
