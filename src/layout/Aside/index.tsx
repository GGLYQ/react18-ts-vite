import React, { Component } from 'react'
import './index.scss'
import { connect } from 'react-redux'
import { reducerIState } from '@/store/type'

interface PropType {
  isHideAside?: boolean
}
class Aside extends Component<PropType> {
  // let {user} = this.props;
  componentDidMount() {}
  componentDidUpdate() {
  }
  componentWillUnmount() {}
  render() {
    return !this.props.isHideAside && <div className='App-aside'>Aside</div>
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
