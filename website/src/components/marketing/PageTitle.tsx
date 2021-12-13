import { VStack, Heading, Box } from '@chakra-ui/layout'
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
      <Heading
        as="h1"
        size="3xl"
        textAlign="center"
        fontWeight="extrabold"
        lineHeight="1.2"
      >
        {title}
      </Heading>
      <Box align="center" fontSize="2xl" color="gray.500" fontWeight="normal">
        {description}
      </Box>
    </VStack>
  )
}
