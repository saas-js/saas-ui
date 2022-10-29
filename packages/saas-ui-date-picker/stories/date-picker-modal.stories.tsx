import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import { DatePickerModal, DateValue } from '../src'
import {
  Button,
  Container,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'

export default {
  title: 'Components/DateTime/DatePickerModal',
  component: DatePickerModal,
  decorators: [
    (Story) => {
      return (
        <Container>
          <VStack>
            <Story />
          </VStack>
        </Container>
      )
    },
  ],
} as Meta

const Template: Story = (args) => {
  const { children, ...rest } = args

  const [value, setValue] = React.useState<DateValue | null>(null)
  const disclosure = useDisclosure()

  return (
    <Stack>
      <Button onClick={disclosure.onToggle}>
        {value ? value.toString() : 'Open DatePicker'}
      </Button>

      <DatePickerModal
        {...disclosure}
        onSubmit={(date) => setValue(date)}
        {...rest}
      />
    </Stack>
  )
}

export const Basic = Template.bind({})
Basic.args = {}
