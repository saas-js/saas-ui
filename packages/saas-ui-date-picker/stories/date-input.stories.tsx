import * as React from 'react'
import { Story, Meta } from '@storybook/react'

import {
  DateInput,
  DateInputProps,
  parseAbsoluteToLocal,
  parseDate,
  DateValue,
} from '../src'
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  forwardRef,
  VStack,
} from '@chakra-ui/react'

import {
  Form,
  FormLayout,
  registerFieldType,
  SubmitButton,
} from '@saas-ui/forms'

export default {
  title: 'Components/DateTime/DateInput',
  component: DateInput,
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

const Template: Story<DateInputProps> = (args) => (
  <FormControl>
    <FormLabel>Date</FormLabel>
    <DateInput {...args} />
  </FormControl>
)

export const Basic = Template.bind({})
Basic.args = {}

export const DefaultValue = () => {
  return <Template defaultValue={parseDate('2022-01-01')} />
}

export const DateTime = () => {
  return (
    <Template
      defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
      granularity="minute"
    />
  )
}

export const DateTimeNoTimezone = () => {
  return (
    <Template
      defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
      granularity="minute"
      hideTimeZone
    />
  )
}

const DateField = registerFieldType(
  'date',
  forwardRef((props, ref) => {
    const { value: valueProp, onChange: onChangeProp, ...rest } = props

    const value = parseDate(valueProp)
    const onChange = (value: DateValue) => {
      onChangeProp(value.toString())
    }

    return <DateInput ref={ref} value={value} onChange={onChange} {...rest} />
  }),
  {
    isControlled: true,
  }
)

export const FormWithDateField = () => {
  return (
    <Form
      defaultValues={{
        date: '2021-01-01',
      }}
      onSubmit={(data) => console.log('onSubmit', data)}
    >
      <FormLayout>
        <DateField label="Birthday" name="date" />
        <SubmitButton />
      </FormLayout>
    </Form>
  )
}

export const Sizes = () => {
  return (
    <VStack spacing="8" alignItems="flex-start">
      <Box>
        <DateInput label="Birthday" size="sm" />
      </Box>
      <Box>
        <DateInput label="Birthday" size="md" />
      </Box>
      <Box>
        <DateInput label="Birthday" size="lg" />
      </Box>
    </VStack>
  )
}
