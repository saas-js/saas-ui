import { Box, type BoxProps, Code as ChakraCode } from '@chakra-ui/react'

export const Pre = (props: BoxProps) => {
  return (
    <Box
      as="pre"
      {...props}
      css={{
        backgroundColor: 'bg.subtle',
        shadow: 'inset',
        marginTop: '1.6em',
        marginBottom: '1.6em',
        borderRadius: 'md',
        fontSize: '0.9em',
        paddingBlock: '2em',
        paddingInline: '2em',
        overflowX: 'auto',
        fontWeight: '400',
        '& code': {
          bg: 'transparent',
          fontSize: 'inherit',
          letterSpacing: 'inherit',
          borderWidth: 'inherit',
          padding: '0',
        },
      }}
    />
  )
}

export const Code = (props: BoxProps) => {
  if (typeof props.children === 'string') {
    return <ChakraCode variant="outline" as="code" {...props} />
  }
  return <Box as="code" {...props} />
}
