import { type SVGMotionProps, motion } from 'framer-motion'
import type { RefAttributes } from 'react'
import type { JSX } from 'react/jsx-runtime'

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    RefAttributes<SVGPathElement>,
) => (
  <motion.path
    fill='transparent'
    strokeWidth='3'
    stroke='currentColor'
    strokeLinecap='round'
    {...props}
  />
)

export interface MenuToggleProps {
  control: [boolean, (arg: boolean) => void]
  width?: string
}

export default function MenuToggle({
  control,
  width = '75vw',
}: MenuToggleProps) {
  const [open, setOpen] = control

  return (
    <motion.button
      animate={open ? 'open' : 'closed'}
      onClick={() => setOpen(!open)}
      type='button'
      transition={{
        type: 'spring',
        damping: 60,
        stiffness: 400,
      }}
      variants={{
        open: {
          x: width,
          color: 'white',
          zIndex: 50,
        },
        closed: {
          x: 0,
          zIndex: 50,
        },
      }}
    >
      <svg width='23' height='23' viewBox='0 0 23 23'>
        <title>Toggle</title>
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d='M 2 9.423 L 20 9.423'
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </motion.button>
  )
}
