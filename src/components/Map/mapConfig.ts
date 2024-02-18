import { loadModules } from 'esri-loader'
// 配置api地址和css样式地址
const options = {
  // url: `${baseUrl}` + "/init.js",
  // css: `${baseUrl}` + "/main.css",
  version: '4.24',
  css: true,
}
const [Map, MapView, TileLayer, Fullscreen, Zoom] = await loadModules(
  ['esri/Map', 'esri/views/MapView', 'esri/layers/TileLayer', 'esri/widgets/Fullscreen', 'esri/widgets/Zoom'],
  options
)
export default {
  Map, MapView, TileLayer, Fullscreen, Zoom
}
