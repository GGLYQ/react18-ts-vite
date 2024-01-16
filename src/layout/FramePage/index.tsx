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
  children: FrameChildrenIProps
} // 布局主框架的参数类型声明

function FramePage({ activeRightPanelName, activeLeftPanelName, visibleLeftTabs, visibleRightTabs, children }: FrameIProps) {
  let { TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems } = children
  // console.log('activeLeftPanel', activeLeftPanelName)
  // console.log('activeRightPanel', activeRightPanelName)
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate:
    return () => {
      // 类似于 componentWillUnmount
    }
  }, [activeRightPanelName, activeLeftPanelName])
  return (
    <div className='App-frame-panel'>
      <TopPanel slot={TopPanelItems}></TopPanel>
      <LeftPanel slot={LeftPanelItems} activePanelName={activeLeftPanelName} visibleTabs={visibleLeftTabs}></LeftPanel>
      <RightPanel slot={RightPanelItems} activePanelName={activeRightPanelName} visibleTabs={visibleRightTabs}></RightPanel>
      <BottomPanel slot={BottomPanelItems}></BottomPanel>
    </div>
  )
}
FramePage.defaultProps={
  visibleRightTabs:true,
  visibleLeftTabs:true
}
export default FramePage
