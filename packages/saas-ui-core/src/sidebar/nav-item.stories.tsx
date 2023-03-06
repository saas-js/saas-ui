import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, Center, Stack } from '@chakra-ui/react'

import { FiHome } from 'react-icons/fi'

import { Sidebar, NavItem, NavItemProps, Nav, NavItemLabel } from '.'

export default {
  title: 'Components/Navigation/NavItem',
  decorators: [
    (Story: any) => (
      <Center height="100%">
        <Sidebar border="0">
          <Nav>
            <Story />
          </Nav>
        </Sidebar>
      </Center>
    ),
  ],
} as Meta

const Template: Story<NavItemProps> = (args) => <NavItem {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Link',
}

export const WithActiveState = Template.bind({})
WithActiveState.args = {
  children: 'Link',
  isActive: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  children: 'Link',
  icon: <FiHome />,
}

export const WithBadge = Template.bind({})
WithBadge.args = {
  icon: <FiHome />,
  children: (
    <>
      <NavItemLabel flex="1">Link</NavItemLabel>
      <Badge bg="none">10</Badge>
    </>
  ),
}

export const VariantSubtle = Template.bind({})
VariantSubtle.args = {
  children: 'Link',
  icon: <FiHome />,
  variant: 'subtle',
  isActive: true,
}

export const VariantSolid = Template.bind({})
VariantSolid.args = {
  children: 'Link',
  icon: <FiHome />,
  variant: 'solid',
  isActive: true,
}

export const Sizes = () => {
  return (
    <Stack>
      <Template
        children="Link xs"
        size="xs"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        children="Link sm"
        size="sm"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        children="Link md"
        size="md"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
      <Template
        children="Link lg"
        size="lg"
        icon={<FiHome />}
        variant="solid"
        isActive
      />
    </Stack>
  )
}
