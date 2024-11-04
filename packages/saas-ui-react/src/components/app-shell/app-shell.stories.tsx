import * as React from 'react'

import { Box } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'

import { useAppShellStyles } from './app-shell.tsx'
import { AppShell } from './index.ts'

export default {
  title: 'Components/AppShell',
  parameters: {
    layout: 'fullscreen',
  },
} as Meta

export const FullscreenVariant = {
  render: () => (
    <AppShell
      header={
        <Box height="40px" borderBottomWidth="1px" p="2">
          Header
        </Box>
      }
      sidebar={
        <Box width="200px" borderRightWidth="1px" p="2">
          Sidebar
        </Box>
      }
      aside={
        <Box width="200px" borderLeftWidth="1px" p="2">
          Aside
        </Box>
      }
      footer={
        <Box height="40px" borderTopWidth="1px" p="2">
          Footer
        </Box>
      }
    >
      <Box p="2">Content</Box>
    </AppShell>
  ),
}

function Test() {
  const styles = useAppShellStyles()

  console.log(styles)

  return null
}
