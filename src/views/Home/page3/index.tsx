// import { useState } from 'react'
import React, { useState } from 'react'
import FramePage from '@/layout/FramePage'
import Query from '../components/Query'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import Toolbar from '@/components/Toolbar'
import './index.scss'

function Page3(): React.ReactNode {
  let [activeRightPanelName, setActiveRightPanelName] = useState('page3RightSlot1')
  // 右侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page3-right-content'>Rightpage3Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <Toolbar/>
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽1' name='page3RightSlot1'></RightPanelItem>
        <RightPanelItem slot={Query} label='插槽2' name='page3RightSlot2' cancelClose></RightPanelItem>
        <RightPanelItem slot={Query} label='插槽3' name='page3RightSlot3' cancelClose></RightPanelItem>
      </>
    )
  }
  // 底部面板
  let BottomPanelItems = () => {
    return <div className='page3-bottom-item'>page3底部</div>
  }
  let onRightPanelActived = (name: string) => {
    // console.log('onRightPanelActived', name)
    setActiveRightPanelName(name)
  }
  let onRightPanelDelete = (name: string) => {
    console.log('onRightPanelDelete', name)
  }
  return (
    <FramePage
      activeRightPanelName={activeRightPanelName}
      onRightPanelActived={(name) => onRightPanelActived(name)}
      onRightPanelDelete={(name) => onRightPanelDelete(name)}
      children={{
        TopPanelItems,
        RightPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default Page3
