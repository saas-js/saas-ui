import { VStack, Text, StackProps, useColorModeValue } from '@chakra-ui/react'

export interface PageTitleProps extends Omit<StackProps, 'title'> {
  title: string | React.ReactNode
  description?: string | React.ReactNode
}

export default function PageTitle({
  title,
  description,
  ...props
}: PageTitleProps) {
  return (
    <VStack spacing={[4, null, 8]} alignItems="flex-start" {...props}>
      <Text as="h1" textStyle="pageTitle" textAlign="left">
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
