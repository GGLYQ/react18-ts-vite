import React, { useEffect, useState, useCallback } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
import { setBottomPanelHeight } from '@/store/reducers/LayoutReducer'

let BottomPanel = (props: PropType) => {
  const dispatch = useDispatch()
  let [bottomHeight] = useState<number>(0)
  const setLayoutFn = useCallback(() => {
    dispatch(setBottomPanelHeight(bottomHeight))
  }, [dispatch, bottomHeight])
  useEffect(() => {
    setLayoutFn()
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  let Element = props.slot
  return <div className='bottom-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default BottomPanel
