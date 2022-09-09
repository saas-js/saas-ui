import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { AppShell } from '..'

export default {
  title: 'Components/Layout/AppShell',
  parameters: {
    docs: {},
  },
} as Meta

const Template: Story = ({ children, ...args }) => (
  <AppShell borderWidth="1px" {...args}>
    {children}
  </AppShell>
)

export const Basic = Template.bind({})
Basic.args = {
  navbar: (
    <Box height="16" borderBottomWidth="1px">
      Navbar
    </Box>
  ),
  sidebar: (
    <Box width="300px" borderRightWidth="1px">
      Sidebar
    </Box>
  ),
  children: <Box as="main">Main content</Box>,
  footer: (
    <Box height="16" borderTopWidth="1px">
      Footer
    </Box>
  ),
}

export const StaticVariant = Template.bind({})
StaticVariant.args = {
  variant: 'static',
  navbar: (
    <Box height="16" borderBottomWidth="1px">
      Navbar
    </Box>
  ),
  sidebar: (
    <Box width="300px" borderRightWidth="1px">
      Sidebar
    </Box>
  ),
  children: <Box as="main">Main content</Box>,
  footer: (
    <Box height="16" borderTopWidth="1px">
      Footer
    </Box>
  ),
}
