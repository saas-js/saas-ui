import { Box } from '@chakra-ui/react'
import Link, { type LinkProps } from 'next/link'

export const Anchor = (props: LinkProps & { children: React.ReactNode }) => {
  return (
    <Box
      asChild
      css={{
        color: 'fg',
        textDecoration: 'underline',
        textUnderlineOffset: '3px',
        textDecorationThickness: '2px',
        textDecorationColor: 'border.emphasized',
        fontWeight: '500',
      }}
    >
      <Link {...props}>
        <>{props.children}</>
      </Link>
    </Box>
  )
}
