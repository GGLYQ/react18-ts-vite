import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from "../views/App.tsx"
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: 'team',
      //   element: <Team />,
      //   loader: teamLoader,
      // },
    ],
  },
])

export default router