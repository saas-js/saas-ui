import * as React from 'react'
import {
  Center,
  CenterProps,
  Spinner as ChakraSpinner,
  SpinnerProps,
  VisuallyHidden,
  ThemingProps,
  ThemeTypings,
  useStyleConfig,
} from '@chakra-ui/react'

export const Spinner: React.FC<SpinnerProps> = (props) => {
  // @todo make spinner configurable in SaasProvider
  return <ChakraSpinner {...props} />
}

type Variants = 'fill' | 'overlay'

type SpinnerOptions = Pick<
  SpinnerProps,
  'emptyColor' | 'color' | 'thickness' | 'speed' | 'label'
>

export interface LoadingProps
  extends Omit<CenterProps, 'color'>,
    ThemingProps<'Loading'>,
    SpinnerOptions {
  /**
   * @type "fill" | "overlay"
   * @default "fill"
   */
  variant?: 'Loading' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Loading']['variants']
    : Variants
}

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
