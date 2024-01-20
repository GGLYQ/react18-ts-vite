import React from 'react'
import FramePage from '@/layout/FramePage'
import Toolbar from '@/components/Toolbar'
import { connect } from 'react-redux'
import type { reducerIState } from '@/store/type'
import { watchProps } from '@/utils/hook'
import { IObj } from '@/utils/type'
import RightPanelItem from '@/layout/LayoutPanel/RightPanel/RightPanelItem'
import Com from './components'
import LeftPanelItem from '@/layout/LayoutPanel/LeftPanel/LeftPanelItem'
import { toolbarList } from '@/data/toolbar'
import './index.scss'
import _ from 'lodash'

interface PropType {
  activedToolbar: IObj
}
interface StateType {
  leftPanelName: string
  rightPanelName: string
}
function getToolbarList(type: string) {
  return JSON.parse(JSON.stringify(toolbarList.leftList.filter((e) => e.panelType == type)))
}
let leftPanelList = getToolbarList('left') //获取哪些工具栏项使用左侧面板
let rightPanelList = getToolbarList('right') //获取哪些工具栏项使用右侧面板
// 工具栏面板页面
class ToolbarPanel extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      leftPanelName: '',
      rightPanelName: '',
    }
  }
  componentDidUpdate(prevProps: Readonly<PropType>): void {
    watchProps(this, prevProps, ['activedToolbar', this.watchToolbar]) //监听事件
  }

  // 监听工具栏改变事件
  watchToolbar() {
    let { activedToolbar } = this.props
    switch (activedToolbar.panelType) {
      case 'left':
        if (activedToolbar.id !== this.state.leftPanelName) this.onLeftPanelActived(activedToolbar.id)
        break
      case 'right':
        if (activedToolbar.id !== this.state.rightPanelName) this.onRightPanelActived(activedToolbar.id)
        break
      default:
        break
    }
  }
  // 右侧面板标签激活事件
  onRightPanelActived(name: string) {
    this.setState({
      ...this.state,
      rightPanelName: name,
    })
    console.log('onRightPanelActived', name)
    // setActiveRightPanelName(name)
  }
  // 右侧面板标签关闭事件
  onRightPanelDelete(name: string) {
    console.log('onRightPanelDelete', name)
  }
  // 左侧面板标签激活事件
  onLeftPanelActived(name: string) {
    this.setState({
      ...this.state,
      leftPanelName: name,
    })
    console.log('onLeftPanelActived', name)
    // setActiveRightPanelName(name)
  }
  // 左侧面板标签关闭事件
  onLeftPanelDelete(name: string) {
    console.log('onLeftPanelDelete', name)
  }
  // 右侧面板
  LeftPanelItems() {
    return (
      <>
        {leftPanelList.map((item: IObj) => {
          let PanelCom = Com[item?.panelComponet as keyof typeof Com]
          return <LeftPanelItem slot={() => <PanelCom />} label={item.label} name={item.id} key={item.id}></LeftPanelItem>
        })}
      </>
    )
  }
  // 右侧面板
  RightPanelItems() {
    return (
      <>
        {rightPanelList.map((item: IObj) => {
          let PanelCom = Com[item?.panelComponet as keyof typeof Com]
          return <RightPanelItem slot={() => <PanelCom />} label={item.label} name={item.id} key={item.id}></RightPanelItem>
        })}
      </>
    )
  }
  // 顶部面板
  TopPanelItems() {
    return <Toolbar />
  }
  render(): React.ReactNode {
    return (
      <FramePage
        activeRightPanelName={this.state.rightPanelName}
        activeLeftPanelName={this.state.leftPanelName}
        onRightPanelActived={(name) => this.onRightPanelActived(name)}
        onRightPanelDelete={(name) => this.onRightPanelDelete(name)}
        onLeftPanelActived={(name) => this.onLeftPanelActived(name)}
        onLeftPanelDelete={(name) => this.onLeftPanelDelete(name)}
        children={{
          TopPanelItems: this.TopPanelItems,
          RightPanelItems: this.RightPanelItems,
          LeftPanelItems: this.LeftPanelItems,
        }}
      />
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    activedToolbar: state.gobalReducer.activedToolbar,
  }
}

let NavigateComponent = connect(mapStateToProps)(ToolbarPanel)
export default NavigateComponent
