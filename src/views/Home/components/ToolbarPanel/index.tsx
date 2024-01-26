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
import { setRightPanelContainer, setActivedToolbarByName } from '@/store/reducers/GobalReducer'
import { Dispatch } from 'redux'
import { toolbarList } from '@/data/toolbar'
import './index.scss'
import _ from 'lodash'

interface PropType {
  activedToolbar: IObj
  leftPanelContainer: string[]
  rightPanelContainer: string[]
  _setRightPanelContainer: (_value: string[]) => void
  _setLeftPanelContainer: (_value: string[]) => void
  _setActivedToolbarByName: (_value: string) => void
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
class ToolbarPanel extends React.PureComponent<PropType, StateType> {
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
    // console.log('watchToolbar',activedToolbar);
    switch (activedToolbar.panelType) {
      case 'left':
        if (activedToolbar.id !== this.state.leftPanelName) this.onLeftPanelActived(activedToolbar.id)
        break
      case 'right':
        if (activedToolbar.id !== this.state.rightPanelName) this.onRightPanelActived(activedToolbar.id)
        break
      default:
        this.setState({
          ...this.state,
          rightPanelName: '',
          leftPanelName: '',
        })
        break
    }
  }
  setActivedToolbar(name: string) {
    let { _setActivedToolbarByName } = this.props
    _setActivedToolbarByName && _setActivedToolbarByName(name)
  }
  // 右侧面板标签激活事件
  onRightPanelActived(name: string) {
    // let { rightPanelContainer, _setRightPanelContainer } = this.props
    // let newRightPanelContainer = _.cloneDeep(rightPanelContainer) || []
    // if (!newRightPanelContainer.includes(name)) {
    //   newRightPanelContainer.push(name)
    //   _setRightPanelContainer(newRightPanelContainer)
    // }
    this.setState({
      ...this.state,
      rightPanelName: name,
    })
    console.log('toolbarPanelRightActived', name)
  }
  // 右侧面板标签关闭事件
  onRightPanelDelete(name: string, deletedName?: string) {
    console.log('onRightPanelDelete', name, deletedName)
  }
  // 左侧面板标签激活事件
  onLeftPanelActived(name: string) {
    this.setState({
      ...this.state,
      leftPanelName: name,
    })
    console.log('toolbarPanelLeftActived', name)
  }
  // 左侧面板标签关闭事件
  onLeftPanelDelete(name: string, deletedName?: string) {
    console.log('onLeftPanelDelete', name, deletedName)
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
        onRightPanelActived={(name) => this.setActivedToolbar(name)}
        onRightPanelDelete={(name, deletedName) => this.onRightPanelDelete(name, deletedName)}
        onLeftPanelActived={(name) => this.setActivedToolbar(name)}
        onLeftPanelDelete={(name, deletedName) => this.onLeftPanelDelete(name, deletedName)}
        isAllDisplay={false}
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
    leftPanelContainer: state.gobalReducer.leftPanelContainer,
    rightPanelContainer: state.gobalReducer.rightPanelContainer,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    _setRightPanelContainer(value: string[]) {
      dispatch(setRightPanelContainer(value))
    },
    _setActivedToolbarByName(value: string) {
      dispatch(setActivedToolbarByName(value))
    },
  }
}

let NavigateComponent = connect(mapStateToProps, mapDispatchToProps)(ToolbarPanel)
export default NavigateComponent
