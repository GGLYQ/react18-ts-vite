import React, { Component } from 'react'
import { loadModules } from 'esri-loader'
import './index.scss'

export default class Map extends Component {
  public esriMap: any
  componentDidMount() {
    // loadModules(['esri/Map', 'esri/views/MapView']).then(([Map, MapView]) => {
    //   this.esriMap = new Map({
    //     basemap: 'streets-vector',
    //   })
    //   new MapView({
    //     map: this.esriMap,
    //     container: 'cloudMap',
    //     center: [-118.244, 34.052],
    //     zoom: 12,
    //   })
    // })
  }
  render() {
    return (
      <div className='App-map'>
        <div id='cloudMap'></div>
      </div>
    )
  }
}
