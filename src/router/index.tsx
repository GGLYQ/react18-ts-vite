import React, { Suspense,lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '@/views/App.tsx'
import Home from '@/views/Home'
//路由懒加载
function load(componentPath: string): React.ReactNode {
  const Lazy= lazy(() => import(`${componentPath}`))
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Lazy />
    </Suspense>
  )
}
const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <App />,
    children: [
      {
        id: 'home',
        path: 'home',
        element: <Home />,
        children: [
          {
            id: 'page1',
            path: 'page1',
            element: load('../views/Home/page1'),
          },
        ],
      },
    ],
  },
])

export default router
