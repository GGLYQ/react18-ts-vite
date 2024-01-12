import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { LayoutReducerIState, PropType } from '../type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'
import "./index.scss"

interface StateType {
  leftWidth: number,
}
class LeftPanel extends Component<PropType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef:React.RefObject<HTMLDivElement>;
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef();
  }
  componentDidMount() {
    // console.log(this.props)
    console.log("LeftPanel",this.currentRef); // 获取DOM元素
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let Element = this.props.slot
    return <div ref={this.currentRef} className='left-panel-wrapper'>{Element ? <Element /> : null}</div>
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
    setLeftWidth() {
      dispatch(setLeftPanelWidth(9))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel)
