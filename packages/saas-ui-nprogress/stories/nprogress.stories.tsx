import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { NProgress } from '../src'

export default {
  title: 'Components/Feedback/NProgress',
  component: NProgress,
} as Meta

const Template: Story = ({ isAnimating, ...args }) => (
  <NProgress isAnimating={isAnimating} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  isAnimating: true,
}
