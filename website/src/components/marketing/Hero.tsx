import { Container, Flex } from '@chakra-ui/layout'
import { useColorModeValue } from '@chakra-ui/react'
import PageTitle from './PageTitle'

interface HeroProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  children?: React.ReactNode
}

export default function Hero({
  title,
  description,
  children
}: HeroProps) {
  return (
    <Flex
      p="20"
      height="100vh"
      alignItems="center"
    >
      <Container>
        <PageTitle
          title={title}
          description={description}
        />
        {children}
      </Container>
    </Flex>
  )
}
