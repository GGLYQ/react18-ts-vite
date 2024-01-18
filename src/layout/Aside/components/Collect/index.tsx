import React from 'react'
import "./index.scss"
interface PropType {}
interface StateType {}
class Collect extends React.Component<PropType, StateType> {
  render(): React.ReactNode {
    return (
      <div className='aside-panel-collect'></div>
    ) 
  }
}
export default Collect