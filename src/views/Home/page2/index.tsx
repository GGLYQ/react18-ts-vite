// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import Query from '../components/Query'
import LeftPanelItem from '@/layout/Panel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/Panel/RightPanel/RightPanelItem'
import './index.scss'
// 右侧面板主标签内容
let RightPageContent = () => {
  return <div className='page2-right-content'>Rightpage2Content</div>
}

function page2(): React.ReactNode {
  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page2-left-content'>Leftpage2Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <div className='page2-top-item'>page2顶部</div>
  }
  // 左侧面板
  let LeftPanelItems = () => {
    return (
      <>
        <LeftPanelItem slot={LeftPageContent} label='插槽1' name='page2LeftSlot1'></LeftPanelItem>
        {/* <LeftPanelItem slot={Query}></LeftPanelItem> */}
      </>
    )
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽2' name='page2RightSlot1'></RightPanelItem>
        {/* <RightPanelItem slot={Query}></RightPanelItem> */}
      </>
    )
  }
  return (
    <FramePage
      activeRightPanelName='page2'
      children={{
        TopPanelItems,
        LeftPanelItems,
        RightPanelItems,
      }}
    ></FramePage>
  )
}

export default page2
