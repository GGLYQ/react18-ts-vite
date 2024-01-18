import React from 'react'
import './index.scss'
import { systemTitle, menuList, useInfo } from '@/data/header'
import type { IObj, IRouter } from '@/utils/type'
import { withRouter } from '@/utils/withRouter'
import Icon from '@/components/Icon'
import SvgIcon from '@/components/SvgIcon'
import { watchProps } from '@/utils/hook'
import { connect } from 'react-redux'
import { reducerIState } from '@/store/type'

interface PropType {
  router?: IRouter
  isHideHeader?:boolean
}
interface StateType {
  currentPathName?: string | undefined | object
}
class Header extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      currentPathName: '',
    }
  }
  componentDidMount() {
    this.watchRouter()
  }
  componentDidUpdate(...prev: [PropType]) {
    watchProps(this, prev[0], ['router', this.watchRouter])
  }
  componentWillUnmount() {}
  menuClick(item: IObj) {
    let { navigate } = this.props.router || {}
    navigate && navigate(item.router)
  }
  watchRouter() {
    let location = this.props.router?.location || {}
    if (location && typeof location === 'object' && 'pathname' in location) {
      let value = location?.pathname || ''
      this.setState({
        currentPathName: value,
      })
    }
  }
  render() {
    return !this.props.isHideHeader && (
      <div className='App-header flex-center-between'>
        <div className='App-header-title font-yzHei'>{systemTitle}</div>
        <div className='App-header-content flex'>
          {/* 菜单栏 */}
          <div className='App-header-menu flex'>
            {menuList.map((menu) => {
              let className = this.state.currentPathName === menu.router ? 'actived' : ''
              return (
                <div className={`App-header-menu-item flex-center ${className}`} onClick={() => this.menuClick(menu)} key={menu.title}>
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

/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    isHideHeader: state.gobalReducer.isHideHeader
  }
}
// 使用高阶组件包裹当前类组件
const NavigateComponent = withRouter(connect(mapStateToProps)(Header))
export default NavigateComponent
