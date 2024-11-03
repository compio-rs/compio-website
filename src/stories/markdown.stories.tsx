import type { Meta, StoryObj } from '@storybook/react'

import Markdown from '@/components/base/markdown'
import content from './md.txt?raw'

const meta: Meta<typeof Markdown> = {
  component: Markdown,
}
type Story = StoryObj<typeof Markdown>

export const Primary: Story = {
  args: {
    content: {
      html: content,
      title: 'h1 Heading 😎',
    },
  },
}

export default meta
