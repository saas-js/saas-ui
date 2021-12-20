import { VStack, Text } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'

export interface PageTitleProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
}

// @todo add to theme
export default function PageTitle({
  title,
  description,
  ...props
}: PageTitleProps) {
  return (
    <VStack spacing={[4, null, 8]} alignItems="flex-start" {...props}>
      <Text as="h1" textStyle="h1" textAlign="left">
        {title}
      </Text>
      <Text
        as="div"
        textStyle="subtitle"
        align="left"
        color={useColorModeValue('gray.500', 'gray.400')}
      >
        {description}
      </Text>
    </VStack>
  )
}
