import React, { useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
import { getPxToRem } from '@/utils/layout'
import { setBottomPanelHeight } from '@/store/reducers/LayoutReducer'
import './index.scss'
import { useSelector } from 'react-redux'
import { reducerIState } from '@/store/type'

let BottomPanel = (props: PropType, ref: any) => {
  const dispatch = useDispatch()
  let { asidePanelWidth } = useSelector((state: reducerIState) => state.layoutReducer)

  const currentRef = useRef<HTMLInputElement | null>(null)
  // let [bottomHeight, setBottomHeight] = useState<number>(0)

  // 设置底部布局的高度
  const setLayoutFn = useCallback(() => {
    let clientHeight = currentRef.current?.clientHeight // 获取DOM元素
    let clientHeightRem = clientHeight ? getPxToRem(clientHeight) : 0
    // setBottomHeight(clientHeightRem)
    dispatch(setBottomPanelHeight(clientHeightRem))
    // console.log(bottomHeight);
  }, [dispatch])

  useEffect(() => {
    setLayoutFn()
    // console.log("BottomPanel",currentRef) // 获取DOM元素
    return () => {}
  }, [setLayoutFn])
  //监听props.updateLayout值的变化
  //打开弹窗
  useImperativeHandle(ref, () => ({
    updateLayout: () => {
    console.log('重新计算偏移量 bottomanel')
      setLayoutFn()
    },
  }))

  let Element = props.slot
  return (
    <div id='bottomPanelWrapper' className='bottom-panel-wrapper' ref={currentRef} style={{ left: asidePanelWidth + 'rem' }}>
      {Element ? <Element /> : null}
    </div>
  )
}
let ForwardRefComponents = forwardRef(BottomPanel)

export default ForwardRefComponents
