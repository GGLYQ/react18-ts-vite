import React from 'react'
import './index.scss'
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
      <div className='toolbar-panel-attributeQuery'>属性</div>
    )
  }
}
export default AttributeQuery