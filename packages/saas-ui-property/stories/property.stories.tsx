import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Container, Avatar } from '@chakra-ui/react'

import { Property, PropertyLabel, PropertyValue } from '../src'

import { Persona } from '@saas-ui/persona'
import { Select } from '@saas-ui/select'

export default {
  title: 'Components/Data Display/Property',
  component: Property,
  decorators: [
    (Story: any) => (
      <Container mt="40px" bg="gray.700" p="4" borderRadius="md">
        <Story />
      </Container>
    ),
  ],
} as Meta

const Template: Story = (args) => <Property {...args} />

export const basic = Template.bind({})
basic.args = {
  value: 'Name',
  label: 'Elliot Alderson',
}

export const labelWidth = Template.bind({})
labelWidth.args = {
  value: 'Name',
  label: 'Elliot Alderson',
  labelWidth: '60px',
}

export const composed = () => {
  return (
    <Property>
      <PropertyLabel justifyContent="flex-end">Status</PropertyLabel>
      <PropertyValue>
        <Select value="New" options={[{ value: 'New' }, { value: 'Open' }]} />
      </PropertyValue>
    </Property>
  )
}

export const list = () => {
  return (
    <>
      <Property label="Status" value="Open" />
      <Property
        label="Assignee"
        value={<Persona size="xs" name="Eelco" presence="online" />}
      />
      <Property label="Date" value="Januari 10, 2022" />
    </>
  )
}
