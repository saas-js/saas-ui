import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import { Container, Avatar } from '@chakra-ui/react'

import {
  PropertyList,
  Property,
  PropertyLabel,
  PropertyValue,
  PropertyProps,
} from '.'

import { Persona } from '../persona'
import { Select, SelectButton, SelectList } from '@saas-ui/forms'

export default {
  title: 'Components/Data Display/Property',
  component: Property,
  decorators: [
    (Story: any) => (
      <Container mt="40px" p="4" borderRadius="md">
        <Story />
      </Container>
    ),
  ],
} as Meta

type Story = StoryObj<PropertyProps>

export const Basic = {
  args: {
    value: 'Name',
    label: 'Elliot Alderson',
  },
}

export const LabelWidth = {
  args: {
    value: 'Name',
    label: 'Elliot Alderson',
    labelWidth: '60px',
  },
}

export const Composed = () => {
  return (
    <Property>
      <PropertyLabel justifyContent="flex-end">Status</PropertyLabel>
      <PropertyValue>
        <Select
          name="status"
          value="New"
          options={[{ value: 'New' }, { value: 'Open' }]}
        >
          <SelectButton />
          <SelectList />
        </Select>
      </PropertyValue>
    </Property>
  )
}

export const List = () => {
  return (
    <PropertyList>
      <Property label="Status" value="Open" />
      <Property
        label="Assignee"
        value={<Persona size="xs" name="Eelco" presence="online" />}
      />
      <Property label="Date" value="Januari 10, 2022" />
    </PropertyList>
  )
}
