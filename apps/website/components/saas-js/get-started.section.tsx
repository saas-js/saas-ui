import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  Text,
} from '@saas-ui/react'
import Link from 'next/link'

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
            Join hundreds of developers <br /> building better SaaS products.
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
        </HStack>
      </Container>
    </Box>
  )
}
