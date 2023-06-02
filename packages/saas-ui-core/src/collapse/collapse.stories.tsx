import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { useCollapse } from './'

import { Collapse, Container, Box, Button } from '@chakra-ui/react'

export default {
  title: 'Hooks/useCollapse',
  component: Collapse,
} as Meta

export const Basic = () => {
  const { isOpen, getToggleProps, getCollapseProps } = useCollapse()

  return (
    <Container>
      <Button {...getToggleProps()}>
        Toggle: {isOpen ? 'open' : 'closed'}
      </Button>

      <Collapse {...getCollapseProps()}>
        <Box mt="4">Collapsed content </Box>
      </Collapse>
    </Container>
  )
}
