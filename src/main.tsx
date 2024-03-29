import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import { Provider } from 'react-redux'
import { store } from './store'
import 'amfe-flexible' 
import './utils/preProcess.ts'
import 'virtual:svg-icons-register'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
