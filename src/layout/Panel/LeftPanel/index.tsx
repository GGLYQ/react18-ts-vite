import React, { Component } from 'react'
interface propType {
  slot?: () => React.ReactNode
}
interface StateType {}
class LeftPanel extends Component<propType, StateType> {
  constructor(props: propType) {
    super(props)
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let Element = this.props.slot
    return <div className='left-panel-wrapper'>{Element ? <Element /> : null}</div>
  }
}
export default LeftPanel
