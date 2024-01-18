import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/views/App.tsx'
import Home from '@/views/Home'
import { load } from '@/utils/withRouter'

let router = createBrowserRouter([
  {
    id: 'root',
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
          {
            id: 'page2',
            path: 'page2',
            element: load('../views/Home/page2'),
          },
          {
            id: 'page3',
            path: 'page3',
            element: load('../views/Home/page3'),
          },
          {
            id: 'page4',
            path: 'page4',
            element: load('../views/Home/page4'),
          },
          {
            id: 'page5',
            path: 'page5',
            element: load('../views/Home/page5'),
          },
        ],
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to='/home' />,
  },
])

export default router
