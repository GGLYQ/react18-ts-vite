import React, { useEffect } from 'react'
import Panel from '@/layout/Panel/index'
let { LeftPanel, RightPanel, TopPanel, BottomPanel } = Panel

interface FrameChildrenIProps {
  TopPanelItems?: () => React.ReactNode
  LeftPanelItems?: () => React.ReactNode
  RightPanelItems?: () => React.ReactNode
  BottomPanelItems?: () => React.ReactNode
}
interface FrameIProps {
  activeRightPanelName?: string
  activeLeftPanelName?: string
  children: FrameChildrenIProps
} // 布局主框架的参数类型声明

let FramePage = ({ activeRightPanelName, activeLeftPanelName, children }: FrameIProps) => {
  let { TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems } = children
  console.log('activeRightPanel', activeRightPanelName)
  console.log('activeLeftPanel', activeLeftPanelName)
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate:
    return () => {
      // 类似于 componentWillUnmount
    }
  }, [])
  return (
    <div className='frame-panel'>
      <TopPanel slot={TopPanelItems}></TopPanel>
      <LeftPanel slot={LeftPanelItems}></LeftPanel>
      <RightPanel slot={RightPanelItems}></RightPanel>
      <BottomPanel slot={BottomPanelItems}></BottomPanel>
    </div>
  )
}
export default FramePage
