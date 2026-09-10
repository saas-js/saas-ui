import { Box, ButtonGroup, Container, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'

import { Button } from '#components/ui/button'

export function GetStartedSection(props: { children?: React.ReactNode }) {
  return (
    <Box
      as="section"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
    >
      <Container maxW="8xl">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderStyle="dashed"
          p={{ base: '6', md: '16' }}
          gap="4"
          alignItems={{ base: 'stretch', md: 'flex-end' }}
          justifyContent="space-between"
        >
          <Text
            textStyle="4xl"
            fontWeight="medium"
            fontSize={{ base: '2xl', md: '4xl' }}
          >
            Start shipping features today.
          </Text>

          {props.children ? (
            props.children
          ) : (
            <ButtonGroup>
              <Button variant="glass" colorPalette="accent" asChild>
                <Link href="/pricing">Buy now</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">Documentation</Link>
              </Button>
            </ButtonGroup>
          )}
        </Stack>
      </Container>
    </Box>
  )
}
