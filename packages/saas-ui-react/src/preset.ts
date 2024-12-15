import { createSystem, defaultBaseConfig, mergeConfigs } from '@chakra-ui/react'

import { defaultThemeConfig } from './theme'
import { utilities } from './theme/utilities.ts'

const defaultConfig = mergeConfigs(defaultBaseConfig, defaultThemeConfig)

/**
 * TODO: This is a temporary fix to add the utilities to the default config.
 */
defaultConfig.utilities = Object.assign(
  defaultConfig.utilities ?? {},
  utilities,
)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system, defaultConfig }
