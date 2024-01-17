// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import RightPanelItem from '@/layout/Panel/RightPanel/RightPanelItem'
import './index.scss'

function page3(): React.ReactNode {
  // 右侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page3-right-content'>Rightpage3Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <div className='page3-top-item'>page3顶部</div>
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽1' name='page3RightSlot1'></RightPanelItem>
        {/* <RightPanelItem slot={Query}></RightPanelItem> */}
      </>
    )
  }
  // 底部面板
  let BottomPanelItems = () => {
    return <div className='page3-bottom-item'>page3底部</div>
  }
  return (
    <FramePage
      activeRightPanelName='page3'
      children={{
        TopPanelItems,
        RightPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default page3
