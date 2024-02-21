import { IObj } from "@/utils/type";
import mapConfig from "../../mapConfig"

//地图缩小//地图放大
function mapZoomEnlargeAndShrink(type: string) {
  let { mapView1 } = this.props
  // 获取MapServerConfig文件中的最大最小缩放级别
  let zoomArr = (window as any).MapServerConfig.scale2levelsArray.map((item: IObj) => {
    return item.id
  })
  let minZoom = Math.min(...zoomArr)
  let maxZoom = Math.max(...zoomArr)

  let curZoom = mapView1.zoom
  let boolean = type === "enlarge"
  if (curZoom >= minZoom && curZoom <= maxZoom) {
    let nextZoom = boolean ? 1 : -1
    mapView1.zoom += nextZoom
  }
}
//视窗范围偏移
function deviationExtent() {
  let { mapView1 } = this.props
  let { Extent } = mapConfig
  mapView1.extent = new Extent({
    xmin: mapView1.extent.xmin + 0.00000000001,
    ymin: mapView1.extent.ymin,
    xmax: mapView1.extent.xmax - 0.00000000001,
    ymax: mapView1.extent.ymax,
    spatialReference: (window as any).Map2DConfig.spatialReference
  })
}
export default {
  mapZoomEnlargeAndShrink,
  deviationExtent
}