// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import RightPanelItem from '@/layout/Panel/RightPanel/RightPanelItem'
import './index.scss'

function page5(): React.ReactNode {
  // 左侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page4-Right-content'>Rightpage5Content</div>
  }

  // 左侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽1' name='page5RightSlot1'></RightPanelItem>
      </>
    )
  }
  return (
    <FramePage
      activeRightPanelName='page5RightSlot1'
      children={{
        RightPanelItems,
      }}
    ></FramePage>
  )
}

export default page5
