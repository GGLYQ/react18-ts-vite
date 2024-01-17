import React from 'react'
import './index.scss'
import { toolbar } from './config'
import Icon from '../Icon'
import { Divider } from 'antd'

interface PropType {}
interface StateType {}
class Toolbar extends React.Component<PropType, StateType> {
  render(): React.ReactNode {
    return (
      <div className='toolbar-container flex-align-center'>
        <div className='toolbar-location'>
          <span>当前位置：XXX</span>
          <Divider type='vertical'/>
        </div>
        <div className='toolbar-content flex-justify-between align-centerr'>
          <div className='toolbar-left-content flex-align-center'>
            {toolbar.leftList.map((item) => {
              return (
                <div className='toolbar-item toolbar-left-item flex-align-center '>
                  <Icon iconName={item.icon}></Icon>
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
          <div className='toolbar-right-content flex-align-center '>
            {toolbar.rightList.map((item) => {
              return (
                <div className='toolbar-item  toolbar-right-item flex-align-center '>
                  <Icon iconName={item.icon}></Icon>
                  <span>{item.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default Toolbar
