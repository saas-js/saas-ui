import { Container, HStack, Stack } from '@chakra-ui/react'
import * as React from 'react'

import { OverflowMenu, MenuItem, MenuDivider } from '../src'

export default {
  title: 'Components/Overlay/OverflowMenu',
  decorators: [
    (Story: any) => (
      <Container mt="40px">
        <Story />
      </Container>
    ),
  ],
}

const Template = (args) => <OverflowMenu {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: (
    <>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Rename</MenuItem>
      <MenuDivider />
      <MenuItem>Delete</MenuItem>
    </>
  ),
}
