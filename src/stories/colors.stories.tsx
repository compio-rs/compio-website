import type { Meta, StoryFn } from '@storybook/react'
import cx from 'classix'

const meta: Meta = {
  title: 'Colors',
}

const keys: [string, boolean][] = [
  ['bg-blue-50', true],
  ['bg-blue-100', true],
  ['bg-blue-200', true],
  ['bg-blue-300', true],
  ['bg-blue-400', true],
  ['bg-blue-500', true],
  ['bg-blue-600', true],
  ['bg-blue-700', false],
  ['bg-blue-800', false],
  ['bg-blue-900', false],
  ['bg-blue-950', false],
]

export const Colors: StoryFn = () => {
  return (
    <div className='flex flex-col'>
      {keys.map(key => (
        <div
          key={key[0]}
          className={cx('p-2', key[0], key[1] ? 'text-black' : 'text-white')}
        >
          {key}
        </div>
      ))}
    </div>
  )
}

export default meta
