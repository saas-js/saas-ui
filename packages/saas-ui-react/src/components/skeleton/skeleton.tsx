import { forwardRef } from 'react'

import { Circle, type CircleProps } from '@chakra-ui/react/box'
import type { SkeletonProps as ChakraSkeletonProps } from '@chakra-ui/react/skeleton'
import { Skeleton as ChakraSkeleton } from '@chakra-ui/react/skeleton'
import { Stack } from '@chakra-ui/react/stack'

export interface SkeletonCircleProps extends ChakraSkeletonProps {
  size?: CircleProps['size']
}

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  const { size, ...rest } = props
  return (
    <Circle size={size} asChild>
      <ChakraSkeleton {...rest} />
    </Circle>
  )
}

export interface SkeletonTextProps extends ChakraSkeletonProps {
  noOfLines?: number
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props
    return (
      <Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <ChakraSkeleton
            height="4"
            key={index}
            {...props}
            _last={{ maxW: '80%' }}
            {...rest}
          />
        ))}
      </Stack>
    )
  },
)

export type SkeletonProps = ChakraSkeletonProps

export const Skeleton = ChakraSkeleton
