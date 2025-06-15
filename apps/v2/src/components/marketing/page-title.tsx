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
      {typeof title === 'string' ? (
        <Text as="h1" textStyle="pageTitle" textAlign="left">
          {title}
        </Text>
      ) : (
        title
      )}
      {typeof description === 'string' ? (
        <Text
          as="div"
          textStyle="subtitle"
          align="left"
          color="gray.500"
          _dark={{
            color: 'gray.400',
          }}
        >
          {description}
        </Text>
      ) : (
        description
      )}
    </VStack>
  )
}
