import React from 'react'
interface PropType {}
interface StateType {}
class AttributeQuery extends React.Component<PropType, StateType> {
  constructor(props:PropType){
    super(props)
    this.state={
    }
  }
  render(): React.ReactNode {
    return (
      <div>属性</div>
    )
  }
}
export default AttributeQuery