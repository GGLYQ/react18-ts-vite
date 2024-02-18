import { loadModules } from 'esri-loader'
// 配置api地址和css样式地址
const options = {
  // url: `${baseUrl}` + "/init.js",
  // css: `${baseUrl}` + "/main.css",
  version: '4.24',
  css: true,
}
const [Map, MapView, TileLayer, WebTileLayer, GraphicsLayer, FeatureLayer, TileInfo, Extent, Fullscreen, Zoom, ScaleBar, Home] = await loadModules(
  [
    'esri/Map',
    'esri/views/MapView',
    'esri/layers/TileLayer',
    "esri/layers/WebTileLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/support/TileInfo",
    "esri/geometry/Extent",
    'esri/widgets/Fullscreen',
    'esri/widgets/Zoom',
    "esri/widgets/ScaleBar",
    "esri/widgets/Home",
    "dojo/domReady!"
  ],
  options
)
export default {
  Map, MapView, TileLayer, WebTileLayer, GraphicsLayer, FeatureLayer, TileInfo, Extent, Fullscreen, Zoom, ScaleBar, Home
}
