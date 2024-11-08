import logo from '@/../assets/colored-with-text.svg'
import { useBgClass } from '@/util/background'
import { Icon } from '@iconify/react'
import cx from 'classix'
import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  const bg = useBgClass()

  return (
    <nav
      className={cx(
        'py-4 px-8 sticky top-0 transition-colors z-10 backdrop-blur-xl bg-neutral-100/20',
        bg,
      )}
    >
      <div className='flex items-center justify-between w-full max-w-screen-2xl mx-auto'>
        <Link to='/'>
          <img src={logo} alt='Compio' className='w-20 sm:w-28' />
        </Link>
        <div
          className={cx(
            'flex items-center gap-8 font-semibold text-neutral-600',
            '*:transition-colors hover:*:text-neutral-900',
          )}
        >
          <NavLink
            to='/docs'
            className={({ isActive }) => cx(isActive && '!text-blue-900')}
          >
            Docs
          </NavLink>
          <Link to='https://github.com/compio-rs/compio'>
            <Icon icon='mdi:github' className='text-xl' />
          </Link>
        </div>
      </div>
    </nav>
  )
}
