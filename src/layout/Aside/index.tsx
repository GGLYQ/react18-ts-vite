import React, { PureComponent } from 'react'
import { Dispatch } from 'redux'
import './index.scss'
import { connect } from 'react-redux'
import { reducerIState } from '@/store/type'
import Icon from '@/components/Icon'
import { navlist } from '@/data/aside'
import { setActivedAsideId } from '@/store/reducers/GobalReducer'
interface PropType {
  isHideAside?: boolean
  activedAsideId?: string
  setActivedAside?: (id: string) => void
}
class Aside extends PureComponent<PropType> {
  // let {user} = this.props;
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  handleClick(id: string) {
    let activedAsideId = this.props.activedAsideId
    let val = activedAsideId === id ? '' : id
    this.props.setActivedAside && this.props.setActivedAside(val)
  }
  render() {
    return (
      !this.props.isHideAside && (
        <div className='App-aside'>
          {navlist.map((item) => {
            let className = item.id === this.props.activedAsideId ? 'actived' : ''
            return (
              <div className={`App-aside-item flex-cloumn align-center ${className}`} key={item.id} onClick={() => this.handleClick(item.id)}>
                <Icon iconName={item.icon} />
                <div className='aside-item-title'>{item.title}</div>
              </div>
            )
          })}
        </div>
      )
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    isHideAside: state.gobalReducer.isHideAside,
    activedAsideId: state.gobalReducer.activedAsideId,
  }
}
/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setActivedAside(value: string) {
      dispatch(setActivedAsideId(value))
    },
  }
}
// 使用高阶组件包裹当前类组件
const NavigateComponent = connect(mapStateToProps, mapDispatchToProps)(Aside)
export default NavigateComponent
