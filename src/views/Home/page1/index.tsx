// import { useState } from 'react'
import React, { useState } from 'react'
import FramePage from '@/layout/FramePage'
import Query from '../components/Query'
import LeftPanelItem from '@/layout/LayoutPanel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import Toolbar from '@/components/Toolbar'
import './index.scss'

function Page1(): React.ReactNode {
  let [activeRightPanelName, setActiveRightPanelName] = useState('page1RightSlot1')
  let [activeLeftPanelName, serActiveLeftPanelName] = useState('page1LeftSlot1')
  // 右侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page1-right-content'>RightPage1Content</div>
  }
  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page1-left-content'>LeftPage1Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <Toolbar/>
  }
  // 左侧面板
  let LeftPanelItems = () => {
    return (
      <>
        <LeftPanelItem slot={LeftPageContent} label='插槽1' name='page1LeftSlot1'></LeftPanelItem>
        <LeftPanelItem slot={Query} label='插槽2' name='page1LeftSlot2' cancelClose></LeftPanelItem>
      </>
    )
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽3' name='page1RightSlot1'></RightPanelItem>
        <RightPanelItem slot={Query} label='插槽4' name='page1RightSlot2'></RightPanelItem>
      </>
    )
  }
  // 底部面板
  let BottomPanelItems = () => {
    return <div className='page1-bottom-item'>page1底部</div>
  }
  let onLeftPanelActived = (name: string) => {
    // console.log('onLeftPanelActived', name)
    serActiveLeftPanelName(name)
  }
  let onRightPanelActived = (name: string) => {
    // console.log('onRightPanelActived', name)
    setActiveRightPanelName(name)
  }
  let onLeftPanelDelete = (name: string) => {
    console.log('onLeftPanelDelete', name)
  }
  let onRightPanelDelete = (name: string) => {
    console.log('onRightPanelDelete', name)
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
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default Page1
