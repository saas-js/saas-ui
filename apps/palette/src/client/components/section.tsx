import React from 'react'
import { Flex, Box, BoxProps, Heading, Text } from '@chakra-ui/react'

export interface SectionProps extends BoxProps {
  title?: string
  description?: string
  children: React.ReactNode
}

export default function Section({
  title,
  description,
  children,
  ...otherProps
}: SectionProps) {
  let heading
  if (title || description) {
    heading = (
      <Box>
        <Heading size="md" mb="4">
          {title}
        </Heading>
        {description && (
          <Text size="md" color="gray.400">
            {description}
          </Text>
        )}
      </Box>
    )
  }

  return (
    <Flex flex="1" direction={'column'} mb="12" {...otherProps}>
      {heading}
      <Box flex="1">{children}</Box>
    </Flex>
  )
}
