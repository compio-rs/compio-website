import '@fontsource-variable/dm-sans/opsz.css'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'

import ContentLayout from './components/base/content-layout'
import Markdown from './components/base/markdown'
import ErrorPage from './error'
import Layout from './layout'

const docs = import.meta.glob<Markdown>('../content/docs/**/*.md', {
  import: 'default',
  eager: true,
})

const docsRoutes: RouteObject[] = Object.entries(docs).map(([p, md]) => {
  const path = p.replace('../content', '').replace('.md', '')

  return {
    path,
    element: (
      <ContentLayout path={path}>
        <Markdown content={md} />
      </ContentLayout>
    ),
  }
})

const pages = import.meta.glob<() => React.ReactNode>('./pages/**/*.tsx', {
  import: 'default',
  eager: true,
})

const pagesRoutes: RouteObject[] = Object.entries(pages).map(
  ([p, Component]) => {
    const path = p
      .replace('./pages/', '')
      .replace('.tsx', '')
      .replace('index', '')

    return {
      path,
      Component,
    }
  },
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      ...docsRoutes,
      ...pagesRoutes,
      {
        path: '/docs',
        loader: () => redirect('/docs/preface'),
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.querySelector('#root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
