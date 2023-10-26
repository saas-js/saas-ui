import {
  CreateStandAloneToastParam,
  createStandaloneToast,
} from '@chakra-ui/react'
import { Snackbar } from './use-snackbar'

export const createStandAloneSnackbar = (
  options: CreateStandAloneToastParam
) => {
  const { ToastContainer: SnackbarContainer, toast: snackbar } =
    createStandaloneToast({
      ...options,
      defaultOptions: {
        render: (props) => <Snackbar {...props} />,
        ...options.defaultOptions,
      },
    })

  return {
    SnackbarContainer,
    snackbar,
  }
}
