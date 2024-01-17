import React, { useState } from 'react'
import FramePage from '@/layout/FramePage'
import LeftPanelItem from '@/layout/Panel/LeftPanel/LeftPanelItem'
import Toolbar from '@/components/Toolbar'
import './index.scss'

function Page4(): React.ReactNode {
  let [activeLeftPanelName, serActiveLeftPanelName] = useState('page4LeftSlot1')
  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page4-left-content'>Leftpage4Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <div className='page4-top-item'><Toolbar/></div>
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
  let onLeftPanelActived = (name: string) => {
    // console.log('onLeftPanelActived', name)
    serActiveLeftPanelName(name)
  }
  
  let onLeftPanelDelete = (name: string) => {
    console.log('onLeftPanelDelete', name)
  }
  
  return (
    <FramePage
      activeLeftPanelName={activeLeftPanelName}
      onLeftPanelActived={(name) => onLeftPanelActived(name)}
      onLeftPanelDelete={(name) => onLeftPanelDelete(name)}
      children={{
        TopPanelItems,
        LeftPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default Page4
