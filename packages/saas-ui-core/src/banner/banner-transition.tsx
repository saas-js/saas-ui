import * as React from 'react'
import { chakra, ChakraProps } from '@chakra-ui/system'
import {
  scaleFadeConfig,
  slideFadeConfig,
  EASINGS,
} from '@chakra-ui/transition'
import { HTMLMotionProps, motion } from 'framer-motion'

export type BannerMotion =
  | 'slideOutTop'
  | 'slideOutBottom'
  | 'fade'
  | 'scale'
  | 'none'

export interface BannerTransitionProps
  extends Omit<HTMLMotionProps<'div'>, 'color' | 'transition'>,
    ChakraProps {
  motionPreset: BannerMotion
}

const defaultTransition = {
  enter: {
    duration: 0.2,
    ease: EASINGS.easeOut,
  },
  exit: {
    duration: 0.2,
    ease: EASINGS.easeIn,
  },
}

const transitions = {
  slideOutTop: {
    ...slideFadeConfig,
    custom: {
      offsetY: '-100%',
      reverse: true,
      transition: defaultTransition,
    },
    initial: 'enter',
  },
  slideOutBottom: {
    ...slideFadeConfig,
    custom: {
      offsetY: '100%',
      reverse: true,
      transition: defaultTransition,
    },
    initial: 'enter',
  },
  fade: {
    ...slideFadeConfig,
    custom: {
      transition: defaultTransition,
    },
    initial: 'enter',
  },
  scale: {
    ...scaleFadeConfig,
    custom: { initialScale: 0.1, reverse: true, transition: defaultTransition },
    initial: 'enter',
  },
  none: {
    custom: {},
  },
}

const Motion = chakra(motion.div)

export const BannerTransition = React.forwardRef(
  (props: BannerTransitionProps, ref: React.Ref<any>) => {
    const { motionPreset, ...rest } = props

    const preset = transitions[motionPreset]

    const motionProps = {
      ...preset,
    }

    return <Motion ref={ref} {...(motionProps as ChakraProps)} {...rest} />
  }
)
