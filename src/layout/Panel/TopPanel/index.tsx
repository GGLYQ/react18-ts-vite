import React, { Component } from 'react'
interface propType {
  slot?: () => React.ReactNode
}
interface StateType {}
class TopPanel extends Component<propType, StateType> {
  constructor(props: propType) {
    super(props)
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let Element = this.props.slot
    return <div className='top-panel-wrapper'>{Element ? <Element /> : null}</div>
  }
}
export default TopPanel
