// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import Query from '../components/Query'
import LeftPanelItem from '@/layout/Panel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/Panel/RightPanel/RightPanelItem'
import './index.scss'
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
  return <div className='page1-top-item'>page1顶部</div>
}
// 左侧面板
let LeftPanelItems = () => {
  return (
    <>
      <LeftPanelItem slot={LeftPageContent} label="插槽1" name='page1LeftSlot1'></LeftPanelItem>
      <LeftPanelItem slot={Query} label="插槽2" name='page1LeftSlot2'></LeftPanelItem>
    </>
  )
}
// 右侧面板
let RightPanelItems = () => {
  return (
    <>
      <RightPanelItem slot={RightPageContent} label="插槽3" name='page1RightSlot1'></RightPanelItem>
      <RightPanelItem slot={Query} label="插槽4" name='page1RightSlot2'></RightPanelItem>
    </>
  )
}
// 底部面板
let BottomPanelItems = () => {
  return <div className='page1-bottom-item'>page1底部</div>
}
function page1(): React.ReactNode {
  return (
    <FramePage
      activeRightPanelName='page1RightSlot1'
      activeLeftPanelName='page1LeftSlot1'
      children={{
        TopPanelItems,
        LeftPanelItems,
        RightPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default page1
