import * as React from 'react'
import { cx } from '@chakra-ui/utils'

import {
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverContentProps,
  PopoverTrigger,
} from '@chakra-ui/react'
import { useDatePickerContext } from './date-picker-context'

export const DatePickerTrigger = PopoverTrigger
export const DatePickerAnchor = PopoverAnchor

export interface DatePickerDialogProps extends PopoverContentProps {
  hideArrow?: boolean
}

export const DatePickerDialog: React.FC<DatePickerDialogProps> = (props) => {
  const { children, hideArrow, ...rest } = props

  const { dialogProps } = useDatePickerContext()

  return (
    <PopoverContent
      {...rest}
      {...dialogProps}
      width="auto"
      minW="xs"
      className={cx('saas-date-picker__dialog', props.className)}
    >
      {!hideArrow && <PopoverArrow />}
      <PopoverBody>{children}</PopoverBody>
    </PopoverContent>
  )
}
