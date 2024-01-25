import React from 'react'
import './index.scss'

interface PropType {}
interface StateType {}
class ConditionPosition extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  render(): React.ReactNode {
    return <div className='toolbar-panel-conditionPosition'>条件定位</div>
  }
}
export default ConditionPosition
