import {
  Box,
  BoxProps,
  SimpleGrid,
  Container,
  Text,
  ResponsiveValue,
} from '@chakra-ui/react'

import Link, { LinkProps } from '@/components/link'

export interface FooterProps extends BoxProps {
  columns?: ResponsiveValue<number>
}

const Footer = ({ children, columns = 4, ...rest }: FooterProps) => {
  return (
    <Box {...rest}>
      <Container maxW="container.2xl" px="8" py="8">
        <SimpleGrid columns={columns}>{children}</SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright = ({ title, children }: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="gray.400" fontSize="sm">
      {content || children}
    </Text>
  )
}

export const FooterLink = ({ children, ...props }: LinkProps) => {
  return (
    <Link
      {...props}
      color="gray.400"
      fontSize="sm"
      textDecoration="none"
      _hover={{
        color: 'white',
        transition: 'color .2s ease-in',
      }}
    >
      {children}
    </Link>
  )
}

export interface NavProps {
  title: string
  items: Array<any>
}

export const Nav = ({ title, items }: NavProps) => {}

export default Footer
