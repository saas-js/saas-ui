import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import { AppShell, AppShellProps } from '..'

export default {
  title: 'Components/Layout/AppShell',
  parameters: {
    docs: {},
    layout: 'fullscreen',
  },
} as Meta

const Template: StoryFn<AppShellProps> = ({ children, ...args }) => (
  <AppShell {...args}>{children}</AppShell>
)

export const FullscreenVariant = Template.bind({})
FullscreenVariant.args = {
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
  children: (
    <Box as="main" overflow="auto">
      <Box height="4000px">Main content</Box>
    </Box>
  ),
  footer: (
    <Box height="16" borderTopWidth="1px">
      Footer
    </Box>
  ),
}

export const AbsoluteVariant = Template.bind({})
AbsoluteVariant.args = {
  variant: 'static',
  height: '100vh',
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
  children: (
    <Box as="main" p="8">
      The absolut variant is absolute positioned with `inset: 0`. To make it
      fill the entire viewport add 100% to html, body and any wrapping elements.
      Or set height of AppShell to 100vh.
    </Box>
  ),
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
    <Box
      height="48px"
      borderBottomWidth="1px"
      position="sticky"
      top="0"
      bg="white"
      _dark={{
        bg: 'gray.800',
      }}
    >
      Navbar
    </Box>
  ),
  sidebar: (
    <Box
      width="300px"
      height="calc(100vh - 48px)"
      borderRightWidth="1px"
      position="sticky"
      top="48px"
      p="8"
    >
      Sidebar
    </Box>
  ),
  children: (
    <Box as="main" height="4000px" p="8">
      Main content
    </Box>
  ),
}
