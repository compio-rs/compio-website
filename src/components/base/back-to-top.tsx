import { Icon } from '@iconify/react/dist/iconify.js'
import cx from 'classix'
import { useState } from 'react'
import { useEventListener } from 'usehooks-ts'

export default function BackToTop() {
  const [top, setTop] = useState(0)
  useEventListener('scroll', () => {
    setTop(window.scrollY)
  })

  return (
    <button
      type='button'
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cx(
        'fixed rounded-full bottom-8 right-8 p-2 text-white z-50',
        'bg-blue-800 hover:bg-blue-700 shadow-lg',
        'transition-all duration-200',
        top > 20 ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <Icon icon='line-md:arrow-up' width={20} height={20} />
    </button>
  )
}
