import { IObj } from '@/utils/type'
import React from 'react'

interface PropType {
  slot?: (() => React.ReactElement) | null,
  activePanelName?: string,
  visibleTabs?: boolean,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  asidePanelWidth?: number,
  activedToolbar?: IObj,
  leftPanelContainer?: string[]
  rightPanelContainer?: string[]
  isAllDisplay?: boolean
  _setLeftPanelContainer?: (name: string[]) => void
  _setTopPanelHeight?: (value: number) => void
  _setLeftPanelWidth?: (value: number) => void
  _setActivedToolbar?: (value: IObj) => void
  _setActivedToolbarByName?: (value: string) => void
  onActivedPanel?: (name: string) => void
  onDeletePanel?: (name: string,deletedName?:string) => void
}
export { PropType }