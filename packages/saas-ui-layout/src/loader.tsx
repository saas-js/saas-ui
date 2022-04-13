import * as React from 'react'
import {
  chakra,
  ChakraProps,
  Spinner,
  SpinnerProps,
  ThemingProps,
  ThemeTypings,
  SystemProps,
  useStyleConfig,
} from '@chakra-ui/react'
import { cx, __DEV__ } from '@chakra-ui/utils'

type Variants = 'fill' | 'overlay' | 'fullscreen'

type SpinnerOptions = Pick<
  SpinnerProps,
  'emptyColor' | 'color' | 'thickness' | 'speed' | 'label' | 'className'
>

export interface LoaderProps
  extends Omit<MotionProps, 'transition'>,
    Omit<ChakraProps, 'color'>,
    ThemingProps<'Loader'>,
    SpinnerOptions {
  /**
   * Show or hide the loader.
   */
  isLoading?: boolean

  /**
   * Render a custom spinner
   */
  spinner?: React.ReactNode

  /**
   * Spacing between children
   */
  spacing?: SystemProps['margin']

  /**
   * @type "fill" | "overlay" | "fullscreen"
   * @default "fill"
   */
  variant?: 'Loader' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Loader']['variants']
    : Variants
}

import { AnimatePresence, motion, MotionProps } from 'framer-motion'

const Motion = chakra(motion.div)

/**
 * Show a fullscreen loading animation while your app is loading.
 */
export const Loader: React.FC<LoaderProps> = (props) => {
  const styles = useStyleConfig('Loader', props)

  const {
    children,
    isLoading = true,
    variant,
    size,
    colorScheme,
    color,
    emptyColor,
    thickness,
    speed,
    label,
    spinner,
    spacing = 2,
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

  const loaderStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *:not(style) ~ *:not(style)': { marginTop: spacing },
    ...styles,
  }

  const animateInitial = React.useMemo(() => !isLoading, [])

  let content = children
  if (typeof children === 'string') {
    content = <chakra.div>{children}</chakra.div>
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <Motion
          initial={{ opacity: animateInitial ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          {...rest}
          __css={loaderStyles}
          className={cx('saas-loader', props.className)}
        >
          {spinner || <Spinner {...spinnerProps} />}
          {content}
        </Motion>
      )}
    </AnimatePresence>
  )
}

if (__DEV__) {
  Loader.displayName = 'Loader'
}

/**
 * deprecated, will be removed in 1.0
 */
export const Loading = Loader
