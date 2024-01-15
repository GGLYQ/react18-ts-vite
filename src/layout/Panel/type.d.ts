import React from 'react'
interface LayoutReducerIState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number }
}
interface PropType {
  slot?: () => React.ReactElement,
  activePanelName?: string,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  setTopHeight?: (value: number) => void
  setLeftWidth?: (value: number) => void
}
export { LayoutReducerIState, PropType }