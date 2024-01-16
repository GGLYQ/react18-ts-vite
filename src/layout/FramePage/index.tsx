import React, { useEffect } from 'react'
import Panel from '@/layout/Panel/index'
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

function FramePage({
  activeRightPanelName,
  activeLeftPanelName,
  visibleLeftTabs,
  visibleRightTabs,
  children,
  onRightPanelActived,
  onLeftPanelActived,
  onLeftPanelDelete,
  onRightPanelDelete,
}: FrameIProps) {
  let { TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems } = children
  // console.log('activeLeftPanel', activeLeftPanelName)
  // console.log('activeRightPanel', activeRightPanelName)
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate:
    return () => {
      // 类似于 componentWillUnmount
    }
  }, [activeRightPanelName, activeLeftPanelName])

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
      <TopPanel slot={TopPanelItems}></TopPanel>
      <LeftPanel
        slot={LeftPanelItems}
        activePanelName={activeLeftPanelName}
        visibleTabs={visibleLeftTabs}
        onActivedPanel={(name) => onActivedLeftPanel(name)}
        onDeletePanel={(name) => onDeleteLeftPanel(name)}
      ></LeftPanel>
      <RightPanel
        slot={RightPanelItems}
        activePanelName={activeRightPanelName}
        visibleTabs={visibleRightTabs}
        onActivedPanel={(name) => onActivedRightPanel(name)}
        onDeletePanel={(name) => onDeleteRightPanel(name)}
      ></RightPanel>
      <BottomPanel slot={BottomPanelItems}></BottomPanel>
    </div>
  )
}
FramePage.defaultProps = {
  visibleRightTabs: true,
  visibleLeftTabs: true,
}
export default FramePage
