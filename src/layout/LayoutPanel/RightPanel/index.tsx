import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef, useMemo } from 'react'
import type { PropType } from '../type'
import type { reducerIState } from '@/store/type'
import { useSelector, useDispatch } from 'react-redux'
import { getPxToRem } from '@/utils/layout'
import { setRightPanelWidth } from '@/store/reducers/LayoutReducer'
import { setRightPanelContainer, setActivedToolbarByName } from '@/store/reducers/GobalReducer'
import './index.scss'
import Icon from '@/components/Icon'
import _ from 'lodash'
import { IObj } from '@/utils/type'

let RightPanel = (props: PropType, ref: any) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  let layoutReducer = useSelector((state: reducerIState) => state.layoutReducer)
  let gobalReducer = useSelector((state: reducerIState) => state.gobalReducer)
  let topPanelHeight = useMemo(() => layoutReducer.topPanelHeight, [layoutReducer])
  let bottomPanelHeight = useMemo(() => layoutReducer.bottomPanelHeight, [layoutReducer])
  let rightPanelContainer = useMemo(() => gobalReducer.rightPanelContainer, [gobalReducer])
  let activedToolbar = useMemo(() => gobalReducer.activedToolbar, [gobalReducer])
  let activePanelName = useMemo(() => props.activePanelName, [props])
  let [style, setStyle] = useState<object>({})
  let pContainer = useRef<string[]>([])

  // 初始化左面的面板
  const initRightPanelContainer = useCallback(() => {
    let { isAllDisplay, slot } = props
    // 是否展示全部面板
    if (isAllDisplay) {
      let panels = null
      let slotTem = slot && slot()
      let children = slotTem?.props?.children
      if (!children) return
      let type = Object.prototype.toString.call(children)
      panels = type === '[object Object]' ? [children] : type === '[object Array]' ? children : []
      let nameList = panels.map((panel: IObj) => panel.props?.name || '')
      _.remove(nameList, function (e) {
        return !e
      })
      // console.log('initRightPanelContainer', nameList)
      pContainer.current = [...nameList]
      setRightPanelContainer && dispatch(setRightPanelContainer(nameList))
    } else {
      pContainer.current = []
      setRightPanelContainer && dispatch(setRightPanelContainer([]))
    }
  }, [dispatch, props])
  // 设置右侧面板的宽度
  const setLayoutFn = useCallback(() => {
    let clientWidth = currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    // 获取子元素的宽度
    if (currentRef.current?.children && currentRef.current.children.length) {
      for (let i = 0; i < currentRef.current.children.length; i++) {
        let children = currentRef.current.children[i]
        if (children.className === 'right-panel-content') {
          let clientWidth_ = children?.clientWidth
          clientWidthRem = clientWidth_ ? getPxToRem(clientWidth_) : 0
        }
      }
    }
    setStyle({
      width: clientWidthRem + 'rem',
      top: topPanelHeight + 'rem',
      bottom: bottomPanelHeight + 'rem',
    })
    dispatch(setRightPanelWidth(clientWidthRem))
  }, [dispatch, topPanelHeight, bottomPanelHeight, rightPanelContainer, activedToolbar])
  // 设置面板容器
  const setPanelContainer = useCallback(() => {
    let newRightPanelContainer = _.cloneDeep(pContainer.current) || []
    // console.log(newRightPanelContainer);
    if (activePanelName && !newRightPanelContainer.includes(activePanelName)) {
      newRightPanelContainer.push(activePanelName)
      // console.log('setPanelContainer', newRightPanelContainer)
      pContainer.current = newRightPanelContainer
      setRightPanelContainer && dispatch(setRightPanelContainer(newRightPanelContainer))
    }
    setLayoutFn()
  }, [activePanelName])
  // 1、初始化监听面板
  useEffect(() => {
    initRightPanelContainer()
  }, [])
  // 2、监听面板尺寸
  useEffect(() => {
    setLayoutFn()
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  // 3、监听激活的面板
  useEffect(() => {
    setPanelContainer()
  }, [setPanelContainer])
  // 判断是否被激活的面板 设置激活的className
  const getActivedClassName = (v: string) => {
    return v === props.activePanelName ? 'actived' : ''
  }
  // 点击便签的事件
  const clickTabActived = (name: string) => {
    if (props.activePanelName === name) return
    props.onActivedPanel && props.onActivedPanel(name)
  }
  // 点击删除图标的事件
  const clickTabDelete = (name: string) => {
    let newRightPanelContainer = _.cloneDeep(pContainer.current)
    // console.log(newRightPanelContainer);
    if (newRightPanelContainer) {
      let removeArray = _.remove(newRightPanelContainer, function (n) {
        return n === name
      })
      pContainer.current = newRightPanelContainer
      removeArray.length && dispatch(setRightPanelContainer(newRightPanelContainer))
    }
    
    if (!activedToolbar || !setActivedToolbarByName) return

    // 取消激活的工具栏
    if (activedToolbar.id === name && setActivedToolbarByName) {
      let activedName = newRightPanelContainer.length ? newRightPanelContainer[0] : ''
      dispatch(setActivedToolbarByName(activedName))
      props.onDeletePanel && props.onDeletePanel(activedName, name)
    } else if (activedToolbar.id) {
      dispatch(setActivedToolbarByName(activedToolbar.id))
      props.onDeletePanel && props.onDeletePanel(activedToolbar.id, name)
    } else {
      let activedName = newRightPanelContainer.length ? newRightPanelContainer[0] : ''
      props.onDeletePanel && props.onDeletePanel(activedName, name)
    }
  }
  //监听props.updateLayout值的变化
  //打开弹窗
  useImperativeHandle(ref, () => ({
    updateLayout: () => {
      console.dir(currentRef.current)
      console.log('重新计算偏移量 rightPanel')
      setLayoutFn()
    },
  }))

  // 开始渲染页面模板的逻辑
  let visibleTabs = props.visibleTabs
  let slot = props.slot
  let slotTem = slot && slot()
  if (slotTem) {
    let children = slotTem?.props?.children
    if (!children) return ''
    // console.log(children)
    let panels = null
    let rightPanels = null
    let rightTabs = null

    let type = Object.prototype.toString.call(children)
    panels = type === '[object Object]' ? [children] : type === '[object Array]' ? children : []

    rightPanels = (
      <div className='right-panel-content'>
        {React.Children.map(panels, (panel) => {
          if (!rightPanelContainer?.includes(panel.props?.name || '')) return null
          return React.cloneElement(panel, { className: getActivedClassName(panel.props?.name || '') })
        })}
      </div>
    )
    // 是否显示标签
    if (visibleTabs) {
      let rightTabsProps = panels?.map((e: any) => e.props)
      rightTabs = (
        <div className='right-panel-tabs'>
          {rightTabsProps.map((tab: any) => {
            if (!rightPanelContainer?.includes(tab.name || '')) return null
            return (
              <div
                className={`right-tab-item ${getActivedClassName(tab.name || '')}`}
                key={`tabItem-${tab.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  clickTabActived(tab.name)
                }}
              >
                <div className='tab-item-title'>{tab.label}</div>
                {!tab.cancelClose && (
                  <div
                    className='tab-item-icon'
                    onClick={(e) => {
                      e.stopPropagation()
                      clickTabDelete(tab.name)
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
      <div id='rightPanelWrapper' className='right-panel-wrapper' ref={currentRef} style={style}>
        {rightTabs}
        {rightPanels}
      </div>
    )
  }
  return ''
}
let ForwardRefComponents = forwardRef(RightPanel)
ForwardRefComponents.defaultProps = {
  isAllDisplay: true,
}
export default ForwardRefComponents
