import React, { useState } from 'react'
import FramePage from '@/layout/FramePage'
import BaseInfo from '../components/BaseInfo'
import LeftPanelItem from '@/layout/LayoutPanel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import Toolbar from '@/components/Toolbar'
import './index.scss'

function Page2(): React.ReactNode {
  let [activeRightPanelName, setActiveRightPanelName] = useState('page2RightSlot1')
  let [activeLeftPanelName, setActiveLeftPanelName] = useState('page2LeftSlot1')
  // 右侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page2-right-content'>Rightpage2Content</div>
  }

  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page2-left-content'>Leftpage2Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <Toolbar />
  }
  // 左侧面板
  let LeftPanelItems = () => {
    return (
      <>
        <LeftPanelItem slot={LeftPageContent} label='插槽1' name='page2LeftSlot1'></LeftPanelItem>
        <LeftPanelItem slot={BaseInfo} label='插槽2' name='page2LeftSlot2'></LeftPanelItem>
        <LeftPanelItem slot={BaseInfo} label='插槽3' name='page2LeftSlot3'></LeftPanelItem>
      </>
    )
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽4' name='page2RightSlot1'></RightPanelItem>
      </>
    )
  }
  // 左侧面板标签激活事件
  let onLeftPanelActived = (name: string) => {
    // console.log('onLeftPanelActived', name)
    setActiveLeftPanelName(name)
  }
  // 右侧面板标签激活事件
  let onRightPanelActived = (name: string) => {
    // console.log('onRightPanelActived', name)
    setActiveRightPanelName(name)
  }
  // 左侧面板标签关闭事件
  let onLeftPanelDelete = (name: string) => {
    // console.log('onLeftPanelDelete', name)
    setActiveLeftPanelName(name)
  }
  // 右侧面板标签关闭事件
  let onRightPanelDelete = (name: string) => {
    // console.log('onRightPanelDelete', name)
    setActiveRightPanelName(name)
  }
  return (
    <FramePage
      activeRightPanelName={activeRightPanelName}
      activeLeftPanelName={activeLeftPanelName}
      onLeftPanelActived={(name) => onLeftPanelActived(name)}
      onRightPanelActived={(name) => onRightPanelActived(name)}
      onLeftPanelDelete={(name) => onLeftPanelDelete(name)}
      onRightPanelDelete={(name) => onRightPanelDelete(name)}
      children={{
        TopPanelItems,
        LeftPanelItems,
        RightPanelItems,
      }}
    ></FramePage>
  )
}

export default Page2
