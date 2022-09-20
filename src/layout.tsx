import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <nav>Nav</nav>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  )
}

export default Layout
