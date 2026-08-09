import Container from '@/components/base/container'
import DocumentHead from '@/components/base/document-head'
import FeatureBlock from '@/components/base/feature'
import LinkButton from '@/components/base/link-button'
import FadeIn from '@/components/motion/fade-in'
import { fadeInItem } from '@/util/motion/fade'
import { Icon } from '@iconify/react'
import cx from 'classix'
import { motion } from 'framer-motion'

export default function Index() {
  return (
    <Container>
      <DocumentHead description='Build fast, cross-platform Rust applications with Compio, a completion-based asynchronous runtime.' />
      <FadeIn.Container
        className={cx(
          'min-h-[75lvh] py-[clamp(8rem,20lvh,16rem)]',
          'flex flex-col items-center justify-center gap-8 px-2 sm:px-4',
        )}
      >
        <motion.h1
          variants={fadeInItem}
          className={cx(
            'px-4 sm:px-8 py-2 rounded-xl inline-block text-center',
            'text-[clamp(2.75rem,8vw,6rem)] tracking-tight',
            'bg-blue-50/70 text-neutral-700 font-[900] leading-tight',
          )}
        >
          Async IO, <span className='text-blue-600'>Completed</span>
        </motion.h1>
        <motion.p
          variants={fadeInItem}
          className='text-lg text-center px-8 text-neutral-600'
        >
          Compio is an async runtime for Rust built with completion-based I/O.
        </motion.p>
        <div />
        <FadeIn.Item className='flex flex-wrap justify-center gap-4'>
          <LinkButton
            className='bg-neutral-700 text-white'
            to={'https://docs.rs/compio'}
          // right={<Icon icon='solar:arrow-right-linear' />}
          >
            API Reference
          </LinkButton>
          <LinkButton
            className='bg-blue-950 text-white'
            to={'/docs/preface'}
            right={<Icon icon='solar:arrow-right-linear' />}
          >
            Get Started
          </LinkButton>
        </FadeIn.Item>
      </FadeIn.Container>
      <FadeIn.Container
        className={cx('grid grid-cols-12 gap-4 xl:gap-8', 'md:p-12')}
      >
        <FeatureBlock title='Fast' icon='solar:bolt-outline'>
          Leveraging completion-based I/O, Compio is fast and efficient.
        </FeatureBlock>
        <FeatureBlock title='Reliable' icon='solar:shield-check-outline'>
          Built with reliability in mind, safety is our top priority.
        </FeatureBlock>
        <FeatureBlock title='Cross-platform' icon='solar:global-outline'>
          Seamlessly run your async code across multiple platforms.
        </FeatureBlock>
        <FeatureBlock title='User-friendly API' icon='solar:code-2-outline'>
          Compio uses a multi-crate design with a user-friendly API.
        </FeatureBlock>
      </FadeIn.Container>
    </Container>
  )
}
