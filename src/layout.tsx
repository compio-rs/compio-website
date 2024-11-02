import cx from 'classix'
import { Outlet } from 'react-router-dom'
import Footer from './components/base/footer'
import Nav from './components/base/nav'
import { useBgClass } from './util/background'

function Layout({ children }: { children?: React.ReactNode }) {
  const bg = useBgClass()

  return (
    <>
      <Nav />
      <main className={cx('flex-grow', bg)}>
        {children ? children : <Outlet />}
      </main>
      <Footer />
    </>
  )
}

export default Layout
