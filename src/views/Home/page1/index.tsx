// import { useState } from 'react'
import React from 'react'
import FramePage from '@/layout/FramePage'
import Query from '../components/Query'
import LeftPanelItem from '@/layout/Panel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/Panel/RightPanel/RightPanelItem'
import './index.scss'
// 右侧面板主标签内容
let RightPageContent=() => {
  return <div>pageConent</div>
}
// 左侧面板主标签内容
let LeftPageContent=() => {
  return <div>pageConent</div>
}
// 顶部面板
let TopPanelItems = () => {
  return <div>page1顶部</div>
}
// 左侧面板
let LeftPanelItems = () => {
  return (
    <>
      <LeftPanelItem slot={LeftPageContent}></LeftPanelItem>
      <LeftPanelItem slot={Query}></LeftPanelItem>
    </>
  )
}
// 右侧面板
let RightPanelItems = () => {
  return (
    <>
      <RightPanelItem slot={RightPageContent}></RightPanelItem>
      <RightPanelItem slot={Query}></RightPanelItem>
    </>
  )
}
// 底部面板
let BottomPanelItems = () => {
  return <div>page1底部</div>
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
