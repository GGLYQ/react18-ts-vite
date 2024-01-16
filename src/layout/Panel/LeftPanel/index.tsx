import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { LayoutReducerIState, PropType } from '../type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'
import { getPxToRem } from '@/utils/layout'
import { watchProps } from '@/utils/hook'
import Icon from '@/components/Icon'
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
  componentDidUpdate(...prev: [PropType, StateType]) {
    watchProps(this, prev[0], ['topPanelHeight', this.updateLeftAndRightWidth], ['bottomPanelHeight', this.updateLeftAndRightWidth])
    // console.log('componentDidUpdate LeftPanel')
  }
  componentWillUnmount() {}
  // 设置左右侧的宽度
  updateLeftAndRightWidth() {
    let { topPanelHeight, bottomPanelHeight } = this.props
    this.setState({
      ...this.state,
      style: {
        width: this.state.leftWidth + 'rem',
        top: topPanelHeight + 'rem',
        bottom: bottomPanelHeight + 'rem',
      },
    })
  }
  // 初始化左侧布局的宽度
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
  getActivedClassName(v: string) {
    return v === this.props.activePanelName ? 'actived' : ''
  }
  render() {
    // 渲染页面模板的逻辑
    let visibleTabs = this.props.visibleTabs
    let slot = this.props.slot
    let slotTem = slot && slot()
    if (slotTem) {
      let children = slotTem?.props?.children
      if (!children) return ''
      // console.log(children)
      let panels = null
      let leftPanels = null
      let leftTabs = null

      let type = Object.prototype.toString.call(children)
      panels = type === '[object Object]' ? [children] : type === '[object Array]' ? children : []


      leftPanels = (
        <div className='left-panel-content'>
          {React.Children.map(panels, (panel) => {
            return React.cloneElement(panel, { className: this.getActivedClassName(panel.props?.name || '') })
          })}
        </div>
      )
      // 是否显示标签
      if (visibleTabs) {
        let leftTabsProps = panels?.map((e: any) => e.props)
        leftTabs = (
          <div className='left-panel-tabs'>
            {leftTabsProps.map((tab: any) => (
              <div className={`left-tab-item ${this.getActivedClassName(tab.name || '')} flex-cloumn-center`} key={`tabItem-${tab.name}`}>
                <div className='tab-item-title'>{tab.label}</div>
                <Icon iconName='icon-guanbi'></Icon>
              </div>
            ))}
          </div>
        )
      }
      return (
        <div id='leftPanelWrapper' className='left-panel-wrapper' ref={this.currentRef} style={this.state.style}>
          {leftTabs}
          {leftPanels}
        </div>
      )
    }
    return ''
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
