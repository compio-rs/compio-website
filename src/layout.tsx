import { Outlet } from 'react-router-dom'
import Footer from './components/block/footer'
import Nav from './components/block/nav'

function Layout() {
  return (
    <>
      <Nav />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
