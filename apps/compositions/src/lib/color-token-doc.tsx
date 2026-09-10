"use client"

import {
  Center,
  SimpleGrid,
  type SimpleGridProps,
  Stack,
  Text,
  type TokenInterface,
  VStack,
} from "@chakra-ui/react"
import { defaultSystem } from "./preset-system"
import { TokenDoc } from "./token-doc"

const { tokens } = defaultSystem

const colors = tokens.categoryMap.get("colors")!
const allColors = Array.from(colors.values())

const primitiveKeys = ["black", "white", "whiteAlpha", "blackAlpha"]

const appearanceKeys = [
  "base",
  "accent",
  "info",
  "success",
  "warning",
  "destructive",
]

const catalogKeys = [
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
]

const paletteKeys = [...appearanceKeys, ...catalogKeys]

function tokensFor(key: string, kind: "primitive" | "semantic") {
  return allColors.filter((token) => {
    const matches =
      token.name === `colors.${key}` || token.name.startsWith(`colors.${key}.`)
    if (!matches) return false
    const hasConditions = Boolean(token.extensions.conditions)
    return kind === "semantic" ? hasConditions : !hasConditions
  })
}

export const ColorTokenDoc = () => {
  return (
    <Stack gap="8" my="8">
      {primitiveKeys.map((key) => {
        const tokens = tokensFor(key, "primitive")
        if (!tokens.length) return null
        return (
          <TokenDoc key={key} title={key}>
            <ColorGrid tokens={tokens} />
          </TokenDoc>
        )
      })}
    </Stack>
  )
}

export const ColorSemanticTokenDoc = () => {
  return (
    <Stack gap="8" my="8">
      <TokenDoc title="background">
        <ColorGrid
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.bg"),
          )}
        />
      </TokenDoc>

      <TokenDoc title="border">
        <ColorGrid
          variant="border"
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.border"),
          )}
        />
      </TokenDoc>

      <TokenDoc title="text">
        <ColorGrid
          variant="text"
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.fg"),
          )}
        />
      </TokenDoc>

      <TokenDoc title="sidebar">
        <ColorGrid
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.sidebar"),
          )}
        />
      </TokenDoc>

      <TokenDoc title="status">
        <ColorGrid
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.status"),
          )}
        />
      </TokenDoc>

      <TokenDoc title="presence">
        <ColorGrid
          tokens={allColors.filter((token) =>
            token.name.startsWith("colors.presence"),
          )}
        />
      </TokenDoc>
    </Stack>
  )
}

export const ColorPaletteTokenDoc = () => {
  return (
    <Stack gap="8" my="8">
      {paletteKeys.map((key) => {
        const semantic = tokensFor(key, "semantic")
        const primitive = tokensFor(key, "primitive")
        const tokens = semantic.length ? semantic : primitive
        if (!tokens.length) return null
        return (
          <TokenDoc key={key} title={key}>
            <ColorGrid tokens={tokens} />
          </TokenDoc>
        )
      })}
    </Stack>
  )
}

interface VariantProps {
  variant?: "border" | "background" | "text"
}

interface ColorGridItemProps extends VariantProps {
  token: TokenInterface
}

const ColorGridItem = (props: ColorGridItemProps) => {
  const { token, variant = "background" } = props
  const value = token.extensions.cssVar!.ref
  const conditions = token.extensions.conditions
  return (
    <VStack flex="1">
      <Center
        borderWidth="1px"
        bg={(() => {
          if (variant === "text" && token.name.includes("inverted"))
            return "bg.inverted"
          return variant === "background" ? value : undefined
        })()}
        w="full"
        h="20"
        rounded="lg"
        color={variant === "text" ? value : undefined}
        borderColor={variant === "border" ? value : undefined}
      >
        {variant === "text" && <Text fontSize="lg">Ag</Text>}
      </Center>
      <Text textStyle="xs">{token.name.replace("colors.", "")}</Text>
      {conditions && (
        <Stack mt="1">
          {Object.entries(conditions).map(([key, value]) => (
            <Text key={key} fontSize="xs" mt="-1" color="fg.muted">
              {key.replace("_", "")}: {value.replace("colors.", "")}
            </Text>
          ))}
        </Stack>
      )}
      {!conditions && (
        <Text fontSize="xs" mt="-1" color="fg.muted">
          {token.originalValue}
        </Text>
      )}
    </VStack>
  )
}

interface ColorGridProps extends VariantProps, SimpleGridProps {
  tokens: TokenInterface[]
}

export const ColorGrid = (props: ColorGridProps) => {
  const { tokens, variant = "background", ...rest } = props
  return (
    <SimpleGrid minChildWidth="120px" gap="4" {...rest}>
      {tokens.map((token) => (
        <ColorGridItem key={token.name} token={token} variant={variant} />
      ))}
    </SimpleGrid>
  )
}
