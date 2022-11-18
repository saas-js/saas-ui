import {
  useControllableState,
  UseControllableStateProps,
  useDisclosure,
  UseDisclosureProps,
} from '@chakra-ui/react'
import { DatePickerProps } from './date-picker'
import { DateValue } from './types'

export interface UseDatePickerModalProps
  extends UseControllableStateProps<DateValue | null>,
    UseDisclosureProps {
  onSubmit?(value: DateValue | null): void
}

export const useDatePickerModal = (props: UseDatePickerModalProps) => {
  const {
    defaultIsOpen,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
    onSubmit: onSubmitProp,
    defaultValue = null,
    value: valueProp,
    onChange,
  } = props

  const [value, setValue] = useControllableState<DateValue | null>({
    defaultValue,
    value: valueProp,
    onChange,
  })

  const { onClose, onOpen, isOpen } = useDisclosure({
    defaultIsOpen,
    isOpen: isOpenProp,
    onOpen: onOpenProp,
    onClose: onCloseProp,
  })

  const onSubmit = () => {
    onSubmitProp?.(value)
    onClose()
  }

  const modalProps = {
    isOpen,
    onClose,
    onOpen,
  }

  const datePickerProps: DatePickerProps = {
    value,
    onChange(value) {
      setValue(value)
    },
  }

  return {
    onClose,
    onSubmit,
    modalProps,
    datePickerProps,
  }
}
