import React, { useState } from 'react'
import {
  chakra,
  Spinner,
  ThemingProps,
  ThemeTypings,
  SystemStyleObject,
  createStylesContext,
  useMultiStyleConfig,
  HTMLChakraProps,
  omitThemingProps,
  SystemProps,
  fadeConfig,
  SpinnerProps,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

import { AnimatePresence, motion } from 'framer-motion'

type Variants = 'fill' | 'overlay' | 'fullscreen'

const [StylesProvider, useStyles] = createStylesContext('SuiLoadingOverlay')

export const useLoadingOverlayStyles = useStyles

export interface LoadingOverlayProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiLoadingOverlay'> {
  /**
   * Show or hide the LoadingOverlay.
   * @default true
   */
  isLoading?: boolean

  /**
   * The transition that should be used for the overlay
   * @default "fade"
   */
  motionPreset?: 'none' | 'fade'
  /**
   * Spacing between children
   */
  spacing?: SystemProps['margin']
  /**
   * @type "fill" | "overlay" | "fullscreen"
   * @default "fill"
   */
  variant?: 'SuiLoadingOverlay' extends keyof ThemeTypings['components']
    ? /* @ts-ignore */
      ThemeTypings['components']['SuiLoadingOverlay']['variants']
    : Variants
}

const Motion = chakra(motion.div)

export const LoadingOverlay: React.FC<LoadingOverlayProps> = (props) => {
  const styles = useMultiStyleConfig('SuiLoadingOverlay', props)

  const {
    children,
    isLoading = true,
    spacing = 2,
    motionPreset,
    ...rest
  } = omitThemingProps(props)

  const overlayStyles: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& > *:not(style) ~ *:not(style)': { marginTop: spacing },
    ...styles.overlay,
  }

  const [animateInitial] = useState(!isLoading && motionPreset !== 'none')

  const motionProps: any = motionPreset === 'none' ? {} : fadeConfig

  return (
    <StylesProvider value={styles}>
      <AnimatePresence initial={animateInitial}>
        {isLoading && (
          <Motion
            {...motionProps}
            {...rest}
            __css={overlayStyles}
            className={cx('chakra-loading-overlay', props.className)}
          >
            {children}
          </Motion>
        )}
      </AnimatePresence>
    </StylesProvider>
  )
}

LoadingOverlay.displayName = 'LoadingOverlay'

export const LoadingSpinner = Spinner

export type LoadingSpinnerProps = SpinnerProps

export interface LoadingTextProps extends HTMLChakraProps<'p'> {}

export const LoadingText: React.FC<LoadingTextProps> = (props) => {
  const styles = useStyles()
  return <chakra.p {...props} __css={styles.text}></chakra.p>
}
