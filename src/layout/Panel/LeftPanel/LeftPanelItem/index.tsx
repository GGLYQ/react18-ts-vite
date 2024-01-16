import React, { Component } from 'react'
import { watchProps } from '@/utils/hook'

interface propType {
  slot?: () => React.ReactNode
  label: string
  name: string
  className?: string
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
