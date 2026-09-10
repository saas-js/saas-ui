"use client"

import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react"
import { defaultSystem } from "./preset-system"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const easings = tokens.categoryMap.get("easings")!
const allEasings = Array.from(easings.values())

export const EasingTokenDoc = () => {
  return (
    <TokenDoc title="theme.tokens.easings" mt="8">
      <SimpleGrid columns={2} gap="8" fontSize="sm">
        {allEasings.map((token) => {
          return (
            <Stack key={token.name}>
              <Box
                boxSize="200px"
                bg="accent.muted"
                animationName="slide-to-right-full"
                animationTimingFunction={token.value}
                animationDuration="1s"
                animationIterationCount="infinite"
                animationDirection="alternate"
              />
              <Text fontWeight="medium">{token.name.replace("easings.", "")}</Text>
            </Stack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}
