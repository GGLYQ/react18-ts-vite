import * as React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from "@/views/App.tsx"
import Home from "@/views/Home"
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />
      },
    ],
  },
])

export default router