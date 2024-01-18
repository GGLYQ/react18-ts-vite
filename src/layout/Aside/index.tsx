import React, { PureComponent } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { reducerIState } from '@/store/type'
import Icon from '@/components/Icon'
interface PropType {
  isHideAside?: boolean
}
class Aside extends PureComponent<PropType> {
  // let {user} = this.props;
  componentDidMount() {}
  componentDidUpdate() {
  }
  componentWillUnmount() {}
  render() {
    return !this.props.isHideAside && <div className='App-aside'>
      <div className="App-aside-item flex-cloumn align-center">
        <Icon iconName='icon-shoucang1'/>
        <div className='aside-item-title'>我的收藏</div>
      </div>
      <div className="App-aside-item flex-cloumn align-center">
        <Icon iconName='icon-database'/>
        <div className='aside-item-title'>数据资源</div>
      </div>
    </div>
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    isHideAside: state.gobalReducer.isHideAside,
  }
}
// 使用高阶组件包裹当前类组件
const NavigateComponent = connect(mapStateToProps)(Aside)
export default NavigateComponent
