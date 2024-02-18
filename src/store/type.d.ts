// import React from 'react'
import { IObj } from "@/utils/type";
interface reducerIState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number, asidePanelWidth: number, asideWidth: number }
  gobalReducer: { fontSize: number; isHideHeader: boolean, isHideAside: boolean, activedToolbar: IObj, toolbarFlag: IObj, activedAside: IObj, leftPanelContainer: string[], rightPanelContainer: string[] }
  gisWholeReducer: { firstGisScreen: IObj, secondGisScreen: IObj }
}
export { reducerIState }