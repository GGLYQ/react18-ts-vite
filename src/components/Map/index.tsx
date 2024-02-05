import React from 'react'
import { loadModules } from 'esri-loader'
import './index.scss'

interface PropType {}
interface StateType {}
class Map extends React.PureComponent<PropType, StateType> {
  public esriMap: any
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  async componentDidMount(): Promise<void> {
    const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView'], { version: '4.24', css: true })
    this.esriMap = new Map({
      basemap: 'streets-vector',
    })
    new MapView({
      map: this.esriMap,
      container: 'FirstMap',
      center: [-118.244, 34.052],
      zoom: 12,
    })
  }
  render(): React.ReactNode {
    return <div id='FirstMap' className='App-FirstMap'></div>
  }
}
export default Map
