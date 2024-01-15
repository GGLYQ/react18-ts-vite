import React, { Component } from 'react'
interface propType {
  slot?: () => React.ReactNode,
  label?:string
  name?:string
}
interface StateType {}
class LeftPanelItem extends Component<propType, StateType> {
  constructor(props: propType) {
    super(props)
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let Element = this.props.slot
    return <div className='left-panel-item'>{Element ? <Element /> : null}</div>
  }
}
export default LeftPanelItem
