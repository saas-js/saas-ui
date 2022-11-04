import * as React from 'react'

import { VStack } from '@chakra-ui/react'
import { Modal, BaseModalProps } from '@saas-ui/modals'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { DatePickerStatic, DatePickerStaticProps } from './date-picker'
import { useDatePickerModal } from './use-date-picker-modal'
import { DatePickerCalendar } from './calendar'
import { DateValue } from './types'

export interface DatePickerModalProps
  extends Omit<BaseModalProps, 'size' | 'variant' | 'isOpen' | 'children'>,
    Omit<DatePickerStaticProps, 'children'> {
  onSubmit?(date: DateValue | null): void
  children?: React.ReactNode
}

export const DatePickerModal: React.FC<DatePickerModalProps> = (props) => {
  const { children, ...rest } = props
  const { modalProps, datePickerProps, onClose, onSubmit } =
    useDatePickerModal(rest)

  const footer = (
    <ButtonGroup>
      <Button variant="ghost" onClick={onClose}>
        Cancel
      </Button>
      <Button colorScheme="primary" onClick={onSubmit}>
        Submit
      </Button>
    </ButtonGroup>
  )

  return (
    <Modal
      title="Select a date"
      size="xs"
      footer={footer}
      {...rest}
      {...modalProps}
    >
      <VStack>
        <DatePickerStatic {...datePickerProps}>
          <DatePickerCalendar />
          {children}
        </DatePickerStatic>
      </VStack>
    </Modal>
  )
}
