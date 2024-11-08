import SideBar from '@/components/base/sidebar'
import type { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'

const meta: Meta<typeof SideBar> = {
  component: SideBar,
}

export const Primary: StoryFn<typeof SideBar> = () => {
  const control = useState(false)

  return (
    <div className='absolute left-0 top-0 right-0 bottom-0 bg-slate-700'>
      <button type='button' onClick={() => control[1](!control[0])}>
        Open
      </button>
      <SideBar control={control} />
    </div>
  )
}

export default meta
