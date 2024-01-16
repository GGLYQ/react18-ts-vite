import React, { useEffect, useState, useCallback, useRef } from 'react'
import type { PropType } from '../type'
import type { reducerIState } from '@/store/type'
import { useSelector, useDispatch } from 'react-redux'
import { getPxToRem } from '@/utils/layout'
import { setRightPanelWidth } from '@/store/reducers/LayoutReducer'
import './index.scss'

let RightPanel = (props: PropType) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  let { topPanelHeight, bottomPanelHeight } = useSelector((state: reducerIState) => state.layoutReducer)
  // let [rightWidth, setRightWidth] = useState<number>(0)
  let [style, setStyle] = useState<object>({})

  // 设置右侧面板的宽度
  const setLayoutFn = useCallback(() => {
    let clientWidth = currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    // setRightWidth(clientWidthRem)
    setStyle({
      width: clientWidthRem + 'rem',
      top: topPanelHeight + 'rem',
      bottom: bottomPanelHeight + 'rem',
    })
    // console.log(rightWidth)
    dispatch(setRightPanelWidth(clientWidthRem))
  }, [dispatch, topPanelHeight, bottomPanelHeight])

  // 监听面板尺寸
  useEffect(() => {
    setLayoutFn()
    // console.log("RightPanel",currentRef) // 获取DOM元素
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  const getActivedClassName = (v: string) => {
    return v === props.activePanelName ? 'actived' : ''
  }
  // 渲染页面模板的逻辑
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
          return React.cloneElement(panel, { className: getActivedClassName(panel.props?.name || '') })
        })}
      </div>
    )
    // 是否显示标签
    if (visibleTabs) {
      let rightTabsProps = panels?.map((e: any) => e.props)
      rightTabs = (
        <div className='right-panel-tabs'>
          {rightTabsProps.map((tab: any) => (
            <div className={`right-tab-item ${getActivedClassName(tab.name || '')}`} key={`tabItem-${tab.name}`}>
              {tab.label}
            </div>
          ))}
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
export default RightPanel
