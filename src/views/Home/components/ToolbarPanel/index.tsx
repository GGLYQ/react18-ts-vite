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

interface PropType {
  activedToolbar: IObj
}
interface StateType {
  leftPanelName: string
  rightPanelName: string
  leftContainer: string[]
  rightContainer: string[]
}
class ToolbarPanel extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      leftPanelName: '',
      rightPanelName: '',
      leftContainer: [],
      rightContainer: [],
    }
  }
  componentDidUpdate(prevProps: Readonly<PropType>): void {
    watchProps(this, prevProps, ['activedToolbar', this.watchToolbar])
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
    let rightContainer = this.state.rightContainer
    if (!rightContainer.includes(name)) {
      rightContainer.push(name)
    }
    this.setState({
      ...this.state,
      rightPanelName: name,
      rightContainer,
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
    let leftContainer = this.state.leftContainer
    if (!leftContainer.includes(name)) {
      leftContainer.push(name)
    }
    this.setState({
      ...this.state,
      leftPanelName: name,
      leftContainer,
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
        <LeftPanelItem slot={() => <Com.Plotting />} label='标绘' name='plotting'></LeftPanelItem>
      </>
    )
  }
  // 右侧面板
  RightPanelItems() {
    return (
      <>
        <RightPanelItem slot={() => <Com.AttributeQuery />} label='属性' name='attributeQuery'></RightPanelItem>
        <RightPanelItem slot={() => <Com.DataOverlay />} label='数据叠加' name='dataOverlay'></RightPanelItem>
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
          RightPanelItems: this.state.rightContainer.length ? this.RightPanelItems : null,
          LeftPanelItems: this.state.leftContainer.length ? this.LeftPanelItems : null,
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
