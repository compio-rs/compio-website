import FeatureBlock from '@/components/block/feature'
import FadeIn from '@/components/motion/fade-in'
import { fadeInItem } from '@/util/motion/fade'
import { Icon } from '@iconify/react'
import cx from 'classix'
import { motion } from 'framer-motion'

import { Link } from 'react-router-dom'

export default function Index() {
  return (
    <>
      <FadeIn.Container
        className={cx(
          'flex-grow min-h-[75lvh] pt-[clamp(10rem,25lvh,30rem)]',
          'flex flex-col items-center gap-10 px-4 pb-12',
        )}
      >
        <motion.h1
          variants={fadeInItem}
          className={cx(
            'bg-blue-100 px-6 rounded-lg inline-block text-center',
            'text-blue-600 font-[900] leading-normal md:leading-snug',
          )}
          style={{ fontSize: 'clamp(1.2rem, .6rem + 4vw, 4rem)' }}
        >
          Async IO, Completed.
        </motion.h1>
        <motion.p
          variants={fadeInItem}
          className='text-lg text-center px-8 text-zinc-600'
        >
          Compio is an async runtime for Rust built with completion-based IO
        </motion.p>
        <div />
        <FadeIn.Item>
          <Link
            className='bg-blue-950 text-white px-6 py-3 rounded-full flex items-center gap-2'
            to={'/doc/get-started'}
          >
            Get Started <Icon icon='solar:arrow-right-linear' />
          </Link>
        </FadeIn.Item>
      </FadeIn.Container>
      <div
        className={cx(
          'grid grid-cols-12 gap-4 container mx-auto p-4 xl:gap-8',
          'md:p-12',
        )}
      >
        <FeatureBlock title='Fast' icon='solar:bolt-outline'>
          Leveraging completion-based IO, Compio is fast and efficient.
        </FeatureBlock>
        <FeatureBlock title='Reliable' icon='solar:shield-check-outline'>
          Built with reliability in mind, safety is our top priority.
        </FeatureBlock>
        <FeatureBlock title='Cross Platform' icon='solar:global-outline'>
          Seamlessly run your async code across multiple platforms.
        </FeatureBlock>
        <FeatureBlock title='User Friendly API' icon='solar:code-2-outline'>
          Compio utilizes multi-crate design with a user-friendly API.
        </FeatureBlock>
      </div>
    </>
  )
}
