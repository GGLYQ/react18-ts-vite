/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from 'react'
import FramePage from '@/layout/FramePage'
import BaseInfo from "../components/BaseInfo"
import LeftPanelItem from '@/layout/LayoutPanel/LeftPanel/LeftPanelItem'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import Toolbar from '@/components/Toolbar'
import './index.scss'
import { Button } from 'antd'

function Page1(): React.ReactNode {
  let [activeRightPanelName, setActiveRightPanelName] = useState('page1RightSlot1')
  let [activeLeftPanelName, setActiveLeftPanelName] = useState('page1LeftSlot1')
  let [className, setClassName] = useState('')
  let FramePageRef = useRef(null)
  let updateLayout = () => {
    let current = FramePageRef.current || { updateLayout: (_sides?: number[]) => {} }
    'updateLayout' in current && current?.updateLayout([0, 1, 0, 0])
  }
  let buttonClick = () => {
    setClassName('page1-right-content2')
    updateLayout()
  }
  // 右侧面板主标签内容
  let RightPageContent = () => {
    return (
      <div className={`page1-right-content hight-fill padding-12 ${className}`}>
        <Button type='primary' onClick={buttonClick}>
          重新渲染布局
        </Button>
      </div>
    )
  }
  // 左侧面板主标签内容
  let LeftPageContent = () => {
    return <div className='page1-left-content'>LeftPage1Content</div>
  }
  // 顶部面板
  let TopPanelItems = () => {
    return <Toolbar />
  }
  // 左侧面板
  let LeftPanelItems = () => {
    return (
      <>
        <LeftPanelItem slot={LeftPageContent} label='插槽1' name='page1LeftSlot1'></LeftPanelItem>
        <LeftPanelItem slot={BaseInfo} label='插槽2' name='page1LeftSlot2' ></LeftPanelItem>
      </>
    )
  }
  // 右侧面板
  let RightPanelItems = () => {
    return (
      <>
        <RightPanelItem slot={RightPageContent} label='插槽3' name='page1RightSlot1'></RightPanelItem>
        <RightPanelItem slot={BaseInfo} label='插槽4' name='page1RightSlot2' cancelClose></RightPanelItem>
      </>
    )
  }
  // 底部面板
  let BottomPanelItems = () => {
    return <div className='page1-bottom-item'>page1底部</div>
  }
  // 左侧面板标签激活事件
  let onLeftPanelActived = (name: string) => {
    console.log('onLeftPanelActived', name)
    setActiveLeftPanelName(name)
  }
  // 右侧面板标签激活事件
  let onRightPanelActived = (name: string) => {
    console.log('onRightPanelActived', name)
    setActiveRightPanelName(name)
  }
  // 左侧面板标签关闭事件
  let onLeftPanelDelete = (name: string) => {
    console.log('onLeftPanelDelete', name)
    setActiveLeftPanelName(name)
  }
  // 右侧面板标签关闭事件
  let onRightPanelDelete = (name: string) => {
    console.log('onRightPanelDelete', name)
    setActiveRightPanelName(name)
  }
  return (
    <FramePage
      ref={FramePageRef}
      activeRightPanelName={activeRightPanelName}
      activeLeftPanelName={activeLeftPanelName}
      onLeftPanelActived={(name) => onLeftPanelActived(name)}
      onRightPanelActived={(name) => onRightPanelActived(name)}
      onLeftPanelDelete={(name) => onLeftPanelDelete(name)}
      onRightPanelDelete={(name) => onRightPanelDelete(name)}
      children={{
        TopPanelItems,
        LeftPanelItems,
        RightPanelItems,
        BottomPanelItems,
      }}
    ></FramePage>
  )
}

export default Page1
