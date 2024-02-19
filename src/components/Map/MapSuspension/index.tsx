import React from 'react'
import type { reducerIState } from '@/store/type'
import { connect } from 'react-redux'
import './index.scss'
import executeMixin from '@/components/Map/mixins/executeMixin'

interface PropType {
  screenMode: number
}
interface StateType {}
class MapSuspension extends React.PureComponent<PropType, StateType> {
  [x: string]: any
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {}
  // 放大\缩小
  zoomChange(type:string) {
    this.excuteMapMethod('mapZoomEnlargeAndShrink',type)
  }
  // 渲染Map地图页面
  render(): React.ReactNode {
    let screenMode = this.props.screenMode
    return (
      <>
        {screenMode === 1 && (
          <div className='App-map-suspension'>
            <div title='放大' className='enlarge-zoom map-button' onClick={() => this.zoomChange('enlarge')}>
              +
            </div>
            <div title='缩小' className='shrink-zoom map-button' onClick={() => this.zoomChange('shrink')}>
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
Object.assign(NavigateComponent.WrappedComponent.prototype, executeMixin)
export default NavigateComponent
