import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Web3Address } from '../src'
import { Stack, Button } from '@chakra-ui/react'

export default {
  title: 'Components/Web3/Address',
  component: Web3Address,
} as Meta

const address = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'

const Template: Story = ({ address, ...args }) => (
  <Web3Address address={address} {...args} />
)

export const Basic = Template.bind({})
Basic.args = {
  address,
}

export const CustomLength = Template.bind({})
CustomLength.args = {
  address,
  startLength: 10,
  endLength: 3,
}

export const WithButton = () => {
  return (
    <Stack alignItems="flex-start">
      <Button variant="outline">
        <Web3Address address={address} />
      </Button>
      <Button variant="outline">
        <Web3Address address={address} startLength={10} />
      </Button>
      <Button variant="outline">
        <Web3Address address={address} endLength={10} />
      </Button>
    </Stack>
  )
}
