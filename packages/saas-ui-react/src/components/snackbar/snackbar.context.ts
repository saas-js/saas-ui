import { type CreateToasterReturn, createContext } from '@chakra-ui/react'

export interface SnackbarContextValue {
  snackbar: CreateToasterReturn
}

export const [SnackbarProvider, useSnackbar] =
  createContext<SnackbarContextValue>({
    name: 'SnackbarContext',
  })
