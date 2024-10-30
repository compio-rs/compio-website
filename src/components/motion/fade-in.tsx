import { fadeInItem } from '@/util/motion/fade'
import { type Variants, motion, useInView } from 'framer-motion'
import { type HTMLProps, useRef } from 'react'

export type Props = Omit<
  HTMLProps<HTMLDivElement>,
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
>

const fadeContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
}

export function Container(props: Props) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      variants={fadeContainer}
      initial='hidden'
      animate={isInView ? 'show' : 'hidden'}
      {...props}
    />
  )
}

export function Item(props: Props) {
  return <motion.div variants={fadeInItem} {...props} />
}

export default { Container, Item }
