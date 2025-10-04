'use client'

import { ActionArrow } from '@/components/action-arrow'
import { LinkButton } from '@/components/link-button'
import { Box, Container, HStack, Heading, Stack, Text } from '@saas-ui/react'

export function CTA() {
  return (
    <Box
      position="relative"
      borderTopWidth="1px"
      borderBottomWidth="1px"
      borderStyle="dashed"
    >
      <Container maxW="6xl" position="static">
        <HStack>
          <Stack flex="1">
            <Stack py="20" gap="8">
              <Heading
                as="h3"
                fontSize="6xl"
                lineHeight="1"
                fontWeight="medium"
              >
                Build, launch, and scale with Saas.js starter kits
              </Heading>

              <Text fontWeight="medium" color="fg.subtle">
                Saas.js is a comprehensive solution for building, launching and
                scaling your SaaS. It includes everything you need to build a
                professional and scalable SaaS.
              </Text>

              <LinkButton
                variant="glass"
                colorPalette="cyan"
                href="https://saas-js.com"
                alignSelf="flex-start"
              >
                View starter kits <ActionArrow />
              </LinkButton>
            </Stack>
          </Stack>
          <Stack
            borderLeftWidth="1px"
            borderStyle="dashed"
            flex="1"
            display={{
              base: 'none',
              md: 'flex',
            }}
          ></Stack>
        </HStack>
      </Container>
    </Box>
  )
}
