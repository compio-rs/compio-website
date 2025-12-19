import { Icon } from '@iconify/react'
import cx from 'classix'
import { Link } from 'react-router-dom'

const crates = [
  'compio',
  'compio-buf',
  'compio-dispatcher',
  'compio-driver',
  'compio-fs',
  'compio-io',
  'compio-log',
  'compio-macros',
  'compio-net',
  'compio-process',
  'compio-quic',
  'compio-runtime',
  'compio-signal',
  'compio-tls',
  'see',
  'winio',
  'cyper',
  'cyper-core',
  'cyper-axum',
]

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
    <footer
      className={cx(
        'w-full bg-neutral-800 text-zinc-400 text-sm p-8',
        '*:container *:mx-auto *:sm:px-4 *:md:px-16',
      )}
    >
      <div
        className={cx(
          'flex flex-col gap-4',
          '[&_h1]:text-zinc-100 [&_h1]:font-normal [&_h1]:text-base [&_h1]:mb-2',
          'sm:flex-row sm:gap-16 sm:[&_h1]:text-zinc-100',
        )}
      >
        <section>
          <h1>Find Us</h1>
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
          <h1>Projects</h1>
          <ul className='hover:*:text-zinc-50'>
            <li>
              <Link to='https://github.com/compio-rs/compio'>Compio</Link>
            </li>
            <li>
              <Link to='https://github.com/compio-rs/cyper'>Cyper</Link>
            </li>
            <li>
              <Link to='https://github.com/compio-rs/winio'>Winio</Link>
            </li>
            <li>
              <Link to='https://github.com/compio-rs/see'>See</Link>
            </li>
          </ul>
        </section>
        <section>
          <h1>API Documents</h1>
          <ul className='hover:*:text-zinc-50 grid gap-x-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {crates.map(crate => (
              <li key={crate}>
                <Link to={`https://docs.rs/${crate}`}>{crate}</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className='mt-12'>&copy; {currentYear} Compio.</p>
    </footer>
  )
}
