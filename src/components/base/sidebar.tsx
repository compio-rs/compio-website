import cx from 'classix'
import { type Variant, motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export type SidebarProps = {
  width?: number
  from?: 'left' | 'right'
  children?: React.ReactNode
  control: [boolean, (open: boolean) => void]

  /**
   * @description Should the sidebar be put in-place or as a modal
   * @default false
   */
  expand?: boolean
}

export default function Sidebar({
  children,
  from = 'left',
  width = 300,
  expand = false,
  control,
}: SidebarProps) {
  const [isOpen, setOpen] = control
  const animate = expand ? 'expand' : isOpen ? 'open' : 'closed'
  const location = useLocation()

  // biome-ignore lint/correctness/useExhaustiveDependencies: Need to reset the sidebar when location changes
  useEffect(() => setOpen(false), [location, setOpen])

  const shared: Variant = {
    width,
    [from]: -width,
    backgroundColor: 'white',
    position: 'fixed',
    top: 0,
    bottom: 0,
    overflowX: 'hidden',
    paddingTop: '3rem',
    paddingLeft: '1rem',
  }

  const sidebar = (
    <motion.aside
      animate={animate}
      className={cx('z-50', expand && 'relative !w-auto')}
      variants={{
        expand: {
          x: 0,
          position: 'relative',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        closed: {
          x: 0,
          ...shared,
        },
        open: {
          x: from === 'left' ? width : -width,
          ...shared,
        },
      }}
      transition={{
        type: 'spring',
        damping: 60,
        stiffness: 400,
      }}
    >
      {children}
    </motion.aside>
  )

  const backdrop = (
    <motion.div
      className='fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/80 z-20'
      onClick={e => {
        setOpen(false)
        e.stopPropagation()
        e.preventDefault()
      }}
      onTap={e => {
        setOpen(false)
        e.stopPropagation()
        e.preventDefault()
      }}
      animate={animate}
      style={{
        opacity: 0,
      }}
      variants={{
        open: {
          opacity: 1,
          pointerEvents: 'auto',
        },
        closed: {
          opacity: 0,
          pointerEvents: 'none',
        },
        expand: {
          opacity: 0,
          pointerEvents: 'none',
        },
      }}
    />
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  return (
    <>
      {backdrop}
      {sidebar}
    </>
  )
}
