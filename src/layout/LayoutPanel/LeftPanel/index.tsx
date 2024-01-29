import React, { PureComponent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { withRouterAndRef } from '@/utils/withRouter'
import type { PropType } from '../type'
import type { reducerIState } from '@/store/type'
import { setLeftPanelWidth } from '@/store/reducers/LayoutReducer'
import { setLeftPanelContainer, setActivedToolbarByName } from '@/store/reducers/GobalReducer'
import { getPxToRem } from '@/utils/layout'
import { watchProps } from '@/utils/hook'
import Icon from '@/components/Icon'
import './index.scss'
import _ from 'lodash'
import { IObj } from '@/utils/type'

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
    this.initLeftPanelContainer()
    this.handleLeftWidth()
  }
  componentDidUpdate(...prev: [PropType, StateType]) {
    watchProps(
      this,
      prev[0],
      ['topPanelHeight', this.updateLeftAndRightWidth],
      ['bottomPanelHeight', this.updateLeftAndRightWidth],
      ['leftPanelContainer', this.handleLeftWidth],
      ['asidePanelWidth', this.updateLeftAndRightWidth],
      ['activePanelName', this.watchActivePanelName],
      ['activedToolbar', this.handleLeftWidth]
    )
  }
  componentWillUnmount() {
  }
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
  // 监听激活的面板
  watchActivePanelName() {
    let { leftPanelContainer, _setLeftPanelContainer, activePanelName } = this.props
    let newLeftPanelContainer = _.cloneDeep(leftPanelContainer) || []
    if (activePanelName && _setLeftPanelContainer && !newLeftPanelContainer.includes(activePanelName)) {
      newLeftPanelContainer.push(activePanelName)
      _setLeftPanelContainer(newLeftPanelContainer)
    }
    this.handleLeftWidth()
  }
  // 初始化左侧布局的宽度
  handleLeftWidth() {
    let { _setLeftPanelWidth, topPanelHeight, bottomPanelHeight, asidePanelWidth } = this.props
    // console.log('handleLeftWidth', leftPanelContainer, activePanelName)
    let clientWidth = this.currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0

    // 获取子元素的宽度
    if (this.currentRef.current?.children && this.currentRef.current.children.length) {
      for (let i = 0; i < this.currentRef.current.children.length; i++) {
        let children = this.currentRef.current.children[i]
        if (children.className === 'left-panel-content') {
          let clientWidth_ = children?.clientWidth
          clientWidthRem = clientWidth_ ? getPxToRem(clientWidth_) : 0
        }
      }
    }
    this.setState({
      leftWidth: clientWidthRem,
      style: {
        width: clientWidthRem + 'rem',
        top: topPanelHeight + 'rem',
        bottom: bottomPanelHeight + 'rem',
        left: asidePanelWidth + 'rem',
      },
    })
    _setLeftPanelWidth && _setLeftPanelWidth(clientWidthRem)
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
    // 删除右侧容器的某一项
    let { leftPanelContainer, _setLeftPanelContainer, activedToolbar, _setActivedToolbarByName, rightPanelContainer } = this.props
    let newLeftPanelContainer = _.cloneDeep(leftPanelContainer) || []
    // 删除被删除的面板容器
    if (newLeftPanelContainer) {
      let removeArray = _.remove(newLeftPanelContainer, function (n) {
        return n === name
      })
      removeArray.length && _setLeftPanelContainer && _setLeftPanelContainer(newLeftPanelContainer)
    }
    if (!activedToolbar || !_setActivedToolbarByName) return
    // console.log(activedToolbar, newLeftPanelContainer)
    // 取消激活的工具栏
    if (activedToolbar.id === name && _setActivedToolbarByName) {
      let activedName = newLeftPanelContainer.length ? newLeftPanelContainer[0] : ''
      _setActivedToolbarByName(activedName)
      this.props.onDeletePanel && this.props.onDeletePanel(activedName, name)
    } else if (activedToolbar.id) {
      _setActivedToolbarByName(activedToolbar.id)
      this.props.onDeletePanel && this.props.onDeletePanel(activedToolbar.id, name)
    } else {
      let activedName = newLeftPanelContainer.length ? newLeftPanelContainer[0] : ''
      this.props.onDeletePanel && this.props.onDeletePanel(activedName, name)
    }
    // console.log(rightPanelContainer,newLeftPanelContainer);
    if(rightPanelContainer && !rightPanelContainer.length && !newLeftPanelContainer.length){
      let router = this.props.router 
      let navigate=router?.navigate
      let location=router?.location || {}
      if ("pathname" in location && location?.pathname != '/home') return navigate && navigate('/home')
    }
  }
  // 初始化左面的面板
  initLeftPanelContainer() {
    let { _setLeftPanelContainer, isAllDisplay, slot } = this.props
    // 是否展示全部面板
    if (isAllDisplay) {
      let panels = null
      let slotTem = slot && slot()
      let children = slotTem?.props?.children
      if (!children) return _setLeftPanelContainer && _setLeftPanelContainer([])
      let type = Object.prototype.toString.call(children)
      panels = type === '[object Object]' ? [children] : type === '[object Array]' ? children : []
      let nameList = panels.map((panel: IObj) => panel.props?.name || '')
      _.remove(nameList, function (e) {
        return !e
      })
      _setLeftPanelContainer && _setLeftPanelContainer(nameList)
    } else {
      _setLeftPanelContainer && _setLeftPanelContainer([])
    }
  }
  // 重新计算偏移量
  updateLayout() {
    console.log('重新计算偏移量 leftPanel')
    this.handleLeftWidth()
  }
  render() {
    // 渲染页面模板的逻辑
    let visibleTabs = this.props.visibleTabs
    let slot = this.props.slot
    let leftPanelContainer = this.props.leftPanelContainer
    // let activePanelName = this.props.activePanelName
    // console.log('render', leftPanelContainer, activePanelName)

    let slotTem = slot && slot()
    if (slotTem) {
      let children = slotTem?.props?.children
      if (!children) return ''
      let panels = null
      let leftPanels = null
      let leftTabs = null

      let type = Object.prototype.toString.call(children)
      panels = type === '[object Object]' ? [children] : type === '[object Array]' ? children : []

      leftPanels = (
        <div className='left-panel-content'>
          {React.Children.map(panels, (panel) => {
            if (!leftPanelContainer?.includes(panel.props?.name || '')) return null
            return React.cloneElement(panel, { className: this.getActivedClassName(panel.props?.name || '') })
          })}
        </div>
      )
      // 是否显示标签
      if (visibleTabs) {
        let leftTabsProps = panels?.map((e: any) => e.props)
        leftTabs = (
          <div className='left-panel-tabs'>
            {leftTabsProps.map((tab: any) => {
              if (!leftPanelContainer?.includes(tab.name || '')) return null
              return (
                <div
                  className={`left-tab-item ${this.getActivedClassName(tab.name || '')} flex-cloumn-center`}
                  key={`tabItem-${tab.name}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    this.clickTabActived(tab.name)
                  }}
                >
                  {/* 标签标题 */}
                  <div className='tab-item-title'>{tab.label}</div>
                  {/* 是否可关闭 */}
                  {!tab.cancelClose && (
                    <div
                      className='tab-item-icon'
                      onClick={(e) => {
                        e.stopPropagation()
                        this.clickTabDelete(tab.name)
                      }}
                    >
                      <Icon iconName='icon-guanbi'></Icon>
                    </div>
                  )}
                </div>
              )
            })}
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
    activedToolbar: state.gobalReducer.activedToolbar,
    leftPanelContainer: state.gobalReducer.leftPanelContainer,
    rightPanelContainer: state.gobalReducer.rightPanelContainer,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    _setLeftPanelWidth(value: number) {
      dispatch(setLeftPanelWidth(value))
    },
    _setLeftPanelContainer(value: string[]) {
      dispatch(setLeftPanelContainer(value))
    },
    _setActivedToolbarByName(value: string) {
      dispatch(setActivedToolbarByName(value))
    },
  }
}
let NavigateComponent = withRouterAndRef(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(LeftPanel))
export default NavigateComponent
