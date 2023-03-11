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
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  forwardRef,
  IconButton,
  InputGroup,
  VStack,
} from '@chakra-ui/react'

import { Form, FormLayout, createField, SubmitButton } from '@saas-ui/forms'

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

// const ForwardedDateTimeInput = forwardRef<
//   HTMLDivElement,
//   Omit<ComponentProps<typeof SaasUiDateTimeInput>, 'value'> & { value: string }
// >(({ value, onChange, ...props }, ref) => {
//   const parsedValue = value ? parseDateTime(value) : null

//   return (
//     <Flex gap="2" alignItems="center">
//       <SaasUiDateTimeInput
//         ref={ref}
//         value={parsedValue}
//         onChange={(value) => {
//           onChange(value ? value.toString() : null)
//         }}
//         {...props}
//       />
//       <Button
//         onClick={() => {
//           onChange(null)
//         }}
//       >
//         Clear
//       </Button>
//     </Flex>
//   )
// })

// ForwardedDateTimeInput.displayName = 'ForwardedDateTimeInput'

// export const DateTimeInput = registerFieldType(
//   'custom-date-time-input',
//   ForwardedDateTimeInput,
//   {
//     isControlled: true,
//   }
// )
