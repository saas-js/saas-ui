'use client'

import { forwardRef } from 'react'

import {
  Box,
  type BoxProps,
  EmptyState as ChakraEmptyState,
  useEmptyStateStyles,
} from '@chakra-ui/react'

export interface EmptyStateProps extends ChakraEmptyState.RootProps {
  title: string
  description?: React.ReactNode
  icon?: React.ReactNode
}

const EmptyStateActions = (props: BoxProps) => {
  const { actions } = useEmptyStateStyles()
  return <Box {...props} css={[actions, props.css]} />
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(props, ref) {
    const { title, description, icon, children, ...rest } = props

    const as = typeof description === 'string' ? 'p' : 'div'

    return (
      <ChakraEmptyState.Root ref={ref} {...rest}>
        <ChakraEmptyState.Content>
          {icon && (
            <ChakraEmptyState.Indicator>{icon}</ChakraEmptyState.Indicator>
          )}

          <ChakraEmptyState.Title>{title}</ChakraEmptyState.Title>
          {description ? (
            <ChakraEmptyState.Description as={as}>
              {description}
            </ChakraEmptyState.Description>
          ) : null}

          <EmptyStateActions>{children}</EmptyStateActions>
        </ChakraEmptyState.Content>
      </ChakraEmptyState.Root>
    )
  },
)
