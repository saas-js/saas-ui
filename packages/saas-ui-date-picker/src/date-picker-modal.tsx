import * as React from 'react'

import { VStack } from '@chakra-ui/react'
import { Modal, BaseModalProps, Button, ButtonGroup } from '@saas-ui/react'

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
      <Button label="Cancel" variant="ghost" onClick={onClose} />
      <Button label="Submit" colorScheme="primary" onClick={onSubmit} />
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
