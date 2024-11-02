import logo from '@/../assets/colored-with-text.svg'
import { useBgClass } from '@/util/background'
import cx from 'classix'
import { Link, NavLink } from 'react-router-dom'

function navClassName({ isActive }: { isActive: boolean }) {
  return cx('text-gray-500 hover:text-gray-900', isActive && '!text-gray-900')
}

export default function Nav() {
  const bg = useBgClass()

  return (
    <nav className={cx('py-4 px-8', bg)}>
      <div className='flex items-center justify-between w-full max-w-screen-2xl mx-auto'>
        <Link to='/'>
          <img src={logo} alt='Compio' className='w-20 sm:w-28' />
        </Link>
        <div>
          <NavLink to='/docs' className={navClassName}>
            Docs
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
