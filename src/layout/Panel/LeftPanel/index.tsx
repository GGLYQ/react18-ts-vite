import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { LayoutReducerIState, PropType } from '../type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'
import { getPxToRem } from '@/utils/layout'
import './index.scss'

interface StateType {
  leftWidth: number
  style: object
}
class LeftPanel extends Component<PropType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef()
    this.state = {
      leftWidth: 0,
      style: {},
    }
  }
  // 组件内生命周期
  componentDidMount() {
    // console.log(this.props)
    // console.log('componentDidMount LeftPanel')
    this.handleLeftWidth()
  }
  componentDidUpdate(prevProps: PropType) {
    // console.log('componentDidUpdate LeftPanel')
    let { topPanelHeight, bottomPanelHeight } = this.props
    let { topPanelHeight: prevTopPanelHeight, bottomPanelHeight: prevBottomPanelHeight } = prevProps

    if (topPanelHeight !== prevTopPanelHeight || bottomPanelHeight !== prevBottomPanelHeight) {
      // props 的值发生了改变，在这里进行相应的处理
      this.setState({
        ...this.state,
        style: {
          width: this.state.leftWidth + 'rem',
          top: topPanelHeight + 'rem',
          bottom: bottomPanelHeight + 'rem',
        },
      })
    }
  }
  componentWillUnmount() {}

  // 设置左侧布局的宽度
  handleLeftWidth() {
    let { setLeftWidth, topPanelHeight, bottomPanelHeight } = this.props
    let clientWidth = this.currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    // console.log(clientWidthRem, this)
    // console.dir(this.currentRef.current)
    this.setState({
      leftWidth: clientWidthRem,
      style: {
        width: clientWidthRem + 'rem',
        top: topPanelHeight + 'rem',
        bottom: bottomPanelHeight + 'rem',
      },
    })
    setLeftWidth && setLeftWidth(clientWidthRem)
  }
  render() {
    let Element = this.props.slot
    return (
      <div id='leftPanelWrapper' className='left-panel-wrapper' ref={this.currentRef} style={this.state.style}>
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
    bottomPanelHeight: state.layoutReducer.bottomPanelHeight,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setLeftWidth(value: number) {
      dispatch(setLeftPanelWidth(value))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftPanel)
