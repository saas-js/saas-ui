"use client"

import { Box, For, SimpleGrid, Square, Stack } from "@chakra-ui/react"
import { defaultSystem } from "./preset-system"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const allRadii = Array.from(tokens.categoryMap.get("radii")!.values())

const isRoleRadius = (name: string) =>
  /^radii\.(control|panel|indicator)(\.|$)/.test(name)

const isAliasRadius = (name: string) => /^radii\.l[123]$/.test(name)

const primitiveRadii = allRadii.filter(
  (token) => !isRoleRadius(token.name) && !isAliasRadius(token.name),
)

const roleRadii = allRadii.filter((token) => isRoleRadius(token.name))

const RadiusGrid = ({ names }: { names: typeof allRadii }) => (
  <SimpleGrid minChildWidth="120px" gap="4">
    <For each={names}>
      {(token) => {
        const radius = token.extensions.prop
        return (
          <Stack key={token.name} flex="1">
            <Square
              borderRadius={radius}
              size="20"
              bg="bg.subtle"
              color="fg.muted"
              borderWidth="1px"
            />
            <Box lineHeight="1">{radius}</Box>
            <Box as="pre" color="fg.subtle" fontSize="xs">
              {token.originalValue}
            </Box>
          </Stack>
        )
      }}
    </For>
  </SimpleGrid>
)

export const BorderRadiusTokenDoc = () => {
  return (
    <Stack gap="8" mt="8">
      <TokenDoc title="primitives">
        <RadiusGrid names={primitiveRadii} />
      </TokenDoc>
      <TokenDoc title="roles">
        <RadiusGrid names={roleRadii} />
      </TokenDoc>
    </Stack>
  )
}
