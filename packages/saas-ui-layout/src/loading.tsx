import * as React from 'react'
import {
  Center,
  CenterProps,
  Spinner as ChakraSpinner,
  SpinnerProps,
  ThemingProps,
  useStyleConfig,
} from '@chakra-ui/react'

export const Spinner: React.FC<SpinnerProps> = (props) => {
  // @todo make spinner configurable in SaasProvider
  return <ChakraSpinner {...props} />
}

export interface LoadingProps
  extends Omit<CenterProps, 'color'>,
    ThemingProps<'Loading'>,
    Pick<
      SpinnerProps,
      'emptyColor' | 'color' | 'thickness' | 'speed' | 'label'
    > {}

export const Loading: React.FC<LoadingProps> = (props) => {
  const styles = useStyleConfig('Loading', props)

  const {
    variant,
    size,
    colorScheme,
    color,
    emptyColor,
    thickness,
    speed,
    label,
    ...rest
  } = props

  const spinnerProps = {
    size,
    colorScheme,
    color,
    emptyColor,
    thickness,
    speed,
    label,
  }

  return (
    <Center sx={styles} {...rest}>
      <Spinner {...spinnerProps} />
    </Center>
  )
}
