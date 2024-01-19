import React from 'react'
interface PropType {}
interface StateType {}
class Plotting extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  render(): React.ReactNode {
    return <div>标绘</div>
  }
}
export default Plotting
