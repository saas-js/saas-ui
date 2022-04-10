import * as React from 'react'

import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  useColorModeValue,
  useMultiStyleConfig,
} from '@chakra-ui/system'

import { cx, __DEV__ } from '@chakra-ui/utils'

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
  const styles = useMultiStyleConfig('NProgress', props)

  const { colorScheme: c } = props

  const { children, isAnimating, ...containerProps } = omitThemingProps(props)

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  const barStyles = {
    width: '100%',
    height: '2px',
    bg: useColorModeValue(`${c}.500`, `${c}.300`),
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
      className={cx('saas-nprogress', props.className)}
    >
      <chakra.div
        __css={barStyles}
        ml={`${(-1 + progress) * 100}%;`}
        transition={`margin-left ${animationDuration}ms linear`}
      ></chakra.div>
    </chakra.div>
  )
})

if (__DEV__) {
  NProgress.displayName = 'NProgress'
}
