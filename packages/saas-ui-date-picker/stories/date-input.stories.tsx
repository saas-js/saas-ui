import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'

import {
  DateInput,
  DateInputProps,
  parseAbsoluteToLocal,
  parseDate,
  DateValue,
  CalendarDate,
} from '../src'
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  forwardRef,
  VStack,
} from '@chakra-ui/react'

import { Form, FormLayout, createField, SubmitButton } from '@saas-ui/forms'

export default {
  title: 'Components/DateTime/DateInput',
  component: DateInput,
  decorators: [
    (Story) => {
      return (
        <Container maxW="sm">
          <VStack>
            <Story />
          </VStack>
        </Container>
      )
    },
  ],
} as Meta

type Story = StoryObj<DateInputProps>['render']

const Template: Story = (args) => (
  <FormControl>
    <FormLabel>Date</FormLabel>
    <DateInput defaultValue={new CalendarDate(2023, 1, 1)} {...args} />
  </FormControl>
)

export const Basic = Template.bind({})
Basic.args = {}

export const Locale = Template.bind({})
Locale.args = {
  locale: 'nl-NL',
}

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

export const DisableCloseOnSelect = () => {
  return (
    <Template
      defaultValue={parseAbsoluteToLocal(new Date().toISOString())}
      closeOnSelect={false}
    />
  )
}

const DateField = createField(
  forwardRef((props, ref) => {
    const { value: valueProp, onChange: onChangeProp, ...rest } = props

    const value = valueProp && parseDate(valueProp)
    const onChange = (value: DateValue | null) => {
      onChangeProp(value?.toString() || '')
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
        date: null,
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
