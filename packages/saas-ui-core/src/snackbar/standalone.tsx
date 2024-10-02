import {
  CreateStandAloneToastParam,
  createStandaloneToast,
  CreateStandaloneToastReturn,
} from '@chakra-ui/react'
import { Snackbar } from './use-snackbar'

type CreateStandAloneSnackbarReturn = {
  snackbar: CreateStandaloneToastReturn['toast']
  SnackbarContainer: CreateStandaloneToastReturn['ToastContainer']
}

export const createStandAloneSnackbar = (
  options: CreateStandAloneToastParam
): CreateStandAloneSnackbarReturn => {
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
