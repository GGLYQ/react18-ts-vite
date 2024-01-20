import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import Panel from '@/layout/LayoutPanel/index'
import './index.scss'

let { LeftPanel, RightPanel, TopPanel, BottomPanel } = Panel

type PanelType = (() => React.ReactElement) | null
interface FrameChildrenIProps {
  TopPanelItems?: PanelType
  LeftPanelItems?: PanelType
  RightPanelItems?: PanelType
  BottomPanelItems?: PanelType
}
interface FrameIProps {
  activeRightPanelName?: string
  activeLeftPanelName?: string
  visibleRightTabs?: boolean
  visibleLeftTabs?: boolean
  isAllDisplay?: boolean
  onRightPanelActived?: (name: string) => void
  onLeftPanelActived?: (name: string) => void
  onLeftPanelDelete?: (name: string,deletedName?:string) => void
  onRightPanelDelete?: (name: string,deletedName?:string) => void
  children: FrameChildrenIProps
} // 布局主框架的参数类型声明

function FramePage(props: FrameIProps, ref: any) {
  let TopPanelRef = useRef(null)
  let LeftPanelRef = useRef(null)
  let RightPanelRef = useRef(null)
  let BottomPanelRef = useRef(null)
  let { isAllDisplay, activeRightPanelName, activeLeftPanelName, visibleLeftTabs, visibleRightTabs, children, onRightPanelActived, onLeftPanelActived, onLeftPanelDelete, onRightPanelDelete } = props
  let { TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems } = children
  // console.log('activeLeftPanel', activeLeftPanelName)
  // console.log('activeRightPanel', activeRightPanelName)
  useEffect(() => {
    // 类似于 componentDidMount 和 componentDidUpdate:

    return () => {
      // 类似于 componentWillUnmount
    }
  }, [TopPanelItems, LeftPanelItems, RightPanelItems, BottomPanelItems])

  // 重新计算右侧面板的偏移量
  let updateRightLayout = () => {
    let current = RightPanelRef.current || { updateLayout: () => {} }
    'updateLayout' in current && current?.updateLayout()
  }
  // 重新计算左侧面板的偏移量
  let updateLeftLayout = () => {
    let current = LeftPanelRef.current || { updateLayout: () => {} }
    'updateLayout' in current && current?.updateLayout()
  }
  // 重新计算顶部面板的偏移量
  let updateTopLayout = () => {
    let current = TopPanelRef.current || { updateLayout: () => {} }
    'updateLayout' in current && current?.updateLayout()
  }
  // 重新计算底部面板的偏移量
  let updateBottomLayout = () => {
    let current = BottomPanelRef.current || { updateLayout: () => {} }
    'updateLayout' in current && current?.updateLayout()
  }
  // 重新计算四周面板的偏移量
  /**
   * @param sides [top,right,bottom,left] 0:否 1:是
   */
  let updateLayout = (sides: number[] | undefined = [1, 1, 1, 1]) => {
    // 判断值是否有效
    if (!sides.every((e) => [0, 1].includes(e))) return console.error('updateLayout函数的入参sides的类型为数组，所有索引值只能为0或1的number类型')
    sides.length > 4 && (sides = sides.slice(0, 4)) //超出裁剪为4长度的数组
    sides.length < 4 && sides.push(...Array(4 - sides.length).fill(0)) //不足长度补0
    sides[0] === 1 && updateTopLayout() //  Top
    sides[1] === 1 && updateRightLayout() // Right
    sides[2] === 1 && updateBottomLayout() // Bottom
    sides[3] === 1 && updateLeftLayout() // Left
  }
  //监听props.updateLayout值的变化
  //打开弹窗
  useImperativeHandle(ref, () => ({
    updateLayout,
    updateRightLayout,
    updateLeftLayout,
    updateTopLayout,
    updateBottomLayout,
  }))

  // 激活左侧面板的某个项
  function onActivedLeftPanel(name: string) {
    if (activeLeftPanelName === name) return
    onLeftPanelActived && onLeftPanelActived(name)
  }
  // 激活右侧面板的某个项
  function onActivedRightPanel(name: string) {
    if (activeRightPanelName === name) return
    onRightPanelActived && onRightPanelActived(name)
  }
  // 删除左侧面板的某个项
  function onDeleteLeftPanel(name: string, deletedName: string) {
    onLeftPanelDelete && onLeftPanelDelete(name, deletedName)
  }
  // 删除右侧面板的某个项
  function onDeleteRightPanel(name: string, deletedName: string) {
    onRightPanelDelete && onRightPanelDelete(name, deletedName)
  }
  return (
    <div className='App-frame-panel'>
      {/* 顶部面板 */}
      <TopPanel ref={TopPanelRef} slot={TopPanelItems}></TopPanel>
      {/* 左侧面板 */}
      <LeftPanel
        ref={LeftPanelRef}
        slot={LeftPanelItems}
        activePanelName={activeLeftPanelName}
        visibleTabs={visibleLeftTabs}
        onActivedPanel={(name) => onActivedLeftPanel(name)}
        onDeletePanel={(name, deletedName = '') => onDeleteLeftPanel(name, deletedName)}
        isAllDisplay={isAllDisplay}
      ></LeftPanel>
      {/* 右侧面板 */}
      <RightPanel
        ref={RightPanelRef}
        slot={RightPanelItems}
        activePanelName={activeRightPanelName}
        visibleTabs={visibleRightTabs}
        onActivedPanel={(name) => onActivedRightPanel(name)}
        onDeletePanel={(name, deletedName = '') => onDeleteRightPanel(name, deletedName)}
        isAllDisplay={isAllDisplay}
      ></RightPanel>
      {/* 底部面板 */}
      <BottomPanel ref={BottomPanelRef} slot={BottomPanelItems}></BottomPanel>
    </div>
  )
}
let ForwardRefComponents = forwardRef(FramePage)

ForwardRefComponents.defaultProps = {
  visibleRightTabs: true,
  visibleLeftTabs: true,
}
export default ForwardRefComponents
