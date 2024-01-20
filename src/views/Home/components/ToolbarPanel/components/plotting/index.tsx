import React from 'react'
import './index.scss'

interface PropType {}
interface StateType {}
class Plotting extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  render(): React.ReactNode {
    return <div className='toolbar-panel-plotting'>标绘</div>
  }
}
export default Plotting
