import { chakra, Box, HTMLChakraProps } from '@chakra-ui/react'

interface BreakpointProps extends HTMLChakraProps<'div'> {
  breakpoint?: string
}

export const Breakpoint: React.FC<BreakpointProps> = ({
  breakpoint,
  children,
  ...props
}) => {
  let display

  if (breakpoint) {
    display = {
      base: 'none',
      [breakpoint]: 'block',
    }
  }

  return (
    <Box display={display} {...props}>
      {children}
    </Box>
  )
}
