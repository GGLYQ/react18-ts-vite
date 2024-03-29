import React, { PureComponent } from 'react'
import { Dispatch } from 'redux'
import './index.scss'
import { connect } from 'react-redux'
import { reducerIState } from '@/store/type'
import Icon from '@/components/Icon'
import { navlist } from '@/data/aside'
import { setActivedAside } from '@/store/reducers/GobalReducer'
import { setAsideWidth } from '@/store/reducers/LayoutReducer'
import { getPxToRem } from '@/utils/layout'
import { IObj } from '@/utils/type'
interface PropType {
  isHideAside?: boolean
  activedAsideId?: string
  setActivedAside?: (item: IObj) => void
  setAsideWidth?: (item: number) => void
}
class Aside extends PureComponent<PropType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  componentDidMount() {
    this.handleAsideWidth()
  }
  componentDidUpdate() {}
  componentWillUnmount() {}
  constructor(props: PropType) {
    super(props)
    this.currentRef = React.createRef()
  }
  handleAsideWidth() {
    let { setAsideWidth } = this.props
    let clientWidth = this.currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    // 设置侧边栏宽度
    setAsideWidth && setAsideWidth(clientWidthRem)
  }
  handleClick(item: IObj) {
    let activedAsideId = this.props.activedAsideId
    let val = item.id === activedAsideId ? {} : item
    this.props.setActivedAside && this.props.setActivedAside(val)
  }
  render() {
    return (
      !this.props.isHideAside && (
        <div className='App-aside' ref={this.currentRef}>
          {navlist.map((item) => {
            let className = item.id === this.props.activedAsideId ? 'actived' : ''
            return (
              <div className={`App-aside-item flex-cloumn align-center ${className}`} key={item.id} onClick={() => this.handleClick(item)}>
                <Icon iconName={item.icon} />
                <div className='aside-item-title'>{item.title}</div>
              </div>
            )
          })}
        </div>
      )
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    isHideAside: state.gobalReducer.isHideAside,
    activedAsideId: state.gobalReducer.activedAside.id,
  }
}
/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setActivedAside(value: IObj) {
      dispatch(setActivedAside(value))
    },
    setAsideWidth(value: number) {
      dispatch(setAsideWidth(value))
    },
  }
}
// 使用高阶组件包裹当前类组件
const NavigateComponent = connect(mapStateToProps, mapDispatchToProps)(Aside)
export default NavigateComponent
