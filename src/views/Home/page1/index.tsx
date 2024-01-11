// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import './index.scss'
// 顶部面板
let TopPanelItems = () => {
  return <div>page1顶部</div>
}
// 左侧面板
let LeftPanelItems = () => {
  return <div>page1左侧面板</div>
}
// 右侧面板
let RightPanelItems = () => {
  return <div>page1右侧面板</div>
}
// 底部面板
let BottomPanelItems = () => {
  return <div>page1底部面板</div>
}
function page1(): React.ReactNode {
  return (
    <div className='App-home-page1'>
      <FramePage
        activeRightPanelName='page1'
        children={{
          TopPanelItems,
          LeftPanelItems,
          RightPanelItems,
          BottomPanelItems,
        }}
      ></FramePage>
    </div>
  )
}

export default page1
