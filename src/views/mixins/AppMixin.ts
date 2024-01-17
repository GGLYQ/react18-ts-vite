import { useLocation } from 'react-router-dom'
import { getQueryParams } from '@/utils/withRouter';
import { existAttribute } from '@/utils/base';
import { setIsFullScreen, setIsHideHeader, setIsHideAside } from '@/store/reducers/GobalReducer'
import { useDispatch } from 'react-redux'

function AppMixin() {
  let dispatch = useDispatch()
  let location = useLocation()

  function handleUrlParams() {
    let params = getQueryParams(location.search || '')
    if (existAttribute(params, 'isFullScreen') && ['', 'true'].includes(params.isFullScreen)) {
      // 设置全屏
      dispatch(setIsFullScreen(true))
    } else if (existAttribute(params, 'isHideHeader') && ['', 'true'].includes(params.isHideHeader)) {
      // 设置隐藏头部
      dispatch(setIsHideHeader(true))
    } else if (existAttribute(params, 'isHideAside') && ['', 'true'].includes(params.isHideAside)) {
      // 设置隐藏侧边栏
      dispatch(setIsHideAside(true))
    }
  }
  return {
    handleUrlParams
  }
}

export default AppMixin