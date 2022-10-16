import * as React from 'react'
import { createContext } from '@chakra-ui/react-utils'
import { SystemStyleObject } from '@chakra-ui/system'

import { DatePickerState } from '@react-stately/datepicker'
import { DatePickerAria } from '@react-aria/datepicker'

export const [DatePickerStylesProvider, useDatePickerStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: 'DatePickerStylesContext',
})

export interface DatePickerProviderValue extends DatePickerAria {
  state: DatePickerState
  datePickerRef: React.RefObject<HTMLDivElement>
}

export const [DatePickerProvider, useDatePickerContext] =
  createContext<DatePickerProviderValue>({
    name: 'DatePickerProvider',
  })
