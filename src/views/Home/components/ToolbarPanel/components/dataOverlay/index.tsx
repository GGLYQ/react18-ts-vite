import React from 'react'
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
      <div>数据叠加</div>
    )
  }
}
export default DataOverlay