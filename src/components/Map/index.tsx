import React from 'react'
import mapConfig from './mapConfig'
import './index.scss'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { reducerIState } from '@/store/type'
import { setFirstGisScreen, setSecondGisScreen } from '@/store/reducers/GisWholeReducer'
import { IObj } from '@/utils/type'

interface PropType {
  firstGisScreen: IObj
  _setFirstGisScreen?: (value: IObj) => void
}
interface StateType {}
class Map extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {
    // 加载地图
    this.loadMap()
  }
  async loadMap() {
    const {Map, MapView, TileLayer, Fullscreen, Zoom}=mapConfig
    // 第一屏地图
    let transportationLayer = new TileLayer({
      url: (window as any).Map2DConfig.digitalMapUrl,
      id: 'streets',
    })
    let FirstMap = new Map({
      // 底图的图层
      layers: [transportationLayer],
    })
    let FirstMapView = new MapView({
      map: FirstMap,
      container: 'FirstMap',
      // center: [-118.244, 34.052],
      // zoom: 12,
    })
    FirstMapView.ui.empty('top-left') // 清除左上轿的组件
    FirstMapView.ui.remove('attribution') //清除底部powered by ESRI
    FirstMapView.ui.add(new Zoom({ view: FirstMapView }), 'bottom-right') //在右下角添加缩放组件
    FirstMapView.ui.add(
      new Fullscreen({
        view: FirstMapView,
      }),
      'bottom-right'
    ) //在右下角添加全屏组件
    let { _setFirstGisScreen } = this.props
    _setFirstGisScreen &&
      _setFirstGisScreen({
        map: FirstMap,
        mapView: FirstMapView,
      })
  }
  // 渲染Map地图页面
  render(): React.ReactNode {
    return <div id='FirstMap' className='App-FirstMap'></div>
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {
    firstGisScreen: state.gisWholeReducer.firstGisScreen,
  }
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    _setFirstGisScreen(value: IObj) {
      dispatch(setFirstGisScreen(value))
    },
    _setSecondGisScreen(value: IObj) {
      dispatch(setSecondGisScreen(value))
    },
  }
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Map)
export default NavigateComponent
