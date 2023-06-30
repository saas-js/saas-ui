import { Container, MenuItem, MenuDivider } from '@chakra-ui/react'
import { Story } from '@storybook/react'
import * as React from 'react'

import { OverflowMenu, OverflowMenuProps } from './overflow-menu'

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

const Template: Story<OverflowMenuProps> = (args) => <OverflowMenu {...args} />

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
