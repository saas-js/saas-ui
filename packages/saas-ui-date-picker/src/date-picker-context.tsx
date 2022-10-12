import { createContext } from '@chakra-ui/react-utils'
import { SystemStyleObject } from '@chakra-ui/system'

export const [DatePickerStylesProvider, useDatePickerStyles] = createContext<
  Record<string, SystemStyleObject>
>({
  name: 'DatePickerStylesContext',
})

export const [DatePickerProvider, useDatePickerContext] = createContext<any>({
  name: 'DatePickerProvider',
})
