// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import LeftPanelItem from '@/layout/Panel/LeftPanel/LeftPanelItem'
import './index.scss'

function page4(): React.ReactNode {
  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page4-left-content'>Leftpage4Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <div className='page4-top-item'>page4顶部</div>
  }
  // 左侧面板
  let LeftPanelItems = () => {
    return (
      <>
        <LeftPanelItem slot={LeftPageContent} label='插槽1' name='page4LeftSlot1'></LeftPanelItem>
        {/* <LeftPanelItem slot={Query}></LeftPanelItem> */}
      </>
    )
  }
  // 底部面板
  let BottomPanelItems = () => {
    return <div className='page4-bottom-item'>page4底部</div>
  }
  return (
    <FramePage
      activeRightPanelName='page4'
      children={{
        TopPanelItems,
        LeftPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default page4
