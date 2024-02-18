import React from 'react'
import mapConfig from './mapConfig'
import './index.scss'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import type { reducerIState } from '@/store/type'
import { setFirstGisScreen, setSecondGisScreen, setThirdGisScreen, setFourthGisScreen, setFifthGisScreen } from '@/store/reducers/GisWholeReducer'
import { IObj } from '@/utils/type'

interface PropType {
  screenMode: number
  firstGisScreen: IObj
  _setFirstGisScreen?: (value: IObj) => void
  _setSecondGisScreen?: (value: IObj) => void
  _setThirdGisScreen?: (value: IObj) => void
  _setFourthGisScreen?: (value: IObj) => void
  _setFifthGisScreen?: (value: IObj) => void
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
    // 定义第二屏视窗
    let SecondMapView = new MapView({
      map: '',
      container: 'SecondMap',
    })
    // 定义第三屏视窗
    let ThirdMapView = new MapView({
      map: '',
      container: 'ThirdMap',
    })
    // 定义第四屏视窗
    let FourthMapView = new MapView({
      map: '',
      container: 'FourthMap',
    })
    // 定义第五屏视窗
    let FifthMapView = new MapView({
      map: '',
      container: 'FifthMap',
    })
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
    let { _setFirstGisScreen, _setSecondGisScreen, _setThirdGisScreen, _setFourthGisScreen, _setFifthGisScreen } = this.props
    _setFirstGisScreen &&
      _setFirstGisScreen({
        mapView: FirstMapView,
      })
    _setSecondGisScreen &&
      _setSecondGisScreen({
        mapView: SecondMapView,
      })
    _setThirdGisScreen &&
      _setThirdGisScreen({
        mapView: ThirdMapView,
      })
    _setFourthGisScreen &&
      _setFourthGisScreen({
        mapView: FourthMapView,
      })
    _setFifthGisScreen &&
      _setFifthGisScreen({
        mapView: FifthMapView,
      })
  }
  // 渲染Map地图页面
  render(): React.ReactNode {
    let screenMode = this.props.screenMode
    return (
      <div className='App-Map'>
        {[1, 2, 3, 4, 5].includes(screenMode) && <div id='FirstMap' className={`App-FirstMap App-FirstMap-${screenMode}`}></div>}
        {[2, 3, 4, 5].includes(screenMode) && <div id='SecondMap' className={`App-SecondMap App-SecondMap-${screenMode} `}></div>}
        {[3, 4, 5].includes(screenMode) && <div id='ThirdMap' className={`App-ThirdMap App-ThirdMap-${screenMode}`}></div>}
        {[4, 5].includes(screenMode) && <div id='FourthMap' className={`App-FourthMap App-FourthMap-${screenMode}`}></div>}
        {[5].includes(screenMode) && <div id='FifthMap' className={`App-FifthMap App-FifthMap-${screenMode}`}></div>}
      </div>
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
    firstGisScreen: state.gisWholeReducer.firstGisScreen,
    secondGisScreen: state.gisWholeReducer.secondGisScreen,
    thirdGisScreen: state.gisWholeReducer.thirdGisScreen,
    fourthGisScreen: state.gisWholeReducer.fourthGisScreen,
    fifthGisScreen: state.gisWholeReducer.fifthGisScreen,
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
    _setThirdGisScreen(value: IObj) {
      dispatch(setThirdGisScreen(value))
    },
    _setFourthGisScreen(value: IObj) {
      dispatch(setFourthGisScreen(value))
    },
    _setFifthGisScreen(value: IObj) {
      dispatch(setFifthGisScreen(value))
    },
  }
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Map)
export default NavigateComponent
