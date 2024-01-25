import React from 'react'
import type { reducerIState } from '@/store/type'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { setAsidePanelWidth } from '@/store/reducers/LayoutReducer'
import { IObj } from '@/utils/type'
import { watchProps } from '@/utils/hook'
import { getPxToRem } from '@/utils/layout'
import Collect from '../components/Collect'
import DataSource from '../components/DataSource'
import './index.scss'
// import { load } from '@/utils/withRouter'

// let Collect = load('../layout/Aside/components/Collect')
// let DataSource = load('../layout/Aside/components/DataSource')

interface PropType {
  topPanelHeight: number
  asidePanelWidth: number
  asideWidth: number
  setAsideWidth: (value: number) => void
  activedAside: IObj
}
interface StateType {
  style: IObj
}
class AsidePanel extends React.PureComponent<PropType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef()
    this.state = {
      style: {},
    }
  }
  componentDidMount(): void {
    // this.handleAsideWidth()
  }
  componentDidUpdate(...prev: [PropType, StateType]) {
    watchProps(this, prev[0], ['topPanelHeight', this.updateTop], ['bottomPanelHeight', this.updateTop], ['asideWidth', this.updateTop], ['activedAside', this.handleAsideWidth])
  }
  // 设置便宜距离
  updateTop() {
    let { topPanelHeight, asideWidth } = this.props
    this.setState({
      ...this.state,
      style: {
        ...this.state.style,
        top: topPanelHeight + 'rem',
        left: asideWidth + 'rem',
      },
    })
  }
  // 初始化侧边栏布局的宽度
  handleAsideWidth() {
    let { setAsideWidth, topPanelHeight, activedAside, asideWidth } = this.props
    let clientWidthRem = 0
    if (activedAside.isAsidePanel && activedAside.id) {
      let clientWidth = this.currentRef.current?.clientWidth // 获取DOM元素
      let children = Array.prototype.slice.call(this.currentRef.current?.children || [])
      let widthList = children.map((e) => e.clientWidth)
      widthList.push(clientWidth)
      let maxWidth = Math.max(...widthList)
      clientWidthRem = getPxToRem(maxWidth || 0)
    }
    this.setState({
      style: {
        width: clientWidthRem + 'rem',
        top: topPanelHeight + 'rem',
        left: asideWidth + 'rem',
      },
    })
    setAsideWidth && setAsideWidth(clientWidthRem)
  }
  render(): React.ReactNode {
    let Element = null
    if (this.props.activedAside && this.props.activedAside.isAsidePanel) {
      let elementMap = {
        collect: Collect, //我的收藏
        dataSource: DataSource, //数据资源
      } as IObj
      let activedElement = elementMap[this.props.activedAside.id] || null
      Element = (activedElement as React.ReactElement) ? activedElement : null
    }
    let className = this.state.style.width && this.state.style.width !== '0rem' ? 'actived' : ''
    return (
      <div className={`App-aside-panel ${className}`} ref={this.currentRef} style={this.state.style}>
        {Element ? <Element /> : null}
      </div>
    )
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
    asideWidth: state.layoutReducer.asideWidth,
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
