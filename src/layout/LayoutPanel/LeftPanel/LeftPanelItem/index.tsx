import React, { Component } from 'react'

interface propType {
  slot?: () => React.ReactNode //插槽内容
  label: string //标签内容
  name: string //容器标识
  className?: string //扩展css类class属性值
  cancelClose?:boolean //是否有关闭功能
}
interface StateType {
}
class LeftPanelItem extends Component<propType, StateType> {
  constructor(props: propType) {
    super(props)
  }
  componentDidMount() {}
  componentDidUpdate() {
  }
  componentWillUnmount() {}
  updateleftClass() {
    
  }
  render() {
    let Element = this.props.slot
    return <div className={`left-panel-item ${ this.props.className}`}>{Element ? <Element /> : null}</div>
  }
}
export default LeftPanelItem
