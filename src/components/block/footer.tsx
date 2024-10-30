import { Icon } from '@iconify/react'
import cx from 'classix'
import { Link } from 'react-router-dom'

function FindLink({
  icon,
  to,
  text,
}: {
  icon: string
  to: string
  text: string
}) {
  return (
    <Link
      className='flex items-center gap-2 text-normal relative hover:text-white'
      to={to}
    >
      <Icon className='text-xl relative bottom-[1px]' icon={icon} />
      {text}
    </Link>
  )
}

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='w-full bg-neutral-800 text-zinc-400 text-sm p-8 mt-20'>
      <div
        className={cx(
          'container mx-auto flex flex-col gap-8',
          '[&_h1]:text-zinc-100 [&_h1]:font-normal [&_h1]:text-base [&_h1]:mb-2',
          'sm:flex-row sm:*:w-32 sm:[&_h1]:text-zinc-100',
        )}
      >
        <section>
          <h1 className=''>Find Us</h1>
          <ul className={cx('flex flex-col gap-2 pt-1')}>
            <FindLink
              icon='mdi:github'
              to='https://github.com/compio-rs/compio'
              text='GitHub'
            />
            <FindLink
              icon='simple-icons:rust'
              to='https://crates.io/crates/compio'
              text='Crates.io'
            />
            <FindLink
              icon='ic:baseline-telegram'
              to='https://t.me/compio_rs'
              text='Telegram'
            />
          </ul>
        </section>
        <section>
          <h1>API Documents</h1>
          <ul className='hover:*:text-zinc-50'>
            <li>
              <Link to='https://docs.rs/compio'>compio</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-buf'>compio-buf</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-dispatcher'>
                compio-dispatcher
              </Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-driver'>compio-driver</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-fs'>compio-fs</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-io'>compio-io</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-log'>compio-log</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-macros'>compio-macros</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-net'>compio-net</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-process'>compio-process</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-quic'>compio-quic</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-runtime'>compio-runtime</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-signal'>compio-signal</Link>
            </li>
            <li>
              <Link to='https://docs.rs/compio-tls'>compio-tls</Link>
            </li>
          </ul>
        </section>
      </div>
      <p className='mt-12'>&copy; {currentYear} Compio.</p>
    </footer>
  )
}
