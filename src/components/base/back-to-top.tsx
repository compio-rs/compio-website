import useScrollTop from '@/util/scroll-top'
import { Icon } from '@iconify/react/dist/iconify.js'
import cx from 'classix'

export default function BackToTop() {
  const top = useScrollTop()

  return (
    <button
      type='button'
      aria-label='Back to top'
      aria-hidden={top <= 20}
      tabIndex={top > 20 ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cx(
        'fixed rounded-full bottom-8 right-8 p-2 text-white z-50',
        'bg-blue-800 hover:bg-blue-700 shadow-lg',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        top > 20 ? 'opacity-100' : 'opacity-0 pointer-events-none',
      )}
    >
      <Icon icon='line-md:arrow-up' width={20} height={20} />
    </button>
  )
}
