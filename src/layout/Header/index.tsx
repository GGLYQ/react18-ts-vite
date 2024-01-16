import React from 'react'
import './index.scss'
import { systemTitle, menuList, useInfo } from '@/data/header'
import type { IObj, IRouter } from '@/utils/base'
import { withRouter } from '@/utils/withRouter'
import Icon from '@/components/Icon'
import SvgIcon from '@/components/SvgIcon'
interface PropType {
  router?: IRouter
}
class Header extends React.Component<PropType> {
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  menuClick(item: IObj) {
    let { navigate } = this.props.router || {}
    navigate && navigate(item.router)
  }

  render() {
    return (
      <div className='App-header flex-center-between'>
        <div className='App-header-title font-yzHei'>{systemTitle}</div>
        <div className='App-header-content flex'>
          {/* 菜单栏 */}
          <div className='App-header-menu flex'>
            {menuList.map((menu) => {
              return (
                <div className='App-header-menu-item flex-center' onClick={() => this.menuClick(menu)} key={menu.title}>
                  <Icon iconName={menu.icon} />
                  <span className='menu-item-title'>{menu.title}</span>
                </div>
              )
            })}
          </div>
          {/* 用户信息 */}
          <div className='App-header-useinfo flex-center'>
            <SvgIcon name='user' />
            <span className='useinfo-name'>{useInfo.name}</span>
            <SvgIcon name='downOutlined' />
          </div>
        </div>
      </div>
    )
  }
}

// 使用高阶组件包裹当前类组件
const NavigateComponent = withRouter(Header)
export default NavigateComponent
