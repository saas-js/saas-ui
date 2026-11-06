import { Box, ButtonGroup, Container, HStack, Text } from '@chakra-ui/react'
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
        <HStack
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderStyle="dashed"
          p="16"
          gap="4"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Text textStyle="4xl" fontWeight="medium">
            Give your agents a solid <br /> foundation to build on.
          </Text>

          <ButtonGroup>
            {props.children ? (
              props.children
            ) : (
              <Button variant="glass" colorPalette="accent" asChild>
                <Link href="https://www.saas-js.com">Explore Saas.js</Link>
              </Button>
            )}
          </ButtonGroup>
        </HStack>
      </Container>
    </Box>
  )
}
