'use client'

import { Alert, Box, HStack, Heading, Link, Stack, Text } from '@saas-ui/react'

export function Hero() {
  return (
    <HStack pt="12" mt="24" alignItems="center">
      <Stack alignItems="flex-start" gap="4" flex="1">
        <Box
          as="span"
          fontSize="xs"
          borderWidth="1px"
          borderRadius="full"
          px="2"
          py="0.5"
          fontWeight="medium"
          textAlign="center"
        >
          Pricing
        </Box>
        <Stack gap="5" maxW="4xl" alignItems="center" mb="8">
          <Heading
            as="h1"
            fontSize="4xl"
            lineHeight="1"
            textWrap="balance"
            maxW="md"
          >
            Find the right plan for your needs
          </Heading>
        </Stack>
      </Stack>

      <Alert
        title="Looking for SaaS starter kits?"
        colorPalette="accent"
        flex="0 0 50%"
      >
        <Text>
          Our starter kits have moved to the{' '}
          <Link href="https://saas-js.com" fontWeight="medium">
            saas-js.com
          </Link>
          .
        </Text>
      </Alert>
    </HStack>
  )
}
