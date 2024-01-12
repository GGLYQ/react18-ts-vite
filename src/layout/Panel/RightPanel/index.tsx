import React, { useEffect, useState, useCallback } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
import { setRightPanelWidth } from '@/store/reducers/LayoutReducer'

let RightPanel = (props: PropType) => {
  const dispatch = useDispatch()
  // let { rightPanelWidth} = useSelector((state: MapState) => state.layoutReducer)
  let [rightWidth] = useState<number>(0)

  const setLayoutFn = useCallback(() => {
    dispatch(setRightPanelWidth(rightWidth))
  }, [dispatch, rightWidth])
  useEffect(() => {
    setLayoutFn()
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  let Element = props.slot
  return <div className='right-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default RightPanel
