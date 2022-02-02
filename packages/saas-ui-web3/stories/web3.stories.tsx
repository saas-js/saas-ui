import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { Web3 } from '../src'
import { chakra, Stack, Button, Text } from '@chakra-ui/react'

export default {
  title: 'Components/Web3/Address',
  component: Web3,
} as Meta

const Template: Story = (args) => <Web3 title="Web3 Story" {...args} />

const Address = ({ address }) => {
  const [sliceRight, setSliceRight] = React.useState(10)
  const left = address.slice(0, 10)
  const right = address.slice(sliceRight)

  const ref = React.useRef<HTMLSpanElement>(null)

  React.useEffect(() => {
    const el = ref.current
    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight

    const overflow = el.scrollWidth - el.clientWidth

    console.log(overflow)

    if (overflow > 10) {
      // setSliceRight(sliceRight + 10)
    } else if (overflow > 0) {
      // setSliceRight(sliceRight + 1)
    } else {
      // setSliceRight(10)
    }
  }, [sliceRight])

  return (
    <chakra.span display="inline-flex" maxW="100%" flex="1">
      <chakra.span overflow="hidden" minWidth="1.2em">
        {left}
      </chakra.span>
      <chakra.span>...</chakra.span>
      <chakra.span ref={ref} overflow="hidden" sx={{ direction: 'rtl' }}>
        {right}
      </chakra.span>
    </chakra.span>
  )
}

export const address = () => {
  const addr = '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  const left = addr.slice(0, 10)
  const right = addr.slice(10)
  return (
    <Stack alignItems="flex-start">
      <Text>{addr}</Text>
      <Button variant="outline">
        <Address address={addr} />
      </Button>
      <Button width="60px" variant="outline">
        <Address address={addr} />
      </Button>
      <Button width="80px" variant="outline">
        <Address address={addr} />
      </Button>
      <Button width="120px" variant="outline">
        <Address address={addr} />
      </Button>
    </Stack>
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Preview = Template.bind({})
Preview.args = {
  preview: true,
}
