import { Box, BoxProps } from '@chakra-ui/react'

const CodePanel = ({children, ...props}: BoxProps) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  )
}

export default CodePanel
