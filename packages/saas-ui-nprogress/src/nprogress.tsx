import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
} from '@chakra-ui/system'

import { mode } from '@chakra-ui/theme-tools'

import { useMultiStyleConfig } from '@saas-ui/system'

import { useNProgress } from '@tanem/react-nprogress'

interface NProgressOptions {
  /**
   * Set to true to start the progress animation.
   */
  isAnimating: boolean
}

export interface NProgressProps
  extends NProgressOptions,
    HTMLChakraProps<'div'>,
    ThemingProps<'NProgress'> {}

export const NProgress = forwardRef<NProgressProps, 'div'>((props, ref) => {
  const styles = useMultiStyleConfig('NProgress', props, {
    defaultStyleConfig: {
      parts: ['container', 'bar'],
      defaultProps: {
        colorScheme: 'teal',
      },
      baseStyle: (props: any) => {
        const { colorScheme: c } = props
        return {
          bar: {
            bg: mode(`${c}.500`, `${c}.300`)(props),
          },
        }
      },
    },
  })

  const { children, isAnimating, ...containerProps } = omitThemingProps(props)

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  const barStyles = {
    width: '100%',
    height: '2px',
    ...styles.bar,
  }

  return (
    <chakra.div
      ref={ref}
      __css={styles.container}
      position="fixed"
      top="0"
      left="0"
      width="100%"
      opacity={isFinished ? 0 : 1}
      zIndex="overlay"
      transition={`opacity ${animationDuration}ms linear`}
      {...containerProps}
    >
      <chakra.div
        __css={barStyles}
        ml={`${(-1 + progress) * 100}%;`}
        transition={`margin-left ${animationDuration}ms linear`}
      ></chakra.div>
    </chakra.div>
  )
})
