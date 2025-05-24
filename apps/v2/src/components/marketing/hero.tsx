import {
  Container,
  Flex,
  HTMLChakraProps,
  ThemingProps,
} from '@chakra-ui/react'
import PageTitle from './page-title'

interface HeroProps
  extends Omit<HTMLChakraProps<'div'>, 'children' | 'title'>,
    ThemingProps<'Hero'> {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  children?: React.ReactNode
}

export default function Hero({
  title,
  description,
  children,
  ...rest
}: HeroProps) {
  return (
    <Flex py="20" alignItems="center" {...rest}>
      <Container>
        <PageTitle
          title={title}
          description={description}
          alignItems="center"
        />
        {children}
      </Container>
    </Flex>
  )
}
