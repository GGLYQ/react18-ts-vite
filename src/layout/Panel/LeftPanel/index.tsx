import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { LayoutReducerIState, PropType } from '../type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'

interface StateType {
  leftWidth: number
}
class LeftPanel extends Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props)
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let Element = this.props.slot
    return <div className='left-panel-wrapper'>{Element ? <Element /> : null}</div>
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
