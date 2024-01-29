import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import React, { FC, lazy, Suspense } from 'react'
import { IObj } from './type'
// 高阶函数接收一个泛型参数 P，表示原始组件的 props 类型
interface WithRouterProps {
  router?: any
  forwardRef?: any
}

// Router6 之后，代码类的API都迁移到了hooks上，但不能再类组件中调用
// 封装高阶组件，使hooks可以在class类组件中调用
const withRouter = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  // 返回一个新的函数组件，这个组件可以包装原始组件
  const WithRouterCom: FC<P & WithRouterProps> = (props) => {
    // 在渲染时添加日志信息
    // console.log(`Rendering component: ${WrappedComponent.displayName || WrappedComponent.name}`);
    // 在函数组件中通过hook拿到navigate对象
    const navigate = useNavigate()
    // 获取navigate中state传的参数
    const location = useLocation()
    const params = useParams()
    const searchParams = useSearchParams()
    // 将获取到的navigate放到一个对象中
    const router = { navigate, location, params, searchParams }
    return <WrappedComponent {...(props as P)} router={router} />
  }
  // 设置新组件的 displayName，便于调试
  WithRouterCom.displayName = `WithRouterComHook(${WrappedComponent.displayName || WrappedComponent.name})`
  return WithRouterCom
}
// 封装高阶组件，使hooks可以在class类组件中调用
const withRouterAndRef = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithRouter = withRouter(({ forwardRef, ...otherProps }: IObj) => <WrappedComponent ref={forwardRef} {...(otherProps as P)} />)
  const WithRouterAndRef = React.forwardRef((props, ref) => <WithRouter {...props} forwardRef={ref} />)
  const name = WithRouterAndRef.displayName || WithRouterAndRef.name
  WithRouterAndRef.displayName = `withRouterAndRef(${name})`
  return WithRouterAndRef
}

const getQueryParams = (url: string) => {
  const paramsString = new URLSearchParams(url).toString() // 将查询字符串转换为字符串
  const paramsArray = paramsString.split('&') // 将字符串按 & 分割成数组

  // 遍历数组，将每个参数存储到对象中
  const paramsObj = {} as IObj
  for (let i = 0; i < paramsArray.length; i++) {
    let [key, value] = paramsArray[i].split('=')
    let k = decodeURIComponent(key)
    k && (paramsObj[k] = decodeURIComponent(value))
  }

  return paramsObj
}

//路由懒加载
function load(componentPath: string): React.ReactNode {
  let Lazy = lazy(() => import(/* @vite-ignore */ componentPath))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lazy />
    </Suspense>
  )
}
export { withRouter, withRouterAndRef, getQueryParams, load }
