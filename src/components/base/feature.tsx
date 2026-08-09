import { fadeInItem } from '@/util/motion/fade'
import { Icon } from '@iconify/react'
import cx from 'classix'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import FadeIn from '../motion/fade-in'

interface FeatureBlockProps {
  title: string
  icon: string
  children: ReactNode
}

export default function FeatureBlock({
  title,
  icon,
  children,
}: FeatureBlockProps) {
  return (
    <FadeIn.Container
      className={cx(
        'col-span-12',
        'md:col-span-6 gap-4',
        '2xl:col-span-3',
        'bg-blue-50/40 p-8 rounded-lg border border-blue-100/70 flex',
        'transition-colors hover:bg-blue-50/70',
      )}
    >
      <div className='flex-1'>
        <motion.h2
          variants={fadeInItem}
          className='text-3xl font-extrabold flex-col'
        >
          {title}
        </motion.h2>
        <FadeIn.Item className='text-zinc-500 mt-4'>
          <p>{children}</p>
        </FadeIn.Item>
      </div>

      <motion.div variants={fadeInItem} aria-hidden='true'>
        <Icon icon={icon} height={60} className='pl-4 text-blue-950' />
      </motion.div>
    </FadeIn.Container>
  )
}
