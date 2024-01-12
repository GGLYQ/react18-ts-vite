import React, { Component } from 'react'
import { Dispatch } from 'redux';
import { connect } from 'react-redux'
import type { LayoutReducerIState,PropType } from '../type'
import { setTopPanelHeight} from '@/store/reducers/LayoutReducer'
interface StateType {
  topHeight: number
}
class TopPanel extends Component<PropType, StateType> {
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
    return (
      <div className='top-panel-wrapper' id='topPanelWrapper'>
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
const mapDispatchToProps = (dispatch:Dispatch) => {
  return {
    // 聚焦
    setTopHeight() {
      dispatch(setTopPanelHeight(3))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPanel)
