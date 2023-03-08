import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import { Badge, Box, Center, Container, HStack, Stack } from '@chakra-ui/react'

import { FiHome } from 'react-icons/fi'

import { Sidebar, NavItem, NavItemProps, Nav, NavItemLabel } from '.'

export default {
  title: 'Components/Navigation/NavItem',
  decorators: [
    (Story: any) => (
      <Container maxW="container.sm" height="100%">
        <Center height="100%">
          <Box minWidth="240px">
            <Story />
          </Box>
        </Center>
      </Container>
    ),
  ],
} as Meta

const Template: Story<NavItemProps> = (args) => <NavItem {...args} />

export const Basic = Template.bind({})
Basic.args = {
  children: 'Nav item',
}

export const WithBadge = Template.bind({})
WithBadge.args = {
  icon: <FiHome />,
  children: (
    <>
      <NavItemLabel flex="1">Nav item</NavItemLabel>
      <Badge bg="none">10</Badge>
    </>
  ),
}

export const Variants = () => {
  return (
    <Stack spacing="16" w="full">
      <Stack flex="1">
        <Template children="Neutral" icon={<FiHome />} variant="neutral" />
        <Template
          children="Neutral"
          icon={<FiHome />}
          isActive
          variant="neutral"
        />
      </Stack>
      <Stack flex="1">
        <Template children="Solid" icon={<FiHome />} variant="solid" />
        <Template children="Solid" icon={<FiHome />} isActive variant="solid" />
      </Stack>
      <Stack flex="1">
        <Template children="Subtle" icon={<FiHome />} variant="subtle" />
        <Template
          children="Subtle"
          icon={<FiHome />}
          isActive
          variant="subtle"
        />
      </Stack>
    </Stack>
  )
}

export const Sizes = () => {
  return (
    <HStack spacing="16" w="full">
      <Stack flex="1">
        <Template
          children="Link xs"
          size="xs"
          icon={<FiHome />}
          variant="solid"
        />
        <Template
          children="Link sm"
          size="sm"
          icon={<FiHome />}
          variant="solid"
        />
        <Template
          children="Link md"
          size="md"
          icon={<FiHome />}
          variant="solid"
        />
        <Template
          children="Link lg"
          size="lg"
          icon={<FiHome />}
          variant="solid"
        />
      </Stack>
      <Stack flex="1">
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
    </HStack>
  )
}
