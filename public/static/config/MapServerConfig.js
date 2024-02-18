/* eslint-disable no-undef */
var mapServerInfo = {}
var MapServerConfig = {
  extent: {},
  fullMap: {},
  scale2levelsArray: [],
  scale2levels: [],
  levels2scale: [],
}
initMapServerConfig()
async function initMapServerConfig() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }
  await fetch(window.Map2DConfig.digitalMapUrl + '?f=json', requestOptions)
    .then((response) => response.text())
    .then((result) => setMapServerInfo(result))
    .catch((error) => console.log('error', error))
}

function setMapServerInfo(result) {
  mapServerInfo = JSON.parse(result)
  MapServerConfig.extent = mapServerInfo.fullExtent
  MapServerConfig.fullMap = {
    x: (mapServerInfo.fullExtent.xmax + mapServerInfo.fullExtent.xmin) / 2,
    y: (mapServerInfo.fullExtent.ymin + mapServerInfo.fullExtent.ymax) / 2,
    zoom: 1,
  }
  MapServerConfig.scale2levelsArray = setScaleLever(mapServerInfo.tileInfo.lods)
  MapServerConfig.scale2levels = getScale2levels(MapServerConfig.scale2levelsArray)
  MapServerConfig.levels2scale = getLevels2Scales(MapServerConfig.scale2levelsArray)
  window.Map2DConfig.tileInfo = mapServerInfo.tileInfo
  window.Map2DConfig.spatialReference = mapServerInfo.tileInfo.spatialReference
  window.MapServerConfig = MapServerConfig
}

function setScaleLever(lods) {
  let scale2levelsArray = []
  for (let lod of lods) {
    let lodPost = { id: lod.level, scaleLine: '1:' + lod.scale }
    scale2levelsArray.push(lodPost)
  }
  return scale2levelsArray
}

function getScale2levels(scaleArray) {
  let scale2levels = []
  for (let lod of scaleArray) {
    let lodPost = {}
    lodPost['' + lod.id + ''] = lod.scaleLine
    scale2levels.push(lodPost)
  }
  return scale2levels
}

function getLevels2Scales(scaleArray) {
  let scale2levels = []
  for (let lod of scaleArray) {
    let lodPost = {}
    lodPost['' + lod.scaleLine + ''] = lod.id
    scale2levels.push(lodPost)
  }
  return scale2levels
}
