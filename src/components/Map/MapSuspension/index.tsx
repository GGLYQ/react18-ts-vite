import React from 'react'
import type { reducerIState } from '@/store/type'
import { connect } from 'react-redux'
import './index.scss'

interface PropType {
  screenMode: number
}
interface StateType {}
class MapSuspension extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {}

  // 渲染Map地图页面
  render(): React.ReactNode {
    let screenMode = this.props.screenMode
    return (
      <>
        {screenMode === 1 && (
          <div className='App-map-suspension'>
            <div title='放大' className='enlarge-zoom map-button'>
              +
            </div>
            <div title='缩小' className='shrink-zoom map-button'>
              -
            </div>
          </div>
        )}
      </>
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    screenMode: state.gisWholeReducer.screenMode,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = () => {
  return {}
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(MapSuspension)
export default NavigateComponent
