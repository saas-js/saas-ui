import { VStack, Heading, Text, Box } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'

export interface PageTitleProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
}

export default function PageTitle({
  title,
  description,
  ...props
}: PageTitleProps) {
  return (
    <VStack spacing={[4, null, 8]} {...props}>
      <Text as="h1" textStyle="h1" textAlign="center">
        {title}
      </Text>
      <Text as="div" textStyle="subtitle" align="center" color="gray.400">
        {description}
      </Text>
    </VStack>
  )
}
