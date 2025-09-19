import { Outlet, ScrollRestoration } from 'react-router-dom'
import Footer from './components/base/footer'
import Nav from './components/base/nav'
import { useBgClass } from './util/background'
import cx from 'classix'

function Layout({ children }: { children?: React.ReactNode }) {
  const bg = useBgClass()

  return (
    <div
      className={cx(
        'min-h-[100lvh] transition-colors flex flex-col',
        'text-neutral-800 font-sans antialiased',
        bg,
      )}
    >
      <ScrollRestoration />
      <Nav />
      <main className='flex-grow'>{children ? children : <Outlet />}</main>
      <Footer />
    </div>
  )
}

export default Layout
