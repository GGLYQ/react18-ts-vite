// import React from 'react'
interface reducerIState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number }
  gobalReducer: { fontSize: number; isHideHeader: boolean, isHideAside: boolean, activedToolbarId: string, activedAsideId: string }
}
export { reducerIState }