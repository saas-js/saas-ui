'use client'

import * as React from 'react'

import type { SystemStyleObject } from '@chakra-ui/react/styled-system'
import { AbsoluteCenter, ProgressCircle as ChakraProgressCircle } from '@chakra-ui/react'

interface ProgressCircleProps extends ChakraProgressCircle.RootProps {
  showValueText?: boolean
  valueText?: React.ReactNode
  trackColor?: SystemStyleObject['stroke']
  cap?: SystemStyleObject['strokeLinecap']
  thickness?: SystemStyleObject['strokeWidth']
}

export const ProgressCircle = React.forwardRef<
  HTMLDivElement,
  ProgressCircleProps
>(function ProgressCircle(props, ref) {
  const {
    showValueText,
    valueText,
    trackColor,
    color,
    cap,
    thickness,
    ...rest
  } = props

  return (
    <ChakraProgressCircle.Root {...rest} ref={ref}>
      <ChakraProgressCircle.Circle css={{ '--thickness': thickness }}>
        <ChakraProgressCircle.Track stroke={trackColor} />
        <ChakraProgressCircle.Range stroke={color} strokeLinecap={cap} />
      </ChakraProgressCircle.Circle>
      {showValueText && (
        <AbsoluteCenter>
          <ChakraProgressCircle.ValueText>
            {valueText}
          </ChakraProgressCircle.ValueText>
        </AbsoluteCenter>
      )}
    </ChakraProgressCircle.Root>
  )
})
