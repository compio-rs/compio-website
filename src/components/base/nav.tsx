import logo from '@/../assets/colored-with-text.svg'
import { Icon } from '@iconify/react'
import cx from 'classix'
import { Link, NavLink } from 'react-router-dom'

export default function Nav() {
  return (
    <nav
      className={cx(
        'py-4 px-8 sticky top-0 transition-none z-10 backdrop-blur-xl',
      )}
    >
      <div className='flex items-center justify-between w-full max-w-screen-2xl mx-auto'>
        <Link to='/'>
          <img src={logo} alt='Compio' className='w-20 sm:w-28' />
        </Link>
        <div
          className={cx(
            'flex items-center gap-4 font-semibold text-neutral-600',
            '*:transition-colors hover:*:text-neutral-900',
          )}
        >
          <NavLink
            to='/docs'
            className={({ isActive }) =>
              cx(isActive && '!text-blue-900', 'mr-4')
            }
          >
            Docs
          </NavLink>
          <Link to='https://github.com/compio-rs/compio'>
            <Icon icon='mdi:github' className='text-xl' />
          </Link>
          <Link to='https://crates.io/crates/compio'>
            <Icon icon='simple-icons:rust' className='text-xl' />
          </Link>
          <Link to='https://t.me/compio_rs'>
            <Icon icon='mdi:telegram' className='text-xl' />
          </Link>
        </div>
      </div>
    </nav>
  )
}
