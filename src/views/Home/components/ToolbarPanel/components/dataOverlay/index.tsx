import React from 'react'
import './index.scss'
interface PropType {}
interface StateType {}
class DataOverlay extends React.Component<PropType, StateType> {
  constructor(props:PropType){
    super(props)
    this.state={
    }
  }
  render(): React.ReactNode {
    return (
      <div className='toolbar-panel-dataOverlay'>数据叠加</div>
    )
  }
}
export default DataOverlay