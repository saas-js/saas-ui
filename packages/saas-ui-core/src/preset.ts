import { createSystem, defaultBaseConfig, mergeConfigs } from '@chakra-ui/react'

import { defaultThemeConfig } from './theme'

export const defaultConfig = mergeConfigs(defaultBaseConfig, defaultThemeConfig)

export const defaultSystem = createSystem(defaultConfig)

export { defaultSystem as system }
