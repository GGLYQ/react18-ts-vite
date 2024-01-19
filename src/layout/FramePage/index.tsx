import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Panel from '@/layout/LayoutPanel/index'
import './index.scss'

let { LeftPanel, RightPanel, TopPanel, BottomPanel } = Panel

interface FrameChildrenIProps {
  TopPanelItems?: () => React.ReactElement
  LeftPanelItems?: () => React.ReactElement
  RightPanelItems?: () => React.ReactElement
  BottomPanelItems?: () => React.ReactElement
}
interface FrameIProps {
  activeRightPanelName?: string
  activeLeftPanelName?: string
  visibleRightTabs?: boolean
  visibleLeftTabs?: boolean
  onRightPanelActived?: (name: string) => void
  onLeftPanelActived?: (name: string) => void
  onLeftPanelDelete?: (name: string) => void
  onRightPanelDelete?: (name: string) => void
  children: FrameChildrenIProps
} // 布局主框架的参数类型声明

function FramePage(props: FrameIProps, ref: any) {
  let { activeRightPanelName, activeLeftPanelName, visibleLeftTabs, visibleRightTabs, children, onRightPanelActived, onLeftPanelActived, onLeftPanelDelete, onRightPanelDelete } = props
  let { TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems } = children
  // console.log('activeLeftPanel', activeLeftPanelName)
  // console.log('activeRightPanel', activeRightPanelName)
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate:
    return () => {
      // 类似于 componentWillUnmount
    }
  }, [activeRightPanelName, activeLeftPanelName])
  //监听props.updateLayout值的变化
  //打开弹窗
  useImperativeHandle(ref, () => ({
    // 重新计算四周面板的偏移量
    updateLayout: (newVal: boolean) => {
      console.log(ref, newVal)
      console.log('重新计算偏移量 FramePage')
    },
    // 重新计算右侧面板的偏移量
    updateRightLayout: (newVal: boolean) => {
      console.log(ref, newVal)
      console.log('重新计算偏移量 FramePage right')
    },
    // 重新计算左侧面板的偏移量
    updateLeftLayout: (newVal: boolean) => {
      console.log(ref, newVal)
      console.log('重新计算偏移量 FramePage left')
    },
    // 重新计算顶部面板的偏移量
    updateTopLayout: (newVal: boolean) => {
      console.log(ref, newVal)
      console.log('重新计算偏移量 FramePage top')
    },
    // 重新计算底部面板的偏移量
    updateBottomLayout: (newVal: boolean) => {
      console.log(ref, newVal)
      console.log('重新计算偏移量 FramePage bottom')
    },
  }))
  let TopPanelRef = useRef(null)
  let LeftPanelRef = useRef(null)
  let RightPanelRef = useRef(null)
  let BottomPanelRef = useRef(null)
  // 激活左侧面板的某个项
  function onActivedLeftPanel(name: string) {
    if (activeLeftPanelName === name) return
    onLeftPanelActived && onLeftPanelActived(name)
  }
  // 激活右侧面板的某个项
  function onActivedRightPanel(name: string) {
    if (activeRightPanelName === name) return
    onRightPanelActived && onRightPanelActived(name)
  }
  // 删除左侧面板的某个项
  function onDeleteLeftPanel(name: string) {
    onLeftPanelDelete && onLeftPanelDelete(name)
  }
  // 删除右侧面板的某个项
  function onDeleteRightPanel(name: string) {
    onRightPanelDelete && onRightPanelDelete(name)
  }
  return (
    <div className='App-frame-panel'>
      <TopPanel ref={TopPanelRef} slot={TopPanelItems}></TopPanel>
      <LeftPanel
        ref={LeftPanelRef}
        slot={LeftPanelItems}
        activePanelName={activeLeftPanelName}
        visibleTabs={visibleLeftTabs}
        onActivedPanel={(name) => onActivedLeftPanel(name)}
        onDeletePanel={(name) => onDeleteLeftPanel(name)}
      ></LeftPanel>
      <RightPanel
        ref={RightPanelRef}
        slot={RightPanelItems}
        activePanelName={activeRightPanelName}
        visibleTabs={visibleRightTabs}
        onActivedPanel={(name) => onActivedRightPanel(name)}
        onDeletePanel={(name) => onDeleteRightPanel(name)}
      ></RightPanel>
      <BottomPanel ref={BottomPanelRef} slot={BottomPanelItems}></BottomPanel>
    </div>
  )
}
let ForwardRefComponents = forwardRef(FramePage)

ForwardRefComponents.defaultProps = {
  visibleRightTabs: true,
  visibleLeftTabs: true,
}
export default ForwardRefComponents
