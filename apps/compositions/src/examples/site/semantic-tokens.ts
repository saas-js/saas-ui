import { defineSemanticTokens } from '@saas-ui/react'

export const semanticColors = defineSemanticTokens.colors({
  status: {
    success: {
      value: { _light: '{colors.green.500}', _dark: '{colors.green.500}' },
    },
    error: {
      value: { _light: '{colors.red.500}', _dark: '{colors.red.500}' },
    },
    warning: {
      value: { _light: '{colors.orange.500}', _dark: '{colors.orange.500}' },
    },
    info: {
      value: { _light: '{colors.blue.500}', _dark: '{colors.blue.500}' },
    },
  },
})
