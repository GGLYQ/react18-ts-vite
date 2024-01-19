import React from 'react'
import './index.scss'

interface PropType {}
interface StateType {}
class DataSource extends React.Component<PropType, StateType> {
  render(): React.ReactNode {
    return <div className='aside-panel-dataSource'>数据资源</div>
  }
}
export default DataSource
