import React, { Component } from 'react'

interface propType {
  slot?: () => React.ReactNode //插槽内容
  label: string //标签内容
  name: string //容器标识
  className?: string //扩展css类class属性值
  cancelClose?: boolean //是否有关闭功能
}
interface StateType {}
class LeftPanelItem extends Component<propType, StateType> {
  // 定义一个对象的属性，类型是react的对象
  private currentRef: React.RefObject<HTMLDivElement>
  constructor(props: propType) {
    super(props)
    this.currentRef = React.createRef()
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  updateleftClass() {}
  render() {
    let Element = this.props.slot
    return (
      <div ref={this.currentRef} className={`left-panel-item ${this.props.className}`}>
        {Element ? <Element /> : null}
      </div>
    )
  }
}
export default LeftPanelItem
