import React, { useState } from 'react'
import FramePage from '@/layout/FramePage'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import './index.scss'

function Page5(): React.ReactNode {
  let [activeRightPanelName, setActiveRightPanelName] = useState('page5RightSlot1')

  // 左侧面板主标签内容
  let RightPageContent = () => {
    return <div className='page5-right-content'>Rightpage5Content</div>
  }

  // 左侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽1' name='page5RightSlot1'></RightPanelItem>
      </>
    )
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
        RightPanelItems,
      }}
    ></FramePage>
  )
}

export default Page5
