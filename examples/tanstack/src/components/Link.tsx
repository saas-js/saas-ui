import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import {
  Link as TanstackLink,
  LinkProps as TanstackLinkProps,
} from '@tanstack/react-router'

export interface LinkProps
  extends ChakraLinkProps,
    Omit<TanstackLinkProps, keyof ChakraLinkProps> {}

export function Link({ children, ...props }: LinkProps) {
  const { to, ...rest } = props

  return (
    <ChakraLink asChild {...rest}>
      <TanstackLink to={to}>{children}</TanstackLink>
    </ChakraLink>
  )
}
