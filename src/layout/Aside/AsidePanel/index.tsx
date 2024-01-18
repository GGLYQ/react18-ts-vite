import React from 'react'
import type { reducerIState } from '@/store/type'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setAsidePanelWidth } from '@/store/reducers/LayoutReducer'
import { IObj } from '@/utils/type'
import { watchProps } from '@/utils/hook'
import { getPxToRem } from '@/utils/layout'
import { load } from '@/utils/withRouter'

let Collect = load('../layout/Aside/components/Collect')
let DataSource = load('../layout/Aside/components/DataSource')

interface PropType {
  topPanelHeight: number
  asidePanelWidth: number
  setAsideWidth: (value: number) => void
  activedAside: IObj
}
interface StateType {
  style: IObj
}
class AsidePanel extends React.Component<PropType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef()
    this.state = {
      style: {
        top: '0',
      },
    }
  }
  componentDidMount(): void {
    this.handleAsideWidth()
  }
  componentDidUpdate(...prev: [PropType, StateType]) {
    watchProps(this, prev[0], ['topPanelHeight', this.updateLeftAndRightWidth], ['activedAside', this.handleAsideWidth])
  }
  // 设置左右侧的宽度
  updateLeftAndRightWidth() {
    let { topPanelHeight } = this.props
    this.setState({
      ...this.state,
      style: {
        top: topPanelHeight + 'rem',
      },
    })
  }
  // 初始化侧边栏布局的宽度
  handleAsideWidth() {
    let { setAsideWidth } = this.props
    let clientWidth = this.currentRef.current?.clientWidth // 获取DOM元素
    console.log(this.currentRef, clientWidth)

    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    setAsideWidth && setAsideWidth(clientWidthRem)
  }
  render(): React.ReactNode {
    let Element = null
    if (this.props.activedAside && this.props.activedAside.isAsidePanel) {
      let elementMap = {
        collect: () => Collect, //我的收藏
        dataSource: () => DataSource, //数据资源
      } as IObj
      let activedElement = elementMap[this.props.activedAside.id]
      Element = (activedElement as React.ReactElement) ? activedElement() : null
    }
    return <div className='App-aside-panel'>{Element}</div>
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    topPanelHeight: state.layoutReducer.topPanelHeight,
    asidePanelWidth: state.layoutReducer.asidePanelWidth,
    activedAside: state.gobalReducer.activedAside,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAsideWidth(value: number) {
      dispatch(setAsidePanelWidth(value))
    },
  }
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps)(AsidePanel)
export default NavigateComponent
