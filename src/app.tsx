import '@fontsource-variable/dm-sans/opsz.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ErrorPage from './error-page'
import Layout from './layout'
import Index from './pages'
import Doc from './pages/doc'
import GetStarted from './pages/doc/get-started'

const docs = import.meta.glob('../docs/**/*.md')
const docsRoutes = Object.entries(docs).map(([p, loader]) => {
  const path = p.replace('../docs/', '').replace('.md', '')
  return {
    path,
    element: <Doc path={path} loader={loader} />,
  }
})

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...docsRoutes,
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
