import { IObj } from "@/utils/type";
// import mapConfig from "../../mapConfig"

// 叠加地图
function addLayer(layerInfo: IObj) {
  let { mapView1 } = this.props
  console.log(layerInfo, mapView1);
}

export default {
  addLayer
}