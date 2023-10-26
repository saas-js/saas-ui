import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export type LinkProps = NextLinkProps & ChakraLinkProps

const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  )
}

export const ButtonLink = ({
  href,
  children,
  ...props
}: LinkProps & ButtonProps) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <Button {...props}>{children}</Button>
    </NextLink>
  )
}

export default Link
