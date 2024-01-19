import React from 'react'
import FramePage from '@/layout/FramePage'
import Toolbar from "@/components/Toolbar"
interface PropType {}
interface StateType {
  toolbarName:string
}
class ToolbarPanel extends React.Component<PropType, StateType> {
  constructor(props:PropType){
    super(props)
    this.state={
      toolbarName:""
    }
  }
  RightPanelItems() {
    return (<div></div>)
  }
  TopPanelItems(){
    return  <Toolbar/>
  }
  render(): React.ReactNode {
    return (
      <FramePage
      activeRightPanelName={this.state.toolbarName}
      children={
        {
          TopPanelItems:this.TopPanelItems,
          RightPanelItems:this.RightPanelItems
        }
      }
      />
    )
  }
}
export default ToolbarPanel