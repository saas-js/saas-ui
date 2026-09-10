"use client"

import {
  Box,
  Center,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { defaultSystem } from "./preset-system"
import { TokenDoc } from "./token-doc"

const { _config: config, tokens } = defaultSystem

const allKeyframes = Object.keys(config.theme?.keyframes || {}).filter(
  (keyframe) => !keyframe.match(/expand|collapse|bg-|position|circular/),
)

export const KeyframeDoc = () => {
  return (
    <TokenDoc title="theme.keyframes" mt="8">
      <SimpleGrid minChildWidth="160px" gap="20" fontSize="sm">
        {allKeyframes.map((animationName) => {
          return (
            <Stack key={animationName}>
              <Box
                boxSize="12"
                bg="accent.muted"
                animation={`${animationName} 1s ease-in-out infinite alternate`}
              />
              <Text fontWeight="medium">{animationName}</Text>
            </Stack>
          )
        })}
      </SimpleGrid>
    </TokenDoc>
  )
}

const durationTokens = Array.from(
  tokens.categoryMap.get("durations")!.values(),
)

const motionDurations = durationTokens.filter((token) =>
  token.name.startsWith("durations.motion"),
)
const namedDurations = durationTokens.filter(
  (token) => !token.name.startsWith("durations.motion"),
)

const DurationGrid = ({
  items,
}: {
  items: typeof durationTokens
}) => (
  <SimpleGrid minChildWidth="160px" gap="20" fontSize="sm">
    {items.map((token) => {
      const name = token.extensions.prop
      return (
        <VStack key={token.name}>
          <Center h="20">
            <Box
              bg="accent.muted"
              height="1"
              width="20"
              animationName="spin"
              animationDuration={name}
              animationTimingFunction="ease-in-out"
              animationIterationCount="infinite"
              animationDirection="alternate"
            />
          </Center>
          <Text fontWeight="medium">{name}</Text>
        </VStack>
      )
    })}
  </SimpleGrid>
)

export const DurationTokenDoc = () => {
  return (
    <Stack gap="8" mt="8">
      <TokenDoc title="motion bands">
        <DurationGrid items={motionDurations} />
      </TokenDoc>
      <TokenDoc title="named durations">
        <DurationGrid items={namedDurations} />
      </TokenDoc>
    </Stack>
  )
}
