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
    const { Map, MapView, TileLayer, ScaleBar, TileInfo, Extent } = mapConfig
    let { spatialReference, tileInfo } = (window as any).Map2DConfig
    let { extent } = (window as any).MapServerConfig
    // 配置瓦片
    const MapTileInfo = new TileInfo({
      dpi: tileInfo.dpi,
      format: 'image/png',
      spatialReference: spatialReference,
      size: [256, 256],
      origin: tileInfo.origin,
      lods: tileInfo.lods,
    })
    // 定义初始位置
    let MapExtent = new Extent({
      xmin: extent.xmin,
      ymin: extent.ymin,
      xmax: extent.xmax,
      ymax: extent.ymax,
      spatialReference: spatialReference,
    })
    // 第一屏地图
    let transportationLayer = new TileLayer({
      url: (window as any).Map2DConfig.digitalMapUrl, //电子地图
    })
    let FirstMap = new Map({
      layers: [transportationLayer], // 底图的图层
    })
    let FirstMapView = new MapView({
      map: FirstMap,
      container: 'FirstMap',
      spatialReference: spatialReference,
      constraints: {
        rotationEnabled: false,
        lods: MapTileInfo.lods,
      },
      popup: {
        actions: [],
        dockOptions: {
          buttonEnabled: false,
        },
      },
    })
    FirstMapView.extent = MapExtent

    // 配置map底图小组件
    FirstMapView.ui.empty('top-left') // 清除左上轿的组件
    FirstMapView.ui.remove('attribution') //清除底部powered by ESRI
    FirstMapView.ui.add(
      new ScaleBar({
        view: FirstMapView,
        unit: 'metric',
      }),
      {
        position: 'bottom-left',
      }
    ) //在左下角比例尺添加

    // reudx存储map容器
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
