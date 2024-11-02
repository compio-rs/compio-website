import ContentList from '@/components/base/content-list'
import type { Meta, StoryObj } from '@storybook/react'
import summary from 'content/docs/summary'

const meta: Meta<typeof ContentList> = {
  component: ContentList,
}

type Story = StoryObj<typeof ContentList>

export const Primary: Story = {
  args: {
    list: summary,
  },
}

export default meta
