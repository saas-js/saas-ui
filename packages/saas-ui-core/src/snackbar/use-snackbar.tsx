import * as React from 'react'

import {
  chakra,
  useTheme,
  useToast,
  UseToastOptions,
  ToastId,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertIconProps,
  CloseButton,
  ButtonGroup,
  Spinner,
  useMultiStyleConfig,
  AlertProps,
  ToastPosition,
} from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'

const AlertSpinner: React.FC<AlertIconProps> = (props) => {
  const styles = useMultiStyleConfig('Alert', props)
  return (
    <chakra.span
      display="inherit"
      alignItems="center"
      {...props}
      __css={styles.icon}
    >
      <Spinner size="sm" />
    </chakra.span>
  )
}

export interface SnackbarProps
  extends Omit<AlertProps, 'id' | 'title' | 'position'> {
  id?: ToastId
  title?: React.ReactNode
  icon?: React.ReactNode
  action?: React.ReactNode
  description?: React.ReactNode
  position?: ToastPosition
  isClosable?: boolean
  onClose?: () => void
}

export const Snackbar: React.FC<SnackbarProps> = (props) => {
  const {
    status,
    variant,
    id,
    title,
    icon,
    isClosable,
    onClose,
    description,
    action,
  } = props

  const theme = useTheme()

  // Use the snackbar variant if it exists, otherwise default to solid
  const defaultVariant = theme.components?.Alert?.variants?.snackbar
    ? 'snackbar'
    : 'solid'

  const alertTitleId =
    typeof id !== 'undefined' ? `toast-${id}-title` : undefined

  return (
    <Alert
      status={status}
      variant={variant || defaultVariant}
      id={id !== 'undefined' ? `toast-${id}` : undefined}
      alignItems="start"
      borderRadius="md"
      boxShadow="lg"
      textAlign="start"
      width="auto"
      aria-labelledby={alertTitleId}
    >
      {icon === null ? null : icon ? icon : <AlertIcon />}
      <chakra.div flex="1" maxWidth="100%">
        {title && <AlertTitle id={alertTitleId}>{title}</AlertTitle>}
        {description && (
          <AlertDescription display="block">{description}</AlertDescription>
        )}
      </chakra.div>
      {(action || isClosable) && (
        <ButtonGroup size="xs" variant="ghost" ms="2">
          {action}
          {isClosable && <CloseButton size="sm" onClick={onClose} />}
        </ButtonGroup>
      )}
    </Alert>
  )
}

export interface UseSnackbarOptions extends UseToastOptions {
  icon?: React.ReactNode
  action?: React.ReactNode
  variant?:
    | 'snackbar'
    | 'subtle'
    | 'solid'
    | 'left-accent'
    | 'top-accent'
    | string
}

export type SnackbarOptions = UseSnackbarOptions | string

export interface SnackbarPromiseOptions {
  loading?: SnackbarOptions
  success: SnackbarOptions | ((data: any) => SnackbarOptions)
  error: SnackbarOptions | ((error: any) => SnackbarOptions)
}

/**
 * The snackbar component is used to give feedback after certain actions.
 *
 * @see Docs https://saas-ui.dev/docs/components/feedback/snackbar
 */
export function useSnackbar(defaultOptions?: UseSnackbarOptions) {
  const toast = useToast(defaultOptions)

  const parseOptions = React.useCallback(
    (options: SnackbarOptions): UseSnackbarOptions => {
      if (typeof options === 'string') {
        return {
          title: options,
        }
      }
      return options
    },
    []
  )

  return React.useMemo(() => {
    const snackbar = (options: SnackbarOptions): ToastId => {
      const opts = parseOptions(options)
      useToast
      return toast({
        render: (props) => (
          <Snackbar {...defaultOptions} {...opts} {...props} />
        ),
        ...opts,
      })
    }

    snackbar.info = (options: SnackbarOptions) =>
      snackbar({
        status: 'info',
        ...parseOptions(options),
      })

    snackbar.success = (options: SnackbarOptions) =>
      snackbar({
        status: 'success',
        ...parseOptions(options),
      })

    snackbar.error = (options: SnackbarOptions) =>
      snackbar({
        status: 'error',
        ...parseOptions(options),
      })

    /**
     * A utility function to show a loading spinner while a promise resolves.
     * `success` and `error` accept an optional function that receives the result or error of the promise.
     *
     * if `error` is a function, it will not throw the error, and you can handle it in the callback function.
     */
    snackbar.promise = async (
      promise: Promise<unknown>,
      { loading, success, error }: SnackbarPromiseOptions
    ) => {
      let toastId: ToastId | undefined
      if (loading) {
        const options = parseOptions(loading)
        toastId = snackbar({
          status: 'info',
          duration: null,
          icon: <AlertSpinner />,
          ...options,
        })
      }
      return promise
        .then((result) => {
          const options: UseSnackbarOptions = {
            status: 'success',
            duration: 5000,
            ...parseOptions(runIfFn(success, result)),
          }
          if (toastId) {
            snackbar.update(toastId, options)
          } else {
            snackbar(options)
          }
          return result
        })
        .catch((e) => {
          const options: UseSnackbarOptions = {
            title: e.name,
            description: e.description,
            status: 'error',
            duration: 5000,
            ...parseOptions(runIfFn(error, e)),
          }

          if (toastId) {
            snackbar.update(toastId, options)
          } else {
            snackbar(options)
          }

          if (typeof error !== 'function') {
            throw e
          }
        })
    }

    snackbar.update = (toastId: ToastId, options: UseToastOptions) => {
      return toast.update(toastId, {
        render: (props) => (
          <Snackbar {...defaultOptions} {...options} {...props} />
        ),
        ...options,
      })
    }
    snackbar.isActive = toast.isActive
    snackbar.close = toast.close
    snackbar.closeAll = toast.closeAll

    return snackbar
  }, [toast, defaultOptions])
}

export type UseSnackbarReturn = ReturnType<typeof useSnackbar>
