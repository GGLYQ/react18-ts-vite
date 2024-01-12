import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { LayoutReducerIState, PropType } from '../type'
import { setTopPanelHeight } from '@/store/reducers/LayoutReducer'
import { getPxToRem } from '@/utils/layout'
import './index.scss'
interface StateType {
  topHeight: number
}
class TopPanel extends Component<PropType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef()
  }
  // 组件内生命周期
  componentDidMount() {
    // console.log(this.props)
    // console.log('componentDidMount TopPanel')
    this.handleTopHeight()
  }
  componentDidUpdate() {
    // console.log('componentDidUpdate TopPanel')
    // this.setTopHeight()
  }
  componentWillUnmount() {}

  // 设置顶部布局的高度
  handleTopHeight() {
    let { setTopHeight } = this.props
    let clientHeight = this.currentRef.current?.clientHeight // 获取DOM元素
    let clientHeightRem = clientHeight ? getPxToRem(clientHeight) : 0
    setTopHeight && setTopHeight(clientHeightRem)
  }
  render() {
    let Element = this.props.slot
    return (
      <div  id='topPanelWrapper' className='top-panel-wrapper' ref={this.currentRef} >
        {Element ? <Element /> : null}
      </div>
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: LayoutReducerIState) => {
  return {
    topPanelHeight: state.layoutReducer.topPanelHeight,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    // 聚焦
    setTopHeight(value: number) {
      dispatch(setTopPanelHeight(value))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)
