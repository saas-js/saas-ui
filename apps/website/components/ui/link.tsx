import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export interface LinkProps
  extends Omit<ChakraLinkProps, keyof NextLinkProps>,
    NextLinkProps {}

export const Link = (props: LinkProps) => {
  const {
    href,
    locale,
    passHref,
    prefetch,
    replace,
    scroll,
    shallow,
    as,
    children,
    ...rest
  } = props
  return (
    <ChakraLink asChild {...rest}>
      <NextLink href={props.href}>{children}</NextLink>
    </ChakraLink>
  )
}
