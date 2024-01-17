import React from 'react'
interface reducerIState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number }
}
interface PropType {
  slot?: () => React.ReactElement,
  activePanelName?: string,
  visibleTabs?: boolean,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  setTopHeight?: (value: number) => void
  setLeftWidth?: (value: number) => void
  onActivedPanel?: (name: string) => void
  onDeletePanel?: (name: string) => void
}
export { reducerIState, PropType }