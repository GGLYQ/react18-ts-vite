import React from 'react'
import { connect } from 'react-redux'
import './index.scss'
import Map2D from './Map2D'
import MapSuspension from './MapSuspension'

interface PropType {
  screenMode: number
}
interface StateType {}
class Map extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {}

  // 渲染Map地图页面
  render(): React.ReactNode {
    return (
      <div className='App-map'>
        <Map2D />
        <MapSuspension/>
      </div>
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = () => {
  return {
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = () => {
  return {}
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Map)
export default NavigateComponent
