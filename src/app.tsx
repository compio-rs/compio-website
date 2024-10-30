import '@fontsource-variable/dm-sans/opsz.css'
import 'iconify-icon'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ErrorPage from './error-page'
import Layout from './layout'
import Index from './pages'
import GetStarted from './pages/doc/get-started'

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      { path: '/doc/get-started', element: <GetStarted /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(
  document.getElementsByTagName('body')[0] as HTMLElement,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
