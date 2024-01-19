import React, { PureComponent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { PropType } from '../type'
import type { reducerIState } from '@/store/type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'
import { getPxToRem } from '@/utils/layout'
import { watchProps } from '@/utils/hook'
import Icon from '@/components/Icon'
import './index.scss'

interface StateType {
  leftWidth: number
  style: object
}
class LeftPanel extends PureComponent<PropType, StateType> {
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
    this.handleLeftWidth()
  }
  componentDidUpdate(...prev: [PropType, StateType]) {
    watchProps(this, prev[0], ['topPanelHeight', this.updateLeftAndRightWidth], ['bottomPanelHeight', this.updateLeftAndRightWidth], ['asidePanelWidth', this.updateLeftAndRightWidth])
  }
  componentWillUnmount() {}
  // 设置左右侧的宽度
  updateLeftAndRightWidth() {
    let { topPanelHeight, bottomPanelHeight, asidePanelWidth } = this.props
    this.setState({
      ...this.state,
      style: {
        width: this.state.leftWidth + 'rem',
        top: topPanelHeight + 'rem',
        bottom: bottomPanelHeight + 'rem',
        left: asidePanelWidth + 'rem',
      },
    })
  }
  // 初始化左侧布局的宽度
  handleLeftWidth() {
    let { setLeftWidth, topPanelHeight, bottomPanelHeight, asidePanelWidth } = this.props
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
        left: asidePanelWidth + 'rem',
      },
    })
    setLeftWidth && setLeftWidth(clientWidthRem)
  }
  // 判断是否被激活的面板 设置激活的className
  getActivedClassName(v: string) {
    return v === this.props.activePanelName ? 'actived' : ''
  }
  // 点击便签的事件
  clickTabActived(name: string) {
    if (this.props.activePanelName === name) return
    this.props.onActivedPanel && this.props.onActivedPanel(name)
  }
  // 点击删除图标的事件
  clickTabDelete(name: string) {
    this.props.onDeletePanel && this.props.onDeletePanel(name)
  }
  // 重新计算偏移量
  updateLayout() {
    console.log('重新计算偏移量 leftpanel')
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
              <div className={`left-tab-item ${this.getActivedClassName(tab.name || '')} flex-cloumn-center`} key={`tabItem-${tab.name}`} onClick={() => this.clickTabActived(tab.name)}>
                <div className='tab-item-title'>{tab.label}</div>
                {!tab.cancelClose && (
                  <div className='tab-item-icon' onClick={() => this.clickTabDelete(tab.name)}>
                    <Icon iconName='icon-guanbi'></Icon>
                  </div>
                )}
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
const mapStateToProps = (state: reducerIState) => {
  return {
    topPanelHeight: state.layoutReducer.topPanelHeight,
    bottomPanelHeight: state.layoutReducer.bottomPanelHeight,
    asidePanelWidth: state.layoutReducer.asidePanelWidth,
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
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(LeftPanel)
export default NavigateComponent
